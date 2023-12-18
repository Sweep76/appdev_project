import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from 'react-modal'; // Import the Modal component
import './AdminPage.css';

Modal.setAppElement('#root'); // Set the root element for accessibility

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editedEmail, setEditedEmail] = useState('');
  const [editedUsername, setEditedUsername] = useState('');
  const [editedPassword, setEditedPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    Axios.get('http://localhost:3002/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const openModal = (userId) => {
    setEditUserId(userId);

    const selectedUser = users.find((user) => user.id === userId);

    setEditedEmail(selectedUser.email);
    setEditedUsername(selectedUser.username);
    setEditedPassword(selectedUser.password);

    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditUserId(null);
    setEditedEmail('');
    setEditedUsername('');
    setEditedPassword('');
  };

  const saveEdit = () => {
    Axios.put(`http://localhost:3002/users/${editUserId}`, {
      email: editedEmail,
      username: editedUsername,
      password: editedPassword,
    })
      .then((response) => {
        console.log('User updated successfully:', response.data);
        // Update the local state with the updated user data
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === editUserId
              ? { ...user, email: editedEmail, username: editedUsername, password: editedPassword }
              : user
          )
        );
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      })
      .finally(() => {
        closeModal();
      });
  };

  const handleDelete = (userId) => {
    Axios.delete(`http://localhost:3002/users/${userId}`)
      .then((response) => {
        console.log('User deleted successfully:', response.data);
        // Update the local state by removing the deleted user
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div className="admin-page">
      <h2>User Management</h2>
      <Link to="/">Logout</Link>
      <a href='/admintask'> || Tasks</a>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>
                <button className="edit-btn" onClick={() => openModal(user.id)}>
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Editing User Credentials */}

    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Edit User Modal"
      className="edit-modal"
    >
      <div className="edit-user-form">
        <h3>Edit User</h3>
        <label>Email:</label>
        <input
          type="text"
          value={editedEmail}
          onChange={(e) => setEditedEmail(e.target.value)}
        />
        <label>Username:</label>
        <input
          type="text"
          value={editedUsername}
          onChange={(e) => setEditedUsername(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="text"
          value={editedPassword}
          onChange={(e) => setEditedPassword(e.target.value)}
        />
        <div className="button-group">
          <button className="save-btn" onClick={saveEdit}>
            Save
          </button>
          <button className="cancel-btn" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>

    </div>
  );
};

export default AdminPage;