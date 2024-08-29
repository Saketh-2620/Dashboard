import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import PieChartWithCenterLabel from "./components/Chart1";
import BasicLineChart from "./components/Chart2";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCard,
  setSelectedTab,
  setSearchString,
  toggleForm,
} from "./Store/Card";
import AddWidgetDrawer from "./components/Drawer";
import SingleBar from "./components/Chart3";

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dashboardData = useSelector((state) => state.dashboard);
  const searchString = useSelector((state) => state.dashboard.searchString);
  // console.log(searchString, "searchString");

  const dispatch = useDispatch();

  const handleDeleteCard = (category, index) => {
    dispatch(deleteCard({ category, index }));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Accuknox Dashboard
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Widgets"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => dispatch(setSearchString(e.target.value))}
              value={searchString}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          position: "relative",
          mt: 10,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setDrawerOpen(true)}
          sx={{
            textTransform: "none",
            position: "fixed",
            top: 80,
            right: 100,
            zIndex: 3,
          }}
        >
          Add Widget
        </Button>
        <AddWidgetDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      </Box>

      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ mt: 1 }}>
          Expenditure
        </Typography>

        <Grid container spacing={3}>
          {dashboardData.searchData.spendings.map((value, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ mt: 2 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  height: "100%",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                  }}
                >
                  <IconButton
                    onClick={() => handleDeleteCard("spendings", index)}
                    size="small"
                    aria-label="delete card"
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                <Typography variant="h6" gutterBottom>
                  {value.cardName}
                </Typography>
                <PieChartWithCenterLabel
                  key={index}
                  id={index}
                  valueData={value.cardData.amount}
                  labelData={value.cardData.items}
                />
              </Paper>
            </Grid>
          ))}

          <Grid item xs={12} sm={6} md={4} sx={{ mt: 2, zIndex: 2 }}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => {
                  setDrawerOpen(true);
                  dispatch(setSelectedTab(0));
                  // dispatch(toggleForm("spendings"));
                }}
                sx={{
                  textTransform: "none",
                  borderStyle: "dashed",
                  "&:hover": {
                    borderStyle: "solid",
                  },
                }}
              >
                Add Widget
              </Button>

              <AddWidgetDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                initialTab="spendings"
              />
            </Paper>
          </Grid>
        </Grid>

        <Typography variant="h5" gutterBottom sx={{ mt: 8 }}>
          Savings
        </Typography>

        <Grid container spacing={3}>
          {dashboardData.searchData.savings.map((value, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ mt: 2 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  height: "100%",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                  }}
                >
                  <IconButton
                    onClick={() => handleDeleteCard("savings", index)}
                    size="small"
                    aria-label="delete card"
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                <Typography variant="h6" gutterBottom>
                  {value.cardName}
                </Typography>
                <BasicLineChart
                  key={index}
                  id={index}
                  valueData={value.cardData.amount}
                  labelData={value.cardData.items}
                />
              </Paper>
            </Grid>
          ))}

          <Grid item xs={12} sm={6} md={4} sx={{ mt: 2, zIndex: 2 }}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => {
                  setDrawerOpen(true);
                  dispatch(setSelectedTab(1));
                }}
                sx={{
                  textTransform: "none",
                  borderStyle: "dashed",
                  "&:hover": {
                    borderStyle: "solid",
                  },
                }}
              >
                Add Widget
              </Button>

              <AddWidgetDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                initialTab="savings"
              />
            </Paper>
          </Grid>
        </Grid>

        <Typography variant="h5" gutterBottom sx={{ mt: 8 }}>
          Loan
        </Typography>

        <Grid container spacing={3}>
          {dashboardData.searchData.Loan.map((value, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ mt: 2, mb: 3 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  height: "100%",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                  }}
                >
                  <IconButton
                    onClick={() => handleDeleteCard("Loan", index)}
                    size="small"
                    aria-label="delete card"
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                <Typography variant="h6" gutterBottom>
                  {value.cardName}
                </Typography>
                <SingleBar
                  key={index}
                  id={index}
                  valueData={value.cardData.amount}
                  labelData={value.cardData.items}
                />
              </Paper>
            </Grid>
          ))}

          <Grid item xs={12} sm={6} md={4} sx={{ mt: 2, zIndex: 2, mb: 3 }}>
            <Paper
              elevation={3}
              sx={{
                p: 2,
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => {
                  setDrawerOpen(true);
                  dispatch(setSelectedTab(2));
                }}
                sx={{
                  textTransform: "none",
                  borderStyle: "dashed",
                  "&:hover": {
                    borderStyle: "solid",
                  },
                }}
              >
                Add Widget
              </Button>

              <AddWidgetDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                initialTab="savings"
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
