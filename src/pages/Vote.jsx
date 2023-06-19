import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

function Vote() {
  const data = [
    {
      name: 'Jan',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Feb',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Mar',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Apr',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'May',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Jun',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Jul',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Aug',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Sep',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Oct',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Nov',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Dec',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
  ];

  return (
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
            <Card className="w-full my-">
              <CardHeader className="flex flex-row items-center gap-8 pt-1.5 pb-3 px-8">
                <Checkbox id="terms1" />
                <div>
                  <CardTitle className="text-lg my-0">Create project</CardTitle>
                  <CardDescription className="!my-0">Deploy your new project in one-click.</CardDescription>
                </div>
              </CardHeader>
            </Card>
            <Card className="w-full my-3">
              <CardHeader className="flex flex-row items-center gap-8 pt-1.5 pb-3 px-8">
                <Checkbox id="terms1" />
                <div>
                  <CardTitle className="text-lg my-0">Create project</CardTitle>
                  <CardDescription className="!my-0">Deploy your new project in one-click.</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </TabsContent>
          <TabsContent
            value="chart"
            className="py-6"
          >
            <ResponsiveContainer
              width="100%"
              height={350}
            >
              <BarChart data={data}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
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
            <Checkbox id="terms1" />
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
  );
}

export default Vote;
