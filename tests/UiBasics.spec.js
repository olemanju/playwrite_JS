const {test, expect} = require('@playwright/test');

//There are 4 types of fixtures are there in paywrite, 
//we have already used 2 here.

test('first test case', async ({browser})=>{
    
//This line optional if you do not have anything to inject, paywrite will do this job automatically
   const context = await browser.newContext();
   //This line optional if you do not have anything to inject, paywrite will do this job automatically
   const page = await (await context).newPage()

   var url ="https://rahulshettyacademy.com/loginpagePractise/";
   
    await page.goto(url)
     

}) 

//this methods will work without context details
test.only('Second test case', async ({page})=>{

    var url ="https://rahulshettyacademy.com/loginpagePractise/";
    //To launchthe URL
    await page.goto(url)

    var titlepage = "LoginPage Practise | Rahul Shetty Academy"
    //User assertions to verify the title
    await expect(page).toHaveTitle(titlepage)
    
    //page.locator we use instead of $ or driver.findelementby
    //type is used instead of sendkeys
    await page.locator('#username').type("rahulshettyacademy1")
    await page.locator('#password').type("learning")
    await page.locator("#signInBtn").click()
    //Actually it will take more time see this message
    //but play wright is cleaver enough to handle this
    //textContent is used for gettext()
    const errormessage = await page.locator("[style*='block']").textContent()
    console.log(errormessage)

    //Assertions we have used
    await expect(await page.locator("[style*='block']")).toContainText("Incorrect")

    
    })      