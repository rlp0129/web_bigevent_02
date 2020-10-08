$(function() {
<<<<<<< HEAD
    // 1.定义校验规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称长度为1~6个字符"
            }
        }
    })
    initUserInfo();
    //2.初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // console.log(res);
                //成功后调用form.val()快速为表单赋值
                form.val('formUserInfo', res.data);
            }
        })
    }
    //3.重置表单数据
    //给form表单绑定事件用reset,给按钮绑定事件用click
    $('#btnReset').on('click', function(e) {
            //阻止表单默认重置行为
            //问题：为什么不用按钮默认重置行为?
            //解答：原因是重置行为设置的是html内容的value值，和js中的无关
            // console.log(111);
            e.preventDefault();
            initUserInfo();
        })
        //4.监听表单提交事件
    $('.layui-form').on('submit', function(e) {
        //阻止浏览器默认行为
        e.preventDefault();
        //发起ajax请求，修改用户信息
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            //快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('用户信息修改失败！');
                }
                layer.msg('恭喜您，用户信息修改成功！');
                //调用父页面中的更新用户基本信息
                window.parent.getUserInfo();
            }
        })
    })
})
=======
  var form = layui.form
  var layer = layui.layer

  form.verify({
    nickname: function(value) {
      if (value.length > 6) {
        return '昵称长度必须在 1 ~ 6 个字符之间！'
      }
    }
  })

  initUserInfo()

  // 初始化用户的基本信息
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败！')
        }
        // console.log(res)
        // 调用 form.val() 快速为表单赋值
        form.val('formUserInfo', res.data)
      }
    })
  }

  // 重置表单的数据
  $('#btnReset').on('click', function(e) {
    // 阻止表单的默认重置行为
    e.preventDefault()
    initUserInfo()
  })

  // 监听表单的提交事件
  $('.layui-form').on('submit', function(e) {
    // 阻止表单的默认提交行为
    e.preventDefault()
    // 发起 ajax 数据请求
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败！')
        }
        layer.msg('更新用户信息成功！')
        // 调用父页面中的方法，重新渲染用户的头像和用户的信息
        window.parent.getUserInfo()
      }
    })
  })
})
>>>>>>> user
