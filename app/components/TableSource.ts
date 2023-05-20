import { GridColDef } from "@mui/x-data-grid";
export const ImportColumns: GridColDef[] = [
  {
    field: "plantName",
    headerClassName: "super-app-theme--header",
    flex: 1,
    headerName: "Plant Name",
  },
  {
    field: "plantCode",
    headerClassName: "super-app-theme--header",
    headerName: "Pant Code",
    /*  renderCell: (params) => {
        return params.row.roles?.map((datarol: any) => datarol.name).join(", ");
      }, */
    flex: 1,
  },
  {
    field: "discription",
    headerClassName: "super-app-theme--header",
    headerName: "Discription",
    flex: 1.5,
  },
];
