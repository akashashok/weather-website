const request = require('request')

const geocode = (address, callback) => {
    // encodeURIComponent is used in times were ? becomes %3F
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWthc2hhc2hvazciLCJhIjoiY2s0cnFpN2g3MWQycTNtcGU4ZHlybTRwYiJ9.vP6cTo4O_5J0UBcLXHYRrg&limit=1'

    request({url, json: true}, (error, {body}) => {

        if (error)
            callback('Cannot connect to location service!', undefined)
        
        else if (body.features.length === 0)
            callback('Cannot find location. Try again!', undefined)

        else {
            callback(undefined, {
                location: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
            })
            
            // console.log(location + '\'s coordinates are: ' + 'Longitude: ' + longitude + ', Latitude: ' + latitude)
        }  
    })
}

module.exports = geocode