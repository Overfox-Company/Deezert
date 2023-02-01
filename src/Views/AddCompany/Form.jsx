import React from "react";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { Grid,Button } from "@mui/material";
import Input from "../../components/Input";
import * as Yup from "yup";
import { AppContext } from "../../context/AppContext";
import UploadImages from "../../components/UploadImages";
import ApiController from "../../connection/ApiController";
import { useRouter } from "next/router";

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

  return (
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
            
                                      <Input
            
                    name={`email`}
                    label={`Correo`}
                    error={errors.emails && errors?.email}
                    touched={touched.emails && touched.email ? touched.email : false}
                    placeholder={`Correo`}
                    type={"text"}
                    />
  
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