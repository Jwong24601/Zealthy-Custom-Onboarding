//Section 3 Data Table
import { useEffect, useState } from 'react';

const Data = () => {
  const [userData, setUserData] = useState([]);
  //fetches all the users from database
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);
  //Renders the table
  return (
    <div>
      <h2>User Data</h2>
      {userData.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>Email</th>
              <th>Birthdate</th>
              <th>Address</th>
              <th>About Me</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td>{user.aboutMe || 'N/A'}</td>
                <td>
                  {user.address
                    ? `${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.zip}`
                    : 'N/A'}
                </td>
                <td>{user.birthdate || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default Data;
