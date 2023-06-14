"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import "./style.scss";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControlLabel,
  Switch,
  Chip,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import SelectMulti from "../components/SelectMulti";
export default function Tenant() {
  const [FieldTypeSelect, setFieldTypeSelect] = useState("");

  const [inputData, setInputData] = useState<any>([
    {
      name: "Age",
      placeholder: "Enter Age",
      type: "number",
      required: true,
      field: "textfield",
      options: [],
    },
    {
      name: "Phone No",
      placeholder: "Enter Phone number",
      type: "number",
      required: false,
      field: "textfield",
      options: [],
    },
  ]);
  const [requiredStatus, setRequiredStatus] = useState<boolean>(false);
  const [openInputDrawer, setOpenInputDrawer] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [placeHolder, setPlaceHolder] = useState<string>("");
  const [dynFldData, setDynFldData] = useState<any>({});
  const [drawerError, setdrawerError] = useState(false);
  const [mainFormError, setmainFormError] = useState(false);
  const [SelectChipOptions, setSelectChipOptions] = useState<any>([]);
  const [SelectRadioButtonChipOptions, setSelectRadioButtonChipOptions] =
    useState<any>([]);
  const [ChipOptions, setChipOptions] = useState<any>("");
  const [DropdownRequiredStatus, setDropdownRequiredStatus] = useState(false);
  const [DropdownName, setDropdownName] = useState("");
  const [dropdownChoice, setdropdownChoice] = useState("");
  const [RadioButtonChipOptions, setRadioButtonChipOptions] = useState<any>("");
  const HandlerToggleDrawer = () => {
    setOpenInputDrawer(!openInputDrawer);
  };
  const [inputType, setInputType] = React.useState("");

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setInputType(event.target.value as string);
  };
  const handleFieldTypeChangeSelect = (event: SelectChangeEvent) => {
    setFieldTypeSelect(event.target.value as string);
  };
  const handleMultiSelect = (event: SelectChangeEvent) => {
    setdropdownChoice(event.target.value as string);
  };
  const switchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequiredStatus(event.target.checked);
  };
  const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const PlaceHolderHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceHolder(event.target.value);
  };
  const SubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (FieldTypeSelect === "textbox" || FieldTypeSelect === "textarea") {
      const data = {
        name: name,
        placeholder: placeHolder,
        type: inputType,
        required: requiredStatus,
        field: FieldTypeSelect,
        options: [],
      };

      if (
        name.length === 0 ||
        placeHolder.length === 0 ||
        inputType.length === 0
      ) {
        return setdrawerError(true);
      }
      console.log(data);
      setdrawerError(false);
      setInputData((prev: any) => {
        return [...prev, data];
      });
      HandlerToggleDrawer();
      setName("");
      setPlaceHolder("");
      setRequiredStatus(false);
      setInputType("");
    } else if (FieldTypeSelect === "dropdown") {
      const data = {
        name: DropdownName,
        placeholder: " ",
        type: dropdownChoice,
        required: DropdownRequiredStatus,
        field: FieldTypeSelect,
        options: SelectChipOptions,
      };
      if (DropdownName.length === 0 || SelectChipOptions.length === 0) {
        return setdrawerError(true);
      }
      setdrawerError(false);
      setInputData((prev: any) => {
        return [...prev, data];
      });
      HandlerToggleDrawer();
      setDropdownName("");
      setSelectChipOptions([]);
      setdropdownChoice("");
      // setSelectedSingleOptions("");
      // setSelectedOptions([]);
    } else if (FieldTypeSelect === "radiobutton") {
      const data = {
        name: RadioButtonName,
        placeholder: " ",
        type: "radio",
        required: true,
        field: FieldTypeSelect,
        options: SelectRadioButtonChipOptions,
      };
      if (
        RadioButtonName.length === 0 ||
        SelectRadioButtonChipOptions.length === 0
      ) {
        return setdrawerError(true);
      }
      setdrawerError(false);
      setInputData((prev: any) => {
        return [...prev, data];
      });
      HandlerToggleDrawer();
      setRadioButtonName("");
      setSelectRadioButtonChipOptions([]);
      console.log(inputData);
    }
  };
  const DynamicSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(dynFldData);
    const reqdFilterAr = inputData.filter((dta: any) => dta.required === true);
    console.log(reqdFilterAr);
    const ObjArryKeys = Object.values(dynFldData);
    console.log(ObjArryKeys);
    const checkObj = ObjArryKeys.includes("");
    console.log(checkObj);
    if (checkObj) {
      return setmainFormError(true);
    }
    setmainFormError(false);
  };
  const DynamicInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);

    setDynFldData((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(dynFldData);
  };
  // const [selectedSingleOptions, setSelectedSingleOptions] =
  //   useState<string>("");
  const DynamicDropdownHandler = (e: SelectChangeEvent) => {
    console.log(e.target);
    // setSelectedSingleOptions(e.target.value as string);
    setDynFldData((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

    console.log(dynFldData);
  };
  // const [selectedOptions, setSelectedOptions] = useState<any>([]);
  // const getValueFormtheFunc = (val: any) => {
  //   if (!val) return [];
  //   console.log(val);
  //   const hjgj: any = [];
  //   if (hjgj.includes(val)) return hjgj;
  //   hjgj.push(val);
  //   return hjgj;
  // };
  // const sdfafsd = getValueFormtheFunc([]);
  const [RadioButtonName, setRadioButtonName] = useState("");
  const RadioButtonNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioButtonName(e.target.value);
  };

  // const handleInvalidEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   event.target.setCustomValidity("Email is required");
  // };
  const SelectChipOptionsHandler = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (["Enter"].includes(e.key)) {
      e.preventDefault();
      console.log(SelectChipOptions.includes(ChipOptions));
      console.log(SelectChipOptions);
      setSelectChipOptions((prev: any) => {
        if (SelectChipOptions.includes(ChipOptions)) {
          return [...prev];
        }
        return [...prev, ChipOptions];
      });
      setChipOptions("");
    }
  };
  const SelectRadioButtonChipOptionsHandler = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (["Enter"].includes(e.key)) {
      e.preventDefault();
      console.log(
        SelectRadioButtonChipOptions.includes(RadioButtonChipOptions)
      );
      console.log(SelectRadioButtonChipOptions);
      setSelectRadioButtonChipOptions((prev: any) => {
        if (SelectRadioButtonChipOptions.includes(RadioButtonChipOptions)) {
          return [...prev];
        }
        return [...prev, RadioButtonChipOptions];
      });
      setRadioButtonChipOptions("");
    }
  };
  const SelectChipHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChipOptions(e.target.value);
  };
  const SelectRadioButtonChipHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRadioButtonChipOptions(e.target.value);
  };
  const DropdownSwitchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDropdownRequiredStatus(e.target.checked);
  };
  const DropdownNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDropdownName(e.target.value as string);
  };
  const [RadioButtonValue, setRadioButtonValue] = React.useState("");

  const handleRadioButtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioButtonValue((e.target as HTMLInputElement).value);
    setDynFldData((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="main-tenant-wrapper">
      <Drawer
        anchor={"right"}
        variant="temporary"
        open={openInputDrawer}
        onClose={HandlerToggleDrawer}
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
          onSubmit={SubmitHandler}
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
              style={{ fontSize: "15px", color: "282828", fontWeight: "500" }}
            >
              Add New Field
            </span>
            <IconButton onClick={HandlerToggleDrawer}>
              <CloseIcon />
            </IconButton>
          </header>
          <div className="top-center">
            <label htmlFor="DrawerInputId">Select Field Type</label>
            <Select
              labelId="DrawerInputIdSelect"
              id="DrawerInputIdSelect"
              value={FieldTypeSelect}
              onChange={handleFieldTypeChangeSelect}
              placeholder="select"
              sx={{ fontSize: "12px", color: "brown" }}
              displayEmpty
              style={{ height: 40, width: "19rem" }}
              renderValue={(value) =>
                value ? value.toString() : "Select Field"
              }
            >
              <MenuItem
                sx={{ fontSize: "12px", color: "#5E5873" }}
                value={"textbox"}
              >
                Textbox
              </MenuItem>
              <MenuItem
                sx={{ fontSize: "12px", color: "#5E5873" }}
                value={"textarea"}
              >
                Textarea
              </MenuItem>
              <MenuItem
                sx={{ fontSize: "12px", color: "#5E5873" }}
                value={"dropdown"}
              >
                Dropdown
              </MenuItem>
              <MenuItem
                sx={{ fontSize: "12px", color: "#5E5873" }}
                value={"radiobutton"}
              >
                Radibutton
              </MenuItem>
            </Select>
          </div>
          {FieldTypeSelect === "textarea" ? (
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
                style={{ alignSelf: "flex-start" }}
              >
                Enter Name *
              </label>
              <TextField
                size="small"
                id="DrawerInputId"
                name="name"
                placeholder="Enter Name"
                onChange={nameHandler}
                value={name}
                // error={Boolean(formErrors.PlantCode)}
                autoComplete="off"
                // helperText={formErrors.PlantCode}
              />

              <label
                htmlFor="DrawerInputId"
                style={{ alignSelf: "flex-start" }}
              >
                Enter Placeholder Text *
              </label>
              <TextField
                size="small"
                id="DrawerInputId"
                sx={{ fontSize: "12px" }}
                name="placeholder"
                placeholder="Enter Placeholder"
                onChange={PlaceHolderHandler}
                value={placeHolder}
                // error={Boolean(formErrors.PlantCode)}
                autoComplete="off"
                // helperText={formErrors.PlantCode}
              />
              <label
                id="DrawerInputIdSelect"
                style={{ alignSelf: "flex-start" }}
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
                value={inputType}
                onChange={handleChangeSelect}
                placeholder="select"
                sx={{ fontSize: "12px", color: "brown" }}
                displayEmpty
                style={{ height: 40, width: "19rem" }}
                renderValue={(value) =>
                  value ? value.toString() : "Select numnber of lines"
                }
              >
                <MenuItem
                  sx={{ fontSize: "12px", color: "#5E5873" }}
                  value={"2"}
                >
                  2
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "12px", color: "#5E5873" }}
                  value={"3"}
                >
                  3
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "12px", color: "#5E5873" }}
                  value={"4"}
                >
                  4
                </MenuItem>
              </Select>

              {/* <label htmlFor="DrawerInputId" style={{ alignSelf: "flex-start" }}>
              Select Required
            </label> */}
              <FormControlLabel
                style={{ alignSelf: "flex-start" }}
                control={
                  <Switch
                    color="primary"
                    size="medium"
                    checked={requiredStatus}
                    onChange={switchHandler}
                  />
                }
                label="Textarea fill required (yes / no) : "
                labelPlacement="start"
              />
            </div>
          ) : (
            ""
          )}
          {FieldTypeSelect === "dropdown" ? (
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
                style={{ alignSelf: "flex-start" }}
              >
                Enter Name *
              </label>
              <TextField
                size="small"
                id="DrawerInputId"
                name="name"
                placeholder="Enter Name"
                onChange={DropdownNameHandler}
                value={DropdownName}
                // error={Boolean(formErrors.PlantCode)}
                autoComplete="off"
                // helperText={formErrors.PlantCode}
              />
              <label
                htmlFor="DrawerInputId"
                style={{ alignSelf: "flex-start" }}
              >
                Enter Options *
              </label>
              <TextField
                size="small"
                id="DrawerInputId"
                name="options"
                placeholder="Enter Options"
                onChange={SelectChipHandler}
                onKeyDown={SelectChipOptionsHandler}
                // onChange={SelectChipOptionsHandler}
                value={ChipOptions}
              />
              <div className="chip-wrapper-div">
                {SelectChipOptions?.map((data: any) => {
                  return (
                    <Chip
                      key={data}
                      label={data}
                      onDelete={() => {
                        setSelectChipOptions((prev: any) =>
                          prev.filter((chip: any) => chip !== data)
                        );
                      }}
                    />
                  );
                })}
                {SelectChipOptions.length < 1 ? (
                  <p style={{ fontSize: "12px" }}>options listed here</p>
                ) : (
                  ""
                )}
              </div>
              <Select
                labelId="DrawerInputIdSelect"
                id="DrawerInputIdSelect"
                // value={inputType}
                // onChange={handleChangeSelect}
                value={dropdownChoice}
                onChange={handleMultiSelect}
                placeholder="select"
                sx={{ fontSize: "12px", color: "brown" }}
                displayEmpty
                style={{ height: 40, width: "19rem" }}
                renderValue={(value) =>
                  value ? value.toString() : "Select single or multiple"
                }
              >
                <MenuItem
                  sx={{ fontSize: "12px", color: "#5E5873" }}
                  value={"single"}
                >
                  Single
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "12px", color: "#5E5873" }}
                  value={"multiple"}
                >
                  Multiple
                </MenuItem>
              </Select>
              <FormControlLabel
                style={{ alignSelf: "flex-start" }}
                control={
                  <Switch
                    color="primary"
                    size="medium"
                    checked={DropdownRequiredStatus}
                    onChange={DropdownSwitchHandler}
                  />
                }
                label="Dropdown select required (yes / no) : "
                labelPlacement="start"
              />
            </div>
          ) : (
            ""
          )}
          {FieldTypeSelect === "radiobutton" ? (
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
                style={{ alignSelf: "flex-start" }}
              >
                Enter Name *
              </label>
              <TextField
                size="small"
                id="DrawerInputId"
                name="name"
                placeholder="Enter Name"
                onChange={RadioButtonNameHandler}
                value={RadioButtonName}
                // error={Boolean(formErrors.PlantCode)}
                autoComplete="off"
                // helperText={formErrors.PlantCode}
              />
              <label
                htmlFor="DrawerInputId"
                style={{ alignSelf: "flex-start" }}
              >
                Enter Options *
              </label>
              <TextField
                size="small"
                id="DrawerInputId"
                name="options"
                placeholder="Enter Options"
                onChange={SelectRadioButtonChipHandler}
                onKeyDown={SelectRadioButtonChipOptionsHandler}
                // onChange={SelectChipOptionsHandler}
                value={RadioButtonChipOptions}
              />
              <div className="chip-wrapper-div">
                {SelectRadioButtonChipOptions?.map((data: any) => {
                  return (
                    <Chip
                      key={data}
                      label={data}
                      onDelete={() => {
                        setSelectRadioButtonChipOptions((prev: any) =>
                          prev.filter((chip: any) => chip !== data)
                        );
                      }}
                    />
                  );
                })}
                {SelectRadioButtonChipOptions.length < 1 ? (
                  <p style={{ fontSize: "12px" }}>options listed here</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}
          {FieldTypeSelect === "textbox" ? (
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

                // justifyContent: "space-between",
              }}
            >
              <label
                htmlFor="DrawerInputId"
                style={{ alignSelf: "flex-start" }}
              >
                Enter Name *
              </label>
              <TextField
                size="small"
                id="DrawerInputId"
                name="name"
                placeholder="Enter Name"
                onChange={nameHandler}
                value={name}
                // error={Boolean(formErrors.PlantCode)}
                autoComplete="off"
                // helperText={formErrors.PlantCode}
              />

              <label
                htmlFor="DrawerInputId"
                style={{ alignSelf: "flex-start" }}
              >
                Enter Placeholder Text *
              </label>
              <TextField
                size="small"
                id="DrawerInputId"
                sx={{ fontSize: "12px" }}
                name="placeholder"
                placeholder="Enter Placeholder"
                onChange={PlaceHolderHandler}
                value={placeHolder}
                // error={Boolean(formErrors.PlantCode)}
                autoComplete="off"
                // helperText={formErrors.PlantCode}
              />
              <label
                id="DrawerInputIdSelect"
                style={{ alignSelf: "flex-start" }}
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
                value={inputType}
                onChange={handleChangeSelect}
                placeholder="select"
                sx={{ fontSize: "12px", color: "brown" }}
                displayEmpty
                style={{ height: 40, width: "19rem" }}
                renderValue={(value) =>
                  value ? value.toString() : "Select Data"
                }
              >
                <MenuItem
                  sx={{ fontSize: "12px", color: "#5E5873" }}
                  value={"text"}
                >
                  Text
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "12px", color: "#5E5873" }}
                  value={"number"}
                >
                  Number
                </MenuItem>
                <MenuItem
                  sx={{ fontSize: "12px", color: "#5E5873" }}
                  value={"password"}
                >
                  Password
                </MenuItem>
              </Select>

              {/* <label htmlFor="DrawerInputId" style={{ alignSelf: "flex-start" }}>
              Select Required
            </label> */}
              <FormControlLabel
                style={{ alignSelf: "flex-start" }}
                control={
                  <Switch
                    color="primary"
                    size="medium"
                    checked={requiredStatus}
                    onChange={switchHandler}
                  />
                }
                label="TextBox fill required (yes / no) : "
                labelPlacement="start"
              />
            </div>
          ) : (
            ""
          )}

          {drawerError && (
            <span style={{ color: "red" }}>Input fields cannot be empty</span>
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
              onClick={HandlerToggleDrawer}
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
      <div className="top-button-wrapper">
        <Button variant="contained" onClick={HandlerToggleDrawer}>
          Add New
        </Button>
      </div>
      <form onSubmit={DynamicSubmitHandler} className="inputs-group-div">
        <div className="single-input-div-lable">
          <label>Name *</label>
          <TextField
            id="input-tenant"
            onChange={DynamicInputHandler}
            placeholder="Enter name"
            name="name"
            type="text"
            // required={true}
            // onInvalid={handleInvalidEmail}
          />
        </div>
        {inputData?.map((dta: any) => {
          return (
            <>
              <div key={dta.name} className="single-input-div-lable">
                <label title={dta.type}>
                  {dta.name} {dta.required === true ? "*" : ""}
                </label>
                {dta.field === "textfield" ? (
                  <TextField
                    id="input-tenant"
                    placeholder={dta.placeholder}
                    onChange={DynamicInputHandler}
                    type={dta.type}
                    name={dta.name}
                    autoComplete="off"
                    // onInvalid={handleInvalidEmail}
                    // required={dta.required === true ? true : false}
                  />
                ) : (
                  ""
                )}
                {dta.field === "textarea" ? (
                  <TextField
                    id="textarea-tenant"
                    placeholder={dta.placeholder}
                    onChange={DynamicInputHandler}
                    rows={dta.type}
                    multiline
                    name={dta.name}
                    autoComplete="off"
                  />
                ) : (
                  ""
                )}
                {dta.field === "dropdown" && dta.type === "multiple" ? (
                  <SelectMulti
                    setDynFldData={setDynFldData}
                    name={dta.name}
                    options={dta.options}
                  />
                ) : (
                  ""
                )}
                {/* {dta.field === "dropdown" && dta.type === "multiple" ? (
                  <Select
                    labelId="DrawerInputIdSelect"
                    id="DrawerInputIdSelect"
                    name={dta.name}
                    // value={selectedOptions}
                    onChange={DynamicDropdownMultipleHandler}
                    value={selectedOptions}
                    placeholder="select"
                    sx={{ fontSize: "12px", color: "brown" }}
                    displayEmpty
                    multiple
                    fullWidth
                    style={{
                      height: 40,

                      alignSelf: "flex-start",
                    }}
                    renderValue={(value) =>
                      value ? value.toString() : "Select Field"
                    }
                  >
                    {dta?.options?.map((data: any) => {
                      return (
                        <MenuItem
                          sx={{ fontSize: "12px", color: "#5E5873" }}
                          value={data}
                          key={data}
                        >
                          {data}
                        </MenuItem>
                      );
                    })}
                  </Select>
                ) : (
                  ""
                )} */}
                {dta.field === "dropdown" && dta.type === "single" ? (
                  <Select
                    labelId="DrawerInputIdSelect"
                    id="DrawerInputIdSelect"
                    name={dta.name}
                    onChange={DynamicDropdownHandler}
                    placeholder="select"
                    sx={{ fontSize: "12px", color: "brown" }}
                    displayEmpty
                    fullWidth
                    style={{
                      height: 40,

                      alignSelf: "flex-start",
                    }}
                    renderValue={(value) =>
                      value ? value.toString() : "Select Field"
                    }
                  >
                    {dta?.options?.map((data: any) => {
                      return (
                        <MenuItem
                          sx={{ fontSize: "12px", color: "#5E5873" }}
                          value={data}
                          key={data}
                        >
                          {data}
                        </MenuItem>
                      );
                    })}
                  </Select>
                ) : (
                  ""
                )}
                {dta.field === "radiobutton" ? (
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      row
                      name={dta.name}
                      value={RadioButtonValue}
                      onChange={handleRadioButtonChange}
                    >
                      {dta?.options?.map((data: any) => {
                        return (
                          <FormControlLabel
                            key={data}
                            value={data}
                            control={<Radio />}
                            label={data}
                          />
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                ) : (
                  ""
                )}
              </div>
            </>
          );
        })}
        <Button
          type="submit"
          variant="contained"
          sx={{ height: "35px", alignSelf: "flex-end" }}
        >
          Submit
        </Button>
      </form>
      {mainFormError && (
        <p style={{ color: "red" }}>Please fill the mandatory fields</p>
      )}

      <p>{JSON.stringify(dynFldData)}</p>
    </div>
  );
}
