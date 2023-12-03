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

  // function weeks_in_month(year, month) {
  //   let startDate = moment([year, month - 1]);
  //   let endDate = moment(startDate).endOf("month");

  //   var dates = [];
  //   var weeks = [];

  //   var per_week = [];
  //   var difference = endDate.diff(startDate, "days");

  //   per_week.push(startDate.toDate());
  //   let index = 0;
  //   let last_week = false;
  //   while (startDate.add(1, "days").diff(endDate) < 0) {
  //     if (startDate.day() != 0) {
  //       per_week.push(startDate.toDate());
  //     } else {
  //       if (startDate.clone().add(7, "days").month() == month - 1) {
  //         weeks.push(per_week);
  //         per_week = [];
  //         per_week.push(startDate.toDate());
  //       } else if (Math.abs(index - difference) > 0) {
  //         if (!last_week) {
  //           weeks.push(per_week);
  //           per_week = [];
  //         }
  //         last_week = true;
  //         per_week.push(startDate.toDate());
  //       }
  //     }
  //     index += 1;
  //     if ((last_week == true && Math.abs(index - difference) == 0) || (Math.abs(index - difference) == 0 && per_week.length == 1)) {
  //       weeks.push(per_week);
  //     }
  //     dates.push(startDate.clone().toDate());
  //   }
  //   return weeks;
  // }

  // useEffect(() => {
  //   let months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

  //   let weeksInMonths = {};
  //   months.map((item, index) => {
  //     let weeks = weeks_in_month(2023, index + 1);
  //     weeksInMonths[index + 1] = weeks;
  //   });
  // }, []);

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
