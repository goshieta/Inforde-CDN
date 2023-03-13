//世界時計のスクリプト(Vue.js使用)
const worldWatch=Vue.createApp({
    data(){
        return {
            cityList: [["ロンドン","0"],["パリ","+1"],["アテネ","+2"],["モスクワ","+3"],["ダッカ","+6"],["バンコク","+7"],["香港","+8"],["東京","+9"],["シドニー","+10"],["ニュージーランド","+12"],["トンガ","+13"],["ホノルル","-10"],["ロサンゼルス","-8"],["デンバー","-7"],["シカゴ","-6"],["ニューヨーク","-5"],["リオデジャネイロ","-3"]],
        }
    },
    mounted(){
        //ロード画面から脱出
        document.getElementById('load').style.display='none'
        document.getElementById('main').style.display='block'
    }
})

//一つの時計のコンポーネント
worldWatch.component('OneWatch',{
    "props":[
        "city_name",
        "difference_utc",
        "size",
    ],
    "template":`
        <div class="one_watch" :class="{mini_watch:smallBoolan}">
            <canvas width="260" height="260" class="backCanvas"></canvas>
            <p class="ow_city">{{city_name}}</p>
            <p class="ow_day">{{nowDate}}</p>
            <p class="ow_time">{{nowtime}}</p>
        </div>
    `,
    data(){
        return {
            "nowDate": 0,
            "nowtime": 0,
            "smallBoolan": eval(this.size),
        }
    },
    mounted(){
        const chageNT=()=>{
            requestAnimationFrame(chageNT)
            const zeroPadding=(num,disits)=>("0".repeat(disits)+String(num)).slice(-disits)
            let dayData=["日","月","火","水","木","金","土"]
            const utcDifference=Number(this.difference_utc)
            let dateData=new Date()
            dateData.setHours(dateData.getHours()+utcDifference)
            let localTimeData={
                year:dateData.getUTCFullYear(),
                month:(dateData.getUTCMonth()+1),
                date:dateData.getUTCDate(),
                day:dateData.getUTCDay(),
                hours:dateData.getUTCHours(),
                minutes:dateData.getUTCMinutes(),
                seconds:dateData.getUTCSeconds()
            }
            //時刻の文字列を作成
            this.nowDate=localTimeData.year+"/"+zeroPadding(localTimeData.month,2)+"/"+zeroPadding(localTimeData.date,2)+"("+dayData[localTimeData.day]+")"
            this.nowtime=zeroPadding(localTimeData.hours,2)+":"+zeroPadding(localTimeData.minutes,2)+":"+zeroPadding(localTimeData.seconds,2)
        }
        chageNT()
        this.ctx=this.$el.children[0].getContext('2d')
    },
    methods: {
        //時刻によって変わる丸の描画
        drawArc(){
            this.ctx.beginPath()
            this.ctx.lineWidth=6
            const utcDifference=Number(this.difference_utc)
            let dateData=new Date()
            dateData.setHours(dateData.getHours()+utcDifference)
            let color_stroke="black"
            if(dateData.getUTCHours()<5)color_stroke="gray"
            else if(dateData.getUTCHours()>=5&&dateData.getUTCHours()<8)color_stroke="orange"
            else if(dateData.getUTCHours()>=8&&dateData.getUTCHours()<15)color_stroke="green"
            else if(dateData.getUTCHours()>=15&&dateData.getUTCHours()<20)color_stroke="rgb(212, 101, 10)"
            else if(dateData.getUTCHours()>=20&&dateData.getUTCHours()<24)color_stroke="gray"
            this.ctx.strokeStyle=color_stroke
            this.ctx.clearRect(0,0,260,260)
            this.ctx.arc(130,130,127,270*(Math.PI/180),(((dateData.getUTCHours()*60+dateData.getUTCMinutes())/1440*360)-90)*(Math.PI/180),false)
            this.ctx.stroke()
            this.ctx.closePath()
        }
    },
    watch: {
        nowtime(){
            this.drawArc()
        }
    }
})

worldWatch.mount('#worldWatch')