//version bata6
window.addEventListener("load", () => {
  if (localStorage.getItem("theme") == null) {
    localStorage.setItem("theme", "blue_white");
  }
  if (localStorage.getItem("engine") == null) {
    localStorage.setItem("engine", "google");
  }
  if (localStorage.getItem("mySite") == null) {
    //自分のサイト情報を入力(タイトル$URL$画像のURL<||>...)
    localStorage.setItem(
      "mySite",
      "Google map$https://maps.google.com$https://www.google.com/images/branding/product/ico/maps15_bnuw3a_32dp.ico<||>amazon$https://www.amazon.co.jp$https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg<||>Youtube$https://youtube.com$https://www.youtube.com/s/desktop/e213795e/img/favicon_144x144.png<||>Google翻訳$https://translate.google.co.jp$https://ssl.gstatic.com/translate/favicon.ico<||>Google Drive$https://drive.google.com$https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png<||>Wikipedia$https://ja.wikipedia.org/wiki/%E3%83%A1%E3%82%A4%E3%83%B3%E3%83%9A%E3%83%BC%E3%82%B8$http://favicon.hatena.ne.jp/?url=https://ja.wikipedia.org/wiki/%E3%83%A1%E3%82%A4%E3%83%B3%E3%83%9A%E3%83%BC%E3%82%B8<||>JR東日本$https://www.jreast.co.jp$http://favicon.hatena.ne.jp/?url=https://www.jreast.co.jp"
    );
  }
  if (localStorage.getItem("weather") == null) {
    localStorage.setItem("weather", "庄原,340020");
  }
  if (localStorage.getItem("wid_back") == null) {
    localStorage.setItem("wid_back", "rgba(255,255,255,0.7)_rgba(255,255,255,0.7)");
  }
  //update
  if (localStorage.getItem("updateWeather") == null) {
    localStorage.setItem("updateWeather", 1);
    localStorage.setItem("weather", "庄原,340020");
    localStorage.setItem("wid_back", "rgba(255,255,255,0.7)_rgba(255,255,255,0.7)");
    localStorage.setItem("back", "./InT/bgIMG/3.jpg");
  }
  document.getElementById("midf_img").src = "./InT/検索エンジン/" + localStorage.getItem("engine") + ".png";
  document.getElementById("midf_form").addEventListener("keypress", form_key);
  get_weather();
  move_clock();
  make_osuw();
  make_mySite();
  news();
  mySite_theme();
  //テーマの適用
  theme(localStorage.getItem("theme"));
  const dge = (id) => document.getElementById(id);
  //読み込み画面から戻す。
  dge("back").style.display = "block";
  dge("load").style.display = "none";
  dge("this").style.display = "block";
  //フォームの検索予測
  document.getElementById("midf_form").addEventListener("keyup", predict_search);
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#midf_sug_pa") && !e.target.closest("#midf_form")) {
      //ここに外側をクリックしたときの処理
      document.getElementById("midf_sug").style.display = "none";
    }
  });
});

//テーマの適用
function theme(val) {
  let class_arr = Array.from(document.getElementsByClassName("ha_div"));
  let osu_arr = Array.from(document.querySelectorAll("#osu_word a"));
  let inte_arr = Array.from(document.querySelectorAll("#inte_menu a"));
  if (val == "black") {
    osu_arr.map((value) => {
      value.style.color = "white";
    });
    class_arr.map((value) => {
      value.style.color = "white";
    });
    inte_arr.map((value) => {
      value.style.color = "white";
    });
  } else {
    inte_arr.map((value) => {
      value.style.color = "black";
    });
  }
  if (val == "green_white") {
    class_arr.map((value) => {
      value.style.backgroundColor = "rgba(233, 252, 233,0.9)";
    });
  } else if (val == "blue_white") {
    class_arr.map((value) => {
      value.style.backgroundColor = "rgba(230, 230, 255,0.9)";
    });
  } else if (val == "red_white") {
    class_arr.map((value) => {
      value.style.backgroundColor = "rgba(255, 221, 221,0.9)";
    });
  } else if (val == "white_white") {
    class_arr.map((value) => {
      value.style.backgroundColor = "white";
    });
  } else if (val == "black") {
    class_arr.map((value) => {
      value.style.backgroundColor = "black";
    });
  }
}

function go_form(e) {
  document.getElementById("midf_form").focus();
  let elem = e.currentTarget;
  let val = elem.innerHTML;
  search(val);
}

function mySite_theme() {
  let val = localStorage.getItem("wid_back");
  val = val.split("_");
  document.getElementById("site_s").style.background = "linear-gradient(to right," + val[0] + "," + val[1] + ")";
  if (val[0] == "white" || val[0] == "rgba(255,255,255,0)") {
    document.getElementById("site_s").classList.add("gray");
  }
}

//一時的な関数
function clear() {
  localStorage.clear();
}
