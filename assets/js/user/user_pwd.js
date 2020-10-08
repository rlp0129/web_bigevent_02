$(function() {
    //1.校验密码
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return ('新旧密码不能相同');
            }
        },
        rePwd: function(value) {
            if (value !== $('[name = newPwd]').val()) {
                return ('两次密码不一致');
            }
        }
    })


    //2.表单绑定事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败！');
                }
                layer.msg('恭喜您，更新密码成功！');
                // 表单重置(reset,必须用DOM对象，jQuery无法进行)
                $('.layui-form')[0].reset();
            }
        })
    })
})