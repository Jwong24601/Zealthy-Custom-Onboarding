import { useState, useEffect } from 'react';
import Progress from './Progress';
import AboutMe from './AboutMe';
import Address from './Address';
import Birthdate from './Birthdate';
// import { useNavigate } from 'react-router-dom'; No need if not navigating to another page after done.

const Three = () => {
  //const navigate = useNavigate(); No need if not navigating to another page after done.
  const [state, setState] = useState([]); //component configuration for page
  const [id, setId] = useState();
  const [user, setUser] = useState('');

  // State to hold the data from the components
  const [birthdate, setBirthdate] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });
  const [aboutMe, setAboutMe] = useState('');
  //render the components from admin
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
  //Check the configurations and sets default if none
  useEffect(() => {
    const getState = async () => {
      try {
        const response = await fetch('http://localhost:3000/admin/state');
        const data = await response.json();
        if (!data) setState(['aboutMe']);
        else {
          setId(data._id);
          setUser(data.email);
          setState(data.page3Components || []);
        }
      } catch (err) {
        console.log('Failed:', err);
      }
    };
    getState();
  }, []);
  //Submits User data to database
  const handleClick = async () => {
    const userData = { progress: 3 };
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
      console.log(userData);
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
      alert('Onboarding Complete');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Progress current={3} />
      <h2>{'User Onboarding'}</h2>
      {state.length === 0 ? (
        <p>Loading components...</p> // Show loading text while fetching data
      ) : (
        state.map((comp) => renderComponent(comp))
      )}

      <button id="submit-button" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};

export default Three;
