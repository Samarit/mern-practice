const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const PORT = config.get('port')
const cors = require('cors')

const app = express()

app.use(express.json({ extended: true }))
app.use(cors())

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))


async function start() {
    try {
        await mongoose.connect(config.get('mongoURI', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }))
        app.listen(PORT, () => {console.log(`App has been started on port ${PORT}`);})
    } catch(e) {
        console.log('Server Error: ', e.message)
        process.exit(1)
    }
}

start()

