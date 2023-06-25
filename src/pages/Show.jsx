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
function Show() {
  const { isAuthenticated, user } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const [meetingData, setMeetingData] = useState({});
  const location = useLocation();

  useEffect(() => {
    if (location?.pathname) {
      fetchMeeting(location?.pathname.slice(1));
    }
    console.log(location.pathname);
  }, [location]);

  async function fetchMeeting(id) {
    try {
      const res = await axios.get(`https://api.getresync.com/meetings/${id}`);
      console.log(res.data);
      if (res.status === 200) {
        if (!res.data.discuss) {
          res.data.discuss.editor = ' ';
          res.data.discuss.comments = [{ name: '', text: '' }];
        }

        if (!res.data.vote) {
          res.data.vote.editor.title = '';
          res.data.vote.editor.value = '';
          res.data.vote.editor.subtitle = '';
          res.data.vote.options = [{ subs: [], title: ' ', value: '', subtitle: '' }];
        }
        setMeetingData(res.data);
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function updateMeeting() {
    const id = location?.pathname.slice(1);
    try {
      const res = await axios.put(`https://api.getresync.com/meetings/${id}/update`, meetingData);
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
            meetingData={meetingData}
            setMeetingData={setMeetingData}
            updateMeeting={updateMeeting}
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

export default Show;
