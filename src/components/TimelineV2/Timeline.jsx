import React from "react";
import moment from "moment";
import styles from "./Timeline.module.css";

function Timeline({ range, data, colorFunc, cellQuantity = 7 }) {
  let days = Math.abs(range[0].diff(range[1], "days"));
  let cells = Array.from(new Array(days));
  let weekDays = Array.from(new Array(cellQuantity));
  let months = Array.from(new Array(Math.floor(days / cellQuantity)));

  let min = Math.min(0, ...data.map((d) => d.value));
  let max = Math.max(...data.map((d) => d.value));

  let colorMultiplier = 1 / (max - min);

  let startDate = range[0];
  const DayFormat = "DDMMYYYY";

  return (
    <table>
      <thead>
        <td></td>
      </thead>
      <tbody>
        <td></td>
      </tbody>
    </table>
  );
}

export default Timeline;
