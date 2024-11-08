require('dotenv').config()
const express = require('express')
const { Pool } = require('pg')
const app = express()

app.use(express.json())

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

app.get('/', (req, res) => {
    res.send('Backend is running')
})

app.get('/api/testdb', async (req, res) => {
    try {
        //const result = await pool.query('SELECT NOW();')
        const result = await pool.query('SELECT NOW();')

        res.json({ success: true, time: result.rows[0].now })
    }
    catch (error) {
        console.error('Database connection error', error)
        res.status(500).json({ success: false, error: 'Database connection error' })

    }
})
const PORT = process.env.DB_PORT || 5001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})