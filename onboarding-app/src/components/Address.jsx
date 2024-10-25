/* eslint-disable react/prop-types */
//Address component

const Address = ({ address, setAddress }) => {
  return (
    <div>
      <h2>{'User Onboarding'}</h2>
      <form>
        <div className="address-box">
          <div>
            <label>Address</label>
            <input
              type="text"
              value={address.street}
              onChange={(e) =>
                setAddress({
                  ...address,
                  street: e.target.value,
                })
              }
              placeholder="Street Address"
            />
            <input
              type="text"
              value={address.city}
              onChange={(e) =>
                setAddress({
                  ...address,
                  city: e.target.value,
                })
              }
              placeholder="City"
            />
            <input
              type="text"
              value={address.state}
              onChange={(e) =>
                setAddress({
                  ...address,
                  state: e.target.value,
                })
              }
              placeholder="State"
            />
            <input
              type="text"
              value={address.zip}
              onChange={(e) =>
                setAddress({
                  ...address,
                  zip: e.target.value,
                })
              }
              placeholder="Zip"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Address;
