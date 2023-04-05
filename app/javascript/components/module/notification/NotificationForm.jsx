import React, { useContext, useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import {  Button,  Box,  DataTable,   Header,  Heading,  Layer,  ResponsiveContext,Text, CheckBox,  Form,  FormField,  Select,  TextArea,  TextInput, Tabs, RadioButtonGroup,CheckBoxGroup } from 'grommet';
import { Close, Edit, Trash,Search,Copy } from 'grommet-icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const LayerForm = (props ) => {
const rule_id = props.rule_id
const notification_id = props.notification_id
const [NotificationForms, setNotificationForms] = useState([]);
//const role_list = [];
const [loading, setLoading] = useState(false);
const [showForm, setshowForm] = useState(false);
const [form_errors, setform_errors] = useState("");
const [dynamicTo, setDynamicTo] = useState(false);
const [textconfig, setTextconfig] = useState();
const [dynamicCc, setDynamicCc] = useState(false);
const [dynamicBcc, setDynamicBcc] = useState(false);
const [formData, setFormData] = useState([]); 
const [formnext, setNext] = useState(1);
const [editor_data, setEditor_data] = useState(null);
useEffect(() => {
    fetchData();
    fetchTextconfig();
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
    if(value.notification_name && value.sequence && value.email_subject && value.email_body)
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
      fetch("api/create_notification",post_set)
        .then((response) => response.json())
        .then((data) => {
          props.setNotifications(data);
          props.setOpen(false);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
      };
      updateData();
    }
    else if(!value.notification_name)
    {
      setform_errors('Please provide name');
    }
    else if(!value.sequence)
    {
      setform_errors('Please provide sequence');
    }
    else if(!value.email_subject)
    {
      setform_errors('Please provide email subject');
    }
    else if(!value.email_body)
    {
      setform_errors('Please provide email body');
    }
    else
    { 
      setform_errors('Please provide some inputs');      
    }
  };

  const fetchData = () =>
  {
    if(notification_id)
    {
      let csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
      const config_settings = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','X-CSRF-Token': csrf }, 
        body: JSON.stringify({"notification_id":notification_id})
      };
      setLoading(true);
      fetch("/api/get_notification",config_settings)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
        setEditor_data(data.email_body);
        if(data.dynamic_to)
        {
          setDynamicTo(true);
        }
        if(data.dynamic_cc)
        {
          setDynamicCc(true);
        }
        if(data.dynamic_bcc)
        {
          setDynamicBcc(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    }
  }

  const fetchTextconfig = () => {
  let csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const get_set = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json','X-CSRF-Token': csrf }
    };
    setLoading(true);
      fetch("api/get_all_textconfig",get_set)
        .then((response) => response.json())
        .then((data) => {
          setTextconfig(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
  }
  

  let sequence_arr = ["Before Action", "After Action", "After Action Success","After Action failure"]
  let template_type = ["Internal","External"];
  let email_to_arr = ["From Humio Log"];
  return (
    <Box gap="medium">
      <Button alignSelf="end" icon={<Close />} onClick={() => props.setOpen(false)} />
      <Header alignSelf="center" pad={{ horizontal: 'xxsmall' }}>
        <Box >
          <Heading level={4} margin="none" id="layer-title">
            Notification Form
          </Heading>
        </Box>
      </Header>
       
      
       <div direction="row">
      
        <Form validate="blur"  method="post" onSubmit={({ value, touched }) => onSubmit({ value, touched })}  >
        <TextInput id="rule_id" type="hidden" name="rule_id" value={rule_id}  /> 
        <TextInput id="notification_id" type="hidden" name="notification_id" value={notification_id}  /> 
        <div direction="row" style={{marginTop: "10px", display: formnext == 1 ? 'block' : 'none'}}>
          <div className="col-md-12">
            <FormField  label="Notification Name" htmlFor="notification_name" >
              <TextInput id="notification_name" value={formData.notification_name ? formData.notification_name : ""} name="notification_name" onChange={(e) => updateText(e)} />
            </FormField>
          </div>
          <div className="col-md-12">
            <FormField  label="Sequence" htmlFor="sequence" >
               <Select id="sequence" name="sequence" placeholder="Select" options={sequence_arr} value={formData.sequence != '' ? formData.sequence : ""} onChange={(e) => updateText(e)} />
            </FormField>
          </div>
         

          <div className="col-md-10">
            <FormField  label="Email To" htmlFor="static_to" >
              <TextInput id="static_to" name="static_to" value={formData.static_to ? formData.static_to : ""} onChange={(e) => updateText(e)} />
            </FormField>
          </div>

          <div className="col-md-2">
            <FormField  label="Dynamic Email To" htmlFor="checkbox_dynamic_to" >
              <CheckBox id="checkbox_dynamic_to" name="checkbox_dynamic_to" checked={dynamicTo}  onChange={(e) => setDynamicTo(e.target.checked)} />
            </FormField>
          </div>
          {dynamicTo &&

          <div className="col-md-12">
            <FormField  label="Dynamic Email To" htmlFor="dynamic_to" >
               <Select id="dynamic_to" name="dynamic_to" placeholder="Select" options={email_to_arr} value={formData.dynamic_to ? formData.dynamic_to : ""} onChange={(e) => updateText(e)} />
            </FormField>
          </div>
          }

           <div className="col-md-10">
            <FormField  label="Email CC" htmlFor="static_cc" >
              <TextInput id="static_cc" name="static_cc" value={formData.static_cc ? formData.static_cc : ""} onChange={(e) => updateText(e)} />
            </FormField>
          </div>
          <div className="col-md-2">
            <FormField  label="Dynamic Email CC" htmlFor="checkbox_dynamic_cc" >
              <CheckBox id="checkbox_dynamic_cc" name="checkbox_dynamic_cc" checked={dynamicCc}  onChange={(e) => setDynamicCc(e.target.checked)} />
            </FormField>
          </div>

          {dynamicCc &&

          <div className="col-md-12">
            <FormField  label="Dynamic Email CC" htmlFor="dynamic_cc" >
               <Select id="dynamic_cc" name="dynamic_cc" placeholder="Select" options={email_to_arr} value={formData.dynamic_cc ? formData.dynamic_cc : ""} onChange={(e) => updateText(e)} />
            </FormField>
          </div>
          }
           <div className="col-md-10">
            <FormField  label="Email BCC" htmlFor="static_bcc" >
              <TextInput id="static_bcc" name="static_bcc" value={formData.static_bcc ? formData.static_bcc : ""} onChange={(e) => updateText(e)} />
            </FormField>
          </div>
          <div className="col-md-2">
            <FormField  label="Dynamic Email BCC" htmlFor="checkbox_dynamic_bcc" >
              <CheckBox id="checkbox_dynamic_bcc"  name="checkbox_dynamic_bcc" checked={dynamicBcc}  onChange={(e) => setDynamicBcc(e.target.checked)} />
            </FormField>
          </div>



          {dynamicBcc &&

          <div className="col-md-12">
            <FormField  label="Dynamic Email BCC" htmlFor="dynamic_bcc" >
               <Select id="dynamic_bcc" name="dynamic_bcc" placeholder="Select" options={email_to_arr} value={formData.dynamic_bcc ? formData.dynamic_bcc : ""} onChange={(e) => updateText(e)} />
            </FormField>
          </div>
          }
          
            <div className="col-md-10 "> &nbsp; </div>         
            <div className="col-md-2 ">          
                <Box direction="row" gap="small" margin="medium" className=""  >
                    {/*<Button  label="Next"  secondary type="button" onClick={(e) => setNext(2)} />*/}
                </Box>
            </div>

        </div>
      
        <div direction="row" style={{marginTop: "10px", display: formnext == 2 ? 'block' : 'none' }}>

          <div className="col-md-12">
            <FormField  label="Email Subject" htmlFor="email_subject" >
              <TextInput id="email_subject" name="email_subject" value={formData.email_subject ? formData.email_subject : ""} onChange={(e) => updateText(e)} />
            </FormField>
          </div>
          <div className="col-md-12">
            <FormField  label="Template" htmlFor="template_type" >
               <Select id="template_type" name="template_type" placeholder="Select" options={template_type} value={formData.template_type ? formData.template_type : ""} onChange={(e) => updateText(e)}  />
            </FormField>
          </div>
          <div className="col-md-12">
          <TextArea value={editor_data ? editor_data : ""} id="email_body" name="email_body" style={{display:'none'}} />
          <FormField  label="Description" htmlFor="email_body"  >
            
            <CKEditor data={formData.email_body ? formData.email_body : ""} 
            editor={ ClassicEditor }
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                setEditor_data(data);
            } }
            config={{
             //removePlugins: ["EasyImage","ImageUpload"],
             //extraPlugins: [ MyUploadAdapter,]
            ckfinder: {
              uploadUrl: '/file_uploads/upload'
            }

              }}
             />
            </FormField>

          </div>

          <div className="col-md-12">          
                <Box direction="row" gap="small" margin="medium" className=""  >
                <div className="col-md-2"><Button label="Previous"  secondary type="button" onClick={(e) => setNext(1)} /></div>
                <div className="col-md-8"></div>
                <div className="col-md-2"> <Button alignSelf="end" label="Save"  secondary type="submit" /></div>
            </Box>
          </div>
          <div className="col-md-12">
          {textconfig &&

              <table className="table table-bordered table-sm" >
              <thead>
                  <tr>
                      <td><b>Name</b></td>                
                      <td><b>Code</b></td>
                      <td></td>
                  </tr>
                </thead>
                <tbody>
                  {textconfig.map(tf =>{ 
                    return (           
                              <tr key={"tfr"+tf.id} style={{cursor: "copy"}} onClick={() => {navigator.clipboard.writeText("|"+tf.code+"|")}} >
                                <td>{tf.name}</td>
                                <td><b>|{tf.code}|</b></td>
                                <td><Copy title="click to copy" /></td>
                              </tr>
                              )
                  })}
                  </tbody>
                </table>
                }
                
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

const NotificationForm = (props) => {
  const [open, setOpen] = useState(false);
  const size = useContext(ResponsiveContext);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);
  const addedit = props.addedit;
  const rule_id = props.rule_id;
  return (
    <>
        {addedit == 'edit' &&
         <Button alignSelf="end"  icon={<Edit style={{width: 18}}/>} onClick={onOpen} secondary />
        }
        {addedit != 'edit' &&
          <Button alignSelf="end"  label={addedit} onClick={onOpen} secondary />
        }

      
      {open && (
        <Layer position="right"   full={!['xsmall', 'small'].includes(size) ? 'vertical' : true} onEsc={onClose} >
          <Box fill="vertical" overflow="auto" width={!['xsmall', 'small'].includes(size) ? 'large' : undefined} pad="medium" >
            <LayerForm notification_id={props.notification_id} rule_id={rule_id} setNotifications={props.setNotifications} setOpen={value => setOpen(value)} />
          </Box>
        </Layer>
      )}
    </>
  );
};

export default NotificationForm;