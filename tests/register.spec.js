import { test, expect } from '@playwright/test';
import { stat } from 'fs';

//as setup

const authFile = 'playwright/.auth/user.json';


function makeString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function randomAddress() {
    return makeNumber(4) + ' ' + makeString(6) + ' ' + 'Street';
}

function makeNumber(length) {
    //let result ='';
    return Math.random().toString().substr(length); 

}
Math.random().toString().substr(4) 

//console.log(makeString(5));

//TODO: make user's name dynamic and make it persist
//TODO: add random city and state generators

const user1 = {
    firstName: makeString(7),
    lastName: makeString(9),
    address: randomAddress(),
    city: makeString(6),
    state: makeString(8),
    zipCode: makeNumber(5),
    phoneNumber: makeNumber(10),
    sSN: makeNumber(9),
    username: makeString(10),
    password: makeString(8) + makeNumber(3)
}

//TODO: replace test with 'setup'?
test('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.

  const { firstName, lastName, address, city, state, zipCode, phoneNumber, sSN, username, password } = user1;
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByText('Register').click();

  //Assert user navigates to Registration Page 
  await expect(page.getByText('Signing up is easy!')).toBeVisible();

  await page.locator('#customer.firstName').fill(firstName);
  await page.locator('#customer.lastName').fill(lastName);
  await page.locator('#customer.address.street').fill(address);
  await page.locator('#customer.address.city').fill(city);
  await page.locator('#customer.address.state').fill(state);
  await page.locator('#customer.address.zipCode').fill(zipCode);
  await page.locator('#customer.ssn').fill(sSN);
  await page.locator('#customer.phoneNumber').fill(phoneNumber);
  await page.locator('#customer.password').fill(password);
  await page.locator('#customer.username').fill(username);
  await page.locator('#repeatedPassword').fill(password);

  await page.getByRole('button', { value: 'Register' }).click();
  
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  //this 

  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(await page.getByRole('button', { value: `Welcome ${firstName}` })).toBeVisible();

  // End of authentication steps.
//TODO: what is this?
  //await page.context().storageState({ path: authFile });
});








