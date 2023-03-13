function start(){
    const dg=id=>document.getElementById(id)
    dg('game').style.display='block'
    dg('top').style.display='none'
    if(localStorage.getItem('story_num_fuoto')==null){
        localStorage.setItem('story_num_fuoto',0)
    }
    main(Number(localStorage.getItem('story_num_fuoto')),0)
}

//書き方テンプレート
/*
----------------文字の表示--------------
['str',['名前','内容']]
----------------背景の変更--------------
['back','URL']
----------------画像を表示--------------
['simg','URL']
----------------画像を隠す--------------
['himg']
----------------選択肢を作成------------
['sen',['名前','質問内容',[['選択肢1','場面番号'],['選択肢2','場面番号'],['選択肢3','場面番号']]]]
----------------ゲームオーバー----------
['over','死因']
---------------ゲームクリア-------------
['clear','メッセージ']

*/
let story=[[['back','https://3.bp.blogspot.com/-byc_BYtugBk/WwJZgdhY6SI/AAAAAAABMFc/ShBEMxM6pno4HoWFqGn9KOK4thEUYEWZACLcBGAs/s600/bg_snow_jutaku.jpg'],['str',['私','私、沖縄太郎、高校３年生。北海道立稚内漁業高校に通っているんだ。明日は３学期初めの日。久しぶりだけど大丈夫かな。']],['str',['私','やば～い。寝坊しちゃった。いっけな～い遅刻☆遅刻☆']],['str',['私','ドンっ']],['str',['私','あっいたた～']],['simg','https://4.bp.blogspot.com/-o6biv4_Vo8M/UYzXI5Qpx-I/AAAAAAAAR4w/ltwJs8wOMTA/s400/christmas_snowman.png'],['str',['私','なんだ。雪だるまか。']],['sen',['私','雪だるまをどうしますか？',[['一発殴る',1],['カツアゲをする',2],['ストーブをもってきて溶かす',3]]]]],
[['simg','https://4.bp.blogspot.com/-o6biv4_Vo8M/UYzXI5Qpx-I/AAAAAAAAR4w/ltwJs8wOMTA/s400/christmas_snowman.png'],['back','https://3.bp.blogspot.com/-byc_BYtugBk/WwJZgdhY6SI/AAAAAAABMFc/ShBEMxM6pno4HoWFqGn9KOK4thEUYEWZACLcBGAs/s600/bg_snow_jutaku.jpg'],['str',['私','おらっ。ふざけんなよ！']],['over','雪だるまの中にあった爆弾に気づかずに死んだ']],
[['simg','https://4.bp.blogspot.com/-o6biv4_Vo8M/UYzXI5Qpx-I/AAAAAAAAR4w/ltwJs8wOMTA/s400/christmas_snowman.png'],['back','https://3.bp.blogspot.com/-byc_BYtugBk/WwJZgdhY6SI/AAAAAAABMFc/ShBEMxM6pno4HoWFqGn9KOK4thEUYEWZACLcBGAs/s600/bg_snow_jutaku.jpg'],['str',['私','おどりゃ！金出せ金！どかっ']],['str',['私','嘘だろっ。頭の中から３０００万円出てきた。']],['sen',['私','何に金を使いますか？',[['とりあえずフェラーリを買う',4],['新しく漁船を買う',5],['遠軽町に引っ越す',6]]]]],
[['simg','https://4.bp.blogspot.com/-o6biv4_Vo8M/UYzXI5Qpx-I/AAAAAAAAR4w/ltwJs8wOMTA/s400/christmas_snowman.png'],['back','https://3.bp.blogspot.com/-byc_BYtugBk/WwJZgdhY6SI/AAAAAAABMFc/ShBEMxM6pno4HoWFqGn9KOK4thEUYEWZACLcBGAs/s600/bg_snow_jutaku.jpg'],['str',['私','ストーブを買いにケーズデンキ稚内店まで行こう！']],['str',['私','やばい！遅刻したせいで7:50の便を逃した！次の便は11:48だ。']],['sen',['私','どうやって稚内まで行きますか？',[['歩き',8],['走り',7]]]]],
[['back','https://3.bp.blogspot.com/-byc_BYtugBk/WwJZgdhY6SI/AAAAAAABMFc/ShBEMxM6pno4HoWFqGn9KOK4thEUYEWZACLcBGAs/s600/bg_snow_jutaku.jpg'],['himg'],['str',['私','とりあえずフェラーリの本場イタリアまで行こう！']],['back','https://pakutaso.cdn.rabify.me/shared/img/thumb/STOCKER1202097.jpg.webp?d=1420'],['str',['me','Finalmente siamo in Italia.']],['str',['me','Nel frattempo, vorrei mangiare qualcosa.']],['str',['me','Quella pizzeria laggiù sembra buona. E anche quel negozio di formaggi laggiù sembra buono. Anche a me piacerebbe salire su quella barca...']],['over','Il gioco è finito perché il gioco non serve allo scopo del gioco in quanto ha iniziato a godersi la vita in Italia.']],
[['back','https://3.bp.blogspot.com/-byc_BYtugBk/WwJZgdhY6SI/AAAAAAABMFc/ShBEMxM6pno4HoWFqGn9KOK4thEUYEWZACLcBGAs/s600/bg_snow_jutaku.jpg'],['himg'],['str',['私','利尻島の知り合いから漁船を買おう。']],['back','https://3.bp.blogspot.com/-TLPM_fl3ooI/WQvuzQWbcNI/AAAAAAABEB8/c3H5of5Dy2wZ6T9NP5qJv35CxzuudRsSgCLcB/w1200-h630-p-k-no-nu/bg_nangoku.jpg'],['str',['私','よし船に乗るぞ']],['str',['私','やばっ間違えて礼文島行きの船に乗った。']],['over','礼文島に行ってしまった']],
[['back','https://3.bp.blogspot.com/-byc_BYtugBk/WwJZgdhY6SI/AAAAAAABMFc/ShBEMxM6pno4HoWFqGn9KOK4thEUYEWZACLcBGAs/s600/bg_snow_jutaku.jpg'],['himg'],['str',['私','遠軽に引っ越すか。']],['str',['私','とりあえずバスに乗って遠軽にいこう。']],['clear','製作者がこの先を作るのが面倒くさくなっため。']],
[['back','https://3.bp.blogspot.com/-byc_BYtugBk/WwJZgdhY6SI/AAAAAAABMFc/ShBEMxM6pno4HoWFqGn9KOK4thEUYEWZACLcBGAs/s600/bg_snow_jutaku.jpg'],['himg'],['str',['私','走っていくか。たったの１３㎞だし。']],['str',['私','ドンっ']],['str',['私','あっいたた～']],['simg','https://4.bp.blogspot.com/-o6biv4_Vo8M/UYzXI5Qpx-I/AAAAAAAAR4w/ltwJs8wOMTA/s400/christmas_snowman.png'],['str',['私','なんだ。雪だるまか。']],['over','無限ループが発生したため。']],
[['back','https://3.bp.blogspot.com/-byc_BYtugBk/WwJZgdhY6SI/AAAAAAABMFc/ShBEMxM6pno4HoWFqGn9KOK4thEUYEWZACLcBGAs/s600/bg_snow_jutaku.jpg'],['himg'],['str',['私','どうせ学校遅れること確定してるしゆっくり歩いていくか。']],['str',['私','なかなかつかないな。もう六日ぐらい歩いているよ。']],['str',['私','あれなんか前に線路がある。']],['back','https://pakutaso.cdn.rabify.me/shared/img/thumb/AMEd84s5.jpg.webp?d=1420'],['str',['私','新幹線が走ってる。間違えて函館まで来たんだ。逆方向に歩いちゃったんだ。']],['over','新幹線を見たため。']]
]

function main(num,index){
    console.log('場面:'+num+"番号:"+index)
    let nows=story[num][index]
    let key=nows[0]
    let body=nows[1]
    console.log('key:'+key+'body:'+body)
    if(key=='str'){
        //文字を表示する
        document.getElementById('font_floor').style.display='block'
        document.getElementById('font_game').innerHTML=body[1]
        document.getElementById('font_name').innerHTML=body[0]
        const next_str=(e)=>{
            if(e.key!=='Enter'&&e.currentTarget!==document.getElementById('game')){
                return
            }
            document.getElementById('font_floor').style.display='none'
            document.getElementById('font_game').innerHTML=''
            document.getElementById('font_name').innerHTML=''
            document.getElementById('game').removeEventListener('click',next_str)
            document.removeEventListener('keyup',next_str)
            main(num,index+1)
        }
        document.getElementById('game').addEventListener('click',next_str)
        document.addEventListener('keyup',next_str)
    }
    else if(key=='back'){
        //背景画像を変更
        document.getElementById('game').style.backgroundImage='url("'+body+'")'
        main(num,index+1)
    }
    else if(key=='simg'){
        //画像を表示
        document.getElementById('img_floor').style.display='block'
        document.getElementById('img_game').src=body
        main(num,index+1)
    }
    else if(key=='himg'){
        //画像を隠す
        document.getElementById('img_floor').style.display='none'
        document.getElementById('img_game').src=''
        main(num,index+1)
    }
    else if(key=='sen'){
        //選択肢で選択
        document.getElementById('font_floor').style.display='block'
        document.getElementById('font_game').innerHTML=body[1]
        document.getElementById('font_name').innerHTML=body[0]
        body[2].map((value)=>{
            let dir=document.getElementById('font_floor')
            let code='<input type="button" class="button_game_sen" value="'+value[0]+'">'
            dir.insertAdjacentHTML('beforeend',code)
        })
        let arr_button=Array.from(document.getElementsByClassName('button_game_sen'))
        const go_next=(e)=>{
            let select_number=arr_button.indexOf(e.currentTarget)
            //イベント削除
            arr_button.map((value,index)=>{
                value.removeEventListener('click',go_next)
                value.remove()
            })
            document.getElementById('font_name').innerHTML=''
            document.getElementById('font_game').innerHTML=''
            document.getElementById('font_floor').style.display='none'
            setTimeout(()=>{
                localStorage.setItem('story_num_fuoto',body[2][select_number][1])
                main(body[2][select_number][1],0)
            },100)
        }
        arr_button.map((value)=>{
            value.addEventListener('click',go_next)
        })
    }
    else if(key=='over'){
        //ゲームオーバー
        document.getElementById('game').style.backgroundImage=''
        document.getElementById('img_game').src=''
        document.getElementById('img_floor').style.display='none'
        document.getElementById('game').style.display='none'
        document.getElementById('game_over').style.display='block'
        document.getElementById('siin').innerHTML=body
        localStorage.setItem('story_num_fuoto',0)
    }
    else if(key=='clear'){
        //ゲームクリア
        document.getElementById('game').style.backgroundImage=''
        document.getElementById('img_game').src=''
        document.getElementById('img_floor').style.display='none'
        document.getElementById('game').style.display='none'
        document.getElementById('game_clear').style.display='block'
        document.getElementById('mes_clear').innerHTML=body
        localStorage.setItem('story_num_fuoto',0)
    }
}


function go_t(){
    document.getElementById('siin').innerHTML=''
    document.getElementById('game_over').style.display='none'
    document.getElementById('game_clear').style.display='none'
    document.getElementById('top').style.display='block'
}