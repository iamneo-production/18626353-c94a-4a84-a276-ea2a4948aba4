import React from "react";
import Home4 from "./UserHome2";
import Home5 from "./UserHome3";
import './UserHome.css';
import './UserHome2.css';
import './UserHome3.css';

const UserHomePage = () => {
  return (
    <div className="home-container">
      {/* <UserHome /> */}
      <div className="content-container">
        <Home4 />
        <Home5 />
      </div>
    </div>
  );
};

export default UserHomePage;
