// 导入头部
import header from "./header.js";

// 获取头部元素
let container = document.querySelector('.container');

// 渲染头部
container.innerHTML = header();

// 获取nav分类元素
let nav_list = document.querySelector(".nav_list");





// 分页的功能
// pagination
let page = document.querySelector(".pagenation");
new Pagination(page, {
    pageInfo: {
        pagenum: 1, // 默认显示第一几页
        pagesize: 20, // 每一页多少条数据
        total: 1000, // 总共有多少条数据
        totalpage: 100, // 总共有多少页
    },
    textInfo: {
        first: "首页",
        prev: "上一页",
        next: "下一页",
        last: "末尾",
    },
    change(idx) {
        // 点击分页的时候 重新获取分页的数据 渲染结构
        // idx:表示当前点击的页数
        let category = localStorage.getItem("category");
        let sub_category = localStorage.getItem("sub_category");

        // 请求数据的参数的处理
        let str = `${category ? "category=" + category : ""}&${
            sub_category ? "sub_category=" + sub_category : ""
        }&limit=20&page=${idx}`;

        getList(str);
        scrollTo({
            top: 0,
            behavior: "smooth"
        });
    },
});

getNav();

// 获取nav分类数据
async function getNav() {
    let res = await pAjax({
        url: "../data/nav.json",
    })
    localStorage.setItem('res', res)
    res = JSON.parse(res);
    randNav(res)
}

// 渲染分类和设计服务分类的数据
function randNav(data) {
    let str = data.map((item, index) => {
        return `<a href="#" category="${item.category}" 
        class="${index==0?"active":""} item">${item.name}</a>`
    }).join('');

    nav_list.innerHTML = str;
    div.innerHTML = str;

    randNavSub(data[0].sub)
}

let nav1_sub = document.querySelector(".nav1_sub");
let nav_list2 = document.querySelector(".nav1_sub .nav_content .nav_list");
// 渲染子类
function randNavSub(data) {
    if (data.length == 0) {
        nav1_sub.style.display = "none";
        return;
    }
    nav1_sub.style.display = "block";
    nav_list2.innerHTML = data.map(item => {
        // console.log(item);
        return `<a sub_category="${item.sub_category}" class="item">${item.name}</a>`
    }).join("")

}

navclick();

// 分类绑定点击事件
function navclick() {
    nav_list.onclick = function (e) {
        if (e.target.classList.contains("item")) {
            // 获取分类中所有的active属性并移出
            nav_list.querySelector(".active").classListNaNpxove("active");

            // 给点击的值加上active属性
            e.target.classList.add("active");

            // 获取点击值得属性值
            let i = e.target.getAttribute("category");

            // 获取本地缓存中的nav数据
            let data = JSON.parse(localStorage.getItem("res"));

            // 判断点击的元素是否存在category
            if (!i) {
                getList();
                // 如果没有就清楚缓存category
                localStorageNaNpxoveItem('category');
                localStorageNaNpxoveItem("sub_category");
                // 再次渲染子类
                randNavSub(data[0].sub);
                getList();
                return;
            }
            // 把点击的元素的category存在本地中
            localStorage.setItem("category", i);

            // 筛选点击后的数据
            let res = data.filter(item => {
                return item.category == i;
            })
            randNavSub(res[0].sub);

            getList({
                category: i
            });
        }
    }

}


// 给子类绑定点击事件
nav_list2.onclick = function (e) {
    if (e.target.classList.contains("item")) {

        // 获取还有active类名的元素
        let active = nav_list2.querySelector(".active");

        //  判断有无，有则移出active属性
        active && active.classListNaNpxove("active");

        // 给点击的值加上active属性
        e.target.classList.add("active");

        //  获取当前点击元素的属性
        let sub_category = e.target.getAttribute("sub_category");

        // 获取缓存中分类的值
        let i = localStorage.getItem("category");

        // 把当前点击元素的属性存在本地缓存中
        localStorage.setItem("sub_category", sub_category);

        // 渲染结构
        getList({
            category: i,
            sub_category: sub_category
        })
    }
}



//获取头部设计服务元素
let div = document.querySelector(".submenu div");

// 设计服务二级导航绑定点击事件
div.onclick = function (e) {
    if (e.target.classList.contains("item")) {
        let category = e.target.getAttribute('category');
        //   let i = document.classList.contains("category");
        //   console.log(i);
        //    console.log(category);
        let optioon = {
            "category": category
        };
        getList(optioon);
    }
}





getList();

let category = localStorage.getItem("category");
// console.log(category);


if (category == "") {
    localStorage.removeItem('category');
    getList();
    // return;
} else {
    category = {
        "category": category
    };
    getList(category);
}





// 获取页表数据
async function getList(data) {
    let res = await pAjax({
        url: "https://muse.huaban.com/api/v1/services/",
        data: data,
    })
    res = JSON.parse(res)
    // console.log(res);
    randList(res)
}



// 渲染页表结构
function randList(data) {
    list_content.innerHTML = data.map(item => {
        //    console.log(item);
        return `<div class="item">
        <img src="https://muse-img.huabanimg.com/${item.cover[0].key}_/both/280x280"
            alt="" class = "images" service_id="${item.service_id}" />
        <label class="title">${item.name}</label>
        <footer class="extra">
            <label class="price">
                ${item.price==0?
                    "价格面议": 
                    "￥"+ item.price+ "<small>/" +
                item.unit +
                "</small>"}
                
            </label>
            <p class="tip">${item.extra.urgent ? "提供加急服务" : ""} ${
                item.extra.sub_services.length != 0 ? "提供可拓展服务" : ""
            } </p>
        </footer>
    </div>`
    }).join("")
}

let list_content = document.querySelector(".list_content");
// 每一个商品绑定点击事件，跳转到商品详情页
list_content.onclick = function (e) {
    if (e.target.classList.contains("images")) {
        let service_id = e.target.getAttribute("service_id");
        location.href = `../html/detail.html?id=${service_id}`;
    }
}


// 登录，注册绑定点击事件
let login_register = document.querySelector(".login_register");

login_register.onclick = function (e) {
    if (e.target.classList.contains("login")) {
        location.href = "../html/login.html";
    }

    if (e.target.classList.contains("register")) {
        location.href = "../html/zhuce.html";
    }
}