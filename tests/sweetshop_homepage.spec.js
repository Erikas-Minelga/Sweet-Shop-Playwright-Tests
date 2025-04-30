import {test, expect} from '@playwright/test';

test.describe('Homepage tests', () => {

    test.beforeEach(async ({page}) => {
        await page.goto('https://sweetshop.netlify.app/');
    });

    /*
        Test case: 
            Page has the correct title
        Test data: 
            N/A
        Pre-conditions: N/A
        Steps: 
            1. Go to https://sweetshop.netlify.app/
            2. Check the title of the page
        Expected result:
            Title of the page is "Sweet Shop"
    */
    test('Has title', async ({page}) => {
        await expect(page, 'should have page title "Sweet Shop"').toHaveTitle(/Sweet Shop/);
    });

    /*
        Test case: 
            Browse Sweets link takes user to Browse Sweets page
        Test data: 
            N/A
        Pre-conditions:
            N/A
        Steps:
            1. Go to https://sweetshop.netlify.app/
            2. When the page is loaded, click the "Browse Sweets" link
        Expected result:
            The header of the resulting page is "Browse Sweets"
    */
    test('Browse sweets link', async ({page}) => {
        await page.getByRole('link', {name: "Browse Sweets"}).click();

        await expect(page.getByRole('heading', {name: "Browse sweets"}),'should have heading "Browse sweets"').toBeVisible();
        await expect(page, 'should have URL "https://sweetshop.netlify.app/sweets"').toHaveURL('https://sweetshop.netlify.app/sweets');
    });

    /*
        Test case:
            Most popular sweets appear on the home page
        Test data:
            N/A
        Pre-conditions:
            N/A
        Steps:
            1. Go to https://sweetshop.netlify.app/
            2. Check the most popular choice of retro sweets section
        Expected result:
            Featured products appear with an Add to Basket button
            Number of featured products is 4
            Images are loaded correctly
    */
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

    /*
        Test case:
            Sweets link in the navigation bar takes user to Browse Sweets page
        Test data:
            N/A
        Pre-conditions:
            N/A
        Steps:
            1. Go to https://sweetshop.netlify.app/
            2. Click the Sweets link in the navbar
        Expected result:
            The header of the resulting page is "Browse Sweets"
            URL of the page is now https://sweetshop.netlify.app/sweets
    */

    test('Sweets navbar link', async({page}) => {
        await page.getByRole('link', {name: "Sweets", exact: true}).click();
        await expect(page.getByRole('heading', {name: "Browse sweets"}),'should have heading "Browse sweets"').toBeVisible();
        await expect(page, 'should have URL "https://sweetshop.netlify.app/sweets"').toHaveURL('https://sweetshop.netlify.app/sweets');
    });

    /*
        Test case:
            About link in the navigation bar takes user to About page
        Test data:
            N/A
        Pre-conditions:
            N/A
        Steps:
            1. Go to https://sweetshop.netlify.app/
            2. Click the About link in the navbar
        Expected result:
            The header of the resulting page is "Browse Sweets"
            URL of the page is now https://sweetshop.netlify.app/sweets
    */

    test('About navbar link', async({page}) => {
        await page.getByRole('link', {name: "About", exact: true}).click();
        await expect(page.getByRole('heading', {name: "Sweet Shop Project"}),'should have heading "Sweet shop project"').toBeVisible();
        await expect(page, 'should have URL "https://sweetshop.netlify.app/about"').toHaveURL('https://sweetshop.netlify.app/about');
    });

    /*
        Test case:
            Login link in the navigation bar takes user to Login page
        Test data:
            N/A
        Pre-conditions:
            N/A
        Steps:
            1. Go to https://sweetshop.netlify.app/
            2. Click the Login link in the navbar
        Expected result:
            The header of the resulting page is "Login"
            URL of the page is now https://sweetshop.netlify.app/login
    */

    test('Login navbar link', async({page}) => {
        await page.getByRole('link', {name: "Login", exact: true}).click();
        await expect(page.getByRole('heading', {name: "Login"}),'should have heading "Login"').toBeVisible();
        await expect(page, 'should have URL "https://sweetshop.netlify.app/login"').toHaveURL('https://sweetshop.netlify.app/login');
    });

    /*
        Test case:
            Sweets link in the navigation bar takes user to Browse Sweets page
        Test data:
            N/A
        Pre-conditions:
            N/A
        Steps:
            1. Go to https://sweetshop.netlify.app/
            2. Click the Sweets link in the navbar
        Expected result:
            The header of the resulting page is "Browse Sweets"
            URL of the page is now https://sweetshop.netlify.app/sweets
    */

    test('Basket navbar link', async({page}) => {
        await page.getByRole('link', {name: "Basket"}).click();
        await expect(page.getByRole('heading', {name: "Your Basket", exact: true}),'should have "Basket" in the heading').toBeVisible(); 
        await expect(page, 'should have URL "https://sweetshop.netlify.app/basket"').toHaveURL('https://sweetshop.netlify.app/basket');
    });
});


