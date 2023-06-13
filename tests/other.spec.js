const {test,expect} = require('@playwright/test')

test.only('Handling hidden',async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    

    await page.locator("#displayed-text").isVisible()

    expect(await page.locator("#displayed-text")).toBeVisible()

    await page.locator("#hide-textbox").click()

    await page.locator("#displayed-text").isHidden()

    expect(await page.locator("#displayed-text")).toBeHidden()

    await page.locator("#alertbtn").click()

    page.on('dialog',async dialog => {
       console.log(dialog.message());
        await dialog.accept();
      });

    await page.locator("#mousehover").hover()
    //await page.locator(".mouse-hover-content a").first().click()

    const framepage =  page.frameLocator("#courses-iframe")

    await framepage.locator("li a[href*='lifetime-access']:visible").click()

    const headertext = await framepage.locator("div[class=text] h2").textContent()
    console.log(headertext)
    const formattted = headertext.split(" ")[1]
    console.log(formattted)
    
     

})