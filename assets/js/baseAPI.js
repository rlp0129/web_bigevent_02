//开发环境地址
var baseURL = 'http://ajax.frontend.itheima.net';
// 测试环境服务器地址
// var baseURL = 'http://ajax.frontend.itheima.net';
// 生产环境服务器地址
// var baseURL = 'http://ajax.frontend.itheima.net';
$.ajaxPrefilter(function(options) {
    alert(options.url)
    options.url = baseURL + options.url;
    alert(options.url)
})