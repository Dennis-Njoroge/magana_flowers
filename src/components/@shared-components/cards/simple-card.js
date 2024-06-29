import {Card, CardContent} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const SimpleCard = props => {
    const { title, value, description} = props;
    return (
        <Card elevation={5}>
            <CardContent sx={{ my: -2}}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap:1 }}>
                    <Typography variant={'body2'}>
                        {title}
                    </Typography>
                    <Typography variant={'h5'}>
                        {value}
                    </Typography>
                    <Box>
                        {description}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default SimpleCard;