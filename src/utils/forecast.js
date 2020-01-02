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
            callback(undefined, 
                body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain'
                // summary: body.daily.data[0].summary,
                // temperature: body.currently.temperature,
                // precipProbability: body.currently.precipProbability)
            )
        }  
    })
}

module.exports = forecast