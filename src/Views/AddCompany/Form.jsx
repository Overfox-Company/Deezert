import React from "react";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { Grid,Button } from "@mui/material";
import Input from "../../components/Input";
import * as Yup from "yup";
import { AppContext } from "../../context/AppContext";
import UploadImages from "../../components/UploadImages";
import ApiController from "../../connection/ApiController";


const FormAddCompany = () => {
  const [images,setImages]= React.useState([])
  const [emails, setEmails] = React.useState(["",""]);
const {setLoader}=React.useContext(AppContext)
  const initialValues = {
    name: '',
    emails: emails.map(() => ''),
  };

  const uploadSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    emails: Yup.array().of(
      Yup.string().email("Ingrese un email válido").min(10)
    ),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={uploadSchema}
      onSubmit={(values) => {
        setLoader(true)
        console.log({ values, img: images });
        ApiController.AddCompany({ values, img: images,id:localStorage.getItem("id") }).then((e) => {
          console.log(e)
           setLoader(false)
        })
      }}
    >
      {({ errors, touched, setFieldValue }) => {
        return(
        <Form>
          <Grid container justifyContent={"center"} alignItems={"center"}>
            <Grid item xs={10}>
  <UploadImages
    textButton={"Cargar imagenes"}
    images={images}
    setImages={setImages}
    label={"Imagenes del proyecto"}
    maxNumber={1}
  />
</Grid>
            <Grid item xs={10}>
              <Input
                name="name"
                label="Nombre del proyecto"
                error={errors.name}
                touched={touched.name}
                placeholder={"Nombre del proyecto"}
                type={"textarea"}
              />
            </Grid>
            <Grid item xs={10}>
              {emails.map((item, index) => {
                return (
                  <>
                                      <Input
                    key={index}
                    name={`emails.${index}`}
                    label={`Correo ${index + 1}`}
                    error={errors.emails && errors?.emails[index]}
                    touched={touched.emails && touched.emails[index] ? touched.emails[index] : false}
                    placeholder={`Correo ${index + 1}`}
                    type={"text"}
                    />
                  </>

                );
              })}
            </Grid>
            <Grid item xs={12}>
                <Button
                  type='submit'
                variant="contained"
                
              >
               Crear nueva compañia
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}}
    </Formik>
  );
};
export default FormAddCompany;