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
      spacing={4}
    >
      {affiliates.map((affiliate, index) => (
        <Grid key={index} item>
          <Card sx={{ maxWidth: 345, with: 323 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="140"
                image={image.src}
                alt="green iguana"
              />
              <CardContent sx={{ width: 323 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {affiliate.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {affiliate.location}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                <a href={affiliate.link} target="_blank">
                  Ver en mapa
                </a>
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AffiliatesList;
