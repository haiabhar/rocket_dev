import React, { useContext, useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import {  Button,  Box,  DataTable,   Header,  Heading,  Layer,  ResponsiveContext,Text, CheckBox,  Form,  FormField,  Select,  TextArea,  TextInput, Tabs, RadioButtonGroup,CheckBoxGroup } from 'grommet';
import { Close, Edit, Trash,Search } from 'grommet-icons';
import NotificationForm from './NotificationForm'
const options = ['Name','Email Address','Employee Number','All Users'];
const LayerForm = (props ) => {
const rule_id = props.rule_id
const [notifications, setNotifications] = useState([]);
//const role_list = [];
const [loading, setLoading] = useState(false);
const [showForm, setshowForm] = useState(false);
const [form_errors, setform_errors] = useState("");
useEffect(() => {
    fetchData();
  }, []);
const fetchData = () => {
  let csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const post_set = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','X-CSRF-Token': csrf },
        body: JSON.stringify({rule_id: rule_id})
    };
    setLoading(true);
      fetch("api/get_notifications",post_set)
        .then((response) => response.json())
        .then((data) => {
          setNotifications(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });

}
const edit_notification = (notification_id) => 
  {
    // action 
  };
  return (
    <Box gap="medium">
      <Button alignSelf="end" icon={<Close />} onClick={() => props.setOpen(false)} />
      <Header alignSelf="center" pad={{ horizontal: 'xxsmall' }}>
        <Box >
          <Heading level={4} margin="none" id="layer-title">
            Notifications
          </Heading>
        </Box>

      </Header>
       <NotificationForm addedit="New Notification" rule_id={rule_id} setNotifications={setNotifications} />
       
      
      {notifications.length > 0 && 

     <table className="table table-bordered table-sm" >
        <thead>
            <tr>
                <td><b>Notifications Name</b></td>                
                <td><b>Template</b></td>
                <td><b>Sequence</b></td>
                <td><b>Subject</b></td>
                <td><b>Action</b></td>
            </tr>
          </thead>
          <tbody>
            {notifications.map(sd =>{ 
              return (
              sd.id > 0 &&             
                        <tr key={"tr"+sd.id} >
                          <td id={"c"+sd.id} key={"c"+sd.id}> {sd.notification_name}</td>
                          <td id={"b"+sd.id} key={"b"+sd.id}>{sd.template_type == 1 ? 'Internal' : 'External'}</td>
                          <td id={"a"+sd.id} key={"a"+sd.id}> {sd.sequence}</td>
                          <td id={"d"+sd.id} key={"d"+sd.id}>{sd.email_subject} </td>
                          <td key={"e"+sd.id}> 
                         
                          <NotificationForm addedit="edit" rule_id={rule_id} setNotifications={setNotifications} notification_id={sd.id}  />
                          </td>
                        </tr>
                
                )

            })}
            
           </tbody> 
        </table>  
      }
      {notifications.length == 0 &&

        <div className="col-md-12 text-center"><span className="text-center" > No records </span></div>
      }

      </Box>
      
  );
};

LayerForm.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

const Notification = (props) => {
  const [open, setOpen] = useState(false);
  const size = useContext(ResponsiveContext);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);
  const user = props.user;
  const rule_id = props.rule_id;
  return (
    <>
      
        <Button  label="Notification" onClick={onOpen} secondary />
      
      {open && (
        <Layer position="right"   full={!['xsmall', 'small'].includes(size) ? 'vertical' : true} onEsc={onClose} >
          <Box fill="vertical" overflow="auto" width={!['xsmall', 'small'].includes(size) ? 'large' : undefined} pad="medium" >
            <LayerForm user={user} rule_id={rule_id} setOpen={value => setOpen(value)} />
          </Box>
        </Layer>
      )}
    </>
  );
};

export default Notification;