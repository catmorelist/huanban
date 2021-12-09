// 导入头部
import header from "./header.js";

// 获取头部元素
let container = document.querySelector('.container');

// 获取nav分类元素
let navs1_1 = document.querySelector(".navs1_1");

// 渲染头部
container.innerHTML = header();

//获取头部设计服务元素
let div = document.querySelector(".submenu div");
// console.log(div);


getNav();

// 获取nav分类数据
async function getNav() {
    let res = await pAjax({
        url: "../data/nav.json",
    })
    localStorage.setItem('res', res)
    res = JSON.parse(res);
    // console.log(res);
    randNav(res)
}

// 渲染分类和设计服务分类的数据
function randNav(data) {
    let str = data.map((item, index) => {
        return `<a href="#" category="${item.category}" 
        class="${index==0?"active":""}">${item.name}</a>`
    }).join('');

    navs1_1.innerHTML = str;
    div.innerHTML = str;
}

navs1_1.onclick = function (e) {
    navs1_1.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");

    let i = e.target.getAttribute("category");
    let data = JSON.parse(localStorage.getItem("res"));

    let res = data.filter(item=>{
        // console.log(item.category);
        return item.category == i;
    })
    
}

let concretes = dcoument.querySelector(".concretes");

getList();

// 获取页表数据
async function getList(){
    let res = await pAjax({
        url: "https://muse.huaban.com/api/v1/services/",
    })
    res = JSON.parse(res)
    randList(res)
}

// 渲染结构
function randList(data){
    container.innerHTML = data.map(item=>{
        return ``
    })
}

