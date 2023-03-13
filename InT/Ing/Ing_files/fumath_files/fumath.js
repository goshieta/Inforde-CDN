let ban=[
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,1,2,0,0,0,0],
        [0,0,0,0,2,1,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ]
//味方の色
let now=1
//敵の色
let now_adv=2

//人数
let pe=0

window.onload=function(){
    const canvas=document.getElementById('game_box')
    if(canvas.getContext){
        const context=canvas.getContext('2d')
        context.clientWidth=500
        context.height=500
        context.beginPath()
        context.fillStyle='green'
        context.fillRect(0,0,canvas.width,canvas.height)
        title_write(context)
    }
}


//タイトル画面を描画
function title_write(){
    document.getElementById('game_title_div').style.display='block'
}
//スタート
function start(){
    const canvas=document.getElementById('game_box')
    const context=document.getElementById('game_box').getContext('2d')
    document.getElementById('game_title_div').style.display='none'
    document.getElementById('game_box').style.display='inline-block'
    document.getElementById('point').style.display='flex'
    document.getElementById('skip').style.display='inline-block'
    write_square(context)
    wirte_stone(context)
    canvas.addEventListener('click',click_can)
}

function write_square(context){
    context.strokeStyle='black'
    context.beginPath()
    for(let i=0;i<9;i++){
        context.moveTo(50*i+50,0)
        context.lineTo(i*50+50,500)
    }
    context.closePath()
    context.stroke()
    context.beginPath()
    for(let i=0;i<9;i++){
        context.moveTo(0,50*i+50)
        context.lineTo(500,i*50+50)
    }
    context.closePath()
    context.stroke()
}

function wirte_stone(context){
    let zero_num=0
    for(let x=0;x<10;x++){
        for(let y=0;y<10;y++){
            let bg=ban[y][x]
            if(bg==0){
                zero_num++
                continue
            }
            context.beginPath()
            context.arc(x*50+25,y*50+25,20,0*Math.PI/180,360*Math.PI/180,false)
            if(bg==1){
                context.fillStyle='white'
            }
            else if(bg==2){
                context.fillStyle='black'
            }
            context.fill()
        }
    }
    if(zero_num==0){
        shut_game()
    }
}

function click_can(e){
    if(e[1]=='バーカ'){
        return
    }
    let position={}
    if(e[0]=='bot'){
        position=e[1]
    }
    else{
        const cvs=document.getElementById('game_box')
        const rect=e.target.getBoundingClientRect()
        const view=[e.clientX-rect.left,e.clientY-rect.top]
        const scaleW= cvs.clientWidth / cvs.width,
            scaleH=cvs.clientHeight / cvs.height
        const X=Math.floor(view[0]/scaleW),
            Y=Math.floor(view[1]/scaleH)
        position=[Math.floor(X/50),Math.floor(Y/50)]
    }
    console.log(position[0],position[1],now)
    let math_arr=arr_returnm(position[0],position[1],'n')
    //ひっくりかえせる駒が何もなかったら
    if(math_arr.length==0){
        return
    }
    math_arr.push([position[0],position[1]])
    write_gyou(math_arr)
    point()
    if(now==2&&pe==1){
        click_can(['bot',select()])
    }
}

//色を変えることのできるマスを配列にして返す
function arr_returnm(x,y,bot){
    let return_arr=[]
    let dg=ban[y][x]
    //すでに石が置いてあったら
    if(dg!=0){
        return []
    }
    //探す方向
    let x_dir=-1
    let y_dir=-1
    //現在調べているxとy座標
    let now_x=x
    let now_y=y
    //iがy方向lがx方向
    for(let i=0;i<3;i++){
        for(let l=0;l<3;l++){
            let dir_arr=[]
            let dir_posi_arr=[]
            now_x=x
            now_y=y
            while(!(now_x<0||now_x>9||now_y<0||now_y>9||(x_dir==0&&y_dir==0))){
                if(now_x==x&&now_y==y){}
                else{
                    dir_arr.push(ban[now_y][now_x])
                    dir_posi_arr.push([now_x,now_y])
                }
                switch(x_dir){
                    case -1:
                        now_x--
                        break
                    case 0:
                        break
                    case 1:
                        now_x++
                        break
                }
                switch(y_dir){
                    case -1:
                        now_y--
                        break
                    case 0:
                        break
                    case 1:
                        now_y++
                        break
                }
            }
            //できた配列をもとに座標を抽出
            //dir_arrは色に関する値
            //dir_posi_arrは座標の値
            if(dir_arr.length==0){
                x_dir++
                continue
            }
            //一番最初が緑または味方の色の配列は論外
            if(dir_arr[0]==0||dir_arr[0]==now){
                x_dir++
                continue
            }
            //ひっくりかえせるか調べ、okだった場合はひっくりかえせる座標を送る
            okok:
            for(let i=0;i<dir_arr.length;i++){
                if(dir_arr[i]==0){
                    //そのまま0になってしまった場合
                    break okok
                }
                else if(dir_arr[i]==now){
                    //味方の色が出てきた場合
                    for(let l=0;l<dir_arr.length;l++){
                        if(dir_arr[l]==now){
                            break okok
                        }
                        return_arr.push(dir_posi_arr[l])
                    }
                }
            }
            x_dir++
        }
        y_dir++
        x_dir=-1
    }
    if(return_arr.length==0||bot=='y'){}
    else{
        //味方と敵を入れ替え
        let s_now=now
        now=now_adv
        now_adv=s_now
    }
    return return_arr
}

//配列を行列に反映
function write_gyou(array){
    for(let i=0;i<array.length;i++){
        ban[array[i][1]][array[i][0]]=now_adv
    }
    wirte_stone(document.getElementById('game_box').getContext('2d'))
}


//自動で対戦してくれるやつ
function select(){
    let ban_num=[]
    for(let y=0;y<10;y++){
        ban_num[y]=[]
        for(let x=0;x<10;x++){
            let num_arr=arr_returnm(x,y,'y')
            ban_num[y][x]=num_arr.length
        }
    }
    //盤上の地点のポイント
    let ban_point=[
        [9,8,8,8,8,8,8,8,8,9],
        [8,1,3,3,3,3,3,3,1,8],
        [8,3,5,5,5,5,5,5,3,8],
        [8,3,5,5,5,5,5,5,3,8],
        [8,3,5,5,0,0,5,5,3,8],
        [8,3,5,5,0,0,5,5,3,8],
        [8,3,5,5,5,5,5,5,3,8],
        [8,3,5,5,5,5,5,5,3,8],
        [8,1,3,3,3,3,3,3,1,8],
        [9,8,8,8,8,8,8,8,8,9]
    ]
    let num_toru=ban_num.map((value,y)=>{
        let arr_align=value.map((val,x)=>{
            return ban_point[y][x]*val
        })
        return arr_align
    })
    console.log(num_toru)

    //最大値を求める
    let max=[0]
    for(let i=0;i<100;i++){
        if(max[0]<num_toru[(i-i%10)/10][i%10]){
            max[0]=num_toru[(i-i%10)/10][i%10]
            max[1]=(i-i%10)/10
            max[2]=i%10
        }
    }
    if(max[0]==0){
        skip()
        return 'バーカ'
    }
    return [max[2],max[1]]
}

//ポイント反映関数
function point(){
    //現在の状況（ポイントなど）反映
    let white_num=0
    let black_num=0
    if(now==1){
        document.getElementById('white').style.border='solid 2px red'
        document.getElementById('black').style.border='solid 2px white'
        document.getElementById('white').style.backgroundColor='rgb(255, 242, 242)'
        document.getElementById('black').style.backgroundColor='white'
    }
    else{
        document.getElementById('black').style.border='solid 2px red'
        document.getElementById('white').style.border='solid 2px white'
        document.getElementById('black').style.backgroundColor='rgb(255, 242, 242)'
        document.getElementById('white').style.backgroundColor='white'
    }
    //盤上の個数を数える
    for(let y_ban=0;y_ban<10;y_ban++){
        for(let x_ban=0;x_ban<10;x_ban++){
            switch(ban[y_ban][x_ban]){
                case 1:
                    white_num++
                    break
                case 2:
                    black_num++
                    break
            }
        }
    }
    document.getElementById('white_num').innerHTML=white_num
    document.getElementById('black_num').innerHTML=black_num
    //すべてのマスが１色になったら
    if(white_num==0||black_num==0){
        shut_game()
    }
}

//スキップ
function skip(){
    //味方と敵を入れ替え
    let s_now=now
    now=now_adv
    now_adv=s_now
    point()
    if(now==2&&pe==1){
        click_can(['bot',select()])
    }
}

//ゲーム終了
function shut_game(){
    let white=Number(document.getElementById('white_num').innerHTML)
    let black=Number(document.getElementById('black_num').innerHTML)
    if(white>black){
        mes_over('白の勝ちです')
    }
    if(white==black){
        mes_over('引き分けです')
    }
    if(white<black){
        mes_over('黒の勝ちです')
    }
}
function mes_over(mes){
    const dg=id=>document.getElementById(id)
    dg('game_box').style.display='none'
    dg('point').style.display='none'
    dg('skip').style.display='none'
    dg('over').style.display='block'
    dg('over_p').innerHTML=mes
}

function re_start(){
    window.location.reload()
}