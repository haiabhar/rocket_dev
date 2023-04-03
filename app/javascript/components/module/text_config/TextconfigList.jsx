import React, { useState,useEffect } from 'react';
import {Box,Data,DataTable,DataFilters,DataSearch,DataSummary,DataTableColumns,Header,Heading,Menu,Page,PageContent,Toolbar,Text,Button,CheckBox} from 'grommet';
import TextconfigForm from "./TextconfigForm";
import {TextconfigShow} from "./TextconfigShow";
import { View } from 'grommet-icons';

export const TextconfigList = (props) => {
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

const show_sub_cat = (textconfig_id,textconfig_name) => {
	setTextconfig_show(true);
	setTextconfig_show_id(textconfig_id);
  setTextconfig_show_name(textconfig_name);
}
const [allData, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [textconfig_show, setTextconfig_show] = useState(false);
const [textconfig_show_id, setTextconfig_show_id] = useState(0);
const [textconfig_show_name, setTextconfig_show_name] = useState(0);
const COLUMNS = [
{ property: 'id', header: 'ID', render: datum => <span>{datum.id} </span> },
{ property: 'name', header: 'Name' },
{ property: 'is_active', header: 'Status', render: datum =>  datum.is_active == true ? "Active" : "Inactive" },
{ property: 'show_btn', header: 'Show', render: datum => <Button alignSelf="start"  secondary icon={<View />} onClick={(e) => show_sub_cat(datum.id,datum.name)} /> },
{ property: 'mdfy_btn', header: 'Modify', render: datum => <TextconfigForm addedit = 'edit' textconfig_id={datum.id} setData={setData} /> },
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
        method: 'GET',
        headers: { 'Content-Type': 'application/json','X-CSRF-Token': csrf }
    };
    setLoading(true);
      fetch("api/get_all_textconfig",get_set)
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
    { textconfig_show == false && 
	    <>
	    { (roleids.includes(1) || roleids.includes(3) ) && <TextconfigForm addedit="Create New Text Config"  setData={setData} /> }
	    <Data data={allData} flex >
	      <Box overflow="auto" flex>
	        <DataTable  columns={COLUMNS} />
	      </Box>
	    </Data>
	    </>
	}
	{ textconfig_show == true && 
		<>
		<TextconfigShow textconfig_id ={textconfig_show_id} textconfig_name={textconfig_show_name}  />
		</>
	}

    </>
  );
};