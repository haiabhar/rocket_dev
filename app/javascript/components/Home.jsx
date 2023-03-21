import React, {useEffect,useState} from "react";
import $ from 'jquery';
import {  Paragraph, Tab, Tabs,Box} from 'grommet';
import {RulesList} from "./module/rule/RulesList";



export default (props) => {
user = props.user;
const [index, setIndex] = useState();
const onActive = nextIndex => setIndex(nextIndex);
const [loading, setLoading] = useState(false);
const [details, setDetails] = useState([]);

return (
<div className="content-list-body p-3">
  <div className="card-list">
    <div className="card-list-head">

    <Tabs activeIndex={index} onActive={onActive} justify="start">
      {/*<Tab title="Sources">
      <Box pad="medium">1</Box>
      </Tab>*/}
      <Tab title="Rules">
      <Box pad="medium">
          
          <RulesList user={user} />
      </Box>
      </Tab>
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