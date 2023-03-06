let key = "2cfda1f27f8f18422038c85cc30073ad"
let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${42.882004}&lon=${74.582748}&lang=ru&units=metric&appid=${key}`
let $select = document.querySelector('select')

$select.addEventListener('change', function(){
    switch ($select.value){
        case "Ош": 
            getData(`https://api.openweathermap.org/data/2.5/onecall?lat=${40.513996}&lon=${72.816101}&lang=ru&units=metric&appid=${key}`)
            break
        case "Нарын":
            getData(`https://api.openweathermap.org/data/2.5/onecall?lat=${41.42866}&lon=${75.99111}&lang=ru&units=metric&appid=${key}`)
            break
        }
})


getData(url)
async function getData(url) {
    let resp = await fetch(url)
    let data = await resp.json()

    console.log(data)
    currentData(data.current, data.daily[0].temp)
    hourData(data.hourly)
    dailyData(data.daily)
}


function currentData(current, dailyTemp) {
    let $currentTemp = document.querySelector('.temp')
    let $currentDescription = document.querySelector('#description')
    let $descriptionIcon = document.querySelector('#descriptionIcon')
    let $curentMaxTemp = document.querySelector('#maxTemp')
    let $curentMinTemp = document.querySelector('#minTemp')

    $currentTemp.textContent = (current.temp).toFixed(0) + '°'
    $currentDescription.textContent = current.weather[0].description
    $descriptionIcon.setAttribute('src', `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`)
    $curentMaxTemp.textContent = (dailyTemp.max).toFixed(0) + '°' + " --"
    $curentMinTemp.textContent = ' ' + (dailyTemp.min).toFixed(0) + '°'
}

function hourData(hourly) {
    let $hours = document.querySelector('.hours')
    $hours.innerHTML = ""
    hourly.forEach((element, index) => {
        let hour = new Date().getHours() + index
        $hours.insertAdjacentHTML('beforeend', `
            <div class="hour">
                <p>${index == 0 ? 'Сейчас' : hour < 24 ? hour : hour - 24 * Math.floor(hour / 24)}</p>
                <img src="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png">
                <p>${(element.temp).toFixed(0) + '°'}</p>
            </div>
        `)
    })
}
let weekDays = ['Вc', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
function dailyData(daily) {
    let $daily = document.querySelector('.daily')
    $daily.innerHTML = ''
    daily.forEach((element, index) => {
        let days = new Date(element.dt * 1000).getDay()
        $daily.insertAdjacentHTML('beforeend', `
            <div class="day">
                <p>${index == 0 ? 'Сегодня' : weekDays[days]}</p>
                <img src="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png">
                <p>${(element.temp.min).toFixed(0) + '°'}</p>
                <div class="temp-scale">
                  <div class="left" style="width: ${element.temp.min < 0 ? 50 - 50 / (10 / element.temp.min * -1) : 50 - 50 / (30 / element.temp.min)}%;"></div>
                  <div class="temp-scale-gradient"></div>
                  <div class="right"></div>
                </div>
                <p style="text-align: right;" style="width: 0%;">${(element.temp.max).toFixed(0) + '°'}</p>
            </div>
        `)
    })
}

