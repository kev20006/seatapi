const redis = require('redis');
const client = redis.createClient();
const  seatmap1 = require('./seatmaps/seatmap')




client.on('connect', ()=>{
    console.log( 'Redis Client connected' );
})

client.on('error', (err)=>{
    console.log( 'Something went wrong ' + err );
})

module.exports ={

    redisInit: () => {
        client.set("seatmap1", JSON.stringify(seatmap1))
    },

    setValue: (key, value) => {
        client.set(key, value, redis.print)
    },

    getValue: (key, onResult) =>{
        client.get(key, (error, result)=> {
            if (error) {
                console.log(error);
                throw error;
            }
            onResult(key, result)
        });
    },

    getKeys: (onKeys => {
        client.keys('*', (err, keys) => {
            if (err) return console.log(err);
            onKeys(keys)
        })
    })
}

