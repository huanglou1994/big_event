$(function(){
    let layer = layui.layer;
    let form = layui.form;
    // 初始化富文本编辑器
    initEditor()
  
    // 初始化 文章类别
    initPubCate () 
    function initPubCate () {
        $.ajax({
            type:'get',
            url:'/my/article/cates',
            success:function(res){
                // 请求失败
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 请求成功

                layer.msg(res.message)
                // 调用template模块
                let pubCate = template('pub-cate',res)

                $('[name="cate_id"]').html(pubCate)
                form.render()
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')
    
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    
    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 更换封面
    $('#pub-pic').on('click',function(){
        // 上传文件
        $('#pub-file').click()

        // 监听 上传文件
        $('#pub-file').on('change',function(e){
            let file = e.target.files
            // 没有文件上传
            if (file.length === 0) {
                return  console.log(1);
            }
            // 监听到有文件上传
            var newImgURL = URL.createObjectURL(file[0])
            $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
                    })

    })
    // 发布
    let newState = '已发布'
    $('.res-btn').on('click',function(){
        newState = '已发布'
    })
    // 草稿
    $('.btn-draft').on('click',function(){
        newState = '草稿'
        console.log(3);
    })

    // 表单提交
    $('#pub-form').on('submit',function(e){
        e.preventDefault()
        // 获取formData数据
        let fd = new FormData($(this)[0])
        fd.append('state',newState)
        $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 400,
            height: 280
        })
        .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
            // 得到文件对象后，进行后续的操作
            fd.append('cover_img',blob)
            sendArticle(fd)
            
        })
        
    })
    // 发布文章
    function sendArticle(fd){
        $.ajax({
            type:'post',
            url:'/my/article/add',
            data:fd,
            contentType:false,
            processData: false,
            success:function(res){
                // 发布失败
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 发布陈宫
                layer.msg(res.message)
                location.href = '/article/article_list.html'
                window.parent.clickTsis()
            }
        })
    }
})

