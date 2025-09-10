import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDate } from "../redux/calendarSlice";
import BarGraphPopup from "./BarGraphPopup";
import dummyData from "../data/dummyData.json";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [view, setView] = useState("month"); // Default view
  const selectedDate = useSelector((state) => state.calendar.selectedDate);

  // Convert dummy data to events
  const events = Object.keys(dummyData).map((dateStr) => ({
    title: "Data Available",
    start: moment(dateStr, "DD-MM-YYYY").toDate(),
    end: moment(dateStr, "DD-MM-YYYY").toDate(),
  }));

  const handleSelectEvent = (event) => {
    const dateKey = moment(event.start).format("DD-MM-YYYY");
    dispatch(setSelectedDate(dateKey));
    setShowPopup(true);
  };

  const handleSelectSlot = (slotInfo) => {
    const dateKey = moment(slotInfo.start).format("DD-MM-YYYY");
    if (dummyData[dateKey]) {
      dispatch(setSelectedDate(dateKey));
      setShowPopup(true);
    } else {
      alert("No data found for the selected date.");
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        view={view}
        onView={(newView) => setView(newView)}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        onRangeChange={(value) => {
          console.log(value, "value line no 60");
        }}
        style={{ height: 600 }}
      />

      {showPopup && (
        <BarGraphPopup
          date={selectedDate}
          data={dummyData[selectedDate]}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default CalendarComponent;
