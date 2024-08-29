import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { toggleForm } from "../Store/Card";

export default function AddWidgetButton({ category }) {
  const dispatch = useDispatch();
  const isFormOpen = useSelector((state) => state.dashboard.showForm);

  const handleAddWidget = () => {
    dispatch(toggleForm(category));
    console.log(category, "category");
  };

  return (
    !isFormOpen && (
      <Button variant="contained" onClick={handleAddWidget}>
        Add Widget
      </Button>
    )
  );
}
