import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logo from './logo1.png';
import  Stayingheavy from './download.jpeg';
import  EndlessANGLES from './images.jpeg';
import  GamestoppingJAB from './download (4).jpeg';
import MakeYouMISSWide from './images11.jpeg';
import  INSIDEFIGHTINGGame  from './images (2).jpeg';
import   PainfulBODYSHOTS from './download (2).jpeg';
import DeceptiveDISTANCEControl from './download (3).jpeg';
import  LEADrighthand from './images (3).jpeg';
import  WALKINGAround from './download (5).jpeg';
import boxingring from './download (6).jpeg';
import './Coursepage9.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import sss from './boxinglogo.png';

const ProgressBar9 = () => {
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
            toast.error('An error occured Please try again');
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
<><div>
   <ToastContainer/>
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
      ><center></center></div><div style={{justifySelf:'center' ,padding:'15%',marginLeft:'10px'}}><strong>{progress}%</strong></div></div>
    </div>
    <div>
    <div  style={{height:'40px',backgroundColor:'#27b92b',marginTop:'0px',width:'100%'}}>
      <center><h4 style={{color:'yellow'}}>Status : {status}</h4></center></div>
    </div>
      
<div>
            <div className='Skr9'>
            <div className='titleMain9' style={{marginLeft:'1%'}}><img width={125} height={80} src={logo} alt='Logo'/></div>
            <div className='Sty9'>PROFESSIONAL BOXING </div>
            </div>
            <div className='rrr9' style={{width:'100',height:'100'}}>
                <div className='BoxingQuote'>
                    
                        <span>"To Be A</span>
                        <span style={{display: 'block',textAlign:'left'}} className="w-text-block w-text-left "><span className="w-text-content" >&nbsp;&nbsp;great champion</span></span>
                        <span style={{display: 'block',textAlign:'left'}} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;You,</span></span>
                        <span style={{display: 'block',textAlign:'left'}} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;Must Belive</span></span>
                        <span style={{display: 'block',textAlign:'left'}} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;You Are The Best."</span></span>
                    
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
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp; Stayingheavy</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp; Endless Angles</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp; Gamestopping JAB</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp; Make You Miss Wide</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp; Inside Fighting Game</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp; Painful Body Shots</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp; Deceptive Distance Control</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp; Leadrighthand</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Walking Around</div>
                <div style={{padding:'20px'}}><FontAwesomeIcon icon={faCircleCheck} style={{color:'#179b4a'}}/>&nbsp;Ring Awareness</div>
                </div>
                </div>
            </div>
            <div style={{alignItems:'center',fontFamily: '-moz-initial'}}>
                <div >
                    <h3><u>Stayingheavy</u>:-</h3>
                    <div className='stance'style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'1.5fr .5fr'}}>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px',paddingLeft:'5px'}}>Anybody who’s been in the ring with a pro before will know what I’m talking about. You know right away when you’re in with a pro because he feels as solid as a rock. You can feel his “weight” even when you’re only punching into his guard. You could put 140lb pro in with an amateur 160lb middleweight and the pro will easily push the amateur around. Pros have great balance and stay very grounded. You can feel their weight when they punch, when they push you around on the inside, and even when you throw a punch into their guard.</p>
                    <img style={{width:'250px',height:'250px' ,border:'5px',borderColor:'black'}} src={Stayingheavy} alt='download.jpeg'/>
                    </div>
                </div>
                <div>
                    <h3><u> Endless Angles</u>:-</h3>
                    <div className='footwork' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'.5fr 1.5fr',paddingLeft:'50px'}}>
                    <img style={{width:'250px',height:'250px'}} src={EndlessANGLES} alt='images.jpeg'/>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px',paddingLeft:'5px'}}>Just like I said, the pros have endless angles. When they’re punching you, you feel like the punches can come from all over. A jab can slice up the middle (passing the inside of your forearm) or around the side (passing the outside of your forearm). A right hand can come high, low, around, under, or straight through. It can come twice. The left hook can come high, low, at your chin, at your forehead, at the side of your head, at your body. The left hook can hit your body even when you think your elbow is blocking it.</p>
                    </div>
                </div>
                <div>
                    <h3><u>Gamestopping JAB</u>:-</h3>
                    <div className='jab' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'1.5fr .5fr'}}>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px',paddingLeft:'5px'}}>I call the pro boxer’s jab a “game-stopping jab” because it can counter any punch. The pros have a jab that can interrupt the opponent no matter what. It can stop his right hand, it can stop his hook. It can stop him from coming forward. Obviously, there is one condition: it has to land! How do they do it? Well, it’s more than just having that stiff sharp power and great accuracy. Pros have such precise timing with their jab. Sometimes they throw it with a fast snap to surprise you.</p>
                    <img  style={{width:'250px',height:'250px'}}  src={GamestoppingJAB} alt='download (4).jpeg'/>
                    </div>
                </div>
                <div> 
                    <h3><u>Make You Miss Wide (Straight Right/Left)</u>:-</h3>
                    <div className='cross' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'.5fr 1.5fr',paddingLeft:'50px'}}>
                        <img  style={{width:'250px',height:'250px'}}  src={MakeYouMISSWide} alt='images11.jpeg'/>
                        <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px',paddingLeft:'5px'}}>Pros are so amazing at slipping punches. Their obvious skill is avoiding your punch. Their not-so-obvious skill is making you aim at the wrong place. I can think of few better ways to evade a punch than by making someone miss in the first place..</p>
                    </div>
                </div>
                <div>
                    <h3><u>Inside Fighting Game</u>:-</h3>
                    <div className='hook' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'1.5fr .5fr'}}>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px',paddingLeft:'5px'}}>Pros are especially adept at fighting on the inside for many reasons. They’re more comfortable with fighting and exchanging up close (compared to amateur boxers) because the pros have better defensive skills. Amateurs, although quite skillful, still rely more on footwork for defense. The amateur boxing system is based on a point system which helps taller longer guys throw a bunch of pitty-pat shots and run away. Pros have to land damaging shots to win over the judges which requires them to get closer and stay in firing range.</p>
                    <img  style={{width:'250px',height:'250px'}} src={INSIDEFIGHTINGGame} alt='images (2).jpeg'/>
                    </div>
                </div>
                <div>
                    <h3><u>Painful Body Shots</u>:-</h3>
                    <div className='uppercut' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'.5fr 1.5fr',paddingLeft:'50px'}}>
                        <img  style={{width:'250px',height:'250px'}} src={PainfulBODYSHOTS} alt='download (2).jpeg'/>
                        <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px',paddingLeft:'5px'}}>Body punching is another one of those things that differentiate the pros from the amateurs. In amateur fighting, head shots are easier to score because they’re clearer and easier to see. There’s more of a visual effect when the head snaps back. Body punches aren’t as easy to see and score and sometimes look like blocked shots. With amateur boxing matches being only 3 rounds, there sometimes isn’t enough time for the fighter to reap the long-term gains of body punching. Body shots can slow down an opponent but they may take some time to really affect the opponent.</p>
                    </div>
                </div>
                <div>
                    <h3><u>Deceptive Distance Control</u>:-</h3>
                    <div className='defense' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'1.5fr .5fr'}}>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px',paddingLeft:'5px'}}>Pro boxers are so SOOOOOO incredibly clever and deceptive at changing the distance on you. I’m not talking about the ability to move quickly or have good footwork. I’m talking about the ability to move in a way that your opponent cannot feel you moving! Imagine a guy whose punches were so perfectly non-telegraphic that you couldn’t feel them coming. In the same way, imagine a guy whose footwork was so perfectly non-telegraphic that you couldn’t feel him moving in and out on you..</p>
                    <img  style={{width:'250px',height:'250px'}}  src={DeceptiveDISTANCEControl} alt='download (3).jpeg'/>
                    </div>
                </div>
                <div>
                    <h3><u> LEAD righthand</u>:-</h3>
                    <div className='combinations' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'.5fr 1.5fr',paddingLeft:'50px'}}>
                    <img  style={{width:'250px',height:'250px'}} src={LEADrighthand} alt='images (3).jpeg'/>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px',paddingLeft:'5px'}}> Pros have great lead right hands. It’s not the most powerful knockout punch in the world but it’s a nice surprisingly quick shot with just enough pop to stop you in your tracks. They’ll land it right as you’re about to throw a jab or even right before you throw your right hand. A pro popped me good once with a lead right as I came in with my head while trying to throw my right hand. It taught me to keep that head back or maintain a distance always. The lead right is so much faster than you think and so hard to see..</p>
                    </div>
                </div>
                <div>
                    <h3><u>Walking Around</u>:-</h3>
                    <div className='conditioning' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'1.5fr .5fr'}}>
                    <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px',paddingLeft:'5px'}}> This is one of my favorite qualities about pro boxers. They walk around a lot. They look so calm, relaxed, and nonchalant about fighting but they’re actually always ready to engage. They’ll walk in, hit you, and walk away. Slick as hell, you don’t even realize how easily they walked in on you. And you frustrated when you see how calmly they walk away. When they want to run, they don’t jump or panic or anything like that. They simply walk: a step to the left, another step to the right, maybe two steps to the left again and they’re out..</p>
                    <img  style={{width:'250px',height:'250px'}}  src={WALKINGAround} alt='download (5).jpeg'/>
                    </div>
                </div>
                <div style={{borderRadius:'25px'}}>
                <div style={{paddingBottom:'30px'}}>
                    <h3><u>Ring Awareness</u>:-</h3>
                    <div className='boxingring' style={{backgroundImage:'linear-gradient(to bottom, #137c8c, #5d7568)',borderRadius:'20px',gridTemplateColumns:'.5fr 1.5fr',paddingLeft:'50px'}}>
                        <img style={{width:'250px',height:'250px'}} src={boxingring} alt='download (6).jpeg'/>
                        <p style={{margin:'50px',backgroundColor:'white',border:'100px',borderRadius:'10px',paddingLeft:'5px'}}> Boxers need to develop a keen sense of ring awareness, which includes understanding distance, controlling the pace of the fight, and being mindful of positioning. It involves utilizing footwork, angles, and timing to outmaneuver opponents and capitalize on opportunities.</p>
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
      export default ProgressBar9;