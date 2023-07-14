import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logo from './logo1.png';
import BeginnersBoxingTraining from './360_F_261943039_9DpNion1A4p3egNj2VwBUrl9Bj2zlyck.jpg';
import  AdvancedBoxingTraining  from './download.jpeg';
import  BoxingFitnessTraining from './download (1).jpeg';
import BoxingforWeightLoss from './X3Photos-08-min-683x1024.jpg';
import  StrengthandConditioningforBoxing  from './images.jpeg';
import   CompetitiveBoxingTraining from './6169347d429e83885946a153d6787363.jpg';
import  'react-bootstrap';
import './Coursepage12.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProgressBar12 = () => {
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
            const response = await axios.get(`https://8080-bcebafddeedfbbaecebadafdecbf.project.examly.io/user/viewStatus11?userid=${id}&courseid=${courseId}`);
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
        await axios.post(`https://8080-bcebafddeedfbbaecebadafdecbf.project.examly.io/user/viewstatusby?progresspercentage=${progress}&userid=${id}&courseid=${courseid}`);
      } else {
        await axios.put(`https://8080-bcebafddeedfbbaecebadafdecbf.project.examly.io/user/updatestatus/${progressid}?progressPercentage=${progress}`);
      }
    } catch (error) {
      toast.error(error);
    }
  };




  return (
    <>
    <ToastContainer/>
    <div>
  
        </div>
    <div  style={{height:'40px',width:'100%'}}>
    <div style={{display:'grid',gridTemplateColumns:'1.8fr  .1fr',backgroundColor:'#27b92b',borderRadius:'5px'}}>
      <div
        style={{
           width: `${progress}%`,
           border:`1px solid ${progress ===100 ? '#27b92b':'black'} `,
           borderColor:'black',
    
        borderRadius:'10PX',
          height: '20px',
          backgroundColor:'rgb(5, 5, 142)',
          margin:'1%'

        }}
      ></div><div style={{justifySelf:'center' ,padding:'15%',marginLeft:'10px'}}><strong>{progress}%</strong></div></div>
    </div>
    <div>
    <div  style={{height:'40px',backgroundColor:'#27b92b',marginTop:'0px',width:'100%'}}>
      <center><h4 style={{color:'yellow'}}>Status : {status}</h4></center></div>
     
          <div style={{ flex: '1', overflowY: 'auto' }}>

  
            <div className='Sks12' >
            <div className='titleMain12' style={{marginLeft:'1%'}}><img width={125} height={80} src={logo} alt='Logo'/></div>
            <div className='Sty12'>PERSONAL TRAINING</div>
            
            </div>
            <div className='rrr12' style={{width:'100',height:'100'}}>
                <div className='BoxingQuote'>
                    
                        <span>"Life is about</span>
                        <span style={{display: 'block',textAlign:'left'}} className="w-text-block w-text-left "><span className="w-text-content" >&nbsp;&nbsp;one choice</span></span>
                        <span style={{display: 'block',textAlign:'left'}} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;Give up,</span></span>
                        <span style={{display: 'block',textAlign:'left'}} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;or</span></span>
                        <span style={{display: 'block',textAlign:'left'}} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;Get up."</span></span>
                    
                </div>
            </div>
            <div className='decorate'>
                <div></div>
            </div>
            <div className='Description'>
                <h2>About the Course</h2>
                <p style={{textAlign:'center',fontSize:'25px'}}><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This course is designed for beginners and focuses on teaching the fundamental 
                    techniques and principles of boxing.</strong> 
                </p>
                <div className='Description1'>
                <div>The course provides the following :</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr', paddingLeft:'50px',fontWeight:'bold'}}>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp; Beginners Boxing Training</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp; Advanced Boxing Training</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp; Boxing Fitness Training</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp; Boxing for WeightLoss</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp; Strength and Conditioning for Boxing</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp; Competitive Boxing Training</div>
                </div>
                </div>
            </div>
            <div style={{alignItems:'center',fontFamily:'-moz-initial'}}>
                <div >
                    <h3><u>Beginners Boxing Training</u>:-</h3>
                    <div className='stance'style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'1.5fr .5fr'}}>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px',paddingLeft:'5px'}}>Beginners Boxing Training can be a great way to learn the fundamentals of boxing and develop your skills in a structured manner. While it's best to work with a qualified boxing coach or trainer in person, I can provide you with some general guidelines and exercises that are typically included in beginners' boxing training:.</p>
                    <img style={{width:'250px',height:'250px' ,border:'5px',borderColor:'black'}} src={BeginnersBoxingTraining} alt='360_F_261943039_9DpNion1A4p3egNj2VwBUrl9Bj2zlyck.jpg'/>
                    </div>
                </div>
                <div>
                    <h3><u> Advanced Boxing Training</u>:-</h3>
                    <div className='footwork' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'.5fr 1.5fr',paddingLeft:'50px'}}>
                    <img style={{width:'250px',height:'250px'}} src={AdvancedBoxingTraining} alt='download.jpeg'/>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px',paddingLeft:'5px'}}>Advanced boxing training builds upon the fundamentals learned in beginners' training and focuses on refining skills, developing advanced techniques, and enhancing overall performance. Here are some components often included in advanced boxing training.</p>
                    </div>
                </div>
                <div>
                    <h3><u>Boxing Fitness Training</u>:-</h3>
                    <div className='jab' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'1.5fr .5fr'}}>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px',paddingLeft:'5px'}}>Boxing fitness training, also known as boxing for fitness or boxercise, is a popular form of exercise that incorporates boxing techniques and workouts for cardiovascular fitness, strength, and overall conditioning. It provides a fun and engaging way to improve physical fitness while learning basic boxing skills. .</p>
                    <img  style={{width:'250px',height:'250px'}}  src={BoxingFitnessTraining} alt='download (1).jpeg'/>
                    </div>
                </div>
                <div> 
                    <h3><u>Boxing for WeightLoss (Straight Right/Left)</u>:-</h3>
                    <div className='cross' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'.5fr 1.5fr',paddingLeft:'50px'}}>
                        <img  style={{width:'250px',height:'250px'}}  src={BoxingforWeightLoss} alt='X3Photos-08-min-683x1024.jpg'/>
                        <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px',paddingLeft:'5px'}}>Boxing can be an effective form of exercise for weight loss due to its combination of high-intensity cardio, full-body movements, and muscle engagement. Here's how boxing can be incorporated into a weight loss program:.</p>
                    </div>
                </div>
                <div>
                    <h3><u>Strength and Conditioning forBoxing</u>:-</h3>
                    <div className='hook' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'1.5fr .5fr'}}>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px',paddingLeft:'5px'}}> This type of training focuses on improving muscular strength and endurance. It typically involves resistance exercises using weights, machines, or bodyweight exercises..</p>
                    <img  style={{width:'250px',height:'250px'}} src={StrengthandConditioningforBoxing} alt='images.jpeg'/>
                    </div>
                </div>
                <div>
                    <h3><u>Competitive Boxing Training</u>:-</h3>
                    <div className='uppercut' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'.5fr 1.5fr',paddingLeft:'50px'}}>
                        <img  style={{width:'250px',height:'250px'}} src={CompetitiveBoxingTraining} alt='6169347d429e83885946a153d6787363.jpg'/>
                        <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px',paddingLeft:'5px'}}>
                          Competitive boxing training refers to the preparation and training that individuals undergo to participate in amateur or professional boxing matches. It is a rigorous and specialized form of training that focuses on developing the skills, physical fitness, and mental discipline required for competitive boxing. Here are some key aspects of competitive boxing training:.</p>
                        <div>
                          <div>
                            <div>
                                <div>
                                    
                                </div>
                            </div>
                            </div>  

                        </div>
              </div>
           
            <div className='sk' style={{padding:'30px'}}>

            </div>
        </div>
        </div></div>
      </div>
      </>
      )
      }
      export default ProgressBar12;