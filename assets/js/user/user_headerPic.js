  $(function(){
    let layer = layui.layer


// 1.1 获取裁剪区域的 DOM 元素
let $image = $('#image')

// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)
    
// 上传文件
    $('#uploading').on('click',function(){
        // 手动触发文件点击
        $('#pic-file').click()
        
      

    })
       // 获取到的文件
        // 监听file文件
        
    $('#pic-file').on('change',function(e){

        if (e.target.files.length === 0) {
            return layer.msg('请上传有效图片') 
        }
        // 上传成功拿到用户选择的文件
        let file = e.target.files[0]
        // 根据选择的文件，创建一个对应的 URL 地址：
        let newImgURL = URL.createObjectURL(file)
        // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
        $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域

    })

    $('#con-loadding').on('click',function(){
        let dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL("image/png")       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        $.ajax({
            type:'post',
            url:'/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success:function(res){
                // 上传失败
                if(res.status !== 0) {
                   return layer.msg('上传失败')
                }
                // 上传成功
                layer.msg('上传成功')
                window.parent.getIndex()
            }
        })
        

    })


  })
