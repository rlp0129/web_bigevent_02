$(function() {
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
    //1.定义查询参数对象参数,将来提交数据时需要将请求参数提交到服务器
    var q = {
        pagenum: 1, //页码值,默认请求第一页数据
        pagesize: 2, //每页显示条数,默认每页显示两条
        cate_id: '', //文章分类的Id
        state: '', //文章分类的发布状态
    };
    //3.定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
            var dt = new Date(date);
            var y = dt.getFullYear();
            var m = padZero(dt.getMonth() + 1);
            var d = padZero(dt.getDate());

            var hh = padZero(dt.getHours());
            var mm = padZero(dt.getMinutes());
            var ss = padZero(dt.getSeconds());
            return y + '-' + m + '-' + d + '' + hh + ':' + mm + ':' + ss;
        }
        // 4.在个位数的左侧填充0
    function padZero(n) {
        return n > 9 ? n : '0' + n;
    }
    initTable();
    initCate();
    // 2.获取文章列表数据的方法
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //2.1使用模板引擎渲染页面数据
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
                // 渲染文章列表同时渲染分页
                renderPage(res.total);
            }
        })
    };
    //5.初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //5.1调用模板引擎渲染分类可选项
                var htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                form.render();
            }
        })
    };
    //6.为筛选表单绑定submit事件
    $('#form-search').on('submit', function(e) {
        e.preventDefault();
        //6.11获取表单中的值
        var state = $('[name=state]').val();
        var cate_id = $('[name=cate_id]').val();
        //6.2为查询参数对象q中对应的属性赋值
        q.state = state;
        q.cate_id = cate_id;
        //6.3初始化文章列表
        initTable();
    });

    //7.定义渲染分页方法(列表表格渲染完后才会调用渲染分页方法)
    function renderPage(total) {
        // console.log(total);
        laypage.render({
            elem: 'pageBox', //容器Id
            count: total, //数据总数
            limit: q.pagesize, //每页显示多少数据
            curr: q.pagenum, //当前页码
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            //触发jump方法:分页初始化的时候;页码改变的时候;每页展示条数
            jump: function(obj, first) {
                //obj:所有参数所在对象;first:是否是第一次初始化分页;
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                //判断:不是第一次初始化分页,才能重新调用初始化列表
                if (!first) {
                    initTable();
                }
            }
        })
    };
    //8.通过代理行使为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
        //8.1询问用户是否删除
        //8.2获取id
        var id = $(this).attr('date-id');
        layer.confirm('确认删除?', {
            icon: 3,
            title: '提示'
        }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg('恭喜您,删除文章成功!');
                    //8.3当数据删除完成后需要判断这一页是否还有剩余数据,如果没有就让页码值减1之后再重新调用initTable
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--;
                    initTable();
                    layer.close(index);
                }
            })
        })
    });



})