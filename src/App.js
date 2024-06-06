import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/header';
import AnalogueAdjustmentComponent from './pages/AnalogueAdjustment/index';
import DigitalAdjustmentComponent from './pages/DigitalAdjustment/index';
import FreeUseComponent from './pages/FreeUse/index';
import { Helmet } from 'react-helmet-async';
import Footer from './components/footer';

function App() {
  return (
    <div className='mainContainer'>
      <Helmet>
        <title>Learning analogue clock</title>
        <meta name="viewport" content="initial-scale=1, viewport-fit=cover"></meta>
      </Helmet>
      <Header />
      <Routes>
        <Route path="/clock">
          <Route index element={<Navigate to="/clock/digital" replace />} />
          <Route path='/clock/digital' element={<DigitalAdjustmentComponent />} />
          <Route path='/clock/analogue' element={<AnalogueAdjustmentComponent />} />
          <Route path='/clock/time' element={<FreeUseComponent />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
