import React, { useContext, useEffect, useState } from "react";
import { TaskType } from "../../../../types/Proyects";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import Avatar from "../../../../components/Avatar";
import { AppContext } from "../../../../context/AppContext";
import moment from "moment";
import { WorkspaceContext } from "../../../../context/WorkspaceContext";
const TitleTask = styled.p({
  color: "rgb(250,250,250)",
  fontFamily: "comfortaa",
  fontSize: "1.8vh",
});
const DateTask = styled.p({
  color: "rgb(170,170,170)",
  fontFamily: "comfortaa",
    fontSize: "0.8vw",
  marginTop:'0.5vh'
});
const Color = styled.div({
    height: '2vh',
    width: '2vh',
    borderRadius:2
})
const Container = styled.div({
    width: '100%',
    padding: '1.5vh 3vh',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgb(35,35,45)',
    borderRadius: 4,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    margin:'1vh 0',
    "&:hover": {
         backgroundColor: 'rgb(40,40,50)',
    }
})
const TaskListView = ({ data }: any) => {
    const assigned = data.assigned
    const { staff } = useContext(AppContext);
    const { lisprojects } = useContext(WorkspaceContext)
    const [listSelected,setListSelected]=useState<any>([])
      useEffect(() => {
    const selectedList = lisprojects.find(
      (list: any) => list._id === data.list
    );
    if (selectedList) {
      setListSelected(selectedList);
    } else {
      setListSelected([]);
          }
          console.log(listSelected)
  }, [data, lisprojects]);

  return (
      
          <Container>
                    <Grid container alignItems={"center"}>
              <Grid item xs={1}>
                  <Color style={{backgroundColor:listSelected.color}} />
              </Grid>
              <Grid item xs={2}>
                  <TitleTask>
                      
               {listSelected.name}   
                  </TitleTask>
              </Grid>
              <Grid item xs={7}>
                     <TitleTask >
                  {data.title}
                  </TitleTask >
                  <DateTask>
                      {moment(data.dateEnd).format(
                        "MM/DD/YYYY"
                      )}
                  </DateTask>
              </Grid>
           
        <Grid item xs={2}>
          {assigned.length > 0 &&assigned.map((idUser: string, indexa: number) => {
            const url =staff? staff.filter((itemFilter) =>
              itemFilter._id.includes(idUser)
            ):[];

            return indexa < 2 ? (
             url[0] ? <Avatar url={url[0].avatar} name={url[0].name} key={indexa} />:null
            ) : null;
          })}
        </Grid>
      </Grid>    
          </Container>

    
  );
};
export default TaskListView;
