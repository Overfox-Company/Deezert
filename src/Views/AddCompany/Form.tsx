import React from "react";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import { Grid } from "@mui/material";
import Input from "../../components/Input";
import * as Yup from "yup";
import { AddCompanyTypes } from "../../types/app";
import UploadImages from "../../components/UploadImages";
const initialValues: AddCompanyTypes = {
  name: "",
};
const uploadSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "El nombre del proyecto es muy corto")
    .max(15, "El nombre del proyecto es muy largo")
    .required("El nombre del proyecto es obligatorio"),
});
const FormAddCompany = () => {
  const [images, setImages] = React.useState<any[]>([]);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={uploadSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Grid container justifyContent={"center"} alignItems={'center'}>
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
                name="name"
                label="Nombre del proyecto"
                error={errors.name}
                touched={touched.name}
                placeholder={"Nombre del proyecto"}
                type={"textarea"}
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
export default FormAddCompany;
