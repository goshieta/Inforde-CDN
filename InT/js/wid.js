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
    //none
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