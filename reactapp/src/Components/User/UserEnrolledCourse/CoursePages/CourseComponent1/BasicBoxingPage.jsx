import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sss from './boxinglogo.png';
import stance from './stance.jpg';
import footwork from './footwork.jpg';
import jab from './Jab.jpg';
import cross from './cross.jpg';
import hook from './hook.jpg';
import uppercut from './uppercut.jpg';
import defense from './defense.jpg';
import combinations from './combinations.jpg';
import conditioning from './conditioning.jpg';
import boxingring from './boxingring.jpg';
import './Coursepage1.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const ProgressBar1 = () => {
  const [progress, setProgress] = useState(0);
  const [progressid,setProgressId] = useState(0);
  const [status,setStatus] = useState('');
  const {Id,courseId} = useParams();
  
  let courseid = courseId;
   const id = Id;

  useEffect(() => {
    
    const isFirstRender = localStorage.getItem(`isFirstRender${courseid}`) === null;
    // checks whether the page renders first time or not
      if (isFirstRender) {
        localStorage.setItem(`isFirstRender${courseid}`, 'true');
      }

      if (!isFirstRender) {
        // Retrieve previous progress from the backend
        const fetchPreviousProgress = async () => {
          try {
            const response = await axios.get(`https://8080-bcebafddeedfbbaecebadafdecbf.project.examly.io/user/viewStatus11?userid=${id}&courseid=${courseId}`);
            const previousProgress = parseInt(response.data.progressPercentage);
            const progressid = response.data.progressId;
            setStatus(response.data.status);
            setProgress(previousProgress);
            setProgressId(progressid)
          } 
          catch (error) {
          toast.error("An error occured please try again");
          }
        };
  
        fetchPreviousProgress();
      }

      const timer = setInterval(() => {
        setProgress(prevProgress => {
          if (prevProgress >= 100) {
            clearInterval(timer);
            sendDataToBackend(prevProgress); // Send data to the backend when progress reaches 100
            return 100;
          }
          return prevProgress + 1;
        });
    }, 18000);//to set time accordingly
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    const handleBeforeUnload=(event)=>{
      event.preventDefault();
      sendDataToBackend(progress);// Send data to the backend when the webpage is closed or navigated away
    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    const sendDataToBackend = async progress => {
    try {
      // Make an HTTP POST or PUT request to send progress data to the backend
      if (localStorage.getItem(`isFirstRender${courseid}`) === 'true') {
        localStorage.setItem(`isFirstRender${courseid}`, 'false');
        await axios.post(`https://8080-bcebafddeedfbbaecebadafdecbf.project.examly.io/user/viewstatusby?progresspercentage=${progress}&userid=${id}&courseid=${courseid}`);
      } else {
        await axios.put(`https://8080-bcebafddeedfbbaecebadafdecbf.project.examly.io/user/updatestatus/${progressid}?progressPercentage=${progress}`);
      }
    } catch (error) {
      toast.error(error);
    }
  };



  return (
    //web page design as per our requirement
    <><div>
      <ToastContainer/>
      <div style={{ position: 'fixed', height: '10px', width: '100%' }}>

      </div>

      <div style={{ height: '40px',  width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr  .1fr', backgroundColor: '#27b92b', borderRadius: '5px' }}>
          <div
            style={{
              width: `${progress}%`,
              border: `1px solid ${progress === 100 ? '#27b92b' : 'black'} `,
              borderColor: 'black',

              borderRadius: '10PX',
              height: '20px',
              backgroundColor: 'rgb(5, 5, 142)',
              //backgroundColor: '#27b92b',
              margin: '1%'
            }}
          ><center></center></div><div style={{ justifySelf: 'center', padding: '15%', marginLeft: '10px' }}><strong>{progress}%</strong></div></div>
      </div>

      <div style={{ height: '40px', backgroundColor: '#27b92b', marginTop: '0px', width: '100%' }}>
        <center><h4 style={{ color: 'yellow' }}>Status : {status}</h4></center>
      </div>
      <div style={{ flex: '1', overflowY: 'auto' }}>
        <div className='header1'>sk1
          <div className='titleMain' style={{ marginLeft: '2%' }}><img width={130} height={80} src={sss} alt='Logo' /></div>
          <div className='Heading1'>Basic Boxing Fundamentals</div>
        </div>
        <div className='BackgroundImage1' style={{ width: '100', height: '100' }}>
          <div className='BoxingQuote1'>

            <span>"Every champion starts</span>
            <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;their story as a</span></span>
            <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;beginner,</span></span>
            <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;laying the foundation for</span></span>
            <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;their eventual trimph."</span></span>
          </div>
        </div>
        <div className='decorate1'>
          <div></div>
        </div>
        <div className='DescriptionStart'>
          <h2>About the Course</h2>
          <p style={{ textAlign: 'center', fontSize: '25px' }}><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This course is designed for beginners and focuses on teaching the fundamental
            techniques and principles of boxing.</strong>
          </p>
          <div className='Description1'>
            <div>The course provides the following :</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', paddingLeft: '50px',fontWeight:'bold' }}>
              <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Stance</div>
              <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Footwork</div>
              <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Jab</div>
              <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Cross</div>
              <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Hook</div>
              <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Uppercut</div>
              <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Defense</div>
              <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Combinations</div>
              <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Conditioning</div>
              <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Ring Awareness</div>
            </div>
          </div>
        </div>
        <div style={{ alignItems: 'center', fontFamily: '-moz-initial' }}>
          <div>
            <h3><u>Stance</u>:-</h3>
            <div className='stance' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
              <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>The boxing stance is a crucial aspect of the sport. A proper stance provides balance, stability, and allows for quick movement. In a basic stance, the lead foot (left foot for orthodox stance, right foot for southpaw stance) is slightly forward, with the feet shoulder-width apart. The knees are slightly bent, and the boxer's weight is distributed evenly between both legs.</p>
              <img style={{ width: '250px', height: '250px', border: '5px', borderColor: 'black' }} src={stance} alt='stance' />
            </div>
          </div>
          <div>
            <h3><u>Footwork</u>:-</h3>
            <div className='footwork' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
              <img style={{ width: '250px', height: '250px' }} src={footwork} alt='footwork img' />
              <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>Effective footwork is essential for maintaining balance, creating angles, and evading punches. Boxers should move on the balls of their feet, enabling quick pivots and smooth movement around the ring. Footwork involves stepping forward, backward, sidestepping, and shifting weight between the lead and rear foot.</p>
            </div>
          </div>
          <div>
            <h3><u>Jab</u>:-</h3>
            <div className='jab' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
              <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' ,paddingLeft:'5px'}}>The jab is the most basic and frequently used punch in boxing. It is a quick, straight punch thrown with the lead hand (left hand for orthodox stance, right hand for southpaw stance). The jab is primarily used for maintaining distance, setting up combinations, and probing the opponent's defense.</p>
              <img style={{ width: '250px', height: '250px' }} src={jab} alt='Jab_img' />
            </div>
          </div>
          <div>
            <h3><u>Cross (Straight Right/Left)</u>:-</h3>
            <div className='cross' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
              <img style={{ width: '250px', height: '250px' }} src={cross} alt='Cross_img' />
              <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>The cross is a powerful punch thrown with the rear hand (right hand for orthodox stance, left hand for southpaw stance). It is a straight punch that generates power from the rotation of the hips and shoulders. The cross is usually thrown after a jab or as a counterpunch.</p>
            </div>
          </div>
          <div>
            <h3><u>Hook</u>:-</h3>
            <div className='hook' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
              <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>The hook is a wide, looping punch thrown with a bent arm. There are two types of hooks: lead hook (thrown with the lead hand) and rear hook (thrown with the rear hand). Hooks are effective for targeting the opponent's head or body from the side.</p>
              <img style={{ width: '250px', height: '250px' }} src={hook} alt='Hook_img' />
            </div>
          </div>
          <div>
            <h3><u>Uppercut</u>:-</h3>
            <div className='uppercut' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
              <img style={{ width: '250px', height: '250px' }} src={uppercut} alt='Uppercut_img' />
              <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>The uppercut is an upward punch thrown from a bent arm position. It is delivered from close range and targets the opponent's chin or body. There are lead uppercuts and rear uppercuts, and they are effective for generating power from the legs and core.</p>
            </div>
          </div>
          <div>
            <h3><u>Defense</u>:-</h3>
            <div className='defense' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
              <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>Boxing also emphasizes effective defensive techniques. These include slipping (moving the head to evade punches), bobbing and weaving (moving the upper body to dodge punches), blocking (using the arms to absorb or deflect blows), and parrying (redirecting punches with the hands).</p>
              <img style={{ width: '250px', height: '250px' }} src={defense} alt='Defense_img' />
            </div>
          </div>
          <div>
            <h3><u>Combinations</u>:-</h3>
            <div className='combinations' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
              <img style={{ width: '250px', height: '250px' }} src={combinations} alt='Combinations_jpg' />
              <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}> Boxing relies on the strategic use of combinations, which involve chaining together different punches. Combinations can include jabs, crosses, hooks, and uppercuts in various sequences. They are used to create openings in the opponent's defense and maximize scoring opportunities.</p>
            </div>
          </div>
          <div>
            <h3><u>Conditioning</u>:-</h3>
            <div className='conditioning' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
              <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' ,paddingLeft:'5px'}}> Boxing requires excellent physical conditioning. Boxers train to develop stamina, strength, speed, and agility through various exercises such as running, skipping rope, shadowboxing, heavy bag work, pad work, and sparring.</p>
              <img style={{ width: '250px', height: '250px' }} src={conditioning} alt='Conditioning_img' />
            </div>
          </div>
          <div style={{ borderRadius: '25px' }}>
            <div style={{ paddingBottom: '30px' }}>
              <h3><u>Ring Awareness</u>:-</h3>
              <div className='boxingring' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
                <img style={{ width: '250px', height: '250px' }} src={boxingring} alt='Boxingring_img' />
                <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}> Boxers need to develop a keen sense of ring awareness, which includes understanding distance, controlling the pace of the fight, and being mindful of positioning. It involves utilizing footwork, angles, and timing to outmaneuver opponents and capitalize on opportunities.</p>
              </div>
            </div>
          </div>
        </div>
          <div className='decoImg1' style={{ padding: '30px' }}>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar1;