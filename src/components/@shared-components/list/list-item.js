import {alpha, Avatar, ListItem, ListItemAvatar, ListItemText, useMediaQuery} from "@mui/material";
import {getInitials} from "@/utils/helper-functions";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const DMTListItem = props => {
    const { name, description, amount, image = null, ...other} = props;
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("xs"), {
        noSsr: true,
    });
    return(
        <>
            <ListItem
                alignItems="flex-start"
                secondaryAction= {Boolean(amount) ?
                <Box sx={{ mb: {sm: 3, md: 1, xs: 3}}}>
                    {amount}
                </Box>
                    : ""
            }
                {...other}
            >
                {lgUp && (
                    <ListItemAvatar>
                        <Avatar
                            src={image}
                            variant={'square'}
                            sx={{
                                width: 40,
                                height: 40,
                                color: 'text.primary',
                                backgroundColor: theme => alpha(theme.palette.info.main, 0.1),
                            }}
                        />

                    </ListItemAvatar>
                )}

                <ListItemText
                    primary={name}
                    primaryTypographyProps={{
                        variant: 'body1',
                        fontWeight: 'bold',
                    }}
                    secondary={description}
                    secondaryTypographyProps={{
                        variant: 'caption',
                    }}
                />
            </ListItem>
        </>
    )
}

export default DMTListItem;