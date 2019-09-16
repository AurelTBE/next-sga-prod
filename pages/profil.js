import Layout from '../components/Layout'
import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// Redux
import { connect } from 'react-redux';
import { deauthenticate } from '../redux/actions/authActions';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
    },
    media: {
      maxWidth: "100%",
    },
    content: {
      textAlign: 'left',
      '& figure': {
        textAlign: 'center',
      },
    }
  }));

function Profil({name, deauthenticate}) {
    const classes = useStyles();
    return (
        <Layout>
            <Grid container justify="center" className={classes.root}>
                <Grid item xs={10}>
                    <Typography component="h2" variant="h2" gutterBottom>
                        Profil
                    </Typography>
                    {name ? <Typography component="div" variant="body1" gutterBottom>
                      Bonjour {name}, bienvenue sur ton profil
                    </Typography> : null}
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={deauthenticate}
                    >
                      Déconnexion
                    </Button>
                </Grid>
            </Grid>
        </Layout>
    )
}

const mapStateToProps = state => ({ 
  isAuthenticated: !!state.authentication.token,
  name: state.authentication.token.user_display_name,
 });

export default connect(
  mapStateToProps,
  { deauthenticate }
)(Profil);