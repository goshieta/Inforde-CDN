window.onload=function(){
    fetch_api()
    time_dev()
}


function fetch_api(){
    fetch("https://api.aoikujira.com/time/get.php").then((e)=>{
        return e.text()
    }).then(data=>time(data))
}

function time(time){
    let_arr=time.split(" ")
    console.log(let_arr)
    let time_arr=[]
    time_arr[0]=let_arr[0].split('/')
    time_arr[1]=let_arr[1].split(':')
    console.log(time_arr)
    document.getElementById("ymd_web").innerHTML="令和"+(time_arr[0][0]-2018)+"年"+(time_arr[0][1])+"月"+(time_arr[0][2])+"日"
    document.getElementById("hms_web").innerHTML=time_arr[1][0]+':'+time_arr[1][1]+':'+time_arr[1][2]
    setInterval(time_up,1000)
}

function time_up(){
    let arr_str=document.getElementById("hms_web").innerHTML.split(':')
    let arr_num=arr_str.map((value)=>{
        return Number(value)
    })
    arr_num[2]+=1
    if(arr_num[2]==60){
        arr_num[2]=00
        arr_num[1]+=1
    }
    if(arr_num[1]==60){
        arr_num[1]=00
        arr_num[0]+=1
    }
    if(arr_num[0]==24){
        fetch_api()
    }
    document.getElementById("hms_web").innerHTML=String(arr_num[0]).padStart(2,'0')+':'+String(arr_num[1]).padStart(2,'0')+':'+String(arr_num[2]).padStart(2,'0')
}

//デバイスの時計
function time_dev(){
    kou_time()
    setInterval(kou_time,100)
}

function kou_time(){
    let time=new Date()
    document.getElementById('ymd_dev').innerHTML="令和"+(time.getFullYear()-2018)+'年'+(time.getMonth()+1)+'月'+(time.getDate())+'日'
    document.getElementById('hms_dev').innerHTML=String(time.getHours()).padStart(2,'0')+':'+String(time.getMinutes()).padStart(2,'0')+':'+String(time.getSeconds()).padStart(2,'0')
}

function timer(){
    let dir=document.getElementById('timer_floor')
    let code='<div class="time_part"><div class="display_timer"><p>00:00</p></div><div><input type="button" value="スタート" class="ti_start"><input type="button" value="一時停止" class="ti_stop"><input type="button" value="削除" class="ti_del"></div></div>'
    dir.insertAdjacentHTML('beforeend',code)
}


function stopwatch(){}