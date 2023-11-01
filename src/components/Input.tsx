// Eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
import React from "react";
import { Field } from "formik";
import styled from "@emotion/styled";
import { CORRECT, ERROR } from "../constants/Color";
import CheckIcon from "./icons/CheckIcon";
import ErrorIcon from "./icons/ErrorIcon";
import { InputProps } from "../types/app";
import { P } from "./BasicComponents";
import { Container, Item } from "./Container";
//Deezert es una aplicacion para la gestion empresarial, tanto del lado de recursos humanos como la gestion administrativa y la gestion de proyectos
const TextInput = styled(Field)({
  padding: 5,
  paddingRight: 20,
  backgroundColor: "rgba(20,20,30,0.2)",
  borderRadius: 4,
  border: "solid 1.8px rgba(200,200,200,0)",
  outline: "none",
  width: "100%",
  color: "rgb(180,180,180)",
});
const Error = styled.p({
  color: ERROR,
  fontSize: 12,
  margin: 0,
  marginTop: 5,
  textAlign: "left",
  letterSpacing: 2,
  fontFamily: "Varela Round, sans-serif",
});
const ContainerInput = styled.div({
  width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "space-beetwen",
});

const Input: React.FC<InputProps> = ({
  icon,
  name,
  label,
  error,
  touched,
  placeholder,
  type,
  as,
  rows,
  cols,
  children,
}) => (
  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      flexDirection: "column",
    }}
  >
    <ContainerInput>
      < Container
        justifyContent={"flex-start"}
        alignItems={"center"}
        columnSpacing={3}
      >
        {label && (
          <Item xs={12}>
            <P
              style={{
                width: "100%",
                fontSize: "2vh",
                textAlign: "left",
              }}
            >
              {label}
            </P>
          </Item>
        )}
        <Item xs={11}>
          <TextInput
            className="Input"
            style={{
              borderColor: error && touched ? ERROR : touched && CORRECT,
              fontSize: "2vh",
            }}
            name={name}
            placeholder={placeholder}
            type={type}
            as={as ?? null}
            rows={rows}
            cols={cols}
          >
            {children}
          </TextInput>
        </Item>
        {icon && (
          <Item xs={1}>
            {error && touched && <ErrorIcon />}
            {touched && !error && <CheckIcon />}
          </Item>
        )}
      </ Container>
    </ContainerInput>
    {error && touched ? <Error>{error}</Error> : null}
  </div>
);
export default Input;
