// eslint-disable-next-line react/prop-types
const Progress = ({ current }) => {
  const progress = (current / 3) * 100; //progress of where the user is in the flow base on %

  return (
    <div style={{ width: '100%', marginBottom: '20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>Step {current} of 3</span> <span>{progress.toFixed(0)}%</span>
      </div>
      <div
        className="progress-bar-container"
        style={{ width: '100%', height: '10px', background: '#blue' }}
      >
        <div
          className="progress-bar"
          style={{
            width: `${progress}%`,
            height: '100%',
            background: '#4caf50',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
    </div>
  );
};

export default Progress;
