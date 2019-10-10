const express = require('express')

const redisControls = require('./redisDemo');
redisControls.redisInit()

const app = express()

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    redisControls.getKeys((key)=>{
        res.json({"keys":key})
        
    })
})

app.get('/seatmap/:key', (req, res) => { 
    res.setHeader('Content-Type', 'application/json')
    redisControls.getValue(req.params.key, (key, result)=>{
      res.json( JSON.parse(result) )
    })
})

app.listen(process.env.PORT || 1337, () => console.log(`Example app listening on port ${1337}!`))