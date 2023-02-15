import React from "react";
import ImageUploading, { type ImageListType } from "react-images-uploading";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import DeleteIcons from "./icons/DeleteIcon";
import ChangeIcon from "./icons/ChangeIcon";
import { type UploadImagesType } from "../types/app";
import { AadFilesBig, AadFilesSmall,AddIMageCircle } from "./icons/AadFile";
const Container = styled.div({
  width: "100%",
  height: "100%",
  padding: '6px 0',
  borderRadius: 2,
  overflow: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const Image = styled.img({
  width: "auto",
  height: "auto",
  maxWidth: " 100%",
  maxHeight: "100%",
  margin: 0,
});
const ContainerIcons = styled.div({
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
});
const Label = styled.p({
  color: "rgb(240,240,240)",
  textAlign: "left",
  fontSize: '2vh',
  marginBottom:8,
  fontFamily: "verdana",
});
const ContainerImage = styled.div({
  height: "15vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: 0,
});
const Card = styled.div({
  backgroundColor: "rgba(25,30,40,0.2)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2px 5px",
  borderRadius: 5,
  minHeight: "20vh",
  boxShadow: "0 1px 5px 0 rgba(0,0,0,0.3)",
});
const UploadImages = ({
  maxNumber,
  label,
  images,
  setImages,
  textButton,
  variant = 0
}: UploadImagesType) => {
  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    setImages(imageList as never[]);
  };

  return (
    <Grid container justifyContent={"center"}>
      <Grid item xs={12}>
        <Label>{label}</Label>
      </Grid>
      <Grid item xs={12}>
        <ImageUploading
          multiple
          maxFileSize={10000000} // 5MB
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="path"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            <>
              <Container
                onClick={images ? undefined : onImageUpload}
              >
                {imageList.length > 0 ? (
                  <>
                    <Grid
                      container
                      justifyContent={"center"}
                      alignItems={"center"}
                      rowSpacing={4}
                      columnSpacing={2}
                    >
                      {imageList.map((image: any, index: number) => (
                        <Grid key={index} item xs={10} md={5}>
                         <Card>
                            <Grid
                              container
                              justifyContent={"center"}
                              alignItems={"center"}
                              rowSpacing={1}
                            >
                              <Grid item xs={12}>
                            <ContainerImage>
                                  <Image src={image.path} alt="" />
                                </ContainerImage>
                           
                              </Grid>
                              <Grid item xs={10} md={12}>
                                <ContainerIcons>
                                  <ChangeIcon
                                    onClick={() => {
                                      onImageUpdate(index);
                                    }}
                                  />
                                  <DeleteIcons
                                    onClick={() => {
                                      onImageRemove(index);
                                    }}
                                  />
                                </ContainerIcons>
                              </Grid>
                            </Grid>
                          </Card>
                        </Grid>
                      ))}
                      {maxNumber === imageList.length ? (
                        <></>
                      ) : (
                        <Grid item xs={12}>
                          <AadFilesSmall onClick={onImageUpload} />
                        </Grid>
                      )}
                    </Grid>
                  </>
                ) : (<>
                    
                 {variant ===0 ? <AadFilesBig onClick={onImageUpload} />:<AddIMageCircle onClick={onImageUpload} />}
              
                </>  )}
              </Container>
            </>
          )}
        </ImageUploading>
      </Grid>
    </Grid>
  );
};

export default UploadImages;
