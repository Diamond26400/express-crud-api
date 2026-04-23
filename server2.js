require("dotenv").config()

const express = require("express")
const pool = require("./db")
const app = express()

app.use(express.json())

// GET all users from database
app.get("/users", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users")
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// POST - add a new user to database
app.post("/users", async (req, res) => {
    try {
        const { name, country } = req.body
        const result = await pool.query(
            "INSERT INTO users (name, country) VALUES ($1, $2) RETURNING *",
            [name, country]
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// GET single user by id
app.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// PUT - update a user
app.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { name, country } = req.body
        const result = await pool.query(
            "UPDATE users SET name = $1, country = $2 WHERE id = $3 RETURNING *",
            [name, country, id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// DELETE - remove a user
app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params
        const result = await pool.query(
            "DELETE FROM users WHERE id = $1 RETURNING *", [id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json({ message: "User deleted", user: result.rows[0] })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

const authRoutes = require("./auth")
app.use("/auth", authRoutes)

app.listen(3000, () => {
    console.log("Server connected to database and running on port 3000")
})