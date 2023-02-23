import React, { useContext , useState} from 'react';
import { Paragraph, Tab, Tabs,Box} from 'grommet';
import {  History } from 'grommet-icons';

const SideBar = (props) => {
  const [index, setIndex] = useState();
  const onActive = nextIndex => setIndex(nextIndex);

  return (
      <Tabs activeIndex={index} onActive={onActive} justify="start">
      <Tab title="Sources">
      <Box pad="medium">1</Box>
      </Tab>
      <Tab title="Rules">
      <Box pad="medium">2</Box>
      </Tab>
      <Tab title="Reports">
      <Box pad="medium">3</Box>
      </Tab>
    </Tabs>
  );
};

export default SideBar