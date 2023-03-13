function start(){
    document.getElementById('top').style.display='none'
    document.getElementById('game_box').style.display='block'
    //背景をグラデーションにする
    let ctx=document.getElementById('game_box').getContext('2d')
    let grd=ctx.createLinearGradient(0,0,800,400)
    grd.addColorStop(0,'#f6d365')
    grd.addColorStop(1,'#fda085')
    ctx.fillStyle=grd
    ctx.fillRect(0,0,800,400)
    make_line()
    draw_line()
}

let line_arr=[]
//路線を作成
function make_line(){
    //中央路線を作成
    for(let i=0;i<Math.floor(Math.random()*3+2);i++){
        let ny=Math.floor(Math.random()*400)
        line_arr.push([[0,ny],[800,ny]])
    }
    console.log(line_arr)
    let line_hon=line_arr
    //支線を作成
    const for_roop=()=>{
        let sen_num=Math.floor(Math.random()*line_hon.length)
        let start=[Math.floor(Math.random()*800),line_hon[sen_num][0][1]]
        let stop=[]
        //端へ支線を繋げる場合の関数
        const hashi_func=()=>{
            if(start[0]<400){
                stop[0]=0
            }
            else{
                stop[0]=800
            }
            stop[1]=start[1]+50
            if(Math.floor(Math.random()*2)==0){
                stop[1]-=100
            }
        }
        let sen_num_two=Math.floor(Math.random()*line_hon.length)
        //A
        if(Math.floor(Math.random()*2)==0){
            hashi_func()
        }
        else{
            while(sen_num_two==sen_num){
                sen_num_two=Math.floor(Math.random()*line_hon.length)
            }
            stop=[Math.floor(Math.random()*800),line_hon[sen_num_two][0][1]]
            while(start[0]-200<stop[0]&&stop<start[0]+200){
                stop[0]=Math.floor(Math.random()*800)
            }
        }
        //ほかの線分と交わっていないか検証作業
        line_arr.map((value,index)=>{
            //もし起点とする線分だったら
            if(index==sen_num||index==sen_num_two){
                return
            }
            //ほかの線分のy=ax+bのaとbを求める
            let a=(value[0][1]-value[1][1])/(value[0][0]-value[1][0])
            let b=value[0][1]-a*value[0][0]
            //自分の線分のx座標を式に代入。出てきたy座標と自分のy座標の差を出す。この差が始点と終点で正負が逆転していたら、交わっている。
            let arr_diference=[]
            arr_diference[0]=(a*start[0]+b)-start[1]
            arr_diference[1]=(a*stop[0]+b)-stop[1]
            if(Math.sign(arr_diference[0])!=Math.sign(arr_diference[1])){
                //交わっているとき
                console.log('交わっちゃってるねー')
                for_roop()
            }
            else{
                console.log('交わっていないらしい')
            }
        })
        line_arr.push([start,stop])
        return
    }
    for(let i=0;i<2;i++){
        for_roop()
    }
}

//路線を書く
function draw_line(){
    let ctx=document.getElementById('game_box').getContext('2d')
    line_arr.map((value)=>{
        ctx.beginPath()
        ctx.moveTo(value[0][0],value[0][1])
        ctx.lineTo(value[1][0],value[1][1])
        ctx.strokeStyle='white'
        ctx.lineWidth=5
        ctx.stroke()
        ctx.closePath()
    })
}