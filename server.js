const express = require ("express")
const app = express()

//This lets your server read JSON data from requsts
app.use(express.json())

//your first rout - Get request to the home path 
app.get("/", (req ,res) => {
    res.send ("My server is alive!")

})

//start the server anmd listen on port 3000
app.listen (3000, () => {
    console.log("Server is running on port 3000")
})