import {test, expect} from '@playwright/test';

test.describe('Form validation tests', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('https://sweetshop.netlify.app/basket');
    });

    test('Incomplete form test', async ({page}) => {
        await page.getByRole('button', {name: 'Continue to checkout', exact: true}).click();

        //Each error message is worded differently, so each one needs to be checked individually
        await expect.soft(page.getByText('Valid first name is required.'), 'First name error should be visible').toBeVisible();
        await expect.soft(page.getByText('Valid last name is required.'), 'Last name error should be visible').toBeVisible();
        await expect.soft(page.getByText('Please enter a valid email address for shipping updates.'), 'Email error should be visible').toBeVisible();
        await expect.soft(page.getByText('Please enter your shipping address.'), 'Address error should be visible').toBeVisible();
        await expect.soft(page.getByText('Please select a valid country.'), 'Country error should be visible').toBeVisible();
        await expect.soft(page.getByText('Please provide a valid state.'), 'City error should be visible').toBeVisible();
        await expect.soft(page.getByText('Zip code required.'), 'Zip error should be visible').toBeVisible();
        await expect.soft(page.getByText('Name on card is required'), 'Name on card error should be visible').toBeVisible();
        await expect.soft(page.getByText('Credit card number is required'), 'Card number error should be visible').toBeVisible();
        await expect.soft(page.getByText('Expiration date required'), 'Expiration error should be visible').toBeVisible();
        await expect.soft(page.getByText('Security code required'), 'Expiration date error should be visible').toBeVisible();

        expect(test.info().errors).toHaveLength(0);
    });

    //Would like to test cases with no '@' symbol and no '.' symbol, both of which are required for an email address
    [
        {testingWith: "no '@' symbol", email: 'johnsmith'},
        {testingWith: "no '.' symbol", email: 'johnsmith@testcom'}
    ].forEach(({testingWith, email}) => {
        test(`Invalid email test. Testing with ${testingWith}`, async ({page}) => {
            await page.getByLabel('Email').fill(email);
    
            await page.getByRole('button', {name: 'Continue to checkout', exact: true}).click();
    
            await expect(page.getByText('Please enter a valid email address for shipping updates.'), 'Email error should be visible').toBeVisible();
        });
    });

    /*
        No need to fill in the entire form, if only checking 3 fields where only letter characters would be expected
        Address field is expected to contain numbers and symbols
        Email may contain numbers and symbols
        Zip field may contain numbers and letters
    */
   test('Numeric characters in letter fields test', async ({page}) => {
        //Unable to get First name and last name fields by label, due to both elements ids being 'name'
        await page.locator('#name').first().fill("12345");
        await page.locator('#name').nth(1).fill("12345");

        await page.getByLabel('Name on card').fill('12345 12345');

        await page.getByRole('button', {name: 'Continue to checkout', exact: true}).click();

        //Don't terminate the test upon the first instance of assertion failure, as would like to check all of the fields before termination
        await expect.soft(page.getByText('Valid first name is required.'), 'First name error should be visible').toBeVisible();
        await expect.soft(page.getByText('Valid last name is required.'), 'Last name error should be visible').toBeVisible();
        await expect.soft(page.getByText('Name on card is required'), 'Name on card error should be visible').toBeVisible();
   });

    [
        {testingWith: 'letters only', cardNumber: 'ABCDABCDABCDABCD', expiration: 'ABCD'},
        {testingWith: 'symbols only', cardNumber: '!@#$!@#$!@#$!@#$', expiration: '!@#$'},
        {testingWith: 'letters and symbols', cardNumber: 'AB!@AB!@AB!@AB!@', expiration: 'AB!@'}
    ].forEach(({testingWith, cardNumber, expiration, cvv}) => {
        test(`Non-numeric characters in number fields. Testing with ${testingWith}`, async ({page}) => {
            
            await page.getByLabel('Credit card number').fill(cardNumber);
            await page.getByLabel('Expiration').fill(expiration);
        
            await page.getByRole('button', {name: 'Continue to checkout', exact: true}).click();

            //Don't terminate the test upon the first instance of assertion failure, as would like to check all of the fields before termination
            await expect.soft(page.getByText('Credit card number is required'), 'Card number error should be visible').toBeVisible();
            await expect.soft(page.getByText('Expiration date required'), 'Expiration date error should be visible').toBeVisible();
        });
    });

    [
        {testingWith: 'letters', cvv: 'ABC'},
        {testingWith: 'symbols', cvv: '*&('},
        {testingWith: 'letters and symbols', cvv: 'A$C'},
    ].forEach(({testingWith, cvv}) => {
        test(`Cannot enter ${testingWith} into the CVV field`, async ({page}) => {
            
            const cvvField = await page.locator('#cc-cvv');
            
            //Using pressSequentially action as using fill would result in an incorrect test failure
            await cvvField.pressSequentially(cvv);

            await expect(cvvField, `Should not be able to enter ${testingWith}`).toHaveValue('');
        })
    });

    test('Correct details test', async ({page}) => {
       
            //Unable to get First name and last name fields by label, due to both elements ids being 'name'
            await page.locator('#name').first().fill("John");
            await page.locator('#name').nth(1).fill("Smith");

            await page.getByLabel('Email').fill("john.smith@test.com");
            await page.getByLabel('Address', {exact: true}).fill("10-12 Fairfax St");   //Set exact to true to differentiate from the optional "Address 2" field
            await page.getByLabel('Country').selectOption("United Kingdom");

            // //City option is also mislabeled
            await page.locator('#city').selectOption("Bristol");

            await page.getByLabel('Zip').fill("BS1 3DB");
            await page.getByLabel('Name on card').fill("John Smith");
            await page.getByLabel('Credit card number').fill("1234123412341234");
            await page.getByLabel('Expiration').fill("12/40");
            await page.locator('#cc-cvv').fill("123");

            await page.getByRole('button', {name: 'Continue to checkout', exact: true}).click();

            await expect(page, 'Should have URL changed').toHaveURL('https://sweetshop.netlify.app/basket?');
    });

});