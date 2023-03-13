'use strict'

changeScreen(1)
waveButtonEff()

//ボタンのエフェクト
function waveButtonEff(){
    const waveSession=(e)=>{
        let target=e.currentTarget
        let waveElem=document.createElement('div')
        waveElem.classList.add('wave_content')
        let result=target.getBoundingClientRect()
        let topLeftList=[Math.floor(e.pageY-result.top),Math.floor(e.pageX-result.left)]
        waveElem.setAttribute("style",`top:${topLeftList[0]}px;left:${topLeftList[1]}px;`)
        target.appendChild(waveElem)
    }
    Array.from(document.getElementsByClassName('wave_button')).forEach(elem=>{
        elem.addEventListener("click",waveSession)
    })
}

//画面の切り替え
function changeScreen(num){
    const elemList=document.querySelectorAll('.hm_item')
    elemList.forEach(elem=>{
        elem.classList.remove('hmOn')
    })
    elemList[num].classList.add('hmOn')
    document.querySelectorAll('#contents > div').forEach((val,index)=>{
        val.style.display="none"
        if(index==num){
            val.style.display='block'
        }
    })
}