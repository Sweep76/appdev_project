// AdminPage.jsx
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'
import './AdminPage.css'; // Import the CSS file

const AdminPage = () => {
  const [users, setUsers] = useState([]);

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
    console.log('Editing user with ID:', userId);
  };

  const handleDelete = (userId) => {
    console.log('Deleting user with ID:', userId);
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
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(user.id)}>
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
    </div>
  );
};

export default AdminPage;
