import React from 'react';
import PropTypes from 'prop-types';
import {
  CardActionArea,
  Card,
  CardContent,
  CardActions,
  Typography,
  makeStyles,
  Link
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const ProductCard = ({ className, product, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.text}
          </Typography>
        </CardContent>
      </CardActionArea>
      {product.link && (
        <CardActions>
          <Link href={product.link}>Link</Link>
        </CardActions>
      )}
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ProductCard;
