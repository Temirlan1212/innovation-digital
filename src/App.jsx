import React, { useEffect } from "react";
import moment from "moment";
import "./App.css";
import Timeline from "./components/TimelineV1/Timeline";

function App() {
  const totalDays = 357;
  let startDate = moment().add(-totalDays, "days");
  let dateRange = [startDate, moment()];

  let data = Array.from(new Array(totalDays)).map((_, index) => {
    return {
      date: moment(startDate).add(index, "day"),
      value: Math.floor(Math.random() * 100),
    };
  });

  function weeks_in_month(year, month) {
    let startDate = moment([year, month - 1]);
    let endDate = moment(startDate).endOf("month");

    var dates = [];
    var weeks = [];

    var per_week = [];
    var difference = endDate.diff(startDate, "days");

    per_week.push(startDate.toDate());
    let index = 0;
    let last_week = false;
    while (startDate.add(1, "days").diff(endDate) < 0) {
      if (startDate.day() != 0) {
        per_week.push(startDate.toDate());
      } else {
        if (startDate.clone().add(7, "days").month() == month - 1) {
          weeks.push(per_week);
          per_week = [];
          per_week.push(startDate.toDate());
        } else if (Math.abs(index - difference) > 0) {
          if (!last_week) {
            weeks.push(per_week);
            per_week = [];
          }
          last_week = true;
          per_week.push(startDate.toDate());
        }
      }
      index += 1;
      if (
        (last_week == true && Math.abs(index - difference) == 0) ||
        (Math.abs(index - difference) == 0 && per_week.length == 1)
      ) {
        weeks.push(per_week);
      }
      dates.push(startDate.clone().toDate());
    }
    return weeks;
  }

  useEffect(() => {
    let months = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];

    let weeksInMonths = {};
    months.map((item, index) => {
      let weeks = weeks_in_month(2023, index + 1);
      weeksInMonths[index + 1] = weeks;
    });

    console.log(weeksInMonths);
  }, []);

  return (
    <Timeline
      range={dateRange}
      data={data}
      colorFunc={({ alpha }) => `rgba(3, 160, 3, ${alpha})`}
    />
  );
}

export default App;
