import React, {useEffect,useState} from "react";
import $ from 'jquery';
import { Button, Paragraph, Tab, Tabs,Box} from 'grommet';
import {RulesList} from "./module/rule/RulesList";
import {Incident} from "./module/incident/Incident";


import {IncidentList} from "./module/incident/IncidentList";
import {CategoriesList} from "./module/categories/CategoriesList";
import {RuletypesList} from "./module/rule_types/RuletypesList";
import {RuleordersList} from "./module/rule_orders/RuleordersList";


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
    <div style={{textAlign: 'right'}} ><a href="https://hpe.sharepoint.com/teams/glcprocket/SitePages/Requests.aspx" ><Button alignSelf="end" label="Request new rule" secondary /></a></div>
    <div className="card-list-head">
    {/*{ roleids.includes(2)  &&
        <Box pad="medium" style={{textAlign: 'center'}}>
        No Proper Access to view
        </Box>
    }*/}
    <Tabs activeIndex={index} onActive={onActive} justify="start">
      {/*<Tab title="Sources">
      <Box pad="medium">1</Box>
      </Tab>*/}
    
    { (roleids.includes(1) || roleids.includes(3))  && 
      <Tab title="Rules">
      <Box pad="medium">
          
          <RulesList user={user} />
      </Box>
      </Tab>
    }
    { roleids.includes(4) &&
      <Tab title="Incidents">
      <Box pad="medium">
          
          <Incident user={user} />
      </Box>
      </Tab>
    }
     {/* <Tab title="Reports">
      <Box pad="medium">
      <span> Reports </span>
      </Box>
      </Tab>*/}
    
      <Tab title="Categories">
      <Box pad="medium">
          <CategoriesList user={user} />
      </Box>
      </Tab>

      <Tab title="Rule Types">
      <Box pad="medium">
          <RuletypesList user={user} />
      </Box>
      </Tab>

      <Tab title="Priorities">
      <Box pad="medium">
          <RuleordersList user={user} />
      </Box>
      </Tab>
    </Tabs>
    

    </div>  
  </div>
</div>

)};