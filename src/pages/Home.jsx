import axios from 'axios';
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Describe from './Describe';
import Discuss from './Discuss';
import Vote from './Vote';

export function Home() {
  const [meetingData, setMeetingData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3001/new');
        setMeetingData(res.data);
        setIsLoading(false);
        console.log('success');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {!isLoading ? (
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
              describeData={meetingData.describe}
              setDescribeData={(updatedData) =>
                setMeetingData((prevData) => ({
                  ...prevData,
                  describe: updatedData,
                }))
              }
            />
          </TabsContent>
          <TabsContent value="discuss">
            <Discuss
              discussData={meetingData.discuss}
              setDiscussData={(updatedData) =>
                setMeetingData((prevData) => ({
                  ...prevData,
                  discuss: updatedData,
                }))
              }
            />
          </TabsContent>
          <TabsContent value="vote">
            <Vote
              voteData={meetingData.vote}
              setVoteData={(updatedData) =>
                setMeetingData((prevData) => ({
                  ...prevData,
                  vote: updatedData,
                }))
              }
            />
          </TabsContent>
        </Tabs>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
}

export default Home;
