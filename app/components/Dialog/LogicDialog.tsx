import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { LogicStateObjFld, PostCreateFieldData } from "@/MOCK_DATA";

type LogicProps = {
  open: boolean;
  onClose: () => void;
  SubmitHandler: (data: LogicStateObjFld) => void;
  wholeForm: PostCreateFieldData[];
  selectedData: PostCreateFieldData;
};

const LogicDialog = ({
  open,
  onClose,
  SubmitHandler,
  wholeForm,
  selectedData,
}: LogicProps) => {
  const [LogicFieldSelect, setLogicFieldSelect] = useState("");
  const [LogicFieldRadio, setLogicFieldRadio] = useState("");
  const [value, setValue] = React.useState("basic");
  const [formuleaText, setFormuleaText] = React.useState("");
  const [formuleaFieldName, setFormuleaFieldName] = React.useState("");
  const handlerFormuleaText = (e: ChangeEvent<HTMLInputElement>) => {
    setFormuleaText(e.target.value as string);
  };
  const handlerFormuleaFieldName = (e: ChangeEvent<HTMLInputElement>) => {
    setFormuleaFieldName(e.target.value as string);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const LogicFieldSelectHandler = (e: SelectChangeEvent) => {
    setLogicFieldSelect(e.target.value as string);
  };

  const handleRadioButtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogicFieldRadio(e.target.value);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ m: 0, p: 2, borderBottom: "1px solid rgba(0, 0, 0, 0.218)" }}
        >
          Textfield Logic
          <IconButton
            aria-label="close"
            onClick={onClose}
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
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
        >
          <DialogContentText
            sx={{ marginTop: "8px" }}
            id="alert-dialog-description"
          >
            {`please choose the option if it's necessory it may affect data in records on form submission`}
          </DialogContentText>
          <label>
            Selected Field :
            <span
              style={{
                fontWeight: "600",
                marginLeft: "5px",
                padding: "5px 10px",

                borderRadius: "5px",
                backgroundColor: "#e3e6e4",
              }}
            >
              {selectedData.fieldName}
            </span>
          </label>

          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            sx={{ marginBottom: "5px", borderBottom: ".5px solid #888E94" }}
          >
            <Tab label="Basic Logic" value="basic" />
            <Tab
              label="Formulea Logic"
              value="formulea"
              disabled={selectedData.identity === "number" ? false : true}
            />
          </Tabs>
          {value === "basic" ? (
            <>
              <label
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "5px",
                }}
              >
                Select :
                <Select
                  labelId="DrawerInputIdSelect"
                  id="DrawerInputIdSelect"
                  value={LogicFieldSelect}
                  onChange={LogicFieldSelectHandler}
                  sx={{ fontSize: "12px", color: "brown" }}
                  displayEmpty
                  style={{ height: 40, width: "19rem", marginLeft: "2rem" }}
                  renderValue={(value) =>
                    value ? value.toString() : "Select Field"
                  }
                >
                  <MenuItem
                    sx={{ fontSize: "12px", color: "#5E5873" }}
                    value=""
                    disabled
                  >
                    Select Field
                  </MenuItem>
                  {wholeForm?.map((data: PostCreateFieldData) => {
                    return data.dataType === "textField" &&
                      selectedData.identity === data.identity &&
                      selectedData.fieldName !== data.fieldName ? (
                      <MenuItem
                        value={data.fieldName}
                        key={data.fieldName}
                        sx={{ fontSize: "12px", color: "#5E5873" }}
                      >
                        {data?.fieldName}
                      </MenuItem>
                    ) : (
                      ""
                    );
                  })}
                </Select>
              </label>
              <label
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                Selected Logic Type :
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    row
                    value={LogicFieldRadio}
                    onChange={handleRadioButtonChange}
                  >
                    <FormControlLabel
                      value="equal"
                      control={<Radio size="small" />}
                      label={
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "0.875rem",
                            margin: "0 ",
                          }}
                        >
                          Equal Check
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value="add"
                      control={<Radio size="small" />}
                      label={
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "0.875rem",
                            margin: "0 ",
                          }}
                        >
                          Add
                        </Typography>
                      }
                    />
                    {selectedData.identity === "number" ? (
                      <>
                        <FormControlLabel
                          value="divide"
                          control={<Radio size="small" />}
                          label={
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: "0.875rem",
                                margin: "0 ",
                              }}
                            >
                              dividend
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          value="multiple"
                          control={<Radio size="small" />}
                          label={
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: "0.875rem",
                                margin: "0 ",
                              }}
                            >
                              Multiple
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          value="greater"
                          control={<Radio size="small" />}
                          label={
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: "0.875rem",
                                margin: "0 ",
                              }}
                            >
                              Greater
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          value="lesser"
                          control={<Radio size="small" />}
                          label={
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: "0.875rem",
                                margin: "0 ",
                              }}
                            >
                              Lesser
                            </Typography>
                          }
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </RadioGroup>
                </FormControl>
              </label>
            </>
          ) : (
            <>
              <TextField
                placeholder="Enter fieldname to store the formula"
                autoComplete="off"
                value={formuleaFieldName}
                onChange={handlerFormuleaFieldName}
              />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {wholeForm.map((data: PostCreateFieldData) => {
                  return data.dataType === "textField" &&
                    data.identity === "number" ? (
                    <p
                      style={{
                        border: "0.5px solid #888E94",
                        padding: "3px 5px",
                        borderRadius: "3px",
                        backgroundColor: "#D3D3D3",
                        color: "#5D6873",
                        fontWeight: "500",
                      }}
                    >
                      {data.fieldName}
                    </p>
                  ) : (
                    ""
                  );
                })}
              </div>
              <TextField
                placeholder="Write Formulea Here"
                autoComplete="off"
                value={formuleaText}
                onChange={handlerFormuleaText}
              />
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.218)" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            autoFocus
            onClick={() => {
              if (value === "basic") {
                SubmitHandler({
                  name: selectedData.fieldName,
                  selectField: LogicFieldSelect,
                  logic: LogicFieldRadio,
                  formulea: false,
                });
              } else {
                SubmitHandler({
                  name: selectedData.fieldName,
                  selectField: LogicFieldSelect,
                  formulea: true,
                  logic: formuleaText,
                  fieldName: formuleaFieldName,
                });
              }
              setLogicFieldRadio("");
              setLogicFieldSelect("");
              setValue("basic");
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LogicDialog;
