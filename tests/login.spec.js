import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

const user1 = {
    username: 'JSmith',
    password: 'Parabolic77'
}

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.

  const { username, password } = user1;
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByLabel('Username').fill(username);
  await page.getByLabel('Password').fill(password);
  await page.getByLabel('Login').click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  //this 
  //TODO
  await page.waitForURL('https://parabank.parasoft.com/parabank/');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});





// const {test, expect} = require('@playwright/test');

// // Write a test
// test('Login successfully', async({page}) =>{
//     // Go to URL
//     await page.goto('https://www.saucedemo.com/');
  
//     // await page.getByRole('input', { name: 'username', exact: true }).click();
//     await page.getByPlaceholder('Username').click();
//     await page.getByPlaceholder('Username').fill('standard_user');

//     await page.getByPlaceholder('Password').fill('secret_sauce');

//     await page.locator("[type=submit]").click();

//     //await page.locator('button:text("Login")').click();

//     await expect(page).toHaveTitle('Swag Labs');

   

//     await page.waitForTimeout(5000);

// })



