"use client";
import React, { useState, FormEvent, ChangeEvent, useMemo } from "react";
import "./style.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import MergeTypeIcon from "@mui/icons-material/MergeType";
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
  RadioGroup,
  Radio,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Divider,
  InputLabel,
  Typography,
} from "@mui/material";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SelectChangeEvent } from "@mui/material/Select";
import SelectMulti from "../components/SelectMulti";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DrawerCreateField from "../components/Drawer/DrawerCreateField";

export default function Tenant() {
  const [FieldTypeSelect, setFieldTypeSelect] = useState("");
  const [UsrIntraction, setUsrIntraction] = useState(false);

  const [minMaxValue, setminMaxValue] = useState({
    min: "2",
    max: "20",
  });
  const [inputData, setInputData] = useState<any>([
    {
      id: 1,
      name: "Name",
      placeholder: "Enter Name",
      type: "text",
      required: true,
      field: "textbox",
      options: [],
      min: "3",
      max: "18",
    },
    {
      id: 2,

      name: "Age",
      placeholder: "Enter Age",
      type: "number",
      required: true,
      field: "textbox",
      options: [],
      min: "1",
      max: "3",
    },
    {
      id: 3,
      name: "Phone Number",
      placeholder: "Enter Phone number",
      type: "number",
      required: false,
      field: "textbox",
      options: [],
      min: "10",
      max: "10",
    },
    {
      id: 4,
      name: "Password",
      placeholder: "Enter Password",
      type: "password",
      required: true,
      field: "textbox",
      options: [],
      min: "5",
      max: "10",
    },
    {
      id: 5,
      name: "Confirm Password",
      placeholder: "Enter Confirm Password",
      type: "password",
      required: true,
      field: "textbox",
      options: [],
      min: "5",
      max: "10",
    },
    {
      id: 6,
      name: "Country",
      placeholder: "Select Country",
      type: "single",
      required: true,
      field: "dropdown",
      options: ["India", "US", "China", "Russia"],
    },

    {
      id: 7,
      name: "Language",
      placeholder: "Select Language",
      type: "multiple",
      required: true,
      field: "dropdown",
      options: ["Tamil", "English", "Hindi", "Telungu"],
    },
    {
      id: 8,
      name: "Gender",
      placeholder: "",
      type: "single",
      required: true,
      field: "radiobutton",
      options: ["Male", "Female", "Others"],
    },
    {
      id: 9,
      name: "Address",
      placeholder: "Enter Address",
      type: "2",
      required: true,
      field: "textarea",
      options: [],
      min: "5",
      max: "100",
    },
  ]);
  const calculation = useMemo(() => {
    let valGetFieldSet: { [key: string]: boolean } = {};

    inputData.forEach((item: any) => {
      if (item.field === "textbox") {
        valGetFieldSet[item.name] = false;
      }
    });
    return valGetFieldSet;
  }, [inputData]);

  const [SeparateErrorMainForm, setSeparateErrorMainForm] = useState<any>({});
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>, data: any) => {
    setAnchorEl(event.currentTarget);

    setEditStateData(data);
    // setLogicFieldSelectValidate({ [data.name]:{ data.name} });
    setEditSelectChipOptions(data.options);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openLogicDialog, setOpenLogicDialog] = React.useState(false);

  const handleLogicDialogClickOpen = () => {
    setOpenLogicDialog(true);
  };

  const handleLogicDialogClose = () => {
    setOpenLogicDialog(false);
    setLogicFieldSelect("");
  };
  const [SplRulArr, setSplRulArr] = useState<any>([]);
  const [requiredStatus, setRequiredStatus] = useState<boolean>(false);
  const [openInputDrawer, setOpenInputDrawer] = useState<boolean>(false);
  const [openEditDrawer, setOpenEditDrawer] = useState<boolean>(false);
  const [EditSelectChipOptions, setEditSelectChipOptions] = useState<any>([]);
  const [name, setName] = useState<string>("");
  const [placeHolder, setPlaceHolder] = useState<string>("");
  const [dynFldData, setDynFldData] = useState<any>({});
  const [drawerError, setdrawerError] = useState(false);
  const [mainFormError, setmainFormError] = useState(false);
  const [SelectChipOptions, setSelectChipOptions] = useState<any>([]);
  const [SelectRadioButtonChipOptions, setSelectRadioButtonChipOptions] =
    useState<any>([]);
  const [EditStateData, setEditStateData] = useState<any>({});
  const [ChipOptions, setChipOptions] = useState<any>("");
  const [DropdownRequiredStatus, setDropdownRequiredStatus] = useState(false);
  const [DropdownName, setDropdownName] = useState("");
  const [dropdownChoice, setdropdownChoice] = useState("");
  const [RadioButtonChipOptions, setRadioButtonChipOptions] = useState<any>("");
  const HandlerToggleDrawer = () => {
    setOpenInputDrawer(!openInputDrawer);
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    if (checked) {
      return setSplRulArr((prev: any) => {
        return [...prev, value];
      });
    }

    return setSplRulArr((prev: any) =>
      prev.filter((dta: any) => dta !== value)
    );
    // if(SplRulArr?.includes(value)){
    //   setSplRulArr((prev:any)=> prev.filter(dta:any=>dta !== name))
    // }
  };
  const [LogicFieldSelect, setLogicFieldSelect] = useState<any>("");
  const [LogicFieldSelectArray, setLogicFieldSelectArray] = useState<any>([]);
  const LogicFieldSelectHandler = (e: SelectChangeEvent) => {
    setLogicFieldSelect(e.target.value as string);
  };

  const LogicSubmitHandler = () => {
    setLogicFieldSelectArray((prev: any) => {
      return [
        ...prev,
        {
          name: EditStateData.name,
          selectField: LogicFieldSelect,
        },
      ];
    });

    handleLogicDialogClose();
  };
  const HandlerEditToggleDrawer = () => {
    setOpenEditDrawer(!openEditDrawer);
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
  const minMaxValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setminMaxValue((prev: any) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };
  const validateInput = (arr: any, val: any) => {
    if (UsrIntraction) {
      let validationRegex = "";

      if (arr?.includes("spl")) {
        validationRegex += "(?=.*[@#$%^&+=])";
      }
      if (arr?.includes("num")) {
        validationRegex += "(?=.*\\d)";
      }
      if (arr?.includes("alp")) {
        validationRegex += "(?=.*[a-zA-Z])";
      }
      if (arr?.includes("cap")) {
        validationRegex += "(?=.*[A-Z])";
      }

      // validationRegex += "^(?!.*\\s)"; // No space validation

      if (validationRegex === "^(?!.*\\s)") {
        // No validation rules selected, return true
        return true;
      }

      const regex = new RegExp(`${validationRegex}.+$`);
      // console.log(validationRegex.toString());
      calculation[val] = regex.test(dynFldData[val]);

      return regex.test(dynFldData[val]);
    }
  };

  const SubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (FieldTypeSelect === "textbox" || FieldTypeSelect === "textarea") {
      const data = {
        id: Math.random(),
        name: name,
        placeholder: placeHolder,
        type: inputType,
        required: requiredStatus,
        field: FieldTypeSelect,
        options: [],
        min: minMaxValue.min,
        max: minMaxValue.max,
        rules: SplRulArr,
      };
      console.log(Number(minMaxValue.max) + "  " + Number(minMaxValue.min));
      console.log(Number(minMaxValue.max) < Number(minMaxValue.min));
      if (Number(minMaxValue.max) < Number(minMaxValue.min))
        return alert("minimum value should be lesser than maximum value");

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
        id: Math.random(),
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
        id: Math.random(),
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
  function isObject(value: any) {
    return Object.keys(value).length > 0 && typeof value === "object";
  }

  const DynamicSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // inputData.forEach((data: any) => {
    //   setdataqwertyui((prev: any) => {
    //     if (dataqwertyui.includes(data?.name)) {
    //       return [...prev];
    //     }
    //     return [...prev, data?.name];
    //   });
    // });

    console.log(dynFldData);
    console.log(SeparateErrorMainForm);
    const reqdFilterAr = inputData.filter((dta: any) => dta.required === true);
    console.log(reqdFilterAr);

    const ObjArryKeys = Object.values(dynFldData);
    console.log(ObjArryKeys);
    const checkObj = ObjArryKeys.includes("");
    console.log(checkObj);
    if (checkObj) {
      return setmainFormError(true);
    }
    console.log(LogicFieldSelectArray);
    LogicFieldSelectArray.forEach((element: any) => {
      console.log(element);
      console.log(element.name);
      if (dynFldData[element.name] !== dynFldData[element.selectField]) {
        return alert(
          `${element.name} and ${element.selectField} both should be same`
        );
      }
    });

    if (Object.keys(dynFldData).length !== inputData.length) {
      return setmainFormError(true);
    }
    setmainFormError(false);
  };
  const DynamicInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target);
    setUsrIntraction(true);
    setDynFldData((prev: any) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(dynFldData);
  };

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
    if (["Enter"].includes(e.key) && ChipOptions.length !== 0) {
      e.preventDefault();
      console.log(SelectChipOptions.includes(ChipOptions));
      console.log(SelectChipOptions);
      setSelectChipOptions((prev: any) => {
        if (
          SelectChipOptions.includes(ChipOptions) &&
          ChipOptions.length === 0
        ) {
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
    if (["Enter"].includes(e.key) && RadioButtonChipOptions.length !== 0) {
      e.preventDefault();
      console.log(
        SelectRadioButtonChipOptions.includes(RadioButtonChipOptions)
      );
      console.log(SelectRadioButtonChipOptions);
      setSelectRadioButtonChipOptions((prev: any) => {
        if (
          SelectRadioButtonChipOptions.includes(RadioButtonChipOptions) &&
          RadioButtonChipOptions.length !== 0
        ) {
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
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(inputData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setInputData(items);
    console.log(inputData);
  };
  const [chipListRadioButton, setchipListRadioButton] = useState("");
  const [EditStateErrorMessage, setEditStateDataErrorMessage] =
    useState<boolean>(false);

  const EditRadioButtonChipHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setchipListRadioButton(e.target.value);
  };
  const EditDrawerToggleHandler = () => {
    HandlerEditToggleDrawer();
    handleClose();
  };
  const EditChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEditStateData((prev: any) => {
      return { ...prev, [e.target?.name]: e.target.value };
    });
  };
  const EditChangeSwitchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditStateData((prev: any) => {
      return { ...prev, [e.target?.name]: e.target.checked };
    });
  };
  const EditSelectChangeHandler = (e: SelectChangeEvent) => {
    setEditStateData((prev: any) => {
      return { ...prev, [e.target?.name]: e.target.value };
    });
  };
  const EditFormHandler = (e: FormEvent) => {
    e.preventDefault();

    const keys = Object.values(EditStateData);
    const checkDis = keys.includes("");
    if (checkDis) return setEditStateDataErrorMessage(true);
    setEditStateDataErrorMessage(false);
    console.log(EditSelectChipOptions);
    console.log(EditStateData);

    setInputData((prev: any) => {
      return prev.map((data: any) => {
        if (data.id === EditStateData.id) {
          return { ...EditStateData, options: EditSelectChipOptions };
        }
        return data;
      });
    });
    HandlerEditToggleDrawer();
    console.log(EditStateData);
    console.log(inputData);
  };
  const EditChipOptionsHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["Enter"].includes(e.key)) {
      e.preventDefault();

      setEditSelectChipOptions((prev: any) => {
        if (EditSelectChipOptions?.includes(chipListRadioButton)) {
          return [...prev];
        }
        return [...prev, chipListRadioButton];
      });

      setchipListRadioButton("");
    }
  };

  return (
    <div className="main-tenant-wrapper">
      <DrawerCreateField
        FieldTypeSelect={FieldTypeSelect}
        requiredStatus={requiredStatus}
        openInputDrawer={openInputDrawer}
        name={name}
        placeHolder={placeHolder}
        drawerError={drawerError}
        SelectChipOptions={SelectChipOptions}
        setSelectChipOptions={setSelectChipOptions}
        SelectRadioButtonChipOptions={SelectRadioButtonChipOptions}
        setSelectRadioButtonChipOptions={setSelectRadioButtonChipOptions}
        ChipOptions={ChipOptions}
        DropdownRequiredStatus={DropdownRequiredStatus}
        DropdownName={DropdownName}
        dropdownChoice={dropdownChoice}
        RadioButtonChipOptions={RadioButtonChipOptions}
        HandlerToggleDrawer={HandlerToggleDrawer}
        inputType={inputType}
        handleChangeSelect={handleChangeSelect}
        handleFieldTypeChangeSelect={handleFieldTypeChangeSelect}
        handleMultiSelect={handleMultiSelect}
        switchHandler={switchHandler}
        nameHandler={nameHandler}
        PlaceHolderHandler={PlaceHolderHandler}
        SubmitHandler={SubmitHandler}
        RadioButtonName={RadioButtonName}
        RadioButtonNameHandler={RadioButtonNameHandler}
        SelectChipOptionsHandler={SelectChipOptionsHandler}
        SelectRadioButtonChipOptionsHandler={
          SelectRadioButtonChipOptionsHandler
        }
        SelectChipHandler={SelectChipHandler}
        SelectRadioButtonChipHandler={SelectRadioButtonChipHandler}
        DropdownSwitchHandler={DropdownSwitchHandler}
        DropdownNameHandler={DropdownNameHandler}
        minMaxValue={minMaxValue}
        minMaxValueHandler={minMaxValueHandler}
        SplRulArr={SplRulArr}
        handleCheckboxChange={handleCheckboxChange}
      ></DrawerCreateField>
      <Drawer
        anchor={"right"}
        variant="temporary"
        open={openEditDrawer}
        onClose={HandlerEditToggleDrawer}
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
          onSubmit={EditFormHandler}
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
              Edit {EditStateData.name} Field
            </span>
            <IconButton onClick={HandlerEditToggleDrawer}>
              <CloseIcon />
            </IconButton>
          </header>

          <section className="top-center-edit">
            <Button
              variant="outlined"
              onClick={() => {
                setInputData((prev: any) =>
                  prev.filter((chip: any) => chip.id !== EditStateData.id)
                );
                HandlerEditToggleDrawer();
              }}
              startIcon={<DeleteIcon />}
            >
              Delete The Field From Form
            </Button>
            {EditStateData.field === "textbox" ? (
              <>
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
                  onChange={EditChangeHandler}
                  value={EditStateData.name}
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
                  onChange={EditChangeHandler}
                  value={EditStateData.placeholder}
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
                  name="type"
                  value={EditStateData.type}
                  onChange={EditSelectChangeHandler}
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
                    onChange={EditChangeHandler}
                    value={EditStateData?.min} // error={Boolean(formErrors.PlantCode)}
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
                    onChange={EditChangeHandler}
                    value={EditStateData?.max} // error={Boolean(formErrors.PlantCode)}
                    autoComplete="off" // helperText={formErrors.PlantCode}
                  />
                </div>
                {/* <label htmlFor="DrawerInputId" style={{ alignSelf: "flex-start" }}>
              Select Required
            </label> */}
                <FormControlLabel
                  style={{ alignSelf: "flex-start" }}
                  control={
                    <Switch
                      color="primary"
                      size="medium"
                      name="required"
                      checked={EditStateData.required}
                      onChange={EditChangeSwitchHandler}
                    />
                  }
                  label="TextBox fill required (yes / no) : "
                  labelPlacement="start"
                />
              </>
            ) : (
              ""
            )}
            {EditStateData.field === "textarea" ? (
              <>
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
                  onChange={EditChangeHandler}
                  value={EditStateData.name}
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
                  onChange={EditChangeHandler}
                  value={EditStateData.placeholder}
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
                  name="type"
                  value={EditStateData.type}
                  onChange={EditSelectChangeHandler}
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
                    onChange={EditChangeHandler}
                    value={EditStateData?.min} // error={Boolean(formErrors.PlantCode)}
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
                    onChange={EditChangeHandler}
                    value={EditStateData?.max} // error={Boolean(formErrors.PlantCode)}
                    autoComplete="off" // helperText={formErrors.PlantCode}
                  />
                </div>
                {/* <label htmlFor="DrawerInputId" style={{ alignSelf: "flex-start" }}>
              Select Required
            </label> */}

                <FormControlLabel
                  style={{ alignSelf: "flex-start" }}
                  control={
                    <Switch
                      color="primary"
                      size="medium"
                      name="required"
                      checked={EditStateData.required}
                      onChange={EditChangeHandler}
                    />
                  }
                  label="TextBox fill required (yes / no) : "
                  labelPlacement="start"
                />
              </>
            ) : (
              ""
            )}
            {EditStateData.field === "radiobutton" ? (
              <>
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
                  onChange={EditChangeHandler}
                  value={EditStateData.name}
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
                  onChange={EditRadioButtonChipHandler}
                  onKeyDown={EditChipOptionsHandler}
                  value={chipListRadioButton}
                  autoComplete="off"
                  // onChange={SelectChipOptionsHandler}
                />
                <div className="chip-wrapper-div">
                  {EditSelectChipOptions?.map((data: any) => {
                    return (
                      <Chip
                        key={data}
                        label={data}
                        onDelete={() => {
                          setEditSelectChipOptions((prev: any) =>
                            prev.filter((chip: any) => chip !== data)
                          );
                        }}
                      />
                    );
                  })}
                  {EditSelectChipOptions?.length < 1 ? (
                    <p style={{ fontSize: "12px" }}>options listed here</p>
                  ) : (
                    ""
                  )}
                </div>
              </>
            ) : (
              ""
            )}
            {EditStateData.field === "dropdown" ? (
              <>
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
                  onChange={EditChangeHandler}
                  value={EditStateData.name}
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
                  onChange={EditRadioButtonChipHandler}
                  onKeyDown={EditChipOptionsHandler}
                  // onChange={SelectChipOptionsHandler}
                  value={chipListRadioButton}
                  autoComplete="off"
                />
                <div className="chip-wrapper-div">
                  {EditSelectChipOptions?.map((data: any) => {
                    return (
                      <Chip
                        key={data}
                        label={data}
                        onDelete={() => {
                          setEditSelectChipOptions((prev: any) =>
                            prev.filter((chip: any) => chip !== data)
                          );
                        }}
                      />
                    );
                  })}
                  {EditSelectChipOptions?.length < 1 ? (
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
                  value={EditStateData.type}
                  onChange={EditSelectChangeHandler}
                  placeholder="select"
                  sx={{ fontSize: "12px", color: "brown" }}
                  name="type"
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
                      checked={EditStateData.required}
                      onChange={EditChangeHandler}
                    />
                  }
                  label="Dropdown select required (yes / no) : "
                  labelPlacement="start"
                />
              </>
            ) : (
              ""
            )}
          </section>
          {EditStateErrorMessage ? (
            <p style={{ color: "red", fontWeight: "bold" }}>
              Fields should not be empty
            </p>
          ) : (
            ""
          )}
          {/* <p>{JSON.stringify(EditStateData)}</p> */}
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
              onClick={HandlerEditToggleDrawer}
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

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="dropdowns">
          {(provided) => (
            <form
              ref={provided.innerRef}
              {...provided.droppableProps}
              onSubmit={DynamicSubmitHandler}
              className="inputs-group-div"
            >
              {/* <div className="single-input-div-lable">
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
          </div> */}

              {inputData?.map((dta: any, index: number) => {
                return (
                  <Draggable
                    draggableId={dta.name}
                    index={index}
                    key={dta.name}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="single-input-div-lable"
                      >
                        <InputLabel
                          title={dta.type}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "14px",
                          }}
                          id="select-field-label"
                        >
                          {dta.name} {dta.required === true ? "*" : ""}
                          <IconButton
                            sx={{ fontSize: "20px" }}
                            onClick={(e) => {
                              handleClick(e, dta);
                              console.log(dta);
                            }}
                          >
                            <MoreVertIcon sx={{ fontSize: "12px" }} />
                          </IconButton>
                          <Menu
                            id="basic-menu"
                            className="MuiMenu-paper"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                          >
                            <MenuItem
                              onClick={EditDrawerToggleHandler}
                              sx={{
                                color: "blue",
                                fontSize: "12px",
                                display: "flex",
                                gap: "5px",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              Edit
                              <EditIcon sx={{ fontSize: "14px" }} />
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                setInputData((prev: any) =>
                                  prev.filter(
                                    (chip: any) => chip.id !== EditStateData.id
                                  )
                                );
                                handleClose();
                              }}
                              sx={{
                                color: "blue",
                                fontSize: "12px",
                                display: "flex",
                                gap: "5px",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              Delete <DeleteIcon sx={{ fontSize: "14px" }} />
                            </MenuItem>
                            <MenuItem
                              onClick={handleLogicDialogClickOpen}
                              sx={{
                                color: "blue",
                                fontSize: "12px",
                                display: "flex",
                                gap: "5px",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              Logic
                              <MergeTypeIcon sx={{ fontSize: "14px" }} />
                            </MenuItem>
                          </Menu>
                        </InputLabel>
                        {dta.field === "textbox" ? (
                          <TextField
                            id="input-tenant"
                            placeholder={dta.placeholder}
                            onChange={DynamicInputHandler}
                            type={dta.type}
                            name={dta.name}
                            autoComplete="off"
                            inputProps={{
                              autoComplete: "new-password",
                              maxLength: dta.max,
                              minLength: dta.min,
                            }}
                            error={
                              UsrIntraction &&
                              !validateInput(dta?.rules, dta?.name)
                              /* !calculation[dta?.name] === true */
                            }
                            helperText={
                              UsrIntraction &&
                              !validateInput(dta?.rules, dta?.name)
                                ? "Invalid input"
                                : ""
                            }

                            //   maxLength: 20,
                            //   minLength: 10,

                            // }}
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
                            inputProps={{ autoComplete: "new-password" }}
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
                                    control={<Radio size="small" />}
                                    label={
                                      <Typography
                                        variant="body2"
                                        sx={{
                                          fontSize: "0.875rem",
                                          margin: "0 ",
                                        }}
                                      >
                                        {data}
                                      </Typography>
                                    }
                                  />
                                );
                              })}
                            </RadioGroup>
                          </FormControl>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </Draggable>
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
          )}
        </Droppable>
      </DragDropContext>
      <Dialog
        open={openLogicDialog}
        onClose={handleLogicDialogClose}
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
            onClick={handleLogicDialogClose}
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
            <span style={{ fontWeight: "600", marginLeft: "5px" }}>
              {EditStateData.name}
            </span>
          </label>
          <label htmlFor="dynLogic">
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
              {inputData.map((data: any) => {
                return data.field === "textbox" &&
                  EditStateData.type === data.type &&
                  EditStateData.name !== data.name ? (
                  <MenuItem
                    value={data.name}
                    key={data.name}
                    sx={{ fontSize: "12px", color: "#5E5873" }}
                  >
                    {data.name}
                  </MenuItem>
                ) : (
                  ""
                );
              })}
            </Select>
          </label>
        </DialogContent>

        <DialogActions sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.218)" }}>
          <Button onClick={handleLogicDialogClose}>Cancel</Button>
          <Button autoFocus onClick={LogicSubmitHandler}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {mainFormError && (
        <p style={{ color: "red", fontWeight: "600" }}>
          Please fill the mandatory fields
        </p>
      )}
      {/* <p>{JSON.stringify(LogicFieldSelectValidate)}</p> */}
      {/* <p>{JSON.stringify(dynFldData)}</p> */}
    </div>
  );
}
