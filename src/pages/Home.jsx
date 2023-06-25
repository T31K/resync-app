import axios from 'axios';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Bot } from 'lucide-react';

export function Home({ meetingData, setMeetingData }) {
  const { user } = useAuth0();

  useEffect(() => {
    fetchMeetings();
  }, [location?.pathname]);

  async function fetchMeetings() {
    try {
      const res = await axios.post('https://api.getresync.com/meetings', { sub: user.sub });
      console.log(res);
      setMeetingData(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="h-screen p-4 ">
        <div className="flex items-center justify-center flex-col h-[80%]">
          <Bot
            size="150px"
            strokeWidth={'0.8px'}
          />
          <div className="leading-none tracking-tight text-2xl font-medium text-muted-foreground">
            Select a meeting to view
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
