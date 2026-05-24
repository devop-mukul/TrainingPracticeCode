import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating';

export default function ProductCard({ image, title, description, price, rating }) {
  return (
    <Card sx={{ maxWidth: 300, display:'flex', flexDirection:'column', justifyContent:'center' }}>
        <CardMedia
            sx={{ objectFit:'contain' }}
            component="img"
            height="200"
            image={image}
            alt={title}
        />
        <CardContent>
            <Typography variant="h6" component="div" sx={{fontWeight:'bold', minHeight:'60px'}}>
                {title}
            </Typography>
            <Typography variant='subtitle1' >
                ${price}
            </Typography>
            <Rating
                sx={{p:0.5}}
                name="simple-controlled"
                value={rating.rate}
                // onChange={(e) => {
                //     setValue(newValue);
                // }}
            />

            <Typography gutterBottom variant="body2" sx={{color:'gray', minHeight:4}}>
                {description.slice(0, 80)}...
            </Typography>
        </CardContent>
        <CardActions sx={{mt:'auto', pl:2, pb:2}}>
            <Button size="small" variant="contained">Buy</Button>
        </CardActions>

    </Card>
  );
}