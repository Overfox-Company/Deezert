import React, { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Grid, Button } from "@mui/material";
import * as Yup from "yup";
import UploadImages from "../../../../components/UploadImages";
import Input from "../../../../components/Input";
import ApiController from "../../../../connection/ApiController";
import { AppContext } from "../../../../context/AppContext";
import { ProyectsContext } from "../../../../context/ProyectsContext";
const uploadSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  description: Yup.string()
    .required("La descripcion del proyecto es requerida")
    .min(10),
});
const FormProyects = ({ closeForm }: any) => {
  const [images, setImages] = useState([]);
  const { selectedCompany, setLoader } = useContext(AppContext);
  const { setWorkspaces } = useContext(ProyectsContext);
  const [update, setUpdate] = useState(true);
  const initialValues = {
    name: "",
    description: "",
  };
  useEffect(() => {

    if (selectedCompany._id) {
      ApiController.GetWorkspace({ id: selectedCompany._id }).then((e) => {
        console.log(e);
        setWorkspaces(e.data);
        setUpdate(false);
        setLoader(false);
      });
    }
  }, [update, selectedCompany]);
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={uploadSchema}
        onSubmit={(values) => {
          setLoader(true);
          ApiController.AddWorkspaces({
            value: values,
            img: images,
            id: selectedCompany._id,
          }).then((e) => {
            console.log(e);
            closeForm();
            setUpdate(true);
            setLoader(false);
          }).catch(e => {
            console.log('se trono aca krnal')
console.log(e)
          });
        }}
      >
        {({ errors, touched, setFieldValue }) => {
          return (
            <Form>
              <Grid container justifyContent={"space-between"} rowSpacing={2}>
                <Grid item xs={12}>
                  <UploadImages
                    textButton={"Cargar imagenes"}
                    images={images}
                    setImages={setImages}
                    label={"Imagenes del proyecto"}
                    maxNumber={1}
                    variant={1}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="name"
                    label="Nombre del proyecto"
                    error={errors.name}
                    touched={touched.name}
                    placeholder={"Nombre del proyecto"}
                    type={"textarea"}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    name="description"
                    label="Descripcion del proyecto"
                    error={errors.description}
                    touched={touched.description}
                    placeholder={"Descripcion del proyecto"}
                    type={"textarea"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant={"contained"}>
                    Crear nuevo poryecto
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
export default FormProyects;
