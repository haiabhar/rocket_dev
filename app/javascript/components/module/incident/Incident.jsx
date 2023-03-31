import React, { useState,useEffect } from 'react';
import {Box,Data,DataTable,DataFilters,DataSearch,DataSummary,DataTableColumns,Header,Heading,Menu,Page,PageContent,Toolbar,Text,Button,CheckBox, Pagination, Spinner, Tab, Tabs} from 'grommet';
import {IncidentList} from "./IncidentList";
import {MyIncidentList} from "./MyIncidentList";
export const Incident = (props) => {
user = props.user;
var roleids  = [];
  if(user)
  {
    roles = user.roles
    if(roles)
    {
    roleids = roles.map(function (rl) { return rl['id']});
    }
  }
const [allData, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [index, setIndex] = useState();
const onActive = nextIndex => setIndex(nextIndex);
 
  return (
    <>
    <Data data={allData} flex >  
      <Box overflow="auto" flex>
    <Tabs activeIndex={index} onActive={onActive} justify="start">
    
      <Tab title="Incident Queue">
      <Box pad="medium">
          
          <IncidentList user={user} />
      </Box>
      </Tab>

      <Tab title="My Incidents">
      <Box pad="medium">
          
          <MyIncidentList user={user} />
      </Box>
      </Tab>
   
    </Tabs>
      </Box>
    </Data>
    </>
  );
};