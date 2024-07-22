import Box from "@mui/material/Box";
import {Icon, Typography} from "@mui/material";
import {
    MdChevronRight as ChevronRight,
    MdOutlineExpandMore as ExpandMore
} from "react-icons/md";
import Badge from "@mui/material/Badge";

const SidebarMenuButton = props => {
    const {badgeCount= 0, open, icon, width='auto', isActive, label, color = 'inherit', backgroundColor, isParent = false ,...others} = props;

    return (
        <>
            <Box sx={{
                borderRadius: 0.5,
                border: isActive ? 1 : 'none',
                borderColor: isActive ? "primary.main" : color,
                backgroundColor: isActive ? 'neutral.100' : backgroundColor,
                mx: -0.5,
                width: width,
                overflow: 'hidden',
                transition: 'background-color 0.3s',
                // '&:hover': {
                //     backgroundColor: !isParent ? 'neutral.300' : isActive ? 'neutral.300' : backgroundColor,
                // },
                //backdropFilter: 'blur(90px)',
            }}
                 {...others}
            >
                <Box sx={{
                    //width: '100%',
                    display: 'flex',
                    cursor: 'pointer',
                    color: isActive ? "primary.main" : color,
                    justifyContent: 'flex-start',
                    //justifyContent: 'center',
                    alignItems: 'center',
                    gap:2,
                    py:1,
                    px:1,
                    '&:hover': {
                        color:  !isActive ? 'neutral.600' : "primary.main"
                    },
                }}

                >
                    <Badge badgeContent={badgeCount} color="primary">
                    <Icon fontSize={isParent ? 'medium' : 'small'} color={"inherit"}>
                        {icon}
                    </Icon>
                    </Badge>
                    <Typography   variant={'subtitle1'} color={"inherit"}>
                        {label}
                    </Typography>
                    <Box flex={'1 0 auto'}/>

                    {Boolean(isParent) &&(
                        <>

                            {!open ? (
                                <ChevronRight color={"inherit"}  />
                            ) : (
                                <ExpandMore color={"inherit"}  />
                            )
                            }
                        </>
                    )}
                </Box>
            </Box>

        </>
    )
}

export default SidebarMenuButton;