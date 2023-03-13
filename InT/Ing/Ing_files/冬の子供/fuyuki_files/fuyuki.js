window.addEventListener('load',snow_animation)
window.addEventListener('resize',canvas_size_change)

function canvas_size_change(){
    document.getElementById('snow').width=window.innerWidth
    document.getElementById('snow').height=window.innerHeight
}

//My Data Json ゲームに置けるデータを格納 
let MDJ={
    num_snow:0,//雪玉の所持数
    move_ok:2,//動くことを許可するか(0:許可,1:スペースキーのみ許可,2:すべてのオブジェクトに動くことを許可しない)
    snow_timer:0,//雪を拾うとき２秒を数える
    myLife:5,//自分の体力
    enemy_position:[],//敵の位置情報
}

let enemy_arr=[]
function snow_animation(){
    canvas_size_change()
    let snow_arr=[]

    let ms_clock=0

    function anime_frame(){
        if(document.getElementById('top').style.display=='block'){
            window.requestAnimationFrame(anime_frame)
        }

        //雪の生成。ここに移すことでほかのタブに移った時でも重くならない
        ms_clock++
        if(ms_clock>30){
            ms_clock=0
            snow_arr.push([Math.floor(Math.random()*window.innerWidth),0])
        }

        let ctx=document.getElementById('snow').getContext('2d')
        ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
        snow_arr.map(value=>{
            if(value==null){
                return
            }
            value[1]++
            ctx.beginPath()
            ctx.fillStyle='white'
            ctx.arc(value[0],value[1],10,360*(Math.PI/180),false)
            ctx.fill()
            ctx.closePath()
            if(value[1]>window.innerHeight+10){
                snow_arr.shift()
            }
        })
    }
    anime_frame()
}

//ゲームスタート
function start(){
    //トップ画面、コンテンツバー、背景、背景を暗くする疑似要素を隠し、ゲームを表示
    document.getElementById('top').style.display='none'
    document.getElementById('snow').style.display='none'
    document.getElementById('title_menu_hun').style.display='none'
    document.getElementById('bar').style.display='none'
    document.getElementById('beh_bar').style.display='none'
    document.getElementById('game').style.display='block'
    document.body.style.background='none'
    document.body.classList.remove('wm_on')
    document.body.classList.add('wm_off')
    init()
    over_canvas()
}



//3D
function init(){
    const renderer=new THREE.WebGLRenderer({
        canvas: document.getElementById('game_content')
    })

    //シーン
    const scene=new THREE.Scene()
    scene.background=new THREE.Color('skyblue')

    //カメラ
    const camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,10000)
    camera.position.set(0,160,1300)

    // 初期化のために実行
    onResize();
    // リサイズイベント発生時に実行
    window.addEventListener('resize', onResize);

    function onResize() {
        // サイズを取得
        const width = window.innerWidth;
        const height = window.innerHeight;

        // レンダラーのサイズを調整する
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        // カメラのアスペクト比を正す
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    //地面
    const texture = new THREE.TextureLoader().load('./fuyuki_files/テクスチャ.jpg') // 画像テクスチャ
    let ground_geometry=new THREE.PlaneGeometry(3000,3000,64,64)
    const ground=new THREE.Mesh(
        ground_geometry,
        new THREE.MeshStandardMaterial({
            color:'white',
            map:texture,
            bumpMap:texture,
            bumpScale:1
        })
    )
    ground.rotation.x=Math.PI/-2
    scene.add(ground)

    //ライト
    const light=new THREE.DirectionalLight('white',1)
    scene.add(light)
    const en_light=new THREE.AmbientLight('white',0.3)
    scene.add(en_light)

    //マウスの動きに合わせて視点を振る
    document.getElementById('game_content').addEventListener('mousemove',mouse_move)
    let rotX=0
    let rotY=0
    function mouse_move(e){
        //動くのが許可されていなかったら
        if(MDJ.move_ok!=0){
            return
        }
        const targetRotX=(e.movementX/window.innerWidth)*360
        const targetRotY=(e.movementY/window.innerHeight)*360
        if(rotY+targetRotY<=-80||rotY+targetRotY>=80){
            return
        }
        const radianX=(rotX+targetRotX)*Math.PI/180
        const radianY=(rotY+targetRotY)*Math.PI/180
        rotX=rotX+targetRotX
        rotY=rotY+targetRotY
        const now_camera=camera.getWorldPosition(new THREE.Vector3())
        const aX=10*Math.cos(radianX)
        const bX=10*Math.sin(radianX)
        const bY=10*Math.sin(radianY)
        const look_position=[now_camera.x-bX,now_camera.y+bY,now_camera.z-aX]
        camera.lookAt(new THREE.Vector3(look_position[0],look_position[1],look_position[2]))
    }
    //キー操作
    window.addEventListener("keypress",key_camera)

    function key_camera(e){
        if(!(e.key=="w"||e.key=="a"||e.key=="s"||e.key=="d")){
            return
        }
        if(MDJ.move_ok!=0){
            return
        }
        //角度が右回りだったら負の数、左回りだったら正の数、２周したら絶対値が720度になるなど問題があるので、右回りで値が0以上360度未満になるように調節
        let rot=rotX%360
        if(rot>0){
            rot=360-rot
        }
        rot=Math.abs(rot)
        //w,a,s,dどれを押されたかで進む方向が違うので、調節する(wはそのまま、aは-90度,sは+180度,dは+90度)
        if(e.key=='w'){}
        else if(e.key=='a'){
            rot-=90
        }
        else if(e.key=='s'){
            rot+=180
        }
        else if(e.key=='d'){
            rot+=90
        }
        //範囲からはみ出たものを調整
        if(rot>=360){
            rot=rot-360
        }
        if(rot<0){
            rot=360+rot
        }
        //向き調節完了
        //一回でspeed動く(斜辺の長さを1とした三角関数)
        const speed=20
        const now_camera=camera.getWorldPosition(new THREE.Vector3())
        //サインコサイン。ラジアンに変換する必要がある
        const a=speed*Math.cos(rot*(Math.PI/180))
        const b=speed*Math.sin(rot*(Math.PI/180))
        camera.position.set(now_camera.x+b,now_camera.y,now_camera.z-a)
    }

    //雪玉をすくう
    window.addEventListener('keydown',pickUp_snow)
    window.addEventListener('keyup',stop_snow)
    function pickUp_snow(e){
        if(e.code!="Space"&&e!='for'){
            return
        }
        if((MDJ.move_ok==1||MDJ.move_ok==2)&&e!='for'){
            return
        }
        MDJ.move_ok=1
        const now_camera=camera.getWorldPosition(new THREE.Vector3())
        camera.position.set(now_camera.x,50,now_camera.z)
        now_camera.y=50
        const radianX=(rotX)*Math.PI/180
        const radianY=(-30)*Math.PI/180
        rotX=rotX
        rotY=-30
        const aX=10*Math.cos(radianX)
        const bX=10*Math.sin(radianX)
        const bY=10*Math.sin(radianY)
        const look_position=[now_camera.x-bX,now_camera.y+bY,now_camera.z-aX]
        camera.lookAt(new THREE.Vector3(look_position[0],look_position[1],look_position[2]))
        //２秒を数える
        const snow_os=()=>{
            MDJ.snow_timer++
            //２秒立った時
            if(MDJ.snow_timer>=200){
                clearInterval(sec_timer_snow)
                MDJ.snow_timer=0
                MDJ.num_snow++
                pickUp_snow('for')
                return
            }
            //２秒経っていないが解除されたとき
            if(MDJ.move_ok==0){
                MDJ.snow_timer=0
                clearInterval(sec_timer_snow)
                return
            }
        }
        const sec_timer_snow=setInterval(snow_os,10)
    }
    function stop_snow(e){
        if(e.code!='Space'){
            return
        }
        if(MDJ.move_ok==2){
            return
        }
        MDJ.move_ok=0
        const now_camera=camera.getWorldPosition(new THREE.Vector3())
        camera.position.set(now_camera.x,160,now_camera.z)
    }

    //雪玉を投げる
    window.addEventListener('click',throw_from_me)

    function throw_from_me(){
        if(MDJ.move_ok!=0){
            return
        }
        if(MDJ.num_snow==0){
            return
        }
        const nk=camera.getWorldPosition(new THREE.Vector3())
        th([nk.x,nk.y,nk.z],[rot_adjustment(rotX),rot_adjustment(rotY)])
        MDJ.num_snow--
    }

    //向きの調節
    function rot_adjustment(rot){
        let rot_n=rot%360
        if(rot_n>0){
            rot_n=360-rot_n
        }
        rot_n=Math.abs(rot_n)
        return(rot_n)
    }

    //引数にpositionとdirectionを渡したら雪玉を投げてくれる
    function th(position,direction){
        const ball=new THREE.Mesh(
            new THREE.SphereGeometry(10,10,10),
            new THREE.MeshStandardMaterial({color:'white'})
        )
        ball.position.set(position[0],position[1],position[2])
        scene.add(ball)

        let time=0
        //y方向の引数の値は、目線にまっすぐ平行な線を0度として下から回っている。これを目線を0度として上に向いたら+下に向いたら-になるよう-90<=y<=90の範囲に矯正するs
        if(0<=direction[1]&&direction[1]<90){
            direction[1]=-direction[1]
        }
        else if(90<=direction[1]&&direction[1]<180){
            direction[1]=direction[1]-180
        }
        else if(180<=direction[1]&&direction[1]<270){
            direction[1]-=180
        }
        else if(270<=direction[1]&&direction[1]<360){
            direction[1]=360-direction[1]
        }
        //y方向調整完了
        const move_ball=()=>{
            time++
            //変数timeの数に応じてx,zの数が変化していく(三角関数の利用)
            const rot_th_tan=Math.tan(direction[1]*(Math.PI/180))
            const speed=20
            const distance=speed*time
            let y=-1/200*(time**2)+rot_th_tan*time
            let z=-(distance*Math.cos(direction[0]*(Math.PI/180)))
            let x=distance*Math.sin(direction[0]*(Math.PI/180))
            ball.position.set(position[0]+x,position[1]+y,position[2]+z)
            if(position[1]+y<0){
                clearInterval(mt_ball)
                scene.remove(ball)
                return
            }
            scene.add(ball)
        }
        const mt_ball=setInterval(move_ball,10)
    }


    //敵キャラの作成、制御
    class enemy{
        constructor(x,z){
            this.x=x
            this.z=z
        }
        make_enemy(){
            const x=this.x
            const z=this.z
            this.people_head=new THREE.Mesh(
                new THREE.SphereGeometry(40,32,32),
                new THREE.MeshStandardMaterial({color:'red'})
            )
            this.people_body=new THREE.Mesh(
                new THREE.BoxGeometry(80,120,80),
                new THREE.MeshStandardMaterial({color:'red'})
            )
            this.people_head.position.set(x,160,z)
            this.people_body.position.set(x,60,z)
            scene.add(this.people_body)
            scene.add(this.people_head)
            this.arr_posi=MDJ.enemy_position.length
            MDJ.enemy_position.push([x,z])
            setTimeout(()=>{
                this.throw_from_enemy(0,0)
            },4000)
        }
        //方向と大きさを渡すと動く
        move_enemy_from_vector(XorZ,size){
            const first_size=size
            size=Math.floor(size)
            const one_session=()=>{
                const now_posi=MDJ.enemy_position[this.arr_posi]
                if(XorZ=="x"){
                    const new_posi=[now_posi[0]+Math.sign(size)*5,now_posi[1]]
                    this.people_head.position.set(new_posi[0],160,new_posi[1])
                    this.people_body.position.set(new_posi[0],60,new_posi[1])
                    scene.add(this.people_head)
                    scene.add(this.people_body)
                    MDJ.enemy_position[this.arr_posi]=new_posi
                }
                else if(XorZ=='z'){
                    const new_posi=[now_posi[0],now_posi[1]+Math.sign(size)*5]
                    this.people_head.position.set(new_posi[0],160,new_posi[1])
                    this.people_body.position.set(new_posi[0],60,new_posi[1])
                    scene.add(this.people_head)
                    scene.add(this.people_body)
                    MDJ.enemy_position[this.arr_posi]=new_posi
                }
                size-=Math.sign(size)*5
                if(Math.sign(size)!=Math.sign(first_size)){
                    console.log("VECTOR OK")
                    clearInterval(vec_timer)
                    return
                }
            }
            const vec_timer=setInterval(one_session,7)
        }
        //座標から動く
        move_enemy_from_position(targetX,targetZ){
            const now_posi=MDJ.enemy_position[this.arr_posi]
            const move_size=[targetX-now_posi[0],targetZ-now_posi[1]]
            this.move_enemy_from_vector("x",move_size[0])
            this.move_enemy_from_vector("z",move_size[1])
        }
        //ターゲット座標を入れるだけで目的地を狙撃する
        throw_from_enemy(targetX,targetZ){
            const now_posi=MDJ.enemy_position[this.arr_posi]
            const diference_coordinate=[targetX-now_posi[0],targetZ-now_posi[1]]
            let finish_dir=0
            const dir=(180*Math.atan(diference_coordinate[0]/diference_coordinate[1]))/Math.PI
            if(diference_coordinate[0]>=0&&diference_coordinate[1]>=0){
                finish_dir=180-dir
            }else if(diference_coordinate[0]>=0&&diference_coordinate[1]<=0){
                finish_dir=-dir
            }
            else if(diference_coordinate[0]<=0&&diference_coordinate[1]<0){
                finish_dir=360-dir
            }
            else if(diference_coordinate[0]<=0&&diference_coordinate[1]>=0){
                finish_dir=180-dir
            }
            console.log(finish_dir)
            th([now_posi[0],160,now_posi[1]],[finish_dir,50])
        }
    }

    //敵キャラの最初の生成
    enemy_arr=[new enemy(0,-1300),new enemy(1300,0),new enemy(-1300,0)]
    enemy_arr.map(value=>{
        value.make_enemy()
    })

    

    tick()

    function tick(){
        requestAnimationFrame(tick)
        renderer.render(scene,camera)
    }
}


function over_canvas(){
    resize_over()
    //最初の説明
    first_info()
    //リサイズなど
    window.addEventListener('resize',resize_over)
    function resize_over(){
        document.getElementById('game_bar').width=window.innerWidth
        document.getElementById('game_bar').height=window.innerHeight
    }

    const ctx=document.getElementById('game_bar').getContext('2d')

    //真ん中のカーソルを描画
    function cursor(){
        const width=Number(document.getElementById('game_bar').width)
        const height=Number(document.getElementById('game_bar').height)
        ctx.beginPath()
        ctx.moveTo(width/2-10,height/2)
        ctx.lineTo(width/2+10,height/2)
        ctx.lineWidth=3
        ctx.strokeStyle='gray'
        ctx.stroke()
        ctx.closePath()
        ctx.beginPath()
        ctx.moveTo(width/2,height/2-10)
        ctx.lineTo(width/2,height/2+10)
        ctx.stroke()
        ctx.closePath()
    }

    //雪玉の所持数を描画
    function snow_num_write(){
        let text='×'+MDJ.num_snow
        //文字
        ctx.beginPath()
        ctx.fillStyle='black'
        ctx.lineWidth=1
        ctx.font = 'bold 30pt sans-serif';
        let width=ctx.measureText(text).width
        let canvas_width=document.getElementById('game_bar').width
        ctx.fillText(text,canvas_width-width-10,50)
        ctx.closePath()
        //雪玉のイラスト
        ctx.beginPath()
        ctx.fillStyle='white'
        ctx.arc(canvas_width-width-35,37,20,0,360*(Math.PI/180),false)
        ctx.fill()
        ctx.closePath()
    }

    //雪玉を拾うときのアニメーションを描画
    function pickUp_snow_animation(){
        if(MDJ.move_ok!=1){
            return
        }
        const width=300
        const displayWidth=window.innerWidth
        ctx.beginPath()
        ctx.fillStyle='#dddddd'
        ctx.fillRect((displayWidth-width)/2,10,width,20)
        ctx.closePath()
        ctx.beginPath()
        ctx.fillStyle='#00c900'
        ctx.fillRect((displayWidth-width)/2,10,width*(200-MDJ.snow_timer)/200,20)
        ctx.closePath()
    }

    const image=new Image()
    image.src='./fuyuki_files/hart.png'
    function life_me(){
        //ハートマークの描画
        ctx.beginPath()
        ctx.drawImage(image,10,12,50,50)
        ctx.closePath()
        //ポイント数の描画
        ctx.beginPath()
        const text='×'+MDJ.myLife
        ctx.fillStyle='black'
        ctx.font='bold 30pt sans-serif'
        ctx.fillText(text,60,50)
        ctx.closePath()
    }

    let info_lev=4
    //最初の説明
    function first_info(){
        document.getElementById('game_bar').style.cursor='pointer'
        const next_f=()=>{
            info_lev--
            document.getElementById('game_bar').removeEventListener('click',next_f)
            document.getElementById('game_bar').style.cursor='normal'
            //ポインタロック
            document.getElementById('game_content').requestPointerLock()
            const one_f_time=()=>{
                info_lev--
                if(info_lev==0){
                    info_lev="スタート"
                    clearInterval(f_timer)
                    setTimeout(()=>{
                        info_lev='Inforde'
                        MDJ.move_ok=0
                    },1000)
                }
            }
            const f_timer=setInterval(one_f_time,1000)
        }
        document.getElementById('game_bar').addEventListener('click',next_f)
    }

    let darknessStr=0
    let darknessStr_mode=0
    //最初の説明の描画
    function first_info_draw(){
        if(info_lev==4){
            //背景の薄い黒
            ctx.beginPath()
            ctx.fillStyle="rgba(0,0,0,0.8)"
            ctx.fillRect(0,0,window.innerWidth,window.innerHeight)
            ctx.closePath()
            //テキスト
            let txt="操作方法の説明"
            ctx.beginPath()
            ctx.fillStyle='white'
            ctx.font='bold 30pt sans-serif'
            let width=ctx.measureText(txt).width
            ctx.fillText(txt,(window.innerWidth-width)/2,100)
            ctx.closePath()
            //メイン
            let info_arr=[["視点移動","マウスを動かします","マウス"],["雪玉を拾う","スペースキーを長押しします","スペースキー"],["雪玉を投げる","右クリックします","右クリック"],["移動","WASDキーで移動します","WASDキー"]]
            info_arr.map((value,index)=>{
                one_info(value[0],value[1],value[2],index)
            })
            //クリックで次進む
            ctx.beginPath()
            ctx.fillStyle='rgba(255,255,255,'+darknessStr+')'
            ctx.font='bold 30pt sans-serif'
            txt="クリックで次に進みます"
            width=ctx.measureText(txt).width
            ctx.fillText(txt,(window.innerWidth-width)/2,650)
            if(darknessStr_mode==0){
                darknessStr+=0.03
                if(darknessStr>=1){
                    darknessStr_mode=1
                }
            }
            else{
                darknessStr-=0.03
                if(darknessStr<=0){
                    darknessStr_mode=0
                }
            }
            ctx.closePath()
        }
        else{
            if(info_lev=="Inforde"){
                return
            }
            ctx.beginPath()
            ctx.font='bold 60pt sans-serif'
            ctx.fillStyle='black'
            const width_txt=ctx.measureText(info_lev).width
            const height_txt=60
            ctx.fillText(info_lev,(window.innerWidth-width_txt)/2,(window.innerHeight-height_txt)/2)
            ctx.closePath()
        }
        function one_info(title,text,image,number){
            ctx.beginPath()
            ctx.font='bold 25pt sans-serif'
            let TW=ctx.measureText(title).width
            ctx.fillText(title,(window.innerWidth/4-TW)/2+number*window.innerWidth/4,200)
            ctx.closePath()
            ctx.beginPath()
            let real_image=new Image(200,200)
            real_image.src="./fuyuki_files/説明/"+image+".png"
            ctx.drawImage(real_image,(window.innerWidth/4-200)/2+number*window.innerWidth/4,300,200,200)
            ctx.closePath()
            ctx.beginPath()
            ctx.font='bold 15pt sans-serif'
            let TEW=ctx.measureText(text).width
            ctx.fillText(text,(window.innerWidth/4-TEW)/2+number*window.innerWidth/4,550)
            ctx.closePath()
        }
    }

    //描画
    tick()
    function tick(){
        window.requestAnimationFrame(tick)
        ctx.clearRect(0,0,window.innerWidth,window.innerHeight)

        cursor()
        snow_num_write()
        pickUp_snow_animation()
        life_me()
        first_info_draw()
    }
}