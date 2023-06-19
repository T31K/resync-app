import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Describe from './Describe';
import Discuss from './Discuss';
import Vote from './Vote';

export function Home() {
  return (
    <>
      <Tabs
        defaultValue="vote"
        className="w-[800px]"
      >
        <TabsList>
          <TabsTrigger value="describe">Describe </TabsTrigger>
          <TabsTrigger value="discuss">Discuss</TabsTrigger>
          <TabsTrigger value="vote">Vote</TabsTrigger>
        </TabsList>
        <TabsContent value="describe">
          <Describe />
        </TabsContent>
        <TabsContent value="discuss">
          <Discuss />
        </TabsContent>
        <TabsContent value="vote">
          <Vote />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default Home;
