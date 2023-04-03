import React, { useContext, useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import {  Button,  Box,  DataTable,   Header,  Heading,  Layer,  ResponsiveContext,Text, CheckBox,  Form,  FormField,  Select,  TextArea,  TextInput, Tabs, RadioButtonGroup,CheckBoxGroup } from 'grommet';
import { Close, Edit, Trash,Search } from 'grommet-icons';



const LayerForm = (props ) => {
const textconfig_id = props.textconfig_id
const [NotificationForms, setNotificationForms] = useState([]);
//const role_list = [];
const [loading, setLoading] = useState(false);
const [showForm, setshowForm] = useState(false);
const [form_errors, setform_errors] = useState("");
const [label, setlabel] = useState("Create");
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
      fetch("api/create_textconfig",post_set)
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

  };

  const fetchData = () =>
  {
    if(textconfig_id)
    {
      let csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
      const config_settings = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','X-CSRF-Token': csrf }, 
        body: JSON.stringify({"textconfig_id":textconfig_id})
      };
      setLoading(true);
      fetch("/api/get_textconfig",config_settings)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
        setlabel('Update');
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
            Textconfig Form
          </Heading>
        </Box>
      </Header>
       
      
       <div direction="row">
      
        <Form validate="blur"  method="post" onSubmit={({ value, touched }) => onSubmit({ value, touched })}  >
        <TextInput id="textconfig_id" type="hidden" name="textconfig_id" value={textconfig_id}  /> 
        <div direction="row">
          <div className="col-md-12">
            <FormField  label="Text Config Name" htmlFor="textconfig_name" >
              <TextInput id="textconfig_name" value={formData.name ? formData.name : ""} name="name" onChange={(e) => updateText(e)} />
            </FormField>
          </div>

          <div className="col-md-12">          
                <Box direction="row" gap="small" margin="medium" className=""  >
                <div className="col-md-2"></div>
                <div className="col-md-8"></div>
                <div className="col-md-2"> <Button alignSelf="end" label={label}  secondary type="submit" /></div>
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

const TextconfigForm = (props) => {
  const [open, setOpen] = useState(false);
  const size = useContext(ResponsiveContext);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);
  const addedit = props.addedit;
  return (
    <>
        {addedit == 'edit' &&
         <Button alignSelf="start"  icon={<Edit style={{width: 18}}/>} onClick={onOpen} secondary />
        }
        {addedit != 'edit' &&
          <Button alignSelf="end"  label={addedit} onClick={onOpen} secondary />
        }

      
      {open && (
        <Layer position="right" full={!['xsmall', 'small'].includes(size) ? 'vertical' : true} onEsc={onClose} >
          <Box fill="vertical" overflow="auto" width={!['xsmall', 'small'].includes(size) ? 'large' : undefined} pad="medium" >
            <LayerForm textconfig_id={props.textconfig_id} setData={props.setData} setOpen={value => setOpen(value)} />
          </Box>
        </Layer>
      )}
    </>
  );
};

export default TextconfigForm;