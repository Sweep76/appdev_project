/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AdminTask = () => {
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState('');
  const [editedTaskDate, setEditedTaskDate] = useState('');
  const [editedTaskDesc, setEditedTaskDesc] = useState('');
  const [editedCustomerName, setEditedCustomerName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch tasks from the server when the component mounts
    Axios.get('http://localhost:3002/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const openModal = (taskId) => {
    setEditTaskId(taskId);

    const selectedTask = tasks.find((task) => task.taskID === taskId);

    setEditedTaskName(selectedTask.taskName);
    setEditedTaskDate(selectedTask.taskDate);
    setEditedTaskDesc(selectedTask.task_Desc);
    setEditedCustomerName(selectedTask.customerName);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditTaskId(null);
    setEditedTaskName('');
    setEditedTaskDate('');
    setEditedTaskDesc('');
    setEditedCustomerName('');
  };

  const saveEdit = () => {
    Axios.put(`http://localhost:3002/tasks/${editTaskId}`, {
      taskName: editedTaskName,
      taskDate: editedTaskDate,
      task_Desc: editedTaskDesc,
      customerName: editedCustomerName,
    })
      .then((response) => {
        console.log('Task updated successfully:', response.data);
        // Update the local state with the updated task data
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.taskID === editTaskId
              ? {
                  ...task,
                  taskName: editedTaskName,
                  taskDate: editedTaskDate,
                  task_Desc: editedTaskDesc,
                  customerName: editedCustomerName,
                }
              : task
          )
        );
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      })
      .finally(() => {
        closeModal();
      });
  };

  const handleDelete = (taskId) => {
    Axios.delete(`http://localhost:3002/tasks/${taskId}`)
      .then((response) => {
        console.log('Task deleted successfully:', response.data);
        setTasks((prevTasks) => prevTasks.filter((task) => task.taskID !== taskId));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  return (
    <div className="admin-task-page">
      <h2>Task Management</h2>
      <Link to="/">Logout</Link>
      <a href='/admin'> || Users</a>
      <table className="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Task Name</th>
            <th>Task Date</th>
            <th>Task Description</th>
            <th>Customer Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.taskID}>
              <td>{task.taskID}</td>
              <td>{task.taskName}</td>
              <td>{task.taskDate}</td>
              <td>{task.task_Desc}</td>
              <td>{task.customerName}</td>
              <td>
                <button className="edit-btn" onClick={() => openModal(task.taskID)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(task.taskID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Editing Task Information */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Task Modal"
        className="edit2-modal"
      >
        <div className="edit-user-form">
          <h3>Edit Task</h3>
          <label>Task Name:</label>
          <input
            type="text"
            value={editedTaskName}
            onChange={(e) => setEditedTaskName(e.target.value)}
          />
          <label>Task Date:</label>
          <input
            type="date"
            value={editedTaskDate}
            onChange={(e) => setEditedTaskDate(e.target.value)}
          />
          <label>Task Description:</label>
          <input
            type="text"
            value={editedTaskDesc}
            onChange={(e) => setEditedTaskDesc(e.target.value)}
          />
          <label>Customer Name:</label>
          <input
            type="text"
            value={editedCustomerName}
            onChange={(e) => setEditedCustomerName(e.target.value)}
          />
          <button className="save-btn" onClick={saveEdit}>
            Save
          </button>
          <button className="cancel-btn" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminTask;
