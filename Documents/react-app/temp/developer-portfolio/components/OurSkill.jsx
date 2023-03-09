import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Offer, OurSkills } from "../portfolio";
import { Col, Container, Row } from "reactstrap";

export const OurSkill = () => {
  return (
    <>
      <Container>
        <Box mb={6}>
          <Typography sx={{ fontSize: 33, color: "black" }}>
            {OurSkills.title}
          </Typography>
        </Box>

        <Row>
          {OurSkills?.data?.map((item, index) => (
            <Col key={index} lg="4" xs="12">
              <Card sx={{ boxShadow: "none", borderRadius: 3, my: 3 }}>
                <CardContent sx={{ p: 5, boxShadow: "none" }}>
                  <Box>
                    <Typography sx={{ color: "#F1556b" }}>
                      {item?.title}
                    </Typography>
                    <Typography sx={{ color: "#808080", lineHeight: 2 }}>
                      {item?.description}
                    </Typography>

                    <Button
                      variant="contained"
                      sx={{
                        my: 3,
                        borderRadius: 12,
                        backgroundColor: "#F1556b",
                        "&:hover": {
                          backgroundColor: "#F1556b",
                        },
                      }}
                    >
                      View Projects
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
