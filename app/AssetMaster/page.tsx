"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import "./style.scss";
import { Button } from "@mui/material";
import EmailTemplateDialog from "../components/Dialog/EmailTemplateDialog";
import { usestatemailTemplateProps } from "@/MOCK_DATA";
import api from "../components/api";

const AssetMaster = () => {
  const [emailDialog, setemailDialog] = useState(false);
  const [jhhhh, setjhhhh] = useState<null | File>(null);
  const [usestatemailTemplate, usestatesetmailTemplate] = useState<any>({
    ccText: "",
    bccText: "",
    toText: "",
    subject: "",
    body: "",
  });
  const FIleApiHandler = async (dataFile: File) => {
    try {
      const response = await api.post("/uploadFile/52?action=u", dataFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response?.data;
      console.log(response);
      console.log(data);
      if (response.status === 200) {
        alert("sucessfully upload");
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  const UploadHandlerIMG = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      FIleApiHandler(file);
    }
  };
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
    <div>
      <Button
        onClick={() => {
          setemailDialog(!emailDialog);
        }}
        variant="contained"
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
      <input type="file" onChange={UploadHandlerIMG} />
    </div>
  );
};

export default AssetMaster;
