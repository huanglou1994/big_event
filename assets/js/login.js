$(function(){
  //跳转登录
    $('#go-login').on('click',function(){
        $('.reg-form').hide()
        $('.login-form').show()
    })
  //跳转注册
  $('#go-reg').on('click',function(){
    $('.login-form').hide()
    $('.reg-form').show()
})



//登录提交
$('.login-form form').on('submit',function(e){
    e.preventDefault()
    let name = $('.login-name').val().trim()
    let pas = $('.login-pas').val().trim()
     $.ajax({
           type:'post',
           url:' http://api-breakingnews-web.itheima.net/api/login',
           data:{username:name,password:pas},
           success:function(res){
               if (res.status !== 0) {
                return err (res.message)            
               }
               localStorage.setItem('token',res.token)
               succ (res.message)    
               location.href = 'index.html'
           }
       })
 
})


// 注册提交

$('.reg-form form').on('submit',function(e){
    e.preventDefault()
    let name = $('.reg-name').val().trim()
    let pas = $('.reg-pas').val().trim()
    let pasAgain = $('.reg-pas-again').val().trim()
    let nameReg =  /^[a-zA-Z]\w{4,10}$/
    let pasReg =  /\w{5,10}/
    console.log(nameReg.test(name));
    if (!nameReg.test(name)) {
        err ('账号长度必须是5-10位数')
    } else if (!pasReg.test(pas)) {
        err ('密码长度必须是5-10位数') 
    } else  if (pasAgain !== pas) {
        err ('两次密码不一样') 
    } else{
     $.ajax({
           type:'post',
           url:' http://api-breakingnews-web.itheima.net/api/reguser',
           data:$('.reg-form form').serialize(),
           success:function(res){
               if (res.status !== 0) {
                return err (res.message)            
               }
               succ (res.message)    
               $('#go-login').click()
           }
       })
    }
 
})
function err (str) {
    layui.use('layer', function(){
        let layer = layui.layer;
        layer.open({
            title: '账号注册',
            content: str,
            anim: 6,
            skin: 'demo-class'
        });   
    });  
}
function succ (str) {
    layui.use('layer', function(){
        let layer = layui.layer;
        layer.msg(str);
    });  
}

})