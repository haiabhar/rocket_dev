import React, { useState,useEffect } from 'react';
import {Box,Data,DataTable,DataFilters,DataSearch,DataSummary,DataTableColumns,Header,Heading,Menu,Page,PageContent,Toolbar,Text,Button,CheckBox} from 'grommet';
import SubcategoryForm from "./SubcategoryForm";
import { View } from 'grommet-icons';

export const CategoryShow = (props) => {
user = props.user;
const category_name = props.category_name
let category_id = props.category_id
// alert(category_id)
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
{ property: 'name', header: 'Name' },
{ property: 'is_active', header: 'Status', render: datum =>  datum.is_active == true ? "Active" : "Inactive" },
{ property: 'mdfy_btn', header: 'Modify', render: datum => <SubcategoryForm addedit = 'edit' sub_category_id={datum.id} setData={setData} /> },
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
        body: JSON.stringify({"category_id" : category_id})
    };
    setLoading(true);
      fetch(`api/get_all_sub_categories`,get_set)
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
    <SubcategoryForm addedit="Create New Sub-Category" category_id={category_id} setData={setData} /> 
    <div><h3>{category_name} : Sub-categories</h3></div>
    <Data data={allData} flex >
      <Box overflow="auto" flex>
        <DataTable  columns={COLUMNS} />
      </Box>
    </Data>
    </>
  );
};