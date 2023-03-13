//version bata4
window.onload=function(){
    if(localStorage.getItem('back')==null){
        localStorage.setItem('back',"default")
    }
    if(localStorage.getItem('theme')==null){
        localStorage.setItem('theme','black')
    }
    //自分の設定した画像か、デフォルトか
    if(localStorage.getItem("back")=="default"){
        make_back()
    }
    else{
        document.body.style.backgroundImage="url("+localStorage.getItem("back")+")"
    }
    if(localStorage.getItem('engine')==null){
        localStorage.setItem('engine','google')
    }
    if(localStorage.getItem("mySite")==null){
        //自分のサイト情報を入力(タイトル$URL$画像のURL<||>...)
        localStorage.setItem("mySite","Youtube$https://www.youtube.com$https://cdn2.aprico-media.com/production/posts/eyecatches/000/000/957/original.jpg?1505469404<||>Google map$https://maps.google.com$https://play-lh.googleusercontent.com/Kf8WTct65hFJxBUDm5E-EpYsiDoLQiGGbnuyP6HBNax43YShXti9THPon1YKB6zPYpA=w240-h480-rw")
    }
    if(localStorage.getItem("weather")==null){
        localStorage.setItem("weather",["広島",338])
    }
    document.getElementById("midf_img").src="./InT/検索エンジン/"+localStorage.getItem('engine')+".png"
    document.getElementById("midf_form").addEventListener('keypress',form_key)
    get_weather()
    move_clock()
    make_osuw()
    browser()
    make_mySite()
    news()
    //テーマの適用
    theme(localStorage.getItem("theme"))
}


//urlに飛ぶ
function url(url){
    window.open(url,"_blank")
}

function make_back(){
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

function form_key(e){
    if (e.keyCode === 13) {
		search()
	}  
		return false;
}
function search(){
    let word=document.getElementById("midf_form").value
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


function get_weather(){
    console.log("https://api.aoikujira.com/tenki/week.php?fmt=json&city="+Number(localStorage.getItem("weather").split(",")[1]));
    fetch("https://api.aoikujira.com/tenki/week.php?fmt=json&city="+Number(localStorage.getItem("weather").split(",")[1]),{method:"Get"}
    ).then((e)=>{
        return e.json()
    }).then((weather)=>{
        today=weather[Number(localStorage.getItem("weather").split(",")[1])][0]
        tommrow=weather[Number(localStorage.getItem("weather").split(",")[1])][1]
        today=JSON.parse(JSON.stringify(today))
        tommrow=JSON.parse(JSON.stringify(tommrow))
        console.log(today)
        console.log(tommrow)
        const dge=id=>document.getElementById(id)
        //天気の表示
        let weather_img_arr=["晴","曇","雨","雪"]
        let img_str=""
        weather_img_arr.map((value)=>{
            if(today.forecast.indexOf(value)!==-1){
                img_str+=value
            }
        })
        console.log(img_str)
        let dir=document.getElementById("wetdl_for")
        dir.innerHTML=""
        let code="<img src='./InT/天気/"+img_str+".png' class='we_img'>"
        dir.insertAdjacentHTML("beforeend",code)

        img_str=""
        weather_img_arr.map((value)=>{
            if(tommrow.forecast.indexOf(value)!==-1){
                img_str+=value
            }
        })
        console.log(img_str)
        dir=document.getElementById("wetml_for")
        dir.innerHTML=""
        code="<img src='./InT/天気/"+img_str+".png' class='we_img'>"
        dir.insertAdjacentHTML("beforeend",code)

        //日にちや情報の表示
        dge("wt_title").innerHTML=localStorage.getItem("weather").split(",")[0]+"の天気"
        dge("wetdl_date").innerHTML=today.date
        dge("wetdr_wave").innerHTML=today.waves.replace(/メートル/g,"m").replace(/．/g,".").replace(/\s+/g,'')
        dge("wetdr_temp").innerHTML=today.maxtemp+"度"
        //明日
        dge("wetml_date").innerHTML=tommrow.date
        dge("wetmr_wave").innerHTML=tommrow.waves.replace(/メートル/g,"m").replace(/．/g,'.').replace(/\s+/g,'')
        dge("wetmr_temp").innerHTML=tommrow.maxtemp+"度"
    })
}


function move_clock(){
    const dge=id=>document.getElementById(id)
    const cl=()=>{
        let now=new Date();
        dge("clock_ymd").innerHTML="令和"+(now.getFullYear()-2018)+"年"+(now.getMonth()+1)+"月"+now.getDate()+"日"
        dge("clock_hm").innerHTML=("00"+now.getHours()).slice(-2)+":"+("00"+now.getMinutes()).slice(-2)
    }
    const timer=setInterval(cl,100)
}

function make_osuw(){
    let pword=["東広島市　観光名所","東京タワー","名古屋　観光","佐賀　とは","呉","日比谷公園","蝦夷地　英語","JavaScript fetchメソッド","tinyurl","Google CEO","敵対的生成ネットワーク","スマホ　おすすめ","Inforde","線形代数","フォルクスワーゲン","スターリングラードの戦い","アルベルト・シュペーア","クラシック　おすすめ","美空ひばり","お祭りマンボ","川の流れのように","真っ赤な太陽","裏町酒場","瀬戸の花嫁","Opera","Internet Explorlor","小学３年生","三次市","三次市　ブドウ","大崎上島町　安芸津","70年代　洋楽","CSS入門","HTML入門","Python入門","JavaScript入門","Java入門","C++入門","Ruby入門","人間　定義","JR西日本","JR東日本","JR北海道","JR四国","JR九州","台風情報","大雨情報","地震情報","防災の日","台風　備え","youtube","yahoo 知恵袋","yandex","netscape navigator","法律","法律のできるラーメン店","煩雑","スリジャヤワルダナプラコッテ","日本一","登山情報","登山　初心者","かば焼き","イギリス国歌","Big in Japan","心霊スポット","ホットコーヒー","東広島　お好み焼き","Google SEO","マツダ","高屋　団地","高見ヶ丘","コマンドプロンプト","レジストリエディタ","Chrome OS flex","android 最高","美祢線","焼き芋","無料　OS","PC　壊した","会社　首","始末書　書き方","ミス　会社","ベルリンの壁","47todouhukenn","第二のIE","Safari","GAFAM","GAFA","教育的コンテンツ","デザイン変更","ラジオ","ラジオ　おすすめ","Androidタブレット　おすすめ","Toshiba ラジオ","広島FM","NHK第一","Infordeとは","びっくらドンキー","日本一田舎","秘境駅","Googleトレンド","Google Search Condole","Googleアナリティクス","Adobe 代替アプリ","文字コード","門司港","門司港レトロ","門司港駅","稚内","ドキドキ！わっかない！","Inforde GAME","サイトデザイン　コツ","Inforde ユーザー少ない","ユーザーほとんど自分","地震　備え","避難所　近く","防災アプリ","火災保険","首都直下型地震","南海トラフ地震","南海リゾート","沖縄","高知","金沢","静岡","広島","島根","岡山","宮崎","鹿児島","心理","真理","DOS　扱い方","転職　情報"]
    for(let i=0;i<5;i++){
        let word=pword[Math.floor(Math.random()*pword.length)]
        dir=document.getElementById("osu_word")
        code="<a href='javascript:window.open(\"https://www.google.com/search?q="+word+"\",\"_blank\")'>"+word+"</a><br>"
        dir.insertAdjacentHTML("beforeend",code)
    }
}


function browser(){
    const agent = window.navigator.userAgent.toLowerCase()

    if (agent.indexOf("msie") != -1 || agent.indexOf("trident") != -1) {
    console.log("ブラウザはInternet Explorerです。")
    alert("Inter Explorerには対応していません。今すぐ別のブラウザに変えてください。おすすめはOperaです。")
    } else if (agent.indexOf("edg") != -1 || agent.indexOf("edge") != -1) {
    console.log("ブラウザはEdgeです。")
    } else if (agent.indexOf("opr") != -1 || agent.indexOf("opera") != -1) {
    console.log("ブラウザはOperaです。")
    } else if (agent.indexOf("chrome") != -1) {
    console.log("ブラウザはChromeです。")
    } else if (agent.indexOf("safari") != -1) {
    console.log("ブラウザはSafariです。")
    } else if (agent.indexOf("firefox") != -1) {
    console.log("ブラウザはFireFoxです。")
    } else if (agent.indexOf("opr") != -1 || agent.indexOf("opera") != -1) {
    console.log("ブラウザはOperaです。")
    }
}


function make_mySite(){
    let site_arr=localStorage.getItem("mySite").split("<||>")
    let new_sitearr=site_arr.map((value)=>{
        return value.split("$")
    })
    console.log(new_sitearr)
    let dir=document.getElementById("mid_mysite")
    dir.innerHTML="<div id='mid_myedi'><a href='javascript:edita()'>編集</a></div>"
    new_sitearr.map((value,index)=>{
        let code='<div class="mimy_div" onclick="window.open(\''+value[1]+'\',\'_blank\')" id="mimy_div_'+index+'"><img src="'+value[2]+'" class="mimy_img"><p class="mimy_p">'+value[0]+'</p></div>'
        dir.insertAdjacentHTML("beforeend",code)
    })
    let t_code='<div id="mimy_add" class="mimy_div" onclick="make_new()"><img src="./InT/plus.png" class="mimy_img"></img><p class="mimy_p">サイトを追加</p></div>'
    dir.insertAdjacentHTML("beforeend",t_code)

}

function make_new(){
    const dg=id=>document.getElementById(id)
    dg("fill").style.display='block'
    dg("message_div").style.display='block'
    dg("message").innerHTML="<p class='mes_title'>サイトを追加</p><p class='mes_onep'>名前を入力</p><input class='mes_input'><p class='mes_onep'>urlを入力</p><input class='mes_input'><p class='mes_onep'>画像のurlを入力</p><input class='mes_input'><br><br><input type='button' value='キャンセル' class='button_two' onclick='mes_behind()'><input type='button' value='決定' class='button_one' onclick='mes_ag()'>"
}

function mes_behind(){
    const dg=id=>document.getElementById(id)
    dg("fill").style.display='none'
    dg("message_div").style.display='none'
}

function mes_ag(){
    const dg=id=>document.getElementById(id)
    let value_inp=""
    let el_HTMLcoll=document.getElementsByClassName('mes_input')
    Array.from(el_HTMLcoll).map((value,index)=>{
        if(index==2){
            if(value.value==''){
                value_inp+="div"
            }
            else{
                value_inp+=value.value
            }
        }
        else{
            value_inp+=value.value+"$"
        }
    })
    console.log(value_inp)
    localStorage.setItem("mySite",localStorage.getItem("mySite")+"<||>"+value_inp)
    dg("fill").style.display='none'
    dg("message_div").style.display='none'
    dg("mid_mysite").innerHTML=""
    make_mySite()
}


//ニュースフィード
function news(){
    fetch("https://www.nhk.or.jp/rss/news/cat0.xml",{"method":"GET"}).then((value)=>{
        return value.text()
    }).then(data=>news_ana(data))
}
function news_ana(val){
    const parser=new DOMParser()
    let d_p=parser.parseFromString(val,"text/xml")
    let item=d_p.documentElement.getElementsByTagName('item')

    let news_arr=[]
    for(let i=0;i<item.length;i++){
        let title=item[i].getElementsByTagName('title')[0].textContent
        let link=item[i].getElementsByTagName('link')[0].textContent
        let new_val=item[i].getElementsByTagName("description")[0].textContent
        news_arr[i]=[title,link,new_val]
    }
    console.log(news_arr)

    let news_i=0
    const news_func=function(){
        let now_arr=news_arr[news_i]
        dir=document.getElementById("ne_field")
        code="<p class='ne_title'>"+now_arr[0]+"</p><p class='ne_body'>"+now_arr[2].substring(0,100)+"..."+'<p>'
        dir.innerHTML=""
        dir.insertAdjacentHTML("beforeend",code)
        document.getElementById("news").setAttribute('onclick',"window.open('"+now_arr[1]+"','_blank')")
        news_i++
        if(news_i==news_arr.length){
            news_i=0
        }
    }
    news_func()
    const news_timer=setInterval(news_func,10000)
}

function change_wepo(){
    const dg=id=>document.getElementById(id)
    dg("fill").style.display='block'
    dg("message_div").style.display='block'
    dg("message").innerHTML="<p class='mes_title'>天気の地点を変更</p><a href='javascript:get_position()'>現在地を取得<a><p>または</p><select name='posi' id='menu_sel'><option value='304'>現在地を選択</option><option value='304'>釧路</option><option value='302'>旭川</option><option value='306'>札幌</option><option value='308'>青森</option><option value='309'>秋田</option><option value='312'>仙台</option><option value='323'>新潟</option><option value='325'>金沢</option><option value='319'>東京</option><option value='316'>宇都宮</option><option value='322'>長野</option><option value='329'>名古屋</option><option value='331'>大阪</option><option value='341'>高松</option><option value='337'>松江</option><option value='338'>広島</option><option value='344'>高知</option><option value='346'>福岡</option><option value='352'>鹿児島</option><option value='352'>奄美</option><option value='353'>那覇</option><option value='356'>石垣</option></select><br><br><br><input type='button' value='キャンセル' class='button_two' onclick='mes_behind()'><input type='button' value='決定' class='button_one' onclick='set_butwe()'>"
}

//現在地から
function get_position(){
    navigator.geolocation.getCurrentPosition(get_positwo);
}

let posi_ik_arr=[[42.990674,144.381284,"釧路",304],[43.762689,142.358646,"旭川",302],[43.068392,141.350589,"札幌",306],[40.822357,140.747314,"青森",308],[39.719929,140.102509,"秋田",309],[38.268009,140.869614,"仙台",312],[37.916126,37.916126,"新潟",323],[36.561050,136.656631,"金沢",325],[35.694004,139.753632,"東京",319],[36.555115,139.882736,"宇都宮",316],[36.648632,138.194290,"長野市",322],[35.181435,136.906418,"名古屋",329],[34.693890,135.502045,"大阪",331],[34.342793,134.046570,"高松",341],[35.468040,133.048523,"松江",337],[34.385254,132.455338,"広島",338],[33.558788,133.531158,"高知",334],[33.590313,130.401733,"福岡",346],[31.596788,130.557343,"鹿児島",352],[28.377274,129.493774,"奄美",352],[26.212296,127.679214,"那覇",353],[24.340666,124.155540,"石垣",356]]
function get_positwo(position){
    let ido=position.coords.latitude
    let kei=position.coords.longitude
    let far_arr=posi_ik_arr.map((value)=>{
        return Math.sqrt((value[0]-ido)**2+(value[1]-kei)**2)
    })
    console.log(far_arr)
    let min=Math.min.apply(null,far_arr)
    console.log(far_arr.indexOf(min))
    let code_min=[posi_ik_arr[far_arr.indexOf(min)][2],posi_ik_arr[far_arr.indexOf(min)][3]]
    console.log(code_min)
    localStorage.setItem("weather",code_min)
    const dg=id=>document.getElementById(id)
    dg("fill").style.display='none'
    dg("message_div").style.display='none'
    get_weather()
}

//ドロップダウンメニューから
function set_butwe(){
    let code_set_num=document.getElementById("menu_sel").value
    let link_val=""
    posi_ik_arr.map((value)=>{
        if(code_set_num==value[3]){
            link_val=value[2]
        }
    })
    let code_set=[link_val,code_set_num]
    console.log(code_set)
    localStorage.setItem("weather",code_set)
    const dg=id=>document.getElementById(id)
    dg("fill").style.display='none'
    dg("message_div").style.display='none'
    get_weather()
}


//自分のサイトを編集
function edita(){
    const dg=id=>document.getElementById(id)
    dg("fill").style.display='block'
    dg("message_div").style.display='block'
    dg("message").innerHTML="<p class='mes_title'>並べ替えまたは削除</p><ul id='drag_list'></ul><input type='button' value='キャンセル' class='button_two' onclick='mes_behind()'><input type='button' value='決定' class='button_one' onclick='edi_ok()'>"
    let dir=document.getElementById("drag_list")
    let mysite_arr=localStorage.getItem("mySite").split("<||>")
    mysite_arr.map((value,index)=>{
        let val=value.split("$")
        let code="<li id='dl_"+index+"' draggable='true'><input type='button' class='death_li' value='削除' onclick='bobo_li("+index+")'><span class='right_body'>"+val[0]+"</span></li>"
        dir.insertAdjacentHTML("beforeend",code)
    })

    document.querySelectorAll('#drag_list li').forEach (element => {
        element.ondragstart = function () {
          event.dataTransfer.setData('text/plain', event.target.id);
        };
        
        element.ondragover = function () {
          event.preventDefault();
          this.style.borderTop = '3px solid';
        };
    
    element.ondragleave = function () {
    this.style.borderTop = "";
    };
    
        element.ondrop = function () {
          event.preventDefault();
          let id = event.dataTransfer.getData('text');
          let element_drag = document.getElementById(id);
          this.parentNode.insertBefore(element_drag, this);
          this.style.borderTop = '';
        };
      });
}

function edi_ok(){
    let child=document.getElementById("drag_list").children
    let order_arr=[]
    for(let i=0;i<child.length;i++){
        order_arr.push(child[i].outerText)
    }
    let new_mySite_arr=[]
    let mySI_data=localStorage.getItem("mySite").split('<||>')
    order_arr.map((value)=>{
        mySI_data.map((mySite_str)=>{
            let mySite=mySite_str.split("$")
            if(mySite[0]==value){
                new_mySite_arr.push(mySite_str)
            }
        })
    })
    let new_mySite_str=""
    new_mySite_arr.map((value,index)=>{
        if(index==0){
            new_mySite_str+=value
        }
        else{
            new_mySite_str+=("<||>"+value)
        }
    })
    console.log(new_mySite_str)
    localStorage.setItem("mySite",new_mySite_str)
    const dg=id=>document.getElementById(id)
    dg("fill").style.display='none'
    dg("message_div").style.display='none'
    make_mySite()
}
//liを消す
function bobo_li(num){
    document.getElementById("dl_"+num).remove()
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
    if(val!=="black"){
        osu_arr.map((value)=>{
            value.style.color="black"
        })
        class_arr.map((value)=>{
            value.style.color="black"
        })
    }
    else{
        inte_arr.map((value)=>{
            value.style.color="white"
        })
    }
    if(val=="green_white"){
        class_arr.map((value)=>{
            value.style.backgroundColor="rgb(233, 252, 233)"
        })
    }
    else if(val=="blue_white"){
        class_arr.map((value)=>{
            value.style.backgroundColor="rgb(230, 230, 255)"
        })
    }
    else if(val=="red_white"){
        class_arr.map((value)=>{
            value.style.backgroundColor="rgb(255, 221, 221)"
        })
    }
}