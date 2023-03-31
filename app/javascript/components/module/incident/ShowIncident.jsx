import React, { useContext, useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import {  Button,  Box,  DataTable,   Header,  Heading,  Layer,  ResponsiveContext,Text, CheckBox,  Form,  FormField,  Select,  TextArea,  TextInput, Tabs, RadioButtonGroup,CheckBoxGroup,NameValueList,NameValuePair } from 'grommet';
import { Close, Edit, Trash,Search } from 'grommet-icons';
const LayerForm = (props ) => {
const setData = props.setData;
const [loading, setLoading] = useState(false);
const [incident_data, setincidentData] = useState(props.incident_detail);
useEffect(() => {
    //fetchData();
  }, []);

  return (
    <Box gap="medium">
      <Button alignSelf="end" icon={<Close />} onClick={() => props.setOpen(false)} />
      <Header alignSelf="center" pad={{ horizontal: 'xxsmall' }}>
        <Box >
          <Heading level={4} margin="none" id="layer-title">
            Incident Detail
          </Heading>
        </Box>
      </Header>
       
      <div direction="row">
              
        <div direction="row" style={{marginTop: "10px"}}>
          <div className="col-md-12">
          <NameValueList valueProps={{ width: ['auto', 'medium'] }} >
          <NameValuePair key="deed_reference_id" name={'Incident : '}>
            {incident_data.deed_reference_id}
          </NameValuePair>
          <NameValuePair key="error_log" name={'Error Log : '}>
            {incident_data.error_log}
          </NameValuePair>
          <NameValuePair key="log_timestamp" name={'Log Timestamp : '}>
            {new Date(incident_data.log_timestamp).toUTCString("en-US", {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).split('GMT')[0]}
          </NameValuePair>
          <NameValuePair key="service_name" name={'Service Name : '}>
            {incident_data.service_name}
          </NameValuePair>
          <NameValuePair key="level" name={'Level : '}>
            {incident_data.level}
          </NameValuePair>
          <NameValuePair key="thread" name={'Thread : '}>
            {incident_data.thread}
          </NameValuePair>
          <NameValuePair key="message" name={'Message : '}>
            {incident_data.message}
          </NameValuePair>
          <NameValuePair key="rule" name={'Rule : '}>
            {incident_data.rule}
          </NameValuePair>
          <NameValuePair key="rule" name={'Notification : '}>
            {incident_data.notification_sent == true ? 'Sent' : 'Not Sent'}
          </NameValuePair>
          </NameValueList>
          </div>
        </div>

      </div>
      
      
      </Box>
      
  );
};

LayerForm.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

const ShowIncident = (props) => {
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
  const incident_detail = props.incident_detail;
  const setData = props.setData;
  return (
    <>
           
    <a href={void(0)} onClick={onOpen} style={{textDecorationLine: 'underline',color: 'blue',cursor:'pointer'}}>{incident_detail.deed_reference_id}</a>
      {open && (
        <Layer position="right" full={!['xsmall', 'small'].includes(size) ? 'vertical' : true} onEsc={onClose} >
          <Box fill="vertical" overflow="auto" width={!['xsmall', 'small'].includes(size) ? 'large' : undefined} pad="medium" >
            <LayerForm incident_detail={incident_detail} setData={setData} user={user} setOpen={value => setOpen(value)} />
          </Box>
        </Layer>
      )}
    </>
  );
};

export default ShowIncident;