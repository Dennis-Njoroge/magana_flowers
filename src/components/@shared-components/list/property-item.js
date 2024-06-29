import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

const PropertyItem = ({ label, value, ...other }) => {
    return (
        <Box sx={{ display: 'flex', gap:1}} {...other}>
            <Typography variant={'body2'}>
                {label}: {` `}
            </Typography>
            <Typography variant={'body2'} fontWeight={'bold'}>
                {value ?? '-'}
            </Typography>
        </Box>
    )
}

export default PropertyItem;