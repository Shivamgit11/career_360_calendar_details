import React from 'react';
import CalendarComponent from './components/CalendarComponent';

function App() {
  return (
    <div className="App">
      <h1 style={{
        textAlign: "center"
      }}>Event Analytics Dashboard</h1>
      <CalendarComponent />
    </div>
  );
}

export default App;
