let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let count = document.getElementById("count");
let create = document.getElementById("create");

let mood = "create";
let temp;
// get Total

function getTotal() {
    if (price.value !== "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "#040"
    }
    else {
        total.innerHTML = "";
        total.style.backgroundColor = "#a00d02";
    }
}

// Create product
let dataPro = [];

if (localStorage.getItem("product") !== "") {
    dataPro = JSON.parse(localStorage.getItem('product'));
}
else {
    let dataPro = [];
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
            saveData();
        }
        else {
            dataPro[temp] = newPro; // temp is a global variable created to put "i" in it.
            mood = "create";
            create.innerHTML = "Create";
        }
        function saveData() {
            localStorage.setItem("product", JSON.stringify(dataPro));
        }
        saveData();
        console.log(dataPro);
        clearData();
        readData();
    }
    else if (newPro.count > 100) {
        alert("NOTICE: The Max Value Of Count is: 100.");
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
        console.log(dataPro[i]);
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
            </tr>
            `
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
    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro);
    readData();
}
// delete all items

function deleteAllFunc() {
    console.log("hello");
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
