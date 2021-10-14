const request = require('request')


const forecast = (long, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=02af9c2a21d5d2c6b304e925f496bed0&query='+ lat +','+ long +'&units=m'

    request({url, json: true}, (error,{body}) =>{
        if(error){
            callback('Could not connect to weather service!', undefined)
        }else if(body.error){
            callback({error_code: body.error.code,
                      error_info: body.error.info}, undefined)
        
        }else{
            callback(undefined, {description: body.current.weather_descriptions[0],
                                 temperature: body.current.temperature,
                                 feelsLike:   body.current.feelslike,
                                 time:        body.current.observation_time,
                                 humidity:    body.current.humidity}  )
        }
    })
}


module.exports = forecast