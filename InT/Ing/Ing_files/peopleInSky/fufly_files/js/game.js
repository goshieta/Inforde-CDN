window.addEventListener('resize',resize_func)
function resize_func(){
    const canvas=document.getElementById('game_main')
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight
}

let object={
    main:null,
    back:[],
    enemy:null
}

let gameInfo={
    distance:0,
    city:'',
    oneSessionDecreeseDistance:0,
    health:3,
}

function start(city,cityNum){
    document.getElementById('game_main').addEventListener('mousemove',mouseMoveEv)
    resize_func()
    imgLoader()

    cityDistanceArr=[640,1550,1733,1200,2086,7490,6544,9750,8420,7830,9590,10880,10160,14780,1290,300]
    gameInfo.distance=cityDistanceArr[cityNum]
    gameInfo.city=city
    gameInfo.oneSessionDecreeseDistance=gameInfo.distance/7200

    object.main=new plane()

    draw()
}


let img_arr=[]
//画像を先に読み込んでおく
function imgLoader(){
    const srcArray=['./fufly_files/image/object/飛行機.png','./fufly_files/image/object/雲.png']
    srcArray.map((value,index)=>{
        img_arr[index]=new Image()
        img_arr[index].src=value
        img_arr[index].addEventListener('load',()=>{
            console.log('Image'+index+' is loaded!')
        })
    })
}

let drawI=0
function draw(){
    requestAnimationFrame(draw)

    const canvas=document.getElementById('game_main')
    const ctx=document.getElementById('game_main').getContext('2d')
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle='skyblue'
    ctx.fillRect(0,0,canvas.width,canvas.height)

    makeCloud()

    object.back.map((value)=>{value.drawCloud()})
    object.main.draw_plane()
    drawMeter()
    drawHelth()

    drawI++
}

function makeCloud(){
    if(drawI%60==0){
        object.back.push(new oneCloud())
    }
}

function mouseMoveEv(e){
    const my=e.pageY
    const windowSizeY=window.innerHeight
    const persentY=my/windowSizeY*100
    const angle=(persentY-50)/50*30
    object.main.angle=angle
}

class plane{
    constructor(){
        this.x=0
        //高さ。画面の高さの何パーセントか
        this.y=50
        this.angle=0
    }
    draw_plane(){
        const ctx=document.getElementById('game_main').getContext('2d')
        this.y+=this.angle/50
        ctx.save()
        //回転
        ctx.translate( 175, (window.innerHeight-100)/100*this.y)
        ctx.rotate( this.angle * Math.PI / 180 )
        ctx.translate(-175,-(window.innerHeight-100)/100*this.y)
        //描画
        ctx.drawImage(img_arr[0],100,(document.getElementById('game_main').height-100)/100*this.y,150,100)
        ctx.rotate(-(this.angle * Math.PI / 180))
        ctx.restore()
    }
}

class oneCloud{
    constructor(){
        this.y=Math.floor(Math.random()*100)
        this.x=120
    }
    drawCloud(){
        if(this.x<-20){
            return
        }
        const ctx=document.getElementById('game_main').getContext('2d')
        ctx.drawImage(img_arr[1],(document.getElementById('game_main').width-150)/100*this.x,(document.getElementById('game_main').height-150)/100*this.y,150,150)
        this.x-=0.5
    }
}

function drawMeter(){
    const ctx=document.getElementById('game_main').getContext('2d')
    const txt=gameInfo.city+'まで　あと'+Math.floor(gameInfo.distance)+'km'
    ctx.beginPath()
    ctx.font = 'bold 25px Arial';
    let width=ctx.measureText(txt).width+20
    ctx.fillStyle='rgba(255, 255, 255, 0.5)'
    ctx.fillRect(10,10,width,55)
    ctx.fillStyle='black'
    ctx.fillText(txt,20,45)
    ctx.closePath()

    gameInfo.distance=gameInfo.distance-gameInfo.oneSessionDecreeseDistance
}

function drawHelth(){
    
}