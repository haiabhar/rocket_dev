import React, { useState,useEffect } from 'react';
import {Box,Data,DataTable,DataFilters,DataSearch,DataSummary,DataTableColumns,Header,Heading,Menu,Page,PageContent,Toolbar,Text,Button,CheckBox} from 'grommet';
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

const [allData, setData] = useState([]);
const [loading, setLoading] = useState(false);
const COLUMNS = [
//{ property: 'id', header: 'ID'},
{ property: 'deed_reference_id', header: 'Incident', render: datum => <ShowIncident user={user} incident_detail={datum} setData={setData} />,size: "40px"},
{ property: 'error_log', header: 'Error Log',render: datum => <Text truncate>{datum.error_log}</Text> ,size: "100px"},
{ property: 'log_timestamp', header: 'Log Timestamp',render: datum => <Text truncate>{new Date(datum.log_timestamp).toUTCString("en-US", {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).split('GMT')[0]}</Text> ,size: "80px"},
{ property: 'service_name', header: 'Service Name',size: "60px" },
{ property: 'level', header: 'Level',size: "40px"},
{ property: 'thread', header: 'Thread',size: "40px"},
{ property: 'message', header: 'Message',render: datum => <Text truncate>{datum.message}</Text>,size: "80px"},
{ property: 'rule', header: 'Rule',size: "40px"},
{ property: 'notification_sent', header: 'Notification', render: datum => <span>{datum.notification_sent == true ? 'Sent' : 'Not Sent'} </span>,size: "60px"},
//{ property: 'action_btn', header: 'Show', render: datum => <ShowIncident user={user} incident_detail={datum} setData={setData} />},
];


// Define data structure for DataTableColumns sorting
const options = COLUMNS.map(({ header, property }) => ({
  property,
  label: header,
}));
  useEffect(() => {
    fetchData();
  }, []);
const fetchData = () => {
  let csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const post_set = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','X-CSRF-Token': csrf }
    };
    setLoading(true);
      fetch("api/get_incident_list",post_set)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });

}

  return (
    <>
    <Data data={allData} flex >  
      <Box overflow="auto" flex>
        <DataTable  columns={COLUMNS}  />
      </Box>
    </Data>
    </>
  );
};