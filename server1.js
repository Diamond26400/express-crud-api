const express = require("express")
const app = express()

app.use(express.json())

// Data stored in memory (acts as database for now)
let users = [
    { id: 1, name: "Diamond", country: "Nigeria" },
    { id: 2, name: "Alita", country: "Kenya" },
    { id: 3, name: "Gabe", country: "USA" }
]

// GET - return all users
app.get("/users", (req, res) => {
    res.json(users)
})

// GET - return one user by id
app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find(u => u.id === id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({ message: "User not found" })
    }
})

// POST - create a new user
app.post("/users", (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        country: req.body.country
    }
    users.push(newUser)
    res.status(201).json(newUser)
})

 //update an existing user
app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find(u => u.id === id)
    if (user) {
        user.name = req.body.name || user.name
        user.country = req.body.country || user.country
        res.json(user)
    } else {
        res.status(404).json({ message: "User not found" })
    }
})

// DELETE - remove a user
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const index = users.findIndex(u => u.id === id)
    if (index !== -1) {
        const deleted = users.splice(index, 1)
        res.json({ message: "User deleted", user: deleted[0] })
    } else {
        res.status(404).json({ message: "User not found" })
    }
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})