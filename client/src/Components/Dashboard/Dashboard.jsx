/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../../Dashboard.css';
import '../../App.scss';
import { Link, NavLink } from 'react-router-dom';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // Initialize tasks from localStorage or an empty array
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState('');
  const [taskDeadlines, setTaskDeadlines] = useState([]);
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // Default to ascending order
  const [selectedSortOption, setSelectedSortOption] = useState('date'); // Default to sorting by date

  const addTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setNewTask('');
      setTaskDeadlines([...taskDeadlines, null]);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      localStorage.setItem('taskDeadlines', JSON.stringify([...taskDeadlines, null]));
    }
  };

  const removeTask = (index) => {
    if (confirmDeleteIndex === index) {
      const updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
      const updatedDeadlines = [...taskDeadlines];
      updatedDeadlines.splice(index, 1);
      setTaskDeadlines(updatedDeadlines);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      localStorage.setItem('taskDeadlines', JSON.stringify(updatedDeadlines));
      setConfirmDeleteIndex(null);
    } else {
      setConfirmDeleteIndex(index);
    }
  };

  const cancelDelete = () => {
    setConfirmDeleteIndex(null);
  };

  const enterEditMode = (index) => {
    setEditingIndex(index);
    setEditedTask(tasks[index]);
  };

  const saveTask = (index) => {
    if (editedTask.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[index] = editedTask;
      setTasks(updatedTasks);
      setEditingIndex(null);
      setEditedTask('');
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
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
    task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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
            <h3>Welcome!</h3>
            <NavLink to="/" onClick={() => setIsSidebarOpen(false)}>
              Logout
            </NavLink>
          </div>
        )}
        <h1>Modern Foliage Taskify</h1>
        <center>
        {/* <p>Please input the calendar date and task name first before using the sort function</p> */}
        </center>
          <div className="task-input">
            <input
              type="text"
              placeholder="Add a new task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button className="add-button" onClick={addTask}>Add Task</button>
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
          <ul className="task-list">
          {filteredTasks.map((task, index) => (
            <li className="task-item" key={index}>
              <div className="task-info">
                <div>
                  {editingIndex === index ? (
                    <textarea
                      rows="4"
                      value={editedTask}
                      onChange={(e) => setEditedTask(e.target.value)}
                    />
                  ) : (
                    <span>{task}</span>
                  )}
                </div>
                <div>
                  <input
                    type="date"
                    value={taskDeadlines[index] || ''}
                    onChange={(e) => setDeadline(index, e.target.value)}
                  />
                </div>
              </div>
              <div className="task-actions">
                {editingIndex !== index ? (
                  <button className="edit-button" onClick={() => enterEditMode(index)}>
                    Edit
                  </button>
                ) : (
                  <>
                    <button className="save-button" onClick={() => saveTask(index)}>
                      Save
                    </button>
                    <button
                      className="cancel-button"
                      onClick={() => setEditingIndex(null)}
                    >
                      Cancel
                    </button>
                  </>
                )}
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
    </div>
  );
}

export default Dashboard;
