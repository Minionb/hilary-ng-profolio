import React from "react";
// State
import { useSelector } from "react-redux";
import { selectMode } from "../app/appSlice";
import { selectProjects, selectMainProjects } from "../app/projectsSlice";
import { useGetProjectsQuery } from "../app/apiSlice";
// Router
import { Link } from "react-router-dom";
// Icons
import { Icon } from "@iconify/react";
// Components
import { Element } from "react-scroll";
import { Button, Col, Container, Row } from "react-bootstrap";
import Loading from "./Loading";
import Title from "./Title";
import ProjectCard from "./ProjectCard";
import PatientAppImg from "../images/patientApp.png";
import WeatherAppImg from "../images/weatherApp.png";
import BookingAppImg from "../images/bookingApp.png";
import FasionAppImg from "../images/fasionApp.png";
import clinicalDataImg from "../images/clinicalDataAPI.png";
import displayImg from "../images/Display.png";
import homeScreenImg from "../images/HomeScreen.png";

// #region component
const Projects = () => {
  const theme = useSelector(selectMode);
  const projects = useSelector(selectProjects);
  const mainProjects = useSelector(selectMainProjects);
  const { isLoading, isSuccess, isError, error } = useGetProjectsQuery();
  let content;
  const selectedProjects = [{projectName: "MAPD712-Project-Group7", description: "Health Minder - Patient Clinical Data Management App", stack: "React Native, Rest API, MongoDB, NodeJs, Jest, Figma", url: "https://github.com/Minionb/MAPD712-Project-Group7", imagePath: PatientAppImg, demo: "https://www.youtube.com/watch?v=NG69WHkBG3k"}, 
  {projectName: "PuiYeeNg_WeatherApp", description: "Weather App", stack: "React Native, Rest API", url: "https://github.com/Minionb/PuiYeeNg_WeatherApp", imagePath: WeatherAppImg},
  {projectName: "Shipment_Booking_WebApp", description: "Shipment Booking App", stack: "React, Rest API, MongoDB", url: "https://github.com/Minionb/Shipment_Booking_WebApp", imagePath:BookingAppImg},
  {projectName: "Fashion-Fusion", description: "Fashion Fusion - Fashion Store E-commerce App", stack: "Dart, Flutter, Figma, Rest API, NodeJs, MongoDB, Jest", url: "https://github.com/Minionb/Fashion-Fusion", imagePath: FasionAppImg},
  {projectName: "Patient-Clinical-Data-Management-API", description: "Patient Clinical Data Management API", stack: "Node.js, Express, REST API, Mongo DB, Chai", url: "https://github.com/Minionb/Patient-Clinical-Data-Management-API", imagePath: clinicalDataImg},
  {projectName: "Photo-Picker-Swift-UI", description: "Photo Picker", stack: "Swift UI, IOS Development", url: "https://github.com/Minionb/Photo-Picker-Swift-UI", imagePath: displayImg},
  {projectName: "Easy-Grocery-Kotlin", description: "Easy Grocery", stack: "Kotlin, Android App Development", url: "https://github.com/Minionb/Easy-Grocery-Kotlin", imagePath: homeScreenImg},
  ]

  if (isLoading) {
    content = (
      <Container className="d-flex">
        <Loading />
      </Container>
    );
  } else if (isSuccess) {
    content = (
      <>
        {!error && projects.length === 0 && (
          <h2 className="text-center">
            Oops, you do not have any GitHub projects yet...
          </h2>
        )}
        {selectedProjects.length !== 0 && (
          <>
            <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
              {selectedProjects.map((element) => {
                return (
                  <Col key={element.id}>
                    <ProjectCard
                      image={element.imagePath}
                      name={element.description}
                      description={element.stack}
                      url={element.url}
                      demo={element.demo}
                    />
                  </Col>
                );
              })}
            </Row>
            {projects.length > 3 && (
              <Container className="text-center mt-5">
                {/* <Link to="/All-Projects">
                  <Button
                    size="lg"
                    variant={
                      theme === "light" ? "outline-dark" : "outline-light"
                    }
                  >
                    All <Icon icon="icomoon-free:github" /> Projects
                  </Button>
                </Link> */}
              </Container>
            )}
          </>
        )}
      </>
    );
  } else if (isError) {
    content = (
      <Container className="d-flex align-items-center justify-content-center">
        <h2>{`${error.status} - check getProjects query in src/app/apiSlice.js`}</h2>
      </Container>
    );
  }

  return (
    <Element name={"Projects"} id="projects">
      <section className="section">
        <Container>
          <Container className="d-flex justify-content-center">
            <Title size={"h2"} text={"Featured Projects"} />
          </Container>
          {content}
        </Container>
      </section>
    </Element>
  );
};
// #endregion

export default Projects;
