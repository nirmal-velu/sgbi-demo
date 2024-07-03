import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddUser from './taskPage/AddUser';
import TaskPage from './taskPage/ViewPage';
import Navbar from './taskPage/Navbar';
import ViewPage from './taskPage/ViewPage';

function App() {
  return (
    <>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={<AddUser />} />
          <Route path='/viewpage' element={<ViewPage />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
