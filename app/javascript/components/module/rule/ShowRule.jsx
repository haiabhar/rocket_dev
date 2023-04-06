import React, { useContext, useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import {  Button,  Box,  DataTable,   Header,  Heading,  Layer,  ResponsiveContext,Text, CheckBox,  Form,  FormField,  Select,  TextArea,  TextInput, Tabs, RadioButtonGroup,CheckBoxGroup } from 'grommet';
import { Close, View, Trash,Search } from 'grommet-icons';
import QueryBuilder from "./QueryBuilder";
const LayerForm = (props ) => {
const setData = props.setData;
const [loading, setLoading] = useState(false);
const [form_errors, setform_errors] = useState("");
const [rule_data, setruleData] = useState(props.rule_detail);
const [mongo_query, setmongo_query] = useState(props.rule_detail.mongo_query);
const [build_query, setbuild_query] = useState(props.rule_detail.build_query);
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
  let csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
      const config_settings = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','X-CSRF-Token': csrf  },
          body: JSON.stringify({"id":rule_data.id})
      };
  const fetchData = () => {
     setLoading(true);
      fetch("/api/get_dynamic_form",config_settings)
      .then((response) => response.json())
      .then((data) => {
        setData_cat(data[0]);
        setData_rule_type(data[1]);
        setData_priority(data[2]);
        setData_sub_cat(data[3]);
        setSelected_cat(data[4]);
        setSelected_sub_cat(data[5]);
        setSelected_rule_type(data[6]);
        setSelected_priority(data[7]);
        setLoading(false);
      });
  };


  return (
    <Box gap="medium">
      <Button alignSelf="end" icon={<Close />} onClick={() => props.setOpen(false)} />
      <Header alignSelf="center" pad={{ horizontal: 'xxsmall' }}>
        <Box >
          <Heading level={4} margin="none" id="layer-title">
             Rule
          </Heading>
        </Box>
      </Header>
       
      <div direction="row">
      
       
        <TextInput id="rule_id" type="hidden" name="rule_id" value={rule_data.id}  /> 
        <div direction="row" style={{marginTop: "10px"}}>
          <div className="col-md-12">
            <FormField  label="Rule Name" htmlFor="rule_name" >
              <TextInput id="name" name="name" value={rule_data.name} readonly/>
            </FormField>
          </div>

         <div className="col-md-12">
            <FormField  label="Category" htmlFor="category_id" >
              <TextInput id="category_id" name="category_id" value={selected_cat!='' ? selected_cat : ''} readonly/>
            </FormField>
          </div>

          <div className="col-md-12">
            <FormField label="Sub Category" htmlFor="sub_category_id" >
              <TextInput id="sub_category_id" name="sub_category_id" value={selected_sub_cat!='' ? selected_sub_cat : ''} readonly/>
            </FormField>
          </div>

          <div className="col-md-12">
            <FormField label="Rule Type" htmlFor="rule_type_id" >
              <TextInput id="rule_type_id" name="rule_type_id" value={selected_rule_type!='' ? selected_rule_type : ''} readonly/>
            </FormField>
          </div>

          <div className="col-md-12">
            <FormField label="Priority" htmlFor="rule_order_id" >
              <TextInput id="rule_order_id" name="rule_order_id" value={selected_priority!='' ? selected_priority : ''} readonly/>
            </FormField>
          </div>
          
          <div className="col-md-12">
            <FormField  label="Query String" htmlFor="query_string" >
              <TextInput id="query_string" name="query_string" value={rule_data.query_string} readonly/>
            </FormField>
          </div>
          <TextInput id="mongo_query" type="hidden" name="mongo_query" value={mongo_query}  readonly/> 
          <TextInput id="build_query" type="hidden" name="build_query" value={build_query}  readonly/> 
          <div style={{pointerEvents: "none"}}>
          <QueryBuilder setmongo_query={setmongo_query} setbuild_query={setbuild_query} build_query={rule_data.build_query} />
          </div>

        </div>

      </div>
      
      
      </Box>
      
  );
};

LayerForm.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

const ShowRule = (props) => {
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
  const [open, setOpen] = useState(false);
  const size = useContext(ResponsiveContext);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);
  const rule_detail = props.rule_detail;
  const setData = props.setData;
  return (
    <>
    { (roleids.includes(1) || roleids.includes(3) || rule_detail.created_by == user.id) ? 
        <Button alignSelf="center" icon={<View />} onClick={onOpen} secondary /> : <Button alignSelf="center" icon={<View />} secondary readonly />
     } 
      {open && (
        <Layer position="right"   full={!['xsmall', 'small'].includes(size) ? 'vertical' : true} onEsc={onClose} >
          <Box fill="vertical" overflow="auto" width={!['xsmall', 'small'].includes(size) ? 'large' : undefined} pad="medium" >
            <LayerForm rule_detail={rule_detail} setData={setData} user={user} setOpen={value => setOpen(value)} />
          </Box>
        </Layer>
      )}
    </>
  );
};

export default ShowRule;