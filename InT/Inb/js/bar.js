window.addEventListener('load',()=>{
    console.warn('これは開発者向けの機能です。悪用しないでください。')
    //今日の運勢
    const luck_arr=["超大凶","大大凶","大凶","凶","小凶","極小凶","極小吉","小吉","吉","大吉","大大吉","超大吉","超巨大吉"]
    document.getElementById('luck_body').innerHTML=luck_arr[Math.floor(Math.random()*(luck_arr.length))]
    const luck_item_arr=["傘","人形","赤のボールペン","シャーペン","雪玉","日本酒","軽自動車","竹ものさし","リンゴ","鉛筆","鉛筆削り","鮭","鯖","鮎","サンマ","鰆","USB","ラジオ","androidタブレット","手帳","カレンダー","アナログ時計","単２電池","織田信長の肖像画","漢字辞典","英語の本","CD","フロッピーディスク","MD","レーザーディスク","古墳","30年以上前の本","液体のり","ベトナムの物","筆","丸太","竹"]
    document.getElementById('lui_body').innerHTML=luck_item_arr[Math.floor(Math.random()*(luck_item_arr.length))]
})