window.addEventListener('load',()=>{
    my_wid()
})

function my_wid(){
    //背景の色に応じて、塗り方を変える
    let local_widb=localStorage.getItem('wid_back')
    if(local_widb=='rgba(255,255,255,0)_rgba(255,255,255,0)'||local_widb=='white_white'){
        Array.from(document.getElementsByClassName('mimy_img_div')).map((value)=>{
            value.style.backgroundColor='rgb(228, 228, 228)'
        })
    }
}


function make_mySite(){
    let site_arr=localStorage.getItem("mySite").split("<||>")
    let new_sitearr=site_arr.map((value)=>{
        return value.split("$")
    })
    let dir=document.getElementById("mid_myedi")
    dir.innerHTML=''
    new_sitearr.map((value,index)=>{
        if(value[0].length>12){
            value[0]=value[0].substring(0,12)+'…'
        }
        let code='<div class="mimy_div" onclick="window.open(\''+value[1]+'\',\'_blank\')" id="mimy_div_'+index+'"><div class="mimy_img_div"><div><img src="'+value[2]+'" class="mimy_img"></div></div><p class="mimy_p">'+value[0]+'</p></div>'
        dir.insertAdjacentHTML("beforeend",code)
    })
    let t_code='<div id="mimy_add" class="mimy_div" onclick="make_new()"><div class="mimy_img_div"><div><img src="./InT/plus.png" class="mimy_img"></div></div><p class="mimy_p">サイト追加</p></div>'
    dir.insertAdjacentHTML("beforeend",t_code)
}
function make_new(){
    const dg=id=>document.getElementById(id)
    dg("fill").style.display='block'
    dg("message_div").style.display='block'
    dg('mes_addms').style.display='block'
    dg('mes_ssurl').addEventListener('keyup',set_preview)
    Array.from(document.getElementsByClassName('preview_right')).map(value=>value.addEventListener('keyup',set_preview_from_in))
}
function set_preview_from_in(e){
    if(e.currentTarget.placeholder=="サイト名を入力"){
        document.getElementById('mes_pre_p').innerHTML=e.currentTarget.value
    }
    else{
        document.getElementById('mes_pre_img').src=e.currentTarget.value
    }
}
function set_preview(){
    const dg=id=>document.getElementById(id)
    let word=dg('mes_ssurl').value
    dg('mes_pre_img').src="http://favicon.hatena.ne.jp/?url="+word
    dg('mes_am_pre').style.display='flex'
    let hostname
    if(word.indexOf('://')>-1){
        hostname=word.split('/')[2]
    }
    else{
        hostname=word.split('/')[0]
    }
    let hostsplit=hostname.split('.')
    let arrLen = hostsplit.length;

    if (arrLen > 2) {
        hostname = hostsplit[arrLen - 2] + '.' + hostsplit[arrLen - 1];
        //check to see if it's using a Country Code Top Level Domein (ccTLD) (i.e. ".me.uk")
        // 二文字のドメインがないことを利用して、co.jpとかを判定している
        if (hostsplit[arrLen - 1].length == 2 && hostsplit[arrLen - 1].length == 2) {
            //this is using a ccTLD
            hostname = hostsplit[arrLen - 3] + '.' + hostname;
        }
    }
    dg('mes_pre_p').innerHTML=hostname
    dg('accept_mab').style.display='inline-block'
}


//自分のサイトを編集
function edita(){
    const dg=id=>document.getElementById(id)
    dg("fill").style.display='block'
    dg("message_div").style.display='block'
    dg('mes_edims').style.display='block'
    let dir=document.getElementById("drag_list")
    dir.innerHTML=''
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
    Array.from(document.getElementsByClassName('mes_div')).map(value=>value.style.display='none')
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