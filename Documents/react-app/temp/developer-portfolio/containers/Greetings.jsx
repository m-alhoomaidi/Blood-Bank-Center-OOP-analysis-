import React, { useEffect } from "react";
import { greetings } from "../portfolio";

import { Button, Container, Row, Col } from "reactstrap";

import GreetingLottie from "../components/DisplayLottie";
import SocialLinks from "../components/SocialLinks";
import { Box } from "@mui/material";

const Greetings = () => {
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  });
  return (
    <main>
      <div className="position-relative">
        <section className="section section-lg section-shaped pb-250">
          <div className="shape shape-style-1 bg-gradient-default">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          {/* <Box
            sx={{
              width: "100%",
              justifyContent: "center",
              display: "flex",
              mt: 10,
            }}
          >
            <h1 className="text-white">Intellitechlab</h1>
          </Box> */}
          <Container className="py-lg-md d-flex">
            <div className="col px-0">
              <Row>
                <Col lg="6">
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <h1 className="display-3 text-white">
                      {greetings.title + " "}
                    </h1>
                    <p className="lead text-white">{greetings.description}</p>
                    <SocialLinks />
                    <div className="btn-wrapper my-4">
                      <Button
                        className="btn-white btn-icon mb-3 mb-sm-0 ml-1"
                        color="#F1556b"
                      >
                        <span className="btn-inner--text">Learn More</span>
                      </Button>
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <GreetingLottie animationPath="/lottie/coding.json" />
                </Col>
              </Row>
            </div>
          </Container>
          {/* <div className="separator separator-bottom separator-skew">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
            </svg>
          </div> */}
        </section>
      </div>
    </main>
  );
};

export default Greetings;
