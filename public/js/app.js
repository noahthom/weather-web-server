

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageWeather = document.querySelector('#weather')


messageWeather.textContent = ''


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageWeather.textContent = 'Loading..'


    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageWeather.textContent = data.error
            }else{
                messageWeather.textContent = 'It is currently ' + data.forecast + ' in ' + data.location + '. Temperature is ' + data.temperature + ' degrees Celcius.'
            }
        })
    })
})