import { LayoutGrid, Library, ListMusic, Mic2, Music, Music2, PlayCircle, Radio, User } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';

import axios from 'axios';

import { cn } from '../lib/utils';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { generateUUID } from '../utils/utils.js';
import { Toaster, toast } from 'sonner';

export function Sidebar({ className }) {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const location = useLocation();
  const [localMeeting, setLocalMeeting] = useState([]);

  useEffect(() => {
    fetchMeetings();
  }, [location?.pathname]);

  async function fetchMeetings() {
    try {
      const res = await axios.post('https://api.getresync.com/meetings', { sub: user.sub });
      setLocalMeeting(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClick = async () => {
    if (localMeeting?.length < 5) {
      try {
        const uuid = await createMeeting();
        navigate(`/${uuid}`);
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error('Limit reached! Upgrade to create more meetings');
    }
  };
  async function createMeeting() {
    const uuid = await generateUUID();
    try {
      const res = await axios.post(`https://api.getresync.com/meetings/new`, { uuid: uuid, sub: user.sub });
      if (res.status === 200) {
        const { uuid } = res.data;
        return uuid;
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2
            className="mb-2 px-2 text-lg font-semibold tracking-tight"
            onClick={() => navigate('/')}
          >
            Meetings
          </h2>
          {localMeeting &&
            Array.isArray(localMeeting) &&
            localMeeting.map((meeting, key) => (
              <div
                className="space-y-1 my-2 "
                key={key}
              >
                <Button
                  size="sm"
                  variant={location?.pathname.slice(1) === meeting?.uuid ? 'secondary' : 'ghost'}
                  className="w-full justify-start capitalize"
                  onClick={() => navigate(`/${meeting?.uuid}`)}
                >
                  {meeting?.name?.substring(0, 30)}
                </Button>
              </div>
            ))}
        </div>
        <Separator className="my-3" />

        <div className="px-4 py-2">
          <div className="space-y-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={handleClick}
            >
              Create new meeting
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
