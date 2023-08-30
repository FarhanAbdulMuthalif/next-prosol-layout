import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  handleOk: () => void;
  content: string;
}

export default function FlowDialogComp({
  open,
  handleClose,
  content,
  handleOk,
}: DialogProps) {
  const [value, setValue] = React.useState("directional");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const DlgCntStyle = {
    width: "33rem",
    height: "15rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ borderBottom: "1px solid rgba(0, 0, 255, 0.1) " }}
      >
        {`${content} Module`}{" "}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          sx={{ marginBottom: "5px", borderBottom: ".5px solid #888E94" }}
        >
          <Tab label="Set Directional" value="directional" />
          <Tab label="Email Trigger" value="emailTrigger" />
        </Tabs>
        {value === "directional" ? (
          <div style={DlgCntStyle}>
            <h1>Directonal</h1>
          </div>
        ) : (
          ""
        )}
        {value === "emailTrigger" ? (
          <div style={DlgCntStyle}>
            <h1>Email Trigger</h1>
          </div>
        ) : (
          ""
        )}
      </DialogContent>
      <DialogActions sx={{ borderTop: "1px solid rgba(0, 0, 255, 0.1) " }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleOk} autoFocus variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
