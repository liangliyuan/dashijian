// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$(function() {
    $.ajaxPrefilter(function(options) {
        options.url = "http://www.liulongbin.top:3008" + options.url

        //统一为有权限的headrs请求头
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem("token")
            }
        }
    })
})