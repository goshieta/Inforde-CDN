window.addEventListener('load',()=>{
    //バックのlocalStorageを設定。
    if(localStorage.getItem('back')==null){
        if(window.innerWidth<500){
            localStorage.setItem('back','./InT/bgIMG/3.jpg')
        }else{
            localStorage.setItem('back',"./InT/bgIMG/3.jpg")
        }
    }
    //自分の設定した画像か、デフォルトか
    if(localStorage.getItem("back")=="default"||localStorage.getItem("back").indexOf('_round')!=-1){
        make_back()
    }
    else{
        document.body.style.backgroundImage="url("+localStorage.getItem("back")+")"
    }
})

function make_back(){
    if(localStorage.getItem('back')=='default'){
        type_default()
        return
    }
    else if(localStorage.getItem('back').indexOf('_round')){
        round(localStorage.getItem('back').replace('_round',''))
        return
    }
}

//デフォルト（動く丸の場合はここ)
function type_default(){
    color_arr=["red","blue","green","orange","yellow","purple","olive","pink","chartreuse"]
    for(let i=0;i<20;i++){
        let dir=document.getElementById("back")
        let cid="bgc_"+i
        let code="<canvas class='bg_can' id='"+cid+"' width='200' height='200'></canvas>"
        dir.insertAdjacentHTML("beforeend",code)
        let cvnm=document.getElementById(cid)
        if(cvnm.getContext){
            console.log("ok_cvn")
            let cvn=cvnm.getContext("2d")
            cvn.globalAlpha=0.7
            cvn.fillStyle=color_arr[Math.floor(Math.random()*9)]
            cvn.arc(100,100,Math.random()*100,0,Math.PI*2,true)
            cvn.fill()
        }
        let arr_posi=[Math.random()*80,Math.random()*80]
        cvnm.style.top=arr_posi[0]+"vh"
        cvnm.style.left=arr_posi[1]+"vw"
        move_back(cvnm,arr_posi)
    }
}

function move_back(elem,position){
    let arr_pm=[Math.round(Math.random()),Math.round(Math.random())]
    let i=0
    const move_tim=()=>{
        if(arr_pm[0]==1){
            position[0]+=0.01
        }
        else{
            position[0]-=0.01
        }
        if(arr_pm[1]==1){
            position[1]+=0.01
        }
        else{
            position[1]-=0.01
        }
        elem.style.top=position[0]+"vh"
        elem.style.left=position[1]+"vw"
        i++
        if(i>500){
            arr_pm=[Math.round(Math.random()),Math.round(Math.random())]
            i=0
        }
    }
    const timer=setInterval(move_tim,10)
}

//丸だけ
function round(color){
    //背景_丸の色_round
    //orange_white_round
    let width=document.documentElement.clientWidth
    let height=window.innerHeight
    console.log(width)
    let dir=document.getElementById("back")
    let code='<canvas width="'+width+'px" height="'+height+'px" id="round_canvas"></canvas>'
    dir.insertAdjacentHTML('beforeend',code)
    let cvn=document.getElementById('round_canvas').getContext('2d')
    color=color.split('_')
    cvn.globalAlpha=0.7
    //１つ目の丸
    cvn.beginPath()
    cvn.arc(width/2-200,height/2-50,300,0,360*Math.PI/180,false)
    cvn.fillStyle=color[1]
    cvn.fill()
    cvn.closePath()
    //2つめの丸
    cvn.beginPath()
    cvn.arc(width/2+200,height/2+50,300,0,360*Math.PI/180,false)
    cvn.fillStyle=color[1]
    cvn.fill()
    cvn.closePath()
    document.body.style.backgroundColor=color[0]
}