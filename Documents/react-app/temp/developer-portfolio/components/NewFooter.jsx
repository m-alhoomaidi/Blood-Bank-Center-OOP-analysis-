import { Box, TextField, Typography } from "@mui/material";
import { Col, Container, Row } from "reactstrap";

export const NewFooter = () => {
  return (
    <>
      <Container>
        <Row className="pt-8">
          <Col lg="4" xs="12">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Typography sx={{ color: "white", fontSize: 18 }}>
                What We Do
              </Typography>
              <Typography sx={{ color: "#808080" }}>Service</Typography>
              <Typography sx={{ color: "#808080" }}>Projects</Typography>
            </Box>
          </Col>
          <Col lg="4" xs="12">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Typography sx={{ color: "white", fontSize: 18 }}>
                Support
              </Typography>
              <Typography sx={{ color: "#808080" }}>Blog</Typography>
              <Typography sx={{ color: "#808080" }}>Contact us</Typography>
            </Box>
          </Col>
          <Col lg="4" xs="12">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Typography sx={{ color: "white", fontSize: 18 }}>
                Company
              </Typography>
              <Typography sx={{ color: "#808080" }}>Home</Typography>
              <Typography sx={{ color: "#808080" }}>About us</Typography>
              <Typography sx={{ color: "#808080" }}>Privacy Policy</Typography>
            </Box>
          </Col>
        </Row>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            mt: 5,
          }}
        >
          <input
            style={{
              height: 50,
              maxWidth: 500,
              minWidth: 400,
              borderRadius: 30,
            }}
          />
        </Box>
      </Container>
    </>
  );
};
