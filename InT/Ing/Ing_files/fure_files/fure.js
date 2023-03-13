window.onload=function(){
    document.getElementById('contert_start_button').addEventListener('click',start)
}

function start(){
    document.getElementById('contert_start_button').removeEventListener('click',start)
    document.getElementById('contert_start_button').value='このボタンか1キーを押します'
    document.getElementById('content_title').style.display='none'
    document.getElementById('progress').style.display='block'
    document.getElementById('main_p').innerHTML='3'
    let i=2
    const timer_stc=()=>{
        document.getElementById('main_p').innerHTML=i
        i--
        if(i==-1){
            document.getElementById('main_p').innerHTML='スタート'
            clearInterval(timer_stc_in)
            setTimeout(()=>{
                count()
                progress()
            },1000)
        }
    }
    let timer_stc_in=setInterval(timer_stc,1000)
}

let i_count=0
const count_up=(e)=>{
    if(e.key!=='1'&&e.currentTarget!==document.getElementById('contert_start_button')){
        return
    }
    console.log(e.currentTarget)
    i_count++
    document.getElementById('main_p').innerHTML=i_count
}

function count(){
    document.getElementById('main_p').innerHTML=i_count
    document.getElementById('contert_start_button').addEventListener('click',count_up)
    document.addEventListener('keyup',count_up)
}
function progress(){
    let i=100
    const one_prog=()=>{
        document.getElementById('progress').style.width=i+'%'
        i--
        if(i==0){
            clearInterval(timer_op)
            shut()
        }
    }
    let timer_op=setInterval(one_prog,50)
}

function shut(){
    //終了
    const dg=id=>document.getElementById(id)
    dg('progress').style.display='none'
    dg('contert_start_button').removeEventListener('click',count_up)
    document.removeEventListener('keyup',count_up)
    dg('main_p').style.fontSize='50px'
    dg('contert_start_button').value='トップに戻る'
    const shut_new=()=>{
        dg('content_title').style.display='block'
        dg('main_p').style.fontSize='30px'
        dg('main_p').innerHTML=''
        dg('contert_start_button').value='スタート'
        dg('contert_start_button').removeEventListener('click',shut_new)
        dg('contert_start_button').addEventListener('click',start)
        dg('progress').style.width='100%'
        i_count=0
    }
    dg('contert_start_button').addEventListener('click',shut_new)
}