import React, { useContext, useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import {  Button,  Box,  DataTable,   Header,  Heading,  Layer,  ResponsiveContext,Text, CheckBox,  Form,  FormField,  Select,  TextArea,  TextInput, Tabs, RadioButtonGroup,CheckBoxGroup } from 'grommet';
import { Close, Edit, Trash,Search } from 'grommet-icons';
const options = ['Name','Email Address','Employee Number','All Users'];
const LayerForm = (props ) => {

const [user_detail, setUserDetail] = useState([]);
const [role_list, setrole_list] = useState([]);
const [role_selected, setrole_selected] = useState([]);
//const role_list = [];
const [loading, setLoading] = useState(false);
const [showForm, setshowForm] = useState(false);
const [form_errors, setform_errors] = useState("");
const [user_id, setuser_id] = useState("");
const [value, setValue] = useState('Name');
useEffect(() => {
    fetchData();
  }, []);
const fetchData = () => {
  let csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const post_set = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','X-CSRF-Token': csrf }
    };
    setLoading(true);
      fetch("api/get_notifications",post_set)
        .then((response) => response.json())
        .then((data) => {
          setrole_list(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });

}
const onSubmit_update = ({ value, touched }) => 
{
  setform_errors('');
      let csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
      const post_set = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','X-CSRF-Token': csrf },          
          body: JSON.stringify(value)
      };
      setLoading(true);
      fetch("api/update_user",post_set)
        .then((response) => response.json())
        .then((data) => {
          fetch_userData();
          setshowForm(false);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
};
const onSubmit = ({ value, touched }) => 
  { 
    setUserDetail([]);
    if((value.search_text && value.search_text.length >= 3) || value.search_type == "All Users" )
    {
      setform_errors('');
      let csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
      const post_set = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json','X-CSRF-Token': csrf },          
          body: JSON.stringify(value)
      };
    fetch_userData = () => {
      setLoading(true);
      fetch("api/search_user",post_set)
        .then((response) => response.json())
        .then((data) => {
          setUserDetail(data);
          setshowForm(false);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
      };
      fetch_userData();
    }
    else if(value.search_text && value.search_text.length < 3)
    {
      setform_errors('Please provide some more inputs');
    }
    else
    { 
      setform_errors('Please provide some inputs');      
    }
  };
  const size = useContext(ResponsiveContext);
  const edit_user = (user_id,roleids) => 
  {
    setuser_id(user_id);
    setrole_selected(roleids);
    setshowForm(true);
  };
  
  return (
    <Box gap="medium">
      <Button alignSelf="end" icon={<Close />} onClick={() => props.setOpen(false)} />
      <Header alignSelf="center" pad={{ horizontal: 'xxsmall' }}>
        <Box >
          <Heading level={4} margin="none" id="layer-title">
            Search User
          </Heading>
        </Box>
      </Header>
       
      <div direction="row">
      
        <Form validate="blur"  method="post" onSubmit={({ value, touched }) => onSubmit({ value, touched })}  >
        <div direction="row" style={{marginTop: "10px"}}>
          <div className="col-md-9">
            <FormField  htmlFor="search_text" >
              <Select id="search_type" name="search_type" options={options} value={value} onChange={({ option }) => setValue(option)} />
              <TextInput id="search_text" name="search_text" />
            </FormField>
          </div>
          <div className="col-md-3">
          
            <Box direction="row" gap="small" margin="medium" className=""  >
                <Button label="Search" icon={<Search style={{width: 18}}/>}  secondary type="submit" />
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
      {showForm == true &&

        <div direction="row">
      
        <Form validate="blur"  method="post" onSubmit={({ value, touched }) => onSubmit_update({ value, touched })}  >
        <TextInput id="user_id" type="hidden" name="user_id" value={user_id}  />
        <div direction="row" style={{marginTop: "10px"}}>
          

          <Box direction="row" gap="small" margin="medium" className=""  >
          <FormField name="user_role" fill    htmlFor="user_roles" label="User Role" >
              <CheckBoxGroup options={role_list} value={role_selected} name="user_roles" id="user_roles"  onChange={({ value, option }) => {setrole_selected(value)}} valueKey="role_id" labelKey="name" />
          </FormField>
          </Box>
          <Box direction="row" gap="small" margin="medium" className=""  >
            <Button label="Update" secondary type="submit" />
            <Button label="Exit" onClick={() => setshowForm(false)} secondary />
          </Box>
        

        </div>
      </Form>
      </div>
      }
      {user_detail.length > 0 && 

     <table className="table table-bordered table-sm" >
        <thead>
            <tr>
                <td><b>Name</b></td>                
                <td><b>Email </b></td>
                <td><b>Emp No</b></td>
                <td><b>Roles</b></td>
                <td><b>Action</b></td>
            </tr>
          </thead>
          <tbody>
            {user_detail.map(sd =>{ 
              let roleids = sd.roles.map(function (rl) { return rl['id'] }) 
              return (
              sd.id > 0 &&             
                        <tr key={"tr"+sd.id} >
                          <td id={"c"+sd.id} key={"c"+sd.id}> {sd.full_name}</td>
                          <td id={"b"+sd.id} key={"b"+sd.id}>{sd.email}</td>
                          <td id={"a"+sd.id} key={"a"+sd.id}> {sd.emp_id}</td>
                          <td id={"d"+sd.id} key={"d"+sd.id}>
                          <ul key={"ul"+sd.id} className="list-group">
                            {sd.roles.map(rl =>(
                                <li className="list-group-item" id={"rl"+rl.id} key={"rl"+rl.id}>{rl.name}</li>

                            ))}
                            </ul>
                          </td>
                          <td key={"e"+sd.id}> 
                          <Button key={"btn"+sd.id} icon={<Edit style={{width: 18}}/>}  onClick={() => edit_user(sd.id,roleids) }  secondary />
                          </td>
                        </tr>
                
                )

            })}
            {user_detail.map(sd =>( 
              sd.id == 0 &&

                  <tr key={"tr"+sd.id}>
                    <td className="text-center" colspan="5" key={"td"+sd.id}> No records </td>
                  </tr>
            ))}
           </tbody> 
        </table>  
      }
      </Box>
      
  );
};

LayerForm.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

const UserManagement = (props) => {
  const [open, setOpen] = useState(false);
  const size = useContext(ResponsiveContext);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);
  const user = props.user;
  return (
    <>
      
        <Button  label="User Management" onClick={onOpen} secondary />
      
      {open && (
        <Layer position="right"   full={!['xsmall', 'small'].includes(size) ? 'vertical' : true} onEsc={onClose} >
          <Box fill="vertical" overflow="auto" width={!['xsmall', 'small'].includes(size) ? 'large' : undefined} pad="medium" >
            <LayerForm user={user} setOpen={value => setOpen(value)} />
          </Box>
        </Layer>
      )}
    </>
  );
};

export default UserManagement;