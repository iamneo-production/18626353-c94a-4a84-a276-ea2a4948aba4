import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.jpg';
import img7_1 from './img7_1.jpg';
import img7_2 from './img7_2.jpg';
import img7_3 from './img7_3.jpg';
import img7_4 from './img7_4.jpg';
import img7_5 from './img7_5.jpg';
import img7_6 from './img7_6.jpg';
import img7_7 from './img7_7.jpg';
import './CardioBoxing.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import 'sweetalert2/dist/sweetalert2.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProgressBar7 = () => {
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
                <div className='header7'>
                    <div className='titleMain7' style={{ marginLeft: '2%' }}><img width={130} height={80} src={logo} alt='logo' /></div>
                    <div className='Heading7'>Cardio Boxing</div>
                </div>
                <div className='BackgroundImage7' style={{ width: '100', height: '100' }}>
                    <div className='BoxingQuote7'>

                        <span>"TO BECOME A </span>
                        <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;CHAMPION,</span></span>
                        <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;FIGHT ONE MORE</span></span>
                        <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;ROUND"</span></span>
                    </div>
                </div>
                <div className='decorate7'>
                    <div></div>
                </div>
                <div className='DescriptionS7'>
                    <h2>About the Course</h2>
                    <p style={{ textAlign: 'center', fontSize: '25px' }}><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; A cardio boxing course offers structured training and workouts focused on cardiovascular fitness and overall conditioning.</strong>
                    </p>
                    <div className='Description7'>
                        <div>Here's what you can expect from a cardio boxing course:</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', paddingLeft: '50px',fontWeight:'bold' }}>
                            <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Instruction</div>
                            <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Warm-up</div>
                            <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Technique Training</div>
                            <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Combinations and Drills</div>
                            <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Cardiovascular Workout</div>
                            <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Conditioning Exercises</div>
                            <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Cool-down and Stretching</div>
                        </div>
                    </div>
                </div>
                <div style={{ alignItems: 'center', fontFamily: '-moz-initial' }}>
                    <div>
                        <h3><u>Instruction</u>:-</h3>
                        <div className='topic7_1' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
                            <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' ,paddingLeft:'5px'}}>In a cardioboxing course, you'll receive guidance from a qualified instructor who will lead the class and provide instruction on proper technique, form, and combinations. They will demonstrate various punches, kicks, and defensive moves used in boxing and kickboxing.</p>
                            <img style={{ width: '250px', height: '250px', border: '5px', borderColor: 'black' }} src={img7_1} alt='img7_1' />
                        </div>
                    </div>
                    <div>
                        <h3><u>Warm-up</u>:-</h3>
                        <div className='topic7_2' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
                            <img style={{ width: '250px', height: '250px' }} src={img7_2} alt='img7_2' />
                            <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>The class will usually start with a warm-up session to prepare your body for the workout. This may include dynamic stretching, light cardio exercises, and mobility drills to warm up the muscles and increase flexibility.</p>
                        </div>
                    </div>
                    <div>
                        <h3><u>Technique Training</u>:-</h3>
                        <div className='topic7_3' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
                            <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>The instructor will teach you the fundamental punches, kicks, and defensive moves commonly used in boxing and kickboxing. You'll learn proper stance, footwork, jabs, crosses, hooks, uppercuts, front kicks, roundhouse kicks, and more. The focus will be on mastering the basic techniques before progressing to more advanced combinations.</p>
                            <img style={{ width: '250px', height: '250px' }} src={img7_3} alt='img7_3' />
                        </div>
                    </div>
                    <div>
                        <h3><u>Combinations and Drills</u>:-</h3>
                        <div className='topic7_4' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
                            <img style={{ width: '250px', height: '250px' }} src={img7_4} alt='img7_4' />
                            <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' ,paddingLeft:'5px'}}>As you gain proficiency in the basic techniques, the instructor will guide you through various combinations and drills. These involve chaining together punches, kicks, and defensive moves in fluid sequences to enhance coordination, speed, and endurance. Combinations can be performed on punching bags, focus mitts, or with partners.</p>
                        </div>
                    </div>
                    <div>
                        <h3><u>Cardiovascular Workout</u>:-</h3>
                        <div className='topic7_5' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
                            <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>The core component of a cardioboxing course is the cardiovascular workout. The combinations and drills are performed with intensity and speed, elevating your heart rate and providing an aerobic workout. This segment of the class aims to improve your cardiovascular fitness, burn calories, and increase endurance.</p>
                            <img style={{ width: '250px', height: '250px' }} src={img7_5} alt='img7_5' />
                        </div>
                    </div>
                    <div>
                        <h3><u>Conditioning Exercises</u>:-</h3>
                        <div className='topic7_6' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
                            <img style={{ width: '250px', height: '250px' }} src={img7_6} alt='img7_6' />
                            <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>To further challenge your fitness level, the instructor may include conditioning exercises such as push-ups, squats, lunges, burpees, or core exercises within the class. These exercises help strengthen muscles and improve overall fitness.</p>
                        </div>
                    </div>
                    <div>
                        <h3><u>Cool-down and Stretching</u>:-</h3>
                        <div className='topic7_7' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
                            <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>The class typically concludes with a cool-down period to gradually lower your heart rate and allow your body to recover. This may involve light stretching exercises to improve flexibility and prevent muscle soreness.</p>
                            <img style={{ width: '250px', height: '250px' }} src={img7_7} alt='img7_7' />
                        </div>
                    </div>
                </div>
                <div className='decoImg7' style={{ padding: '30px' }}>
                </div>
            </div></div></>
    );
};

export default ProgressBar7;