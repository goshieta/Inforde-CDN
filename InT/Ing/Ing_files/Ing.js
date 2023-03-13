window.addEventListener('load',window_change)
window.addEventListener('resize',window_change)

function window_change(){
    let all_width=window.innerWidth-60
    document.getElementById('game_area_round').style.display='flex'
    if(all_width<=320){
        document.getElementById('game_area_round').style.width="100%"
        return
    }
    let width_ga=all_width-all_width%320
    console.log(width_ga)
    document.getElementById('game_area_round').style.width=width_ga+'px'
}