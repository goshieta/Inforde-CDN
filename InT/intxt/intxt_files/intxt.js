window.onload=function(){
    let un=["超凶","大大凶","大凶","凶","凶（ミニ）","普通","小吉","中吉","吉","吉吉","大吉","大大吉","超吉","超巨吉","超莫大吉"]
    document.getElementById('edita').placeholder="今日の運勢は"+un[Math.floor(Math.random()*un.length)]+"。文字をここに入力"
    all_height()
    event_set()
}

//すべてのイベントを管理
function event_set(){
    window.addEventListener('resize',all_height)
    document.getElementById('edita').addEventListener('input',write_paper)
}

//紙の高さを横幅を基準にAサイズ（1:√2)に変更
function all_height(){
    let class_paper=document.getElementsByClassName('one_text')
    for(let i=0;i<class_paper.length;i++){
        class_paper[i].style.height=(class_paper[i].clientWidth)*Math.sqrt(2)+'px'
    }
}

//記述されたことを処理して紙に書く
function write_paper(){
    let script=document.getElementById('edita').value
    script=script.split(/\!|！|\)|）/)
    let soup=[]
    script.map((value,index)=>{
        let split_shuta=value.split(/\(|（/)
        let split_shut=[1,4]
        console.log(split_shut)
        soup.push(split_shut)
    })
    console.log(soup)
    let dir=document.getElementById('goshi')
    dir.innerHTML=''
    soup.map((value)=>{
        if(value.length=1){
            let code='<em>'+value+'</em>'
            dir.insertAdjacentHTML('beforeend',code)
        }
        else{
            let json_style_list={"タイトル":"font-weight:bold;"}
            let json_soup_sl=JSON.parse(JSON.stringify(json_style_list))
            let code='<em style="'+json_soup_sl[value[0]]+'">'+value[1]+'</em>'
            dir.insertAdjacentHTML('beforeend',code)
        }
    })
}