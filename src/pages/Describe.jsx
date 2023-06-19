import { cn } from '@/lib/utils';
import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import MDEditor from '@uiw/react-md-editor';

function Describe() {
  const [value, setValue] = useState('**Hello world!!!**');

  return (
    <Card className={cn('w-[750px]')}>
      <CardHeader>
        <CardTitle>Describe the problem</CardTitle>
        <CardDescription>Be as clear as concise, use any media if needed.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label
            htmlFor="email"
            className="ml-0.5 mb-1"
          >
            Type of meeting
          </Label>
          <Select>
            <SelectTrigger className="w-[250px] rounded-lg">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Decision Making</SelectItem>
              <SelectItem value="dark">Show & tell (coming soon)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-lg border ">
          <MDEditor
            value={value}
            onChange={setValue}
            visibleDragbar={false}
          />
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
}

export default Describe;
