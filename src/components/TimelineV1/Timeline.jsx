import React from "react";
import moment from "moment";
import styles from "./Timeline.module.css";

const DayNames = {
  0: "Пн",
  2: "Ср",
  4: "Пт",
};

function Cell({ color }) {
  let style = {
    backgroundColor: color,
  };

  return <div className={styles["timeline-cells-cell"]} style={style}></div>;
}

function Month({ startDate, index, cellQuantity }) {
  let date = moment(startDate).add(index * cellQuantity, "day");
  let monthName = date.format("MMM");

  return (
    <div className={`${styles["timeline-months-month"]} ${styles[monthName]}`}>
      {monthName}
    </div>
  );
}

function WeekDay({ index }) {
  return (
    <div className={styles["timeline-weekdays-weekday"]}>{DayNames[index]}</div>
  );
}

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
    <div className={styles["timeline"]}>
      <div className={styles["timeline-months"]}>
        {months.map((_, index) => (
          <Month
            key={index}
            index={index}
            startDate={startDate}
            cellQuantity={cellQuantity}
          />
        ))}
      </div>

      <div className={styles["timeline-body"]}>
        <div className={styles["timeline-weekdays"]}>
          {weekDays.map((_, index) => (
            <WeekDay key={index} index={index} startDate={startDate} />
          ))}
        </div>

        <div className={styles["timeline-cells"]}>
          {cells.map((_, index) => {
            let date = moment(startDate).add(index, "day");
            let dataPoint = data.find(
              (d) =>
                moment(date).format(DayFormat) ===
                moment(d.date).format(DayFormat)
            );
            let alpha = colorMultiplier * dataPoint.value;
            let color = colorFunc({ alpha });

            return <Cell key={index} index={index} date={date} color={color} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Timeline;
