import React, { useState } from "react";
import Chart from "../chart/Chart";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import HomeCard from "../homeCards/HomeCard";
import { Row } from "react-bootstrap";

export default function Maincontent() {

  const [userData, setUserData] = useState({
    labels: [2019, 2020, 2021, 2022, 2023],
    datasets: [
      {
        label: "User gained",
        data: [19, 12, 20, 11, 23]
      }
    ]
  })

  const img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW_T3Jeksn2-kjNejKco6QkMhhnT4cL_oGDl_GYy5iEUcf7rWry51rU0aPMvLI94MAhHU&usqp=CAU";
  const img1 = "https://d2tyltutevw8th.cloudfront.net/media/image/gdp-growth-region-2022-1654625402.jpg"
  const img2 = "https://www.21kschool.com/blog/wp-content/uploads/2022/09/10-Fun-Educational-Activities-to-Do-at-Home.png"
  return (
    <>
      <div className="col-md-9 gedf-main" style={{ overflow: 'auto', maxHeight: '100vh' }}>
        <Chart chartData={userData} />
        <Row className="bg-white">
          <HomeCard color={"#E5E5E5"} img={img}  title={"New Users"}/>
          <HomeCard color={"#E5E5E5"} img={img1}  title={"Average Growth"}/>
          <HomeCard color={"#E5E5E5"} img={img2}  title={"Activities"}/>
        </Row>
      </div>
    </>
  );
}
