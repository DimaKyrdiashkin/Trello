import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import { Сatalog } from './Сatalog';
import Toolbar from './Toolbar';
import fire from 'src/config/fire-conf';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ProductList = () => {
  const classes = useStyles();
  const [dataCatalog, setDataCatalog] = useState({});
  const [catalogKnow, setCatalogKnow] = useState([]);
  useEffect(() => {
    const data = fire.database();
    data.ref('knowledge').on('child_added', data => {
      setDataCatalog(prevState => ({
        ...prevState,
        [data.key]: Object.values(data.val())
      }));
    });
    data.ref('knowledge').on('child_added', data => {
      setCatalogKnow(prevState => [...prevState, data.key]);
    });
  }, []);

  return (
    <Page className={classes.root} title="Products">
      <Container maxWidth={false}>
        <Toolbar catalog={catalogKnow} dataCatalog={dataCatalog} />
        <Box mt={3}>
          <Сatalog catalog={catalogKnow} dataCatalog={dataCatalog} />
        </Box>
      </Container>
    </Page>
  );
};

export default ProductList;
