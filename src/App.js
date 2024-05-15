import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/header';
import AnalogueAdjustmentComponent from './pages/AnalogueAdjustment/index';
import DigitalAdjustmentComponent from './pages/DigitalAdjustment/index';
import CurrentTimeComponent from './pages/CurrentTime/index';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

function App() {
  const { t } = useTranslation();
  return (
    <div className='mainContainer'>
                  <Helmet>
                <title>Learning analogue clock</title>
                <meta name="viewport" content="initial-scale=1, viewport-fit=cover"></meta>
            </Helmet>
      <Header />
      <Routes>
        {/* <Route path='/'/> */}
        <Route path="/">
          <Route index element={<Navigate to="/digital" replace />} />
          <Route path='/digital' element={<DigitalAdjustmentComponent />} />
          <Route path='/analogue' element={<AnalogueAdjustmentComponent />} />
          <Route path='/time' element={<CurrentTimeComponent/>} />
        </Route>
        {/* <Route path='/time' element={<PresentTime />} /> */}
        {/* <Redirect to='/analogue'/> */}
      </Routes>
    </div>
  );
}

export default App;
