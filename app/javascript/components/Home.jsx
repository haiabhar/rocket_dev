import React, {useEffect,useState} from "react";
import $ from 'jquery';
import {  Paragraph, Tab, Tabs,Box} from 'grommet';
import {RulesList} from "./module/rule/RulesList";
import {IncidentList} from "./module/incident/IncidentList";



export default (props) => {
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
const [index, setIndex] = useState();
const onActive = nextIndex => setIndex(nextIndex);
const [loading, setLoading] = useState(false);
const [details, setDetails] = useState([]);

return (
<div className="content-list-body p-3">
  <div className="card-list">
    <div className="card-list-head">
    { roleids.includes(2)  &&
        <Box pad="medium" style={{textAlign: 'center'}}>
        No Proper Access to view
        </Box>
    }
    <Tabs activeIndex={index} onActive={onActive} justify="start">
      {/*<Tab title="Sources">
      <Box pad="medium">1</Box>
      </Tab>*/}
    
    { (roleids.includes(1) || roleids.includes(3) ) && !roleids.includes(2) && 
      <Tab title="Rules">
      <Box pad="medium">
          
          <RulesList user={user} />
      </Box>
      </Tab>
    }
    { (roleids.includes(1) || roleids.includes(3) ) && !roleids.includes(2) &&
      <Tab title="Incidents">
      <Box pad="medium">
          
          <IncidentList user={user} />
      </Box>
      </Tab>
    }
     {/* <Tab title="Reports">
      <Box pad="medium">
      <span> Reports </span>
      </Box>
      </Tab>*/}
    </Tabs>
    

    </div>          
  </div>
</div>

)};