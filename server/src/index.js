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


app.post('/api/register', async (req, res) => {
    const { first_name, last_name, email, password, security_question, security_answer } = req.body
    try {
        const result = await pool.query(
            'INSERT INTO users (first_name, last_name, email, password, security_question, security_answer) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [first_name, last_name, email, password, security_question, security_answer]
        )
        res.json({ success: true, user: result.rows[0] })

    } catch (error) {
        console.log("Error inserting user", error)
        res.status(500).json({ success: false, error: 'Failed to register user' })

    }
})

const PORT = process.env.SERVER_PORT || 5001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})