const {test, expect} = require('@playwright/test');

test.only('End to end test case', async({page})=>{

await page.goto("https://rahulshettyacademy.com/client")

await page.locator('#userEmail').fill('anshika@gmail.com')
await page.locator('#userPassword').fill('Iamking@000')
await page.locator('#login').click()

//It willl wait for page to get load
//Wait for load state and mentioning networkidle 
//as the load state is the only way we can ask the playwright to wait 
//for the page to be loaded and then perform the next step.
await page.waitForLoadState('networkidle')
//Title
const title = "Let's Shop"
await expect(page).toHaveTitle(title)

const Products = page.locator(".card-body")
const count =await Products.count();
const titles =await  page.locator(".card-body b").allTextContents()
const productname = "zara coat 3"
const price = "31500"
console.log( titles)
console.log( productname)
console.log(await Products.nth(0).locator("b").textContent())


for(let i=0; i<count; i++)
{
    if(await Products.nth(i).locator("b").textContent() === productname)
    {
        const val = await Products.nth(i).first().locator("div.text-muted").textContent()

        //Split $ and takes on number
        const Priceval = val.split(" ")[1];    
        await expect(Priceval).toEqual(price)
        const addtocart = await Products.nth(i).locator("text = Add To Cart")
        await addtocart.click()
        break;
}
}

    const viewbutton =  page.locator("[routerlink*='cart']")
    await viewbutton.click()

    //wait till the page load properly
    await page.locator("div li").first().waitFor()

    const name_prod = await page.locator("h3:has-text('zara coat 3')").isVisible()
    expect(name_prod).toBeTruthy()




})