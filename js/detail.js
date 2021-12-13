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

// 获取商品id
let id = location.search;

// 解析id
id = id.slice(1).split("=")[1];
let contents_left = document.querySelector(".contents_left");

// 获取右侧第一个元素
let contents_right1 = document.querySelector(".contents_right1");

// 预购时间翻译
let day = {
    year:"年",
    month:"月",
    week:"周",
    day:"日",
    hours:"小时",
}

// 渲染商品列表
getLister(id);
// 渲染右侧内容区


// ajax请求，渲染商品列表数据
async function getLister(data){
    let res = await pAjax({
        url:`https://muse.huaban.com/api/v2/services/${data}`,

    })
    localStorage.setItem("res",res);
    res = JSON.parse(res)
    // console.log(res);
    contents_left.innerHTML = 
        ` <p>
        <a href="./service.html">设计服务</a>
        <span>»</span>
        <span class="name">${res.name}</span>
    </p>
    <!-- 题目 -->
    <h3 class="title">${res.name}</h3>
    <!-- 大图 -->
    <a href="#">
        <img src="https://muse-img.huabanimg.com/${res.cover[0].key}_/fw/880" alt="" class="bigImg">
    </a>
    <!-- 小图 -->
    <div class="contents_left2">
        <h3>服务说明</h3>
        <div class="allImg">
            <div class="smallImg">
                <a href="#">
                ${res.desc.map(item=>{
                    // console.log(item.image.length);
                    if(item.type != "image"){
                        let str = "";
                       return str = `<p style="margin-top:20px;color:black">${item.text}</p>`
                        }

                    if(item.image.length != undefined){
                        return `<img src="//muse-img.huabanimg.com/${item.image.key}_/fw/820" alt=""></img>`
                    }     
                    }).join("")
                }
                </a>
            </div>
        </div>
    </div>
    ${listFoot(res)}
    <div class="light"></div>
        <div class="contents_buy">
         <button class="buy">购买</button>
     </div>` 

     getListUserO(res);
}

// 商品列表底部判断
function listFoot(res){
    // console.log(res);

    // 提供加急服务判断
    if(res.extra.urgent && res.extra.urgent.length !=0 && res.extra.sub_services.length == 0){
        return `<div class="contents_time">
                <h3>预估完成时间</h3>
                <p class="thinkT" style="color:black">${res.complete_in.number}${day[res.complete_in.unit]}</p>
                <h3 class="server">加急服务</h3>
                <div class="prices">
                    <div class="price">
                    <p><input type="checkbox">
                        <span class="intro">加急服务，${res.extra.urgent.number}${day[res.extra.urgent.unit]}</span>
                        <span class="money">￥${res.extra.urgent.price}/个</span>
                    </p>    
                    </div>
                </div>
            </div>`
    }

    // 拓展服务判断
    if(!res.extra.urgent && res.extra.sub_services.length != 0){
        return `<div class="contents_time">
        <h3>预估完成时间</h3>
        <p class="thinkT" style="color:black">${res.complete_in.number}${day[res.complete_in.unit]}</p>
        ${res.extra.sub_services.map(item=>{
            return `<h3 class="server">拓展服务</h3>
            <div class="prices">
            <div class="price">
                  <p><input type="checkbox">
                  <span class="intro">${item.name}</span>
                  <span class="money">￥${item.price}/个</span>
              </p>
            </div>
        </div>`
    }).join("")}
    </div>`
    }

    // 价格面议判断
    if(!res.extra.urgent && res.extra.sub_services.length == 0){
        return ``;
    }

    // 拓展加急判断
    if(res.extra.urgent && res.extra.sub_services){
         return `<div class="contents_time">
        <h3>预估完成时间</h3>
        <p class="thinkT" style="color:black">${res.complete_in.number}${day[res.complete_in.unit]}</p>
        
        ${res.extra.sub_services.map(item=>{
            // console.log(item.name);
            return `<div class="contents_time">
            <h3 class="server">拓展服务</h3>
            <div class="prices">
            <div class="price">
                  <p><input type="checkbox">
                  <span class="intro">${item.name}</span>
                  <span class="money">￥${item.price}/个</span>
              </p>
            </div>
        </div>`
    }).join("")}
    <div class="contents_time">
    <h3 class="server">加急服务</h3>
    <div class="prices">
        <div class="price">
        <p><input type="checkbox">
            <span class="intro">加急服务，${res.extra.urgent.number}${day[res.extra.urgent.unit]}</span>
            <span class="money">￥${res.extra.urgent.price}/个</span>
        </p>    
        </div>
    </div>
</div>
    </div>`
    }

}

// 渲染右侧第一个
function getListUserO(res){

    
//    let res =  localStorage.getItem("res");
//    res = JSON.parse(res);

// 星星
   let stars = '';
    for (let i = 0; i < res.rating; i++) {
        stars += '★ '
    }

//    console.log(res);
   contents_right1.innerHTML = `
   <h3 class="meet">${res.price==0?"价格面议":"￥"+res.price+'/'+res.unit}</h3>
   <p class="low">
       <span>基础服务价格</span>
       <a href="#">了解更多</a>
   </p>
   <p class="cut"></p>
   <p class="getIt">
       <span class="good">成交</span>
       <span class="num">${res.order_count}</span>
   </p>
   <p class="talk">
       <span class="about">评价</span>
       <span class="shark">${stars}</span>
   </p>
   <p class="cut"></p>
   <div class="space">
      ${listFoot(res)}
       <button class="meet_buy">购买</button>
   </div>`

   getListUserT(res);
   
}

let contents_right2 = document.querySelector(".contents_right2");


// 渲染右侧第二个
function getListUserT(res){
    console.log(res);

    // 格式化时间
    let day = parseInt(res.user.extra.response_time / 24 / 60 / 60);
    let hours = parseInt(res.user.extra.response_time / 60 / 60);
    let minute = parseInt(res.user.extra.response_time / 60 % 60);
    let second = parseInt(res.user.extra.response_time % 60);
  

    contents_right2.innerHTML = 
         `<div class="user1">
        <div class="user_head">
            <img src="https://hbimg.huabanimg.com/${res.user.avatar.key}_/both/70x70" alt="" class="use_img">
        </div>
        <div class="user_name">
            <p class="user_names">${res.user.username}</p>
            <p class="user_talk">
                <i class="user_talks"></i>
                <span>聊天</span>
            </p>
        </div>
    </div>
    <p class="cut"></p>
    <div class="time">
        <p class="node_time">
            <i></i>
            <span>平均响应时间</span>
            <span class="thatT">${day == 0?
                hours + "时" + minute + "分" + second + "秒" :
                day + "天" + hours + "时" + minute + "分" + second + "秒"
            , hours==0 ? minute + "分" + second + "秒":  minute + "分" + second + "秒"}</span>
        </p>
        <p class="card">
            <i></i>
            <span>实名认证</span>
            <span class="sure">已认证</span>
        </p>
    </div>
    <p class="cut"></p>
    <p class="text">
        ${res.user.desc}
    </p>`



    let user1 = document.querySelector(".user1");
    user1.onclick = function(e){
        if(e.target.classList.contains("use_img")){
            location.href = `../html/user.html?user_id=${res.user_id}`;
        }
        if(e.target.classList.contains("user_names")){
            location.href = `../html/user.html?user_id=${res.user_id}`;
        }
    }
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

