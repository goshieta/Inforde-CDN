let nowScoap="0"

function get_weather(){
    const URL="https://weather.tsukumijima.net/api/forecast/city/"+localStorage.getItem("weather").split(",")[1]
    console.log(URL)
    fetch(URL,{method:"Get"}
    ).then((e)=>{
        return e.json()
    }).then((weather)=>{
        console.log(weather)
        today=weather.forecasts[0]
        tommrow=weather.forecasts[1]
        const dge=id=>document.getElementById(id)
        //天気の表示
        let weather_img_arr=["晴","曇","雨","雪"]
        let img_str=""
        weather_img_arr.map((value)=>{
            if(today.telop.indexOf(value)!==-1){
                img_str+=value
            }
        })
        img_str=img_str.substring(0, 2)
        let dir=document.getElementById("wetdl_for")
        dir.innerHTML=""
        let code="<img src='./InT/天気/"+img_str+".png' class='we_img'>"
        dir.insertAdjacentHTML("beforeend",code)

        img_str=""
        weather_img_arr.map((value)=>{
            if(tommrow.telop.indexOf(value)!==-1){
                img_str+=value
            }
        })
        img_str=img_str.substring(0, 2)
        dir=document.getElementById("wetml_for")
        dir.innerHTML=""
        code="<img src='./InT/天気/"+img_str+".png' class='we_img'>"
        dir.insertAdjacentHTML("beforeend",code)

        //日にちや情報の表示
        dge("wt_title").innerHTML=localStorage.getItem("weather").split(",")[0]+"の天気"
        dge("wetdl_date").innerHTML=today.date.slice(5).replace("-","月")+"日"
        //最高気温
        if(today.temperature.max.celsius==null){
            dge('todayMaxTempFlexDiv').style.display='none'
        }else{
            dge("wetdr_temp").innerHTML=today.temperature.max.celsius+"度"
        }
        console.log(today.detail.wind,tommrow.detail.wind)
        //風
        dge("wetdr_wave").innerHTML=today.detail.wind.replace(/．/g,".").replace(/\s+/g,' ').replace(/(?:海上)(.*)/,"").replace("海上","")
        //降水確率
        const nowTime=new Date().getHours()
        if(nowTime<6){
            dge('wetdr_rain').innerHTML=today.chanceOfRain.T06_12
        }else if(nowTime<12){
            dge('wetdr_rain').innerHTML=today.chanceOfRain.T12_18
        }else if(nowTime<18){
            dge('wetdr_rain').innerHTML=today.chanceOfRain.T18_24
        }else if(nowTime<24){
            dge('wetdr_rain').innerHTML=tommrow.chanceOfRain.T00_06
        }
        //明日
        dge("wetml_date").innerHTML=tommrow.date.slice(5).replace("-","月")+"日"
        dge("wetmr_wave").innerHTML=tommrow.detail.wind.replace(/．/g,'.').replace(/\s+/g,' ').replace(/(?:海上)(.*)/,"").replace("海上","")
        dge("wetmr_temp").innerHTML=tommrow.temperature.max.celsius+"度"
        dge("wetmr_tempMin").innerHTML=tommrow.temperature.min.celsius+"度"
    }).catch(()=>{
    })
}

function change_wepo(){
    const dg=id=>document.getElementById(id)
    dg("fill").style.display='block'
    dg("message_div").style.display='block'
    dg('mes_chwepo').style.display='block'
}

//現在地から
function get_position(){
    navigator.geolocation.getCurrentPosition(get_positwo);
}

function get_positwo(position){
    document.getElementById('loadJson').style.display='block'
    fetch("./InT/js/cityInfo.json").then(res=>{
        return res.text()
    }).then((cityArr)=>{
        cityArr=JSON.parse(cityArr).city
        let ido=position.coords.latitude
        let kei=position.coords.longitude
        let min=[10000,'InfordeCity','000000']
        cityArr.map((value1)=>{
            value1[1].map(value2=>{
                value2[1].map(city=>{
                    const far=Math.sqrt((city[2][0]-ido)**2+(city[2][1]-kei)**2)
                    if(min[0]>far){
                        min=[far,city[0],city[1]]
                    }
                })
            })
        })
        let code_min=[min[1],min[2]]
        localStorage.setItem("weather",code_min)
        const dg=id=>document.getElementById(id)
        Array.from(document.getElementsByClassName('mes_div')).map(value=>value.style.display='none')
        dg("fill").style.display='none'
        dg("message_div").style.display='none'
        document.getElementById('loadJson').style.display='none'
        get_weather()
    })
}

let cityArr=[]

//日本地図を表示
function showJapan(){
    Array.from(document.getElementsByClassName('mes_div')).map(value=>value.style.display='none')
    const dg=id=>document.getElementById(id)
    dg("fill").style.display='none'
    dg("message_div").style.display='none'
    document.getElementById('mwMap').style.display='block'
    document.getElementById('this').style.display='none'
    document.getElementById('whiteSpace').style.display='block'
    showScoap()
}

//右側に表示するメニューをスコープ変数をもとに生成
function showScoap(){
    fetch("./InT/js/cityInfo.json").then(res=>{
        return res.text()
    }).then((jsonData)=>{
        jsonData=JSON.parse(jsonData).city
        cityArr=jsonData
        const dir=document.getElementById('mwmbuttonArea')
        dir.innerHTML=""
        let scoapArr=[]
        for(let i=0;i<nowScoap.length;i++){
            if(i==0){
                scoapArr=cityArr
                continue
            }
            scoapArr=scoapArr[Number(nowScoap[i])][1]
            console.log(scoapArr)
        }
        for(let i=0;i<scoapArr.length;i++){
            const parentDiv=document.createElement('div')
            parentDiv.textContent=scoapArr[i][0]
            dir.appendChild(parentDiv)
            dir.addEventListener('click',nextScoap)
        }
    })
}

function nextScoap(e){
    const index=Array.from(document.getElementById('mwmbuttonArea').children).indexOf(e.target)
    nowScoap=nowScoap+index
    if(nowScoap.length==4){
        //終了したとき
        const cityName=e.target.innerHTML
        const cityNum=cityArr[Number(nowScoap[1])][1][Number(nowScoap[2])][1][Number(nowScoap[3])][1]
        localStorage.setItem('weather',cityName+","+cityNum)
        nowScoap="0"
        document.getElementById('mwmbuttonArea').innerHTML=''
        document.getElementById('mwMap').style.display='none'
        document.getElementById('this').style.display='block'
        document.getElementById('whiteSpace').style.display='none'
        get_weather()
    }
    else{
        console.log(nowScoap)
        showScoap()
    }
}