import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  FormControl,
  RadioGroup,
  Checkbox,
  Typography,
  FormControlLabel,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import CloseIcon from "@mui/icons-material/Close";
import "./RoleCreationDialog.scss";

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  handleOk: () => void;
  content: string[];
}
type pvlgProps = {
  id: string;
  create: string;
  read: string;
  update: string;
  delete: string;
  content: string;
};

export default function RoleCreationDialog({
  open,
  handleClose,
  content,
  handleOk,
}: DialogProps) {
  const modules: pvlgProps[] = [
    {
      id: "1",
      create: "",
      read: "",
      update: "",
      delete: "",
      content: "User Management",
    },
    {
      id: "2",
      create: "",
      read: "",
      update: "",
      delete: "",
      content: "Master Data",
    },
    {
      id: "3",
      create: "",
      read: "",
      update: "",
      delete: "",
      content: "Material Master",
    },
    {
      id: "4",
      create: "",
      read: "",
      update: "",
      delete: "",
      content: "Tenant",
    },
    {
      id: "5",
      create: "",
      read: "",
      update: "",
      delete: "",
      content: "Asset Master",
    },
  ];
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
  let checkboxStyle = { "& .MuiSvgIcon-root": { fontSize: 18 } };
  let labelcheckboxStyle = {
    fontSize: "0.8rem",
    margin: "0 ",
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
      <DialogContent className="dig-content">
        <div className="input-section">
          <label className="input-lbl-role" htmlFor="roleName">
            Role Name
            <TextField
              id="roleName"
              size="small"
              placeholder="Enter RoleName"
            />
          </label>
          <label className="input-lbl-role" htmlFor="roleId">
            Role ID
            <TextField id="roleId" size="small" placeholder="Enter RoleId" />
          </label>
          <label className="input-lbl-role" htmlFor="plantName">
            Plant Name
            <TextField
              id="plantName"
              size="small"
              placeholder="Enter PlantName"
            />
          </label>
          <label className="input-lbl-role" htmlFor="plantDesc">
            Plant Description
            <TextField
              id="plantDesc"
              size="small"
              placeholder="Enter RoleDesciption"
              rows={2}
              multiline
            />
          </label>
        </div>
        <div className="previlage-section">
          <span>Access Privileges</span>
          <TableContainer>
            <Table
              size="small"
              aria-label="a dense table"
              sx={{ border: "1px solid  #E0E0E0", borderRadius: "3px" }}
            >
              <TableBody>
                {modules?.map((data: pvlgProps) => (
                  <TableRow key={data.id}>
                    <TableCell>{data.content}</TableCell>
                    <TableCell
                      sx={{ border: "1px solid  #E0E0E0", borderRadius: "3px" }}
                    >
                      <FormControl sx={{ width: "100%" }}>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          row
                          name="privilage"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            height: "100%",
                            width: "100%",
                          }}
                        >
                          <FormControlLabel
                            value="create"
                            control={
                              <Checkbox sx={checkboxStyle} size="small" />
                            }
                            label={
                              <Typography
                                variant="body2"
                                sx={labelcheckboxStyle}
                              >
                                Create
                              </Typography>
                            }
                          />
                          <FormControlLabel
                            value="read"
                            control={
                              <Checkbox sx={checkboxStyle} size="small" />
                            }
                            label={
                              <Typography
                                variant="body2"
                                sx={labelcheckboxStyle}
                              >
                                Read
                              </Typography>
                            }
                          />
                          <FormControlLabel
                            value="update"
                            control={
                              <Checkbox sx={checkboxStyle} size="small" />
                            }
                            label={
                              <Typography
                                variant="body2"
                                sx={labelcheckboxStyle}
                              >
                                Update
                              </Typography>
                            }
                          />
                          <FormControlLabel
                            value="delete"
                            control={
                              <Checkbox sx={checkboxStyle} size="small" />
                            }
                            label={
                              <Typography
                                variant="body2"
                                sx={labelcheckboxStyle}
                              >
                                Delete
                              </Typography>
                            }
                          />
                          {/* <FormControlLabel
                            value="import"
                            control={
                              <Checkbox sx={checkboxStyle} size="small" />
                            }
                            label={
                              <Typography
                                variant="body2"
                                sx={labelcheckboxStyle}
                              >
                                Import
                              </Typography>
                            }
                          />
                          <FormControlLabel
                            value="export"
                            control={
                              <Checkbox sx={checkboxStyle} size="small" />
                            }
                            label={
                              <Typography
                                variant="body2"
                                sx={labelcheckboxStyle}
                              >
                                Export
                              </Typography>
                            }
                          /> */}
                        </RadioGroup>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
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
