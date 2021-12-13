// 导入头部
import header from "./header.js";

// 获取头部元素
let container = document.querySelector('.container');


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

    div.innerHTML = str;
}

// 登录，注册绑定点击事件
let login_register = document.querySelector(".login_register");

login_register.onclick = function(e){
    if(e.target.classList.contains("login")){
        location.href = "../html/login.html";
    }

    if(e.target.classList.contains("register")){
        location.href = "../html/zhuce.html";
    }
}


     // 设计服务二级导航绑定点击事件
     div.onclick = function (e) {
        let category = e.target.getAttribute('category');
        // localStorage.setItem("category",category);
        
        console.log(category);
        if(category==""){
            location.href = "../html/service.html";
            return;

        }
        location.href = `../html/service.html?category=${category}`;
    }