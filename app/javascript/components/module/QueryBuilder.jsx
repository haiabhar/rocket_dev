import React, {Component,useState} from 'react';
import { Utils as QbUtils, Query, Builder, BasicConfig } from '@react-awesome-query-builder/ui';
//import '@react-awesome-query-builder/ui/css/styles.css';
import '@react-awesome-query-builder/ui/css/compact_styles.css';



const InitialConfig = BasicConfig;
const config = {
  ...InitialConfig,
  fields: {
    // qty: {
    //   label: 'Qty',
    //   type: 'number',
    //   fieldSettings: {
    //     min: 0,
    //   },
    //   valueSources: ['value'],
    //   preferWidgets: ['number'],
    // },
    // price: {
    //   label: 'Price',
    //   type: 'number',
    //   valueSources: ['value'],
    //   fieldSettings: {
    //     min: 10,
    //     max: 100,
    //   },
    //   preferWidgets: ['slider', 'rangeslider'],
    // },
    log: {
      label: 'Log',
      type: 'text',
    },
    // color: {
    //   label: 'Color',
    //   type: 'select',
    //   valueSources: ['value'],
    //   fieldSettings: {
    //     listValues: [
    //       { value: 'yellow', title: 'Yellow' },
    //       { value: 'green', title: 'Green' },
    //       { value: 'orange', title: 'Orange' }
    //     ],
    //   }
    // },
    // is_promotion: {
    //   label: 'Promo?',
    //   type: 'boolean',
    //   operators: ['equal'],
    //   valueSources: ['value'],
    // },
  }
};

// You can load query value from your backend storage (for saving see `Query.onChange()`)
const queryValue = {"id": QbUtils.uuid(), "type": "group"};

//class QueryBuilder extends Component {
const QueryBuilder = (props) => {
const newQueryValue = props.build_query ? JSON.parse(props.build_query) : queryValue;
const [state, setState] = useState({tree: QbUtils.checkTree(QbUtils.loadTree(newQueryValue), config), config: config });
  renderBuilder = (props) => (
    <div className="col-md-12">
      <label>Rule Builder</label>
      <Builder {...props} />
    </div>
  )

  renderResult = ({tree: immutableTree, config}) => (
    <div className="query-builder-result">
      <div>Query string: <pre>{JSON.stringify(QbUtils.queryString(immutableTree, config))}</pre></div>
      {/*<div>MongoDb query: <pre>{JSON.stringify(QbUtils.mongodbFormat(immutableTree, config))}</pre></div>*/}
      {/*<div>SQL where: <pre>{JSON.stringify(QbUtils.sqlFormat(immutableTree, config))}</pre></div>*/}
      {/*<div>JsonLogic: <pre>{JSON.stringify(QbUtils.jsonLogicFormat(immutableTree, config))}</pre></div>*/}
    </div>
  )
  
  onChange = (immutableTree, config) => {
    // Tip: for better performance you can apply `throttle` - see `examples/demo`
    setState({tree: immutableTree, config: config});

    const jsonTree = QbUtils.getTree(immutableTree);
    //console.log(jsonTree);
    props.setbuild_query(JSON.stringify(jsonTree));
    const mongo_qry = JSON.stringify(QbUtils.mongodbFormat(immutableTree, config));
    if(mongo_qry)
    {
    props.setmongo_query(mongo_qry);
    }
    // `jsonTree` can be saved to backend, and later loaded to `queryValue`
  }
  return (
    <div>
      <Query
        {...config} 
        value={state.tree}
        onChange={onChange}
        renderBuilder={renderBuilder}
      />
      {renderResult(state)}
    </div>
  )

  
}
export default QueryBuilder;