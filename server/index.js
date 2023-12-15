// Our dependencies
const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

// Let us run the server
app.use(express.json())
app.use(cors())

// Running the Server
app.listen(3002, () => {
  console.log('Server is running on port 3002')
})

//Create database (mysql)
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '', // If you have set xampp password please enter it here
    database: 'plantdb',
})

// Let us now create a route to the server that will register a user.

app.post('/register', (req, res) => {
    // we need to get the variables sent from the form
    const sentEmail = req.body.Email
    const sentUserName = req.body.UserName
    const sentPassword = req.body.Password

    // Lets create SQL statement to insert the user to the Database table Users
    const SQL = 'INSERT INTO users (email, username, password) VALUES (?,?,?)'
    // We are going to enter these values through a variable
    const Values = [sentEmail, sentUserName, sentPassword]

    // Query to execute the sql statement stated above
    db.query(SQL, Values, (err, results)=>{
        // If there is an error, it will show below
        if(err){
            res.send(err)
        } 
        else {
            console.log('User inserted successfully!')
            res.send({message: 'User added!'})
            // Let try and see
            // user has not been submitted, we need to use express and cors
        }
    })

})