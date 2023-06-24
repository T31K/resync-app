import axios from 'axios';
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Describe from './Describe';
import Discuss from './Discuss';
import Vote from './Vote';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import TopBar from '../components/topbar';
function Show() {
  const { isAuthenticated, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [meetingData, setMeetingData] = useState({});
  const location = useLocation();

  useEffect(() => {
    fetchMeeting(location?.pathname.slice(1));
  }, [location?.pathname]);

  async function fetchMeeting(id) {
    try {
      const res = await axios.get(`http://localhost:3001/meetings/${id}`);
      setMeetingData(res.data);
      console.log(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {!isLoading ? (
        <>
          <TopBar
            name={meetingData?.name}
            link={meetingData?.uuid}
          />
          <div className="flex-grow p-4">
            <div className="flex items-center flex-col">
              <Tabs
                defaultValue="describe"
                className="w-[800px]"
              >
                <TabsList>
                  <TabsTrigger value="describe">Describe </TabsTrigger>
                  <TabsTrigger value="discuss">Discuss</TabsTrigger>
                  <TabsTrigger value="vote">Vote</TabsTrigger>
                </TabsList>
                <TabsContent value="describe">
                  <Describe
                    describeData={meetingData?.describe}
                    setDescribeData={(updatedData) =>
                      setMeetingData((prevData) => {
                        const newData = [...prevData];
                        newData.describe = updatedData;
                        return newData;
                      })
                    }
                  />
                </TabsContent>
                <TabsContent value="discuss">
                  <Discuss
                    discussData={meetingData?.discuss}
                    setDiscussData={(updatedData) =>
                      setMeetingData((prevData) => {
                        const newData = [...prevData];
                        newData.discuss = updatedData;
                        return newData;
                      })
                    }
                  />
                </TabsContent>
                <TabsContent value="vote">
                  <Vote
                    voteData={meetingData?.vote}
                    setVoteData={(updatedData) =>
                      setMeetingData((prevData) => {
                        const newData = [...prevData];
                        newData.vote = updatedData;
                        return newData;
                      })
                    }
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
}

export default Show;