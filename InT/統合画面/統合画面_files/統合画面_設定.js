window.onload=function(){
    ls_set()
    set_val()
    document.getElementById('con_form').addEventListener('change',set_back)
    document.getElementById('con_theme_form').addEventListener('change',set_theme)
    document.getElementById('con_mySite_form').addEventListener('change',set_back_mySite)
}

let nowSelectImgNum=1

//ローカルストレージの設定
function ls_set(){
    if(localStorage.getItem("back")==null){
        localStorage.setItem("back","default")
    }
    if(localStorage.getItem("theme")==null){
        localStorage.setItem("theme","black")
    }
    if(localStorage.getItem('wid_back')==null){
        localStorage.setItem('wid_back','rgb(255, 200, 200)_rgb(255, 242, 219)')
    }
}

//値の設定
function set_val(){
    let back_val="default"
    if(localStorage.getItem("back")!=="default"&&localStorage.getItem('back').indexOf('_round')==-1&&localStorage.getItem('back').indexOf('./InT/bgIMG/')==-1){
        back_val="myURL"
        document.getElementById("con_pre").innerHTML="<img id='con_pre_img' src='"+localStorage.getItem("back")+"'>"
        document.getElementById("con_background").value=localStorage.getItem("back")
    }
    else if(localStorage.getItem('back').indexOf('_round')!==-1){
        let color_arr=localStorage.getItem('back').split('_')
        back_val='my_round'
        document.getElementById('cp_con_form_back').value=color_arr[0]
        document.getElementById('cp_con_form_round').value=color_arr[1]
    }
    else if(localStorage.getItem('back').indexOf('./InT/bgIMG/')!==-1){
        back_val='selIMG'
        document.getElementById('con_form').con_back.value=back_val
        const imgNum=Number(localStorage.getItem('back').replace('./InT/bgIMG/','').replace('.jpg',''))
        nowSelectImgNum=imgNum
        document.getElementById('con_defImg').style.display='block'
        bgImgSet(imgNum)
    }
    document.getElementById('con_form').con_back.value=back_val
    document.getElementById('con_theme_form').con_th.value=localStorage.getItem("theme")
    document.getElementById('con_mySite_form').con_ms.value=localStorage.getItem('wid_back')
    //最初に初期化のためにlocalstorageをフォームに合わせてセットする関数を実行
    set_back()
    set_theme()
}

//画像選択した時
function bgImgSet(num){
    nowSelectImgNum=num
    for(let i=1;i<(document.getElementById('con_defImg').children.length+1);i++){
        document.getElementById('con_defImg').children[i-1].classList.remove('select')
    }
    document.getElementById('con_defImg').children[num-1].classList.add('select')
    set_back()
}

//背景に関する決定ボタンを押した後の処理
function set_back(){
    document.getElementById('con_background').style.display='none'
    document.getElementById('con_form_color').style.display='none'
    document.getElementById('con_defImg').style.display='none'
    let val=document.getElementById('con_form').con_back.value
    if(val=='default'){
        localStorage.setItem("back","default")
        canvas('default')
    }
    else if(val=='my_round'){
        document.getElementById('con_form_color').style.display='block'
        if(localStorage.getItem('back').indexOf('_round')==-1){
            document.getElementById('cp_con_form_back').value='#ffffff'
            document.getElementById('cp_con_form_round').value='#008000'
        }
        canvas(['round',document.getElementById('cp_con_form_back').value,document.getElementById('cp_con_form_round').value])
        localStorage.setItem('back',document.getElementById('cp_con_form_back').value+'_'+document.getElementById('cp_con_form_round').value+'_round')
    }
    else if(val=='myURL'){
        document.getElementById('con_background').style.display='block'
        localStorage.setItem("back",document.getElementById("con_background").value)
        canvas(['url',document.getElementById("con_background").value])
    }
    else{
        document.getElementById('con_defImg').style.display='block'
        localStorage.setItem('back','./InT/bgIMG/'+nowSelectImgNum+'.jpg')
        canvas(['url','../bgIMG/'+nowSelectImgNum+'.jpg'])
    }
}


//テーマに関する決定ボタンを押した後の処理
function set_theme(){
    let val=document.getElementById('con_theme_form').con_th.value
    localStorage.setItem("theme",val)
}


//マイサイ背景が変更されたとき
function set_back_mySite(){
    let val_back=document.getElementById('con_mySite_form').con_ms.value
    localStorage.setItem('wid_back',val_back)
}


//サイドメニュー
$(function() {
    $('.hamburger').click(function() {
        $(this).toggleClass('active');
 
        if ($(this).hasClass('active')) {
            $('.globalMenuSp').addClass('active');
        } else {
            $('.globalMenuSp').removeClass('active');
        } 
      
    });
});
//メニュー内を閉じておく
$(function() {
    $('.globalMenuSp a[href]').click(function() {
        $('.globalMenuSp').removeClass('active');
       $('.hamburger').removeClass('active');

    });
  });


//プレビューのcanvasを描画
function canvas(ver){
    let ctx=document.getElementById('con_pre').getContext('2d')
    //canvas上のすべての図形を削除
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.globalAlpha=1
    ctx.arc(150, 100, 200, 0, Math.PI*2, false);
    ctx.fill();
    ctx.closePath()
    ctx.globalCompositeOperation='source-over'
    if(ver=='default'){
        color_arr=["red","blue","green","orange","yellow","purple","olive","pink","chartreuse"]
        for(let i=0;i<20;i++){
            ctx.beginPath()
            ctx.globalAlpha=0.7
            ctx.fillStyle=color_arr[Math.floor(Math.random()*9)]
            ctx.arc(Math.floor(Math.random()*300),Math.floor(Math.random()*200),Math.random()*30,0,Math.PI*2,true)
            ctx.fill()
            ctx.closePath()
        }
    }
    else if(ver[0]=='round'){
        //背景
        ctx.beginPath()
        ctx.fillStyle=ver[1]
        ctx.arc(150, 100, 200, 0, Math.PI*2, false)
        ctx.fill()
        ctx.closePath()
        //丸
        ctx.globalAlpha=0.7
        ctx.beginPath()
        ctx.fillStyle=ver[2]
        ctx.arc(120,80,70,0,Math.PI*2,false)
        ctx.fill()
        ctx.closePath()
        ctx.beginPath()
        ctx.arc(180,120,70,0,Math.PI*2,false)
        ctx.fill()
        ctx.closePath()
    }
    else if(ver[0]=='url'){
        const img_now=new Image()
        img_now.src=ver[1]
        img_now.onload=()=>{
            ctx.drawImage(img_now,0,0,300,200)
        }
    }
}