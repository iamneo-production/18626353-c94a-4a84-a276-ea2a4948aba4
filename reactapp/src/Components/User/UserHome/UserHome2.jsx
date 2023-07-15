import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import "./UserHome2.css";

const Home4 = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://8080-abbaedcbbaecebadafdecbf.project.examly.io/admin/viewInstitutes");
        const institutes = response.data.slice(0, 9);
        setData(institutes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



  const handleSlideClick1 = () => {
    navigate(`/user/viewacademy`);
  };

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Homepage">
      <section className="Homepage2">
        <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} interval={1000} onClickItem={handleSlideClick1}>
          {data.map((item) => (
            <div key={item.id} >
              <div className="my-carousel-caption">
                <h5 className="caption">{item.instituteName}</h5>
                <p className="caption">{item.instituteAddress}</p>
              </div>
              <img src={item.imageUrl} alt={item.instituteName} />
              
            </div>
          ))}
        </Carousel>
      </section>
    </div>
  );
};

export default Home4;
