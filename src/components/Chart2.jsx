import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function BasicLineChart(props) {
  return (
    <LineChart
      xAxis={[{ data: props.labelData }]}
      series={[
        {
          data: props.valueData,
        },
      ]}
      width={300}
      height={200}
    />
  );
}
