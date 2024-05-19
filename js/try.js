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
            remove(pro,newProductDiv,newProductPrice,newProductName);
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

function remove(pro,newProductDiv,newProductPrice,newProductName) {
    let baskate1 = JSON.parse(localStorage.getItem("baskate1"));
    baskate1 = baskate1.filter((x) => { return x.code !== pro.code });
    localStorage.setItem("baskate1", JSON.stringify(baskate1));
    let cnt = JSON.parse(localStorage.getItem("cnt"));
    localStorage.setItem("cnt", cnt -1);
    doc.cnt.textContent = localStorage.getItem("cnt");
    newProductDiv.classList.remove('after');
    newProductPrice.classList.remove('after');
    newProductName.classList.remove('after');
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

function end(){
    const tostart = document.getElementById("button" + pro.code);
    tostart.style.display = '';
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
