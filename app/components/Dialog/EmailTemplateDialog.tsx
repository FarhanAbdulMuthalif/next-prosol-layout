"use client";
import React, { FormEvent, ChangeEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { usestatemailTemplateProps } from "@/MOCK_DATA";

interface EmailDialogProps {
  open: boolean;
  handleClose: () => void;
  handleOk: (e: FormEvent) => void;
  content: string;
  usestatemailTemplate: any;
  usestatesetmailTemplate: (prev: any) => void;
}
const EmailTemplateDialog = ({
  open,
  handleClose,
  content,
  handleOk,
  usestatesetmailTemplate,
  usestatemailTemplate,
}: EmailDialogProps) => {
  const InputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    usestatesetmailTemplate((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const SelectHandler = (e: SelectChangeEvent) => {
    usestatesetmailTemplate((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form onSubmit={handleOk}>
        <DialogTitle id="alert-dialog-title">{content}</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "30rem",
          }}
        >
          {/* <DialogContentText id="alert-dialog-description">
          set up the email content
        </DialogContentText> */}
          <section
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              gap: "5px",
            }}
          >
            <label htmlFor="SelectEmailTemplateTo">
              Select email to :
              <Select
                id="SelectEmailTemplateTo"
                name="toText"
                value={usestatemailTemplate.toText}
                onChange={SelectHandler}
                renderValue={(value) =>
                  value ? value.toString() : "Select Field"
                }
                // sx={{ width: "8rem" }}
                fullWidth
              >
                <MenuItem sx={{ fontSize: "12px", color: "#5E5873" }} value="">
                  Select Field
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "12px", color: "#5E5873" }}
                  value="approver"
                >
                  Approver
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "12px", color: "#5E5873" }}
                  value="cataloger"
                >
                  Cataloger
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "12px", color: "#5E5873" }}
                  value="requester"
                >
                  Requester
                </MenuItem>
              </Select>
            </label>
            <label htmlFor="SelectEmailTemplateCC">
              Select email cc :
              <Select
                id="SelectEmailTemplateCC"
                name="ccText"
                onChange={SelectHandler}
                fullWidth
                value={usestatemailTemplate.ccText}
                renderValue={(value) =>
                  value.length > 0 ? value.toString() : "Select Field"
                }
                // sx={{ width: "8rem" }}
              >
                <MenuItem sx={{ fontSize: "12px", color: "#5E5873" }} value="">
                  Select Field
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "12px", color: "#5E5873" }}
                  value="approver"
                >
                  Approver
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "12px", color: "#5E5873" }}
                  value="cataloger"
                >
                  Cataloger
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "12px", color: "#5E5873" }}
                  value="requester"
                >
                  Requester
                </MenuItem>
              </Select>
            </label>
            <label htmlFor="SelectEmailTemplateBCC">
              Select email bcc :
              <Select
                id="SelectEmailTemplateBCC"
                name="bccText"
                onChange={SelectHandler}
                value={usestatemailTemplate.bccText}
                renderValue={(value) =>
                  value.length > 0 ? value.toString() : "Select Field"
                }
                // sx={{ width: "8rem" }}
                fullWidth
              >
                <MenuItem sx={{ fontSize: "12px", color: "#5E5873" }} value="">
                  Select Field
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "12px", color: "#5E5873" }}
                  value="approver"
                >
                  Approver
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "12px", color: "#5E5873" }}
                  value="cataloger"
                >
                  Cataloger
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "12px", color: "#5E5873" }}
                  value="requester"
                >
                  Requester
                </MenuItem>
              </Select>
            </label>
          </section>
          <TextField
            value={usestatemailTemplate.subject}
            onChange={InputHandler}
            name="subject"
            id="EmailSubject"
            placeholder="Enter Email Subject"
          />
          <TextField
            placeholder="Enter Email Body Content"
            multiline
            id="EmailBody"
            onChange={InputHandler}
            name="body"
            value={usestatemailTemplate.body}
            rows={5}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant="contained" type="submit" autoFocus>
            OK
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EmailTemplateDialog;
