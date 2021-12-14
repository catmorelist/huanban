// 导入头部
import header from "./header.js";

// 获取头部元素
let container = document.querySelector('.container');


// 渲染头部
container.innerHTML = header();

//获取头部设计服务元素
let div = document.querySelector(".submenu div");
// console.log(div);

// 调用渲染头部
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

    // navs1_1.innerHTML = str;
    div.innerHTML = str;
}


// 获取用户id
let user_id = location.search;


// 分割数据
user_id = user_id.split("=")[1];
localStorage.setItem("id", user_id)

// 用户信息
getUser(user_id)
// 设计服务信息
getService()


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




// 请求用户数据
async function getUser(data) {
    let res = await pAjax({
        url: `https://muse.huaban.com/api/v1/users/${data}`,
    })
    // localStorage.setItem("userData",res);
    res = JSON.parse(res);
    randUser(res)
}

let user1 = document.querySelector(".user1");

// 渲染结构
function randUser(res) {
    // console.log(res);

    // 格式化时间
    let day = parseInt(res.extra.response_time / 24 / 60 / 60);
    let hours = parseInt(res.extra.response_time / 60 / 60);
    let minute = parseInt(res.extra.response_time / 60 % 60);
    let second = parseInt(res.extra.response_time % 60);

    // 星星
    let stars = '';
    for (let i = 0; i < res.extra.rating; i++) {
        stars += '★'
    }
    user1.innerHTML = `
    <div class="user_left">
        <img src="https://hbimg.huabanimg.com/${res.avatar.key}_/both/120x120"
            alt="">
        <div class="user_left1">
            <h3>${res.username}</h3>
            <p class="lab">
            ${res.category.map(item=>{
                return `<label>${dataType[item]}</label>`
            }).join("")}    
            
                <span>${res.city}</span>
            </p>
            <p class="intro">
                ${res.desc}
            </p>
        </div>
        <div class="talk">
            <p></p>
            <div>发起聊天</div>
        </div>
    </div>
    <div class="user_right">
        <div class="user_right1">
            <i></i>
            <label for="">平均响应时间</label>
            <span>${day == 0?
                hours + "时" + minute + "分" + second + "秒" :
                day + "天" + hours + "时" + minute + "分" + second + "秒"
            , hours==0 ? minute + "分" + second + "秒":  minute + "分" + second + "秒"}</span>
        </div>
        <div class="user_right2">
            <i></i>
            <label for="">实名认证</label>
            <span>已认证</span>
        </div>
        <div class="user_right3">
            <i></i>
            <label for="">评价</label>
            <span>${stars}</span>
        </div>
    </div>`
}

let designs_this = document.querySelector(".designs_this");

designs_this.onclick = function (e) {
    designs_this.querySelector(".active").classList.remove("active")
    if (e.target.classList.contains("service")) {
        e.target.classList.add("active");
        getService()
    }

    if (e.target.classList.contains("product")) {
        e.target.classList.add("active");
        getProduct()
    }

    if (e.target.classList.contains("ownlist")) {
        e.target.classList.add("active");
        get0wnlist()
    }
}


// 设计服务请求数据
async function getService() {
    let id = localStorage.getItem("id")
    let len = "limit=100";
    let res = await pAjax({
        url: `https://muse.huaban.com/api/v1/users/${id}/services/`,
        data: len,
    })
    res = JSON.parse(res)
    randService(res);
}

// 原创请求数据
async function getProduct() {
    let id = localStorage.getItem("id")
    let res = await pAjax({
        url: `https://muse.huaban.com/api/v1/users/${id}/boards/`,
    })
    res = JSON.parse(res)
    randProduct(res);
}


// 个人资料请求数据
async function get0wnlist() {
    let id = localStorage.getItem("id")
    let res = await pAjax({
        url: `https://muse.huaban.com/api/v1/users/${id}`,
    })
    res = JSON.parse(res)
    randOwnlist(res)
}

let content = document.querySelector(".content");




// 请求设计服务数据
function randService(res) {
    console.log(res);
    let contents_own = getContentsOwn()
    contents_own.innerHTML = res.map(item => {
        //   console.log(item);
        return `<div class="item" service_id="${item.service_id}">
            <img src="https://muse-img.huabanimg.com/${item.cover[0].key}_/both/280x280"
                alt="" />
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

// 请求原创数据
function randProduct(res) {
    let contents_own = getContentsOwn()
    contents_own.innerHTML = res.map(item => {
        return `<div class="item">
            <img src="https://hbimg.huabanimg.com/${item.cover.key}_/both/280x280"
                alt="" />
            <label class="title1">${item.title}</label>
            <footer class="extra">
                <p class="tip1">72张图片</p>
            </footer>
        </div>`
    }).join("")
}

// 请求个人资料数据
function randOwnlist(res) {
    // 格式化时间
    let day = parseInt(res.extra.response_time / 24 / 60 / 60);
    let hours = parseInt(res.extra.response_time / 60 / 60);
    let minute = parseInt(res.extra.response_time / 60 % 60);
    let second = parseInt(res.extra.response_time % 60);

    let contents_text = getContentstext()
    contents_text.innerHTML = `<div class="item">
        <label for="">所在地</label>
        <p class="city">${res.city}</p>
    </div>
    <div class="item">
        <label for="">擅长领域</label>
        <p>${res.category.map(item=>{
            return dataType[item]
        }).join("")}</p>
    </div>
    <div class="item">
        <label for="">实名认证</label>
        <p>已认证</p>
    </div>
    <div class="item">
        <label for="">评分</label>
        <p class="status">${res.extra.rating}</p>
    </div>
    <div class="item">
        <label for="">响应时间</label>
        <p class="status">${day == 0?
            hours + "时" + minute + "分" + second + "秒" :
            day + "天" + hours + "时" + minute + "分" + second + "秒"
        , hours==0 ? minute + "分" + second + "秒":  minute + "分" + second + "秒"}</p>
    </div>
    <div class="item">
        <label for="">个人简介</label>
        <p class="person">${res.desc}</p>
    </div>`
}



// 创建contents_own元素封装
function getContentsOwn() {
    // 删除contents_text元素前先判断是否存在
    if (document.querySelector(".contents_text")) {
        content.removeChild(document.querySelector(".contents_text"));
    }
    //创建contents_own元素
    let div = document.createElement("div");
    content.appendChild(div);
    div.classList.add("contents_own");
    let contents_own = document.querySelector(".contents_own");
    return contents_own;
}

// 创建contents_text元素封装
function getContentstext() {
    //删除contents_own元素前先判断是否存在 
    if (document.querySelector(".contents_own")) {
        content.removeChild(document.querySelector(".contents_own"));
    }
    //创建contents_own元素
    let div = document.createElement("div");
    content.appendChild(div);
    div.classList.add("contents_text");
    let contents_text = document.querySelector(".contents_text");
    return contents_text;
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
