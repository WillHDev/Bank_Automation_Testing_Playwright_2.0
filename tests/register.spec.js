import { test, expect } from '@playwright/test';
import { stat } from 'fs';
import { beforeEach } from 'node:test';

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


//console.log(makeString(5));

//TODO: make user's name dynamic and make it persist
//TODO: add random city and state generators
//beforeEach('Create unique user', async ({}))

function generateRandomUsername(baseUsername) {
    // You can change the number of random digits or characters here
    const randomSuffix = Math.random().toString(36).substring(2, 10); // Generates a random alphanumeric string
    return `${baseUsername}_${randomSuffix}`;
  };
   

//TODO: replace test with 'setup'?
test('Register', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  const user1 = {
    firstName: makeString(7),
    lastName: makeString(9),
    address: randomAddress(),
    city: makeString(6),
    state: makeString(8),
    zipCode: makeNumber(5),
    phoneNumber: makeNumber(10),
    sSN: makeNumber(9),
    username: generateRandomUsername('User'),
    password: makeString(4) + makeNumber(3)
}


  const { firstName, lastName, address, city, state, zipCode, phoneNumber, sSN, username, password } = user1;
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByText('Register').click();

  //Assert user navigates to Registration Page 
  await expect(page.getByText('Signing up is easy!')).toBeVisible();

  //customer.firstName

  await page.locator('[id="customer.firstName"]').fill(firstName);
  await page.locator('[id="customer.lastName"]').fill(lastName);
 
  await page.locator ('[id="customer.address.street"]').fill(address);
 
  await page.locator ('[id="customer.address.city"]').fill(city);
 
  await page.locator ('[id="customer.address.state"]').fill(state);
 
  await page.locator('[id="customer.address.zipCode"]').fill(zipCode);
  
  await page.locator ('[id="customer.ssn"]').fill(sSN);
 
  await page.locator('[id="customer.phoneNumber"]').fill(phoneNumber);
  
  await page.locator('[id="customer.password"]').fill(password);

  await page.locator('[id="customer.username"]').fill(username);
  
  await page.locator('[id="repeatedPassword"]').fill(password);
  
  //TODO 9/6 - use xml path
//Mentor: why didnt this work?
  //await page.getByRole('input', { value: 'Register' }).click();
  //await page.getByRole('//input[text()="Register"]').click();
  //await page.getByRole('//input[text()="Register"]').click();
  //input[value="Register"]

//expect( await page.getByRole('heading', {class: 'title' } ).toHaveText(`Welcome ${firstName}`));

//correct:  //input[@value="Register"]
await page.locator('input[value="Register"]').click();
//expect( await page.getByRole('heading', {class: 'title' } ).toHaveText(`Welcome ${firstName}`));
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  //this 

  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect( page.locator('h1', { value: `Welcome ${firstName}` })).toBeVisible();

  // End of authentication steps.
//TODO: what is this?
  //await page.context().storageState({ path: authFile });
});








