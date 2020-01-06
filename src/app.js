// core modules
const path = require('path')

// npm modules
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// generate express application, 'app' is the express application
const app = express()

// to run on heroku
const port = process.env.PORT || 3000

// defining paths for express config
// to serve up directories, to customize server to serve up public folder
const publicDirectoryPath = path.join(__dirname, '../public')
// customizing views folder path
const viewsPath = path.join(__dirname, '../templates/views')
// partials path
const partialsPath = path.join(__dirname, '../templates/partials')

// to set value to a given express setting: this case, setting up view enginer setting to hbs
// all views should be in 'views' folder in root of project, else we should customize it
app.set('view engine', 'hbs')
// to set customized views path
app.set('views', viewsPath)
// setup partials
hbs.registerPartials(partialsPath)

// to serve up directories, to customize server to serve up public folder
app.use(express.static(publicDirectoryPath))

// to serve up the template, set up route
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Akash Ashok'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Akash Ashok'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help feature coming soon...',
        title: 'Help',
        name: 'Akash Ashok'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akash Ashok',
        errorMessage: 'Help article not found!'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please enter address'
        })
    }

    // provide empty object value for destructuring to properly work
    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {

        if(error)
            return res.send({ error })
    
        forecast(longitude, latitude, (error, forecastData) => {
    
            if(error)
                return res.send({ error })

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
    
            // console.log('The weather forecast for ' + location + ' is: ' + temperature + ' degrees. There is a ' + precipProbability + '% chance of rain')
        })
    })
    /*
    res.send({
        location: 'San Jose',
        forecast: 'Current weather is 15 degrees',
        address: req.query.address
    })
    */
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Akash Ashok',
        errorMessage: 'Page not found!'
    })
})

// start server and make it listen on port
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})







/*
app.get('/', (req, res) => {
    res.send('<h1>Hello Express!</h1>')
})

app.get('/help', (req, res) => {
    res.send([{
        name: 'Akash',
    }, {
        name: 'Ashok'
    }])
})

app.get('/about', (req, res) => {
    res.send('<h1>About page</h1>')
})
*/

/*
console.log(__dirname)
console.log(__filename)

Goes a level up
console.log(path.join(__dirname, '..'))

Goes 2 level up
console.log(path.join(__dirname, '../..'))
*/

/*
app.get('/products', (req, res) => {
    if(!req.query.search)
        return res.send({
            error: 'You must provide a search term.'
        })
    console.log(req.query.search)
    res.send({
        products: []
    })
})
*/