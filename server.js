const express = require('express')
const app = express();
const cors = require('cors')
const dotenv = require('dotenv')
const dbConnection = require('./config/db')

// CONFIG FILE & DB

dotenv.config({path: './config/config.env'});
dbConnection()

// MIDDLEWARE

app.use(express.json({ extended: false }))
app.use(cors())

// ROUTES & ROUTE FILES

app.use('/api/user', require('./routes/api/User'))
app.use('/api/auth', require('./routes/api/Auth'))

// PORT

const PORT = 5000 || process.env.PORT

// LISTEN ON PORT

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));