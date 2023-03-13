window.addEventListener('load',()=>{
    //初めてだった場合の値の設定
    if(localStorage.getItem('rec_point')==null){
        localStorage.setItem('rec_point','')
    }
    if(localStorage.getItem('max_point')==null){
        localStorage.setItem('max_point','2000/1/1 13:54,0')
    }
    sei()
})

let ball_position=[25,275]
//ブロックの管理用配列 記述例:[x,個数]
let block_obj=[]
//ダメージ音
let dam=new Audio('https://soundeffect-lab.info/sound/battle/mp3/blow4.mp3')
//飛ぶときの音
let jump_audio=new Audio('https://soundeffect-lab.info/sound/anime/mp3/pafu1.mp3')
//すべてのポイントを管理する配列[タイム,力,体力]
let point=[0,100,5]
//体力が減る時の赤い膜
let fil=0
//死んだときのフラグ
let death_f=0


//成績を反映
function sei(){
    let rec_arr=localStorage.getItem('rec_point').split(',')
    let max_point=localStorage.getItem('max_point').split(',')
    if(localStorage.getItem('rec_point')==''){
        return
    }
    document.getElementById('sei').style.display='block'
    let ctx=document.getElementById('sei_can').getContext('2d')
    ctx.strokeStyle='black'
    ctx.beginPath()
    ctx.moveTo(30,300)
    ctx.lineTo(30,0)
    ctx.stroke()
    ctx.closePath()
    let glaph_mp=Math.ceil(max_point[1])
    let one_unit=300/glaph_mp
    //グラフの縦軸
    for(let i=0;i<glaph_mp;i++){
        ctx.beginPath()
        ctx.strokeStyle='black'
        ctx.moveTo(27,300-i*one_unit)
        ctx.lineTo(33,300-i*one_unit)
        ctx.stroke()
        ctx.fillStyle='black'
        if(i%5==0){
            ctx.fillText(i,5,300-one_unit*i)
        }
        ctx.closePath()
    }
    //最近の記録
    for(let i=0;i<10;i++){
        ctx.beginPath()
        ctx.lineWidth=10
        ctx.strokeStyle='red'
        ctx.moveTo(i*45+95,300)
        ctx.lineTo(i*45+95,300-(one_unit*rec_arr[i*2+1]))
        ctx.stroke()
        ctx.closePath()
    }
    //最高記録
    ctx.beginPath()
    ctx.lineWidth=10
    ctx.strokeStyle='green'
    ctx.moveTo(50,300)
    ctx.lineTo(50,300-max_point[1]*one_unit)
    ctx.stroke()
    ctx.closePath()
    //表
    for(let i=0;i<10;i++){
        if(rec_arr[i*2]==undefined){
            break
        }
        let code='<tr><td>'+rec_arr[i*2]+'</td><td>'+rec_arr[i*2+1]+'</td></tr>'
        document.getElementById('score_table').insertAdjacentHTML('beforeend',code)
    }
}

//背景を書く関数
function back(){
    document.getElementById('game_box').style.backgroundColor='skyblue'
    let ctx=document.getElementById('game_box').getContext('2d')
    ctx.beginPath()
    ctx.fillStyle='green'
    ctx.fillRect(0,285,500,100)
    ctx.closePath()
}


let fps=0
let frame=0
let startTime,endTime
//すべてのオブジェクトの描画管理
function obj_make(){
    //死んだとき
    if(death_f==1){
        return
    }
    frame++
    let ctx=document.getElementById('game_box').getContext('2d')
    ctx.clearRect(0,0,500,300)
    back()
    fps_func()
    ball()
    block()
    write_red()
    //FPS測定用
    endTime=new Date().getTime()
    if(endTime-startTime>=1000){
        fps=frame
        frame=0
        startTime=new Date().getTime()
    }
    window.requestAnimationFrame(()=>obj_make())
    return
}

//スタート
function start(){
    document.getElementById('top').style.display='none'
    document.getElementById('game').style.display='block'
    startTime=new Date().getTime()
    obj_make()
    ball_but()
    mm_block()
    time()
    tap_button()
}

//fps反映
function fps_func(){
    let ctx=document.getElementById('game_box').getContext('2d')
    ctx.beginPath()
    ctx.fillStyle='black'
    ctx.font='15px Arial'
    ctx.fillText('FPS:'+fps,10,20)
    ctx.closePath()
}

//ボールの描画
function ball(){
    let ctx=document.getElementById('game_box').getContext('2d')
    ctx.beginPath()
    ctx.fillStyle='orange'
    ctx.arc(ball_position[0],ball_position[1],15,0,Math.PI*2)
    ctx.fill()
}

let ball_nok=0
//ボタンが押されたことを検知。ボールを動かす
function ball_but(tap,tn){
    const key_up=(e)=>{
        let num=0
        if(e[0]=='touch'){
            num=Number(e[1])
            if(ball_nok==1){
                return
            }
        }
        else{
            if((!(e.key==1||e.key==2||e.key==3||e.key==4||e.key==5))||ball_nok==1){
                return
            }
            num=Number(e.key)
        }
        if(death_f==1){
            window.removeEventListener('keyup',key_up)
            return
        }
        ball_nok=1
        jump_audio.play()
        power(num)
        //y=x**2+bでxが0の時yは275-(num*30+5)になるようなbの値を求める
        let b=255-30*num
        //xの初期値
        let x_start=-Math.sqrt(275-b)
        let x=x_start
        const anime=()=>{
            ball_position[1]=x**2+b
            x+=0.2
            if(x>-x_start){
                clearInterval(anime_timer)
                ball_nok=0
            }
        }
        const anime_timer=setInterval(anime,3)
    }
    if(tap=='ok'){
        key_up(['touch',tn])
    }
    else{
        window.addEventListener('keyup',key_up)
    }
}

//ブロックの描画
function block(){
    let ctx=document.getElementById('game_box').getContext('2d')
    block_obj.map(value=>{
        for(let i=1;i<=value[1];i++){
            ctx.beginPath()
            ctx.fillStyle='brown'
            ctx.rect(value[0],290-(30*i),20,30)
            ctx.fill()
            ctx.strokeStyle='rgb(133, 10, 10)'
            ctx.lineWidth=2
            ctx.stroke()
            ctx.closePath()
        }
    })
}

//ブロックを作成、のち動かす
function mm_block(){
    const move_block=(num)=>{
        const mb_one=()=>{
            //死んだとき
            if(death_f==1){
                clearInterval(mb_timer)
                return
            }
            block_obj[num][0]-=2
            let hok=hit(num)
            if(hok==1){
                block_obj[num][1]=-31
                helth()
            }
            if(block_obj[num][1]<-30){
                clearInterval(mb_timer)
            }
        }
        let mb_timer=setInterval(mb_one,1)
    }

    const make_block=()=>{
        //死んだとき
        if(death_f==1){
            block_obj=[]
            return
        }
        let num=block_obj.length
        block_obj.push([500,Math.floor(Math.random()*5+1)])
        move_block(num)
        setTimeout(make_block,Math.random()*1000+2000)
    }
    make_block()
}

//当たり判定。ブロックのほうから呼び出す。
function hit(num){
    let height=block_obj[num][1]*30
    let left_x=block_obj[num][0]
    let right_x=left_x+20
    let ball_height=275-ball_position[1]
    //ボールの中心と四角形との最短距離で結んだ時の交点
    let short_point=[]
    short_point[0]=return_short_point(25,left_x,right_x)
    short_point[1]=return_short_point(ball_height,0,height)
    //ボールと四角形の距離
    let distance=Math.sqrt((25-short_point[0])**2+(ball_height-short_point[1])**2)
    if(distance<=15){
        return 1
    }
    return 0
}

//最短点を見つける際使う関数
function return_short_point(x,min,max){
    if(x<min){
        return min
    }
    else if(x>max){
        return max
    }
    else{
        return x
    }
}

//時間の管理
function time(){
    const ti_one_session=()=>{
        //死んだとき
        if(death_f==1){
            clearInterval(ti_timer)
        }
        point[0]=point[0]+0.1
        point[0]=Math.round(point[0]*10)/10
        document.getElementById('pb_time').children[0].innerHTML=point[0]
    }
    let ti_timer=setInterval(ti_one_session,100)
}

//力の管理
function power(level){
    let lev_mp=level*10
    if(point[1]-lev_mp<=0){
        point[1]=100-(lev_mp-point[1])
        helth()
    }
    else{
        point[1]=point[1]-lev_mp
    }
    document.getElementById('pb_power').children[0].innerHTML=point[1]
}

//体力の管理
function helth(){
    point[2]--
    dam.play()
    num_red()
    document.getElementById('pb_helth').children[0].innerHTML=point[2]
    if(point[2]==0){
        death()
    }
}

//体力が減る時に出る赤い膜を管理
function write_red(){
    let ctx=document.getElementById('game_box').getContext('2d')
    ctx.beginPath()
    ctx.fillStyle='red'
    ctx.globalAlpha=fil
    ctx.fillRect(0,0,500,300)
    ctx.globalAlpha=1
    ctx.closePath()
}

function num_red(){
    let x=-0.7
    const fill_os=()=>{
        fil=-(x**2)+0.7
        x+=0.05
        if(x>=0.7){
            clearInterval(fill_timer)
            fil=0
        }
    }
    const fill_timer=setInterval(fill_os,5)
}

//死亡したとき
function death(){
    death_f=1
    //canvasの描画をリセット
    const ctx=document.getElementById('game_box').getContext('2d')
    ctx.beginPath()
    ctx.fillStyle='white'
    ctx.fillRect(0,0,500,300)
    ctx.closePath()
    document.getElementById('game').style.display='none'
    document.getElementById('over').style.display='block'
    document.getElementById('score').innerHTML=point[0]
    //ポイントをインデックスに登録
    let now_time=new Date()
    let ns=String(now_time.getFullYear())+'/'+('00'+(now_time.getMonth()+1)).slice(-2)+'/'+('00'+now_time.getDate()).slice(-2)+' '+('00'+now_time.getHours()).slice(-2)+':'+('00'+now_time.getMinutes()).slice(-2)
    let arr_st=localStorage.getItem('rec_point').split(',')
    arr_st.unshift(ns,point[0])
    if(arr_st.length>20){
        arr_st.splice(20,2)
    }
    localStorage.setItem('rec_point',arr_change_str(arr_st))
    let max=localStorage.getItem('max_point').split(',')
    if(max[1]<point[0]){
        max=[ns,point[0]]
    }
    localStorage.setItem('max_point',arr_change_str(max))
}

//配列から文字列へ
function arr_change_str(arr){
    let str=arr.join(',')
    if(str[0]==','){
        str=str.slice(1)
    }
    if(str[str.length-1]==','){
        str=str.slice(0,-1)
    }
    return str
}

//トップへのボタンが押された時
function got(){
    window.location.reload()
}
/*
----------ポイントインデックス形式
1.rec_point 直近の成績
2.max_point これまでで一番の成績

日付,ポイント数,日付,ポイント数,...
*/

function back_top(){
    document.getElementById('help').style.display='none'
    document.getElementById('top').style.display='block'
    window.scrollTo(0,0)
}

//タッチ操作
function tap_button(){
    let elem_arr=Array.from(document.getElementById('button_area').children)
    elem_arr.map((value)=>{
        value.addEventListener('click',touch)
    })
}
function touch(e){
    ball_but('ok',Number(e.currentTarget.value))
}