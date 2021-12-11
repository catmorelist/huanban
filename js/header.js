function header() {
    return `
<div class="logo">
    <a href="../index.html"></a>
</div>
<div class="nav">
    <a href="../index.html" class="item fc">首页</a>
    <div class="item">
        <a href="../html/service.html" class="fc">设计服务</a>
        <i class="arrow"></i>
        <div class="submenu">
            <div>
                <a href="">品牌设计</a>
                <a href="">UI 设计</a>
            </div>
        </div>
    </div>
    <a href="../html/design.html" class="item fc">设计师</a>
</div>
<div class="login_register">
    <button class="login">登录</button>
    <button class="register">注册</button>
</div>`
}

export default header