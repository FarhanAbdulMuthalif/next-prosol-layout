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
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
              style={{ height: 40, width: "19rem" }}
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
                    />{" "}
                  </>
                ) : (
                  ""
                )}
              </RadioGroup>
            </FormControl>
          </label>
        </DialogContent>

        <DialogActions sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.218)" }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            autoFocus
            onClick={() => {
              SubmitHandler({
                name: selectedData.fieldName,
                selectField: LogicFieldSelect,
                logic: LogicFieldRadio,
              });
              setLogicFieldRadio("");
              setLogicFieldSelect("");
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
