const express = require('express')

const redisControls = require('./redisDemo');
redisControls.redisInit()

const app = express()

app.use(express.urlencoded());
app.use(express.json());

app.get('/', ( req, res ) => {
    res.setHeader('Content-Type', 'application/json')
    redisControls.getKeys((key)=>{
        res.json({"keys":key})
        
    })
})

app.get('/seatmap/:key', ( req, res ) => { 
    res.setHeader('Content-Type', 'application/json')
    redisControls.getValue(req.params.key, (result) => {
      res.json( JSON.parse( result ) )
    })
})

app.post('/seatmap/', ( req, res ) => {
    console.log( req.body.key )
    console.log( req.body.data )
    redisControls.setValue(req.body.key, req.body.data, ()=>{
        //res.redirect('/');
        res.end(`${ req.body.key } added successfully`)
    })
})

app.listen(process.env.PORT || 1337, () => console.log(`Example app listening on port ${1337}!`))