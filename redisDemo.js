
const  seatmap1 = require('./seatmaps/seatmap')
const  seatmap2 = require('./seatmaps/seatmap2')

const getRedisConnect= () =>{
    if (process.env.REDISTOGO_URL) {
        const rtg   = require("url").parse(process.env.REDISTOGO_URL);
        const redis = require("redis").createClient(rtg.port, rtg.hostname);
        redis.auth(rtg.auth.split(":")[1]);
        return redis
    } else {
        const redis = require('redis');
        return redis.createClient();
    }
}

const client = getRedisConnect()

client.on('connect', ()=>{
    console.log( 'Redis Client connected' );
})

client.on('error', (err)=>{
    console.log( 'Something went wrong ' + err );
})

module.exports ={

    redisInit: () => {
        client.set("seatmap1", JSON.stringify(seatmap1))
        client.set("LHRJNB", JSON.stringify(seatmap2))
        client.set("JFKLHR", JSON.stringify(seatmap3))
        client.set("DXBHCM", JSON.stringify(seatmap4))
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

