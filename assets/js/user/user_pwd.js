$(function(){
// 初始化 layui 方法
let layer = layui.layer
let form = layui.form
// 表单验证
form.verify({
    // 密码必须6-12位
    pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
    // 原密码不能跟新密码一样
    newpas:function(val){
        // 获取原密码
        let oldPwd = $('[name="oldPwd"]').val().trim()
        // 获取新密码
        let newPwd = $('[name="newPwd"]').val().trim()
        if (newPwd === oldPwd){
            return '原密码和新密码不能一样'
        }
    },
    // 新密码和确认密码一样
    newPwdAgain:function(val){
        // 获取新密码
        let newPwd = $('[name="newPwd"]').val().trim()
        let newAgain = $('[name="newPwdAgain"]').val().trim()
        if (newPwd !== newAgain) {
            return '两次密码输入的不一样'
        }   

    }
})

// 修改密码
$('.layui-form').on('submit',function(e){
    e.preventDefault()
// 发送请求
    $.ajax({
        type:'post',
        url:'/my/updatepwd',
        data: $(this).serialize(),
        success:function(res){
            if (res.status !==0 ){
                // 请求失败
                return layer.msg(res.message)
            }
            // 请求陈宫
            layer.msg(res.message)
            // 请求成功重置
            $('#pwd-reset').click()
        }
    })


})

})