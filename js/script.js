
let circle
let vh
let vw
let atualColor = 'rgb(247,113,113)'
const timers = {
    pomodoro:25,
    shortBreak: 5,
    longBreak: 15,
    atualTimer: {
        minutos:0,
        segundos:0
    }
}
const properties = {
    strokeDashArray: 0
}
window.onload = ()=>{
    let atualBtnChecked = 0;
    circle = document.getElementById('circle')
    const alturaTela = window.innerHeight
    const larguraTela = window.innerWidth
    vh = alturaTela/100
    vw = larguraTela/100
    const raio = (38*vh)/2
    properties.strokeDashArray = 2*Math.PI*raio
    circle.setAttribute('stroke', atualColor)
    circle.setAttribute('stroke-dasharray', properties.strokeDashArray)
    circle.setAttribute('r', raio)
    setInterval(()=>{
        circle.classList.add('circleAnims')
    },1000)
    btns = document.getElementsByName('radio1')
    btns.forEach((btn)=>{
        btn.addEventListener('click', (btn)=>{
            btns.forEach((btnAtual, indice) =>{
                if (btnAtual.checked){
                    if (btnAtual != atualBtnChecked){
                        console.log('colocando no indice ',indice+1)
                        atualBtnChecked = btnAtual
                        document.querySelector(`[data-btn="${indice+1}"]`).classList.add('themeColor-active')
                    }
                }
                else{
                    console.log('removendo do indice ',indice+1)
                    document.querySelector(`[data-btn="${indice+1}"]`).classList.remove('themeColor-active')
                }
            })
        })
    })
    document.getElementById('btnStart').addEventListener('click', start)
    document.getElementById('btnPause').addEventListener('click', pause)
}
let interval = ''
function start(){
    let btnChecked
    let status
    btns.forEach((btnAtual, indice)=> {
        if (btnAtual.checked){
            btnChecked = indice
        }
    })
    if (timers.atualTimer.minutos == timers.pomodoro || timers.atualTimer.minutos == timers.shortBreak || timers.atualTimer.minutos == timers.longBreak){
        if (btnChecked == 0) {
            timers.atualTimer.minutos = timers.pomodoro
        }
        else if (btnChecked == 1) {
            timers.atualTimer.minutos = timers.shortBreak
        }
        else {
            timers.atualTimer.minutos = timers.longBreak
        }
    }
    const strokePerMin = properties.strokeDashArray/timers.atualTimer.minutos
    let strokeIncrement = 0
    timers.atualTimer.segundos = 0
    let lastMinute = 0
    interval = setInterval(()=>{
        if (timers.atualTimer.minutos == 0 && timers.atualTimer.segundos == 0){
            clearInterval(interval)
        }
        if (timers.atualTimer.segundos == 0){
            timers.atualTimer.minutos -= 1
            timers.atualTimer.segundos = 59
        }
        else{
            timers.atualTimer.segundos--
        }
        if (timers.atualTimer.minutos != lastMinute){
            lastMinute = timers.atualTimer.minutos
            strokeIncrement += strokePerMin
            document.getElementById('circle').style.strokeDashoffset = strokeIncrement
        }
        document.getElementById('timing').innerText = `${timers.atualTimer.minutos}:${timers.atualTimer.segundos < 10 ? '0'+timers.atualTimer.segundos : timers.atualTimer.segundos}`
    }, 250)
}
function pause(){

}