import React, { useContext, useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import {  Button,  Box,  DataTable,   Header,  Heading,  Layer,  ResponsiveContext,Text, CheckBox,  Form,  FormField,  Select,  TextArea,  TextInput, Tabs, RadioButtonGroup,CheckBoxGroup,NameValueList,NameValuePair } from 'grommet';
import { Close, Edit, Trash,Search } from 'grommet-icons';
const status_option = ['Open','Work in Progress','Pending','Closed'];
const LayerForm = (props ) => {
const [loading, setLoading] = useState(false);
const [incident_data, setincidentData] = useState(props.incident_detail);
const [select_transfer, setselect_transfer] = useState('');
const [form_errors, setform_errors] = useState("");
const [form_success, setform_success] = useState("");
const [users, setUsers] = useState([]);
const [text, setText] = useState('');
const [suggestions, setSuggestions] = useState([]);
// useEffect(() => {
//     const loadUsers = async () =>{

//     }

//   }, []);
const loadUsers = (e) =>
{ //console.log(e.target.value);
 //console.log(e.target.value.length);
 setText(e.target.value);
  if (e.target.value.length > 3){
  let csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const post_sets = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','X-CSRF-Token': csrf },
        body: JSON.stringify({"search": e.target.value})
    };
    setLoading(true);
      fetch("api/search_user_list",post_sets)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data);
          // props.fetchData();
          // props.setOpen(false);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
  //loadUsers();
}
}
//console.log('users',suggestions);
// const onChangeHandler = (text) =>{
//   let matches = []
//   if (text.length > 3){
//     matches = users.filter(user => {
//       const regex = new RegExp(`${text}`, "gi");
//       return user.email.match(regex)
//     })
//   }
//   console.log('matches',matches)
//   setSuggestions(matches)
//   setText(text)
// }
useEffect(() => {
    //fetchData();
  }, []);
const assignIncident = (id) =>
{
  let csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const post_set = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','X-CSRF-Token': csrf },
        body: JSON.stringify({id: id})
    };
    setLoading(true);
      fetch("api/assign_incident",post_set)
        .then((response) => response.json())
        .then((data) => {
          props.fetchData();
          props.setOpen(false);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
}
  const onSubmit = ({ value, touched }) => 
  { 
    if(!value.status){ setform_errors('Status Should not be Blank'); }
    //else if(!value.notes){ setform_errors('Notes Should not be Blank'); }
    else
    { 
      setform_errors('');
      setform_success('Updated Successfully');
    //console.log('FormData: ', value);
      let csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const sc_post_settings = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','X-CSRF-Token': csrf },
        body: JSON.stringify(value)
    };
  const updateData = () => {
    setLoading(true);
    fetch("/api/update_deed",sc_post_settings)
      .then((response) => response.json())
      .then((data) => {
        props.fetchData();
        props.setOpen(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  updateData();
  }
  };
const updateText = e =>{

  const {value,name} = e.target;
    if(e.target.maxLength > 0)
    {
      if(e.target.value.length <= e.target.maxLength)
      {
        setincidentData(prevState => ({...prevState, [name]:value}));
      }
    }
    else
    {      
      setincidentData(prevState => ({...prevState, [name]:value}));
    }
}
const updateTextsearch = suggestion =>{
   //console.log('ashdg');
   //console.log(suggestion);
    setText(suggestion);
    setSuggestions('');
}
const updateassignee = (text) =>
{ 
 //console.log(text);
 //console.log(incident_data.id);
  // if(e.key == 'Enter'){
  //   e.preventDefault();
  let csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const post_set = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','X-CSRF-Token': csrf },
        body: JSON.stringify({id: incident_data.id, assignee: text})
    };
    setLoading(true);
      fetch("api/transfer_incident",post_set)
        .then((response) => response.json())
        .then((data) => {
          props.fetchData();
          props.setOpen(false);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
     // }
}
  return (
    <Box gap="medium">
      <Button alignSelf="end" icon={<Close />} onClick={() => props.setOpen(false)} />
      <div className="pull-right" direction="row" style={{marginTop: "10px"}} >
      <Box background="background-contrast" style={{float: "right"}}>
       {incident_data.owner && <strong>Owner:{" "} <a onClick={(event) => setselect_transfer('transfer')}>{incident_data.owner}</a></strong> }
        {/*{incident_data.assigned_to && 
            <Button label="Transfer" alignSelf="end" onClick={(event) => setselect_transfer('transfer')} secondary/>
        }  */}      
        
        {select_transfer == 'transfer' && 
        <div direction="row" className="col-md-12">
            <FormField  htmlFor="search_text" >
              <TextInput id="search_text" name="search_text" onChange={(e) => loadUsers(e)} value={text ? text : ''} />
              {
                suggestions && 
                <ul> {suggestions.map((suggestion,i) =>
                  <li key={i} onClick={(e) => updateTextsearch(suggestion)}>{suggestion}</li>
                  ) }
                </ul>
              }
            </FormField>
            <Button label="Transfer" alignSelf="end" onClick={(e) => updateassignee(text)} secondary/>
        </div>
        }
        </Box>
        </div>
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
          <NameValuePair key="notification_sent" name={'Notification : '}>
            {incident_data.notification_sent == true ? 'Sent' : 'Not Sent'}
          </NameValuePair>
          <NameValuePair key="Status" name={'Status : '}>
            {incident_data.status}
          </NameValuePair>
          <NameValuePair key="Notes" name={'Notes : '}>
            {/*{incident_data.notes ? incident_data.notes.split('\n').map((item, i) => <Text key={i}>{item}</Text>) : ''}*/}
            {incident_data?.notes && 
                <ul> {incident_data.notes.split('\n').map((item, i) =>
                  <li key={i}>{item}</li>
                  ) }
                </ul>
            }
          </NameValuePair>
          </NameValueList>
          </div>
          
        </div>
        
      </div>
      
      <div direction="row" style={{marginTop: "10px"}}>
        {!incident_data.assigned_to && incident_data.status != 'Closed' && 
            <Button label="Accept" alignSelf="end" onClick={(event) => assignIncident(incident_data.id)} secondary/>
          }
      </div>
        <div direction="row" style={{marginTop: "10px"}}>
        <Form validate="blur"  method="post" onSubmit={({ value, touched }) => onSubmit({ value, touched })}  >
        <TextInput id="deed_id" type="hidden" name="deed_id" value={incident_data.id}  /> 
        {incident_data.status != 'Closed' &&
        <div direction="row" style={{width: "200px"}}>
        <FormField label="Status *" htmlFor="text-input" name="ppc_name" >
          <Select
          id="status"
          name="status"
          placeholder="Select"
          options={status_option}
          value={incident_data?.status ? incident_data.status : ''} 
          onChange={(e) => updateText(e)} 
          />
        </FormField>
        </div>
        }
        {incident_data.status != 'Closed' &&
        <div direction="row" style={{width: "500px"}}>
        <FormField label="Notes" htmlFor="text-input" name="notes" >
          <TextArea id="notes" name="notes" rows="8" onChange={(e) => updateText(e)} />
        </FormField>
        </div>
        }
        {form_errors &&
              <Box direction="row" align="center" gap="medium" margin="medium" className="mt-3 pt-3"  >
              <span style={{margin: "auto",color: "#F00",}}>{form_errors}</span>
              </Box>
            }
            {form_success &&
              <Box direction="row" align="center" gap="medium" margin="medium" className="mt-3 pt-3"  >
              <span style={{margin: "auto",color: "#0F0",}}>{form_success}</span>
              </Box>
            }
      {incident_data.status != 'Closed' &&
        <div direction="row" >
          <Box direction="row" gap="small" margin="medium" className="mt-3 pt-3"  >
              <Button label="Save" secondary type="submit"/> 
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
  return (
    <>
           
    <a href={void(0)} onClick={onOpen} style={{textDecorationLine: 'underline',color: 'blue',cursor:'pointer'}}>{incident_detail.deed_reference_id}</a>
      {open && (
        <Layer position="right" full={!['xsmall', 'small'].includes(size) ? 'vertical' : true} onEsc={onClose} >
          <Box fill="vertical" overflow="auto" width={!['xsmall', 'small'].includes(size) ? 'large' : undefined} pad="medium" >
            <LayerForm incident_detail={incident_detail} fetchData={props.fetchData} user={user} setOpen={value => setOpen(value)} />
          </Box>
        </Layer>
      )}
    </>
  );
};

export default ShowIncident;