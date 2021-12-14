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

// 调用渲染头部
getNav();
getNavList()

//调用渲染作家信息
getUserList();

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
        let str = `limit=20&page=${idx}`;

        // console.log(str);
        getUserList(str);
        scrollTo({
            top: 0,
            behavior: "smooth"
        });
    },
});


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

async function getNavList() {
    let res = await pAjax({
        url: "../data/sjsNav.json",
    })
    localStorage.setItem('res', res)
    res = JSON.parse(res);
    // console.log(res);
    randNav2(res)
}

// 渲染分类和设计服务分类的数据
function randNav(data) {
    let str = data.map((item, index) => {
        return `<a href="#" category="${item.category}" 
        class="${index==0?"active":""}">${item.name}</a>`
    }).join('');


    div.innerHTML = str;
}

// 渲染分类和设计服务分类的数据
function randNav2(data) {
    let str = data.map((item, index) => {
        return `<a href="#" category="${item.category}" 
        class="${index==0?"active":""}">${item.name}</a>`
    }).join('');

    navs1_1.innerHTML = str;

}

// 分类导航绑定点击事件
navs1_1.onclick = function (e) {
    navs1_1.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");

    let category = e.target.getAttribute("category");
    if (!category) {
        getUserList();
    }

    category = `category=${category}`;
    // console.log(category);
    getUserList(category);
}

// 获取作家json数据
async function getUserList(data) {
    let res = await pAjax({
        url: "https://muse.huaban.com/api/v1/users/",
        data: data,
    })
    // localStorage.setItem("user",res)

    res = JSON.parse(res);
    randUser(res);
}


//获取渲染父元素
let concretes = document.querySelector(".concretes");

concretes.onclick = function (e) {
    if (e.target.classList.contains("a")) {
        console.log(1);
    }
}


// 标签翻译
let dataType = {
    illustrator: '插画师',
    graphic: '漫画师',
    artisan: '手工艺人',
    ui_designer: 'UI设计师',
    designer: '平面设计师',
    other: '其他',
    animator: '动画师',
    game_designer: '游戏美术师',
    artisan: '手工艺人',
    industrial_designer: '工业设计师',
    photographer: '摄影师',
    stylist: '造型师',
    interior_designer: '室内设计师',
    architect: "建筑设计师",
    household_desiger: '家居设计师',
    costume_designer: '服装设计师'
}


// 渲染user列表
function randUser(res) {
    // console.log(res);
    concretes.innerHTML = res.map(item => {
        // console.log(item);
        let i = textOmit(item.desc)
        return `<a href="../html/user.html?user_id=${item.user_id}">
        <div class="list">
            <div class="list1">
                <div class="list1_txt">
                    <h3>${item.username}</h3>
                    <p>
                        <span>${item.service_count}个设计服务</span>

                        ${item.extra.rating ?
                    `<span>●</span><span>评价：</span><b>${starts(item)}</b>`
                    : ""}
                        
                    </p>
                    <div class="ph">
                    ${item.category.map(item=>{
                        return ` <p>${dataType[item]}</p>`
                    }).join("")}
                    </div>
                </div>
                <img src="	https://hbimg.huabanimg.com/${item.avatar.key}_/both/140x140" alt="">
            </div>
            <div class="list2">
               ${i}
            </div>
        </div>
    </a>`
    }).join("")
}



// 文本多行省略封装
function textOmit(data) {
    let length = data.length;
    if (length > 45) {
        var str = '';
        str = data.substring(0, 45) + "....."
        return str;
    }
}
``


// 星星封装
function starts(res) {
    let length = res.extra.rating;
    let str = "";
    for (var i = 0; i < length; i++) {
        str += "★";
    }
    return str;
}


// 获取cookie
let cookie = getCookie("login");
// 调用cookie自定义方法
getCooks(cookie);

// 登录，注册绑定点击事件
let login_register = document.querySelector(".login_register");

// 获取当前的url地址并存放在本地
let url = location.href;
localStorage.setItem("url", url);

login_register.onclick = function (e) {
    if (e.target.classList.contains("login")) {
        location.href = "../html/login.html";
    }

    if (e.target.classList.contains("register")) {
        location.href = "../html/zhuce.html";
    }
}


// 设计服务二级导航绑定点击事件
div.onclick = function (e) {
    let category = e.target.getAttribute('category');
    // localStorage.setItem("category",category);

    console.log(category);
    if (category == "") {
        location.href = "../html/service.html";
        return;

    }
    location.href = `../html/service.html?category=${category}`;
}