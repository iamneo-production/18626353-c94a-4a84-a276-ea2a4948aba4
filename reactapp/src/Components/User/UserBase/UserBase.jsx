import React from 'react';
import { Routes, Route,useParams } from 'react-router-dom';
import UserHome from '../UserNavBar/UserNav';
import UserHomePage from '../UserHome/UserHome';
import Viewacademy from '../UserAcademy/UserAcademy';
import UserCourse from '../UserAcademy/UserCourse';
import Forms from '../UserAcademy/UserForms';
import Rating from '../UserAcademy/UserRating';
import EnrolledCourse from '../UserEnrolledCourse/UserEnrolled/UserEnrolled';
import EditEnrolled from '../UserEnrolledCourse/UserEnrolled/UserEnrolledEdit';
import ProgressBar1 from '../UserEnrolledCourse/CoursePages/CourseComponent1/BasicBoxingPage';
import ProgressBar2 from '../UserEnrolledCourse/CoursePages/CourseComponent2/IntermediateBoxingPage';
import ProgressBar3 from '../UserEnrolledCourse/CoursePages/CourseComponent3/StrengthBoxingPage';
import ProgressBar4 from '../UserEnrolledCourse/CoursePages/CourseComponent4/SparringBoxingPage';
import ProgressBar5 from '../UserEnrolledCourse/CoursePages/CourseComponent5/FitnessBoxing';
import ProgressBar6 from '../UserEnrolledCourse/CoursePages/CourseComponent6/YouthBoxing/YouthBoxing';
import ProgressBar7 from '../UserEnrolledCourse/CoursePages/CourseComponent7/CardioBoxing/CardioBoxing';
import ProgressBar8 from '../UserEnrolledCourse/CoursePages/CourseComponent8/ShadowBoxing/ShadowBoxing';
import ProgressBar9 from '../UserEnrolledCourse/CoursePages/CourseComponent9/ProfessionalBoxingPage';
import ProgressBar10 from '../UserEnrolledCourse/CoursePages/CourseComponent10/WhiteCollorBoxingpage';
import ProgressBar11 from '../UserEnrolledCourse/CoursePages/CourseComponent11/AmatureTrainingPage';
import ProgressBar12 from '../UserEnrolledCourse/CoursePages/CourseComponent12/PersonalTrainingPage';
import ProgressBarrr from '../UserEnrolledCourse/CoursePages/CourseComponentAlternate/AlternateCoursePage';




function UserBaseComponent() {
    return (
        <div>
            <UserHome/>
            
            <Routes>
                <Route path='userhome' element={<UserHomePage />}></Route>
                <Route path='viewacademy' element={<Viewacademy />} />
                <Route path='usercourse' element={<UserCourse />} />
                <Route path='userform' element={<Forms />} />
                <Route path= 'rating' element ={<Rating/>} />
                <Route path= 'enrolledcourse' element ={<EnrolledCourse/>} />
                <Route path='editenrolled' element={<EditEnrolled />} />
                <Route path='coursepages/:course/:Id/:courseId' element={<RenderComponent />} />
            </Routes>
        </div>
    )
}
const RenderComponent = ()=>{
    const { course } = useParams();
    let componentToRender;
    if(course === 'Strength training'){
        componentToRender = <ProgressBar1/>;
    }
    else if(course === 'Intermediate & Advanced Boxing'){
      componentToRender = <ProgressBar2/>;
    }
    else if(course === 'Strength & Conditiong'){
      componentToRender = <ProgressBar3/>;
    }
    else if(course === 'Sparring & Competitive Training'){
      componentToRender = <ProgressBar4/>;
    }
    else if(course === 'Boxing Fitness & Weight Loss'){
      componentToRender = <ProgressBar5/>;
    }
    else if(course === 'Youth Boxing Programs'){
      componentToRender = <ProgressBar6/>;
    }
    else if(course === 'Cardio Boxing'){
      componentToRender = <ProgressBar7/>;
    }
    else if(course === 'Shadow Boxing'){
      componentToRender = <ProgressBar8/>;
    }
    else if(course === 'Amateur Boxing'){
      componentToRender = <ProgressBar9/>;
    }
    else if(course === 'Professional Boxing'){
      componentToRender = <ProgressBar10/>;
    }
    else if(course === 'White Collar Boxing'){
      componentToRender = <ProgressBar11/>;
    }
    else if(course === 'Personal Training'){
      componentToRender = <ProgressBar12/>;
    }
    else{
      componentToRender = <ProgressBarrr/>;
    }
    return(
      <div>
        {componentToRender}
      </div>
    )
  }

export default UserBaseComponent;