import UserHome from '../../../UserNavBar/UserNav';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logo from './logo1.png';
import  BeginnersBoxingCourse from './20180422_EBNEC_GK_6851.jpg';
import AdvancedBoxingCourse from './images.jpeg';
import  BoxingFitnessCourse from './images (1).jpeg';
import TrainerCertificationCourse from './Boxercise_DSC_3799_f1.jpg';
import  RefereeJudgeCertificationCourse  from './images (3).jpeg';
import   BoxingforSelfDefenseCourse from './maxresdefault.jpg';
import  'react-bootstrap';
import './Coursepage11.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ProgressBar11 = () => {
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
    <><UserHome/>
    <ToastContainer/>
  <div>
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
          //backgroundColor: '#27b92b',
          margin:'1%'

        }}
      ><center></center></div><div style={{justifySelf:'center' ,padding:'15%',marginLeft:'10px'}}><strong>{progress}%</strong></div></div>
    </div>
    <div>
    <div  style={{height:'40px',backgroundColor:'#27b92b',marginTop:'0px',width:'100%'}}>
      <center><h4 style={{color:'yellow'}}>Status : {status}</h4></center></div>
    </div>
    <div style={{ flex: '1', overflowY: 'auto' }}>
    <div>
            <div className='Skk11' /*style={{display:'grid',gridTemplateColumns:'.5fr 1fr .5fr'}}*/>
            <div className='titleMain11' style={{marginLeft:'1%'}}><img width={125} height={80} src={logo} alt='Logo'/></div>
            <div className='Sty11'>AMATURE BOXING</div>
            </div></div>
            <div className='rrr11' style={{width:'100',height:'100'}}>
                <div className='BoxingQuote'>
                    
                        <span>"Every body has</span>
                        <span style={{display: 'block',textAlign:'left'}} className="w-text-block w-text-left "><span className="w-text-content" >&nbsp;&nbsp;a plan</span></span>
                        <span style={{display: 'block',textAlign:'left'}} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;until they get</span></span>
                        <span style={{display: 'block',textAlign:'left'}} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;punched</span></span>
                        <span style={{display: 'block',textAlign:'left'}} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;in the face."</span></span>
                    
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
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp; Beginner's Boxing Course</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp; Advanced Boxing Course</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp; Boxing Fitness Course</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp; Trainer Certification Course</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp; Reference Judge Certification Course</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp; Boxing for Self Defense Course</div>
            
                </div>
                </div>
            </div>
            <div style={{alignItems:'center',fontFamily: '-moz-initial'}}>
                <div >
                    <h3><u>Beginner's Boxing Course</u>:-</h3>
                    <div className='stance'style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'1.5fr .5fr'}}>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px',paddingLeft:'5px'}}>A Beginner's Boxing Course is designed to introduce individuals with little to no experience in boxing to the fundamentals of the sport. It focuses on developing basic skills, techniques, and conditioning necessary for boxing. .</p>
                    <img style={{width:'250px',height:'250px' ,border:'5px',borderColor:'black'}} src={BeginnersBoxingCourse} alt='20180422_EBNEC_GK_6851.jpg'/>
                    </div>
                </div>
                <div>
                    <h3><u> Advanced Boxing Course</u>:-</h3>
                    <div className='footwork' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'.5fr 1.5fr',paddingLeft:'50px'}}>
                    <img style={{width:'250px',height:'250px'}} src={AdvancedBoxingCourse} alt='images.jpeg'/>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px',paddingLeft:'5px'}}>An Advanced Boxing Course is designed for individuals who already have a solid foundation in boxing and want to further enhance their skills, techniques, and overall boxing proficiency. This course builds upon the fundamentals learned in the Beginner's Boxing Course and delves deeper into advanced aspects of the sport.</p>
                    </div>
                </div>
                <div>
                    <h3><u>Boxing Fitness Course</u>:-</h3>
                    <div className='jab' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'1.5fr .5fr'}}>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px',paddingLeft:'5px'}}>
A Boxing Fitness Course is a specialized training program that combines elements of boxing training with fitness exercises to provide a challenging and engaging workout. It is designed for individuals who are interested in the fitness benefits of boxing but may not necessarily be interested in competitive boxing..</p>
                    <img  style={{width:'250px',height:'250px'}}  src={BoxingFitnessCourse} alt='images (1).jpeg'/>
                    </div>
                </div>
                <div> 
                    <h3><u>Trainer Certification Course (Straight Right/Left)</u>:-</h3>
                    <div className='cross' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'.5fr 1.5fr',paddingLeft:'50px'}}>
                        <img  style={{width:'250px',height:'250px'}}  src={TrainerCertificationCourse} alt='Boxercise_DSC_3799_f1.jpg'/>
                        <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px',paddingLeft:'5px'}}>A Trainer Certification Course is a program designed to provide individuals with the knowledge, skills, and credentials needed to work as a professional fitness trainer or coach. These courses vary in duration, content, and accreditation, but generally cover.</p>
                    </div>
                </div>
                <div>
                    <h3><u>Reference Judge Certification Course</u>:-</h3>
                    <div className='hook' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'1.5fr .5fr'}}>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px',paddingLeft:'5px'}}>A Referee/Judge Certification Course is a program designed to train individuals to become certified referees or judges for various sports or competitions. The specific content and requirements of such a course can vary depending on the sport or organization offering the certification. However, here are some general aspects that may be covered:

.</p>
                    <img  style={{width:'250px',height:'250px'}} src={RefereeJudgeCertificationCourse} alt='images (3).jpeg'/>
                    </div>
                </div>
                <div>
                    <h3><u>Boxing for SelfDefense Course</u>:-</h3>
                    <div className='uppercut' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'.5fr 1.5fr',paddingLeft:'50px'}}>
                        <img  style={{width:'250px',height:'250px'}} src={BoxingforSelfDefenseCourse} alt='maxresdefault.jpg'/>
                        <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px',paddingLeft:'5px'}}>A Boxing for Self-Defense Course is a specialized training program that focuses on teaching individuals the basic boxing skills and techniques that can be applied in real-life self-defense situations. This type of course typically emphasizes practical self-defense applications of boxing, rather than competitive boxing techniques..</p>
                    </div>
                </div>
               
                <div style={{borderRadius:'25px'}}>
                <div style={{paddingBottom:'30px'}}>
                    <div>
                    </div>
                </div>
                </div>
            </div>
           
            <div className='sk' style={{padding:'30px'}}>
            </div>
        </div>
      </div></>
      )
      }
      export default ProgressBar11;