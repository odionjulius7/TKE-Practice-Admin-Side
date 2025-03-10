import React from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Box } from "@mui/material";

interface RowData {
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

interface Props {
  rows: RowData[];
  columns: GridColDef[];
  loading: boolean;
  sx: object;
  onRowClick?: (params: GridRowParams) => void;
  pageSize?: number; // Added
  rowsPerPageOptions?: number[]; // Added
  disableSelectionOnClick?: boolean; // Already included, but explicit
}

const DataTable: React.FC<Props> = ({
  rows,
  columns,
  loading,
  sx,
  onRowClick,
  pageSize = 6, // Default matches your initialState
  rowsPerPageOptions = [5], // Default matches your pageSizeOptions
  disableSelectionOnClick = false,
}) => {
  return (
    <Box sx={sx}>
      <DataGrid
        columns={columns}
        rows={rows}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize,
            },
          },
        }}
        pageSizeOptions={rowsPerPageOptions}
        disableRowSelectionOnClick={disableSelectionOnClick}
        loading={loading}
        onRowClick={onRowClick}
      />
    </Box>
  );
};

export default DataTable;
