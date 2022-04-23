
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
    },
    shortBreakTimes: 4,
    shortBreakControl: 0
}
const properties = {
    strokeDashArray: 0,
    colorTheme: 'rgb(247,113,113)'
}
const radioButtons = {
}
window.onload = ()=>{
    let atualBtnChecked = document.getElementById('btn1');
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
    const btns = document.getElementsByName('radio1')
    radioButtons.optionBtn = btns
    btns.forEach((btn)=>{
        btn.addEventListener('click', ()=>{
            if (intervaloCheck == false){
                btns.forEach((btnAtual, indice) => {
                    if (btnAtual.checked) {
                        if (btnAtual != atualBtnChecked) {
                            atualBtnChecked = btnAtual
                            document.querySelector(`[data-btn="${indice + 1}"]`).style = `background-color:${properties.colorTheme};`
                            document.querySelector(`[data-btn="${indice + 1}"]`).classList.add('activeOption')
                        }
                    }
                    else {
                        document.querySelector(`[data-btn="${indice + 1}"]`).style = ''
                        document.querySelector(`[data-btn="${indice + 1}"]`).classList.remove('activeOption')
                    }
                })
            }
            else{
                btns.forEach((btnAtual) =>{
                    if (btnAtual.checked){
                        if (btnAtual != atualBtnChecked){
                            atualBtnChecked.click()
                        }
                    }
                })
            }
        })
    })
    let atualFontBtn
    const fontsRadio = document.getElementsByName('fontChange')
    radioButtons.fontsBtn = fontsRadio
    fontsRadio.forEach((btnFonts)=>{
        btnFonts.addEventListener('click', ()=>{
            fontsRadio.forEach((btnAtual, indice) =>{
                if (btnAtual.checked){
                    if (btnAtual != atualFontBtn){
                        atualFontBtn = btnAtual
                        document.getElementById(`fonte${indice+1}`).classList.add('color-on')
                        document.getElementById(`imgFont${indice+1}`).setAttribute('src', `img/fonte${indice+1}-on.png`)
                        document.getElementById(`fonte${indice+1}`).classList.remove('color-off')
                    }
                }
                else{
                    document.getElementById(`imgFont${indice+1}`).setAttribute('src', `img/fonte${indice+1}.png`)
                    document.getElementById(`fonte${indice+1}`).classList.remove('color-on')
                    document.getElementById(`fonte${indice+1}`).classList.add('color-off')
                }
            })
        })
    })
    let atualColorBtn
    const colorRadio = document.getElementsByName('colorChange')
    radioButtons.colorBtn = colorRadio
    colorRadio.forEach((btnFonts)=>{
        btnFonts.addEventListener('click', ()=>{
            colorRadio.forEach((btnAtual, indice) =>{
                if (btnAtual.checked){
                    if (btnAtual != atualColorBtn){
                        atualColorBtn = btnAtual
                        document.getElementById(`imgColor${indice+1}`).classList.remove('hidden')
                    }
                }
                else{
                    document.getElementById(`imgColor${indice+1}`).classList.add('hidden')
                }
            })
        })
    })
    document.getElementById('pomodoroInput').defaultValue = 25;
    document.getElementById('shortBrInput').defaultValue = 5;
    document.getElementById('longBrInput').defaultValue = 15;
    document.getElementById('btnStart').addEventListener('click', start)
    document.getElementById('btnPause').addEventListener('click', pause)
    document.getElementById('configBtn').addEventListener('click', config)
    document.getElementById('closeIcon').addEventListener('click', closeConfig)
    document.getElementById('applyConfigs').addEventListener('click', aplicarConfigs)
}
function clearIntervalo(intervalo, statusAnterior){
    intervaloCheck = false
    clearInterval(intervalo)
    if (statusAnterior == 0){
        if (timers.shortBreakControl < timers.shortBreakTimes){
            document.getElementById('btn2').click()
            document.getElementById('btnStart').click()
            timers.shortBreakControl++
        }
        else {
            document.getElementById('btn3').click()
            document.getElementById('btnStart').click()
            timers.shortBreakControl = 0
        }
    }
    else {
        document.getElementById('btn1').click()
        document.getElementById('btnStart').click()
    }

}
let intervaloCheck = false
let strokePerMin
let lastBtnChecked = null
function start(){
    document.getElementById('btnStart').classList.add('hidden')
    document.getElementById('btnPause').classList.remove('hidden')
    let btnChecked
    radioButtons.optionBtn.forEach((btnAtual, indice)=> {
        if (btnAtual.checked){
            btnChecked = indice
        }
    })
    if ((timers.atualTimer.minutos == 0 && timers.atualTimer.segundos == 0) || lastBtnChecked != btnChecked){
        if (btnChecked == 0) {
            timers.atualTimer.minutos = timers.pomodoro
            document.getElementById('circle').style.strokeDashoffset = 0
        }
        else if (btnChecked == 1) {
            timers.atualTimer.minutos = timers.shortBreak
            document.getElementById('circle').style.strokeDashoffset = 0
        }
        else {
            timers.atualTimer.minutos = timers.longBreak
            document.getElementById('circle').style.strokeDashoffset = 0
        }
        strokePerMin = properties.strokeDashArray/(timers.atualTimer.minutos == 0 ? 2 : timers.atualTimer.minutos)
        lastBtnChecked = btnChecked
        timers.atualTimer.segundos = 0
    }
    let strokeIncrement = 0
    let lastMinute = 0
    const interval = setInterval(()=>{
        intervaloCheck = true
        if (timers.atualTimer.minutos == 0 && timers.atualTimer.segundos == 0){
            clearIntervalo(interval, btnChecked);
        }
        else if (timers.atualTimer.segundos == 0){
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
    }, 1000)
    window.getInterval = interval
}
function pause(){
    intervaloCheck = false
    clearInterval(window.getInterval)
    document.getElementById('btnStart').classList.remove('hidden')
    document.getElementById('btnPause').classList.add('hidden')
}
function config(){
    document.getElementById('config').classList.add('enter-animation')
}
function closeConfig(){
    document.getElementById('config').classList.add('goout-animation')
    setTimeout(()=>{
        document.getElementById('config').classList.remove('goout-animation')
    },350)
    document.getElementById('config').classList.remove('enter-animation')
}
function aplicarConfigs(){
    timers.pomodoro = document.getElementById('pomodoroInput').value == '' ? 25 : document.getElementById('pomodoroInput').value
    timers.shortBreak = document.getElementById('shortBrInput').value == '' ? 5 : document.getElementById('shortBrInput').value
    timers.longBreak = document.getElementById('longBrInput').value == '' ? 15 : document.getElementById('longBrInput').value
    if (intervaloCheck === false){
        timers.atualTimer.minutos = 0
        timers.atualTimer.segundos = 0
        radioButtons.optionBtn.forEach((btn, indice)=>{
            const tempoTitle = document.getElementById('timing')
            let indiceChecked = null
            if (btn.checked){
                indiceChecked = indice
            }
            if (indiceChecked === 0){
                tempoTitle.innerText = `${timers.pomodoro}:00`
            }
            else if (indiceChecked === 1){
                tempoTitle.innerText = `${timers.shortBreak}:00`
            }
            else if (indiceChecked === 2) {
                tempoTitle.innerText = `${timers.longBreak}:00`
            }
        })
        document.getElementById('circle').style.strokeDashoffset = 0
    }
    const fontsBtn = radioButtons.fontsBtn
    let fontChecked = null
    let lastFont
    fontsBtn.forEach((btn, indice)=>{
        if (btn.checked){  
            if (document.getElementsByClassName(`fontSelect${indice+1}`).length == 0){
                fontChecked = indice
            }
        }
        else {
            if (document.getElementsByClassName(`fontSelect${indice+1}`).length != 0){
                lastFont = indice
            }
        }
    })
    if (fontChecked != null){
        const fontItems = Object.values(document.getElementsByClassName(`fontSelect${lastFont+1}`))
        fontItems.forEach((e)=>{
            e.classList.remove(`fontSelect${lastFont+1}`)
            e.classList.add(`fontSelect${fontChecked+1}`)
        })
    }
    const colorBtn = radioButtons.colorBtn
    let colorChecked = null
    colorBtn.forEach((btn, indice)=>{
        if (btn.checked){  
            colorChecked = indice
        }
    })
    if (colorChecked != null){
        if (colorChecked == 0){
            properties.colorTheme = 'rgb(247,113,113)'
        }
        else if (colorChecked == 1){
            properties.colorTheme = 'rgb(112,241,249)'
        }
        else if (colorChecked == 2){
            properties.colorTheme = '#d781f9'
        }
        radioButtons.optionBtn.forEach((btnAtual, indice) =>{
            if (btnAtual.checked){
                document.querySelector(`[data-btn="${indice+1}"]`).style = `background-color:${properties.colorTheme};`
            }
        })
        circle.setAttribute('stroke', properties.colorTheme)
        document.getElementById('applyConfigs').style = `background-color:${properties.colorTheme};`
    }
    document.getElementById('closeIcon').click()
}
