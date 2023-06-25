import axios from 'axios';
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster, toast } from 'sonner';

import Describe from './Describe';
import Discuss from './Discuss';
import Vote from './Vote';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import TopBar from '../components/topbar';

function New() {
  const { user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [meetingData, setMeetingData] = useState({});
  const [firstLoad, setFirstLoad] = useState(true);
  const location = useLocation();

  async function updateMeeting() {
    const id = location?.pathname.slice(1);
    try {
      const res = await axios.put(`http://localhost:3001/meetings/${id}/update`, meetingData);
      console.log(meetingData);
      if (res.status === 200) toast.success('Updated successfully!');
    } catch (error) {
      toast.error('Error, try again');
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
            <div className="flex items-center flex-col ">
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
                      setMeetingData((prevData) => ({
                        ...prevData,
                        describe: updatedData,
                      }))
                    }
                    updateMeeting={updateMeeting}
                  />
                </TabsContent>
                <TabsContent value="discuss">
                  <Discuss
                    discussData={meetingData?.discuss}
                    setDiscussData={(updatedData) =>
                      setMeetingData((prevData) => ({
                        ...prevData,
                        discuss: updatedData,
                      }))
                    }
                    updateMeeting={updateMeeting}
                  />
                </TabsContent>
                <TabsContent value="vote">
                  <Vote
                    voteData={meetingData?.vote}
                    setVoteData={(updatedData) =>
                      setMeetingData((prevData) => ({
                        ...prevData,
                        vote: updatedData,
                      }))
                    }
                    updateMeeting={updateMeeting}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <Toaster position="bottom-left" />
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
}

export default New;
