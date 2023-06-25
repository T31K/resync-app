import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
} from '@/components/ui/alert-dialog';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';

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

  return (
    <>
      <TooltipProvider>
        <AlertDialog>
          <Card className={cn('w-[750px]')}>
            <CardHeader>
              <CardTitle>Make a decision</CardTitle>
              <CardDescription>Diplomatic wins!</CardDescription>
            </CardHeader>
            <CardContent className="">
              <Tabs defaultValue="vote">
                <TabsList>
                  <TabsTrigger value="vote">Vote </TabsTrigger>
                  <Tooltip>
                    <TooltipTrigger>
                      <TabsTrigger value="chart">Results</TabsTrigger>
                    </TooltipTrigger>
                    <TooltipContent className="text-muted-foreground">
                      <p>Coming Soon</p>
                    </TooltipContent>
                  </Tooltip>
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
                        }`}
                        key={key}
                        onClick={() => handleVote(key)}
                      >
                        {/* {option.subs.includes(user.sub) ? 'yes' : 'no'} */}
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
                          {/* <AlertDialogTrigger>
                            <Trash2 className="w-[30px] h-[30px] bg-gray-100 hover:bg-gray-200 hover:text-red-500 p-2 rounded-lg" />
                          </AlertDialogTrigger> */}
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
            <CardContent>
              <Separator className="my-5" />
              <CardTitle className="text-lg">Add a vote</CardTitle>

              <Card className="w-full my-3">
                <CardHeader className="flex flex-row items-center gap-8 pt-1.5 pb-3 px-8">
                  <Checkbox
                    id="terms1"
                    className="invisible"
                  />
                  <div>
                    <CardTitle className="text-lg my-0">Create project</CardTitle>
                    <CardDescription className="!my-0">Deploy your new project in one-click.</CardDescription>
                  </div>
                </CardHeader>
              </Card>
              <div className="flex justify-end">
                <Button>Add</Button>
              </div>
            </CardContent>
          </Card>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive">Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TooltipProvider>
    </>
  );
}

export default Vote;
