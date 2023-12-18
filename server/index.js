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
    password: '', 
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
            // this is possible through express and cors
        }
    })

})

// Now we need to login with these credentials from a registered user
// Lets create another route
app.post('/login', (req, res) => {
     // we need to get the variables sent from the form

     const sentloginUserName = req.body.LoginUserName
     const sentLoginPassword = req.body.LoginPassword
 
     // Lets create SQL statement to insert the user to the Database table Users
     const SQL = 'SELECT * FROM users WHERE username = ? && password = ?'
     // We are going to enter these values through a variable
     const Values = [sentloginUserName, sentLoginPassword]

     // Query to execute the sql statement above
    db.query(SQL, Values, (err, results)=>{
        if(err){
            res.send({error: err})
        }
        if(results.length > 0){
            res.send(results)
        }
        else{
            res.send({message: `Credentials Don't match!`})
            // This should be good, Lets try to login.
        }
    })
})

// Backend for Admin privilges for Edit and Deletion of Users

app.get('/users', (req, res) => {
    const SQL = 'SELECT * FROM users';
  
    db.query(SQL, (err, results) => {
      if (err) {
        res.status(500).send({ error: 'Error fetching users from the database' });
        return;
      }
  
      res.send(results);
    });
  });

  app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { email, username, password } = req.body;
  
    const SQL = 'UPDATE users SET email=?, username=?, password=? WHERE id=?';
    const values = [email, username, password, userId];
  
    db.query(SQL, values, (err, result) => {
      if (err) {
        console.error('Error updating user:', err);
        res.status(500).send({ error: 'Error updating user' });
      } else {
        res.send({ message: 'User updated successfully' });
        console.log('User updated successfully!')
      }
    });
  });


app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
  
    const SQL = 'DELETE FROM users WHERE id=?';
    const values = [userId];
  
    db.query(SQL, values, (err, result) => {
      if (err) {
        console.error('Error deleting user:', err);
        res.status(500).send({ error: 'Error deleting user' });
      } else {
        res.send({ message: 'User deleted successfully' });
      }
    });
  });
  

// Fetch tasks for a specific user
app.get('/tasks/:userID', (req, res) => {
  const userID = req.params.userID;
  const SQL = 'SELECT * FROM task WHERE userID = ?';

  db.query(SQL, [userID], (err, results) => {
      if (err) {
          console.error('Error fetching tasks:', err);
          res.status(500).send({ error: 'Error fetching tasks' });
      } else {
          res.send(results);
      }
  });
});

// getting the username given a userID passed from login
app.get('/users/:userID', (req, res) => {
  const userID = req.params.userID;

  const SQL = 'SELECT * FROM users WHERE id=?';
  const values = [userID];

  db.query(SQL, values, (err, results) => {
      if (err) {
          console.error('Error fetching user data:', err);
          res.status(500).send({ error: 'Error fetching user data' });
      } else {
          console.log('User data fetched successfully!');
          res.send(results[0]); // Assuming there's only one user with the given ID
      }
  });
});  

// Create a new task
app.post('/tasks', (req, res) => {
  const { userID, taskName, taskDate, task_Desc, customerName } = req.body;

  // Check if all required fields are provided
  if (!userID || !taskName || !taskDate || !task_Desc || !customerName) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  const SQL = 'INSERT INTO tasks (userID, taskName, taskDate, task_Desc, customerName) VALUES (?,?,?,?,?)';
  const values = [userID, taskName, taskDate, task_Desc, customerName];

  db.query(SQL, values, (err, result) => {
    if (err) {
      console.error('Error adding task:', err);
      res.status(500).send({ error: 'Error adding task to the database' });
    } else {
      res.send({ message: 'Task added successfully', taskID: result.insertId });
    }
  });
});

  
  // Update a task
  app.put('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const { taskName, taskDate, task_Desc, customerName } = req.body;
  
    const SQL = 'UPDATE tasks SET taskName=?, taskDate=?, task_Desc=?, customerName=? WHERE taskID=?';
    const values = [taskName, taskDate, task_Desc, customerName, taskId];
  
    db.query(SQL, values, (err, result) => {
      if (err) {
        console.error('Error updating task:', err);
        res.status(500).send({ error: 'Error updating task' });
      } else {
        res.send({ message: 'Task updated successfully' });
        console.log('Task updated successfully!');
      }
    });
  });
  
  // Delete a task 
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;

  const SQL = 'DELETE FROM tasks WHERE taskID=?';
  const values = [taskId];

  db.query(SQL, values, (err, result) => {
      if (err) {
          console.error('Error deleting task:', err);
          res.status(500).send({ error: 'Error deleting task' });
      } else {
          console.log('Task deleted successfully!');
          res.send({ message: 'Task deleted successfully' });
      }
  });
});


  
  