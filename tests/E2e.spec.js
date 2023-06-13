const {test, expect} = require('@playwright/test');
const { text } = require('carthage/core/required/db/data_types');

test('End to end test case', async({page})=>{

await page.goto("https://rahulshettyacademy.com/client")
const emailadd = 'anshika@gmail.com'
await page.locator('#userEmail').fill(emailadd)
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

    const checkoutbtn = await page.locator("text = Checkout")
    checkoutbtn.isVisible()
    checkoutbtn.click()

    await page.waitForLoadState('networkidle')

     const countrydetail = await page.locator("[placeholder*='Country']")
     await countrydetail.isVisible()
     await countrydetail.type("Ind",{delay:100})
     

     const list_group_drop = await page.locator(".list-group")
     const dropdown_value = list_group_drop.locator("button")
     await dropdown_value.first().waitFor()
     const drop_down_count = await dropdown_value.count()
     console.log("Total count is " + drop_down_count)

     for(let i=0; i< drop_down_count; i++)
     {
        const text_val = await dropdown_value.nth(i).textContent()
        console.log(text_val)
        if(text_val === " India")
        {
            await dropdown_value.nth(i).click()
            break;
        }
         
     }

     const emailaddress = page.locator(".user__name input[type='text']")
     console.log(await emailaddress.textContent())
     //await expect(emailaddress).toHaveText(emailadd)
     
     //const placeorderbtn =  page.locator("text*=Place Order")
     const placeorderbtn =  page.locator(".action__submit")
         await placeorderbtn.isVisible()
         await placeorderbtn.click()

    await page.waitForLoadState('networkidle')
    const thanks_text = page.locator(".hero-primary")
    console.log(await thanks_text.textContent())

    await  expect(thanks_text).toHaveText(" Thankyou for the order. ")

    const ordernumber = await page.locator("label.ng-star-inserted").textContent()
    console.log(ordernumber)

    const Neworder = ordernumber.split("|")[1];  
    console.log(Neworder.trim())
    console.log(Neworder.trim().length)

    const myordersmenu =  page.locator("button[routerlink*=myorder]")
    await myordersmenu.click()
    await page.waitForLoadState('networkidle')

    const tablerows = await page.locator("table tbody tr")
    await tablerows.first().waitFor()

    const tablecount = await tablerows.count();
    console.log(await tablerows.count())

    for(let i=0; i<tablecount; i++)
    {
        //console.log(await tablerows.nth(i).locator("th").textContent())
       const vala = await tablerows.nth(i).locator("th").textContent()
        if(vala === Neworder.trim())
        {
            console.log(await tablerows.nth(i).locator("th").textContent())
            await  tablerows.nth(i).locator("td button.btn-primary").click()
            break;
        }
        
    }

    const ordern = await page.locator(".col-text")
    ordern.waitFor()

    if(await ordern.textContent() === Neworder.trim())
    {
        console.log("order successfull")
    }




    
    






})