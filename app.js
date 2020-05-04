const express = require('express')
const app = express()
const { spawn } = require('child_process');

app.use(express.static('front'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile('./front/index.html')
})

app.get('/wiki/:search', (req, res) => {
    res.redirect('https://en.wikipedia.org/wiki/' + req.params.search)
})

app.get('/scrape?', (req, res) => {
    const pyScrape = spawn('python', ['./web-scraper.py', req.query.search, req.query.format]);
    pyScrape.stdout.once('data', data => {
        console.log('Scraping Finished!')
        res.send(data)
    })
})

app.listen(3000, () => console.log('App listening on port 3000'))