import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import { IoIosNotificationsOutline } from "react-icons/io";

const NotificationBadge = () => {
    return (
        <>
            <Box sx={{ color: 'action.active' }}>
                <Badge color="secondary" variant="dot" badgeContent=" ">
                    <IoIosNotificationsOutline size={'25px'}/>
                </Badge>
            </Box>
        </>
    )
}

export default NotificationBadge;