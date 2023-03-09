import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { skillsSection } from "../portfolio";
import { Fade } from "react-reveal";
import DisplayLottie from "./DisplayLottie";
import { Col, Row } from "reactstrap";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import React from "react";
export const WhatWeDo = () => {
  return (
    <>
      <Row
        className="my-5 py-10"
        style={{
          backgroundColor: "rgb(255,255,255)",
          background:
            "linear-gradient(155deg, rgba(255,255,255,1) 5%, rgba(232,232,232,1) 100%)",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Col lg="6" xs="12">
          <Box
            sx={{
              backgroundImage: "url(https://otekit.com/patterns/map2.svg)",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Box>
              <DisplayLottie
                height={400}
                animationPath={"/lottie/programming-lan.json"}
              />
            </Box>
          </Box>
        </Col>

        <Col lg="6" xs="12">
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card sx={{ maxWidth: 440, borderRadius: 5 }}>
              <CardContent sx={{ p: 8 }}>
                <Box sx={{ mx: -5, my: -4 }}>
                  <DisplayLottie
                    height={100}
                    width={100}
                    animationPath={"/lottie/code.json"}
                  />
                </Box>
                <Typography sx={{ fontWeight: "bold", my: 2 }}>
                  We Use The Latest Development Technologies
                </Typography>
                <Typography
                  sx={{
                    color: "#808080",
                  }}
                >
                  We make sure to take advantage of the latest and most robust
                  web development technologies. Our focus is more on the
                  maintainability and availability of support to everything we
                  make.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Col>
      </Row>
    </>
  );
};
