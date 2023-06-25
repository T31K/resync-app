import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import MDEditor from '@uiw/react-md-editor';
import { useAuth0 } from '@auth0/auth0-react';

function Discuss({ discussData, setDiscussData, updateMeeting }) {
  const { user } = useAuth0();
  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    if (dataChanged) {
      updateMeeting();
      setDataChanged(false);
    }
  }, [dataChanged]);

  const handleSubmit = () => {
    const text = `${discussData?.editor}`;
    const updatedComments = [...discussData.comments, { name: user.name, text: text }];
    setDiscussData({ ...discussData, comments: updatedComments });
    setDataChanged(true);
  };

  return (
    <Card className={cn('w-[750px]')}>
      <CardHeader>
        <CardTitle>Discuss with relevant people</CardTitle>
        <CardDescription>Helpful comments go a long way.</CardDescription>
      </CardHeader>
      <CardContent>
        {discussData?.comments.map((comment, key) => (
          <div
            className={`flex gap-3 mb-8 ${comment?.text?.length == 0 ? 'hidden' : ''}`}
            key={key}
          >
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>{user?.name[0]}</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <div className="text-sm text-muted-foreground mb-2 capitalize">{comment.name}</div>
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
            <AvatarImage src="" />
            <AvatarFallback>{user?.name[0]}</AvatarFallback>
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
        <Button onClick={handleSubmit}>Submit</Button>
      </CardFooter>
    </Card>
  );
}

export default Discuss;
