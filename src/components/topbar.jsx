import { Separator } from './ui/separator';
import React from 'react';
import { gradients } from '../data/gradients';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

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
import { X } from 'lucide-react';

function TopBar({ name, link }) {
  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

  const handleCopy = async () => {
    const text = link ? `https://app.getresync.app/${link}` : null;
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

  return (
    <div className="h-[150px] relative">
      <div className="h-[150px] w-full overflow-hidden">
        <div
          className="bg-gradient-semi-circle"
          style={{ background: `linear-gradient(to bottom, ${randomGradient.colors.join(', ')})` }}
        ></div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex justify-around items-center">
        <Button className="invisible">Save</Button>
        <div className="text-primary text-3xl font-semibold tracking-tight leading-none capitalize">
          {name?.length < 0 ? 'Loading' : name}
        </div>
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
                  <Input value={link ? `https://app.getresync.app/${link}` : 'Loading'} />
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
