const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const pool = require("./db")

const SECRET_KEY = process.env.SECRET_KEY

// REGISTER
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await pool.query(
            "INSERT INTO auth_users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
            [username, email, hashedPassword]
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await pool.query(
            "SELECT * FROM auth_users WHERE email = $1",
            [email]
        )
        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" })
        }
        const user = result.rows[0]
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid credentials" })
        }
        const token = jwt.sign(
            { id: user.id, username: user.username },
            SECRET_KEY,
            { expiresIn: "1h" }
        )
        res.json({ token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Middleware - checks for valid token
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]
    if (!token) {
        return res.status(403).json({ message: "No token provided" })
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ message: "Invalid token" })
    }
}

// Protected route
router.get("/profile", verifyToken, async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, username, email FROM auth_users WHERE id = $1",
            [req.user.id]
        )
        res.json(result.rows[0])
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router