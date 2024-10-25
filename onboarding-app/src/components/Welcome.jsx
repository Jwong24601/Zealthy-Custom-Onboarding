import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Progress from './Progress';

const Welcome = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  //check if user is still in session and redirects to where they left off
  useEffect(() => {
    const getSession = async () => {
      try {
        const responseState = await fetch('http://localhost:3000/admin/state');
        const data = await responseState.json();
        if (data.email) {
          const responseUser = await fetch(
            `http://localhost:3000/users/${data.email}`
          );
          const d = await responseUser.json();
          if (d.progress === 1) navigate('/2');
          if (d.progress === 2) navigate('/3');
        }
      } catch (err) {
        console.log('Failed:', err);
      }
    };
    getSession();
  }, [navigate]);

  //Creates User, only proceeds if both fields are fill and user is not in database
  const handleClick = async () => {
    if (email && password) {
      try {
        const data = { email, password };
        const response = await fetch('http://localhost:3000/users/onboard', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (response.status === 201) navigate('/2');
        else if (response.status === 409) alert('User already exists');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <Progress current={1} />
      <h2>{'User Onboarding'}</h2>
      <div className="login-box">
        <div>
          <label>
            Email
            <br></br>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <br></br>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <button id="onboard-button" onClick={handleClick}>
          Onboard
        </button>
      </div>
    </div>
  );
};

export default Welcome;
