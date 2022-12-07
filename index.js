const express = require('express')
const fs = require('fs')

const app = express()

app.use(express.json())

const hotels = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/hotels-simple.json`))

app.get('/api/v1/hotels/:id', (req, res) => {

    const id = req.params.id * 1
    const hotel = hotels.find(el => el.id === id)

    res.status(200).json({
        status: 'success',
        data: {
            hotel
        }
    })
})

app.post('/api/v1/hotels', (req, res) => {
    const newId = hotels[hotels.length-1].id + 1
    const newHotel = Object.assign({id: newId}, req.body)
    hotels.push(newHotel)
    fs.writeFile(`${__dirname}/dev-data/data/hotels-simple.json`, JSON.stringify(hotels), err => {
        res.status(201).json({
            status: 'success',
            data: {
                hotels: newHotel
            }
        })
    })
})

const port = 3000
app.listen(port, () => {
    console.log(`App is running on port ${port}...`)
})