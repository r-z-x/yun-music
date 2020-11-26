import React from 'react'
import '../../assets/css/rank.css'
import {hotlist} from '../../util/axios'
 class Home extends React.Component{
    constructor() {
        super()
        this.state = {
            sglist: [],
            updateTime:0
        }
    }

    componentDidMount(){
        hotlist({
            id:3778678
        })
        .then(res=>{
        //    console.log(res)
        
            this.setState({
                sglist:res.playlist.tracks.filter((item,idx)=>idx<20),
                updateTime:res.playlist.updateTime
            })
           
        })

        
    } 
   // http://localhost:3000/top/list?id=3778678

   formateTime(timer) {
    let date = new Date(timer);
    //获取年份
    // let year = date.getFullYear();
    //获取月份
    let month = (date.getMonth() + 1 + "").padStart(2, "0");
    //获取天数
    let day = (date.getDate() + "").padStart(2, "0");
    // let hour = (date.getHours() + "").padStart(2, "0");
    // let minute = (date.getMinutes() + "").padStart(2, "0");
    // let second = (date.getSeconds() + "").padStart(2, "0");
    return `${month}月${day}日`;
  }
  toplay(id){
    this.props.history.push(`/play?id=${id}`)
}
 render(){
    const { sglist,updateTime } = this.state
    return (<div className='rank'>
        <div className='ralogo'>
            <div className='hotrank'>
            </div>
            <div className='hottime'>
            更新日期： {this.formateTime(updateTime)}
            </div>
        </div>
        <ul className='sglist'>
                {sglist.map((item,idx) =>{
                    return (
                   
                    <li key={item.id}  onClick={this.toplay.bind(this,item.id)}>
                        <div className={idx<3?'ranking':'rankingd'}>{idx<9?'0'+(idx+1):idx+1}</div>
                        <div className='borBtm'>
                        <div className='sgchlf'>
                            <div className='sgtitle'>
                                {item.name}
                                </div>
                            <div className='sgname'>
                                <i></i>
                                 {item.ar.map((sgname,idx)=>{
                                     return <span key={sgname.id}>{idx===1? ' / ':''}{sgname.name}</span>
                                 })}
                                 &nbsp;-{item.al.name}
                                 </div>
                        </div>
                        <div className='sgchfr'>
                            <span></span>
                        </div>
                        </div>
                    </li>
                    )
                  })}
            </ul>
    </div>)
    }
}
 export default Home