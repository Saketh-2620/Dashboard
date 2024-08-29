import {
  Box,
  Typography,
  Drawer,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { toggleForm, deleteCard, setSelectedTab } from "../Store/Card";
import AddWidgetButton from "./Add";
import WidgetForm from "./Form";

const AddWidgetDrawer = ({ open, onClose }) => {
  const dashboardData = useSelector((state) => state.dashboard);
  const isFormOpen = useSelector((state) => state.dashboard.showForm);
  const selectedTab = useSelector((state) => state.dashboard.tab);

  const dispatch = useDispatch();

  const categories = Object.keys(dashboardData.data);

  const handleTabChange = (event, newValue) => {
    // console.log(newValue, "newValue");
    dispatch(setSelectedTab(newValue));

    if (isFormOpen) {
      dispatch(toggleForm());
    }
  };

  const handleCheckboxChange = (category, cardIndex, e) => {
    if (!e.target.checked) {
      dispatch(deleteCard({ category, index: cardIndex }));
    }
  };
  const handleCloseDrawer = () => {
    if (isFormOpen) {
      dispatch(toggleForm());
    }
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleCloseDrawer}
      PaperProps={{
        sx: { width: "400px", bgcolor: "background.paper" },
      }}
    >
      <Box
        sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Add Widget
          </Typography>
          <IconButton onClick={handleCloseDrawer} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Personalise your dashboard by adding the following widget
        </Typography>

        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="widget categories"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          {categories.map((category, index) => (
            <Tab key={index} label={category}></Tab>
          ))}
        </Tabs>

        <Box sx={{ mt: 2, flexGrow: 1, overflowY: "auto" }}>
          {dashboardData.data[categories[selectedTab]].map(
            (card, cardIndex) => (
              <FormControlLabel
                key={cardIndex}
                control={
                  <Checkbox
                    checked={true}
                    onChange={(e) =>
                      handleCheckboxChange(
                        categories[selectedTab],
                        cardIndex,
                        e
                      )
                    }
                  />
                }
                label={card.cardName}
              />
            )
          )}
          <AddWidgetButton category={categories[selectedTab]} />
          <WidgetForm />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 3,
            pt: 2,
            borderTop: 1,
            borderColor: "divider",
          }}
        ></Box>
      </Box>
    </Drawer>
  );
};

export default AddWidgetDrawer;
