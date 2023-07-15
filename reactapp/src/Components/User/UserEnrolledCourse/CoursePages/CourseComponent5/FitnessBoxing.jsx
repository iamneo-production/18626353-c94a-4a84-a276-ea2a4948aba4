import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.jpg';
import img5_1 from './img5_1.jpg';
import img5_2 from './img5_2.jpg';
import img5_3 from './img5_3.jpg';
import img5_4 from './img5_4.jpg';
import img5_5 from './img5_5.jpg';
import img5_6 from './img5_6.jpg';
import img5_7 from './img5_7.jpg';
import './FitnessBoxing.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import 'sweetalert2/dist/sweetalert2.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProgressBar5 = () => {
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
            console.error(error);
        }
    };



    return (
        <>
            <div>
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
                    <div className='header5'>
                        <div className='titleMain' style={{ marginLeft: '2%' }}><img width={130} height={80} src={logo} alt='logo' /></div>
                        <div className='Heading5'>Fitness Boxing</div>
                    </div>
                    <div className='BackgroundImage5' style={{ width: '100', height: '100' }}>
                        <div className='BoxingQuote5'>

                            <span>"TO BE A CHAMP</span>
                            <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;YOU HAVE TO BELIEVE</span></span>
                            <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;IN YOURSELF</span></span>
                            <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;WHEN NO ONE ELSE WILL"</span></span>
                        </div>
                    </div>
                    <div className='decorate5'>
                        <div></div>
                    </div>
                    <div className='DescriptionS5'>
                        <h2>About the Course</h2>
                        <p style={{ textAlign: 'center', fontSize: '25px' }}><strong>&nbsp;One of the main reasons behind the surge in popularity of fitness boxing is that it offers both cardio and strength benefits in one workout.</strong>
                        </p>
                        <div className='Description5'>
                            <div>The physical & mental health benefits of fitness boxing include:</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', paddingLeft: '20px' ,fontWeight:'bold'}}>
                                <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Improved total-body strength</div>
                                <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Improved cardiovascular health</div>
                                <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Strengthened and toned muscles</div>
                                <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Burn calories and fat</div>
                                <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Improved hand-eye coordination</div>
                                <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Focus</div>
                                <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Reduced stress</div>
                            </div>
                        </div>
                    </div>
                    <div style={{ alignItems: 'center', fontFamily: '-moz-initial' }}>
                        <div>
                            <h3><u>Improved total-body strength</u>:-</h3>
                            <div className='topic5_1' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
                                <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>Large punching bags can weigh well over 200 pounds, while a small punching bag is around 90 pounds. As for boxing gloves, they come in various weights, with the lightest ones weighing about a pound. During one fitness boxing session, you might punch a bag more than a hundred times while engaging your core, lower, and upper body.</p>
                                <img style={{ width: '250px', height: '250px', border: '5px', borderColor: 'black' }} src={img5_1} alt='img5_1' />
                            </div>
                        </div>
                        <div>
                            <h3><u>Improved cardiovascular health</u>:-</h3>
                            <div className='topic5_2' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
                                <img style={{ width: '250px', height: '250px' }} src={img5_2} alt='img5_2' />
                                <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>Along with a proper nutrition plan & maintaining a healthy weight, engaging in cardio training is important for protecting against heart disease.Cardio training places moderate stress on the lungs and heart, which enables them to physiologically adapt in order to support your physical activity.</p>
                            </div>
                        </div>
                        <div>
                            <h3><u>Strengthened and toned muscles</u>:-</h3>
                            <div className='topic5_3' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
                                <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>Including fitness boxing in your daily workout is a great way to build muscle and enhance your punching power. Your chest muscles, back, shoulders, and arms will be worked and toned with every punch you throw. Because of the resistance your body generates as it stabilizes itself, your leg muscles will also come into play. That makes this type of exercise ideal if you want to build muscles stronger .</p>
                                <img style={{ width: '250px', height: '250px' }} src={img5_3} alt='img5_3' />
                            </div>
                        </div>
                        <div>
                            <h3><u>Burn calories and fat</u>:-</h3>
                            <div className='topic5_4' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
                                <img style={{ width: '250px', height: '250px' }} src={img5_4} alt='img5_4' />
                                <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>Depending on your age, weight, gender, and the intensity of training, fitness boxing workouts can burn between 450 and 650 calories in one hour. Also, the calories burned while boxing with a light punching bag won’t exceed those burned when using a heavy bag. Besides the calorie burn, fitness boxing helps burn visceral fat, which is located inside your abdominal cavity.</p>
                            </div>
                        </div>
                        <div>
                            <h3><u>Improved hand-eye coordination</u>:-</h3>
                            <div className='topic5_5' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
                                <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>During a fitness boxing session, you need to focus on the punching bag, hit it as it’s moving, and react quickly to change position. In reality, this is more challenging than it sounds and requires good hand-eye coordination. Over time, your reflexes, reaction times, and gross and fine motor skills will improve as well as your hand-eye coordination.</p>
                                <img style={{ width: '250px', height: '250px' }} src={img5_5} alt='img5_5' />
                            </div>
                        </div>
                        <div>
                            <h3><u>Focus</u>:-</h3>
                            <div className='topic5_6' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
                                <img style={{ width: '250px', height: '250px' }} src={img5_6} alt='img5_6' />
                                <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>As your punching skills continue to advance, you will move to more complex punching/defending combinations. Having to remember such a high number of moves in a particular order is your mental exercise, which is equally important as the physical aspect of fitness boxing. Also, fitness boxing forces you to be present in the moment, and this mental presence is known as mindfulness.</p>
                            </div>
                        </div>
                        <div>
                            <h3><u> Reduced stress</u>:-</h3>
                            <div className='topic5_7' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
                                <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>Almost any physical exercise that is performed at a moderate or fast pace will lower your stress levels, including fitness boxing. And who wouldn’t want to punch their way into a better day? It is quite therapeutic because, with every punch you make, you will relieve both mental and physical tension. Your body will release endorphins  that will stimulate your mood and further reduce your stress levels.</p>
                                <img style={{ width: '250px', height: '250px' }} src={img5_7} alt='img5_7' />
                            </div>
                        </div>
                    </div>
                    <div className='decoImg5' style={{ padding: '30px' }}>
                    </div>
                </div></div>
        </>
    );
};

export default ProgressBar5;