$(function() {
        //调用getUserInfo函数获取用户信息
        getUserInfo();
        var layer = layui.layer;
        //3.点击按钮，实现退出功能
        $('#btnLogout').on('click', function() {
            // alert('ok');
            //提示用户是否确定退出
            layer.confirm('确定退出登录?', {
                icon: 3,
                title: '提示'
            }, function(index) {
                //1.删除本地存储中的token
                localStorage.removeItem('token');
                //2.重新跳转登录页
                location.href = "/login.html";
                //layui自己提供的关闭confirm询问框
                layer.close(index);
            });
        })
    })
    //1.获取用户基本信息封装函数
    //位置写到入口函数外，后面代码要使用这个方法，要求这个方法是全局变量
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }
            //调用renderAvatar()函数渲染用户头像
            renderAvatar(res.data);
        },
        //不论成功失败都会调用complete回调函数
        // complete: function(res) {
        //     console.log(res);
        //     //在complete回调函数中，可以使用res.response.JSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //1.删除本地存储中的token
        //         localStorage.removeItem('token');
        //         //2.重新跳转登录页
        //         location.href = "/login.html";
        //     }
        // }
    })
}
//2.渲染用户头像
function renderAvatar(user) {
    //2.1获取用户名称
    var name = user.nickname || user.username;
    //2.2设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //2.3按需渲染用户头像
    if (user.user_pic !== null) {
        // 2.3.1渲染图片头像(有头像)
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatar').hide();
    } else {
        // 2.3.2渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').show().html(first);
    }
}