import React from "react";
import styled from "@emotion/styled";
import { Grid, Button } from "@mui/material";
import { P } from "../../../components/BasicComponents";
import { AppContext } from "../../../context/AppContext";
import { Form, Formik } from "formik";
import { Chip } from "@mui/material";
import Input from "../../../components/Input";
import * as Yup from "yup";
import ApiController from "../../../connection/ApiController";
const Container = styled.div({
  marginTop: 20,
  borderRadius: 5,
  border: "solid 1px rgba(100,100,100,0.1)",
  width: "100%",
  backgroundColor: "rgba(20,20,30,0.2)",
  padding: "2% 1%",
  display: "flex",
  alignItems: "center",
});
const ContainerTittle = styled.div({
  borderBottom: "solid 1px rgba(100,100,100,0.1)",
  marginBottom: 10,
  paddingBottom: 10,
  paddingLeft: "5%",
});
const initialValues = {
  email: "",
};
const Avatar = styled.img({
  width: 30,
  height: 30,
  borderRadius: 200,
  marginTop: 5,
});
const uploadSchema = Yup.object().shape({
  email: Yup.string()
    .email("Ingrese un email válido")
    .required("Este campo es requierod para añadir a alguien a tu equipo")
    .min(10),
});
const Staff = () => {
  const {
    staff,
    setStaff,
    invitations,
    setInvitations,
    selectedCompany,
    setLoader,
  } = React.useContext(AppContext);
  const [update, setUpdate] = React.useState(true);
  React.useEffect(() => {
    console.log("compañia seleccionada");
    console.log(selectedCompany);
    if (update === true && selectedCompany._id) {
      setLoader(true);
      ApiController.GetInvitations({ id: selectedCompany._id }).then((e) => {
        setInvitations(e.data.invitation);
        setStaff(e.data.staff);
        setLoader(false);
        setUpdate(false);
      });
    }
  }, [update, selectedCompany]);
  return (
    <>
      <Container>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item xs={12}>
            <ContainerTittle>
              <Grid container justifyContent={"flex-start"}>
                <Grid item xs={8}>
                  <P style={{ textAlign: "left", fontSize: 14 }}>
                    Personal añadido
                  </P>
                </Grid>
                <Grid item xs={1}>
                  <Button
                    onClick={() => setUpdate(true)}
                    style={{ width: "100%", fontSize: 10 }}
                    size={"small"}
                    variant="outlined"
                  >
                    Actualizar
                  </Button>
                </Grid>
              </Grid>
            </ContainerTittle>
          </Grid>
          <Grid item xs={12}>
            <Formik
              initialValues={initialValues}
              validationSchema={uploadSchema}
              onSubmit={(values) => {
                setLoader(true);
                ApiController.SendInvitations([
                  {
                    nameCompany: selectedCompany.name,
                    company: selectedCompany._id,
                    email: values.email,
                  },
                ])
                  .then((e) => {
                    setUpdate(true);
                  })
                  .catch((e) => console.log(e));
              }}
            >
              {({ errors, touched, setFieldValue }) => {
                return (
                  <Form style={{ paddingLeft: 10, marginBottom: 20 }}>
                    <Grid
                      container
                      columnSpacing={1}
                      rowSpacing={5}
                      justifyContent={"flex-start"}
                      alignItems={"flex-start"}
                    >
                      <Grid item xs={8}>
                        <Input
                          icon={false}
                          name={`email`}
                          error={errors.email}
                          touched={touched.email}
                          placeholder={`Correo`}
                          type={"text"}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          disabled={errors.email ? true : false}
                          type="submit"
                          style={{ width: "100%" }}
                          size={"small"}
                          variant="outlined"
                        >
                          Enviar
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </Grid>
          {invitations.length > 0 && (
            <>
              <Grid item xs={12}>
                <Grid container justifyContent={"space-around"}>
                  <Grid item xs={11}>
                    <P
                      style={{
                        textAlign: "left",
                        fontSize: 12,
                        paddingBottom: 10,
                        borderBottom: "solid 1px rgba(100,100,100,0.1)",
                      }}
                    >
                      Invitaciones Enviadas
                    </P>
                    <br />
                  </Grid>
                </Grid>
              </Grid>
              {invitations.map((item, index) => {
                return (
                  <>
                    <Grid key={index} style={{ marginBottom: 15 }} item xs={12}>
                      <Grid
                        container
                        alignItems={"center"}
                        justifyContent={"space-around"}
                      >
                        <Grid item xs={6}>
                          <P
                            style={{
                              textAlign: "left",
                              fontSize: 10,
                              opacity: 0.9,
                            }}
                          >
                            {item.mailUser}
                          </P>
                        </Grid>
                        <Grid item xs={4}>
                          <Chip
                            size="small"
                            color="primary"
                            label={item.state === true ? "Acepted" : "Pending"}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                );
              })}
            </>
          )}
          {staff.length > 0 && (
            <>
              <Grid item xs={12}>
                <Grid container justifyContent={"space-around"}>
                  <Grid item xs={11}>
                    <P
                      style={{
                        textAlign: "left",
                        fontSize: 12,
                        paddingBottom: 10,
                        borderBottom: "solid 1px rgba(100,100,100,0.1)",
                      }}
                    >
                      Personal
                    </P>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent={"space-around"}>
                  {staff.map((item, index) => {
                    return (
                      <>
                        <Grid item xs={10} key={index}>
                          <Grid
                            container
                            justifyContent={"flex-start"}
                            alignItems={"center"}
                          >
                            <Grid item xs={2} md={1}>
                              <Avatar src={item.avatar} alt={item.name} />
                            </Grid>
                            <Grid item xs={6} md={4}>
                              <P
                                style={{
                                  textAlign: "left",
                                  fontSize: 10,
                                  opacity: 0.9,
                                }}
                              >
                                {item.name}
                              </P>
                            </Grid>
                          </Grid>
                        </Grid>
                      </>
                    );
                  })}
                </Grid>
              </Grid>
            </>
          )}

          {staff.length < 1 && (
            <Grid item xs={12}>
              <P style={{ fontSize: 10, opacity: 0.9 }}>
                Aun no has agrado a nadie{" "}
              </P>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};
export default Staff;
