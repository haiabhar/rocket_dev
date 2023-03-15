import React, { useContext, useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import {  Button,  Box,  DataTable,   Header,  Heading,  Layer,  ResponsiveContext,Text, CheckBox,  Form,  FormField,  Select,  TextArea,  TextInput, Tabs, RadioButtonGroup,CheckBoxGroup } from 'grommet';
import { Close, Edit, Trash,Search } from 'grommet-icons';
import QueryBuilder from "./QueryBuilder";

const LayerForm = (props ) => {
const setData = props.setData;
const [loading, setLoading] = useState(false);
const [form_errors, setform_errors] = useState("");
const [mongo_query, setmongo_query] = useState("");
const static_qry = JSON.stringify({"id":"8a8aabb9-0123-4456-b89a-b186c5ad2c95","type":"group"});
const [build_query, setbuild_query] = useState(static_qry);
useEffect(() => {
    //fetchData();
  }, []);

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