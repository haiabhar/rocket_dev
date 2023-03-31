import React, { useState,useEffect } from 'react';
import {Box,Data,DataTable,DataFilters,DataSearch,DataSummary,DataTableColumns,Header,Heading,Menu,Page,PageContent,Toolbar,Text,Button,CheckBox} from 'grommet';
import RuletypeForm from "./RuletypeForm";

export const RuletypesList = (props) => {
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
const [select, setSelect] = useState([]);
const [loading, setLoading] = useState(false);
const COLUMNS = [
{ property: 'id', header: 'ID', render: datum => <span>RT00{datum.id} </span> },
{ property: 'name', header: 'Name' },
{ property: 'is_active', header: 'Status', render: datum => (roleids.includes(1) || roleids.includes(3) ) ? <CheckBox  checked={datum.is_active} toggle label={datum.is_active == true ? "Active" : "Inactive"}  onChange={(event) => setChecked(event.target.checked, datum.id)} /> :  datum.is_active == true ? "Active" : "Inactive" },
{ property: 'mdfy_btn', header: 'Modify', render: datum => <RuletypeForm user={user} rule_type_id={datum.id} rule_detail={datum} addedit="Edit" setData={setData} /> },
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
        method: 'POST',
        headers: { 'Content-Type': 'application/json','X-CSRF-Token': csrf }
    };
    setLoading(true);
      fetch("api/get_rule_types_list",post_set)
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
const setChecked = (status,rid) =>
{
  let csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const post_set = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','X-CSRF-Token': csrf },
        body: JSON.stringify({rule_type_id: rid, status: status})
    };
    setLoading(true);
      fetch("api/update_rule_type_status",post_set)
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
    { (roleids.includes(1) || roleids.includes(3) ) &&  <RuletypeForm addedit="Create New Rule Type" setData={setData} /> }
    <Data data={allData} flex >  
      <Box overflow="auto" flex>
        <DataTable  columns={COLUMNS}  />
      </Box>
    </Data>
    </>
  );
};