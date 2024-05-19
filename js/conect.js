

const doc = {
    join: document.getElementById('join'),
    toOrder: document.getElementById('toOrder'),
    list: document.getElementById('list'),
    list1: document.getElementById('list1'),
    list2: document.getElementById('list2'),
    items: document.getElementById('items'),
    count: document.getElementById('count'),
    type: document.getElementById('type'),
    nbody: document.getElementById('nbody'),
    myModal: document.getElementById('myModal'),
    cnt: document.getElementById('cnt'),
    next:document.getElementById('next'),
    modals:document.getElementById('modals'),
};


const originalHtml=doc.myModal;
const rem = JSON.parse(localStorage.getItem("remember"));
const con = JSON.parse(sessionStorage.getItem("conect"));
if (rem || con) {
    doc.join.innerHTML = "אתה מחובר";
    doc.cnt.textContent = localStorage.getItem("cnt");
}
doc.cnt.textContent = localStorage.getItem("cnt");


doc.toOrder.onclick = () => {
    if (!rem && !con) {
        alert("התחבר/הרשם");
        window.location.href = "./conect.html";
    }
    else {
        window.location.href = "./orders.html";
    }
}

//שתיה
if (doc.list1) {
    loadData('../json/hot.Json')
        .then((allMsgs) => {
            console.log(allMsgs);
            drawDrinks(allMsgs, doc.list1);
        })
        .catch((error) => {
            console.error(error);
        });
}

if (doc.list2) {
    loadData('../json/drinkCold.Json')
        .then((allMsgs) => {
            console.log(allMsgs);
            drawDrinks(allMsgs, doc.list2);
        })
        .catch((error) => {
            console.error(error);
        })
}

function drawDrinks(products, list) {
    products.forEach(product => {
        drawdrink(product, list);
    });
}

//יוצר איבר אחד של מוצר
function drawdrink(pro, list) {
    // Create a new link element
    let newLink = document.createElement('a');
    // Create a new product div element
    var newProductDiv = document.createElement('div');
    newProductDiv.className = 'product1';
    newProductDiv.id="dr"+pro.code;

    newProductDiv.style.backgroundImage = `url(${pro.src})`;

    // Create a new h6 element for the product name
    var newProductName = document.createElement('h6');
    newProductName.className = 'productName';
    newProductName.textContent = pro.name;
    newProductName.id="n"+pro.code;

    var newProductPrice = document.createElement('h6');
    newProductPrice.className = 'productName';
    newProductPrice.textContent = pro.price;
    newProductPrice.id="p"+pro.code;

    // Append the product name to the product div
    newProductDiv.appendChild(newProductPrice);
    newProductDiv.appendChild(newProductName);
    
    let baskate = JSON.parse(localStorage.getItem("baskate"));
    if(baskate){
        for(let i=0;i<baskate.length;i++){
        if(pro.code===baskate[i].code){
            newProductDiv.classList.add('after');
            newProductPrice.classList.add('after');
            newProductName.classList.add('after');        
        }
    }}

    // Append the product div to the link
    newLink.appendChild(newProductDiv);
    let flag=false;
    baskate = JSON.parse(localStorage.getItem("baskate"));
    if(baskate){
        for(let i=0;i<baskate.length;i++){
            if(pro.code===baskate[i].code){
                flag=true;
            }
        }
    }
    newLink.onclick = () => {
        let flag=false;
        baskate = JSON.parse(localStorage.getItem("baskate"));
        if(baskate){
            for(let i=0;i<baskate.length;i++){
                if(pro.code===baskate[i].code){
                    flag=true;
                }
            }
        }
        if(flag===true){
            removeD(pro);
        }
        else{
            addD(pro,newProductDiv,newProductPrice,newProductName);
        }
    }
    // Append the link to the parent div
    list.appendChild(newLink);
}


function addD(pro,newProductDiv,newProductPrice,newProductName) {
    let baskate = JSON.parse(localStorage.getItem("baskate"));
    if(baskate===null){
        baskate = [];
    }
    baskate.push(pro);
    localStorage.setItem("baskate", JSON.stringify(baskate));
    let cnt = JSON.parse(localStorage.getItem("cnt"));
    localStorage.setItem("cnt", cnt + 1);
    doc.cnt.textContent = localStorage.getItem("cnt");
    newProductDiv.classList.add('after');
    newProductPrice.classList.add('after');
    newProductName.classList.add('after');
}



function removeD(pro) {
    let baskate = JSON.parse(localStorage.getItem("baskate"));
    baskate = baskate.filter((x) => { return x.code !== pro.code });
    localStorage.setItem("baskate", JSON.stringify(baskate));
    let cnt = JSON.parse(localStorage.getItem("cnt"));
    localStorage.setItem("cnt", cnt -1);
    doc.cnt.textContent = localStorage.getItem("cnt");
    let newProductDiv=document.getElementById("dr"+pro.code);
    if(newProductDiv)
    {    newProductDiv.classList.remove('after');
        let newProductPrice=document.getElementById("p"+pro.code);
        newProductPrice.classList.remove('after');
        let newProductName=document.getElementById("n"+pro.code);
        newProductName.classList.remove('after');}
}


//סל

const don={
    bbody:document.getElementById('bbody'),
    bconfirm:document.getElementById('bconfirm'),
    b:document.getElementById('b'),
    bempty:document.getElementById('bempty'),
    bclose:document.getElementById('bclose'),
    cbody:document.getElementById('cbody'),
    sum:document.getElementById('sum'),
    cname:document.getElementById('cname'),
    ctel:document.getElementById('ctel'),
    caddress:document.getElementById('caddress'),
    cmail:document.getElementById('cmail'),
    x:document.getElementById('x'),

};

b.onclick=()=>{
    onopen();
}

function onopen() {
    don.bbody.innerHTML="";
    let baskate1=JSON.parse(localStorage.getItem("baskate1"));
    let baskate=JSON.parse(localStorage.getItem("baskate"));
    if(((!baskate1)||baskate1.length===0)&&((!baskate)||baskate.length===0)){
        don.bempty.textContent="הסל שלך ריק";
    }
    else{
        don.bempty.textContent="";
        if(baskate1){
            baskate1.forEach(element => {
                createline(element,true)
            });
        }
        if(baskate){
            baskate.forEach(element => {
                createline(element,false)
            });
        }

    }

}
function createline(element,flag) {
    if(flag){
        // Create the outer container div
        const outerDiv = document.createElement("div");
        outerDiv.classList.add("bline");
        outerDiv.id="line"+element.code;

        // Create the inner container div
        const innerDiv = document.createElement("div");
        innerDiv.classList.add("d-flex", "justify-content-between", "align-items-center");

        // Create the image element
        const imgElement = document.createElement("img");
        imgElement.src = element.src;
        imgElement.classList.add("bimg", "p-2", "flex-fil");

        // Create the name div
        const nameDiv = document.createElement("div");
        nameDiv.classList.add("bname", "p-2", "flex-fil");
        nameDiv.innerText = element.name;

        // Create the price div
        const priceDiv = document.createElement("div");
        priceDiv.classList.add("bprice", "p-2", "flex-fil");
        priceDiv.innerText = "מחיר: "+element.price;

        // Create the input element
        const inputElement = document.createElement("input");
        inputElement.setAttribute("type", "number");
        inputElement.setAttribute("min", "1");
        inputElement.setAttribute("max", "5");
        inputElement.classList.add("form-control", "bcnt");
        inputElement.setAttribute("value", element.amount);
        inputElement.setAttribute("name", "name");
        inputElement.onchange=(event)=>{
            let value = event.target.value;
            element.amount=value;
            let baskate1 = JSON.parse(localStorage.getItem("baskate1"));
            baskate1 = baskate1.filter((x) => { return x.code !== element.code });
            baskate1.push(element);
            localStorage.setItem("baskate1", JSON.stringify(baskate1));
        }

        // Create the delete button
        const deleteButton = document.createElement("a");
        deleteButton.setAttribute("type", "button");
        deleteButton.classList.add("bdelete");
        deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>';
        deleteButton.onclick=()=>{
            remove(element);
            let d=document.getElementById("line"+element.code)
            don.bbody.removeChild(d);
        }

        // Append image, name, price, input, and delete button to the inner container div
        innerDiv.appendChild(imgElement);
        innerDiv.appendChild(nameDiv);
        innerDiv.appendChild(priceDiv);
        innerDiv.appendChild(inputElement);
        innerDiv.appendChild(deleteButton);

        // Create the second inner div for the additional images
        const secondInnerDiv = document.createElement("div");
        secondInnerDiv.classList.add("d-flex", "justify-content-start");

        element.adds.forEach(add => {
            const additionalImg1 = document.createElement("img");
            additionalImg1.src = add.src;
            additionalImg1.classList.add("rounded-circle");
            additionalImg1.style.width = "25px";
            secondInnerDiv.appendChild(additionalImg1);
        })

        // Append the inner and second inner divs to the outer div
        outerDiv.appendChild(innerDiv);
        outerDiv.appendChild(secondInnerDiv);

        // Append the outer div to the body or any other desired parent element
        don.bbody.appendChild(outerDiv);

    }
    else{
        // Create the outer container div
        const outerDiv = document.createElement("div");
        outerDiv.classList.add("bline");
        outerDiv.id="line"+element.code;

        // Create the inner container div
        const innerDiv = document.createElement("div");
        innerDiv.classList.add("d-flex", "justify-content-between", "align-items-center");

        // Create the image element
        const imgElement = document.createElement("img");
        imgElement.src = element.src;
        imgElement.classList.add("bimg", "p-2", "flex-fil");

        // Create the name div
        const nameDiv = document.createElement("div");
        nameDiv.classList.add("bname", "p-2", "flex-fil");
        nameDiv.innerText = element.name;

        // Create the price div
        const priceDiv = document.createElement("div");
        priceDiv.classList.add("bprice", "p-2", "flex-fil");
        priceDiv.innerText = "מחיר: "+element.price;

        // Create the input element
        const inputElement = document.createElement("input");
        inputElement.setAttribute("type", "number");
        inputElement.setAttribute("max", "5");
        inputElement.setAttribute("min", "1");
        inputElement.classList.add("form-control", "bcnt");
        inputElement.setAttribute("value", element.amount);
        inputElement.setAttribute("name", "name");
        inputElement.onchange=(event)=>{
            let value = event.target.value;
            element.amount=value;
            let baskate = JSON.parse(localStorage.getItem("baskate"));
            baskate = baskate.filter((x) => { return x.code !== element.code });
            baskate.push(element);
            localStorage.setItem("baskate", JSON.stringify(baskate));        
        }

        // Create the delete button
        const deleteButton = document.createElement("a");
        deleteButton.setAttribute("type", "button");
        deleteButton.classList.add("bdelete");
        deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>';
        deleteButton.onclick=()=>{
            removeD(element);
            let d=document.getElementById("line"+element.code)
            don.bbody.removeChild(d);
        }

        // Append image, name, price, input, and delete button to the inner container div
        innerDiv.appendChild(imgElement);
        innerDiv.appendChild(nameDiv);
        innerDiv.appendChild(priceDiv);
        innerDiv.appendChild(inputElement);
        innerDiv.appendChild(deleteButton);

        // Append the inner and second inner divs to the outer div
        outerDiv.appendChild(innerDiv);

        // Append the outer div to the body or any other desired parent element
        don.bbody.appendChild(outerDiv);
    }
}

//אישור סל
don.bconfirm.onclick =() => {
    location.href="../html/confirm.html";
}
if(don.cbody)
{
    conopen();
    let s=0;
    let baskate1=JSON.parse(localStorage.getItem("baskate1"));
    let baskate=JSON.parse(localStorage.getItem("baskate"));
    if(baskate){
        baskate.forEach(element => {
            s+=(element.price*element.amount);
        });
    }
    if(baskate1){
        baskate1.forEach(element => {
            s+=(element.price*element.amount);
        });
    }
    don.sum.innerHTML=s;

    const detail=JSON.parse(localStorage.getItem("user"));
    don.cname.innerHTML=detail.name;
    don.ctel.innerHTML=detail.phon;
    don.caddress.innerHTML=detail.address;

    don.x.onclick=()=>{
        location.href="./../html/Credit_Card.html"
    }
    


}
function conopen() {
    don.bempty.innerHTML="";
    let baskate1=JSON.parse(localStorage.getItem("baskate1"));
    let baskate=JSON.parse(localStorage.getItem("baskate"));
    if(((!baskate1)||baskate1.length===0)&&((!baskate)||baskate.length===0)){
        don.bempty.innerHTML="הסל שלך ריק";
    }
    else{
        don.bempty.innerHTML="";
        if(baskate1){
            baskate1.forEach(element => {
                ccreateline(element,true)
            });
        }
        if(baskate){
            baskate.forEach(element => {
                ccreateline(element,false)
            });
        }
    }
}

function ccreateline(element,flag) {
    if(flag){
        // Create the outer container div
        const outerDiv = document.createElement("div");
        outerDiv.classList.add("cline");
        outerDiv.id="cline"+element.code;

        // Create the inner container div
        const innerDiv = document.createElement("div");
        innerDiv.classList.add("d-flex", "justify-content-between", "align-items-center");

        // Create the image element
        const imgElement = document.createElement("img");
        imgElement.src = element.src;
        imgElement.classList.add("bimg", "p-2", "flex-fil");

        // Create the name div
        const nameDiv = document.createElement("div");
        nameDiv.classList.add("bname", "p-2", "flex-fil");
        nameDiv.innerText = element.name;

        // Create the price div
        const priceDiv = document.createElement("div");
        priceDiv.classList.add("bprice", "p-2", "flex-fil");
        priceDiv.innerText = "מחיר: "+element.price;

        // Create the input element
        const inputElement = document.createElement("input");
        inputElement.setAttribute("type", "number");
        inputElement.setAttribute("min", "1");
        inputElement.setAttribute("max", "5");
        inputElement.classList.add("form-control", "bcnt");
        inputElement.setAttribute("value", element.amount);
        inputElement.setAttribute("name", "name");
        inputElement.onchange=(event)=>{
            let value = event.target.value;
            element.amount=value;
            let baskate1 = JSON.parse(localStorage.getItem("baskate1"));
            baskate1 = baskate1.filter((x) => { return x.code !== element.code });
            baskate1.push(element);
            localStorage.setItem("baskate1", JSON.stringify(baskate1));
            location.reload();       
         }

        // Create the delete button
        const deleteButton = document.createElement("a");
        deleteButton.setAttribute("type", "button");
        deleteButton.classList.add("bdelete");
        deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>';
        deleteButton.onclick=()=>{
            remove(element);
            let d=document.getElementById("cline"+element.code)
            don.cbody.removeChild(d);
            location.reload();       
        }

        // Append image, name, price, input, and delete button to the inner container div
        innerDiv.appendChild(imgElement);
        innerDiv.appendChild(nameDiv);
        innerDiv.appendChild(priceDiv);
        innerDiv.appendChild(inputElement);
        innerDiv.appendChild(deleteButton);

        // Create the second inner div for the additional images
        const secondInnerDiv = document.createElement("div");
        secondInnerDiv.classList.add("d-flex", "justify-content-start");

        element.adds.forEach(add => {
            const additionalImg1 = document.createElement("img");
            additionalImg1.src = add.src;
            additionalImg1.classList.add("rounded-circle");
            additionalImg1.style.width = "25px";
            secondInnerDiv.appendChild(additionalImg1);
        })

        // Append the inner and second inner divs to the outer div
        outerDiv.appendChild(innerDiv);
        outerDiv.appendChild(secondInnerDiv);

        // Append the outer div to the body or any other desired parent element
        don.cbody.appendChild(outerDiv);

    }
    else{
        // Create the outer container div
        const outerDiv = document.createElement("div");
        outerDiv.classList.add("cline");
        outerDiv.id="cline"+element.code;

        // Create the inner container div
        const innerDiv = document.createElement("div");
        innerDiv.classList.add("d-flex", "justify-content-between", "align-items-center");

        // Create the image element
        const imgElement = document.createElement("img");
        imgElement.src = element.src;
        imgElement.classList.add("bimg", "p-2", "flex-fil");

        // Create the name div
        const nameDiv = document.createElement("div");
        nameDiv.classList.add("bname", "p-2", "flex-fil");
        nameDiv.innerText = element.name;

        // Create the price div
        const priceDiv = document.createElement("div");
        priceDiv.classList.add("bprice", "p-2", "flex-fil");
        priceDiv.innerText = "מחיר: "+element.price;

        // Create the input element
        const inputElement = document.createElement("input");
        inputElement.setAttribute("type", "number");
        inputElement.setAttribute("min", "1");
        inputElement.setAttribute("max", "5");
        inputElement.classList.add("form-control", "bcnt");
        inputElement.setAttribute("value", element.amount);
        inputElement.setAttribute("name", "name");
        inputElement.onchange=(event)=>{
            let value = event.target.value;
            element.amount=value;
            let baskate = JSON.parse(localStorage.getItem("baskate"));
            baskate = baskate.filter((x) => { return x.code !== element.code });
            baskate.push(element);
            localStorage.setItem("baskate", JSON.stringify(baskate)); 
            location.reload();       
        }

        // Create the delete button
        const deleteButton = document.createElement("a");
        deleteButton.setAttribute("type", "button");
        deleteButton.classList.add("bdelete");
        deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>';
        deleteButton.onclick=()=>{
            removeD(element);
            let d=document.getElementById("cline"+element.code)
            don.cbody.removeChild(d);
            location.reload();       
        }

        // Append image, name, price, input, and delete button to the inner container div
        innerDiv.appendChild(imgElement);
        innerDiv.appendChild(nameDiv);
        innerDiv.appendChild(priceDiv);
        innerDiv.appendChild(inputElement);
        innerDiv.appendChild(deleteButton);

        // Append the inner and second inner divs to the outer div
        outerDiv.appendChild(innerDiv);

        // Append the outer div to the body or any other desired parent element
        don.cbody.appendChild(outerDiv);
    }
}






//מוצרים
//שולף את המוצרים
function loadDataPro() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '../json/products.Json',
            success: (allMsgs) => {
                resolve(allMsgs);
            },
            error: function (xhr, status, error) {
                console.log(xhr);
                alert("An error occurred. Check the console for more details.");
            }
        });
    })
}

if(doc.list)
{loadDataPro()
    .then((allMsgs) => {
        console.log(allMsgs);
        drawProducts(allMsgs);
    })
    .catch((error) => {
        console.error(error);
    })}




//יוצר  מודל
function creatModal(pro) {
    //יוצר את הכותרת
    //h4
    let nh4 = document.createElement('h4');
    nh4.className = 'modal-title';
    nh4.id = 'header' + pro.code;
    nh4.style.direction = 'rtl';
    // כפתור של x
    let nbuttonX = document.createElement('button');
    nbuttonX.type = ('button');
    nbuttonX.classList = 'btn-close';
    nbuttonX.onclick=()=>{
        sessionStorage.setItem("adds", "[]");
    }
    nbuttonX.setAttribute("data-bs-dismiss", "modal");
    //יוצר את הכותרת
    let nHeader = document.createElement('div');
    nHeader.className = 'modal-header';
    //מכניס הכל לכותרת
    nHeader.appendChild(nh4);
    nHeader.appendChild(nbuttonX);

    //יוצר את הגוף
    let nitems = document.createElement('div');
    nitems.className = 'products';
    nitems.id = 'items' + pro.code;
    let nbody = document.createElement('div');
    nbody.classList = 'modal-body products';
    nbody.appendChild(nitems);

    //יוצר את הכפתור בסוף
    let nbutton = document.createElement('button');
    nbutton.type = ('button');
    nbutton.classList = 'btn btn-danger';
    nbutton.textContent = '?להתחיל';
    nbutton.id='button'+ pro.code;
    nbutton.onclick=()=>{
        const tostart=document.getElementById("button" + pro.code);
        tostart.style="display:none";
        start(pro,0);
    }
    let nfooter = document.createElement('div');
    nfooter.className = 'modal-footer';
    nfooter.id="footer"+pro.code;
    nfooter.appendChild(nbutton);

    //דיב פנימי
    let ndiv3 = document.createElement('div');
    ndiv3.className = 'modal-content';
    ndiv3.appendChild(nHeader);
    ndiv3.appendChild(nbody);
    ndiv3.appendChild(nfooter);


    //דיב אמצעי
    let ndiv2 = document.createElement('div');
    ndiv2.classList = 'modal-dialog modal-xl';
    ndiv2.appendChild(ndiv3);


    //דיב חיצוני
    let ndiv1 = document.createElement('div');
    ndiv1.classList = 'modal';
    ndiv1.id = pro.code;
    ndiv1.appendChild(ndiv2);
    doc.modals.appendChild(ndiv1);
}

//עובר על כל מערך המוצרים
function drawProducts(products) {
    products.forEach(product => {
        drawProduct(product);
    });
}


//יוצר איבר אחד של מוצר
function drawProduct(pro) {
    // Create a new link element
    let newLink = document.createElement('a');
    newLink.type='button';
    // Create a new product div element
    var newProductDiv = document.createElement('div');
    newProductDiv.className = 'product1';
    newProductDiv.style.backgroundImage = `url(${pro.src})`;
    newProductDiv.id='big'+pro.code;
    newProductDiv.setAttribute("data-bs-toggle", "modal");
    newProductDiv.setAttribute("data-bs-target",`#${pro.code}`);

    // Create a new h6 element for the product name
    var newProductName = document.createElement('h6');
    newProductName.className = 'productName';
    newProductName.textContent = pro.name;
    newProductName.id='name'+pro.code;

    var newProductPrice = document.createElement('h6');
    newProductPrice.className = 'productName';
    newProductPrice.textContent = pro.price;
    newProductPrice.id='price'+pro.code;

    // Append the product name to the product div
    newProductDiv.appendChild(newProductPrice);
    newProductDiv.appendChild(newProductName);

    let baskate1 = JSON.parse(localStorage.getItem("baskate1"));
    if(baskate1){
        for(let i=0;i<baskate1.length;i++){
        if(pro.code===baskate1[i].code){
            newProductDiv.classList.add('after');
            newProductPrice.classList.add('after');
            newProductName.classList.add('after');        
        }
    }}

    // Append the product div to the link
    newLink.appendChild(newProductDiv);
    let flag=false;
    baskate1 = JSON.parse(localStorage.getItem("baskate1"));
    if(baskate1){
        for(let i=0;i<baskate1.length;i++){
            if(pro.code===baskate1[i].code){
                flag=true;
            }
        }
    }
    newLink.onclick = () => {
        if(flag===true){
            remove(pro);
        }
    }
    // Append the link to the parent div
    doc.list.appendChild(newLink);
    //יצירת מודל
    creatModal(pro);
}
function add(pro) {
    let baskate1 = JSON.parse(localStorage.getItem("baskate1"));
    if(baskate1===null){
        baskate1 = [];
    }
    let adds=JSON.parse(sessionStorage.getItem("adds"))
    pro.adds=adds;
    baskate1.push(pro);
    sessionStorage.setItem("adds","[]");
    localStorage.setItem("baskate1", JSON.stringify(baskate1));
    let cnt = JSON.parse(localStorage.getItem("cnt"));
    localStorage.setItem("cnt", cnt + 1);
    doc.cnt.textContent = localStorage.getItem("cnt");
    let newProductDiv=document.getElementById("big"+pro.code);
    let newProductPrice=document.getElementById("price"+pro.code);
    let newProductName=document.getElementById("name"+pro.code);

    newProductDiv.classList.add('after');
    newProductPrice.classList.add('after');
    newProductName.classList.add('after');
}

function remove(pro) {
    let baskate1 = JSON.parse(localStorage.getItem("baskate1"));
    baskate1 = baskate1.filter((x) => { return x.code !== pro.code });
    localStorage.setItem("baskate1", JSON.stringify(baskate1));
    let cnt = JSON.parse(localStorage.getItem("cnt"));
    localStorage.setItem("cnt", cnt -1);
    doc.cnt.textContent = localStorage.getItem("cnt");
    let newProductDiv=document.getElementById('big'+pro.code);
    if(newProductDiv)
    {newProductDiv.classList.remove('after');
    let newProductPrice=document.getElementById('price'+pro.code);
    newProductPrice.classList.remove('after');
    let newProductName=document.getElementById('name'+pro.code);
    newProductName.classList.remove('after');
    }
}

function start(pro,index) {
    print(pro,index);
}
function print(pro,i) {
    let body = document.getElementById("items" + pro.code);
    body.innerHTML = "";
    let footer = document.getElementById("footer" + pro.code);
    footer.innerHTML = "";

    loadData(pro.arrP[i])
      .then((allMsgs) => {
        console.log(allMsgs);
        drawItems(allMsgs, body);
      })
      .catch((error) => {
        console.error(error);
      });
      if(i===pro.arrP.length-1){
        createBx(pro);
      }
      else{
        createB(pro);
        const button = document.getElementById('next'+ pro.code);
        button.onclick=()=>{
            start(pro,i+1);
        }
      }

}

function createB(pro) {
    //יוצר את הכפתור בסוף
    let nbutton = document.createElement('button');
    nbutton.type = ('button');
    nbutton.classList = 'btn btn-danger';
    nbutton.textContent = 'הבא';
    nbutton.id='next'+ pro.code;
    let footer=document.getElementById("footer"+pro.code);
    footer.appendChild(nbutton);
}

function createBx(pro) {
    //יוצר את הכפתור בסוף
    let nbutton = document.createElement('button');
    nbutton.type = ('button');
    nbutton.classList = 'btn btn-danger';
    nbutton.textContent = 'סיים';
    nbutton.id='next'+ pro.code;
    nbutton.onclick=()=>{
        add(pro);
        location.href='../html/products.html';
    }

    let footer=document.getElementById("footer"+pro.code);
    footer.appendChild(nbutton);
}


function loadData(url) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            success: (allMsgs) => {
                resolve(allMsgs);
            },
            error: function (xhr, status, error) {
                console.log(xhr);
                alert("An error occurred. Check the console for more details.");
            }
        });
    })
}
function drawItems(products,code) {
    products.forEach(item => {
        drawItem(item,code);
    });
}

function drawItem(item, code){
    let newItemA = document.createElement('a');

    let newItemDiv = document.createElement('div');
    newItemDiv.classList = 'product2 rounded';
    newItemDiv.textContent = item.name;
    newItemDiv.style.backgroundImage = `url(${item.src})`;
    newItemA.onclick = () => {
        if(newItemDiv.classList.contains("after")) {
                removeI(item,newItemDiv);
        }
        else{
            addI(item,newItemDiv);
        }
    }
    newItemA.appendChild(newItemDiv);
    code.appendChild(newItemA);

}


function addI(item,newItemA) {
    var adds = JSON.parse(sessionStorage.getItem("adds"));
    if(adds===null){
        adds = [];
    }
    adds.push(item);
    sessionStorage.setItem("adds", JSON.stringify(adds));
    newItemA.classList.add('after');
}
function removeI(item,newItemA) {
    let adds = JSON.parse(sessionStorage.getItem("adds"));
    adds = adds.filter((x) => { return x.code !== item.code });
    sessionStorage.setItem("adds", JSON.stringify(adds));
    newItemA.classList.remove('after');
}
