$(function(){
    $.ajaxPrefilter(function(options){
        if (!/\/api/.test(options.url)){
            let token = localStorage.getItem('token')
            options.headers = {
                Authorization: token || ''
            }
        }
        options.url = 'http://api-breakingnews-web.itheima.net'+options.url.trim()
    })
})
// http://api-breakingnews-web.itheima.net

