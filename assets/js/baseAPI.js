//开发环境地址
var baseURL = 'http://ajax.frontend.itheima.net';
// 测试环境服务器地址
// var baseURL = 'http://ajax.frontend.itheima.net';
// 生产环境服务器地址
// var baseURL = 'http://ajax.frontend.itheima.net';
//1.拦截所有ajax请求
$.ajaxPrefilter(function(options) {
    // alert(options.url)
    options.url = baseURL + options.url;
    // alert(options.url)


    //2.为请求为/my/开头的所有ajax，配置头信息
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //3.登录拦截
    options.complete = function(res) {
        //complete: function(res) {
        //console.log(res);
        //在complete回调函数中，可以使用res.response.JSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1.删除本地存储中的token
            localStorage.removeItem('token');
            //2.重新跳转登录页
            location.href = "/login.html";
        }
    }
}
})