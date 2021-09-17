const express = require('express')
const mongoose = require('mongoose')
const app = express()

const PORT = process.env.PORT || 5000

async function start() {
    try {
        await mongoose.connect(`mongodb://mongo:${process.env.DBPORT || 27017}/MobiDev_test_task`, {}) 
        app.listen(PORT, () => console.log(`server start. Port ${PORT}`))
    }catch(e) {
        console.log(`server error`, e.message)
        process.exit(1)
    }
}

app.use('/friends', require('./routes/friends'))
app.use('/followers', require('./routes/followers'))
app.use('/faker', require('./routes/faker'))



start()
