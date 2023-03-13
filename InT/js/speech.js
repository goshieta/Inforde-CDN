//音声入力機能
const recognition = new webkitSpeechRecognition();
recognition.lang = "ja-JP";
//音声結果
recognition.onresult = (event) => {
    if (event.results.length > 0) {
        const res = event.results[0][0].transcript;
        document.getElementById('midf_form').value=res
    }
}
//入力の経過を表示
recognition.interimResults = true;
//入力が終了したと判断されたら
recognition.onsoundend=()=>{
    document.getElementById('mic_icon').classList.remove('speaking')
    search(null)
}
//エラー
recognition.onerror=()=>{
    alert('音声認識でエラーが発生しました。ブラウザが音声認識に対応していないか、ネットワーク回線またはサーバーの問題の可能性があります。')
    recognition.stop()
    document.getElementById('mic_icon').classList.remove('speaking')
}

const stopAudio=new Audio('https://soundeffect-lab.info/sound/button/mp3/decision40.mp3')

//マイクボタンが押されたとき
function onspeak(){
    if(document.getElementById('mic_icon').classList.contains('speaking')){
        //入力を終了
        recognition.stop()
        document.getElementById('mic_icon').classList.remove('speaking')
        stopAudio.play()
    }
    else{
        //ブラウザが対応しているかどうか
        if(window.SpeechRecognition || window.webkitSpeechRecognition==undefined){
            alert('お使いのブラウザは音声入力に対応していません')
            return
        }
        //入力を開始
        recognition.start()
        document.getElementById('mic_icon').classList.add('speaking')
    }
}