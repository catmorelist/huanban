
// 校验用户名
jQuery.validator.addMethod("userTest", value=>{
    let userReg = /^[a-z][0-9a-z]{4,14}$/i;
    return userReg.test(value);
})

// 校验手机号
jQuery.validator.addMethod("tellTest", value=>{
    let tell = /^1[3-9]\d{9}$/;
    return tell.test(value);
})

// 校验密码
jQuery.validator.addMethod("passTest", value=>{
    let passWord = /^[0-9A-Za-z]{6,12}$/i;
    return passWord.test(value);
}) 


// 随机生成验证码
$(".btn1").on("click", function(){
    let i = parseInt(Math.random()*899999+100000);
    $("input[name=request]").val(i);
})


$("#zhuce").validate({
    rules:{
        username:{
            required:true,
            userTest:true,
        },

        tel:{
            required:true,
            tellTest:true,
        },

        password:{
            required:true,
            passTest:true,
        },

        request:{
            required:true,
        }

      
    },

    messages:{
        username:{
            required:"用户名不能为空",
            userTest:"用户名由4-15位数字、字母，且开头为字母组成。",
        },

        tel:{
            required:"手机号不能为空",
            tellTest:"手机号必须为11位纯数字",
        },

        password:{
            required:"密码不能为空",
            passTest:"密码必须由6-10个数字、字母、标点符号组成。"
        },

        request:{
            required:"验证码不能为空",
        }

    },
    
    submitHandler:function(){
        const username = $("input[name=username]").val();
        const tell = $("input[name=tel]").val();
        const password = $("input[name=password]").val();   
        // console.log(user,tel,password);
        $.ajax({
            url:"http://localhost:8090/get",
            data:{
                username:username, 
                tell:tell,
                password:password,
            },
            success:function(res){
                // console.log(res);
                if(res.code==false){
                    alert(res.msg);
                    return;
                }
                alert(res.msg);
                location.href = "../html/login.html";
            },
            error:function(err){
                console.log(err);
            }
        })
    }
    
})

