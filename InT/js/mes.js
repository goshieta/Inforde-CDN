function mes_behind(){
    const dg=id=>document.getElementById(id)
    Array.from(document.getElementsByClassName('mes_div')).map(value=>value.style.display='none')
    dg("fill").style.display='none'
    dg("message_div").style.display='none'
}

function mes_ag(){
    const dg=id=>document.getElementById(id)
    Array.from(document.getElementsByClassName('mes_div')).map(value=>value.style.display='none')
    let value_inp=""
    console.log(document.getElementById('mes_pre_p').innerHTML)
    value_inp+=document.getElementById('mes_pre_p').innerHTML+'$'
    value_inp+=document.getElementById('mes_ssurl').value+'$'
    value_inp+=document.getElementById('mes_pre_img').src
    console.log(value_inp)
    localStorage.setItem("mySite",localStorage.getItem("mySite")+"<||>"+value_inp)
    Array.from(document.getElementsByClassName('mes_input')).map(value=>{
        value.value=''
    })
    Array.from(document.getElementsByClassName('preview_right')).map(value=>value.removeEventListener('keyup',set_preview_from_in))
    dg('mes_ssurl').removeEventListener('keyup',set_preview)
    dg('mes_pre_img').src=''
    dg('mes_pre_p').innerHTML=''
    dg('mes_am_pre').style.display='none'
    dg("fill").style.display='none'
    dg("message_div").style.display='none'
    make_mySite()
}