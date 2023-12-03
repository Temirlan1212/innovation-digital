import React from "react";
import moment from "moment";
import styles from "./Timeline.module.css";
import Tooltip from "../Tooltip/Tooltip";

const DayNames = {
  0: "Пн",
  1: "Вт",
  2: "Ср",
  3: "Чт",
  4: "Пт",
  5: "Суб",
  6: "Вс",
};

// ▩ - Нет контрибуций
// ▩ - 1-9 контрибуций
// ▩ - 10-19 контрибуций
// ▩ - 20-29 контрибуций
// ▩ - 30+ контрибуций

const monthNames = {
  0: "Январь",
  1: "Февраль",
  2: "Март",
  3: "Апрель",
  4: "Май",
  5: "Июнь",
  6: "Июль",
  7: "Август",
  8: "Сентябрь",
  9: "Октябрь",
  10: "Ноябрь",
  11: "Декабрь",
};

const getColor = (count) => {
  if (count === 0 || count == null) {
    return "#EDEDED";
  } else if (count >= 1 && count <= 9) {
    return "#ACD5F2";
  } else if (count >= 10 && count <= 19) {
    return "#7FA8C9";
  } else if (count >= 20 && count <= 29) {
    return "#527BA0";
  } else {
    return "#254E77";
  }
};

const getContributions = (count) => {
  if (count === 0 || count == null) {
    return "Нет контрибуций";
  } else if (count >= 1 && count <= 9) {
    return "1-9 контрибуций";
  } else if (count >= 10 && count <= 19) {
    return "10-19 контрибуций";
  } else if (count >= 20 && count <= 29) {
    return "20-29 контрибуций";
  } else {
    return "30+ контрибуций";
  }
};

const truncate = (char, length, truncateSymbol) => {
  if (typeof char === typeof "") {
    return `${char.slice(0, length)}${truncateSymbol ? truncateSymbol : "..."}`;
  }
  return char;
};

function Cell({ color, date, tooltipContent }) {
  let style = {
    backgroundColor: color,
  };
  const monthName = monthNames[date.month()];
  const weekName = DayNames[date.day()];
  const year = date.year();

  return (
    <Tooltip
      content={
        <div className={styles["timeline-tooltip-content"]}>
          <div>
            {year}, {monthName} {date.date()} , {weekName}
          </div>
          <div>{tooltipContent}</div>
        </div>
      }
      direction="top"
      delay={100}
    >
      <div className={styles["timeline-cells-cell"]} style={style}></div>
    </Tooltip>
  );
}

function Month({ startDate, index, cellQuantity }) {
  let date = moment(startDate).add(index * cellQuantity, "day");
  let monthName = date.format("MMM");
  let monthIndexFromName = moment().month(monthName).format("M") - 1;

  return (
    <div className={`${styles["timeline-months-month"]} ${styles[monthName]}`}>{truncate(monthNames?.[monthIndexFromName] ?? monthName, 3)}</div>
  );
}

function WeekDay({ index }) {
  const showDays = {
    0: "Пн",
    2: "Ср",
    4: "Пт",
  };
  return <div className={styles["timeline-weekdays-weekday"]}>{showDays[index]}</div>;
}

function Timeline({ range, data, cellQuantity = 7 }) {
  let days = Math.abs(range[0].diff(range[1], "days"));
  let cells = Array.from(new Array(days));
  let weekDays = Array.from(new Array(cellQuantity));
  let months = Array.from(new Array(Math.floor(days / cellQuantity)));
  let startDate = range[0];

  return (
    <div className={styles["timeline"]}>
      <div className={styles["timeline-months"]}>
        {months.map((_, index) => (
          <Month key={index} index={index} startDate={startDate} cellQuantity={cellQuantity} />
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
            const formattedDate = moment(date).format("YYYY-MM-DD");
            const value = data[formattedDate];
            const color = getColor(value);
            const tooltipContent = getContributions(value);

            return <Cell key={index} index={index} date={date} color={color} tooltipContent={tooltipContent} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Timeline;
