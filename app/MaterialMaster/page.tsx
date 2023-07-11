"use client";
import React, {
  ChangeEvent,
  useState,
  FormEvent,
  useMemo,
  useEffect,
  useCallback,
  KeyboardEvent,
} from "react";
import EditIcon from "@mui/icons-material/Edit";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import DeleteIcon from "@mui/icons-material/Delete";
import "./style.scss";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Drawer,
  IconButton,
  MenuItem,
  Menu,
  Select,
  SelectChangeEvent,
  TextField,
  FormControlLabel,
  Switch,
  Chip,
  FormGroup,
  Checkbox,
  Typography,
  Snackbar,
  InputLabel,
  FormControl,
  RadioGroup,
  Radio,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { PostCreateFieldData } from "@/MOCK_DATA";
import axios from "axios";
import SnackBarSuccess from "../components/Snackbar/SnackBarSuccess";
import ConfirmDialog from "../components/Dialog/ConfirmDialog";

export default function MaterialMaster() {
  const initialStateField = {
    id: "",
    name: "",
    type: "",
    identity: "",
    min: 2,
    max: 20,
    required: false,
    pattern: "",
    minLength: 0,
    maxLength: 0,
    extraField: true,
    readable: true,
    writable: true,
    showAsColumn: true,
    enumValues: [],
    fieldLabel: {},
    options: [],
    value: "",
  };
  const [FieldTypeSelect, setFieldTypeSelect] = useState("");
  const [MultiSelectedOptions, setMultiSelectedOptions] = useState<string[]>(
    []
  );
  const [OpenSnackBar, setOpenSnackBar] = useState<boolean>(false);
  const [OpenDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [InputData, setInputData] = useState<PostCreateFieldData[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [CreateFieldSetObj, setCreateFieldSetObj] =
    useState<PostCreateFieldData>(initialStateField);
  const [CrDrawerOpener, setCrDrawerOpener] = useState<boolean>(false);
  const [EditDrawerOpener, setEditDrawerOpener] = useState<boolean>(false);
  const [SelectedFieldSingle, setSelectedFieldSingle] =
    useState<PostCreateFieldData>(initialStateField);
  const [ChipTextIndiual, setChipTextIndiual] = useState("");
  const [ChipArrayList, setChipArrayList] = useState<string[]>([]);
  const setChipIntoDivHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setChipTextIndiual(e.target.value);
  };
  const ChipEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (["Enter"].includes(e.key)) {
      e.preventDefault();
      setChipArrayList((prev: string[]) => {
        if (ChipArrayList.includes(ChipTextIndiual)) {
          return [...prev];
        } else {
          return [...prev, ChipTextIndiual];
        }
      });
      setChipTextIndiual("");
    }
  };
  const ChipEditEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (["Enter"].includes(e.key)) {
      e.preventDefault();
      setSelectedFieldSingle((prev: PostCreateFieldData) => {
        const dataTemp = { ...prev };
        if (prev?.enumValues?.includes(ChipTextIndiual)) {
          console.log(dataTemp);
          return { ...prev };
        }
        return {
          ...prev,
          enumValues: [...(prev?.enumValues as any), ChipTextIndiual],
        };
      });
      setChipTextIndiual("");
    }
  };

  const HandleChangeMultiSelection = (
    event: SelectChangeEvent<{ value: unknown }>
  ) => {
    setMultiSelectedOptions(
      Array.isArray(event.target.value) ? event.target.value : []
    );
  };

  const openMenu = Boolean(anchorEl);
  const handleClickMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    data: PostCreateFieldData
  ) => {
    setSelectedFieldSingle(data);
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const DeleteDialogHandler = () => {
    setOpenDeleteDialog(!OpenDeleteDialog);
    handleCloseMenu();
  };
  const SnackBarHandler = () => {
    setOpenSnackBar(!OpenSnackBar);
  };

  const DeleteFieldHandler = async () => {
    try {
      const response = await axios.delete(
        `http://192.168.1.143:8080/removeField/${SelectedFieldSingle.id}`
      );
      const data = response.data;
      if (response.status === 200) {
        console.log(response);
        console.log(data);
        getFields();
        DeleteDialogHandler();
      }
    } catch (e) {
      alert(e);
      console.log(e);
    }
  };
  const getFields = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.143:8080/getAllFields"
      );
      const data = await response.data;
      if (response.status === 200) {
        setInputData(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  useEffect(() => {
    getFields();
  }, []);

  const HandlerCreateToggleDrawer = () => {
    setCrDrawerOpener(!CrDrawerOpener);
  };
  const HandlerEditToggleDrawer = () => {
    setEditDrawerOpener(!EditDrawerOpener);
    handleCloseMenu();
  };
  const handleFieldTypeChangeSelect = (e: SelectChangeEvent) => {
    setFieldTypeSelect(e.target.value as string);
    setCreateFieldSetObj((prev: PostCreateFieldData) => {
      return { ...prev, type: e.target.value as string };
    });
  };
  const handlerSelectInputType = (e: SelectChangeEvent) => {
    setCreateFieldSetObj((prev: PostCreateFieldData) => {
      return { ...prev, identity: e.target.value as string };
    });
  };
  const handlerEditSelectInputType = (e: SelectChangeEvent) => {
    setSelectedFieldSingle((prev: PostCreateFieldData) => {
      return { ...prev, identity: e.target.value as string };
    });
  };
  const HandletInputCreateName = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "required") {
      setCreateFieldSetObj((prev: PostCreateFieldData) => {
        return { ...prev, [e.target.name]: e.target.checked as boolean };
      });
    } else {
      setCreateFieldSetObj((prev: PostCreateFieldData) => {
        return { ...prev, [e.target.name]: e.target.value as string };
      });
    }
  };
  const HandletInputEditFunc = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "required") {
      setSelectedFieldSingle((prev: PostCreateFieldData) => {
        return { ...prev, [e.target.name]: e.target.checked as boolean };
      });
    } else {
      setSelectedFieldSingle((prev: PostCreateFieldData) => {
        return { ...prev, [e.target.name]: e.target.value as string };
      });
    }
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      return setCreateFieldSetObj((prev: PostCreateFieldData) => {
        const updatedObj = {
          ...prev,
          pattern: [
            ...[prev?.pattern?.split(", ").filter((n) => n)],
            value,
          ].toString(),
        };
        console.log(updatedObj);
        return updatedObj;
      });
    } else {
      return setCreateFieldSetObj((prev: PostCreateFieldData) => {
        const updatedObj = {
          ...prev,
          pattern: [
            prev?.pattern?.split(", ").filter((option) => option !== value),
          ].toString(),
        };
        console.log(updatedObj);
        return updatedObj;
      });
    }
  };
  const handleEditCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      return setSelectedFieldSingle((prev: PostCreateFieldData) => {
        const updatedObj = {
          ...prev,
          pattern: [
            ...[prev?.pattern?.split(", ").filter((n) => n)],
            value,
          ].toString(),
        };

        return updatedObj;
      });
    } else {
      return setSelectedFieldSingle((prev: PostCreateFieldData) => {
        const updatedObj = {
          ...prev,
          pattern: [
            prev?.pattern?.split(",").filter((option) => option !== value),
          ].toString(),
        };

        return updatedObj;
      });
    }
  };

  const menuItemStyle = {
    fontSize: "12px",
    color: "#5E5873",
  };
  const menuItemStyleTwo = {
    color: "blue",
    fontSize: "12px",
    display: "flex",
    gap: "5px",
    justifyContent: "space-between",
    alignItems: "center",
  };
  const SelectStyle = {
    fontSize: "12px",
    color: "brown",
    width: "19rem",
    height: "2.4rem",
  };
  let AnotherInitialState = {
    id: "",
    name: "",
    type: FieldTypeSelect,
    identity: "",
    min: 2,
    max: 20,
    required: false,
    pattern: "",
    minLength: 0,
    maxLength: 0,
    extraField: true,
    readable: true,
    writable: true,
    showAsColumn: true,
    enumValues: [],
    fieldLabel: {},
    options: [],
    value: "",
  };
  const DrawerSubmitHandlet = async (e: FormEvent) => {
    e.preventDefault();
    if (FieldTypeSelect === "textField" || FieldTypeSelect === "textArea") {
      if (
        CreateFieldSetObj.name.length < 1 ||
        CreateFieldSetObj.identity?.length === 0
      ) {
        return alert("required field should not be empty");
      }

      if (Number(CreateFieldSetObj?.max) < Number(CreateFieldSetObj?.min)) {
        return alert("Minimum number should be lesser than maximun ");
      }
      console.log(e);
      console.log(CreateFieldSetObj);
      try {
        const response = await axios.post(
          "http://192.168.1.143:8080/addFields",
          CreateFieldSetObj
        );
        const data = response?.data;
        console.log(response);
        console.log(data);
        if (response.status === 200) {
          SnackBarHandler();

          getFields();
          HandlerCreateToggleDrawer();

          setCreateFieldSetObj(AnotherInitialState);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
    if (FieldTypeSelect === "dropDown") {
      const dataSet = {
        id: "",
        name: CreateFieldSetObj.name,
        type: CreateFieldSetObj.type,
        identity: CreateFieldSetObj.identity,
        min: 2,
        max: 20,
        required: CreateFieldSetObj.required,
        pattern: "",
        minLength: 0,
        maxLength: 0,
        extraField: true,
        readable: true,
        writable: true,
        showAsColumn: true,
        enumValues: ChipArrayList,
        fieldLabel: {},
        options: [],
        value: "",
      };
      if (
        CreateFieldSetObj.name.length < 1 ||
        CreateFieldSetObj.identity?.length === 0 ||
        CreateFieldSetObj.type?.length < 1
      ) {
        return alert("required field should not be empty");
      }
      try {
        const response = await axios.post(
          "http://192.168.1.143:8080/addFields",
          dataSet
        );
        const data = await response?.data;
        console.log(response);
        console.log(data);
        if (response.status === 200) {
          SnackBarHandler();
          getFields();
          HandlerCreateToggleDrawer();

          setChipArrayList([]);
          setCreateFieldSetObj(AnotherInitialState);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
    if (FieldTypeSelect === "radioButton") {
      const dataSet = {
        id: "",
        name: CreateFieldSetObj.name,
        type: CreateFieldSetObj.type,
        identity: "",
        min: 2,
        max: 20,
        required: true,
        pattern: "",
        minLength: 0,
        maxLength: 0,
        extraField: true,
        readable: true,
        writable: true,
        showAsColumn: true,
        enumValues: ChipArrayList,
        fieldLabel: {},
        options: [],
        value: "",
      };
      if (
        CreateFieldSetObj.name.length < 1 ||
        dataSet?.enumValues?.length === 0
      ) {
        return alert("required field should not be empty");
      }
      try {
        const response = await axios.post(
          "http://192.168.1.143:8080/addFields",
          dataSet
        );
        const data = await response?.data;
        console.log(response);
        console.log(data);
        if (response.status === 200) {
          SnackBarHandler();
          getFields();
          HandlerCreateToggleDrawer();
          setChipArrayList([]);
          setCreateFieldSetObj(AnotherInitialState);
        }
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  };
  const [FieldUpdateSuccess, setFieldUpdateSuccess] = useState<boolean>(false);
  const UpdateSuccessHandler = () => {
    setFieldUpdateSuccess(!FieldUpdateSuccess);
  };
  const EditSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    console.log(SelectedFieldSingle);

    try {
      const response = await axios.put(
        `http://192.168.1.143:8080/updateField/${SelectedFieldSingle.id}`,
        SelectedFieldSingle
      );
      const data = response?.data;
      console.log(data);
      if (response.status === 200) {
        UpdateSuccessHandler();
        HandlerEditToggleDrawer();
        getFields();
      }
    } catch (e) {
      alert(e);
    }
  };
  return (
    <form className="main-material-master-wrapper">
      <Button
        className="addNewMaterial-btn"
        variant="contained"
        onClick={HandlerCreateToggleDrawer}
      >
        Add New
      </Button>
      <Drawer
        anchor={"right"}
        variant="temporary"
        open={CrDrawerOpener}
        onClose={HandlerCreateToggleDrawer}
      >
        <form className="drawer-wrapper-form" onSubmit={DrawerSubmitHandlet}>
          <header>
            <span>Create field</span>
            <IconButton onClick={HandlerCreateToggleDrawer}>
              <CloseIcon />
            </IconButton>
          </header>
          <section className="drawer-Center-Part">
            <label htmlFor="DrawerCrtInputId">Select Field Type</label>
            <Select
              id="DrawerCrtInputId"
              value={FieldTypeSelect}
              onChange={handleFieldTypeChangeSelect}
              sx={SelectStyle}
              displayEmpty
            >
              <MenuItem sx={menuItemStyle} value="" disabled>
                Select Field
              </MenuItem>
              <MenuItem sx={menuItemStyle} value={"textField"}>
                Textfield
              </MenuItem>
              <MenuItem sx={menuItemStyle} value={"textArea"}>
                Textarea
              </MenuItem>
              <MenuItem sx={menuItemStyle} value={"dropDown"}>
                Dropdown
              </MenuItem>
              <MenuItem sx={menuItemStyle} value={"radioButton"}>
                Radiobutton
              </MenuItem>
            </Select>
            {FieldTypeSelect === "textField" ? (
              <div className="render-fields-namess">
                <label htmlFor="DrawerInputFieldCrtId">Enter Name *</label>
                <TextField
                  size="small"
                  id="DrawerInputFieldCrtId"
                  name="name"
                  placeholder="Enter Name"
                  autoComplete="off"
                  value={CreateFieldSetObj?.name}
                  onChange={HandletInputCreateName}
                />

                <label id="DrawerInputIdSelect">Select Textbox Type *</label>
                <Select
                  id="DrawerCrtInputId"
                  value={CreateFieldSetObj.identity}
                  onChange={handlerSelectInputType}
                  sx={SelectStyle}
                  displayEmpty
                >
                  <MenuItem sx={menuItemStyle} value="" disabled>
                    Select Field
                  </MenuItem>
                  <MenuItem sx={menuItemStyle} value={"text"}>
                    Text
                  </MenuItem>
                  <MenuItem sx={menuItemStyle} value={"number"}>
                    Number
                  </MenuItem>
                  <MenuItem sx={menuItemStyle} value={"password"}>
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
                    value={CreateFieldSetObj?.min}
                    placeholder="Enter No"
                    autoComplete="off"
                    onChange={HandletInputCreateName}
                  />
                  <label htmlFor="minId">Max :</label>
                  <TextField
                    size="small"
                    id="minMaxId"
                    placeholder="Enter No"
                    name="max"
                    autoComplete="off"
                    value={CreateFieldSetObj?.max}
                    onChange={HandletInputCreateName}
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
                        name="includeSpecialChars"
                        value="spl"
                        onChange={handleCheckboxChange}
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
                        name="includeNumbers"
                        value="num"
                        onChange={handleCheckboxChange}
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
                        name="includeAlphabets"
                        value="alp"
                        onChange={handleCheckboxChange}
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
                        name="includeCapitalLetters"
                        value="cap"
                        onChange={handleCheckboxChange}
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
                  control={
                    <Switch
                      color="primary"
                      size="medium"
                      checked={CreateFieldSetObj.required}
                      onChange={HandletInputCreateName}
                      name="required"
                    />
                  }
                  label="TextBox fill required (yes / no) : "
                  labelPlacement="start"
                />
              </div>
            ) : (
              " "
            )}
            {FieldTypeSelect === "textArea" ? (
              <div className="render-fields-namess">
                <label htmlFor="DrawerInputFieldCrtId">Enter Name *</label>
                <TextField
                  size="small"
                  id="DrawerInputFieldCrtId"
                  name="name"
                  placeholder="Enter Name"
                  autoComplete="off"
                  value={CreateFieldSetObj?.name}
                  onChange={HandletInputCreateName}
                />

                <label id="DrawerInputIdSelect">Select Number of lines *</label>
                <Select
                  id="DrawerCrtInputId"
                  value={CreateFieldSetObj.identity}
                  onChange={handlerSelectInputType}
                  sx={SelectStyle}
                  displayEmpty
                >
                  <MenuItem sx={menuItemStyle} value="" disabled>
                    Select Field
                  </MenuItem>
                  <MenuItem sx={menuItemStyle} value={"1"}>
                    ONE
                  </MenuItem>
                  <MenuItem sx={menuItemStyle} value={"2"}>
                    TWO
                  </MenuItem>
                  <MenuItem sx={menuItemStyle} value={"3"}>
                    THREE
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
                    value={CreateFieldSetObj?.min}
                    placeholder="Enter No"
                    autoComplete="off"
                    onChange={HandletInputCreateName}
                  />
                  <label htmlFor="minId">Max :</label>
                  <TextField
                    size="small"
                    id="minMaxId"
                    placeholder="Enter No"
                    name="max"
                    autoComplete="off"
                    value={CreateFieldSetObj?.max}
                    onChange={HandletInputCreateName}
                  />
                </div>

                {/* <label htmlFor="DrawerInputId" style={{ alignSelf: "flex-start" }}>
          Select Required
          </label> */}
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      size="medium"
                      checked={CreateFieldSetObj.required}
                      onChange={HandletInputCreateName}
                      name="required"
                    />
                  }
                  label="TextArea fill required (yes / no) : "
                  labelPlacement="start"
                />
              </div>
            ) : (
              " "
            )}
            {FieldTypeSelect === "dropDown" ? (
              <div className="render-fields-namess">
                <label htmlFor="DrawerInputFieldCrtId">Enter Name *</label>
                <TextField
                  size="small"
                  id="DrawerInputFieldCrtId"
                  name="name"
                  placeholder="Enter Name"
                  autoComplete="off"
                  value={CreateFieldSetObj?.name}
                  onChange={HandletInputCreateName}
                />
                <label id="DrawerInputIdSelect">Dropdown Type *</label>
                <Select
                  id="DrawerCrtInputId"
                  value={CreateFieldSetObj.identity}
                  onChange={handlerSelectInputType}
                  sx={SelectStyle}
                  displayEmpty
                >
                  <MenuItem sx={menuItemStyle} value="" disabled>
                    Select Field
                  </MenuItem>
                  <MenuItem sx={menuItemStyle} value={"single"}>
                    Single
                  </MenuItem>
                  <MenuItem sx={menuItemStyle} value={"multiple"}>
                    Multiple
                  </MenuItem>
                </Select>
                <label id="DrawerInputIdSelect">Enter Options *</label>
                <TextField
                  size="small"
                  id="DrawerInputFieldCrtId"
                  name="Options"
                  placeholder="Enter Options"
                  onChange={setChipIntoDivHandler}
                  value={ChipTextIndiual}
                  onKeyDown={ChipEnterHandler}
                  autoComplete="off"
                />

                <div className="api-chip-wrapper-div">
                  {ChipArrayList?.map((data: string) => {
                    return (
                      <Chip
                        key={data}
                        label={data}
                        onDelete={() => {
                          setChipArrayList((prev: string[]) =>
                            prev.filter((chip: string) => chip !== data)
                          );
                        }}
                      />
                    );
                  })}
                  {ChipArrayList?.length < 1 ? (
                    <p style={{ fontSize: "12px" }}>options listed here</p>
                  ) : (
                    ""
                  )}
                </div>
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      size="medium"
                      checked={CreateFieldSetObj.required}
                      onChange={HandletInputCreateName}
                      name="required"
                    />
                  }
                  label="Textarea fill required (yes / no) : "
                  labelPlacement="start"
                />
              </div>
            ) : (
              ""
            )}
            {FieldTypeSelect === "radioButton" ? (
              <div className="render-fields-namess">
                <label htmlFor="DrawerInputFieldCrtId">Enter Name *</label>
                <TextField
                  size="small"
                  id="DrawerInputFieldCrtId"
                  name="name"
                  placeholder="Enter Name"
                  autoComplete="off"
                  value={CreateFieldSetObj?.name}
                  onChange={HandletInputCreateName}
                />

                <label id="DrawerInputIdSelect">Enter Options *</label>
                <TextField
                  size="small"
                  id="DrawerInputFieldCrtId"
                  name="Options"
                  placeholder="Enter Options"
                  onChange={setChipIntoDivHandler}
                  value={ChipTextIndiual}
                  onKeyDown={ChipEnterHandler}
                  autoComplete="off"
                />

                <div className="api-chip-wrapper-div">
                  {ChipArrayList?.map((data: string) => {
                    return (
                      <Chip
                        key={data}
                        label={data}
                        onDelete={() => {
                          setChipArrayList((prev: string[]) =>
                            prev.filter((chip: string) => chip !== data)
                          );
                        }}
                      />
                    );
                  })}
                  {ChipArrayList?.length < 1 ? (
                    <p style={{ fontSize: "12px" }}>options listed here</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </section>
          <footer>
            <Button
              onClick={HandlerCreateToggleDrawer}
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
      <Drawer
        anchor={"right"}
        variant="temporary"
        open={EditDrawerOpener}
        onClose={HandlerEditToggleDrawer}
      >
        <form className="drawer-wrapper-form" onSubmit={EditSubmitHandler}>
          <header>
            <span>Edit field</span>
            <IconButton onClick={HandlerEditToggleDrawer}>
              <CloseIcon />
            </IconButton>
          </header>
          <section className="drawer-Center-Part">
            {SelectedFieldSingle?.type === "textField" ? (
              <div className="render-fields-namess">
                <label htmlFor="DrawerInputFieldCrtId">Enter Name *</label>
                <TextField
                  size="small"
                  id="DrawerInputFieldCrtId"
                  name="name"
                  placeholder="Enter Name"
                  autoComplete="off"
                  value={SelectedFieldSingle?.name}
                  onChange={HandletInputEditFunc}
                />

                <label id="DrawerInputIdSelect">Select Textbox Type *</label>
                <Select
                  id="DrawerCrtInputId"
                  value={SelectedFieldSingle.identity}
                  onChange={handlerEditSelectInputType}
                  sx={SelectStyle}
                  displayEmpty
                >
                  <MenuItem sx={menuItemStyle} value="" disabled>
                    Select Field
                  </MenuItem>
                  <MenuItem sx={menuItemStyle} value={"text"}>
                    Text
                  </MenuItem>
                  <MenuItem sx={menuItemStyle} value={"number"}>
                    Number
                  </MenuItem>
                  <MenuItem sx={menuItemStyle} value={"password"}>
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
                    value={SelectedFieldSingle?.min}
                    placeholder="Enter No"
                    autoComplete="off"
                    onChange={HandletInputEditFunc}
                  />
                  <label htmlFor="minId">Max :</label>
                  <TextField
                    size="small"
                    id="minMaxId"
                    placeholder="Enter No"
                    name="max"
                    autoComplete="off"
                    value={SelectedFieldSingle?.max}
                    onChange={HandletInputEditFunc}
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
                        name="includeSpecialChars"
                        checked={SelectedFieldSingle.pattern?.includes("spl")}
                        value="spl"
                        onChange={handleEditCheckboxChange}
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
                        name="includeNumbers"
                        checked={SelectedFieldSingle.pattern?.includes("num")}
                        value="num"
                        onChange={handleEditCheckboxChange}
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
                        name="includeAlphabets"
                        checked={SelectedFieldSingle.pattern?.includes("alp")}
                        value="alp"
                        onChange={handleEditCheckboxChange}
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
                        name="includeCapitalLetters"
                        checked={SelectedFieldSingle.pattern?.includes("cap")}
                        value="cap"
                        onChange={handleEditCheckboxChange}
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
                  control={
                    <Switch
                      color="primary"
                      size="medium"
                      checked={SelectedFieldSingle?.required}
                      onChange={HandletInputEditFunc}
                      name="required"
                    />
                  }
                  label="TextBox fill required (yes / no) : "
                  labelPlacement="start"
                />
              </div>
            ) : (
              " "
            )}
            {SelectedFieldSingle?.type === "textArea" ? (
              <div className="render-fields-namess">
                <label htmlFor="DrawerInputFieldCrtId">Enter Name *</label>
                <TextField
                  size="small"
                  id="DrawerInputFieldCrtId"
                  name="name"
                  placeholder="Enter Name"
                  autoComplete="off"
                  value={SelectedFieldSingle?.name}
                  onChange={HandletInputEditFunc}
                />

                <label id="DrawerInputIdSelect">Select Number Of Lines *</label>
                <Select
                  id="DrawerCrtInputId"
                  value={SelectedFieldSingle.identity}
                  onChange={handlerEditSelectInputType}
                  sx={SelectStyle}
                  displayEmpty
                >
                  <MenuItem sx={menuItemStyle} value="" disabled>
                    Select Field
                  </MenuItem>
                  <MenuItem sx={menuItemStyle} value={"1"}>
                    ONE
                  </MenuItem>
                  <MenuItem sx={menuItemStyle} value={"2"}>
                    TWO
                  </MenuItem>
                  <MenuItem sx={menuItemStyle} value={"3"}>
                    THREE
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
                    value={SelectedFieldSingle?.min}
                    placeholder="Enter No"
                    autoComplete="off"
                    onChange={HandletInputEditFunc}
                  />
                  <label htmlFor="minId">Max :</label>
                  <TextField
                    size="small"
                    id="minMaxId"
                    placeholder="Enter No"
                    name="max"
                    autoComplete="off"
                    value={SelectedFieldSingle?.max}
                    onChange={HandletInputEditFunc}
                  />
                </div>

                {/* <label htmlFor="DrawerInputId" style={{ alignSelf: "flex-start" }}>
          Select Required
          </label> */}
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      size="medium"
                      checked={SelectedFieldSingle?.required}
                      onChange={HandletInputEditFunc}
                      name="required"
                    />
                  }
                  label="TextArea fill required (yes / no) : "
                  labelPlacement="start"
                />
              </div>
            ) : (
              " "
            )}
            {SelectedFieldSingle?.type === "dropDown" ? (
              <div className="render-fields-namess">
                <label htmlFor="DrawerInputFieldCrtId">Enter Name *</label>
                <TextField
                  size="small"
                  id="DrawerInputFieldCrtId"
                  name="name"
                  placeholder="Enter Name"
                  autoComplete="off"
                  value={SelectedFieldSingle?.name}
                  onChange={HandletInputEditFunc}
                />

                <label id="DrawerInputIdSelect">Dropdown Type *</label>
                <Select
                  id="DrawerCrtInputId"
                  value={SelectedFieldSingle.identity}
                  onChange={handlerEditSelectInputType}
                  sx={SelectStyle}
                  displayEmpty
                >
                  <MenuItem sx={menuItemStyle} value="" disabled>
                    Select Field
                  </MenuItem>
                  <MenuItem sx={menuItemStyle} value={"single"}>
                    Single
                  </MenuItem>
                  <MenuItem sx={menuItemStyle} value={"multiple"}>
                    Multiple
                  </MenuItem>
                </Select>
                <label id="DrawerInputIdSelect">Enter Options *</label>
                <TextField
                  size="small"
                  id="DrawerInputFieldCrtId"
                  name="Options"
                  placeholder="Enter Options"
                  onChange={setChipIntoDivHandler}
                  value={ChipTextIndiual}
                  onKeyDown={ChipEditEnterHandler}
                  autoComplete="off"
                />

                <div className="api-chip-wrapper-div">
                  {SelectedFieldSingle?.enumValues?.map((data: string) => {
                    return (
                      <Chip
                        key={data}
                        label={data}
                        onDelete={() => {
                          setSelectedFieldSingle(
                            (prev: PostCreateFieldData) => {
                              const dataTemp = { ...prev };
                              return {
                                ...prev,
                                enumValues: dataTemp?.enumValues?.filter(
                                  (chip: string) => chip !== data
                                ),
                              };
                            }
                          );
                        }}
                      />
                    );
                  })}
                  {SelectedFieldSingle?.enumValues?.length === 0 ? (
                    <p style={{ fontSize: "12px" }}>options listed here</p>
                  ) : (
                    ""
                  )}
                </div>
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      size="medium"
                      checked={SelectedFieldSingle?.required}
                      onChange={HandletInputEditFunc}
                      name="required"
                    />
                  }
                  label="TextArea fill required (yes / no) : "
                  labelPlacement="start"
                />
              </div>
            ) : (
              ""
            )}
            {SelectedFieldSingle?.type === "radioButton" ? (
              <div className="render-fields-namess">
                <label htmlFor="DrawerInputFieldCrtId">Enter Name *</label>
                <TextField
                  size="small"
                  id="DrawerInputFieldCrtId"
                  name="name"
                  placeholder="Enter Name"
                  autoComplete="off"
                  value={SelectedFieldSingle?.name}
                  onChange={HandletInputEditFunc}
                />
                <label id="DrawerInputIdSelect">Enter Options *</label>
                <TextField
                  size="small"
                  id="DrawerInputFieldCrtId"
                  name="Options"
                  placeholder="Enter Options"
                  onChange={setChipIntoDivHandler}
                  value={ChipTextIndiual}
                  onKeyDown={ChipEditEnterHandler}
                  autoComplete="off"
                />

                <div className="api-chip-wrapper-div">
                  {SelectedFieldSingle?.enumValues?.map((data: string) => {
                    return (
                      <Chip
                        key={data}
                        label={data}
                        onDelete={() => {
                          setSelectedFieldSingle(
                            (prev: PostCreateFieldData) => {
                              const dataTemp = { ...prev };
                              return {
                                ...prev,
                                enumValues: dataTemp?.enumValues?.filter(
                                  (chip: string) => chip !== data
                                ),
                              };
                            }
                          );
                        }}
                      />
                    );
                  })}
                  {SelectedFieldSingle?.enumValues?.length === 0 ? (
                    <p style={{ fontSize: "12px" }}>options listed here</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </section>
          <footer>
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
      <div className="inputs-form-group-div">
        {InputData.length === 0 ? <h3>No Data Fields</h3> : ""}
        {InputData?.map((data: PostCreateFieldData) => {
          return (
            <div className="singnle-form-input-div" key={data.name}>
              <InputLabel
                title={data.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "14px",
                }}
                id="select-field-label"
              >
                {data.name} {data.required === true ? "*" : ""}
                <IconButton
                  sx={{ fontSize: "20px" }}
                  onClick={(e) => {
                    handleClickMenu(e, data);
                  }}
                >
                  <MoreVertIcon sx={{ fontSize: "12px" }} />
                </IconButton>
              </InputLabel>
              {data.type === "textField" ? (
                <TextField
                  id="input-sin-field"
                  placeholder={`Enter ${data.name}`}
                  type={data.identity}
                  name={data.name}
                  autoComplete="off"
                  inputProps={{
                    autoComplete: "new-password",
                    maxLength: data.max,
                    minLength: data.min,
                  }}
                />
              ) : (
                ""
              )}
              {data.type === "textArea" ? (
                <TextField
                  id="textarea-api"
                  placeholder={`Enter ${data.name}`}
                  name={data.name}
                  autoComplete="off"
                  inputProps={{
                    autoComplete: "new-password",
                    maxLength: data.max,
                    minLength: data.min,
                  }}
                  rows={data.identity}
                  multiline
                />
              ) : (
                ""
              )}
              {data.type === "dropDown" && data.identity === "multiple" ? (
                <Select
                  labelId="DrawerInputIdSelect"
                  id="DrawerInputIdSelect"
                  value={MultiSelectedOptions as any}
                  name={data.name}
                  placeholder="select"
                  sx={{ fontSize: "12px", color: "brown" }}
                  displayEmpty
                  fullWidth
                  multiple
                  onChange={HandleChangeMultiSelection}
                  style={{
                    height: 40,

                    alignSelf: "flex-start",
                  }}
                  renderValue={(selected) => {
                    if (MultiSelectedOptions.length === 0) {
                      return "Select an option";
                    }
                    return Array.isArray(selected)
                      ? (selected as string[]).join(", ")
                      : [];
                  }}
                >
                  {data?.enumValues?.map((dta: any) => {
                    return (
                      <MenuItem
                        sx={{ fontSize: "12px", color: "#5E5873" }}
                        value={dta}
                        key={dta}
                      >
                        {dta}
                      </MenuItem>
                    );
                  })}
                </Select>
              ) : (
                ""
              )}
              {data.type === "dropDown" && data.identity === "single" ? (
                <Select
                  labelId="DrawerInputIdSelect"
                  id="DrawerInputIdSelect"
                  name={data.name}
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
                  {data?.enumValues?.map((dta: any) => {
                    return (
                      <MenuItem
                        sx={{ fontSize: "12px", color: "#5E5873" }}
                        value={dta}
                        key={dta}
                      >
                        {dta}
                      </MenuItem>
                    );
                  })}
                </Select>
              ) : (
                ""
              )}
              {data.type === "radioButton" ? (
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    row
                    name={data.name}
                  >
                    {data?.enumValues?.map((data: any) => {
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
              <ConfirmDialog
                open={OpenDeleteDialog}
                handleClose={DeleteDialogHandler}
                content="Are you sure want to delete this"
                handleOk={DeleteFieldHandler}
              />
            </div>
          );
        })}
      </div>
      <div className="btn-submit-wrapper">
        <Button
          type="reset"
          size="small"
          variant="outlined"
          className="dyn-submit-btn"
        >
          Reset
        </Button>
        <Button
          type="submit"
          size="small"
          variant="contained"
          className="dyn-submit-btn"
        >
          Submit
        </Button>
      </div>
      <SnackBarSuccess
        open={OpenSnackBar}
        handleClose={SnackBarHandler}
        content={`Field has been successfully added`}
      />
      <SnackBarSuccess
        open={FieldUpdateSuccess}
        handleClose={UpdateSuccessHandler}
        content={`Field has been Updated successfully`}
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem sx={menuItemStyleTwo} onClick={HandlerEditToggleDrawer}>
          Edit <EditIcon sx={{ fontSize: "14px" }} />
        </MenuItem>
        <MenuItem sx={menuItemStyleTwo} onClick={DeleteDialogHandler}>
          Delete <DeleteIcon sx={{ fontSize: "14px" }} />
        </MenuItem>
        <MenuItem sx={menuItemStyleTwo} onClick={handleCloseMenu}>
          Logic <MergeTypeIcon sx={{ fontSize: "14px" }} />
        </MenuItem>
      </Menu>
    </form>
  );
}
