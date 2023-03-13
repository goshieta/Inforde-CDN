//version bata6
window.addEventListener('load',()=>{
    if(localStorage.getItem('theme')==null){
        localStorage.setItem('theme','blue_white')
    }
    if(localStorage.getItem('engine')==null){
        localStorage.setItem('engine','google')
    }
    if(localStorage.getItem("mySite")==null){
        //自分のサイト情報を入力(タイトル$URL$画像のURL<||>...)
        localStorage.setItem("mySite","Google map$https://maps.google.com$https://www.google.com/images/branding/product/ico/maps15_bnuw3a_32dp.ico<||>amazon$https://www.amazon.co.jp$https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg<||>Youtube$https://youtube.com$https://www.youtube.com/s/desktop/e213795e/img/favicon_144x144.png<||>Google翻訳$https://translate.google.co.jp$https://ssl.gstatic.com/translate/favicon.ico<||>Google Drive$https://drive.google.com$https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png<||>Wikipedia$https://ja.wikipedia.org/wiki/%E3%83%A1%E3%82%A4%E3%83%B3%E3%83%9A%E3%83%BC%E3%82%B8$http://favicon.hatena.ne.jp/?url=https://ja.wikipedia.org/wiki/%E3%83%A1%E3%82%A4%E3%83%B3%E3%83%9A%E3%83%BC%E3%82%B8<||>JR東日本$https://www.jreast.co.jp$http://favicon.hatena.ne.jp/?url=https://www.jreast.co.jp")
    }
    if(localStorage.getItem("weather")==null){
        localStorage.setItem("weather","庄原,340020")
    }
    if(localStorage.getItem('wid_back')==null){
        localStorage.setItem('wid_back','rgba(255,255,255,0.7)_rgba(255,255,255,0.7)')
    }
    //update
    if(localStorage.getItem("updateWeather")==null){
        localStorage.setItem("updateWeather",1)
        localStorage.setItem("weather","庄原,340020")
        localStorage.setItem('wid_back','rgba(255,255,255,0.7)_rgba(255,255,255,0.7)')
        localStorage.setItem('back',"./InT/bgIMG/3.jpg")
    }
    document.getElementById("midf_img").src="./InT/検索エンジン/"+localStorage.getItem('engine')+".png"
    document.getElementById("midf_form").addEventListener('keypress',form_key)
    get_weather()
    move_clock()
    make_osuw()
    make_mySite()
    news()
    mySite_theme()
    //テーマの適用
    theme(localStorage.getItem("theme"))
    const dge=id=>document.getElementById(id)
    //読み込み画面から戻す。
    dge('back').style.display='block'
    dge('load').style.display='none'
    dge('this').style.display='block'
    //フォームの検索予測
    document.getElementById('midf_form').addEventListener('keyup',predict_search)
    document.addEventListener('click', (e) => {
        if(!e.target.closest('#midf_sug_pa')&&!e.target.closest('#midf_form')) {
          //ここに外側をクリックしたときの処理
          document.getElementById('midf_sug').style.display='none'
        }
    })
})

//urlに飛ぶ
function url(url){
    window.open(url,"_blank")
}

function form_key(e){
    if (e.keyCode === 13) {
		search(null)
	}  
	return false;
}
function search(myWord){
    let word=""
    if(myWord==null){
        word=document.getElementById("midf_form").value
    }
    else{
        word=myWord
    }
    let engine=localStorage.getItem('engine')
    let url_en={
        "google":"https://www.google.com/search?q="
        ,"yahoo":"https://search.yahoo.co.jp/search?p="
        ,"bing":"https://www.bing.com/search?q="
        ,"baidu":"https://www.baidu.com/s?wd="
        ,"duckduckgo":"https://duckduckgo.com/?q="
        ,"yandex":"https://yandex.com/search/?text="
        ,"naver":"https://search.naver.com/search.naver?query="
        ,"ecosia":"https://www.ecosia.org/search?q="
    }
    url=JSON.parse(JSON.stringify(url_en))
    window.open(url[engine]+word, '_blank')
    document.getElementById("midf_form").value=""
}

function show_sel(){
    dir=document.getElementById("midf_sel")
    dir.innerHTML="<h2>検索エンジンを選択</h2>"
    ken_arr=["google","yahoo","bing","baidu","duckduckgo","yandex","naver","ecosia"]
    for(let i=0;i<8;i++){
        let code="<img src='./InT/検索エンジン/"+ken_arr[i]+".png' id='midfs_img_"+ken_arr[i]+"' class='midfs_img' onclick='change_engine(\""+ken_arr[i]+"\")'>"
        dir.insertAdjacentHTML("beforeend",code)
    }
    dir.style.display='block'
}

function change_engine(wh){
    localStorage.setItem('engine',wh)
    document.getElementById("midf_img").src="./InT/検索エンジン/"+localStorage.getItem('engine')+".png"
    document.getElementById("midf_sel").style.display='none'
}


//ランダムアクセス
function random_site(){
    let url_arr=['https://abema.tv/', 'https://www.youtube.com/', 'https://game-box.xyz/', 'https://omocoro.jp/', 'https://bokete.jp/', 'https://www.netflix.com/jp/', 'https://gyao.yahoo.co.jp/', 'https://tver.jp/', 'https://www.paravi.jp/', 'https://www.nicovideo.jp/', 'http://1000mg.jp/', 'https://www.soeasy.co.jp/', 'https://petomorrow.jp/movie_list_cat', 'https://dailyportalz.jp/', 'https://dajare.jp/', 'https://toyokeizai.net/', 'https://www.newscafe.ne.jp/', 'https://nlab.itmedia.co.jp/', 'https://getnews.jp/', 'https://www.lifehacker.jp/', 'https://limia.jp/', 'https://sakagami3.com/', 'https://ja.wikipedia.org/wiki/', 'https://ansaikuropedia.org/wiki/', 'https://www.google.co.jp/intl/ja/earth/', 'https://www.tokyodeep.info/', 'https://www.walkerplus.com/', 'https://www.shakaika.jp/', 'https://kyoko-np.net/', 'https://nazolog.com/', 'http://kowabana.jp/', 'https://www.philosophyguides.org/', 'https://www.cosme.net/', 'https://oceans-nadia.com/', 'https://aikatu.jp/', 'https://spicomi.net/media/', 'https://goisu.net/', 'https://hq-improve.com/', 'https://2chmm.com/', 'https://gigazine.net/', 'http://karapaia.com/', 'https://rocketnews24.com/', 'https://www.mangaz.com/', 'https://dokuha.jp/', 'https://www.sukima.me/', 'https://www.aozora.gr.jp/', 'https://syosetu.com/', 'https://maho.jp/', 'https://shindanmaker.com/', 'http://chatpad.jp/','https://jp.pornhub.com/','https://www.dmm.co.jp/top/','https://www.xvideos.com/']
    window.open(url_arr[Math.floor(Math.random()*url_arr.length)],"_blank")
}



//テーマの適用
function theme(val){
    let class_arr=Array.from(document.getElementsByClassName("ha_div"))
    let osu_arr=Array.from(document.querySelectorAll("#osu_word a"))
    let inte_arr=Array.from(document.querySelectorAll("#inte_menu a"))
    if(val=="black"){
        osu_arr.map((value)=>{
            value.style.color="white"
        })
        class_arr.map((value)=>{
            value.style.color="white"
        })
        inte_arr.map((value)=>{
            value.style.color="white"
        })
    }
    else{
        inte_arr.map((value)=>{
            value.style.color="black"
        })
    }
    if(val=="green_white"){
        class_arr.map((value)=>{
            value.style.backgroundColor="rgba(233, 252, 233,0.9)"
        })
    }
    else if(val=="blue_white"){
        class_arr.map((value)=>{
            value.style.backgroundColor="rgba(230, 230, 255,0.9)"
        })
    }
    else if(val=="red_white"){
        class_arr.map((value)=>{
            value.style.backgroundColor="rgba(255, 221, 221,0.9)"
        })
    }
    else if(val=='white_white'){
        class_arr.map((value)=>{
            value.style.backgroundColor="white"
        })
    }
    else if(val=="black"){
        class_arr.map((value)=>{
            value.style.backgroundColor="black"
        })
    }
}

//検索ワードの予測
let ago_word=""
function predict_search(){
    let word=document.getElementById('midf_form').value
    if(ago_word==word){
        return
    }
    ago_word=word
    if(word==""){
        Array.from(document.getElementById('midf_sug').children).map((value)=>{
            value.removeEventListener('click',go_form)
        })
        document.getElementById('midf_sug').innerHTML=''
        return
    }
    if(word.indexOf('　')){
        word=word.replace(/　/g,'+')
    }
    fetch('https://script.google.com/macros/s/AKfycbxKCUGzBhwLlPxFNd6VDg7kraM0a1_MJpSDbkd38JPBXxuya9T3LGKRNw0ZATRDHh20/exec?test='+word,{method:'GET'}).then(value=>{
        return value.text()
    }).then(text=>pres_2(text,word))
}
function pres_2(data,word){
    let arr_data=data.split(',')
    if(arr_data[0]==''&&arr_data.length==1){
        document.getElementById('midf_sug').style.display='none'
        return
    }
    Array.from(document.getElementById('midf_sug').children).map((value)=>{
        value.removeEventListener('click',go_form)
    })
    document.getElementById('midf_sug').innerHTML=''
    let dir=document.getElementById('midf_sug')
    arr_data.map(value=>{
        let code='<p>'+value+'</p>'
        dir.insertAdjacentHTML('beforeend',code)
    })
    Array.from(dir.children).map((value)=>{
        value.addEventListener('click',go_form)
    })
    if(dir.children.length>0){
        document.getElementById('midf_sug').style.display='block'
    }
    else{
        document.getElementById('midf_sug').style.display='none'
    }
}

function go_form(e){
    document.getElementById('midf_form').focus()
    let elem=e.currentTarget
    let val=elem.innerHTML
    search(val)
}


function mySite_theme(){
    let val=localStorage.getItem('wid_back')
    val=val.split('_')
    document.getElementById('site_s').style.background='linear-gradient(to right,'+val[0]+','+val[1]+')'
    if(val[0]=="white"||val[0]=="rgba(255,255,255,0)"){
        document.getElementById('site_s').classList.add('gray')
    }
}

//一時的な関数
function clear(){
    localStorage.clear()
}