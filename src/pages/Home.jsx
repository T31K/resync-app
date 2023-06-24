import axios from 'axios';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export function Home({ meetingData, setMeetingData }) {
  const { user } = useAuth0();

  useEffect(() => {
    fetchMeetings();
  }, [location?.pathname]);

  async function fetchMeetings() {
    try {
      const res = await axios.post('http://localhost:3001/meetings', { sub: user.sub });
      setMeetingData(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="flex-grow p-4">
        <div className="flex items-center flex-col"></div>
        <h1>Select a meeting</h1>
      </div>
    </>
  );
}

export default Home;
