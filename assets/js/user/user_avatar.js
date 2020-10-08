$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比(指定裁剪框形状，1区域正方形，16/9区域长方形)
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    };

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //2.为上传按钮绑定点击事件
    $('#btnChooseImage').on('click', function() {
        $('#file').click();
    });
    //3.为文件选择框绑定change事件
    $('#file').on('change', function(e) {
        // console.log(e);
        // 3.1获取用户选择文件
        var filelist = e.target.files;
        // console.log(filelist);
        if (filelist.length === 0) {
            return layer.msg('请选择图片！');
        };
        // 3.2 拿到用户选择的文件
        var file = e.target.files[0];
        // 3.2.1 将文件转化为路径
        var imgURL = URL.createObjectURL(file);
        // 3.2.2 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    //4.为确定按钮绑定事件
    $('#btnUpload').on('click', function() {
        //4.1拿到用户裁剪之后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png');
        //4.2调用接口，把头像上传服务器
        $.ajax({
            method: 'POSt',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新头像失败！');
                }
                layer.msg('更新头像成功！');
                window.parent.getUserInfo();
            }
        })
    })
})