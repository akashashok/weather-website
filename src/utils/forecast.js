const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const coordinates = longitude + ',' + latitude
    // encodeURIComponent is used in times were ? becomes %3F
    const url = 'https://api.darksky.net/forecast/6e16b107deedda1db875cfeb69591dfa/' + encodeURIComponent(coordinates) + '?lang=en&units=si'

    request({url, json: true}, (error, {body}) => {

        if (error)
            callback('Cannot connect to weather service!', undefined)
        
        else if (body.error)
            callback('Poorly formatted input. Try again!', undefined)

        else {
            // console.log(body.daily.data[0])
            callback(undefined, 
                body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees (celsius) out. The high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow +'. There is a ' + body.currently.precipProbability + '% chance of rain with a wind speed of ' + body.daily.data[0].windSpeed + ' m/s.'
                // summary: body.daily.data[0].summary,
                // temperature: body.currently.temperature,
                // precipProbability: body.currently.precipProbability)
            )
        }  
    })
}

module.exports = forecast