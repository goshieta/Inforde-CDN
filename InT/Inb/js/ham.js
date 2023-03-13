window.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('hamburger').addEventListener('click',()=>{
        if(document.getElementById('hamMenu').classList.contains('hide')){
            console.log('show')
            document.getElementById('hamMenu').classList.remove('hide')
            document.getElementById('hamMenu').style.display='block'
        }
        else{
            console.log('hide')
            document.getElementById('hamMenu').classList.add('hide')
            setTimeout(() => {
                document.getElementById('hamMenu').style.display='none'
            }, 5000);
        }
    })
})