import React, { useState, useRef } from 'react';

import './App.css';

const styles = {
  body: {
    backgroundColor: "#F2CC8F",
    fontFamily: "'Comfortaa', cursive"
  },
  button: {
    margin: '0 20px',
    width: '550px',
    height: '35px',
    border: 'none',
    color: 'white',
    backgroundColor: '#81B29A',
    borderRadius: '5px',
    fontFamily: `'Comfortaa', cursive`
  },
  "button:hover": {
    backgroundColor: "red"
  },
  container: {
    color: 'white',
    width: "600px",
    borderRadius: '10px',
    margin: "100px auto",
    backgroundColor: "#F2CC8F",
    textAlign: 'center',
    padding: '10px 0 20px 0',
    fontFamily: `'Comfortaa', cursive`, 
    border: "3px solid white",
    boxShadow: "0px 0px 22px 0px rgba(255,255,255,0.58)"
  }, 
  h2: {
    padding: '0 0 20px 0',
    color: 'white',
    fontSize: "27px",
    borderBottom: "2px solid #81B29A"
  },
  time: {
    fontSize: '30px',
    fontWeight: 'bold', 
    margin: '10px 0 15px 0',
  },
  timeCounter: {
    width: "40px",
    backgroundColor: "red"
  },
  buttons: {
    margin: '0 auto',
    width: '60%',
    display: 'flex',
    justifyContent: 'space-around', 
  },
  reset: {
    margin: '20px 0 0 0',
    fontSize: '20px',
    width: '130px',
    height: '35px',
    border: 'none',
    color: 'white',
    backgroundColor: "#81B29A",
    borderRadius: '5px',
    fontFamily: `'Comfortaa', cursive`
  }
}

const App = () => {
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const increment = useRef(null);

  let firstClick = null; 
  let secondClick = null;
  let difference = null;

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(true)
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const handlePause = () => {
    if(firstClick === null){
      firstClick = new Date().getMilliseconds();
    } else if (firstClick && secondClick === null){
      secondClick = new Date().getMilliseconds();
    } 
    difference = Math.abs(secondClick - firstClick);
    if(difference < 300){
      firstClick = null;
      secondClick = null;
      difference = null;
      clearInterval(increment.current)
      setIsPaused(false)
    }
  }
  const handleResume = () => {
    setIsPaused(true)
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1)
    }, 1000)
  }

  const handleReset = () => {
    clearInterval(increment.current)
    setIsActive(false)
    setIsPaused(false)
    setTimer(0)
  }

  const handleResetResume = () => {
    setTimer(0);
  }

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2); 
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return (<div>
      <span style={{width: "30px"}}>{getHours}</span> : <span style={{width: "red"}}>{getMinutes}</span> : <span style={{width: "30px"}}>{getSeconds}</span>
    </div>)
  }

  return (
    <div className="container" style = {styles.container}>
      <h2 style={styles.h2}>REACT STOPWATCH</h2>
      <div className='stopwatch-card'>
        <p style={styles.time}>{formatTime()}</p>
        <div className='buttons' style={styles.buttons}>
          {
            !isActive && !isPaused ?
              <button onClick={handleStart} style={styles.button} disabled={isActive}>START</button>
              : (
                isPaused ? <button onClick={handlePause} style={styles.button}>WAIT</button> :
                  <button onClick={handleResume} style={styles.button}>START</button>
              )
          }
          <button onClick={handleReset} disabled={!isActive} style={styles.button}>STOP</button>
        </div>
        <button onClick={handleResetResume} style={styles.reset}>RESET</button>
      </div>
    </div>
  );
}

export default App;