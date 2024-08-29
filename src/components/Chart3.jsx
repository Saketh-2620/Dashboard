import { Box, Typography } from "@mui/material";

export default function SingleBar(props) {
  const { valueData, labelData } = props;

  const totalValue = valueData.reduce((acc, val) => acc + val, 0);

  const colors = [
    "#e15759",
    "#ff9d9a",
    "#f28e2b",
    "#ffbf5b",
    "#edc948",
    "#f1ce63",
    "#59a14f",
    "#8cd17d",
    "#76b7b2",
    "#4e79a7",
    "#9c755f",
    "#bab0ab",
    "#d4a6c8",
    "#ff9da7",
    "#9c755f",
    "#5d5f60",
    "#e15759",
    "#ff9d9a",
    "#f28e2b",
    "#ffbf5b",
  ];

  return (
    <Box>
      <Box
        sx={{
          mt: 2,
          width: "100%",
          height: 20,
          bgcolor: "#f0f0f0",
          borderRadius: 1,
          overflow: "hidden",
          display: "flex",
        }}
      >
        {valueData.map((value, index) => (
          <Box
            key={index}
            sx={{
              width: `${(value / totalValue) * 100}%`,
              height: "100%",
              bgcolor: colors[index % colors.length],
            }}
          />
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
        {labelData.map((label, index) => (
          <Typography key={index} variant="body2">
            • {label} ({valueData[index]})
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
