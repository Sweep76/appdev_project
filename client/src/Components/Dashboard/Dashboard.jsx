/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../../Dashboard.css';
import '../../App.scss';
import { Link, NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';

function Dashboard() {
  const location = useLocation();
  const userID = location.state.userID;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // Initialize tasks from localStorage or an empty array
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [username, setUsername] = useState('');


  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState('');
  const [taskDeadlines, setTaskDeadlines] = useState([]);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // Default to ascending order
  const [selectedSortOption, setSelectedSortOption] = useState('date'); // Default to sorting by date
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [newCustomerName, setNewCustomerName] = useState('');
  const [editedTaskName, setEditedTaskName] = useState('');
  const [editedTaskDate, setEditedTaskDate] = useState('');
  const [editedTaskDesc, setEditedTaskDesc] = useState('');
  const [editedCustomerName, setEditedCustomerName] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedTaskDetails, setEditedTaskDetails] = useState({
    name: '',
    description: '',
    date: '',
    customerName: '',
  });



  const openAddModal = () => {
    setIsAddModalOpen(true);
  };
  
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    // Reset input values when closing the modal
    setNewTaskName('');
    setNewTaskDesc('');
    setNewTaskDate('');
    setNewCustomerName('');
  };  

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditedTaskDetails({
      name: '',
      description: '',
      date: '',
      customerName: '',
    });
  };
  


  const addTaskToDatabase = async (taskData) => {
    try {
      const response = await axios.post('http://localhost:3002/tasks', taskData);
      console.log(response.data);
    } catch (error) {
      console.error('Error adding task to database:', error);
    }
  };

  
  const fetchUserDataFromDatabase = async (userID) => {
    try {
        const userResponse = await axios.get(`http://localhost:3002/users/${userID}`);
        setUsername(userResponse.data.username);
    } catch (error) {
        console.error('Error fetching user data from database:', error);
    }
  };

  const fetchTasksFromDatabase = async (userID) => {
    try {
        const response = await axios.get(`http://localhost:3002/tasks/${userID}`);
        setTasks(response.data);
    } catch (error) {
        console.error('Error fetching tasks from database:', error);
    }
  };


  const removeTaskFromDatabase = async (taskId) => {
    try {
      const response = await axios.delete(`http://localhost:3002/tasks/${taskId}`);
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting task from database:', error);
    }
  };
  
  const updateTaskInDatabase = async (taskId, updatedTaskData) => {
    try {
      const response = await axios.put(`http://localhost:3002/tasks/${taskId}`, updatedTaskData);
      console.log(response.data);
    } catch (error) {
      console.error('Error updating task in database:', error);
    }
  };
  
  const removeTask = (index) => {
    const taskId = tasks[index].taskID;
  
    // Remove the task from the database
    removeTaskFromDatabase(taskId);
  
    // Update the local state (if needed)
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };
  
  const saveTask = (index) => {
    const taskId = tasks[index].taskID;
    const updatedTaskData = {
      taskName: editedTaskName,
      taskDate: editedTaskDate,
      task_Desc: editedTaskDesc,
      customerName: editedCustomerName,
    };

    // Update the task in the database
    updateTaskInDatabase(taskId, updatedTaskData);

    // Update the local state (if needed)
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], ...updatedTaskData };
    setTasks(updatedTasks);

    // Reset the edited task variables
    setEditedTaskName('');
    setEditedTaskDate('');
    setEditedTaskDesc('');
    setEditedCustomerName('');
  };
  

  const addTask = () => {
    if (newTaskName.trim() !== '') {
      const newTaskData = {
        userID: userID,
        taskName: newTaskName,
        taskDate: newTaskDate,
        task_Desc: newTaskDesc,
        customerName: newCustomerName,
      };
  
      // Add the task to the database
      addTaskToDatabase(newTaskData);
  
      // Update the local state (if needed)
      const updatedTasks = [...tasks, newTaskData];
      setTasks(updatedTasks);
  
      // Reset input values
      setNewTaskName('');
      setNewTaskDesc('');
      setNewTaskDate('');
      setNewCustomerName('');
    }
    closeAddModal();
  };
  

  const cancelDelete = () => {
    setConfirmDeleteIndex(null);
  };

  const enterEditMode = (index) => {
    const selectedTask = tasks[index];
    setEditingIndex(index);
    setIsEditModalOpen(true);
    setEditedTaskDetails({
      name: selectedTask.taskName,
      description: selectedTask.task_Desc,
      date: selectedTask.taskDate,
      customerName: selectedTask.customerName,
    });
  };  


  const setDeadline = (index, date) => {
    const updatedDeadlines = [...taskDeadlines];
    updatedDeadlines[index] = date;
    setTaskDeadlines(updatedDeadlines);
    localStorage.setItem('taskDeadlines', JSON.stringify(updatedDeadlines));
  };

  const handleSortOptionChange = (event) => {
    setSelectedSortOption(event.target.value);
  };

  const handleSort = () => {
    const sortedTasks = [...tasks];
    if (selectedSortOption === 'date') {
      if (sortOrder === 'asc') {
        sortedTasks.sort((a, b) =>
          (taskDeadlines[tasks.indexOf(a)] || '').localeCompare(taskDeadlines[tasks.indexOf(b)] || '')
        );
        setSortOrder('desc');
      } else {
        sortedTasks.sort((a, b) =>
          (taskDeadlines[tasks.indexOf(b)] || '').localeCompare(taskDeadlines[tasks.indexOf(a)] || '')
        );
        setSortOrder('asc');
      }
    } else if (selectedSortOption === 'alphabetical') {
      if (sortOrder === 'asc') {
        sortedTasks.sort((a, b) => a.localeCompare(b));
        setSortOrder('desc');
      } else {
        sortedTasks.sort((a, b) => b.localeCompare(a));
        setSortOrder('asc');
      }
    }
    setTasks(sortedTasks);
  };

  const filteredTasks = tasks.filter((task) =>
    task.taskName && task.taskName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  useEffect(() => {
    if (userID) {
        // Fetch user data for the logged-in user using userID
        fetchUserDataFromDatabase(userID);

        // Fetch tasks for the logged-in user using userID
        fetchTasksFromDatabase(userID);
    }
}, [userID]);



  // useEffect(() => {
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }, [tasks]);

  useEffect(() => {
    const savedDeadlines = localStorage.getItem('taskDeadlines');
    if (savedDeadlines) {
      setTaskDeadlines(JSON.parse(savedDeadlines));
    }
  }, []);

  useEffect(() => {
    // This effect will run when the component mounts (on initial load)
    // and whenever the 'tasks' state changes.
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app">
      <div className="task-app">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
        {isSidebarOpen && (
          <div className="sidebar">
            <h3>Welcome, {username}!</h3>
            <NavLink to="/" onClick={() => setIsSidebarOpen(false)}>
              Logout
            </NavLink>
          </div>
        )}
        <h1>Modern Foliage Taskify</h1>
        <center>
        {/* <p>Please input the calendar date and task name first before using the sort function</p> */}
        </center>
          <div className="task-input"> {/*this is where the task name input goes*/}
          
          <button className="add-button" onClick={openAddModal}>
            Add Task
          </button>
            <br></br>
            <div className="task-controls">
              <div className="search-input">
                <input
                  type="text"
                  placeholder="Search tasks"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="sort-controls">
                <select value={selectedSortOption} onChange={handleSortOptionChange}>
                  <option value="date">Sort by Date</option>
                  <option value="alphabetical">Sort Alphabetically</option>
                </select>
                <button className="sort-button" onClick={handleSort}>
                  Sort
                </button>
              </div>
            </div>
          <ul className="task-list"> {/* this section shows the list of available tasks */}
          {filteredTasks.map((task, index) => (
          <li className="task-item" key={index}>
              <div className="task-info">
              <React.Fragment>
                <span>Task Name: {task.taskName}</span>
                <span>Description: {task.task_Desc}</span>
                <span>Deadline: {task.taskDate}</span>
                <span>Customer Name: {task.customerName}</span>
              </React.Fragment>
            </div>


              <div className="task-actions">
              <button className="edit-button" onClick={() => enterEditMode(index)}>
                Edit
              </button>
                {confirmDeleteIndex === index ? (
                  <div>
                    <button className="confirm-button" onClick={() => removeTask(index)}>
                      Confirm
                    </button>
                    <button className="cancel-button" onClick={cancelDelete}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button className="remove-button" onClick={() => removeTask(index)}>
                    Remove
                  </button>
                )}
              </div>
            </li>
          ))}
          </ul>
        </div>
      </div>
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
        contentLabel="Add Task Modal"
        className="edit2-modal"
      >
        <div className="edit-user-form">
          <h3>Add Task</h3>
          <label>Task Name:</label>
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
          <label>Task Description:</label>
          <input
            type="text"
            value={newTaskDesc}
            onChange={(e) => setNewTaskDesc(e.target.value)}
          />
          <label>Task Date:</label>
          <input
            type="date"
            value={newTaskDate}
            onChange={(e) => setNewTaskDate(e.target.value)}
          />
          <label>Customer Name:</label>
          <input
            type="text"
            value={newCustomerName}
            onChange={(e) => setNewCustomerName(e.target.value)}
          />
          <button className="add-button" onClick={addTask}>
            Add Task
          </button>
          <button className="cancel-btn" onClick={closeAddModal}>
            Cancel
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Task Modal"
        className="edit2-modal"
      >
        <div className="edit-user-form">
          <h3>Edit Task</h3>
          <label>Task Name:</label>
          <input
            type="text"
            value={editedTaskDetails.name}
            onChange={(e) => setEditedTaskDetails({ ...editedTaskDetails, name: e.target.value })}
          />
          <label>Task Description:</label>
          <input
            type="text"
            value={editedTaskDetails.description}
            onChange={(e) => setEditedTaskDetails({ ...editedTaskDetails, description: e.target.value })}
          />
          <label>Task Date:</label>
          <input
            type="date"
            value={editedTaskDetails.date}
            onChange={(e) => setEditedTaskDetails({ ...editedTaskDetails, date: e.target.value })}
          />
          <label>Customer Name:</label>
          <input
            type="text"
            value={editedTaskDetails.customerName}
            onChange={(e) => setEditedTaskDetails({ ...editedTaskDetails, customerName: e.target.value })}
          />
          <button className="save-button" onClick={() => saveTask(editingIndex)}>
            Save
          </button>
          <button className="cancel-button" onClick={closeEditModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Dashboard;
