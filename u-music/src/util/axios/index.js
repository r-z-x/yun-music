//引入封装好的axios库
import http from './axios'

//封装接口
//封装推荐歌单接口
export function recMusic(params){
    return http.get('/personalized',{
        params
    })
}

//封装推荐新音乐接口
export function newSong(){
    return http.get('/personalized/newsong')
}
//热歌榜
export function hotlist(params){
    return http.get('/top/list',{
        params
    })
}

//封装热搜
export function searchhot(){
    return http.get('/search/hot')
}
//banner
export function bannerlist(params){
    return http.get('/banner',{
        params
    })
}
//搜索关键词
export function getsearch(params){
    return http.get('/search',{
        params
    })
}

//封装歌单详情
export function playDetail(params){
    return http.get('/playlist/detail',{
        params
    })
}
//获取音乐URL
export function playUrl(params){
    return http.get('/song/url',{
        params
    })
}
//获取歌词
export function getLyric(params){
    return http.get('/lyric',{
        params
    })
}
//获取歌曲详情
export function songDetail(params){
    return http.get('/song/detail',{
        params
    })
}