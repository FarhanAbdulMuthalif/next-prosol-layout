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
export const CatalogeColumns: GridColDef[] = [
  {
    field: "item_code",
    headerClassName: "super-app-theme--header",
    flex: 1,
    headerName: "Item Code",
  },
  {
    field: "material_code",
    headerClassName: "super-app-theme--header",
    headerName: "Material Code",
    /*  renderCell: (params) => {
        return params.row.roles?.map((datarol: any) => datarol.name).join(", ");
      }, */
    flex: 1,
  },
  {
    field: "legacy",
    headerClassName: "super-app-theme--header",
    headerName: "Legacy",
    flex: 1.5,
  },
  {
    field: "short_discription",
    headerClassName: "super-app-theme--header",
    headerName: "Short Discription",
    flex: 1.5,
  },
  {
    field: "long_discription",
    headerClassName: "super-app-theme--header",
    headerName: "Long Discription",
    flex: 1.5,
  },
  {
    field: "noun",
    headerClassName: "super-app-theme--header",
    headerName: "Noun",
    flex: 1,
  },
  {
    field: "modifier",
    headerClassName: "super-app-theme--header",
    headerName: "Modifier",
    flex: 1,
  },
  {
    field: "status",
    headerClassName: "super-app-theme--header",
    headerName: "status",
    flex: 1,
  },
];
