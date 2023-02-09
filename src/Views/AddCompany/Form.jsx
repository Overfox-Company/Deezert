import React from "react";
import { Form, Formik } from "formik";
import { Grid,Button } from "@mui/material";
import Input from "../../components/Input";
import * as Yup from "yup";
import { AppContext } from "../../context/AppContext";
import UploadImages from "../../components/UploadImages";
import ApiController from "../../connection/ApiController";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
const Container = styled.div({
  width: '100%',
})
const FormAddCompany = () => {
  const [images,setImages]= React.useState([])
  const [emails, setEmails] = React.useState(["",""]);
  const { setLoader } = React.useContext(AppContext);
  const router = useRouter();
  const initialValues = {
    name: '',
    emails: [],
  };

  const uploadSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    email: Yup.string().email("Ingrese un email válido").min(10)
    ,
  });
  const handleSkip = () => {
    console.log(user._id)
    setLoader(true)
    ApiController.FirstSession({id:user._id}).then((e) => {
      console.log('respuesta de fist session')
      console.log(e)
      setLoader(false)
      router.push('dashBoard')
   })
  }
  return (
<Container>
          <Formik
      initialValues={initialValues}
      validationSchema={uploadSchema}
      onSubmit={(values) => {
        setLoader(true)
        ApiController.AddCompany({ values, img: images,id:localStorage.getItem("id") }).then((e) => {
          console.log(e)
          setLoader(false)
          router.push('dashBoard')
        })
      }}
    >
      {({ errors, touched, setFieldValue }) => {
        return (
          <Form>
        
                          <Grid
              container
              justifyContent={"space-around"}
              alignItems={"center"}
              rowSpacing={2}
            >
              <Grid item xs={12}>
                <UploadImages
                  textButton={"Cargar imagenes"}
                  images={images}
                  setImages={setImages}
                  label={"Imagenes del proyecto"}
                  maxNumber={1}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  name="name"
                  label="Nombre del proyecto"
                  error={errors.name}
                  touched={touched.name}
                  placeholder={"Nombre del proyecto"}
                  type={"textarea"}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  name={`email`}
                  label={`Correo`}
                  error={errors.emails && errors?.email}
                  touched={
                    touched.emails && touched.email ? touched.email : false
                  }
                  placeholder={`Correo`}
                  type={"text"}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent={'space-between'} alignItems={'center'} rowSpacing={2}>
                  <Grid item xs={12}md={6}>
                    <Button type="submit" style={{fontSize:'1.9vh'}} variant="contained">
                      Crear nueva compañia
                    </Button>
                  </Grid>
                  <Grid item xs={12}md={4}>
                    <Button variant="contained" style={{fontSize:'1.9vh'}} onClick={() => handleSkip()}>
                      Omitir este paso
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        );}}
      </Formik>
      <br/>
</Container>

  );
};
export default FormAddCompany;