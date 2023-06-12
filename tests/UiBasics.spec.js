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
test('ThSecondird test case', async ({page})=>{

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

    //another method for entering the text
    await page.locator('#username').fill("")

    await page.locator('#username').fill("rahulshettyacademy")
    await page.locator("#signInBtn").click()

    //Next page

    const productsnames =  page.locator(".card-body a")

    //To print the first value
    console.log(await productsnames.first().textContent())
    //To print the second value
    console.log(await productsnames.nth(2).textContent())
    //to print last
    console.log(await productsnames.last().textContent())

    })      

    //this methods will work without context details
test('Third test case to print all the links', async ({page})=>{

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
    const signinbutton=page.locator("input#signInBtn");
    await signinbutton.click()
    //Actually it will take more time see this message
    //but play wright is cleaver enough to handle this
    //textContent is used for gettext()
    const errormessage = await page.locator("[style*='block']").textContent()
    console.log(errormessage)

    //Assertions we have used
    await expect(await page.locator("[style*='block']")).toContainText("Incorrect")

    //another method for entering the text
    await page.locator('#username').fill("")

    await page.locator('#username').fill("rahulshettyacademy")
    //await page.locator("#signInBtn").click()

    //Next page

    var newurl ="https://rahulshettyacademy.com/angularpractice/shop"
    //race condition
    await Promise.all([
   // page.waitForNavigation(),
    page.waitForURL(newurl),
    signinbutton.click(),
  ]);
    const productsnames =  page.locator(".card-body a")

    //fetching text of all the locators
    const titles= await productsnames.allTextContents();
    console.log(titles);

   

    })      


    test('Fourth case - to verify UI controls', async ({page})=>{

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

        //Radio button
        const radiobutton = page.locator("span.checkmark")
        //Drop down
        const dropdown = page.locator("select,form-control")

        //to select the last radio button
        await radiobutton.last().click()

        //tocheck the radio button is checked
        expect( await radiobutton.last()).toBeChecked()

        //select the dropdowm using the label value.
        await dropdown.selectOption({label:'Teacher'})
        // Alert message 
        const popMessage = page.locator("div[class='modal-body'] p")

        //get the text and print them
        console.log(await popMessage.textContent())
        await expect(popMessage).toHaveText("You will be limited to only fewer functionalities of the app. Proceed?")
       
        //Okey button from the popup
        const okeybutton = page.locator("#okayBtn")

        //Click on Okey button
        await okeybutton.click()

        const checkbox = page.locator("#terms")
        //To check check box selected is false
        expect(await checkbox.isChecked()).toBeFalsy()
         //select the check box
        await checkbox.click()
        // Check the check box is selected is true
        expect(await page.locator("#terms").isChecked()).toBeTruthy()

       // to verify the class attribute value is present
       const blinklink = page.locator("[href*='request']")
       //check this attribute is present
       await expect(blinklink).toHaveAttribute('class','blinkingText')
    
        })      

     test('Fifth case- Page opens in new tab ', async ({browser})=>{

            const context = await browser.newContext()
            const page = await browser.newPage()
            var url ="https://rahulshettyacademy.com/loginpagePractise/";
            //To launchthe URL
             page.goto(url)
           const documentLink = page.locator("[href*='request']")
           //check this attribute is present
           await expect(documentLink).toHaveAttribute('class','blinkingText')
           // when we are redirecting new page, we need to inform prior
           const [newPage] = await Promise.all(
            [          
            context.waitForEvent('page'),        
            documentLink.click(),    
            ]) 
            var newTitle = "RS Academy"
            await expect(newPage).toHaveTitle(newTitle)
            var textval = "Please email us at mentor@rahulshettyacademy.com with below template to receive response";
            const textelment = await newPage.locator("class*='red'").textContent(); 
            console.log(textval)
            await expect(textelment).toHaveText(textval)
     })  
     
     test('Child window handling', async ({ browser }) => {    

        const context = await browser.newContext();    
        
        const page = await context.newPage();    
        
        page.goto("https://rahulshettyacademy.com/loginpagePractise/");    
        
        const documentLink = page.locator("[href*='documents-request']");    
        
        const Username1 = page.locator("#username");     
        
        const [newPage] = await Promise.all(
        
        [          
        
        context.waitForEvent('page'),        
        
        documentLink.click(),    
        
        ])    
        
        const text = await newPage.locator("[class*='red']").textContent();    
        
        console.log(text);    
        
        const arraytext = text.split("@");    
        
        const domain = arraytext[1].split(" ")[0];    
        
        console.log(domain);    
        
        await Username1.type(domain);    
        
        console.log(await Username1.textContent());
        
        })