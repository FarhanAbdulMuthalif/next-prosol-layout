import { Snackbar } from "@mui/material";
import React from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
interface SnackBarSuccessProps {
  open: boolean;
  handleClose: () => void;
  content: string;
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function SnackBarSuccess({
  open,
  handleClose,
  content,
}: SnackBarSuccessProps) {
  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {content}
      </Alert>
    </Snackbar>
  );
}
