import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import { red } from '@material-ui/core/colors';
import Link from "next/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles(theme => ({
  card: {
    height: "100%",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: red[500],
  },
  logo: {
        maxWidth: "100%"
    }
}));

export default function ResultCard(props) {
  const classes = useStyles();

  const { titre, img, slug } = props;

  return (
    <Card className={classes.card}>
      <Link href="/resultats/[id]" as={`/resultats/${slug}`}>
        <CardActionArea>
          <ListItem>
            <CardHeader
              avatar={
                <Avatar aria-label="Recipe" className={classes.avatar}>
                  <FontAwesomeIcon icon={faTrophy} />
                </Avatar>
              }
              title={titre}
            />
          </ListItem>
          <CardMedia
            className={classes.media}
            image={img ? img : "/static/LOGO-CERTIFICATION.jpg"}
            title={titre}
          />
        </CardActionArea>
      </Link>
    </Card>
  );
}