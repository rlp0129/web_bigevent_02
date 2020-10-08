//入口函数
$(function() {
    //1.显示隐藏切换
    $("#link_reg").on("click", function() {
        $(".login-box").hide();
        $(".reg-box").show();
    })
    $("#link_login").on("click", function() {
        $(".login-box").show();
        $(".reg-box").hide();
    });
    // 从layui中获取form对象
    var form = layui.form;
    console.log(layui);
    var layer = layui.layer;
    // 2.通过form.verify()函数自定义校验规则
    form.verify({
        //自定义一个叫pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 定义重复密码规则
        repwd: function(value) {
            var pwd = $('.reg-box [name = password]').val();
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    });
    // 3.监听注册表单提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: function(res) {
                console.log(res);
                // 判断状态
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('恭喜您，注册用户成功');
                // 手动触发a链接
                $('link_login').click();
            }
        })
    });
    // 4.登录功能
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                // 检验返回状态
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('恭喜您登录成功');
                localStorage.setItem('token', res.token);
                //跳转页面
                location.href = "/index.html";
            }
        })
    })
})