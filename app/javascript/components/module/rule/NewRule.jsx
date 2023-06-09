import React, { useContext, useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import {  
  Button,  
  Box,  
  DataTable,   
  Header,  Heading,  Layer,  
ResponsiveContext,Text, CheckBox,  Form,  FormField,  Select,  TextArea,  TextInput, Tabs, RadioButtonGroup,CheckBoxGroup } from 'grommet';
import { Close, Edit, Trash,Search } from 'grommet-icons';
import QueryBuilder from "./QueryBuilder";

const LayerForm = (props ) => {
const setData = props.setData;
const [loading, setLoading] = useState(false);
const [form_errors, setform_errors] = useState("");
const [mongo_query, setmongo_query] = useState("");
const [categories, setcategories] = useState([]);
const [sub_categories, setsub_categories] = useState([]);

const static_qry = JSON.stringify({"id":"8a8aabb9-0123-4456-b89a-b186c5ad2c95","type":"group"});
const [build_query, setbuild_query] = useState(static_qry);
const [data_cat, setData_cat] = useState([]);
const [data_sub_cat, setData_sub_cat] = useState([]);
const [data_rule_type, setData_rule_type] = useState([]);
const [data_priority, setData_priority] = useState([]);
const [selected_cat, setSelected_cat] = useState('');
const [selected_sub_cat, setSelected_sub_cat] = useState('');
const [selected_rule_type, setSelected_rule_type] = useState('');
const [selected_priority, setSelected_priority] = useState('');
useEffect(() => {
    fetchData();
  }, []);
let csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content")
      const config_settings = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','X-CSRF-Token': csrf  },
          body: JSON.stringify({"id":''})
      };
  const fetchData = () => {
     setLoading(true);
      fetch("/api/get_dynamic_form",config_settings)
      .then((response) => response.json())
      .then((data) => {
        setData_cat(data[0]);
        setData_rule_type(data[1]);
        setData_priority(data[2]);
        setLoading(false);
      });
  };
  const getsubcat = e =>{
  setSelected_cat(e);
  setform_errors('');
  let csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
     const mi_post_settings = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','X-CSRF-Token': csrf  },
        body: JSON.stringify({"category_name":e})
    };
  setLoading(true);
    fetch("/api/get_sub_categorys",mi_post_settings)
      .then((response) => response.json())
      .then((data) => {
        setData_sub_cat(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
}
const onSubmit = ({ value, touched }) => 
  { 
    if(value.rule_name && value.query_string && value.mongo_query)
    {
      setform_errors('');
      let csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
      const post_set = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','X-CSRF-Token': csrf },          
          body: JSON.stringify(value)
      };
    updateData = () => {
      setLoading(true);
      fetch("api/create_rule",post_set)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          props.setOpen(false);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
      };
      updateData();
    }
    else if(!value.rule_name)
    {
      setform_errors('Please provide rule name');
    }
    else if(!value.query_string)
    {
      setform_errors('Please provide query string');
    }
    else if(!value.mongo_query)
    {
      setform_errors('Please Create some rule');
    }
    else
    { 
      setform_errors('Please provide some inputs');      
    }
  };

  return (
    <Box gap="medium">
      <Button alignSelf="end" icon={<Close />} onClick={() => props.setOpen(false)} />
      <Header alignSelf="center" pad={{ horizontal: 'xxsmall' }}>
        <Box >
          <Heading level={4} margin="none" id="layer-title">
            New Rule
          </Heading>
        </Box>
      </Header>
       
      <div direction="row">
      
        <Form validate="blur"  method="post" onSubmit={({ value, touched }) => onSubmit({ value, touched })}  >
        <div direction="row" style={{marginTop: "10px"}}>
          <div className="col-md-12">
            <FormField  label="Rule Name" htmlFor="rule_name" >
              <TextInput id="rule_name" name="rule_name" />
            </FormField>
          </div>

          <div className="col-md-12">
            <FormField  label="Category" htmlFor="category_id" >
              {/*<TextInput id="category_id" name="category_id" />*/}
              <Select
                id="category_id"
                name="category_id"
                placeholder="Select..."
                options={data_cat}
                onChange={({ option }) => getsubcat(option)}
              />
            </FormField>
          </div>

          <div className="col-md-12">
            <FormField label="Sub Category" htmlFor="sub_category_id" >
              <Select
                id="sub_category_id"
                name="sub_category_id"
                placeholder="Select..."
                options={data_sub_cat}
                onChange={({ option }) => setSelected_sub_cat(option)}
              />
            </FormField>
          </div>

          <div className="col-md-12">
            <FormField label="Rule Type" htmlFor="rule_type_id" >
              <Select
                id="rule_type_id"
                name="rule_type_id"
                placeholder="Select..."
                options={data_rule_type}
                onChange={({ option }) => setSelected_rule_type(option)}
              />
            </FormField>
          </div>

          <div className="col-md-12">
            <FormField label="Priority" htmlFor="rule_order_id" >
              <Select
                id="rule_order_id"
                name="rule_order_id"
                placeholder="Select..."
                options={data_priority}
                onChange={({ option }) => setSelected_priority(option)}
              />
            </FormField>
          </div>

          <div className="col-md-12">
            <FormField  label="Query String" htmlFor="query_string" >
              <TextInput id="query_string" name="query_string" />
            </FormField>
          </div>
          
          <TextInput id="mongo_query" type="hidden" name="mongo_query" value={mongo_query}  /> 
          <TextInput id="build_query" type="hidden" name="build_query" value={build_query}  /> 
          <QueryBuilder setmongo_query={setmongo_query} setbuild_query={setbuild_query} />
          
          <div className="col-md-12">
          
            <Box direction="row" gap="small" margin="medium" className=""  >
                <Button label="Create"  secondary type="submit" />
            </Box>
          </div>
        {form_errors &&
          <div className="col-md-12">
              <Box direction="row" align="center" gap="medium" margin="medium" className="mt-3 pt-3"  >
              <span style={{margin: "auto",color: "#F00",}}>{form_errors}</span>
              </Box>
            </div>
            }

        </div>
      </Form>
      </div>
      
      
      </Box>
      
  );
};

LayerForm.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

const NewRule = (props) => {
  const [open, setOpen] = useState(false);
  const size = useContext(ResponsiveContext);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);
  const user = props.user;
  const setData = props.setData;
  return (
    <>
        <Button alignSelf="end" label="Create New Rule" onClick={onOpen} secondary />
      
      {open && (
        <Layer position="right"   full={!['xsmall', 'small'].includes(size) ? 'vertical' : true} onEsc={onClose} >
          <Box fill="vertical" overflow="auto" width={!['xsmall', 'small'].includes(size) ? 'large' : undefined} pad="medium" >
            <LayerForm user={user} setData={setData} setOpen={value => setOpen(value)} />
          </Box>
        </Layer>
      )}
    </>
  );
};

export default NewRule;