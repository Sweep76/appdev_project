// AdminPage.jsx
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editedEmail, setEditedEmail] = useState('');
  const [editedUsername, setEditedUsername] = useState('');

  useEffect(() => {
    Axios.get('http://localhost:3002/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleEdit = (userId) => {
    setEditUserId(userId);

    const selectedUser = users.find((user) => user.id === userId);

    setEditedEmail(selectedUser.email);
    setEditedUsername(selectedUser.username);
  };

  const saveEdit = () => {
    console.log('Editing user with ID:', editUserId);
    console.log('New email:', editedEmail);
    console.log('New username:', editedUsername);

    Axios.put(`http://localhost:3002/users/${editUserId}`, {
      email: editedEmail,
      username: editedUsername,
    })
      .then((response) => {
        console.log('User updated successfully:', response.data);
        // Update the local state with the updated user data
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === editUserId
              ? { ...user, email: editedEmail, username: editedUsername }
              : user
          )
        );
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      })
      .finally(() => {
        setEditUserId(null);
        setEditedEmail('');
        setEditedUsername('');
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
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editUserId === user.id ? (
                  <input
                    type="text"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editUserId === user.id ? (
                  <input
                    type="text"
                    value={editedUsername}
                    onChange={(e) => setEditedUsername(e.target.value)}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {editUserId === user.id ? (
                  <button onClick={saveEdit}>Save</button>
                ) : (
                  <>
                    <button className="edit-btn" onClick={() => handleEdit(user.id)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
