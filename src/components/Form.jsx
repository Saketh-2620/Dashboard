import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCard } from "../Store/Card";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

const WidgetForm = () => {
  const dispatch = useDispatch();
  const { showForm, currentCategory } = useSelector((state) => state.dashboard);
  // console.log(showForm, "showForm");
  const [cardName, setCardName] = useState("");
  const [items, setItems] = useState("");
  const [amounts, setAmounts] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cardName.trim() || !items.trim() || !amounts.trim()) return;

    const newCard = {
      cardName,
      cardData: {
        items: items.split(",").map((item) => item.trim()),
        amount: amounts.split(",").map((amount) => parseFloat(amount.trim())),
      },
    };

    dispatch(addCard({ category: currentCategory, newCard }));
    setCardName("");
    setItems("");
    setAmounts("");
  };

  if (!showForm) return null;

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="subtitle1" gutterBottom>
          Add New {currentCategory} Card
        </Typography>
        <Stack spacing={1.5}>
          <TextField
            fullWidth
            label="Card Name"
            variant="outlined"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="Enter card name"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Items"
            variant="outlined"
            value={items}
            onChange={(e) => setItems(e.target.value)}
            placeholder="Enter items "
            helperText="Separate items with commas"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Amounts"
            variant="outlined"
            value={amounts}
            onChange={(e) => setAmounts(e.target.value)}
            placeholder="Enter amounts"
            helperText="Separate amounts with commas"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              sx={{ mt: 1 }}
            >
              Add Card
            </Button>
          </Box>
        </Stack>
      </form>
    </Paper>
  );
};

export default WidgetForm;
