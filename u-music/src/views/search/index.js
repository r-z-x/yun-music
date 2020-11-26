import React from 'react'
import '../../assets/css/search.css'
import { searchhot, getsearch } from '../../util/axios'
class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            val: '',
            sglist: [],//最佳匹配
            searchhotlist: [],//热搜关键词
            onesearchlist: []
        }
    }
    getiptVal(e) {
        // this.setState({
        //     val: e.target.value,
        // })
        if (e.target.value !== '') {
            this.getsearchonelist(e.target.value)
        } else {
            this.closeVal()
        }
    }


    closeVal() {
        this.setState({
            val: ''
        })
        this.myInput.value = ''
        this.state.sglist = []
        this.state.onesearchlist = []
    }


    componentDidMount() {
        // 热搜关键词
        searchhot()
            .then(res => {
                this.setState({
                    searchhotlist: res.result.hots
                })
            })
    }
    getsearchonelist(keywords) {
        this.myInput.value = keywords
        this.setState({
            val: this.myInput.value
        })
        getsearch({
            keywords
        })
            .then(res => {
                // console.log(res);
                this.setState({
                    onesearchlist: res.result.songs.filter((item, i) => i < 10)
                })
            })
    }
    getsearchlist(keywords) {
        this.myInput.value = keywords
        this.setState({
            val: this.myInput.value
        })
        getsearch({
            keywords
        })
            .then(res => {
                console.log(res);
                if(res.code===200){
                    this.setState({
                        sglist: res.result.songs.filter((item, i) => i < 10),
                        onesearchlist:[]
                    })
                }              
            })
    }



    enter(e) {
        if (e.keyCode === 13 && e.target.value !== '') {
         
            this.setState({
                onesearchlist: []
            })
            this.getsearchlist(e.target.value)
        }
    }
    toplay(id){
        this.props.history.push(`/play?id=${id}`)
    }
    render() {
        const { val, sglist, searchhotlist,onesearchlist } = this.state
        return (<div className='search'>
            <div className='form'>
                <div className='searchipt'>
                    <i className='seachi'></i>
                    <input onKeyDown={this.enter.bind(this)} type='search' onChange={(e) => this.getiptVal(e)} placeholder='搜索歌曲、歌手、专辑' ref={input => this.myInput = input}></input>

                    <div className='close' >
                        <i className={val ? 'block' : 'none'} onClick={this.closeVal.bind(this)}></i>
                    </div>
                </div>
            </div>

        {/* 热搜关键字 */}
            <div className={sglist.length > 0 || onesearchlist.length > 0? 'none' : 'hotlist'}>
                <h2>热门搜索</h2>
                <ul className='hotname' >
                    {searchhotlist.map(item => {
                        return <li onClick={this.getsearchlist.bind(this, item.first)} key={item.first}> {item.first}</li>
                    })}
                </ul>
            </div>

            {/* 文字输入一级列表 */}
            <div className={onesearchlist.length > 0 ? 'searchlist' : 'none'}>
                <h2>搜索"{val}"</h2>
                <ul>
                    {
                        onesearchlist.map(item => {
                            return <li key={item.id} onClick={this.getsearchlist.bind(this,item.name)}>
                                <i></i>
                                <span>{item.name}</span>
                            </li>
                        })
                    }

                </ul>
            </div>

            {/* 歌曲列表页面 */}
            <div className={sglist.length > 0 ? 'sginfolist' : 'none'}>
                <h2>最佳匹配</h2>
                {/* <div className='sgheader'>
                    <img src='' />
                    <div className='sgheadercton'>
                        <p className='title'>专辑:<span>{sglist.name}</span></p>
                        <p className='name'>{ sglist.artists.name}</p>
                    </div>
                    <i></i>
                </div> */}
                <ul className='sglist'>
                    {sglist.map((item) => {
                        return (
                          
                         
                            <li key={item.id}    onClick={this.toplay.bind(this,item.id)}>
                                <div className='sgchlf'>
                                    <div className='sgtitle'>
                                        {item.name}
                                    </div>
                                    <div className='sgname'>
                                        <i></i>
                                        {/* <span>{sglist.artists.name}</span> */}
                                        {
                                            item.artists.map(itm => {
                                                return <span key={itm.id}>{itm.name}</span>
                                            })
                                        }
                                        -<span>{item.album.name}</span>
                                    </div>
                                </div>
                                <div className='sgchfr'>
                                    <span></span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>


        </div>)
    }
}
export default Home