"use client";
import { useState, FormEvent, ChangeEvent, useMemo } from "react";
import {
  MenuItem,
  Button,
  Select,
  Drawer,
  ListSubheader,
  TextField,
  IconButton,
  Paper,
  Switch,
  FormControl,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { styled } from "@mui/material/styles";
import data from "../../data.json";
import { ImportColumns } from "../components/TableSource";
import "./style.scss";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import CloseIcon from "@mui/icons-material/Close";
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}
export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-main": {
    // remove overflow hidden overwise sticky does not work
    overflow: "unset",
  },
  "& .MuiDataGrid-columnHeaders": {
    position: "sticky",
    zIndex: 1,
    top: 0,
  },
  "& .MuiDataGrid-virtualScroller": {
    // remove the space left for the header
    marginTop: "0!important",
  },
  "& .super-app-theme--header": {
    backgroundColor: "white",
    color: "253858 ",
  },
}));
export default function UserManagement(props: Props) {
  const initialValues = {
    PlantName: "",
    PlantCode: "",
    Location: "",
    PlantDescription: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState<any>({});
  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&:before, &:after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
      "&:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      "&:after": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

  const [tblData, setTblData] = useState<any>(data);
  const DeleteHandler = (id: number) => {
    setTblData((prev: any) => {
      return prev.filter((dta: any) => id !== dta.id);
    });
    console.log(tblData);
  };

  const handleChange = (e: ChangeEvent) => {
    e.preventDefault();
    const { name, value }: any = e.target;
    setFormValues((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleChangeSelect = (event: SelectChangeEvent) => {
    setFormValues((prev) => {
      return { ...prev, Location: event.target.value };
    });
  };
  const actionColumn: GridColDef[] = [
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => {
        return (
          <div className="wrapperIconAction">
            <Android12Switch
              color="primary"
              size="medium"
              checked={params.row.status}
            />
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="wrapperIconAction">
            <IconButton>
              <EditOutlinedIcon sx={{ fontSize: "1.2rem", color: "#32363A" }} />
            </IconButton>
            <IconButton
              onClick={() => {
                DeleteHandler(params.row.id);
              }}
            >
              <DeleteForeverIcon
                sx={{ fontSize: "1.2rem", color: "#32363A" }}
              />
            </IconButton>
          </div>
        );
      },
    },
  ];
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const validate = (values: any) => {
    const errors: any = {};

    if (!values.PlantName) {
      errors.PlantName = "PlantName is required!";
    }
    if (!values.PlantCode) {
      errors.PlantCode = "PlantCode is required!";
    }
    if (!values.Location) {
      errors.Location = "Location is required";
    }
    if (!values.PlantDescription) {
      errors.PlantDescription = "PlantDescription is required";
    }
    if (
      values.PlantName &&
      values.PlantCode &&
      values.Location &&
      values.PlantDescription
    ) {
      const RandomId = Math.random();
      const plantDta = {
        id: RandomId,
        plantName: values.PlantName,
        plantCode: values.PlantCode,
        discription: values.PlantDescription,
        status: false,
      };
      console.log(plantDta);
      setTblData((prev: any) => {
        return [plantDta, ...prev];
      });
      console.log(tblData);
      handleDrawerToggle();
      handleClick();
      setFormValues(initialValues);
    }

    return errors;
  };
  const SubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
  };
  const [searchText, setSearchText] = useState("");
  const menuDataList = [
    "chennai",
    "mumbai",
    "kolkatta",
    "Delhi",
    "Assam",
    "Kerala",
    "Karnataka",
  ];
  const containsText = (text: string, searchText: string) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
  const displayedOptions = useMemo(
    () => menuDataList.filter((option) => containsText(option, searchText)),
    [searchText]
  );
  const { window, handleDrawerToggle, mobileOpen } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <Drawer
        anchor={"right"}
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
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
              Create New Plant
            </span>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </header>

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
            <label htmlFor="PlantNameId" style={{ alignSelf: "flex-start" }}>
              Plant Name
            </label>
            <TextField
              size="small"
              id="PlantNameId"
              name="PlantName"
              onChange={handleChange}
              placeholder="Enter Plant Name"
              autoComplete="off"
              error={Boolean(formErrors.PlantName)}
              helperText={formErrors.PlantName}
            />

            <label htmlFor="PlantCodeId" style={{ alignSelf: "flex-start" }}>
              Plant Code
            </label>
            <TextField
              size="small"
              id="PlantCodeId"
              name="PlantCode"
              placeholder="Enter Plant Code"
              onChange={handleChange}
              error={Boolean(formErrors.PlantCode)}
              autoComplete="off"
              helperText={formErrors.PlantCode}
            />

            <label
              htmlFor="demo-select-small"
              style={{ alignSelf: "flex-start" }}
            >
              Location
            </label>
            <FormControl
              error={Boolean(formErrors.PlantCode)}
              fullWidth
              id="demo-select-small"
              sx={{
                fontSize: "12px",
              }}
            >
              <InputLabel id="demo-simple-select-label">
                Select Location
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={formValues.Location}
                label="Select Location"
                size="small"
                onClose={() => setSearchText("")}
                onChange={handleChangeSelect}
              >
                {/* TextField is put into ListSubheader so that it doesn't
              act as a selectable item in the menu
              i.e. we can click the TextField without triggering any selection.*/}
                <ListSubheader>
                  <TextField
                    size="small"
                    // Autofocus on textfield
                    autoFocus
                    placeholder="Type to search..."
                    /*  fullWidth */
                    id="inside-search-select"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key !== "Escape") {
                        // Prevents autoselecting item while typing (default Select behaviour)
                        e.stopPropagation();
                      }
                    }}
                  />
                </ListSubheader>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {displayedOptions.map((dta: string) => {
                  return (
                    <MenuItem value={dta} key={dta}>
                      {dta}
                    </MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>{formErrors.Location}</FormHelperText>
            </FormControl>
            {/* <FormControl
              error={Boolean(formErrors.PlantCode)}
              fullWidth
              sx={{
                fontSize: "12px",
                padding: "0",
               
                margin: "0",
              }}
            >
              <InputLabel
                id="demo-multiple-name-label"
                sx={{ fontSize: "12px" }}
              >
                Select Location
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                size="small"
                id="demo-select-small"
                value={formValues.Location}
                onChange={handleChangeSelect}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Mumbai</MenuItem>
                <MenuItem value={20}>Delhi</MenuItem>
                <MenuItem value={30}>Kolkatta</MenuItem>
              </Select>{" "}
              <FormHelperText>{formErrors.Location}</FormHelperText>
            </FormControl> */}
            <label htmlFor="PlantDescId" style={{ alignSelf: "flex-start" }}>
              Plant Description
            </label>
            <TextField
              size="small"
              id="PlantDescId"
              name="PlantDescription"
              placeholder="Enter Plant Description"
              multiline
              rows={3}
              autoComplete="off"
              onChange={handleChange}
              error={Boolean(formErrors.PlantDescription)}
              helperText={formErrors.PlantDescription}
            />
          </div>

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
              onClick={handleDrawerToggle}
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

      <Paper
        className="userTblWrap"
        style={{
          width: "99%",
          overflowY: "scroll",
          // height: "100%",
          padding: 0,
          margin: 0,
          transition: "all 500ms ease;",
        }}
      >
        <DataGrid
          className="datagrid"
          rows={tblData ? tblData : ""}
          columns={ImportColumns.concat(actionColumn)}
          autoHeight
          disableRowSelectionOnClick
          checkboxSelection
          sx={{
            "& .MuiDataGrid-main": {
              // remove overflow hidden overwise sticky does not work
              overflow: "unset",
            },
            "& .MuiDataGrid-columnHeaders": {
              position: "sticky",
              zIndex: 1,
              top: 0,
            },
            "& .MuiDataGrid-virtualScroller": {
              // remove the space left for the header
              marginTop: "0!important",
            },
            "& .super-app-theme--header": {
              backgroundColor: "white",
              color: "253858 ",
            },
            "&  .MuiDataGrid-columnSeparator": {
              display: "none !important",
              padding: 0,
              margin: 0,
            },

            "&  .MuiDataGrid-columnHeaderTitle": {
              color: "#253858",
            },

            "&  .MuiDataGrid-cell": {
              fontSize: "13px",
            },
            "&  .MuiDataGrid-sortIcon": {
              color: "#253858",
            },
            "&  .MuiDataGrid-menuIconButton": {
              color: "#253858",
            },

            "&  .MuiDataGrid-columnHeaderCheckbox": {
              backgroundColor: "white",
              "&  .MuiDataGrid-checkboxInput": {
                color: "#253858",
              },
            },
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
        />
      </Paper>
    </>
  );
}
