import React, { useState,useEffect } from 'react';
import {Box,Data,DataTable,DataFilters,DataSearch,DataSummary,DataTableColumns,Header,Heading,Menu,Page,PageContent,Toolbar,Text} from 'grommet';
import EditRule from "./EditRule";
import NewRule from "./NewRule";



export const RulesList = () => {
const [allData, setData] = useState([]);
const [select, setSelect] = useState([]);
const [loading, setLoading] = useState(false);
const COLUMNS = [
{ property: 'name', header: 'Name' },
{ property: 'query_string', header: 'Query String', render: datum => <span className={( datum.updated_at == true ? "row_updated_now" : "")}> {datum.query_string}</span> },
{ property: 'is_active', header: 'Status', render: datum => ( datum.is_active == true ? "Active" : "Inactive") },
{ property: 'action_btn', header: 'Action', render: datum => <EditRule rule_detail={datum} setData={setData} /> },
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
      fetch("api/get_rules_list",post_set)
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
    <NewRule  setData={setData} />
    <Data data={allData} flex >  
      <Box overflow="auto" flex>
        <DataTable  columns={COLUMNS}  />
      </Box>
    </Data>
    </>
  );
};