import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddUser from './taskPage/AddUser';
import TaskPage from './taskPage/ViewPage';
import Navbar from './taskPage/Navbar';
import ViewPage from './taskPage/ViewPage';
import DashBoard from './taskPage/DashBoard';
import Card from './taskPage/Cards';
import Speedometer from './taskPage/ProgessBar';
import ProgressBar from './taskPage/ProgessBar';


function App() {
  return (
    <>
      <Router>
        {/* <Navbar /> */}
        
        <Routes>

          <Route path='/' element={<Navigate to={'/adduser'} />} /> 
          <Route path='/adduser' element={<AddUser />} />
          <Route path='/viewpage' element={<ViewPage />} />
          <Route path='/dashboard' element={<DashBoard />} />
          <Route path='/card' element={<Card />} />
          <Route path='/progressbar' element={<ProgressBar />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
