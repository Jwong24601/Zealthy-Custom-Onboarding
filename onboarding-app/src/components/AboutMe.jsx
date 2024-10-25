//About Me component

// eslint-disable-next-line react/prop-types
const AboutMe = ({ aboutMe, setAboutMe }) => {
  return (
    <div>
      <div className="about-box">
        <label>About Me</label>
        <textarea
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
          placeholder="Tell Us About You"
        />
      </div>
    </div>
  );
};

export default AboutMe;
