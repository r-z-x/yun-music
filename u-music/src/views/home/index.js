import React from 'react'

import '../../assets/css/homeremd.css'
import { recMusic, newSong, bannerlist } from '../../util/axios'
import Swiper from 'swiper'
import axios from 'axios'
class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            remdul: [],
            sglist: [],
            bannerimg: []
        }
    }
    componentDidMount() {
        // console.log(Swiper,'11111');
        axios.all([recMusic({  limit: 6}),newSong(),bannerlist()]).then(
            axios.spread((remdul,sglist,bannerimg)=>{
                if (remdul.code === 200) {
                    this.setState({
                        remdul: remdul.result
                    })
                }
                if (sglist.code === 200) {
                    this.setState({
                        sglist: sglist.result
                    })
                }
                if (bannerimg.code === 200) {
                    this.setState({
                        bannerimg: bannerimg.banners
                    })
                }
            })
        )
        // recMusic({
        //     limit: 6
        // })
        //     .then(res => {
        //         if (res.code === 200) {

        //             // console.log(res);
        //             this.setState({
        //                 remdul: res.result
        //             })
        //         }
        //     })
        // // console.log(this.state.remdul);
        // newSong()
        //     .then(res => {
        //         console.log(res);
        //         if (res.code === 200) {
        //             this.setState({
        //                 sglist: res.result
        //             })
        //         }
        //     })

        // bannerlist()
        //     .then(res => {
        //         console.log(res);
        //         if (res.code === 200) {
        //             this.setState({
        //                 bannerimg: res.banners
        //             })
        //         }
        //     })

    }
    componentDidUpdate(){
        let swiper = new Swiper('.swiper-container', {
            autoplay: {
                delay: 1000
            },
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        })
    }
    toplay(id){
        this.props.history.push(`/play?id=${id}`)
    }
    goremdlist(id){
        this.props.history.push(`/list?id=${id}`)
    }
    render() {
        const { remdul, sglist, bannerimg } = this.state
        return (<div className='homeremd'>


            <div className="swiper-container">
                <div className="swiper-wrapper">
                  
                        {bannerimg.map(item => {
                            return (
                                <div className="swiper-slide" key={item.imageUrl}>
                                <img src={item.imageUrl}></img>
                                </div>
                            )
                        })}
                   
                </div>
                <div className="swiper-pagination"></div>
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
            </div>
            <h2>推荐歌单</h2>
            <ul className='remdul'>
                {remdul.map((item) => {
                    return (
                        <li key={item.id} onClick={this.goremdlist.bind(this,item.id)}>
                            <div className='uimg'>
                                <img src={item.picUrl} alt="" />
                                <span>{item.playCount > 10000 ? (item.playCount / 10000).toFixed(1) : item.playCount}万</span>
                            </div>
                            <p>{item.name}</p>
                        </li>
                    )
                })}
            </ul>
            <h2>最新音乐</h2>
            <ul className='sglist'>
                {sglist.map((item) => {
                    return (
                        <li key={item.id} onClick={this.toplay.bind(this,item.id)}>
                            <div className='sgchlf'>
                                <div className='sgtitle'>
                                    {item.name}
                                </div>
                                <div className='sgname'>
                                    <i></i>
                                    {
                                        item.song.artists.map((song, idx) => {
                                            return <span key={song.id}>{idx === 1 ? '/' : ''}{song.name}</span>
                                        })
                                    }
                             &nbsp;- {item.name}
                                </div>
                            </div>
                            <div className='sgchfr'>
                                <span></span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>)
    }
}
export default Home