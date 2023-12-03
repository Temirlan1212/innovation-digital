import React, { useEffect, useState } from "react";
import moment from "moment";
import "./App.css";
import Timeline from "./components/TimelineV1/Timeline";

const callback = (callback) => callback();

function App() {
  const totalDays = 357;
  let startDate = moment().add(-totalDays, "days");
  let dateRange = [startDate, moment()];
  const [data, setData] = useState({});

  const fetchHeatMapData = async () => {
    try {
      const res = await fetch("data.json");
      const data = await res.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    callback(async () => {
      const data = await fetchHeatMapData();
      if (data != null) setData(data);
    });
  }, []);

  return <Timeline range={dateRange} data={data} />;
}

export default App;
