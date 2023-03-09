import { Box, Typography } from "@mui/material";
import { Offer } from "../portfolio";
import { Col, Container, Row } from "reactstrap";
import DisplayLottie from "./DisplayLottie";
export const OurOffer = () => {
  return (
    <>
      <Container>
        <Box>
          <Typography sx={{ fontSize: 33, color: "black" }}>
            {Offer.title}
          </Typography>
          <Typography sx={{ color: "#808080" }}>{Offer.subTitle}</Typography>
        </Box>

        <Row>
          {Offer?.data?.map((item, index) => (
            <Col key={index} lg="4" xs="12">
              <Box sx={{ mt: 3 }}>
                <DisplayLottie
                  height={300}
                  width={250}
                  animationPath={item.lottieAnimationFile}
                />
                <Typography sx={{ color: "#dc3545" }}>{item?.title}</Typography>
                <Typography sx={{ color: "#808080", lineHeight: 2 }}>
                  {item?.description}
                </Typography>
              </Box>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
