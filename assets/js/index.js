$(function() {

    // 退出登录
    $("#btnLogout").on('click', function() {
        localStorage.clear()
        location.href = '../../login.html'
    });
    // 调用 getUserInfo 获取用户基本信息
    getUserInfo()

    // 获取用户的基本信息
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                console.log(res);
                // 调用 renderAvatar 渲染用户的头像
                renderAvatar(res.data)
            }
        })
    }

    function renderAvatar(user) {
        var name = user.nickname || user.username
        $("#welcome").html(name)

        //渲染头像
        if (user.user_pic !== null) {
            $(".layui-nav-img").show().attr('src', user.user_pic)
            $(".text-avatar").hide()
        } else {
            $(".layui-nav-img").hide()
            $(".text-avatar").show().html(user.username[0].toUpperCase())
        }
    }
})