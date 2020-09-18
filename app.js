const express = require('express');
// const express = require('express');
const userRouter = require('./routes/routes')
require ('./db/database'); //requiring db for the whole app

const app = express()
const port = process.env.PORT || 5000

//Setting Route to display all the API endpoints in a webpage with Handlebars
app.get('/', async (req, res) => {
    res.send("This will be deafult route")
})
//
app.use(express.json())
// Routes for the Login/Register module
app.use(userRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})