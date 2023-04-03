import React, {useEffect,useState} from "react";
import $ from 'jquery';
import { Button, Paragraph, Tab, Tabs,Box} from 'grommet';
import UserManagement from "./module/UserManagement";
import {CategoriesList} from "./module/categories/CategoriesList";
import {RuletypesList} from "./module/rule_types/RuletypesList";
import {RuleordersList} from "./module/rule_orders/RuleordersList";
import {TextconfigList} from "./module/text_config/TextconfigList";

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
  <div style={{textAlign: 'right'}} ><UserManagement user={user} /></div>
    <div className="card-list-head">

    <Tabs activeIndex={index} onActive={onActive} justify="start">

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

      <Tab title="Text Config">
      <Box pad="medium">
          <TextconfigList user={user} />
      </Box>
      </Tab>

    </Tabs>
    

    </div>  
  </div>
</div>

)};