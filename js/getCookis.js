// 获取cookie
function getCooks(cookie) {
    // let cookie = getCookie("login");
    console.log(cookie);
    if (cookie) {
        // 登录注册隐藏
        $(".login").css("display", "none");
        $(".register").css("display", "none");
        // 创建元素
        let login = $("<p class='username'>欢迎 " + cookie + "&emsp;<span class='tc'>退出<span></p>")
        // 添加元素
        login.appendTo(".login_register")
        // 给退出按钮设置样式
        $(".tc").css("cursor", "pointer")
        // 退出按钮绑定点击事件
        $(".tc").on("click", () => {
            // 删除cookie
            setCookie("login", login, -1);
            
            $(".username").css("display", "none");
            $(".tc").css("display", "none");
            $(".login").css("display", "inline-block");
            $(".register").css("display", "inline-block");
        })
        return;
    }
    $(".username").css("display", "none");
    $(".tc").css("display", "none");
    $(".login").css("display", "inline-block");
    $(".register").css("display", "inline-block");
    return;
}