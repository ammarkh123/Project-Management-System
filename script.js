let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let count = document.getElementById("count");
var create = document.getElementById("create");

let mood = "create";
let temp;
// get Total

function getTotal() {
    if (price.value !== "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "#040";
        total.style.color = "#fff";
    }
    else {
        total.innerHTML = "";
        total.style.backgroundColor = "#a00d02";
    }
}

// Create product
let dataPro;

if (localStorage.getItem("product")) {
    dataPro = JSON.parse(localStorage.getItem('product')); //  JSON.parse => from string to object
}
else {
    dataPro = [];
}

create.onclick = function createPro() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value.toLowerCase(),
        count: count.value,
    }
    //----------count-----------
    if (newPro.count <= 100
        && newPro.title != ""
        && newPro.price != ""
        && newPro.category != "") {
        if (mood === "create") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            }
            else {
                dataPro.push(newPro);
            }
        }
        else {
            dataPro[temp] = newPro; // temp is a global variable created to put "i" in it.
            mood = "create";
            create.innerHTML = "Create";
        }
        localStorage.setItem("product", JSON.stringify(dataPro));
        console.log(dataPro);
        clearData();
        readData();
    }
    else if (newPro.count > 100) {
        alert("NOTICE: The Max Value Of Count is: 100", "color: red")
    }
}

// clear inputs

function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
    total.style.backgroundColor = "#930303";
}

// save local storage
// read
function readData() {
    getTotal();
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        // console.log(dataPro[i]);
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].category}</td>
            <td>${dataPro[i].total}</td>
            <td><button onclick = "updateData(${i})" id="update">Update</button></td>
            <td><button onclick = "deleteItem(${i})" id="Delete">Delete</button></td>
        </tr>`
    }
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = table;

    let btnDelete = document.getElementById("deleteAll");
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAllFunc()">Delete All (${dataPro.length})</button>
        `
    }
    else {
        btnDelete.innerHTML = "";
    }
}
readData();

// delete item
// let deletePro = document.getElementById("Delete");
function deleteItem(i) {
    dataPro.splice(i, 1);
    localStorage.setItem("product", JSON.stringify(dataPro));
    readData();
}
// delete all items

function deleteAllFunc() {
    // console.log("Delete all function");
    dataPro.splice(0);
    localStorage.product = [];
    readData();
}

// count



// update data

function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    count.style.display = "none";
    create.innerHTML = "Update";
    mood = "update";
    getTotal();
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    });
}
// clean data

// search
let searchMood = 'category';
let search = document.getElementById("search");
function getSearchMode(id) {
    if (id == 'search-title') {
        searchMood = 'title';
    }
    else {
        searchMood = 'category';
    }
    search.focus();
    search.value = '';
    search.placeholder = "Search BY " + searchMood;
    readData();
}

function searchData(value) {
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood === 'title') {
            if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].category}</td>
                <td>${dataPro[i].total}</td>
                <td><button onclick = "updateData(${i})" id="update">Update</button></td>
                <td><button onclick = "deleteItem(${i})" id="Delete">Delete</button></td>
            </tr>`
            }
        }
        else if (searchMood === 'category') {
            searchMood = 'category';
            if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
                console.log(value);
                table += `
                <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].category}</td>
                <td>${dataPro[i].total}</td>
                <td><button onclick = "updateData(${i})" id="update">Update</button></td>
                <td><button onclick = "deleteItem(${i})" id="Delete">Delete</button></td>
                </tr>`
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}

// Light Mood & Dark Mood
let changeBtn = document.querySelector(".change #changeMood");
let body = document.querySelector("body");
let form = document.querySelector(".content");
let inputs = document.querySelectorAll("input");
var btns = document.querySelectorAll("button");
let mainTitle = document.querySelector(".head .title");
let thTable = document.querySelectorAll(".table th");
let tdTable = document.querySelectorAll(".table td");
let table = document.querySelector(".output table");

let change = "light";
function moodFunc() {
    // Dark mood
    if (change == "light") {
        change = "dark";
        mainTitle.style.color = "#fff";
        body.classList.add("body-dark");
        body.classList.remove("body-light");
        changeBtn.innerHTML = "Dark Mood";
        changeBtn.classList.add("purple");
        changeBtn.classList.remove("blue");
        (function () {
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].classList.add("in-da");
            }
            for (let i = 0; i < btns.length; i++) {
                btns[i].classList.add("btn-dark");
            }
            for (let i = 0; i < thTable.length; i++) {
                thTable[i].style.backgroundColor = "#65008d";
            }
            for (let i = 0; i < tdTable.length; i++) {
            }
            table.classList.add('tDark');
        })()

    }
    // Light Mood
    else {
        change = "light";
        // body backgroundColor
        body.classList.remove("body-dark");
        body.classList.add("body-light");
        changeBtn.innerHTML = "Light Mood";
        changeBtn.classList.add("blue");
        changeBtn.classList.remove("purple");
        (function () {
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].classList.remove("in-da");
            }
            for (let i = 0; i < btns.length; i++) {
                btns[i].classList.remove("btn-dark");
            }

            mainTitle.style.color = "#000";
            // table style
            for (let i = 0; i < thTable.length; i++) {
                thTable[i].style.backgroundColor = "#007BFF";
                thTable[i].style.color = "#fff";
            }
            for (let i = 0; i < tdTable.length; i++) {
            }
            table.classList.remove("tDark");
        })()
    }
}
changeBtn.addEventListener("click", moodFunc);
