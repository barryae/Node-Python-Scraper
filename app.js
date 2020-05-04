const express = require('express')
const app = express()


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
    const { spawn } = require('child_process');
    const pyScrape = spawn('python3', ['./web-scraper.py', req.query.search, req.query.format]);
    console.log("Route accessed")
    pyScrape.stdout.once('data', data => {
        console.log('Scraping Finished!')
        res.send(data)
    })
    pyScrape.stderr.on('data', data => {
        console.log(`error:${data}`)
    })
    pyScrape.on('close', () => {
        console.log('Closed')
    })

})

app.listen(3000, () => console.log('App listening on port 3000'))