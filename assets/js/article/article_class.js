$(function(){
   
    let layer = layui.layer
    let form = layui.form
    // 初始化文章列表
    initArticle () 
    function initArticle () {
        $.ajax({
            type:'get',
            url:'/my/article/cates',
            success:function(res){
                // 获取失败
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 获取成功
                let templateClass = template('templay-class',res)
                $('tbody').html(templateClass)
            }
        })
    }
    // 点击添加文章，弹出添加文章form
    let addIndex = null
    $('#class-add').on('click',function(){
        addIndex = layer.open({
            type:1,
            title: '添加文章分类'
            ,content: $('#addBox').html(),
            area: ['500px', '240px'],
            end:function(){
                // $('#addBox').css('display','none')
                $('#class-reset').click()
             }  
          });     

    })
    // 新增文章章节
    $('body').on('submit','#add-form',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                // 失败
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 成功
                layer.close(addIndex)
                initArticle () 
            }
        })
    })
    // 删除文章
    $('tbody').on('click','[name="del"]',function(e){
        let id = e.target.dataset.id
        layer.confirm('确定要删除吗?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                type:'get',
                url:'/my/article/deletecate/'+id,
                success:function(res){
                    if (res.status !== 0){
                        // 删除失败
                        return layer.msg(res.message)
                    }
                    // 删除成功
                    layer.close(index);
                    initArticle () 
                }
            })
            
          });
    })
    // 获取指定章节内容 
    let setIndex  = null
    $('tbody').on('click','[name="set"]',function(e){
            let id = e.target.dataset.id
           setIndex = layer.open({
                type:1,
                title: '修改章节分类'
                ,content:  $('#setBox').html(),
                area: ['500px', '240px'],
                end:function(){
                   $('#setBox').css('display','none')
                }    
              });   
              $.ajax({
                type:'get',
                url:'/my/article/cates/'+id,
                success:function(res){
                    // 获取失败
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    // 获取成功
                    layer.msg(res.message)
                    form.val('set-form',res.data)
                }
            })
        
    })
    // 更新章节
    $('body').on('submit','#set-form',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                // 更新失败
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 更新成功
                initArticle () 
                layer.close(setIndex)
            }
        })
    })
 


})