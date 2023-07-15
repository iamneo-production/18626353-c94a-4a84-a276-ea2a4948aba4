import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.jpg';
import img8_1 from './img8_1.jpg';
import img8_2 from './img8_2.jpg';
import img8_3 from './img8_3.jpg';
import img8_4 from './img8_4.jpg';
import img8_5 from './img8_5.jpg';
import img8_6 from './img8_6.jpg';
import './ShadowBoxing.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import 'sweetalert2/dist/sweetalert2.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProgressBar8 = () => {
    const [progress, setProgress] = useState(0);
    const [progressid, setProgressId] = useState(0);
    const [status, setStatus] = useState('');
    const { Id, courseId } = useParams();

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
                    const response = await axios.get(`https://8080-addebfabbbaecebadafdecbf.project.examly.io/user/viewStatus11?userid=${id}&courseid=${courseId}`);
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

    const handleBeforeUnload = (event) => {
        event.preventDefault();
        sendDataToBackend(progress);// Send data to the backend when the webpage is closed or navigated away

    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    const sendDataToBackend = async progress => {
        try {

            // Make an HTTP POST or PUT request to send progress data to the backend
            if (localStorage.getItem(`isFirstRender${courseid}`) === 'true') {
                localStorage.setItem(`isFirstRender${courseid}`, 'false');
                await axios.post(`https://8080-addebfabbbaecebadafdecbf.project.examly.io/user/viewstatusby?progresspercentage=${progress}&userid=${id}&courseid=${courseid}`);
            } else {
                await axios.put(`https://8080-addebfabbbaecebadafdecbf.project.examly.io/user/updatestatus/${progressid}?progressPercentage=${progress}`);
            }
        } catch (error) {
            toast.error(error);
        }
    };



    return (
        <><div>
            <ToastContainer />
            <div style={{ position: 'fixed', height: '10px', width: '100%' }}>

            </div>

            <div style={{ height: '40px', width: '100%' }}>
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

            <div style={{ height: '40px', backgroundColor: '#27b92b', marginTop: '0px', width: '100%' }}>
                <center><h4 style={{ color: 'yellow' }}>Status : {status}</h4></center></div>

            <div style={{ flex: '1', overflowY: 'auto' }}>
                <div className='header8'>
                    <div className='titleMain' style={{ marginLeft: '2%' }}><img width={130} height={80} src={logo} alt='logo' /></div>
                    <div className='Heading8'>Shadow Boxing</div>
                </div>
                <div className='BackgroundImage8' style={{ width: '100', height: '100' }}>
                    <div className='BoxingQuote8'>

                        <span>"IF IT DOESN'T</span>
                        <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;CHALLENGE YOU</span></span>
                        <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;IT WON'T</span></span>
                        <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;CHANGE YOU"</span></span>
                    </div>
                </div>
                <div className='decorate8'>
                    <div></div>
                </div>
                <div className='DescriptionS8'>
                    <h2>About the Course</h2>
                    <p style={{ textAlign: 'center', fontSize: '25px' }}><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Shadow boxing is a fundamental exercise in boxing and martial arts that involves throwing punches and performing boxing movements without an opponent or any physical contact.</strong>
                    </p>
                    <div className='Description8'>
                        <div>It is typically done in front of a mirror or an imaginary opponent and serves several purposes:</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', paddingLeft: '50px',fontWeight:'bold' }}>
                            <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Technique and form</div>
                            <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Skill development</div>
                            <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Footwork and movement</div>
                            <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Conditioning and cardiovascular fitness</div>
                            <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Visualization and mental focus</div>
                            <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Warm-up and cool-down</div>
                        </div>
                    </div>
                </div>
                <div style={{ alignItems: 'center', fontFamily: '-moz-initial' }}>
                    <div>
                        <h3><u>Technique and form</u>:-</h3>
                        <div className='topic8_1' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
                            <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>Shadow boxing allows boxers to focus on their technique and form. Without the distraction of an opponent, they can concentrate on executing punches, footwork, and defensive movements correctly. It helps boxers develop proper body mechanics, balance, and coordination.</p>
                            <img style={{ width: '250px', height: '250px', border: '5px', borderColor: 'black' }} src={img8_1} alt='img8_1' />
                        </div>
                    </div>
                    <div>
                        <h3><u>Skill development</u>:-</h3>
                        <div className='topic8_2' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
                            <img style={{ width: '250px', height: '250px' }} src={img8_2} alt='img8_2' />
                            <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>Shadow boxing is an opportunity to practice and refine boxing skills. It enables boxers to work on combinations, practice various punches (such as jabs, crosses, hooks, and uppercuts), and experiment with defensive maneuvers (such as slips, rolls, and blocks). Repetition through shadow boxing helps develop muscle memory and improve overall skill proficiency.</p>
                        </div>
                    </div>
                    <div>
                        <h3><u>Footwork and movement</u>:-</h3>
                        <div className='topic8_3' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
                            <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>Footwork is a crucial aspect of boxing, and shadow boxing allows boxers to work on their footwork patterns and movement. They can practice pivoting, shuffling, circling, and moving in and out of range. Improved footwork enhances agility, speed, and the ability to maintain proper positioning during a fight.</p>
                            <img style={{ width: '250px', height: '250px' }} src={img8_3} alt='img8_3' />
                        </div>
                    </div>
                    <div>
                        <h3><u>Conditioning and cardiovascular fitness</u>:-</h3>
                        <div className='topic8_4' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
                            <img style={{ width: '250px', height: '250px' }} src={img8_4} alt='img8_4' />
                            <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>Shadow boxing is an excellent cardiovascular exercise that increases heart rate and burns calories. It provides a full-body workout, engaging the muscles of the arms, shoulders, core, and legs. Regular shadow boxing sessions can improve endurance, stamina, and overall fitness level.</p>
                        </div>
                    </div>
                    <div>
                        <h3><u>Visualization and mental focus</u>:-</h3>
                        <div className='topic8_5' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
                            <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>Shadow boxing encourages mental focus and visualization. Boxers can imagine an opponent's movements, react to different scenarios, and strategize their attacks and defenses. This mental engagement helps improve concentration, reaction time, and tactical thinking.</p>
                            <img style={{ width: '250px', height: '250px' }} src={img8_5} alt='img8_5' />
                        </div>
                    </div>
                    <div>
                        <h3><u>Warm-up and cool-down</u>:-</h3>
                        <div className='topic8_6' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
                            <img style={{ width: '250px', height: '250px' }} src={img8_6} alt='img8_6' />
                            <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>Shadow boxing is often used as a warm-up or cool-down activity in boxing training sessions. It helps increase blood flow, loosen up the muscles, and mentally prepare for the upcoming workout or gradually bring the heart rate down after an intense session.</p>
                        </div>
                    </div>
                </div>
                <div className='decoImg8' style={{ padding: '30px' }}>
                </div>
            </div></div></>
    );
};

export default ProgressBar8;