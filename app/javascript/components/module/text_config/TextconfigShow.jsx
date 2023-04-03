import React, { useState,useEffect } from 'react';
import {Box,Data,DataTable,DataFilters,DataSearch,DataSummary,DataTableColumns,Header,Heading,Menu,Page,PageContent,Toolbar,Text,Button,CheckBox} from 'grommet';
import FlexibletextconfigForm from "./FlexibletextconfigForm";
import { View } from 'grommet-icons';

export const TextconfigShow = (props) => {
user = props.user;
const textconfig_name = props.textconfig_name
let textconfig_id = props.textconfig_id
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
{ property: 'id', header: 'ID', render: datum => <span>{datum.id} </span> },
{ property: 'config_type', header: 'Config Type' },
{ property: 'regex_start', header: 'Regex Start' },
{ property: 'regex_end', header: 'Regex End' },
{ property: 'is_active', header: 'Status', render: datum =>  datum.is_active == true ? "Active" : "Inactive" },
{ property: 'mdfy_btn', header: 'Modify', render: datum => <FlexibletextconfigForm addedit = 'edit' flexible_textconfig_id={datum.id} setData={setData} /> },
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
    const get_set = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','X-CSRF-Token': csrf },
        body: JSON.stringify({"textconfig_id" : textconfig_id})
    };
    setLoading(true);
      fetch(`api/get_all_flexible_textconfig`,get_set)
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
    <FlexibletextconfigForm addedit="Create New Flexible-Text Config" textconfig_id={textconfig_id} setData={setData} /> 
    <div><h3>{textconfig_name} : Flexible-Textconfig</h3></div>
    <Data data={allData} flex >
      <Box overflow="auto" flex>
        <DataTable  columns={COLUMNS} />
      </Box>
    </Data>
    </>
  );
};