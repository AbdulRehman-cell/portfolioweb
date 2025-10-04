let from = document.querySelector(".option1");
let to = document.querySelector(".option2");
let image1 = document.querySelector("#image1");
let image2 = document.querySelector("#image2");
let userinp = document.querySelector("#inp");
let resb = document.querySelector("#but1");
let print = document.querySelector("button");
let initial1 = document.querySelector("#initial1");
let initial2 = document.querySelector("#initial2");
let std= document.querySelector("#standard");
let basecur="USD";
let reqcur="PKR";
let result;
let uvalue;
let i = 0;
let j = 0;
let change = false;








userinp.addEventListener("keyup", () => {

    uvalue = userinp.value;


});





for (country in countryList) {

    let elements = document.createElement("option");
    elements.innerText = country;
    elements.value = country;
    to.append(elements);


}


for (country in countryList) {

    let elements = document.createElement("option");
    elements.innerText = country;
    elements.value = country;
    from.append(elements);


}

from.addEventListener("click", () => {

    


});

from.addEventListener("change", () => {

    change = true;

    basecur = from.value;
    ++i;







    let flagurlfrom = `https://flagsapi.com/${countryList[basecur]}/shiny/64.png`
    console.log(basecur);
    image1.src = flagurlfrom;

   



});

to.addEventListener("click", () => {

  


});




to.addEventListener("change", () => {

  change=true;


    reqcur = to.value;
   





    let flagurlto = `https://flagsapi.com/${countryList[reqcur]}/shiny/64.png`

    image2.src = flagurlto;









});
print.addEventListener("click", async () => {
    

    if (change === true) {

let baseurl = `https://v6.exchangerate-api.com/v6/068f135d93396c6f8e43f7bf/pair/${basecur}/${reqcur}`;

        let maza = await fetch(baseurl);
        let data = await maza.json();

let req = data.conversion_rate; 
console.log(req); 
      let fact = `1 ${basecur} = ${req} ${reqcur}`;

        if (userinp.value != "" && userinp.value != 0) {
            result = userinp.value * req;
            std.innerText = fact;
        } else {
            userinp.value = 1;
            result = 1 * req;
            std.innerText = fact;
        }

        let text = `${userinp.value} ${basecur} = ${result} ${reqcur}`;
        resb.innerText = text;

    } else {

let baseurl = `https://v6.exchangerate-api.com/v6/068f135d93396c6f8e43f7bf/pair/${basecur}/${reqcur}`;

        let maza = await fetch(baseurl);
        let data = await maza.json();
        console.log(baseurl);
        console.log(data);

let req = data.conversion_rate;        console.log(req);

        let fact = `1 ${basecur} = ${req} ${reqcur}`;

        if (userinp.value != "" && userinp.value != 0) {
            console.log(req);
            std.innerText = fact;
            result = userinp.value * req;
        } else {
            userinp.value = 1;
            result = 1 * req;
            std.innerText = fact;
        }

        let text = `${userinp.value} ${basecur} = ${result} ${reqcur}`;
        resb.innerText = text;
    }
});
