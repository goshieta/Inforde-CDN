const measure=Vue.createApp({
    data(){
        return {
            item:[],
            modalNum:-1,
            stModalInfo:{
                //編集(edit)か新規(add)か
                mode:"add",
                title:"ストップウォッチ1"
            }
        }
    },
    methods: {
        addStopWatch(stWatchInfo){
            this.item.push(["st",stWatchInfo.stName])
        },
        editaComp(editaModalInfo){
            this.modalNum=editaModalInfo.modalNum
            this.stModalInfo=editaModalInfo.stModalInfo
        }
    },
    components:{
        "modal-st":Vue.defineAsyncComponent(()=>loadModule("./component/modalSt.vue",options)),
        "modal-tm":Vue.defineAsyncComponent(()=>loadModule("./component/modalTm.vue",options))
    }
})

//ストップウォッチやタイマーのコンポーネント
measure.component("stop-watch",{
    data(){
        return {
            state:0,
            time:0,
            cache:0,
            startTime:null,
            intervalObj:null,
        }
    },
    props:["obj_name"],
    template:`
        <div class="oneAnal">
            <p>{{obj_name}}</p>
            <p class="st_time">{{timeView}}</p>
            <div class="st_button_area">
                <button @click="startStw()" v-if="state!=1" class="st_start"><canvas width="40" height="40" class="st_start_can"></canvas></button>
                <button @click="state=0" v-if="state==2" class="st_stop"><canvas width="40" height="40" class="st_stop_can"></canvas></button>
                <button @click="state=2" v-if="state==1" class="st_pause"><canvas width="40" height="40" class="st_pause_can"></canvas></button>
            </div>
            <div class="st_debu_area">
                <button class="st_edita" @click="editaMe()">編集</button>
                <button class="st_delate" @click="delateMe()">削除</button>
            </div>
        </div>
    `,
    computed: {
        timeView(){
            //timeはミリ秒で表記。それをまともな文字列にする
            let miriTime=this.time%100
            let seconds=(this.time-miriTime)/100
            let minutes=Math.floor(seconds/60)
            seconds=seconds%60
            let hours=Math.floor(minutes/60)
            minutes=minutes%60
            const zeroPadding=(num,disits)=>("0".repeat(disits)+String(num)).slice(-disits)
            return `${zeroPadding(hours,2)}:${zeroPadding(minutes,2)}:${zeroPadding(seconds,2)}.${zeroPadding(miriTime,2)}`
        }
    },
    methods: {
        startStw(){
            //状態を(1)再生にする
            this.state=1
            //スタートした時間を記録
            this.startTime=new Date()
        },
        delateMe(){
            this.$emit('delate')
        },
        drawButton(){
            const canvasStart=this.$el.getElementsByClassName("st_start_can")[0]
            const canvasStop=this.$el.getElementsByClassName("st_stop_can")[0]
            const canvasPause=this.$el.getElementsByClassName("st_pause_can")[0]
            if(canvasStart!=undefined){
                const ctxStart=canvasStart.getContext('2d')
                ctxStart.clearRect(0,0,40,40)
                ctxStart.beginPath()
                ctxStart.moveTo(15,12)
                ctxStart.lineTo(15,28)
                ctxStart.lineTo(30,20)
                ctxStart.lineTo(15,12)
                ctxStart.fillStyle="black"
                ctxStart.fill()
                ctxStart.closePath()
            }
            if(canvasStop!=undefined){
                const ctxStop=canvasStop.getContext('2d')
                ctxStop.clearRect(0,0,40,40)
                ctxStop.fillStyle="black"
                ctxStop.fillRect(13,13,14,14)
            }
            if(canvasPause!=undefined){
                const ctxPause=canvasPause.getContext('2d')
                ctxPause.clearRect(0,0,40,40)
                ctxPause.fillStyle="black"
                ctxPause.fillRect(12,10,6,20)
                ctxPause.fillRect(22,10,6,20)
            }
        },
        editaMe(){
            //編集の設定
            this.$emit("edita",{
                modalNum:0,
                stModalInfo:{
                    title:this.obj_name,
                    mode:"edit"
                }
            })
        }
    },
    watch: {
        state :function(newVal){
            if(newVal==1){
                const oneSession=()=>{
                    let timeDifference=Math.floor((new Date().getTime()-this.startTime.getTime())/10)
                    this.time=timeDifference+this.cache
                }
                this.intervalObj=setInterval(oneSession,5)
            }
            else if(newVal==2){
                clearInterval(this.intervalObj)
                let timeDifference=Math.floor((new Date().getTime()-this.startTime.getTime())/10)
                this.cache=this.cache+timeDifference
                this.startTime=null
            }
            else if(newVal==0){
                this.cache=0
                this.time=0
            }
        }
    },
    mounted(){
        const drawManage=()=>{
            requestAnimationFrame(drawManage)

            this.drawButton()
        }
        drawManage()
    },
})

measure.component("timer",{
    template:`
        <p>どうも大麻です！</p>
    `
})

measure.mount('#measure')