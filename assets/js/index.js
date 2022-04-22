$(function(){
// 默认进入到该页面会进行验证
    let token = localStorage.getItem('token') 
    $.ajax({
        type: 'get',
        url:'http://api-breakingnews-web.itheima.net/my/userinfo',
        headers: {
            Authorization: token || ''
        },
        success:function(res){
            if(res.status !== 0) {
                return console.log(res.message);
            }
            // 渲染头像
            renderPic(res.data)
        },
        complete:function(res){
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                location.href = '/login.html'
                localStorage.removeItem('token')
            }
        }
           //请求失败
    })
    //点击退出功能
    $('.logout').on('click',function(){
        localStorage.removeItem('token')
        location.href = '/login.html'
    })
    //渲染头像
    function renderPic (data) {
        let username = data.username
        $('#user-img span').html(`欢迎：${username}`)
        if (data.user_pic === null){
            //渲染文字头像
            let textPic = username[0].toUpperCase()
            $('.text-pic').html(textPic)
            $('.user-pic').css('display','none')

        } else {
            // 渲染图片头像
            $('.user-pic').attr('src',data.user_pic)
            $('.text-pic').css('display','none')
        }
    }

})