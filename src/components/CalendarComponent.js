import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedDate } from '../redux/calendarSlice';
import BarGraphPopup from './BarGraphPopup';
import dummyData from '../data/dummyData.json';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const selectedDate = useSelector((state) => state.calendar.selectedDate);

  const events = Object.keys(dummyData).map((dateStr) => ({
    title: 'Data Available',
    start: moment(dateStr, 'DD-MM-YYYY').toDate(),
    end: moment(dateStr, 'DD-MM-YYYY').toDate(),
  }));

  const handleSelectEvent = (event) => {
    const dateKey = moment(event.start).format('DD-MM-YYYY');
    dispatch(setSelectedDate(dateKey));
    setShowPopup(true);
  };

  const handleSelectSlot = (slotInfo) => {
    const dateKey = moment(slotInfo.start).format('DD-MM-YYYY');
    if (dummyData[dateKey]) {
      dispatch(setSelectedDate(dateKey));
      setShowPopup(true);
    } else {
      alert('No data found for the selected date.');
    }
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        style={{ height: 600, margin: '50px' }}
      />
      
      {showPopup && <BarGraphPopup date={selectedDate} data={dummyData[selectedDate]} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default CalendarComponent;
