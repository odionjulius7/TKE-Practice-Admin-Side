import React from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Box, SxProps, Theme } from "@mui/material";

interface RowData {
  _id: string; // Match Prisma CUIDs
  id: string; // Updated to string for consistency
  createdAt?: string;
  status?: string;
  email?: string;
  name?: string;
  tripType?: string;
  userType?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  postCode?: string;
  role?: string;
  phoneNumber?: string;
  title?: string;
  startDate?: string;
  endDate?: string;
}

interface Props {
  rows: RowData[];
  columns: GridColDef[];
  loading: boolean;
  sx: SxProps<Theme>; // Updated to use SxProps<Theme> for better typing
  onRowClick?: (params: GridRowParams) => void;
  pageSize?: number;
  rowsPerPageOptions?: number[];
  disableSelectionOnClick?: boolean;
}

const DataTableUser: React.FC<Props> = ({
  rows,
  columns,
  loading,
  sx,
  onRowClick,
  pageSize = 6,
  rowsPerPageOptions = [5],
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

export default DataTableUser;
