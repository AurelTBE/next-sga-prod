import { makeStyles, useTheme } from '@material-ui/core/styles';
// MUI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

// Modal
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Masonry
import Masonry from 'react-masonry-css';

// Redux
import { connect } from 'react-redux';
import { setactivideo } from '../../redux/actions/contActions'


// Player
import YouTubePlayer from 'react-player/lib/players/YouTube';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: "100%",
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  masonryGrid: {
    display: 'flex',
    marginLeft: 0,
    width: "100%",
  },
  masonryColumn: {
    paddinLeft: 0,
  },
  image: {
    position: "relative",
    width: "100%",
  },
  caption: {
    position: "absolute",
    bottom: 0,
    left: 0,
    color: theme.palette.background.paper,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingBottom: 10,
    paddingTop: 10,
    width: "100%",
  },
  icon: {
    position: "absolute",
    color: theme.palette.background.paper,
    fontSize: 60,
    top: "41%",
    left: "42%",
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

function MediaVideos({agres, vids, setactivideo, vidplay}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  
  function handleClickOpen(vid) {
    setactivideo(vid)
    setOpen(true);
  }

  function handleClose() {
    setOpen(false)
  }

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const labelProps = {
    size: isSmallScreen ? "small" : "large"
  };

  const breakpointColumnsObj = {
    default: 5,
    1400: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
  <>
    <Grid container direction="row" justify="center" alignItems="stretch" spacing={2}>
      {/* Agrès */}
      {agres.map(ag => (
        <div className={classes.root}>
          <Box
            display="flex" 
            color="background.paper"
            bgcolor={theme.palette.secondary.main}
            fontFamily="h6.fontFamily"
            fontSize={{ xs: 'h6.fontSize', md: 'h5.fontSize' }}
            p={{ xs: 2, sm: 3, md: 4 }}
            justifyContent="center"
            alignItems="center"
            height={{xs: 60, md: 120}}
            width={1}
            key={ag}
          >
            <Typography component="h3" variant={isSmallScreen ? "h4" : "h2"}>
              {ag}
            </Typography>
          </Box>
          <Masonry breakpointCols={breakpointColumnsObj} className={classes.masonryGrid} columnClassName={classes.masonryColumn}>
          {vids.map((vid) => (
            vid.agres == ag && 
            <ButtonBase key={vid.lien_youtube} onClick={() => handleClickOpen(vid)}>
              <img src={vid.thumbnail} alt={`${vid.degre} (${vid.saison})`} className={classes.image} />
              <PlayCircleOutlineIcon className={classes.icon} />
              <Box className={classes.caption} width={1}><Typography variant="h5">{`${vid.degre} (${vid.saison})`}</Typography></Box>
            </ButtonBase> 
          ))}
          </Masonry>
        </div>
      ))}
      {/* <ReactPlayer url={vid.lien_youtube} /> */}
      
    </Grid>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      maxWidth={false}
    >
      <DialogTitle id="responsive-dialog-title">
        {vidplay && <Typography variant="h6">{`${vidplay.degre} (${vidplay.saison})`}</Typography>}
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {vidplay && <YouTubePlayer url={vidplay.lien_youtube} controls />}
      </DialogContent>
    </Dialog>
  </>
)}

export default connect(
  state => state,
  { setactivideo }
)(MediaVideos); 