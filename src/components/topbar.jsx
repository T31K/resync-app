import { Separator } from './ui/separator';
import { useRef } from 'react';
import { gradients } from '../data/gradients';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Pen } from 'lucide-react';
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
import { X, CheckCircleIcon } from 'lucide-react';

function TopBar({ meetingData, setMeetingData, updateMeeting }) {
  const updateCloseBtn = useRef(null);

  const randomGradient = gradients[meetingData?.name?.charCodeAt(meetingData?.name[6])];

  const handleCopy = async () => {
    const text = meetingData?.link ? `https://app.getresync.app/${meetingData?.link}` : null;
    if (text) {
      try {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
          console.log('Text copied to clipboard');
        }
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const handleChange = async (e) => {
    setMeetingData({ ...meetingData, name: e.target.value });
  };

  const handleSubmit = async () => {
    await updateMeeting();
    if (updateCloseBtn.current) {
      updateCloseBtn.current.click();
    }
  };

  return (
    <div className="h-[150px] relative">
      <div className="h-[150px] w-full overflow-hidden">
        <div
          className="bg-gradient-semi-circle"
          style={{ background: `linear-gradient(to bottom, ${randomGradient?.colors.join(', ')})` }}
        ></div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center  items-center">
        <div className="leading-none flex items-center gap-1.5 tracking-tight font-medium bg-green-100 px-3 py-2 rounded-lg invisible">
          <CheckCircleIcon size="12px" />
          Saved
        </div>
        <AlertDialog>
          <div className="flex border-transparent !focus-visible:outline-none text-primary text-2xl font-semibold tracking-tight items-center leading-none capitalize justify-center gap-2 text-center w-[50%] mx-2s">
            <div className="flex justify-center">{meetingData?.name}</div>
            <div className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 h-[30px] w-[30px] flex items-center justify-center">
              <AlertDialogTrigger>
                <Pen size="15px" />
              </AlertDialogTrigger>
            </div>
          </div>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex items-center justify-between mb-5">
                <AlertDialogTitle>Update title</AlertDialogTitle>
                <AlertDialogCancel
                  className="border-0 absolute right-[4px] top-[5px]"
                  ref={updateCloseBtn}
                >
                  <X size="25px" />
                </AlertDialogCancel>
              </div>
              <AlertDialogDescription>
                <div className="flex gap-2">
                  <Input
                    value={meetingData?.name}
                    onChange={(e) => handleChange(e)}
                  />
                  <Button onClick={handleSubmit}>Update</Button>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogContent>
            <AlertDialogHeader>
              <div className="flex items-center justify-between mb-5">
                <AlertDialogTitle>Share</AlertDialogTitle>
                <AlertDialogCancel className="border-0 absolute right-[4px] top-[5px]">
                  <X size="25px" />
                </AlertDialogCancel>
              </div>
              <AlertDialogDescription>
                <div className="flex gap-2">
                  <Input value={meetingData?.link ? `https://app.getresync.app/${meetingData?.link}` : 'Loading'} />
                  <Button onClick={handleCopy}>Copy</Button>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter></AlertDialogFooter>
          </AlertDialogContent>

          <AlertDialogTrigger>
            <Button>Share</Button>
          </AlertDialogTrigger>
        </AlertDialog>
      </div>
      <Separator className="w-[95%] h-[2px] rounded-lg block mx-auto opacity-[40%]" />
    </div>
  );
}

export default TopBar;
