"use client";
import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import "./style.scss";
import { Button } from "@mui/material";
import EmailTemplateDialog from "../components/Dialog/EmailTemplateDialog";
import { usestatemailTemplateProps } from "@/MOCK_DATA";
import api from "../components/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

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
  useEffect(() => {
    const fetchHandlet = async () => {
      const res = await api.get("/getAllFields");
      const data = await res?.data;
      setFormHeadFields(data);
      console.log(data);
    };
    fetchHandlet();
    const FetchDtaHandler = async () => {
      const res = await api.get("/findAllUser");
      const data = await res?.data;
      setFormFields(data);
      console.log(data);
    };
    FetchDtaHandler();
  }, []);
  const columns: GridColDef[] = formHeadFields.map((field: any) => ({
    field: field.fieldName,
    headerName: field.fieldName,
    flex: 1,
    // width: 150, // Set the column width as needed
    // sortable: false, // Modify as needed
    // editable: false, // Modify as needed
  }));
  const FormHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(e);
    console.log(e.target);
    console.log(usestatemailTemplate);

    // const toMail = e.get("SelectEmailTemplateTo")?.toString();
    // const ccMail = e.get("SelectEmailTemplateCC")?.toString();
    // const mailSubject = e.get("EmailSubject")?.toString();
    // const mailBody = e.get("EmailBody")?.toString();
    // const data = {
    //   toMail,
    //   ccMail,
    //   mailBody,
    //   mailSubject,
    // };
    // console.log(data)
  };

  return (
    <>
      <Button
        onClick={() => {
          setemailDialog(!emailDialog);
        }}
        variant="contained"
        sx={{ alignSelf: "flex-end" }}
      >
        Email Template
      </Button>
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
      <div style={{ height: 400, width: 1000, overflowX: "hidden" }}>
        <DataGrid rows={formFields} columns={columns} />
      </div>
    </>
  );
};

export default AssetMaster;
