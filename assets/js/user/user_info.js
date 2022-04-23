$(function(){
    let layer = layui.layer;
    let form = layui.form
    userInitInfo()
    // 创建一个初始化用户信息的函数
    function userInitInfo(){
        $.ajax({
            type:'get',
            url:'/my/userinfo',
            success:function(res){
                if (res.status !== 0){
                    //获取失败
                return layer.msg(res.message)
                }
                // 获取成功填充数据
                form.val('info-form',res.data)
            }
        })
    }
    // 表单验证
    form.verify({
        nickname:function(val,item){
            if(val.length < 2 || val.length > 5) {
               return '用户昵称必须是2~5位'
            }
        }
    })
    // 用户提交
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                console.log(res);
                if (res.status !== 0) {
                    //获取失败
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 提交成功，修改index的图片昵称
                window.parent.getIndex()
            }
        })
    })
    // 设置重置按钮
    $('.inf-reset').on('click',function(e){
        e.preventDefault()
        userInitInfo()
    })

})
