import React, { useContext, useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import {  Button,  Box,  DataTable,   Header,  Heading,  Layer,  ResponsiveContext,Text, CheckBox,  Form,  FormField,  Select,  TextArea,  TextInput, Tabs, RadioButtonGroup,CheckBoxGroup } from 'grommet';
import { Close, Edit, Trash,Search } from 'grommet-icons';



const LayerForm = (props ) => {
const rule_type_id = props.rule_type_id
const [NotificationForms, setNotificationForms] = useState([]);
//const role_list = [];
const [loading, setLoading] = useState(false);
const [showForm, setshowForm] = useState(false);
const [form_errors, setform_errors] = useState("");
const [formData, setFormData] = useState([]);
useEffect(() => {
    fetchData();
  }, []);

const updateText = e =>
{
  const {value,name} = e.target;
    if(e.target.maxLength > 0)
    {
      if(e.target.value.length <= e.target.maxLength)
      {
        setFormData(prevState => ({...prevState, [name]:value}));
      }
    }
    else
    {      
      setFormData(prevState => ({...prevState, [name]:value}));
    }
}
const onSubmit = ({ value, touched }) => 
  { 
    if(value.name)
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
      fetch("api/create_rule_type",post_set)
        .then((response) => response.json())
        .then((data) => {
          props.setData(data);
          props.setOpen(false);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
      };
      updateData();
    }
    // else if(!value.rule_name)
    // {
    //   setform_errors('Please provide rule name');
    // }
    // else if(!value.query_string)
    // {
    //   setform_errors('Please provide query string');
    // }
    // else if(!value.mongo_query)
    // {
    //   setform_errors('Please Create some rule');
    // }
    // else
    // { 
    //   setform_errors('Please provide some inputs');      
    // }
  };

  const fetchData = () =>
  {
    if(rule_type_id)
    {
      let csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
      const config_settings = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','X-CSRF-Token': csrf }, 
        body: JSON.stringify({"rule_type_id":rule_type_id})
      };
      setLoading(true);
      fetch("/api/get_rule_type",config_settings)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    }
    else
    {

    }
  }

  return (
    <Box gap="medium">
      <Button alignSelf="end" icon={<Close />} onClick={() => props.setOpen(false)} />
      <Header alignSelf="center" pad={{ horizontal: 'xxsmall' }}>
        <Box >
          <Heading level={4} margin="none" id="layer-title">
            Rule Type Form
          </Heading>
        </Box>
      </Header>
       
      
       <div direction="row">
      
        <Form validate="blur"  method="post" onSubmit={({ value, touched }) => onSubmit({ value, touched })}  >
        <TextInput id="rule_type_id" type="hidden" name="rule_type_id" value={rule_type_id}  /> 
        <div direction="row">
          <div className="col-md-12">
            <FormField  label="Rule Type Name" htmlFor="rule_type_name" >
              <TextInput id="rule_type_name" value={formData.name ? formData.name : ""} name="name" onChange={(e) => updateText(e)} />
            </FormField>
          </div>

          <div className="col-md-12">          
                <Box direction="row" gap="small" margin="medium" className=""  >
                <div className="col-md-2"></div>
                <div className="col-md-8"></div>
                <div className="col-md-2"> <Button alignSelf="end" label="Create"  secondary type="submit" /></div>
            </Box>
          </div>
        </div>
      
        {form_errors &&
          <div className="col-md-12">
              <Box direction="row" align="center" gap="medium" margin="medium" className="mt-3 pt-3"  >
              <span style={{margin: "auto",color: "#F00",}}>{form_errors}</span>
              </Box>
            </div>
            }
      </Form>
      </div>
      </Box>
      
  );
};

LayerForm.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

const RuletypeForm = (props) => {
  const [open, setOpen] = useState(false);
  const size = useContext(ResponsiveContext);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);
  const addedit = props.addedit;
  return (
    <>
        {addedit == 'edit' &&
         <Button alignSelf="start"  icon={<Edit style={{width: 20}}/>} onClick={onOpen} secondary />
        }
        {addedit != 'edit' &&
          <Button alignSelf="end"  label={addedit} onClick={onOpen} secondary />
        }

      
      {open && (
        <Layer position="right" full={!['xsmall', 'small'].includes(size) ? 'vertical' : true} onEsc={onClose} >
          <Box fill="vertical" overflow="auto" width={!['xsmall', 'small'].includes(size) ? 'large' : undefined} pad="medium" >
            <LayerForm rule_type_id={props.rule_type_id} setData={props.setData} setOpen={value => setOpen(value)} />
          </Box>
        </Layer>
      )}
    </>
  );
};

export default RuletypeForm;