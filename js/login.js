let url = localStorage.getItem("url");
console.log(url);


$("#login").validate({
    rules:{
        username:{
            required:true,
        },

        password:{
            required:true,
        },

        arg:{
            required:true,
        }
        
    },

    messages:{
        username:{
            required:"用户名不能为空",
        },

        password:{
             required:"密码不能为空",
        },

        arg:{
            required:"用户协议为必填项",
        },
    },

    submitHandler:function(){
        const username = $("input[name=username]").val();
        const password = $("input[name=password]").val();
        $.ajax({
            url:"http://localhost:8090/getuser",

            data:{
                username,
                password,
            },

            success:function(res){
                if(res.code == false){
                    alert(res.msg);
                    return;
                }
                alert(res.msg); 
                document.cookie = `login = ${username}; path = /`;
                location.replace(`${url}`) ;
                
            }
        })
    }
})