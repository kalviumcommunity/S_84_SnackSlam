import { useState, useEffect } from "react";

const UserDropdown = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://s-84-snackslam.onrender.com/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <select onChange={(e) => onSelectUser(e.target.value)}>
      <option value="">Select a user</option>
      {users.map((user) => (
        <option key={user.id} value={user.id}>{user.name}</option>
      ))}
    </select>
  );
};

export default UserDropdown;
