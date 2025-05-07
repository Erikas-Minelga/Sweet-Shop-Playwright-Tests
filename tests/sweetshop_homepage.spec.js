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

    test('Sweets navbar link', async({page}) => {
        await page.getByRole('link', {name: "Sweets", exact: true}).click();
        await expect(page.getByRole('heading', {name: "Browse sweets"}),'should have heading "Browse sweets"').toBeVisible();
        await expect(page, 'should have URL "https://sweetshop.netlify.app/sweets"').toHaveURL('https://sweetshop.netlify.app/sweets');
    });

    test('About navbar link', async({page}) => {
        await page.getByRole('link', {name: "About", exact: true}).click();
        await expect(page.getByRole('heading', {name: "Sweet Shop Project"}),'should have heading "Sweet shop project"').toBeVisible();
        await expect(page, 'should have URL "https://sweetshop.netlify.app/about"').toHaveURL('https://sweetshop.netlify.app/about');
    });

    test('Login navbar link', async({page}) => {
        await page.getByRole('link', {name: "Login", exact: true}).click();
        await expect(page.getByRole('heading', {name: "Login"}),'should have heading "Login"').toBeVisible();
        await expect(page, 'should have URL "https://sweetshop.netlify.app/login"').toHaveURL('https://sweetshop.netlify.app/login');
    });

    test('Basket navbar link', async({page}) => {
        await page.getByRole('link', {name: "Basket"}).click();
        await expect(page.getByRole('heading', {name: "Your Basket", exact: true}),'should have "Basket" in the heading').toBeVisible(); 
        await expect(page, 'should have URL "https://sweetshop.netlify.app/basket"').toHaveURL('https://sweetshop.netlify.app/basket');
    });
});


