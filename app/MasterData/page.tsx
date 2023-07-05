"use client";
import React, { useState } from "react";
import "./style.scss";
import { usePathname, useRouter } from "next/navigation";
import {
  Breadcrumbs,
  Button,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { DataGrid } from "@mui/x-data-grid";
import data from "../../MOCK_DATA.json";
import { CatalogeColumns } from "../components/TableSource";
export default function MasterData() {
  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
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
  const currentRoute = usePathname();
  console.log(currentRoute.split("/"));
  console.log(currentRoute.split("/").slice(1));
  console.log(currentRoute.split("/").slice(1).toString());
  const [tblData, setTblData] = useState<any>(data);
  const [selectionModel, setSelectionModel] = useState([]);
  const breadcumStyle = {
    position: "absolute",
    top: "5px",
    background: "transparent",

    left: "5px",
    transition: "all 500ms ease",
  };
  const handleSelectionModelChange = (newSelectionModel: any) => {
    setSelectionModel(newSelectionModel);
  };
  return (
    <div className="masterData">
      <Breadcrumbs aria-label="breadcrumb" sx={breadcumStyle} separator="/">
        <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          href="/material-ui/react-breadcrumbs/"
          aria-current="page"
        >
          Breadcrumbs
        </Link>
      </Breadcrumbs>
      <div className="search-bar-wrapper">
        <TextField
          size="small"
          id="SearchInputId"
          placeholder="Type Here to Search"
          sx={{
            backgroundColor: "white",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#949FB1" }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          className="Grid-Export-btn"
          variant="outlined"
          startIcon={<FilterListIcon />}
        >
          Filter
        </Button>
      </div>
      <div className="grid-div-wrapper-ctlg">
        <Paper
          className="userTblWrap"
          style={{
            width: "100%",
            overflowY: "scroll",
            // height: "100%",
            padding: 0,
            margin: 0,
            transition: "all 500ms ease;",
          }}
        >
          <StyledDataGrid
            className="datagrid"
            rows={tblData ? tblData : ""}
            columns={CatalogeColumns}
            autoHeight
            checkboxSelection
            /*  onSelectionModelChange={(itm: any) => {
              console.log(itm);
            }}
            */
            getRowId={(row) => row.item_code}
            sx={{
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

              transition: "all 500ms ease;",
            }}
          />
        </Paper>
      </div>
    </div>
  );
}
