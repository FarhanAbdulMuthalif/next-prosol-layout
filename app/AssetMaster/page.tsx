"use client";
import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import "./style.scss";
import {
  Button,
  IconButton,
  Dialog,
  Badge,
  styled,
  Paper,
} from "@mui/material";
import EmailTemplateDialog from "../components/Dialog/EmailTemplateDialog";
import api, { URL_FIX_BASE_PATH } from "../components/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Image from "next/image";
import DownloadIcon from "@mui/icons-material/Download";

type FileDetailProps = {
  fileName: string;
  fileDownloadUri: string;
  fileType: string;
  size: number;
};

const AssetMaster = () => {
  const [emailDialog, setemailDialog] = useState(false);

  const [usestatemailTemplate, usestatesetmailTemplate] = useState<any>({
    ccText: "",
    bccText: "",
    toText: "",
    subject: "",
    body: "",
  });
  const [formHeadFields, setFormHeadFields] = useState([]);
  const [formFields, setFormFields] = useState([]);
  const [Open, setOpen] = useState(false);
  const [SelectFile, setSelectFile] = useState<any>({
    fileName: "",
    fileDownloadUri: "",
    fileType: "",
    size: 0,
  });
  const DialogHandler = () => {
    setOpen(!Open);
  };
  useEffect(() => {
    const fetchHandlet = async () => {
      const res = await api.get("/getAllFields");
      const data = await res?.data;
      setFormHeadFields(data);
      console.log(data);
    };
    fetchHandlet();
    const FetchDtaHandler = async () => {
      const res = await api.get("/getAllFormData?formName=User");
      const data = await res?.data;
      setFormFields(data);
      console.log(data);
    };
    FetchDtaHandler();
  }, []);
  const FuncGetfileString = (data: any) => {
    // console.log(data);
    const getData = data.map((dta: any) => {
      return `fileNames=${dta.fileName}`;
    });
    // console.log(getData);
    // console.log(getData.toString());
    // console.log(getData.toString().split(","));
    // console.log(getData.toString().split(",").join("&"));
    return getData.toString().split(",").join("&");
  };

  const renderDynamicField = (params: any) => {
    const fieldData = params.value;
    if (Array.isArray(fieldData)) {
      // Render MultiFile as images in a list
      return (
        <>
          <IconButton
            className="setting-flow-icon"
            onClick={() => {
              // console.log(fieldData);
              // console.log(params.id);
              setOpen(true);
              setSelectFile(fieldData);
              // FuncGetfileString(fieldData);
            }}
          >
            <Badge badgeContent={fieldData.length} color="primary">
              <VisibilityIcon sx={{ fontSize: "14px" }} color="action" />
            </Badge>
          </IconButton>
          <p> | </p>
          <IconButton
            className="setting-flow-icon"
            onClick={() => {
              console.log(fieldData);
            }}
          >
            <a
              href={`${URL_FIX_BASE_PATH}/downloadFiles/${
                params.id
              }?${FuncGetfileString(fieldData)}`}
              download={"File.zip"}
            >
              <DownloadIcon sx={{ fontSize: "14px" }} />
            </a>
          </IconButton>
        </>
      );
    } else if (typeof fieldData === "object") {
      return (
        <>
          <IconButton
            className="setting-flow-icon"
            onClick={() => {
              console.log(fieldData);
              setOpen(true);
              setSelectFile(fieldData);
            }}
          >
            <VisibilityIcon sx={{ fontSize: "14px" }} />
          </IconButton>
          <p> | </p>
          <IconButton
            className="setting-flow-icon"
            onClick={() => {
              console.log(fieldData);
            }}
          >
            <a href={fieldData.fileDownloadUri} download={fieldData.fileName}>
              <DownloadIcon sx={{ fontSize: "14px" }} />
            </a>
          </IconButton>
        </>
      );
    } else {
      return null; // Return null for unsupported field types
    }
  };
  const columns: GridColDef[] = [
    {
      field: "id", // Assuming 'id' is the field name for your unique identifier
      headerName: "ID", // Column header text
      flex: 1, // Adjust width as needed
    },
    ...formHeadFields.map((field: any) => {
      if (field.dataType === "fileUpload") {
        return {
          field: field.fieldName,
          headerName: field.fieldName,
          flex: 1,
          renderCell: renderDynamicField,
        };
      }

      return {
        field: field.fieldName,
        headerName: field.fieldName,
        flex: 1,
      };
    }),
  ];
  const FormHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(e);
    console.log(e.target);
    console.log(usestatemailTemplate);
  };

  return (
    <>
      {/* <Button
        onClick={() => {
          setemailDialog(!emailDialog);
        }}
        variant="contained"
        sx={{ alignSelf: "flex-end" }}
      >
        Email Template
      </Button> */}
      <EmailTemplateDialog
        open={emailDialog}
        handleClose={() => {
          setemailDialog(!emailDialog);
        }}
        usestatesetmailTemplate={usestatesetmailTemplate}
        usestatemailTemplate={usestatemailTemplate}
        content="Email Template"
        handleOk={(e) => {
          FormHandler(e);
        }}
      />
      <Paper
        style={{
          height: "95%",
          width: "98%",
          overflowX: "hidden",
          marginTop: "10px",
        }}
      >
        <DataGrid
          rows={formFields}
          columns={columns}
          sx={{
            "&  .MuiDataGrid-columnSeparator": {
              display: "none !important",
              padding: 0,
              margin: 0,
            },

            "&  .MuiDataGrid-columnHeader": {
              backgroundColor: "#e6effc",
            },
            "&  .MuiDataGrid-columnHeaderTitle": {
              color: "#0000ff",
              fontWeight: 500,
            },

            "&  .MuiDataGrid-cell": {
              fontSize: "13px",
            },
            "&  .MuiDataGrid-sortIcon": {
              color: "#253858",
            },
            "&  .MuiDataGrid-menuIconButton": {
              color: "#253858",
            },

            "&  .MuiDataGrid-columnHeaderCheckbox": {
              backgroundColor: "white",
              "&  .MuiDataGrid-checkboxInput": {
                color: "#253858",
              },
            },

            transition: "all 500ms ease;",
          }}
        />
      </Paper>
      <Dialog onClose={DialogHandler} open={Open}>
        <div className="Dialog-view">
          {Array.isArray(SelectFile) ? (
            SelectFile.map((data: FileDetailProps) => (
              <div key={data.fileName} className="image-preview">
                <a href={data.fileDownloadUri} download={data.fileName}>
                  <DownloadIcon
                    sx={{
                      fontSize: "14px",
                      position: "absolute",
                      top: 0,
                      right: 0,
                      zIndex: 1,
                    }}
                  />
                </a>
                {data.fileType.startsWith("image/") ? (
                  <Image
                    src={data.fileDownloadUri}
                    alt={`loading....`}
                    fill={true}
                  />
                ) : data.fileType === "application/pdf" ? (
                  <Image
                    src={"/Images/pdf-icon.svg"}
                    alt={`Preview ${data.fileName}`}
                    fill={true}
                  />
                ) : data.fileType === "text/plain" ? (
                  <Image
                    src={"/Images/textFileImage.png"}
                    alt={`Preview ${data.fileName}`}
                    fill={true}
                  />
                ) : data.fileType ===
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (
                  <Image
                    src={"/Images/excelImage.svg"}
                    alt={`Preview ${data.fileName}`}
                    fill={true}
                  />
                ) : null}
              </div>
            ))
          ) : (
            <div className="image-preview-full">
              {SelectFile.fileType.startsWith("image/") ? (
                <Image
                  src={SelectFile.fileDownloadUri}
                  alt={`loading....`}
                  height={400}
                  width={400}
                />
              ) : SelectFile.fileType === "application/pdf" ? (
                <Image
                  src={"/Images/pdf-icon.svg"}
                  alt={`Preview ${SelectFile.fileName}`}
                  height={200}
                  width={200}
                />
              ) : SelectFile.fileType === "text/plain" ? (
                <Image
                  src={"/Images/textFileImage.png"}
                  alt={`Preview ${SelectFile.fileName}`}
                  height={200}
                  width={200}
                />
              ) : SelectFile.fileType ===
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (
                <Image
                  src={"/Images/excelImage.svg"}
                  alt={`Preview ${SelectFile.fileName}`}
                  height={200}
                  width={200}
                />
              ) : null}
            </div>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default AssetMaster;
