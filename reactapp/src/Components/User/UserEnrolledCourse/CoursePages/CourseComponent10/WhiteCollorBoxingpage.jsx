import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logo from './logo1.png';
import  BoxingFundamentals from './amateur-boxers-fight-during-an-ultimate-white-collar-boxing-competition-G5YADD.jpg';
import FitnessandConditioning from './pexels-photo-1954524.jpeg';
import  SparringandPartnerWork from './istockphoto-481686206-612x612.jpg';
import StrategyandTactics from './i1080x475.jpg';
import  MentalPreparation  from './andrew-ward-1.jpg';
import   SafetyandInjuryPrevention from './boxing-injuries.jpg';
import  'react-bootstrap';
import './Coursepage10.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// import sss from './boxinglogo.png';

const ProgressBar10 = () => {
  const [progress, setProgress] = useState(0);
  const [progressid,setProgressId] = useState(0);
  const [status,setStatus] = useState('');
  const {Id,courseId} = useParams();
  
  let courseid = courseId;
   const id = Id;

  useEffect(() => {
    // Retrieve previous progress from the backend
    const isFirstRender = localStorage.getItem(`isFirstRender${courseid}`) === null;

    if (isFirstRender) {
      localStorage.setItem(`isFirstRender${courseid}`, 'true');
    }

      if (!isFirstRender) {
        const fetchPreviousProgress = async () => {
          try {
            const response = await axios.get(`https://8080-cfaccffccfbbaecebadafdecbf.project.examly.io/user/viewStatus11?userid=${id}&courseid=${courseId}`);
            const previousProgress = parseInt(response.data.progressPercentage);
            const progressid = response.data.progressId;
            setStatus(response.data.status);
            setProgress(previousProgress);
            setProgressId(progressid)
          } catch (error) {
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
        await axios.post(`https://8080-cfaccffccfbbaecebadafdecbf.project.examly.io/user/viewstatusby?progresspercentage=${progress}&userid=${id}&courseid=${courseid}`);
      } else {
        await axios.put(`https://8080-cfaccffccfbbaecebadafdecbf.project.examly.io/user/updatestatus/${progressid}?progressPercentage=${progress}`);
      }
    } catch (error) {
      toast.error(error);
    }
  };




  return (
    <><div>
      <ToastContainer/>
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
              margin: '1%'
            }}
          ><center></center></div><div style={{ justifySelf: 'center', padding: '15%', marginLeft: '10px' }}><strong>{progress}%</strong></div></div>
      </div>
      <div>
        <div style={{  height: '40px', backgroundColor: '#27b92b', marginTop: '0px', width: '100%' }}>
          <center><h4 style={{ color: 'yellow' }}>Status : {status}</h4></center></div>
      </div>
      <div style={{ flex: '1', overflowY: 'auto' }}>

        <div className='Ske10'>
          <div className='titleMain10' style={{ marginLeft: '1%', }}><img width={125} height={80} src={logo} alt='Logo' /></div>
          <div className='Sty10'>white collor Boxing</div>
        </div>
        <div className='rrr10' style={{ width: '100', height: '100' }}>
          <div className='BoxingQuote'>

            <span>"In Boxing Ring of life</span>
            <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;its not about</span></span>
            <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;How hard you hit,</span></span>
            <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;But many times you can get hit</span></span>
            <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;and keep going."</span></span>

          </div>
        </div>
        <div className='decorate'>
          <div></div>
        </div>
        <div className='Description'>
          <h2>About the Course</h2>
          <p style={{ textAlign: 'center', fontSize: '25px' }}><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This course is designed for beginners and focuses on teaching the fundamental
            techniques and principles of boxing.</strong>
          </p>
          <div className='Description1'>
            <div>The course provides the following :</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', paddingLeft: '50px', fontWeight:'bold'}}>
              <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp; Boxing Fundamentals</div>
              <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp; Fitness and Conditioning</div>
              <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp; Sparring and PartnerWork</div>
              <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp; Strategy and Tactics</div>
              <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp; Mental Preparation</div>
              <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp; Safety and Injury Prevention</div>

            </div>
          </div>
        </div>
        <div style={{ alignItems: 'center' ,fontFamily:'-moz-initial'}}>
          <div>
            <h3><u>BoxingFundamentals</u>:-</h3>
            <div className='stance' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
              <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}> These courses cover the basic techniques and skills of boxing, including stance, footwork, punches (jabs, crosses, hooks, uppercuts), defensive maneuvers (blocks, slips, rolls), and combinations.</p>
              <img style={{ width: '250px', height: '250px', border: '5px', borderColor: 'black' }} src={BoxingFundamentals} alt='amateur-boxers-fight-during-an-ultimate-white-collar-boxing-competition-G5YADD.jpg' />
            </div>
          </div>
          <div>
            <h3><u> Fitness and Conditioning</u>:-</h3>
            <div className='footwork' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
              <img style={{ width: '250px', height: '250px' }} src={FitnessandConditioning} alt='img' />
              <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>White-collar boxing training places a significant emphasis on physical fitness and conditioning. Courses often include various exercises and workouts to improve strength, endurance, agility, speed, and overall fitness levels. This may involve cardio exercises, circuit training, skipping rope, shadow boxing, bag work, and pad work.</p>
            </div>
          </div>
          <div>
            <h3><u>Sparring and Partnerwork</u>:-</h3>
            <div className='jab' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
              <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' ,paddingLeft:'5px'}}>As participants progress in their training, they may have opportunities to engage in controlled sparring sessions or partner work. This allows individuals to practice their skills in a supervised environment with other participants.</p>
              <img style={{ width: '250px', height: '250px' }} src={SparringandPartnerWork} alt='istockphoto-481686206-612x612.jpg' />
            </div>
          </div>
          <div>
            <h3><u>Strategy and Tactics (Straight Right/Left)</u>:-</h3>
            <div className='cross' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
              <img style={{ width: '250px', height: '250px' }} src={StrategyandTactics} alt='i1080x475.jpg' />
              <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}> Boxingstrategy and fight tactics to help you win inside the ring. As you become more conditioned and skillful in the art of boxing, strategy becomes the final step for defeating opponents. Strategy is the blueprint for winning while training and technique are the goals and preparation.</p>
            </div>
          </div>
          <div>
            <h3><u>Mental Preparation</u>:-</h3>
            <div className='hook' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
              <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>Mental preparation is a complex psychological construct, but can be identified in boxing as the training of personality traits, psychological factors and habits – attention, concentration, self-esteem and self-confidence, courage, focus, analytical skills, decision making, endurance, positive attitude, resilience, motivation, among others – that boxers use as a strategy to cope and optimize their performance to win the fight.</p>
              <img style={{ width: '250px', height: '250px' }} src={MentalPreparation} alt='andrew-ward-1.jpg' />
            </div>
          </div>
          <div>
            <h3><u>Safety and Injury Prevention</u>:-</h3>
            <div className='uppercut' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
              <img style={{ width: '250px', height: '250px' }} src={SafetyandInjuryPrevention} alt='boxing-injuries.jpg' />
              <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' ,paddingLeft:'5px'}}>White-collar boxing courses prioritize safety and injury prevention. Instructors emphasize proper technique, protective gear usage (such as gloves, mouthguards, and headgear), and adherence to rules and regulations..</p>
            </div>
          </div>
          <div style={{ borderRadius: '25px' }}>
            <div style={{ paddingBottom: '30px' }}>
              <div>
              </div>
            </div>
          </div>
        </div>
        
        <div className='sk' style={{ padding: '30px' }}>
        </div>
      </div>
    </div></>
      )
      }
export default ProgressBar10;