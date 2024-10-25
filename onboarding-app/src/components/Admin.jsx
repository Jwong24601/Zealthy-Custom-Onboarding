//Section 2 Admin
import { useState, useEffect } from 'react';

const Admin = () => {
  const components = ['birthdate', 'address', 'aboutMe'];
  const [page2Components, setPage2] = useState(['birthdate', 'address']);
  const [page3Components, setPage3] = useState(['aboutMe']);

  //Fetch current configuration on load
  useEffect(() => {
    const getState = async () => {
      const response = await fetch('http://localhost:3000/admin/state');
      const data = await response.json();
      if (data) {
        setPage2(data.page2Components || []);
        setPage3(data.page3Components || []);
      }
    };
    getState();
  }, []);

  //Toggle component inclusion for a given page
  const handleCheckboxChange = (component, page, setPage) => {
    setPage(
      (prev) =>
        prev.includes(component)
          ? prev.filter((c) => c !== component) // Remove if already selected
          : [...prev, component] // Add if not selected
    );
  };
  //Updates the state of configuration and saves to database
  const handleSave = async () => {
    try {
      const data = { page2Components, page3Components };
      const response = await fetch('http://localhost:3000/admin/state', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.status === 200) alert('Configuration Saved!');
    } catch (err) {
      console.log(err);
    }
  };
  //Renders checkboxes for each component and for each page
  return (
    <div>
      <h2>Admin Configuration</h2>
      <div>
        <h3>Page 2 Components</h3>
        {components.map((component) => (
          <div key={component}>
            <input
              type="checkbox"
              id={`page2-${component}`}
              checked={page2Components.includes(component)}
              onChange={() =>
                handleCheckboxChange(component, page2Components, setPage2)
              }
            />
            <label htmlFor={`page2-${component}`}>{component}</label>
          </div>
        ))}
      </div>
      <div>
        <h3>Page 3 Components</h3>
        {components.map((component) => (
          <div key={component}>
            <input
              type="checkbox"
              id={`page3-${component}`}
              checked={page3Components.includes(component)}
              onChange={() =>
                handleCheckboxChange(component, page3Components, setPage3)
              }
            />
            <label htmlFor={`page3-${component}`}>{component}</label>
          </div>
        ))}
      </div>
      <button onClick={handleSave}>Save Configuration</button>
    </div>
  );
};

export default Admin;
