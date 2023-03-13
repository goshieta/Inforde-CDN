window.addEventListener('load',()=>{
    let lev=document.getElementById('lev_form').lev_flash.value
    document.getElementById('lev_app').innerHTML='レベル'+lev
    document.getElementById('lev_form').addEventListener('change',()=>{
        let lev=document.getElementById('lev_form').lev_flash.value
        document.getElementById('lev_app').innerHTML='レベル'+lev
    })
})

//スタートボタンが押されたとき
function start(){
    document.getElementById('top').style.display='none'
    document.getElementById('game').style.display='block'
    document.getElementById('pan_list').style.display='none'
    document.getElementById('linkArea').style.display='none'
    document.body.style.backgroundColor='black'
    main()
}

let problem_and_answer=[]

const one_session=class{
    constructor(disit,sec,num,i){
        this.disit=disit
        this.sec=sec
        this.num=num
        this.i=i
        this.num_arr=[]
        this.answer=this.answer.bind(this)
    }
    game_start(){
        let main_str=document.getElementById('main_str')
        main_str.innerHTML='第'+this.i+'問'
        for(let l=0;l<this.num;l++){
            let min=10**this.disit/10
            let max=10**this.disit-1
            let num=Math.floor(Math.random()*(max+1-min)+min)
            //同じ数が二連続で出るのを防止
            while(num==this.num_arr[this.num_arr.length-1]){
                num=Math.floor(Math.random()*(max+1-min)+min)
            }
            this.num_arr.push(num)
        }
        let one_s=this.sec/this.num
        let nl=0
        let num_arr=this.num_arr
        setTimeout(()=>{
            const one_show_num=function(){
                main_str.innerHTML=num_arr[nl]
                nl++
                if(nl>=num_arr.length){
                    clearInterval(osn_timer)
                    setTimeout(()=>{
                        document.getElementById('main_str').style.display='none'
                        document.getElementById('input_answer').style.display='block'
                        document.getElementById('answer').focus()
                    },one_s*1000)
                }
            }
            const osn_timer=setInterval(one_show_num,one_s*1000)
            one_show_num()
        },1000)
    }
    answer(){
        document.getElementById('answer_button').removeEventListener('click',this.answer)
        let answer=Number(document.getElementById('answer').value)
        document.getElementById('answer').value=''
        let total=this.num_arr.reduce((sum,elem)=>{
            return sum+elem
        },0)
        problem_and_answer.push([this.num_arr,answer,total,total==answer])
        if(i_game>=5){
            show_answer()
        }
        else{
            document.getElementById('input_answer').style.display='none'
            document.getElementById('main_str').style.display='block'
            i_game++
            main()
        }
    }
}

let i_game=1
//ゲームのメイン
function main(){
    let level=Number(document.getElementById('lev_form').lev_flash.value)
    let lev_arr=[[1,5,10],[1,5,5],[1,5,4],[1,5,3],[1,10,5],[2,5,10],[2,5,5],[2,10,10],[2,10,8],[2,10,5],[3,5,10],[3,5,5],[3,5,3],[3,10,8],[3,10,5],[3,20,8],[3,20,5],[3,20,2],[4,20,10],[5,30,5]]
    const ok=new one_session(lev_arr[level-1][0],lev_arr[level-1][2],lev_arr[level-1][1],i_game)
    ok.game_start()
    document.getElementById('answer_button').addEventListener('click',ok.answer)
}

//答え合わせ
function show_answer(){
    document.body.style.backgroundColor='antiquewhite'
    document.getElementById('game').style.display='none'
    document.getElementById('answer_show').style.display='block'
    let dir=document.getElementById('answer_center')
    for(let i=0;i<5;i++){
        //親となる要素を作成
        let new_elem=document.createElement('div')
        new_elem.setAttribute('id','answer_one'+i)
        new_elem.setAttribute('class','answer_one')
        //問題表示の枠組み
        let ne_prob=document.createElement('div')
        ne_prob.setAttribute('class','poroblem_div')
        //問題のpタグ
        for(let l=0;l<problem_and_answer[i][0].length;l++){
            let p_prob=document.createElement('p')
            p_prob.innerHTML=problem_and_answer[i][0][l]
            ne_prob.appendChild(p_prob)
        }
        //答えの枠組み
        let ne_ans=document.createElement('div')
        ne_ans.setAttribute('class','answer_mt')
        //答えのpタグ
        let neap_m=document.createElement('p')
        neap_m.setAttribute('class','answer_my')
        neap_m.innerHTML=problem_and_answer[i][1]
        let neap_t=document.createElement('p')
        neap_t.setAttribute('class','answer_true')
        neap_t.innerHTML=problem_and_answer[i][2]
        neap_t.style.visibility='hidden'
        ne_ans.appendChild(neap_m)
        ne_ans.appendChild(neap_t)
        //appendChild
        new_elem.appendChild(ne_prob)
        new_elem.appendChild(ne_ans)
        dir.appendChild(new_elem)
    }
    //正解か不正解か順に表示
    const answer_mt_list=document.querySelectorAll('.answer_mt')
    const answer_true_list=document.querySelectorAll('.answer_true')
    let i=0
    const one_session_show_tf=()=>{
        let os_tf=problem_and_answer[i][3]
        if(os_tf){
            answer_mt_list[i].style.backgroundColor="rgb(255, 82, 59)"
        }
        else{
            answer_mt_list[i].style.backgroundColor="rgb(0, 89, 253)"
        }
        answer_true_list[i].style.visibility='visible'
        i++
        if(i==5){
            clearInterval(osstf_timer)
        }
    }
    const osstf_timer=setInterval(one_session_show_tf,1000)
}

//結果表示
function show_your_lank(){
    document.getElementById('answer_show').style.display='none'
    document.getElementById('your_lank').style.display='block'
    let level=Number(document.getElementById('lev_form').lev_flash.value)
    document.getElementById('yl_lev').innerHTML='レベル'+level
    let true_num=0
    for(let i=0;i<5;i++){
        let tf=problem_and_answer[i][3]
        if(tf){
            true_num++
        }
    }
    if(true_num<4){
        //不合格
        document.getElementById('yl_p').innerHTML='不合格'
    }
    else{
        //合格
        document.getElementById('yl_p').innerHTML='合格'
    }
}

//終了
function goTop(){
    document.getElementById('your_lank').style.display='none'
    document.getElementById('top').style.display='block'
    problem_and_answer=[]
    i_game=1
    document.getElementById('answer_center').innerHTML=""
    document.getElementById('input_answer').style.display='none'
    document.getElementById('main_str').style.display='block'
    document.getElementById('linkArea').style.display='block'
}