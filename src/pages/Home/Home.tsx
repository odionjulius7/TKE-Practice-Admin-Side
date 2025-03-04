import React, { useEffect } from "react";
import { NavBar } from "../../components/index";
import Grid from "@mui/material/Grid";
import MainBody from "../../components/MainBody/MainBody";
import { Box, Divider, Typography } from "@mui/material";
import TripRequestTable from "../../components/TripRequestTable/TripRequestTable";
import { useAppDispatch, useAppSelector } from "../../Features/storeHook";
import { fetchTripRequests } from "../../Features/tripRequest/tripRequestSlice";
import { fetchAllTrip } from "../../Features/Trip/tripSlice";
import TripReqsChart from "../../components/Charts/TripReqsChart";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

interface Props {}

const Home: React.FC<Props> = () => {
  const { requestCount } = useAppSelector((state) => state.tripRequests);
  const { tripCount } = useAppSelector((state) => state.trips);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTripRequests());
    dispatch(fetchAllTrip());
  }, [dispatch]);

  // Pie chart data
  const data = [
    { name: "New Requests", value: requestCount },
    { name: "Completed Trips", value: tripCount },
  ];

  const COLORS = ["#5e35b1", "#42a5f5", "#ffca28", "#ef5350"]; // Updated colors for a modern palette

  return (
    <Grid container sx={{ minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      <Grid
        item
        xs={12}
        md={2}
        lg={2}
        sx={{ bgcolor: "#ffffff", boxShadow: "2px 0 10px rgba(0,0,0,0.05)" }}
      >
        <NavBar />
      </Grid>
      <MainBody>
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: "1300px", mx: "auto" }}>
          {/* Dashboard Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              { title: "Total Trips", value: tripCount, color: "#5e35b1" },
              { title: "Trip Requests", value: requestCount, color: "#42a5f5" },
              { title: "Total Users", value: 250, color: "#ffca28" },
              { title: "Top Location", value: 12, color: "#ef5350" },
            ].map((card, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "#ffffff",
                    borderRadius: "12px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                    textAlign: "center",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "#616161", fontWeight: 500, fontSize: "1rem" }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ color: card.color, fontWeight: 700, mt: 1 }}
                  >
                    {card.value}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Divider */}
          <Divider sx={{ my: 4, borderColor: "#e0e0e0" }} />

          {/* Charts Section */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  bgcolor: "#ffffff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  p: 2,
                  height: 350,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <TripReqsChart /> */}
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  bgcolor: "#ffffff",
                  borderRadius: "12px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  p: 2,
                  height: 350,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <PieChart width={400} height={300}>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </Box>
            </Grid>
          </Grid>

          {/* Divider */}
          <Divider sx={{ my: 4, borderColor: "#e0e0e0" }} />

          {/* Trip Request Table */}
          {/* <Box
            sx={{
              bgcolor: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              p: 2,
            }}
          > */}
          <TripRequestTable />
          {/* </Box> */}
        </Box>
      </MainBody>
    </Grid>
  );
};

export default Home;
