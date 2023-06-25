import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect, useRef } from 'react';

function Vote({ voteData, setVoteData, updateMeeting }) {
  const { user } = useAuth0();

  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    if (dataChanged) {
      updateMeeting();
      setDataChanged(false);
    }
  }, [dataChanged]);

  const handleVote = (key) => {
    const updatedOptions = voteData.options.map((option) => ({
      ...option,
      subs: option.subs.filter((sub) => sub !== user.sub),
    }));
    updatedOptions[key].subs.push(user.sub);
    setVoteData({ ...voteData, options: updatedOptions });
    setDataChanged(true);
  };

  const processData = () => {
    const newData = voteData?.options.map((option) => ({
      title: option.title,
      total: option.subs.length,
    }));

    return newData;
  };

  const handleAdd = () => {
    if (titleInputRef.current.value == '') {
      toast.error("Title can't be empty");
      return;
    }
    const newOption = {
      title: titleInputRef.current.value,
      subtitle: subtitleInputRef.current.value,
      value: titleInputRef.current.value,
      subs: [],
    };
    const updatedOptions = [...voteData.options, newOption];
    setVoteData({ ...voteData, options: updatedOptions });
    setDataChanged(true);
  };

  const titleInputRef = useRef(null);
  const subtitleInputRef = useRef(null);

  return (
    <>
      <Card className={cn('w-[750px]')}>
        <CardHeader>
          <CardTitle>Make a decision</CardTitle>
          <CardDescription>Diplomatic wins!</CardDescription>
        </CardHeader>
        <CardContent className="">
          <Tabs defaultValue="vote">
            <TabsList>
              <TabsTrigger value="vote">Vote </TabsTrigger>
              <TabsTrigger value="chart">Results</TabsTrigger>
            </TabsList>
            <TabsContent
              value="vote"
              className="py-6"
            >
              <RadioGroup defaultValue="option-one">
                {voteData?.options?.map((option, key) => (
                  <Card
                    className={`w-full hover:border-gray-400 hover:cursor-pointer ${
                      option.subs.includes(user.sub) ? 'bg-gray-100' : ''
                    }
                    ${option.title == '' ? 'hidden' : ''}
                    `}
                    key={key}
                    onClick={() => handleVote(key)}
                  >
                    <CardHeader className="flex flex-row items-center justify-between gap-8 pt-2.5 pb-3 px-8">
                      <div className="flex items-center gap-8">
                        <RadioGroupItem
                          value={option.value}
                          id="option-one"
                          className="invisible"
                        />
                        <div>
                          <CardTitle className="text-lg my-0">{option?.title} </CardTitle>
                          <CardDescription className="!my-0">{option?.subtitle}</CardDescription>
                        </div>
                      </div>
                      <div className="px-3 py-2 gap-1.5 bg-green-50 rounded-lg flex items-center justify-center hover:cursor-default font-medium leading-none tracking-tight">
                        {option?.subs.length + ' vote(s)'}
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </RadioGroup>
            </TabsContent>
            <TabsContent
              value="chart"
              className="py-6"
            >
              <ResponsiveContainer
                width="100%"
                height={350}
              >
                <BarChart data={processData()}>
                  <XAxis
                    dataKey="title"
                    stroke="#888888"
                    fontSize={12}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                  />
                  <Bar
                    dataKey="total"
                    fill="#adfa1d"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardContent className="w-full">
          <Separator className="my-5" />
          <CardTitle className="text-lg">Add a vote</CardTitle>
          <div className="flex gap-3">
            <Input
              type="title"
              id="title"
              placeholder="Title"
              className="w-[250px]"
              ref={titleInputRef}
            />
            <Input
              type="subtitle"
              id="subtitle"
              placeholder="Subtitle"
              className="w-[250px]"
              ref={subtitleInputRef}
            />
            <Button
              asChild
              onClick={handleAdd}
            >
              Add
            </Button>
          </div>
          <div className="flex justify-end"></div>
        </CardContent>
      </Card>
    </>
  );
}

export default Vote;
