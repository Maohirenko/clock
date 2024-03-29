import './App.css';
import DigitalClock from './components/digital-clock';
import AnalogueClock from './components/analogue-clock';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header';

function App() {
  return (
    <div className='mainContainer'>
      <Header />
      {/* <Routes>
        <Route path='/d-a' element={<DigitalToAnalogue />} />
        <Route path='/a-d' element={<AnalogueToDigital />} />
        <Route path='time' element={<PresentTime />} />
      </Routes> */}
      <DigitalClock />
      <AnalogueClock />
    </div>
  );
}

export default App;
