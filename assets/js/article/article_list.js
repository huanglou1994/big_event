$(function(){
    let layer = layui.layer
    let form = layui.form
 
    // 获取数据默认值
    let q = {
        pagenum: 1, //默认页码值
        pagesize: 2, //默认每页显示几条数据
        cate_id: '', //默认 分类
        state:'',//默认分类状态
    }
    // 渲染表格
    initTable()
    function initTable(){
        $.ajax({
            type:'get',
            url:'/my/article/list',
            data:q,
            success:function(res){
                // 获取文章失败
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 获取文章成功
                layer.msg(res.message)
                // 调用模块
                let tmpTable = template('list-table',res)
                $('#list-tbody').html(tmpTable)
                // 渲染页码
                initpage(res)
            }
        })
    }
    // 渲染分类
    initCate() 
    function initCate() {
        $.ajax({
            type:'get',
            url:'/my/article/cates',
            success:function(res){
                console.log(res);
                // 获取文章失败
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 获取文章成功
                layer.msg(res.message)
                // 调用模块
                let tmpCate = template('list-cate',res)
                $('#cate-name').html(tmpCate)
                form.render()
            }
        })
    }
    // template 模块时间重置
    template.defaults.imports.filterTime = function(time){
        let date = new Date(time)
        return date.toLocaleString()
    }

    // 获取筛选的表格数据
    $('#filter-list').on('submit',function(e){
        e.preventDefault()
        let cate_id = $('[name="cate_name"]').val().trim()
        let state = $('[name="state"]').val().trim()
        console.log(cate_id,state);
        q.cate_id = cate_id
        q.state = state
        initTable()
    })

   function initpage(data) {
        let laypage = layui.laypage
        laypage.render({
            elem: 'demo7'
            ,count: data.total
            ,limit: q.pagesize
            ,limits:[2,4,6,8,10]
            ,curr: q.pagenum
            ,layout: ['count', 'limit', 'prev', 'page', 'next', 'skip']
            ,jump: function(obj,first){
                if(!first){
                   q.pagenum = obj.curr
                   q.pagesize = obj.limit
                   initTable()
                }
                
            }
        });
   }

//    删除
   $('#list-tbody').on('click','.list-del',function(e){

       let id = e.target.dataset.id
       let delNum = $('.list-del').length
       layer.confirm('确定删除吗?', {icon: 3, title:'提示'}, function(index){
        $.ajax({
            type:'get',
            url:'/my/article/delete/' + id,
            success:function(res){
                // 删除失败
           
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 删除成功
                layer.msg(res.message)
                console.log(delNum);
                if (delNum === 1) {
                    console.log('确认');
                    q.pagenum =  q.pagenum === 1? 1 : q.pagenum -1
                }
                initTable()
            }
        })
      }); 
     
   })

})