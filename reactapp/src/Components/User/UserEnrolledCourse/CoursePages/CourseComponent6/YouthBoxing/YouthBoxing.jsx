import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.jpg';
import img6_1 from './img6_1.jpg';
import img6_2 from './img6_2.jpg';
import img6_3 from './img6_3.jpg';
import img6_4 from './img6_4.jpg';
import img6_5 from './img6_5.jpg';
import img6_6 from './img6_6.jpg';
import './YouthBoxing.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import 'sweetalert2/dist/sweetalert2.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProgressBar6 = () => {
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
                    const response = await axios.get(`https://8080-bfbccadaceacbbaecebadafdecbf.project.examly.io/user/viewStatus11?userid=${id}&courseid=${courseId}`);
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
                await axios.post(`https://8080-bfbccadaceacbbaecebadafdecbf.project.examly.io/user/viewstatusby?progresspercentage=${progress}&userid=${id}&courseid=${courseid}`);
            } else {
                await axios.put(`https://8080-bfbccadaceacbbaecebadafdecbf.project.examly.io/user/updatestatus/${progressid}?progressPercentage=${progress}`);
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
                <div className='header6'>
                    <div className='titleMain6' style={{ marginLeft: '2%' }}><img width={130} height={80} src={logo} alt='logo' /></div>
                    <div className='Heading6'>Youth Boxing</div>
                </div>
                <div className='BackgroundImage6' style={{ width: '100', height: '100' }}>
                    <div className='BoxingQuote6'>

                        <span>"WHEN YOU FEEL LIKE</span>
                        <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;QUITTING...</span></span>
                        <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;THINK ABOUT WHY YOU</span></span>
                        <span style={{ display: 'block', textAlign: 'left' }} className="w-text-block w-text-left "><span className="w-text-content">&nbsp;&nbsp;STARTED"</span></span>
                    </div>
                </div>
                <div className='decorate6'>
                    <div></div>
                </div>
                <div className='DescriptionS6'>
                    <h2>About the Course</h2>
                    <p style={{ textAlign: 'center', fontSize: '25px' }}><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Youth boxing programs are designed to introduce young individuals to the sport of boxing in a safe and controlled environment. These programs focus on teaching the fundamentals of boxing, promoting physical fitness, discipline, and building self-confidence.</strong>
                    </p>
                    <div className='Description6'>
                        <div>Here are some key aspects of youth boxing programs:</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', paddingLeft: '50px' ,fontWeight:'bold'}}>
                            <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Safety</div>
                            <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Skill development</div>
                            <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Physical fitness</div>
                            <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Discipline and self-confidence</div>
                            <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Sportsmanship and respect</div>
                            <div style={{ padding: '20px' }}><FontAwesomeIcon icon={faCircleCheck} style={{ color: '#179b4a' }} />&nbsp;Personal development</div>
                        </div>
                    </div>
                </div>
                <div style={{ alignItems: 'center', fontFamily: '-moz-initial' }}>
                    <div>
                        <h3><u>Safety</u>:-</h3>
                        <div className='topic6_1' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
                            <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>Safety is of utmost importance in youth boxing programs. Coaches and instructors prioritize teaching proper technique, emphasizing the importance of wearing protective gear such as gloves, headgear, mouthguards, and ensuring a safe training environment. Sparring may be limited or excluded altogether, depending on the age and skill level of the participants.</p>
                            <img style={{ width: '250px', height: '250px', border: '5px', borderColor: 'black' }} src={img6_1} alt='img6_1' />
                        </div>
                    </div>
                    <div>
                        <h3><u>Skill development</u>:-</h3>
                        <div className='topic6_2' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
                            <img style={{ width: '250px', height: '250px' }} src={img6_2} alt='img6_2' />
                            <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' ,paddingLeft:'5px'}}>Youth boxing programs typically start with teaching basic boxing techniques such as stance, footwork, punches (jab, cross, hook, uppercut), and defensive maneuvers (slips, rolls, blocks). Coaches focus on developing coordination, balance, and agility, gradually progressing to more advanced skills as participants gain experience.</p>
                        </div>
                    </div>
                    <div>
                        <h3><u>Physical fitness</u>:-</h3>
                        <div className='topic6_3' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
                            <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' ,paddingLeft:'5px'}}>Youth boxing programs provide a comprehensive physical fitness experience. Training sessions often include warm-ups, conditioning exercises, cardiovascular workouts, and strength training specific to boxing. These activities help participants improve their overall fitness levels, stamina, and strength.</p>
                            <img style={{ width: '250px', height: '250px' }} src={img6_3} alt='img6_3' />
                        </div>
                    </div>
                    <div>
                        <h3><u>Discipline and self-confidence</u>:-</h3>
                        <div className='topic6_4' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
                            <img style={{ width: '250px', height: '250px' }} src={img6_4} alt='img6_4' />
                            <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>Boxing instills discipline and self-confidence in young participants. Through structured training sessions, youth learn the importance of commitment, perseverance, and self-discipline. The positive reinforcement and achievement of mastering new skills can enhance their self-confidence both inside and outside the boxing gym.</p>
                        </div>
                    </div>
                    <div>
                        <h3><u>Sportsmanship and respect</u>:-</h3>
                        <div className='topic6_5' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '1.5fr .5fr' }}>
                            <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px' ,paddingLeft:'5px'}}>Youth boxing programs emphasize sportsmanship and respect. Participants are taught to respect their coaches, training partners, and opponents. They learn the importance of fair play, following rules, and displaying good sportsmanship.</p>
                            <img style={{ width: '250px', height: '250px' }} src={img6_5} alt='img6_5' />
                        </div>
                    </div>
                    <div>
                        <h3><u>Personal development</u>:-</h3>
                        <div className='topic6_6' style={{ backgroundImage: 'linear-gradient(to bottom, #137c8c, #5d7568)', borderRadius: '20px', gridTemplateColumns: '.5fr 1.5fr', paddingLeft: '50px' }}>
                            <img style={{ width: '250px', height: '250px' }} src={img6_6} alt='img6_6' />
                            <p style={{ margin: '50px', backgroundColor: 'white', border: '100px', borderRadius: '10px',paddingLeft:'5px' }}>Youth boxing programs can have a positive impact on personal development. By overcoming challenges, setting goals, and working towards them, young individuals can develop valuable life skills such as goal setting, problem-solving, and resilience.</p>
                        </div>
                    </div>
                </div>
                <div className='decoImg6' style={{ padding: '30px' }}>
                </div>
            </div></div></>
    );
};

export default ProgressBar6;