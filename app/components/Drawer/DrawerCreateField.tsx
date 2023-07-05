import {
  Button,
  Drawer,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TextField,
  FormControlLabel,
  Switch,
  Chip,
  FormGroup,
  Checkbox,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./DrawerCreateField.scss";
import { useState } from "react";

function DrawerCreateField(props: any) {
  // const [inputValue, setInputValue] = useState("");
  // const [includeSpecialChars, setIncludeSpecialChars] = useState(false);
  // const [includeNumbers, setIncludeNumbers] = useState(false);
  // const [includeAlphabets, setIncludeAlphabets] = useState(false);
  // const [includeCapitalLetters, setIncludeCapitalLetters] = useState(false);

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(event.target.value);
  // };

  // const validateInput = () => {
  //   let validationRegex = "";

  //   if (SplRulArr.includes("spl")) {
  //     validationRegex += "(?=.*[@#$%^&+=])";
  //   }
  //   if (SplRulArr.includes("num")) {
  //     validationRegex += "(?=.*\\d)";
  //   }
  //   if (SplRulArr.includes("alp")) {
  //     validationRegex += "(?=.*[a-zA-Z])";
  //   }
  //   if (SplRulArr.includes("cap")) {
  //     validationRegex += "(?=.*[A-Z])";
  //   }

  //   // validationRegex += "^(?!.*\\s)"; // No space validation

  //   if (validationRegex === "^(?!.*\\s)") {
  //     // No validation rules selected, return true
  //     return true;
  //   }

  //   const regex = new RegExp(`${validationRegex}.+$`);
  //   // console.log(validationRegex.toString());

  //   return regex.test(inputValue);
  // };
  return (
    <Drawer
      anchor={"right"}
      variant="temporary"
      open={props.openInputDrawer}
      onClose={props.HandlerToggleDrawer}
    >
      <form
        style={{
          width: "350px",
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          padding: "15px 25px",
        }}
        onSubmit={props.SubmitHandler}
        /* role="presentation" */
      >
        <header
          style={{
            width: "100%",
            height: "40px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #5353533b",
          }}
        >
          <span
            style={{
              fontSize: "15px",
              color: "282828",
              fontWeight: "500",
            }}
          >
            Add New Field
          </span>
          <IconButton onClick={props.HandlerToggleDrawer}>
            <CloseIcon />
          </IconButton>
        </header>
        <div className="top-center">
          {/* <TextField
            value={inputValue}
            onChange={handleInputChange}
            error={!validateInput()}
            helperText={!validateInput() ? "Invalid input" : ""}
          /> */}

          <label htmlFor="DrawerInputId">Select Field Type</label>
          <Select
            labelId="DrawerInputIdSelect"
            id="DrawerInputIdSelect"
            value={props.FieldTypeSelect}
            onChange={props.handleFieldTypeChangeSelect}
            placeholder="select"
            sx={{
              fontSize: "12px",
              color: "brown",
            }}
            displayEmpty
            style={{
              height: 40,
              width: "19rem",
            }}
            renderValue={(value) => (value ? value.toString() : "Select Field")}
          >
            <MenuItem
              sx={{
                fontSize: "12px",
                color: "#5E5873",
              }}
              value={"textbox"}
            >
              Textbox
            </MenuItem>
            <MenuItem
              sx={{
                fontSize: "12px",
                color: "#5E5873",
              }}
              value={"textarea"}
            >
              Textarea
            </MenuItem>
            <MenuItem
              sx={{
                fontSize: "12px",
                color: "#5E5873",
              }}
              value={"dropdown"}
            >
              Dropdown
            </MenuItem>
            <MenuItem
              sx={{
                fontSize: "12px",
                color: "#5E5873",
              }}
              value={"radiobutton"}
            >
              Radiobutton
            </MenuItem>
          </Select>
        </div>
        {props.FieldTypeSelect === "textarea" ? (
          <div
            className="center-Part"
            style={{
              width: "100%",
              // height: "40%",
              display: "flex",
              flexGrow: "1",
              gap: "15px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label
              htmlFor="DrawerInputId"
              style={{
                alignSelf: "flex-start",
              }}
            >
              Enter Name *
            </label>
            <TextField
              size="small"
              id="DrawerInputId"
              name="name"
              placeholder="Enter Name"
              onChange={props.nameHandler}
              value={props.name} // error={Boolean(formErrors.PlantCode)}
              autoComplete="off" // helperText={formErrors.PlantCode}
            />

            <label
              htmlFor="DrawerInputId"
              style={{
                alignSelf: "flex-start",
              }}
            >
              Enter Placeholder Text *
            </label>
            <TextField
              size="small"
              id="DrawerInputId"
              sx={{
                fontSize: "12px",
              }}
              name="placeholder"
              placeholder="Enter Placeholder"
              onChange={props.PlaceHolderHandler}
              value={props.placeHolder} // error={Boolean(formErrors.PlantCode)}
              autoComplete="off" // helperText={formErrors.PlantCode}
            />
            <label
              id="DrawerInputIdSelect"
              style={{
                alignSelf: "flex-start",
              }}
            >
              Select Number of lines *
            </label>

            {/* <InputLabel
           sx={{ fontSize: "12px" }}
           id="demo-simple-select-label"
          >
           ET Type
          </InputLabel> */}
            <Select
              labelId="DrawerInputIdSelect"
              id="DrawerInputIdSelect"
              value={props.inputType}
              onChange={props.handleChangeSelect}
              placeholder="select"
              sx={{
                fontSize: "12px",
                color: "brown",
              }}
              displayEmpty
              style={{
                height: 40,
                width: "19rem",
              }}
              renderValue={(value) =>
                value ? value.toString() : "Select numnber of lines"
              }
            >
              <MenuItem
                sx={{
                  fontSize: "12px",
                  color: "#5E5873",
                }}
                value={"2"}
              >
                2
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "12px",
                  color: "#5E5873",
                }}
                value={"3"}
              >
                3
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "12px",
                  color: "#5E5873",
                }}
                value={"4"}
              >
                4
              </MenuItem>
            </Select>
            <div className="minmaxval">
              <label htmlFor="minMaxId">Min :</label>
              <TextField
                size="small"
                id="minMaxId"
                sx={{
                  fontSize: "12px",
                }}
                name="min"
                placeholder="Enter No"
                onChange={props.minMaxValueHandler}
                value={props?.minMaxValue?.min} // error={Boolean(formErrors.PlantCode)}
                autoComplete="off" // helperText={formErrors.PlantCode}
              />
              <label htmlFor="minMaxId">Max :</label>
              <TextField
                size="small"
                id="minMaxId"
                sx={{
                  fontSize: "12px",
                }}
                placeholder="Enter No"
                name="max"
                onChange={props.minMaxValueHandler}
                value={props?.minMaxValue?.max} // error={Boolean(formErrors.PlantCode)}
                autoComplete="off" // helperText={formErrors.PlantCode}
              />
            </div>

            {/* <label htmlFor="DrawerInputId" style={{ alignSelf: "flex-start" }}>
          Select Required
          </label> */}
            <FormControlLabel
              style={{
                alignSelf: "flex-start",
              }}
              control={
                <Switch
                  color="primary"
                  size="medium"
                  checked={props.requiredStatus}
                  onChange={props.switchHandler}
                />
              }
              label="Textarea fill required (yes / no) : "
              labelPlacement="start"
            />
          </div>
        ) : (
          ""
        )}
        {props.FieldTypeSelect === "dropdown" ? (
          <div
            className="center-Part"
            style={{
              width: "100%",
              // height: "40%",
              display: "flex",
              flexGrow: "1",
              gap: "15px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label
              htmlFor="DrawerInputId"
              style={{
                alignSelf: "flex-start",
              }}
            >
              Enter Name *
            </label>
            <TextField
              size="small"
              id="DrawerInputId"
              name="name"
              placeholder="Enter Name"
              onChange={props.DropdownNameHandler}
              value={props.DropdownName} // error={Boolean(formErrors.PlantCode)}
              autoComplete="off" // helperText={formErrors.PlantCode}
            />
            <label
              htmlFor="DrawerInputId"
              style={{
                alignSelf: "flex-start",
              }}
            >
              Enter Options *
            </label>
            <TextField
              size="small"
              id="DrawerInputId"
              name="options"
              placeholder="Enter Options"
              onChange={props.SelectChipHandler}
              onKeyDown={props.SelectChipOptionsHandler} // onChange={SelectChipOptionsHandler}
              autoComplete="off"
              value={props.ChipOptions}
            />
            <div className="chip-wrapper-div">
              {props.SelectChipOptions?.map((data: any) => {
                return (
                  <Chip
                    key={data}
                    label={data}
                    onDelete={() => {
                      props.setSelectChipOptions((prev: any) =>
                        prev.filter((chip: any) => chip !== data)
                      );
                    }}
                  />
                );
              })}
              {props.SelectChipOptions.length < 1 ? (
                <p
                  style={{
                    fontSize: "12px",
                  }}
                >
                  options listed here
                </p>
              ) : (
                ""
              )}
            </div>
            <Select
              labelId="DrawerInputIdSelect"
              id="DrawerInputIdSelect" // value={inputType}
              // onChange={handleChangeSelect}
              value={props.dropdownChoice}
              onChange={props.handleMultiSelect}
              placeholder="select"
              sx={{
                fontSize: "12px",
                color: "brown",
              }}
              displayEmpty
              style={{
                height: 40,
                width: "19rem",
              }}
              renderValue={(value) =>
                value ? value.toString() : "Select single or multiple"
              }
            >
              <MenuItem
                sx={{
                  fontSize: "12px",
                  color: "#5E5873",
                }}
                value={"single"}
              >
                Single
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "12px",
                  color: "#5E5873",
                }}
                value={"multiple"}
              >
                Multiple
              </MenuItem>
            </Select>
            <FormControlLabel
              style={{
                alignSelf: "flex-start",
              }}
              control={
                <Switch
                  color="primary"
                  size="medium"
                  checked={props.DropdownRequiredStatus}
                  onChange={props.DropdownSwitchHandler}
                />
              }
              label="Dropdown select required (yes / no) : "
              labelPlacement="start"
            />
          </div>
        ) : (
          ""
        )}
        {props.FieldTypeSelect === "radiobutton" ? (
          <div
            className="center-Part"
            style={{
              width: "100%",
              // height: "40%",
              display: "flex",
              flexGrow: "1",
              gap: "15px",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <label
              htmlFor="DrawerInputId"
              style={{
                alignSelf: "flex-start",
              }}
            >
              Enter Name *
            </label>
            <TextField
              size="small"
              id="DrawerInputId"
              name="name"
              placeholder="Enter Name"
              onChange={props.RadioButtonNameHandler}
              value={props.RadioButtonName} // error={Boolean(formErrors.PlantCode)}
              autoComplete="off" // helperText={formErrors.PlantCode}
            />
            <label
              htmlFor="DrawerInputId"
              style={{
                alignSelf: "flex-start",
              }}
            >
              Enter Options *
            </label>
            <TextField
              size="small"
              id="DrawerInputId"
              name="options"
              placeholder="Enter Options"
              onChange={props.SelectRadioButtonChipHandler}
              onKeyDown={props.SelectRadioButtonChipOptionsHandler} // onChange={SelectChipOptionsHandler}
              value={props.RadioButtonChipOptions}
              autoComplete="off"
            />
            <div className="chip-wrapper-div">
              {props.SelectRadioButtonChipOptions?.map((data: any) => {
                return (
                  <Chip
                    key={data}
                    label={data}
                    onDelete={() => {
                      props.setSelectRadioButtonChipOptions((prev: any) =>
                        prev.filter((chip: any) => chip !== data)
                      );
                    }}
                  />
                );
              })}
              {props.SelectRadioButtonChipOptions.length < 1 ? (
                <p
                  style={{
                    fontSize: "12px",
                  }}
                >
                  options listed here
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}
        {props.FieldTypeSelect === "textbox" ? (
          <div
            className="center-Part"
            style={{
              width: "100%",
              // height: "40%",
              display: "flex",
              flexGrow: "1",
              gap: "15px",
              flexDirection: "column",
              alignItems: "center", // justifyContent: "space-between",
            }}
          >
            <label
              htmlFor="DrawerInputId"
              style={{
                alignSelf: "flex-start",
              }}
            >
              Enter Name *
            </label>
            <TextField
              size="small"
              id="DrawerInputId"
              name="name"
              placeholder="Enter Name"
              onChange={props.nameHandler}
              // inputProps={{
              //   maxLength: 20,
              //   minLength: 10,
              // }}
              value={props.name} // error={Boolean(formErrors.PlantCode)}
              autoComplete="off" // helperText={formErrors.PlantCode}
              // error={props.drawerError}
              // helperText={props.drawerError ? "Invalid input" : ""}
            />

            <label
              htmlFor="DrawerInputId"
              style={{
                alignSelf: "flex-start",
              }}
            >
              Enter Placeholder Text *
            </label>
            <TextField
              size="small"
              id="DrawerInputId"
              sx={{
                fontSize: "12px",
              }}
              name="placeholder"
              placeholder="Enter Placeholder"
              onChange={props.PlaceHolderHandler}
              value={props.placeHolder} // error={Boolean(formErrors.PlantCode)}
              autoComplete="off" // helperText={formErrors.PlantCode}
            />
            <label
              id="DrawerInputIdSelect"
              style={{
                alignSelf: "flex-start",
              }}
            >
              Select Textbox Type *
            </label>

            {/* <InputLabel
           sx={{ fontSize: "12px" }}
           id="demo-simple-select-label"
          >
           ET Type
          </InputLabel> */}
            <Select
              labelId="DrawerInputIdSelect"
              id="DrawerInputIdSelect"
              value={props.inputType}
              onChange={props.handleChangeSelect}
              placeholder="select"
              sx={{
                fontSize: "12px",
                color: "brown",
              }}
              displayEmpty
              style={{
                height: 40,
                width: "19rem",
              }}
              renderValue={(value) =>
                value ? value.toString() : "Select Data"
              }
            >
              <MenuItem
                sx={{
                  fontSize: "12px",
                  color: "#5E5873",
                }}
                value={"text"}
              >
                Text
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "12px",
                  color: "#5E5873",
                }}
                value={"number"}
              >
                Number
              </MenuItem>
              <MenuItem
                sx={{
                  fontSize: "12px",
                  color: "#5E5873",
                }}
                value={"password"}
              >
                Password
              </MenuItem>
            </Select>
            <div className="minmaxval">
              <label htmlFor="minId">Min :</label>
              <TextField
                size="small"
                id="minMaxId"
                sx={{
                  fontSize: "12px",
                }}
                name="min"
                placeholder="Enter No"
                onChange={props.minMaxValueHandler}
                value={props?.minMaxValue?.min} // error={Boolean(formErrors.PlantCode)}
                autoComplete="off" // helperText={formErrors.PlantCode}
              />
              <label htmlFor="minId">Max :</label>
              <TextField
                size="small"
                id="minMaxId"
                sx={{
                  fontSize: "12px",
                }}
                placeholder="Enter No"
                name="max"
                onChange={props.minMaxValueHandler}
                value={props?.minMaxValue?.max} // error={Boolean(formErrors.PlantCode)}
                autoComplete="off" // helperText={formErrors.PlantCode}
              />
            </div>

            <FormGroup
              sx={{ display: "flex", width: "100%", flexDirection: "row" }}
            >
              <FormControlLabel
                sx={{ margin: "0" }}
                control={
                  <Checkbox
                    size="small"
                    checked={props.SplRulArr?.includes("spl")}
                    onChange={props.handleCheckboxChange}
                    name="includeSpecialChars"
                    value="spl"
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.875rem", margin: "0 " }}
                  >
                    Special Character
                  </Typography>
                }
              />
              <FormControlLabel
                sx={{ margin: "0" }}
                control={
                  <Checkbox
                    size="small"
                    checked={props.SplRulArr?.includes("num")}
                    onChange={props.handleCheckboxChange}
                    name="includeNumbers"
                    value="num"
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.875rem", margin: "0 " }}
                  >
                    Numbers
                  </Typography>
                }
              />
              <FormControlLabel
                sx={{ fontSize: "12px", margin: "0" }}
                control={
                  <Checkbox
                    size="small"
                    checked={props.SplRulArr?.includes("alp")}
                    onChange={props.handleCheckboxChange}
                    name="includeAlphabets"
                    value="alp"
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.875rem", margin: "0" }}
                  >
                    Alphabets Letter
                  </Typography>
                }
              />
              <FormControlLabel
                sx={{ fontSize: "12px", margin: "0" }}
                control={
                  <Checkbox
                    size="small"
                    checked={props.SplRulArr?.includes("cap")}
                    onChange={props.handleCheckboxChange}
                    name="includeCapitalLetters"
                    value="cap"
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{ fontSize: "0.875rem", margin: "0" }}
                  >
                    Capital Letter
                  </Typography>
                }
              />
            </FormGroup>

            {/* <label htmlFor="DrawerInputId" style={{ alignSelf: "flex-start" }}>
          Select Required
          </label> */}
            <FormControlLabel
              style={{
                alignSelf: "flex-start",
              }}
              control={
                <Switch
                  color="primary"
                  size="medium"
                  checked={props.requiredStatus}
                  onChange={props.switchHandler}
                />
              }
              label="TextBox fill required (yes / no) : "
              labelPlacement="start"
            />
          </div>
        ) : (
          ""
        )}

        {props.drawerError && (
          <span
            style={{
              color: "red",
            }}
          >
            Input fields cannot be empty
          </span>
        )}
        <footer
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: "15px",
            padding: "15px 0 0 0",
            borderTop: "1px solid #5353533b",
          }}
        >
          <Button
            onClick={props.HandlerToggleDrawer}
            size="small"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button type="submit" size="small" variant="contained">
            Save
          </Button>
        </footer>
      </form>
    </Drawer>
  );
}
export default DrawerCreateField;
