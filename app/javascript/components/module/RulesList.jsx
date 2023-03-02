import React, { useState } from 'react';
import {
  Box,
  Data,
  DataTable,
  DataFilters,
  DataSearch,
  DataSummary,
  DataTableColumns,
  Header,
  Heading,
  Menu,
  Page,
  PageContent,
  Toolbar,
} from 'grommet';

const COLUMNS = [
  { property: 'name', header: 'Name' },
  { property: 'location', header: 'Location' },
  { property: 'status', header: 'Status' },
];

const allData = [
  {
    location: 'San Jose, CA',
    name: 'Eric Soderberg',
    status: 'Online',
  },
  {
    location: 'San Jose, CA',
    name: 'Taylor Seamans',
    status: 'Online',
  },
  {
    location: 'San Jose, CA',
    name: 'Taylor Seamans',
    status: 'Online',
  },
  {
    location: 'Fort Collins, CO',
    name: 'Matthew Glissmann',
    status: 'Offline',
  },
  {
    location: 'Fort Collins, CO',
    name: 'Greg Furuiye',
    status: 'Online',
  },
  {
    location: 'San Jose, CA',
    name: 'Vicky Avalos',
    status: 'Offline',
  },
  {
    location: 'Fort Collins, CO',
    name: 'Shimi Yacobi',
    status: 'Online',
  },
];

// Define data structure for DataTableColumns sorting
const options = COLUMNS.map(({ header, property }) => ({
  property,
  label: header,
}));



export const RulesList = () => {
  const [select, setSelect] = useState([]);
  return (
    <Data data={allData} flex >  
      <Box overflow="auto" flex>
        <DataTable  columns={COLUMNS}  />
      </Box>
    </Data>
  );
};