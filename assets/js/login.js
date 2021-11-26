$(function() {
    //点击去注册按钮链接
    $("#link_reg").on("click", function() {
        $(".login-box").hide();
        $(".reg-box").show();
    })
    $("#link_login").on("click", function() {
        $(".login-box").show();
        $(".reg-box").hide();
    })

    //表单验证
    var form = layui.form;
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return "密码不重复"
            }
        }
    });

    //注册用户的ajax
    $("#form_reg").on('submit', function(e) {
        e.preventDefault()
        $.post(
            '/api/reg',
            $("#form_reg").serialize(),
            function(res) {
                if (res.code !== 0) {
                    layer.msg(res.message)
                } else {
                    layer.msg(res.message + '请登录')
                    $("#link_login").click()
                }
            }
        )
    })


    // 监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.code !== 0) {
                    layer.msg(res.message);
                }
                localStorage.setItem("token", res.token)
                location.href = '../../index.html'
            }
        })
    })
})