const request = require('request')



const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoibm9haHRob20iLCJhIjoiY2t0bm1sMzV0MDRiMzJ4cG1rODBxeTFqNyJ9.2KOTXZtFViJvTomSge7HIQ&limit=1'
    
    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location service!', undefined)
        }else if(body.features.length === 0){
            callback('No such place can be found. Try again!', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode