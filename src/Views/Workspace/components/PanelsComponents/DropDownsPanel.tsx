
import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import { IconButton } from "@mui/material";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import styledE from "@emotion/styled";
import { Grid, Divider } from "@mui/material";
import { P } from "../../../../components/BasicComponents";
const Categories = ["Hoy", "Atrasadas", "Siguiente", "No propgramadas","Finalizadas"];
const Container = styledE.div({

});
const Title = styledE.p({
  fontSize: "1vw",
  margin: 0,
  fontWeight: 400,
  textAlign: "left",
});
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor: "rgba(0,0,0,0)",
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{color:'white', fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const DropDownPanels = () => {
    return (
        <>
                <Grid container justifyContent={"center"}>
      <Grid item xs={11}>
        <Container>
          <div>
            {Categories.map((item, index) => (
              <div key={index} style={{borderRadius:8,backgroundColor:'rgba(10,0,20,0.3)',marginTop:'1vw'}}>
                <Accordion
                >
                  <AccordionSummary
                    style={{ backgroundColor: "rgba(0,0,0,0)" }}
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Title>{item}</Title>
                  </AccordionSummary>
                        <AccordionDetails style={{ padding: '1vwb',  }}>
                            <div style={{borderRadius:5,backgroundColor: 'rgba(10,0,20,0.2)'}}>
                <P>
                                xd
                   </P>
                            </div>
            
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </div>
        </Container>
      </Grid>
    </Grid>
        </>
    )
}
export default DropDownPanels;