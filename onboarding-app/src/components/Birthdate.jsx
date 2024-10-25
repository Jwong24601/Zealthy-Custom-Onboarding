//Birthdate Component

// eslint-disable-next-line react/prop-types
const Birthdate = ({ birthdate, setBirthdate }) => {
  return (
    <div>
      <div className="birthdate-box">
        <div>
          <label>Birthdate</label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Birthdate;
