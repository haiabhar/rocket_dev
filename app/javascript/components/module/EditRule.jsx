import React, { useContext, useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import {  Button,  Box,  DataTable,   Header,  Heading,  Layer,  ResponsiveContext,Text, CheckBox,  Form,  FormField,  Select,  TextArea,  TextInput, Tabs, RadioButtonGroup,CheckBoxGroup } from 'grommet';
import { Close, Edit, Trash,Search } from 'grommet-icons';
import QueryBuilder from "./QueryBuilder";
const LayerForm = (props ) => {
const setData = props.setData;
const [loading, setLoading] = useState(false);
const [form_errors, setform_errors] = useState("");
const [rule_data, setruleData] = useState(props.rule_detail);

const [mongo_query, setmongo_query] = useState();
const [build_query, setbuild_query] = useState();
useEffect(() => {
    //fetchData();
  }, []);

const onSubmit = ({ value, touched }) => 
  { 
    if(value.name && value.query_string && value.mongo_query)
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
      fetch("api/update_rule",post_set)
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setmongo_query(data.mongo_query);
          setbuild_query(data.build_query);
          props.setOpen(false);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
      };
      updateData();
    }
    else if(!value.name)
    {
      setform_errors('Please provide rule name');
    }
    else if(!value.query_string)
    {
      setform_errors('Please provide query string');
    }
    // else if(!value.mongo_query)
    // {
    //   setform_errors('Please provide exact match');
    // }
    else
    { 
      setform_errors('Please provide some inputs');      
    }
  };
const updateText = e =>
  {

    const {value,name} = e.target;
    setruleData(prevState => ({...prevState, [name]:value}));
  }
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
        <TextInput id="rule_id" type="hidden" name="rule_id" value={rule_data.id}  /> 
        <div direction="row" style={{marginTop: "10px"}}>
          <div className="col-md-12">
            <FormField  label="Rule Name" htmlFor="rule_name" >
              <TextInput id="name" name="name" value={rule_data.name} onChange={(e) => updateText(e)} />
            </FormField>
          </div>
          <div className="col-md-12">
            <FormField  label="Query String" htmlFor="query_string" >
              <TextInput id="query_string" name="query_string" value={rule_data.query_string} onChange={(e) => updateText(e)} />
            </FormField>
          </div>
          <TextInput id="mongo_query" type="hidden" name="mongo_query" value={mongo_query}  /> 
          <TextInput id="build_query" type="hidden" name="build_query" value={build_query}  /> 
          <QueryBuilder setmongo_query={setmongo_query} setbuild_query={setbuild_query} build_query={rule_data.build_query} />


          
          <div className="col-md-12">
          
            <Box direction="row" gap="small" margin="medium" className=""  >
                <Button label="Update"  secondary type="submit" />
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

const EditRule = (props) => {
  const [open, setOpen] = useState(false);
  const size = useContext(ResponsiveContext);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);
  const user = props.user;
  const rule_detail = props.rule_detail;
  const setData = props.setData;
  return (
    <>
        <Button alignSelf="center" icon={<Edit />} onClick={onOpen} secondary />
      
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

export default EditRule;