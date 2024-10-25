import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Progress from './Progress';
import AboutMe from './AboutMe';
import Address from './Address';
import Birthdate from './Birthdate';

const Two = () => {
  const navigate = useNavigate();
  const [state, setState] = useState([]);
  const [id, setId] = useState();
  const [user, setUser] = useState('');

  // States to hold the data from the components
  const [birthdate, setBirthdate] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });
  const [aboutMe, setAboutMe] = useState('');

  //render the component chosen by Admin
  const renderComponent = (component) => {
    switch (component) {
      case 'birthdate':
        return (
          <Birthdate
            key={'b' + id}
            birthdate={birthdate}
            setBirthdate={setBirthdate}
          />
        );
      case 'address':
        return (
          <Address key={'add' + id} address={address} setAddress={setAddress} />
        );
      case 'aboutMe':
        return (
          <AboutMe key={'ab' + id} aboutMe={aboutMe} setAboutMe={setAboutMe} />
        );
      default:
        return null;
    }
  };
  //Checks the state of the components and sets default if there is none
  useEffect(() => {
    const getState = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/state');
        const data = await response.json();
        if (!data) setState(['birthdate', 'address']);
        else {
          setId(data._id);
          setUser(data.email);
          setState(data.page2Components || []);
        }
      } catch (err) {
        console.log('Failed:', err);
      }
    };
    getState();
  }, []);
  //Updates the components of the user and if no errors, goes to next page.
  const handleClick = async () => {
    const userData = { progress: 2 };
    state.forEach((comp) => {
      switch (comp) {
        case 'aboutMe':
          userData.aboutMe = aboutMe;
          break;
        case 'address':
          userData.address = address;
          break;
        case 'birthdate':
          userData.birthdate = birthdate;
          break;
        default:
          break;
      }
    });
    try {
      const response = await fetch(
        `http://localhost:3000/users/update/${user}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      // Navigate to Step 3
      navigate('/3');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Progress current={2} />
      <h2>{'User Onboarding'}</h2>
      {state.length === 0 ? (
        <p>Loading components...</p> // Show loading text while fetching data
      ) : (
        state.map((comp) => renderComponent(comp))
      )}

      <button id="next-button" onClick={handleClick}>
        Next
      </button>
    </div>
  );
};

export default Two;
