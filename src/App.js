import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from './components/dashboard-component/dashboard-component';
import Services from './components/add-service-component/add-service-component';
import { useState, useEffect} from 'react';
import { encrypt, decrypt } from './common/crypto';

function App() {
  const [defaultUsers, setDefaultusers] = useState([
    {
        id: 1,
        fullname: "Javed Akhtar",
        projectname: "Test Project 1",
        permittype: "Building Permit",
        permitstatus: "Approved",
        paymentstatus: "Paid",
        servicefees: 200
    },
    {
        id: 2,
        fullname: "Atahar Aleem",
        projectname: "Test Project 2",
        permittype: "Mechanical Permit",
        permitstatus: "Approved",
        paymentstatus: "Paid",
        servicefees: 200
    },
    {
        id: 3,
        fullname: "Tahir Hussain",
        projectname: "Test Project 3",
        permittype: "Building Permit",
        permitstatus: "Pending",
        paymentstatus: "unpaid",
        servicefees: "200"
    }
]);

useEffect(() => {
    // if(window.location.pathname !== "/service-request") {
    // }
    encrypt("users", defaultUsers);
}, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Navigate to={`/dashboard`}/>}/>
          <Route path='service-request' exact element={<Services/>}/>
          <Route path='dashboard' exact element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
