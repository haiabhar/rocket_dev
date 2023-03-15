import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {  Box,  Button,  Header,  Keyboard,  ResponsiveContext,  Text,  TextInput, Menu, DropButton, Heading,} from 'grommet';
import {  Chat,  Hpe,  Notification,  Search as SearchIcon,  User, FormClose, } from 'grommet-icons';
import UserManagement from "../module/UserManagement";


const PassParam = (props) => {

  const user = props.user;
  var roleids  = [];
  if(user)
  {
    roles = user.roles
    if(roles)
    {
    roleids = roles.map(function (rl) { return rl['id']});
    }
  }
  const [open, setOpen] = useState();
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };



const DropContent = ({ onClose }) => (
  <Box pad="medium" gap="medium" width="medium">
      
    <Box direction="row" justify="between" align="center">
      <Heading level={5} margin="none">
        {user.full_name}
      </Heading>
      <Button icon={<FormClose />} onClick={onClose} />      
    </Box>
    <Box direction="row" justify="between" align="center">
      <Text>{user.email}</Text>
    </Box>
    { (roleids.includes(1) || roleids.includes(3) ) && 
      <UserManagement user={user} />
    }

    {/*<Box  direction="row" justify="between" align="center">
    <a href="destroy_user">Sign Out</a>
    </Box>*/}
  </Box>
);

DropContent.propTypes = {
  onClose: PropTypes.func,
};

 
  return <DropButton
      icon={<User />}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      dropContent={<DropContent onClose={onClose} />}
      dropProps={{ align: { top: 'bottom', right: 'right' } }}
    />
}



const HeaderExample = (props) => {
  
const user = props.user;
return(
     
  <div className={'hpehf-header'}>

  <Header fill="horizontal">
  <a href="/" >
    <Button>
      <Box
        direction="row"
        align="start"
        gap="medium"
        // pad maintains accessible hit target
        // non-responsive maintains same dimensions for mobile
        pad={{ vertical: 'small' }}
        responsive={false}
      >
        <Hpe color="brand"  />
        <Box direction="row" gap="small" wrap>
          <Text color="text-strong" weight="bold">
          </Text>
          <img src="rocket-logo.png" style={{ width : "120px", marginTop : "-5px"}} alt={props.app_name} />
        </Box>
      </Box>
    </Button>
    </a>
    {<PassParam user={user} />}
    
  </Header>
  </div>
  )
};

export default HeaderExample