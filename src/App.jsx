import axios from 'axios';
import { Sidebar } from './components/sidebar';

import './styles/styles.scss';

import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

import Home from './pages/Home.jsx';
import Show from './pages/Show.jsx';
import New from './pages/New.jsx';
import Login from './pages/Login.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const { isAuthenticated } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [meetingData, setMeetingData] = useState([]);

  return (
    <Router>
      {isAuthenticated ? (
        <div className="flex w-screen h-screen text-gray-700 overflow-hidden">
          <div className="flex flex-col w-[20rem] !min-w-[20rem] !max-w-[20rem] overflow-hidden border-r">
            <Sidebar meetingData={meetingData} />
          </div>
          <div className=" flex-grow overflow-y-auto">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    isLoading={isLoading}
                    meetingData={meetingData}
                    setIsLoading={setIsLoading}
                    setMeetingData={setMeetingData}
                  />
                }
              />
              <Route
                path="/:id"
                element={
                  <Show
                    isLoading={isLoading}
                    meetingData={meetingData}
                    setIsLoading={setIsLoading}
                    setMeetingData={setMeetingData}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </Router>
  );
}

export default App;
