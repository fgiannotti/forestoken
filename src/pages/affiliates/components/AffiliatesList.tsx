import {
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  Typography,
  CardContent,
  Button,
  CardActions,
} from '@mui/material';

import image from 'src/client/assets/affiliate-alt.png';

const AffiliatesList = ({ affiliates }) => {
  return (
    <Grid
      sx={{ flexGrow: 1, mt: 3 }}
      container
      justifyContent="center"
      spacing={2}
    >
      {affiliates.map((affiliate, index) => (
        <Grid key={index} item>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="140"
                image={image.src}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {affiliate.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {affiliate.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {affiliate.account}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Compartir
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AffiliatesList;
