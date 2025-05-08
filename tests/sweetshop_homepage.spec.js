import {test, expect} from '@playwright/test';

test.describe('Homepage tests', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('https://sweetshop.netlify.app/');
    });

    test('Has title', async ({page}) => {
        await expect(page, 'should have page title "Sweet Shop"').toHaveTitle(/Sweet Shop/);
    });

    test('Browse sweets link', async ({page}) => {
        await page.getByRole('link', {name: "Browse Sweets"}).click();

        await expect(page.getByRole('heading', {name: "Browse sweets"}),'should have heading "Browse sweets"').toBeVisible();
        await expect(page, 'should have URL "https://sweetshop.netlify.app/sweets"').toHaveURL('https://sweetshop.netlify.app/sweets');
    });


    test('Most popular sweets', async ({page}) => {
        const cards = page.locator('div.card');

        await expect(cards, 'should display 4 featured items').toHaveCount(4);

        for(let i = 0; i < await cards.count(); i++)
        {
            await expect(cards.nth(i).locator('a.addItem'), 'should be visible and contain "Add to Basket" button').toBeVisible();
            let isLoaded = await cards.nth(i).locator('img').evaluate((img) => {
                return img.complete && img.naturalWidth > 0;
            });
            await expect(isLoaded, 'image should be fully loaded').toBe(true);
        }
    });

    [
        {testingWith: 'Sweets', expectedHeading: 'Browse sweets', expectedUrl: 'https://sweetshop.netlify.app/sweets'},
        {testingWith: 'About', expectedHeading: 'Sweet Shop Project', expectedUrl: 'https://sweetshop.netlify.app/about'},
        {testingWith: 'Login', expectedHeading: 'Login', expectedUrl: 'https://sweetshop.netlify.app/login'},
        {testingWith: '0 Basket', expectedHeading: 'Your Basket', expectedUrl: 'https://sweetshop.netlify.app/basket'}      //'0 Basket' because '0' is appended to the link label at this point in the flow
    ].forEach(({testingWith, expectedHeading, expectedUrl}) => {
        
        test(`${testingWith} navbar link opens the right page`, async ({page}) => {
            await page.getByRole('link', {name: testingWith, exact: true}).click();
            await expect(page.getByRole('heading', {name: expectedHeading, exact: true}),`should have heading "${expectedHeading}"`).toBeVisible();
            await expect(page, `should have URL "${expectedUrl}"`).toHaveURL(expectedUrl); 
        });

    });
});