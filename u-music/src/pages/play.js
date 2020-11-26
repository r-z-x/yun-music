import react from "react";
import qsString from "querystring";
import axios from "axios";
import $ from "jquery";
import "../assets/css/play.css";
import { playUrl, getLyric, songDetail } from "../util/axios";
import Img from "../assets/img/needle-ip6.png";

class play extends react.Component {
  constructor() {
    super();
    this.state = {
      img: Img,
      songUrl: "",
      songDetail: {},
      lyric: "",
      playTime: "00:00",
      flag: false,
    };
    //创建一个播放器的ref
    this.audio = react.createRef();
    //创建一个播放图表的ref
    this.playIcon = react.createRef();
  }
  componentDidMount() {
    let query = this.props.location.search.slice(1);
    //axios并发处理
    axios
      .all([
        playUrl({
          id: qsString.parse(query).id,
        }),
        getLyric({
          id: qsString.parse(query).id,
        }),
        songDetail({
          ids: qsString.parse(query).id,
        }),
      ])
      .then(
        axios.spread((songUrl, lyric, songDetail) => {
        //   console.log(songUrl, "songUrl");
        //   console.log(lyric, "lyric");
        //   console.log(songDetail, "songDetail");
          if (songUrl.code === 200) {
            this.setState({
              songUrl: songUrl.data[0].url,
            });
          }
          if (lyric.code === 200) {
            /* 
              歌词字符串：
              "[00:00.000] 作词 : 小克  [00:00.780] 作曲 : 林家谦"
              我想要的形式是：
              00：00 作词 : 小克 
              {
                 "00：00"：作词 : 小克 ,
                 "00:00": 作曲 : 林家谦
              }

              */
            let lyricInfo = "";
            //   let lyric = lyric.lrc.lyric
            lyricInfo = lyric.lrc.lyric;
            //设定一个正则 取出 []
            let reg = /\[(.*?)](.*)/g;
            //设定一空对象
            let obj = {};
            //替换 replace
            lyricInfo.replace(reg, (a, b, c) => {
              //[00:00.000] 作词 : 小克 aaaaaaa
              //00:00.000 bbbbbb
              //作词 : 小克 cccccc
              // console.log(a,'aaaaaaa')
              // console.log(b,'bbbbbb')
              // console.log(c,'cccccc')
              b = b.slice(0, 5);
              obj[b] = c;
            });
            this.setState(
              {
                lyric: obj,
              },
              () => {
                //实时监听播放器的变化 ontimeupdate属性
                // console.log(this.audio.current, "audioDOM");
                let audio = this.audio.current;
                audio.ontimeupdate = () => {
                  //我想要00：00
                  // console.log(audio.currentTime,'我被监控')
                  let nowTime = this.formateTime(audio.currentTime);
                  //   console.log(this.state.lyric,'this.state.lyric')
                  //剔除掉没有歌词的播放器时间
                  if (nowTime in this.state.lyric) {
                    // console.log(nowTime, "匹配到的啊啊啊啊啊");
                    //去设置播放时间
                    this.setState(
                      {
                        playTime: nowTime,
                      },
                      () => {
                        //调取歌词滚动的方法
                        this.moveLyric();
                        // console.log(this.state.playTime, "匹配到的播放器时间");
                      }
                    );
                  }
                };
              }
            );
            // console.log(obj, "整合之后的对象");
            // this.setState({
            //   lyric: lyric.lrc.lyric,
            // });
          }
          if (songDetail.code === 200) {
            this.setState({
              songDetail: songDetail.songs[0],
            });
          }
        })
      );
  }

  //封装一个事件格式化的方法
  formateTime(timer) {
    let minutes = (Math.floor(timer / 60) + "").padStart(2, "0");
    let seconds = (Math.floor(timer % 60) + "").padStart(2, "0");
    return `${minutes}:${seconds}`;
  }
  //歌词滚动
  moveLyric() {
    /* 
      一、知道那一句歌词是高亮
      二、查找高亮所有在位置
      三、比较 offsetTop 
      四、发现上移改变translateY
       */
    let active = document.getElementsByClassName("active")[0];
    let index = $(".geci_box").children().index(active);
    let offSet = 31;
    if (active.offsetTop > 31) {
      console.log("位置发生变化1111");
      //更改它位置
      $(".geci_box").css("transform", `translateY(-${index * offSet}px)`);
    }
    //   console.log(index,'位置')
  }
  //创建一个播放事件
  toPlay() {
    this.setState(
      {
        flag: !this.state.flag,
      },
      () => {
        if (this.state.flag) {
          //如果flag是真 代表暂停 出现图标 ，音乐停止
          this.playIcon.current.style.display = "block";
          this.audio.current.pause();
        } else {
          //如果flag是假 代表播放 没有图标 ，音乐正在播放
          this.playIcon.current.style.display = "none";
          this.audio.current.play();
        }
      }
    );
  }
  render() {
    const { songUrl, songDetail, lyric, img, playTime } = this.state;
    return (
      <div className="play">
        <div className="play_top">
          <img src={img} />
        </div>
        <div className="play_img_all" onClick={this.toPlay.bind(this)}>
          <i ref={this.playIcon} className="play_icon"></i>
          <div className="play_img_box">
            <div className="small_img">
              <img
                src={
                  songDetail.al
                    ? songDetail.al.picUrl
                    : "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606411625087&di=2bbf863215c4f08f4800ffc03da201da&imgtype=0&src=http%3A%2F%2Fimg9.doubanio.com%2Fview%2Fgroup_topic%2Fl%2Fpublic%2Fp232716766.jpg"
                }
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="play_txt">
          <div className="play_txt_name">
            <span>{songDetail.name}</span>-
            {songDetail.ar
              ? songDetail.ar.map((arInfo) => {
                  return <span key={arInfo.id}>{arInfo.name}</span>;
                })
              : ""}
          </div>
          <div className="play_txt_geci">
            <div className="geci_box">
              {
                //把对象转化成数组去循环  Object.entries把对象转化成枚举型的数组，类似于for in
                Object.entries(lyric).map((item, idx) => {
                  //   console.log(item,'每一项啊啊啊')
                  if (playTime === item[0]) {
                    return (
                      <p key={idx} className="active">
                        {item[1]}
                      </p>
                    );
                  } else {
                    return <p key={idx}>{item[1]}</p>;
                  }
                })
              }
            </div>
          </div>
        </div>
        <div className="audio_box">
          <audio ref={this.audio} src={songUrl}  autoPlay></audio>
        </div>
      </div>
    );
  }
}

export default play;
