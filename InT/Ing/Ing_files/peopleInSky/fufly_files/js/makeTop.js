//created by Inforde GAME
//トップ画面の生成

const city_arr=["広島","沖縄","上海","ソウル","北京","モスクワ","ハワイ","パリ","オスロ","ヘルシンキ","カイロ","ニューヨーク","シカゴ","ケープタウン","平壌","佐渡"]

window.addEventListener('load',make_city)

function make_city(){
    city_arr.map(value=>{
        const home=document.createElement("div")
        home.classList.add("one_city")
        const imgTag=document.createElement("img")
        imgTag.setAttribute("src","./fufly_files/image/cityTop/"+value+".webp")
        imgTag.setAttribute('alt',value+'の画像')
        imgTag.setAttribute('height',"150")
        const pTag=document.createElement('p')
        pTag.textContent=value
        const out_div=document.createElement('div')
        out_div.classList.add("center_div")
        out_div.appendChild(pTag)
        home.appendChild(out_div)
        home.appendChild(imgTag)
        document.getElementById('select').appendChild(home)
        home.addEventListener('click',()=>{
            document.getElementById('title_menu_hun').classList.add('hide')
            document.getElementById('pan_list').style.display='none'
            document.getElementById('top').style.display='none'
            document.getElementById('game').style.display='block'
            start(value,city_arr.indexOf(value))
        })
    })
}