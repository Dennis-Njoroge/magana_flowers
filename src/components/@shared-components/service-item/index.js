import {Avatar, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {getInitials} from "@/utils/helper-functions";

const ServiceItem = props => {
    const { name, onClick, icon, color='primary.main'} = props;

    return (
        <>
            <Box  sx={{ backgroundColor: 'neutral.100', p:2, gap:1, borderRadius: 1, width: 120, maxHeight: 120, display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <Avatar
                    color={'primary.main'}
                    sx={{ backgroundColor: 'primary.main'}}
                >
                    {getInitials(name, '')}
                </Avatar>
                <Typography align={'center'} variant={'caption'} fontWeight={'bold'}>
                    {name}
                </Typography>
            </Box>
        </>
    )
}

export default ServiceItem;