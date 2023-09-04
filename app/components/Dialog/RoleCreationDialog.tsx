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
  content: string[];
}

export default function RoleCreationDialog({
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
        Role Creation
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
      <DialogContent></DialogContent>
      <DialogActions sx={{ borderTop: "1px solid rgba(0, 0, 255, 0.1) " }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleOk} autoFocus variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
