import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import {Box,Data,DataTable,DataFilters,DataSearch,DataSummary,DataTableColumns,Header,Heading,Menu,Page,PageContent,Toolbar,Text,Button,CheckBox, Pagination, Spinner, Tab, Tabs, Keyboard, TextInput} from 'grommet';
import {  Chat,  Hpe,  Notification,  Search as SearchIcon,  User, FormClose, } from 'grommet-icons';
import ShowIncident from "./ShowIncident";
export const IncidentList = (props) => {
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

const [total_count, setTotal_count] = useState(0);
const [total_pages, setTotal_pages] = useState(0);
const [current_page, setCurrent_page] = useState(1);
const [limit_value, setLimit_value] = useState(25);
const [allData, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [search_val, setSearch_val] = useState(0);
const StyledTextInput = styled(TextInput).attrs(() => ({
  'aria-labelledby': 'search-complex-example',
}))``;
const handleEntered = (e)=> 
{ 
  if(e.key == 'Enter'){
    e.preventDefault();
  setSearch_val(e.target.value);
    }
};
const handleclicksearch = (e)=> 
{ 
  if(e.target.value.length)
  {
  setSearch_val(e.target.value);
  }
};
const columns = [
  {
    property: 'error_log',
    header: 'Error Log',
    render: datum => <Text truncate>{datum.error_log}</Text>,
    primary: true,
    size: "140px"
  },
  {
    property: 'log_timestamp',
    header: 'Log Timestamp',
    render: datum => <Text truncate>{new Date(datum.log_timestamp).toUTCString("en-US", {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).split('GMT')[0]}</Text>,
    primary: true,
    size: "80px"
  },
  {
    property: 'service_name',
    header: 'Service Name',
    render: datum => <Text truncate>{datum.service_name}</Text>,
    primary: true,
    size: "60px"
  },
  {
    property: 'level',
    header: 'Level',
    render: datum => <Text truncate>{datum.level}</Text>,
    sortable: false,
    size: "30px"
  },
  {
    property: 'thread',
    header: 'Thread',
    //units: 'TiB',
    render: datum => <Text truncate>{datum.thread}</Text>,
    //align: 'end',
    size: "40px"
  },
  {
    property: 'message',
    header: 'Message',
    //units: 'TiB',
    render: datum => <Text truncate>{datum.message}</Text>,
    //align: 'end',
    size: "100px"
  },
  {
    property: 'rule',
    header: 'Rule',
    //units: 'TiB',
    render: datum => <Text truncate>{datum.rule}</Text>,
    //align: 'end',
    size: "60px"
  },
  {
    property: 'notification_sent',
    header: 'Notification',
    //units: 'TiB',
    render: datum => <Text truncate>{datum.notification_sent == true ? 'Sent' : 'Not Sent'}</Text>,
    //align: 'end',
    size: "60px"
  },

    
];
const headers = [

{
  label: "Incident",
  key: "deed_reference_id"
},
{
  label: "Error Log",
  key: "error_log"
},
{
  label: "Timestamp",
  key: "log_timestamp"
},
{
  label: "Service Name",
  key: "service_name"
},
{
  label: "Level",
  key: "level"
},
{
  label: "Thread",
  key: "thread"
},
{
  label: "Message",
  key: "message"
},
{
  label: "Rule",
  key: "rule"
},
{
  label: "Notification",
  key: "notification_sent"
}


];
const pass_val = [];
pass_val[0] = 1;
pass_val[1] = search_val;
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
//console.log(search_val);
    fetchData();
}, [search_val, setSearch_val]);
const fetchData = () => {
  let csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const post_set = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','X-CSRF-Token': csrf },
        body: JSON.stringify(pass_val)
    };
    setLoading(true);
      fetch("api/get_incident_list",post_set)
        .then((response) => response.json())
        .then((data) => {
          
          setData(data["incidents"]);
          setTotal_pages(data["total_pages"]);
          setCurrent_page(data["current_page"]);
          setLimit_value(data["limit_value"]);
          setTotal_count(data["total_count"]);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });

}
const pagination_submit  = ({ page, startIndex, endIndex }) => 
  {
    pass_val[0] = page;
    fetchData();
  } 
  return (
    <>
        <div className="pull-right">
        <Box background="background-contrast" round="small" width="medium" style={{float: "right"}}>
        <Keyboard>
        <StyledTextInput icon={<SearchIcon  id="search-complex-example"  />} dropHeight="small" placeholder="Search"
          onKeyPress={handleEntered} onClick={handleclicksearch} plain reverse />
        </Keyboard>
        </Box>
        </div>
    <Data data={allData} flex >  
      <Box overflow="auto" flex>
        <DataTable
          aria-describedby="storage-pools-heading"
          data={allData}
          columns={[
            {
              property: 'deed_reference_id',
              header: 'Incident',
              primary: true,
              render: datum => <ShowIncident user={user} incident_detail={datum} fetchData={fetchData} />,
              size: "40px"
            },
            ...columns,
          ]}
          
        />
        <Pagination onChange={({ page, startIndex, endIndex }) => pagination_submit({ page, startIndex, endIndex })} numberItems={total_count} step={limit_value} page={current_page} margin="medium" align="end" />
      </Box>
    </Data>
    </>
  );
};