import React, { useContext } from 'react';
import { Box, Button, Footer, ResponsiveContext, Text } from 'grommet';
import {  History } from 'grommet-icons';
const footer_margin  = {  margintop: 100 } ;

const FooterExample = (props) => {
  const user = props.user;
  const size = useContext(ResponsiveContext);
  // const year = new Date().getFullYear();

  return (
    <Footer
      background="background-front"
      direction={!['xsmall', 'small'].includes(size) ? 'row' : 'column'}
      align={!['xsmall', 'small'].includes(size) ? 'center' : undefined}
      pad={{ horizontal: 'medium', vertical: 'small' }}
      fill="horizontal" style= {footer_margin}
    >
      <Box
        direction={!['xsmall', 'small'].includes(size) ? 'row' : 'column'}
        align={!['xsmall', 'small'].includes(size) ? 'center' : undefined}
        gap="xsmall"
      >
        <Text size="small">
          &copy; 2023 Hewlett Packard Enterprise Development LP
        </Text>
      </Box>
      <Box
        direction="row"
        align={!['xsmall', 'small'].includes(size) ? 'center' : undefined}
        gap="xsmall"
        wrap
      >
       </Box>
    </Footer>
  );
};

export default FooterExample