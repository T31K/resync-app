import { cn } from '@/lib/utils';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import MDEditor from '@uiw/react-md-editor';

function Discuss() {
  const [value, setValue] = useState('**Hello world!!!**');

  return (
    <Card className={cn('w-[750px]')}>
      <CardHeader>
        <CardTitle>Discuss with relevant people</CardTitle>
        <CardDescription>Helpful comments go a long way.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 my-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="rounded-lg border w-full">
            <MDEditor
              value={value}
              onChange={setValue}
              hideToolbar
              visibleDragbar={false}
              overflow={true}
              preview="preview"
            />
          </div>
        </div>
        <div className="flex gap-3 my-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="rounded-lg border w-full">
            <MDEditor
              value={value}
              onChange={setValue}
              hideToolbar
              visibleDragbar={false}
              overflow={true}
              preview="preview"
            />
          </div>
        </div>
        <div className="flex gap-3 my-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="rounded-lg border w-full">
            <MDEditor
              value={value}
              onChange={setValue}
              hideToolbar
              visibleDragbar={false}
              overflow={true}
              preview="preview"
            />
          </div>
        </div>
        <Separator className="my-5" />
        <div className="flex gap-3 my-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="rounded-lg border border-gray-400 w-full">
            <MDEditor
              value={value}
              onChange={setValue}
              visibleDragbar={false}
              overflow={true}
              preview="preview"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
}

export default Discuss;
