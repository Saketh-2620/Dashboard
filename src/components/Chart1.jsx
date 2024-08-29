import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";

const size = {
  width: 350,
  height: 150,
};

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2 - 48} y={top + height / 2}>
      {`Total (${children})`}
    </StyledText>
  );
}

export default function PieChartWithCenterLabel(props) {
  const data = props.valueData.map((value, index) => ({
    value: value,
    label: `${props.labelData[index]} (${value})`,
  }));
  const totalValue = props.valueData.reduce((acc, value) => acc + value, 0);
  return (
    <PieChart
      series={[
        { data, innerRadius: 50, outerRadius: 70, cx: 75, label: "series\nA" },
      ]}
      {...size}
    >
      <PieCenterLabel>{totalValue}</PieCenterLabel>
    </PieChart>
  );
}
