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
import { Container, Item } from "../../../components/Container";
const ContainerStuff = styled.div({
  marginTop: 20,
  borderRadius: 5,
  border: "solid 1px rgba(100,100,100,0.1)",

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
      <ContainerStuff>
        < Container justifyContent={"space-between"} alignItems={"center"}>
          <Item xs={12}>
            <ContainerTittle>
              < Container justifyContent={"flex-start"} alignItems={"center"}>
                <Item xs={8}>
                  <P style={{ textAlign: "left", fontSize: 14 }}>
                    Personal añadido
                  </P>
                </Item>
                <Item xs={1}>
                  <Button
                    onClick={() => setUpdate(true)}
                    style={{ width: "100%", fontSize: 10 }}
                    size={"small"}
                    variant="outlined"
                  >
                    Actualizar
                  </Button>
                </Item>
              </ Container>
            </ContainerTittle>
          </Item>
          <Item xs={12}>
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
                    <Container
                      columnSpacing={1}
                      rowSpacing={5}
                      justifyContent={"flex-start"}
                      alignItems={"flex-start"}
                    >
                      <Item xs={8}>
                        <Input
                          icon={false}
                          name={`email`}
                          error={errors.email}
                          touched={touched.email}
                          placeholder={`Correo`}
                          type={"text"}
                        />
                      </Item>
                      <Item xs={2}>
                        <Button
                          disabled={errors.email ? true : false}
                          type="submit"
                          style={{ width: "100%" }}
                          size={"small"}
                          variant="outlined"
                        >
                          Enviar
                        </Button>
                      </Item>
                    </Container>
                  </Form>
                );
              }}
            </Formik>
          </Item>
          {invitations ? (
            <>
              <Item xs={12}>
                <Container justifyContent={"space-around"}>
                  <Item xs={11}>
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
                  </Item>
                </Container>
              </Item>
              {invitations.map((item, index) => {
                return (
                  <>
                    <Item key={index} style={{ marginBottom: 15 }} xs={12}>
                      <Container
                        alignItems={"center"}
                        justifyContent={"space-around"}
                      >
                        <Item xs={6}>
                          <P
                            style={{
                              textAlign: "left",
                              fontSize: 10,
                              opacity: 0.9,
                            }}
                          >
                            {item.mailUser}
                          </P>
                        </Item>
                        <Item xs={4}>
                          <Chip
                            size="small"
                            color="primary"
                            label={item.state === true ? "Acepted" : "Pending"}
                          />
                        </Item>
                      </Container>
                    </Item>
                  </>
                );
              })}
            </>
          ) : null}
          {staff ? (
            <>
              <Item xs={12}>
                <Container justifyContent={"space-around"}>
                  <Item xs={11}>
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
                  </Item>
                </Container>
              </Item>
              <Item xs={12}>
                <Container justifyContent={"space-around"}>
                  {staff.map((item, index) => {
                    return (
                      <>
                        <Item xs={10} key={index}>
                          <Container
                            justifyContent={"flex-start"}
                            alignItems={"center"}
                          >
                            <Item xs={2} md={1}>
                              <Avatar src={item.avatar} alt={item.name} />
                            </Item>
                            <Item xs={6} md={4}>
                              <P
                                style={{
                                  textAlign: "left",
                                  fontSize: 10,
                                  opacity: 0.9,
                                }}
                              >
                                {item.name}
                              </P>
                            </Item>
                          </Container>
                        </Item>
                      </>
                    );
                  })}
                </Container>
              </Item>
            </>
          ) : null}

          {!staff ? (
            <Item xs={12}>
              <P style={{ fontSize: 10, opacity: 0.9 }}>
                Aun no has agrado a nadie{" "}
              </P>
            </Item>
          ) : null}
        </ Container>
      </ContainerStuff>
    </>
  );
};
export default Staff;
