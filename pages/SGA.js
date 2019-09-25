import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

// Components
import Layout from '../components/Layout'
import SGAClub from '../components/SGAClub';
import SGAGym from '../components/SGAGym';

// Redux
import { connect } from 'react-redux';
import { setactivsgatab } from '../redux/actions/navActions';
import { SGACONTENT } from '../redux/actionTypes';

// Requetes
import fetch from 'isomorphic-unfetch';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

function SGA({ setactivsgatab, activeTab, sgaContent }) {
  const classes = useStyles();
  const theme = useTheme();

  function handleChange(event, newValue) {
    setactivsgatab(newValue);
  }

  function handleChangeIndex(index) {
    setactivsgatab(index);
  }

  return (
    <Layout>
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={activeTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="Présentation de la section féminine de gym de la SGA"
        >
          <Tab label="Le club" {...a11yProps(0)} />
          <Tab label="La Gym" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeTab}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={activeTab} index={0} dir={theme.direction}>
          <SGAClub club={sgaContent.club} />
        </TabPanel>
        <TabPanel value={activeTab} index={1} dir={theme.direction}>
          <SGAGym gym={sgaContent.gym} />
        </TabPanel>
      </SwipeableViews>
    </div>
    </Layout>
  );
}

SGA.getInitialProps = async function(ctx) {
  const data = await fetch(`http://sga-gymfeminine.fr/bo/wp-json/sga/v1/sga`);
  const sga = await data.json();

  ctx.store.dispatch({ type: SGACONTENT, payload: sga });
  return {
    club: sga.club,
    gym: sga.gym,
  };
};

const mapStateToProps = state => ({ 
  activeTab: state.activsgatab,
  sgaContent: state.sgacontent,
 });

export default connect(
  mapStateToProps,
  { setactivsgatab }
)(SGA);