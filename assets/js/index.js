// 默认进入到该页面会进行验证
    function getIndex(){
        $.ajax({
            type: 'get',
            url:'/my/userinfo',
            success:function(res){
                if(res.status !== 0) {
                    return console.log(res.message);
                }
                // 渲染头像
                renderPic(res.data)
            }
        })
    }
    function renderPic (data) {
        let username = data.nickname || data.username
        $('#user-img span').html(`欢迎：${username}`)
        if (data.user_pic === null){
            //渲染文字头像
            let textPic = username[0].toUpperCase()
            $('.text-pic').html(textPic)
            $('.user-pic').hide()

        } else {
            // 渲染图片头像
            $('.text-pic').hide()
            $('.user-pic').show()
            $('.user-pic').attr('src',data.user_pic)
          
        }
    }
    function clickTsis () {
        $('.layui-this').removeClass('layui-this')
        $('.chick-this').addClass('layui-this')

    }
$(function(){
    getIndex()
    //点击退出功能
    $('.logout').on('click',function(){
        localStorage.removeItem('token')
        location.href = '/login.html'
    })
    //渲染头像
})


