import { cn } from '@/lib/utils';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import MDEditor from '@uiw/react-md-editor';

function Discuss({ discussData, setDiscussData }) {
  return (
    <Card className={cn('w-[750px]')}>
      <CardHeader>
        <CardTitle>Discuss with relevant people</CardTitle>
        <CardDescription>Helpful comments go a long way.</CardDescription>
      </CardHeader>
      <CardContent>
        {discussData?.comments.map((comment, key) => (
          <div
            className="flex gap-3 mb-8"
            key={key}
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <div className="text-sm text-muted-foreground mb-2">{comment.name}</div>
              <div className="rounded-lg border">
                <MDEditor
                  value={comment.text}
                  hideToolbar
                  height={Math.ceil(comment.text.length / 90) * 55}
                  visibleDragbar={false}
                  overflow={true}
                  preview="preview"
                />
              </div>
            </div>
          </div>
        ))}

        <Separator className="my-5" />
        <div className="flex gap-3 my-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="rounded-lg border border-gray-400 w-full">
            <MDEditor
              value={discussData?.editor}
              onChange={(val) => setDiscussData({ ...discussData, editor: val })}
              visibleDragbar={false}
              overflow={true}
              preview="edit"
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
