const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and views directory
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Noah'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Noah'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help page',
        title: 'Help',
        name: 'Noah'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'An address must be entered. Try again'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecastData.description,
                temperature: forecastData.temperature,
                location: location
            })
        })
    })
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        title: 'Error 404',
        name: 'Noah'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page does not exist',
        title: 'Error 404',
        name: 'Noah'
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})