import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Rating from '@mui/material/Rating';

export default function ProductCard({ image, title, description, price, rating }) {
  return (
    <Card 
        sx={{ 
            maxWidth: 300, 
            display:'flex', 
            flexDirection:'column', 
            justifyContent:'center',
            bgcolor: 'background.paper',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease-in',
            boxShadow: 1,
            '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 5,
                backgroundColor: 'action.hover'
            }
        }}>
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
                sx={{p:0, justifyContent:'left'}}
                name="read-only"
                value={rating.rate}
                readOnly
                // onChange={(e) => {
                //     setValue(newValue);
                // }}
            />

            <Typography gutterBottom variant="body2" sx={{color:'text.secondary', minHeight:4}}>
                {description.slice(0, 80)}...
            </Typography>
        </CardContent>
        <CardActions sx={{mt:'auto', pl:2, pb:2}}>
            <Button size="small" variant="contained">Buy</Button>
        </CardActions>

    </Card>
  );
}