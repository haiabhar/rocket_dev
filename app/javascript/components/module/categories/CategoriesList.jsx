import React, { useState,useEffect } from 'react';
import {Box,Data,DataTable,DataFilters,DataSearch,DataSummary,DataTableColumns,Header,Heading,Menu,Page,PageContent,Toolbar,Text,Button,CheckBox} from 'grommet';
import CategoryForm from "./CategoryForm";
import {CategoryShow} from "./CategoryShow";
import { View } from 'grommet-icons';

export const CategoriesList = (props) => {
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

const show_sub_cat = (category_id,category_name) => {
	setCategory_show(true);
	setCategory_show_id(category_id);
  setCategory_show_name(category_name);
}
const [allData, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [category_show, setCategory_show] = useState(false);
const [category_show_id, setCategory_show_id] = useState(0);
const [category_show_name, setCategory_show_name] = useState(0);
const COLUMNS = [
{ property: 'id', header: 'ID', render: datum => <span>{datum.id} </span> },
{ property: 'name', header: 'Name' },
{ property: 'is_active', header: 'Status', render: datum =>  datum.is_active == true ? "Active" : "Inactive" },
{ property: 'show_btn', header: 'Show', render: datum => <Button alignSelf="start"  secondary icon={<View />} onClick={(e) => show_sub_cat(datum.id,datum.name)} /> },
{ property: 'mdfy_btn', header: 'Modify', render: datum => <CategoryForm addedit = 'edit' category_id={datum.id} setData={setData} /> },
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
      fetch("api/get_all_categories",get_set)
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
    { category_show == false && 
	    <>
	    { (roleids.includes(1) || roleids.includes(3) ) && <CategoryForm addedit="Create New Category"  setData={setData} /> }
	    <Data data={allData} flex >
	      <Box overflow="auto" flex>
	        <DataTable  columns={COLUMNS} />
	      </Box>
	    </Data>
	    </>
	}
	{ category_show == true && 
		<>
		<CategoryShow category_id ={category_show_id} category_name={category_show_name}  />
		</>
	}

    </>
  );
};