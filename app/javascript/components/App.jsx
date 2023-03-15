import React, { useContext, useEffect, useState } from 'react';
import {  Box,  Grid,  Main,  ResponsiveContext,  Page,  PageContent,  PageHeader} from 'grommet';
import { AppContainer } from './themes/AppContainer';
import { ContentArea } from './themes/ContentArea';
import Header from "./general/Header";
import Footer from "./general/Footer";
import Home from "../components/Home";

export const App = () => {
const [user, setUser] = useState({});
const [loading, setLoading] = useState(false);
const url = window.location.href;
useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    fetch("api/user_current")
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const size = useContext(ResponsiveContext);
  return (
    <AppContainer background="background-back">
      <ContentArea> <Header app_name="Rocket" user={user}  /></ContentArea>
      <Page>

        <PageContent className="card mb-4" style={{height: "860px"}} gap="large">
          {/*<PageHeader title={`Dashboard @ '${size}' Breakpoint`}     />*/}
          <Home user={user} />
        </PageContent>
      </Page>
      <ContentArea className="footer fixed-bottom" ><Footer user={user} /></ContentArea>
    </AppContainer>
  );
};

