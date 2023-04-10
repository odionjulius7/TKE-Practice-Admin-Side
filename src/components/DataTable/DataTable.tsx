import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Box } from "@mui/material";

interface Props1 {
  _id: string | number;
  id?: number;
  createdAt?: string;
  status?: string;
  email?: string;
  name?: string;
  tripType?: string;
  userType?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}
type Props = {
  rows: Props1[];
  columns: GridColDef[];
  loading: boolean;
  sx: {};
};

const DataTable = ({ rows, columns, loading, sx }: Props) => {
  return (
    <Box sx={sx}>
      <DataGrid
        columns={columns}
        rows={rows}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 6,
            },
          },
        }}
        pageSizeOptions={[5]}
        // checkboxSelection
        disableRowSelectionOnClick
        loading={loading}
      />
    </Box>
  );
};

export default DataTable;
