# TASKIFY 3105 - MANAGEMENT TOOL  README documentation

## Guide to using this webapp

* Task Management App for Employees with searching index function
* Organize Orders

## Important Links
1. [Wireframe Layouts](https://www.canva.com/design/DAFviR_rW6U/mqIVP5XNTGd6a58WfAulXQ/edit)

### Setting Up the Project
1. Clone the project in your local directory of choice. Example using the git CLI:
```
git clone https://github.com/Sweep76/appdev_project.git
```

2. CD into the root folder
```
cd appdev_project
```
3. CD into the client and server folder separately 
```
cd client (or) cd server
```
4. Install dependencies on each folder
```
npm install
```
5. dependencies used - client folder
```
npm init
npm install sass --save-dev
npm install react-router-dom
npm install react-icons
npm install axios
npm install react-modal
```
6. dependencies used - server folder
```
npm init
npm install mysql express cors
npm install jsonwebtoken
```

7. Run the project
```
npm run dev (in the client directory)
node index.js (in the server directory)
```


## Database Setup
# Guide to installing the DB of taskify
1. Import the "plantdb.sql" SQL file found outside the directory into phpmyadmin. NOTE THAT THIS IS A MUST

## Commands to Run During Development

1. Ensure that your XAMPP is running with the imported database and mySQL server running as well.
2. Start your local front-end server
```
npm run dev (on client directory)
node index.js (on server directory)
```
