import {Box, Collapse, ListItem, useTheme} from "@mui/material";
import NextLink from "next/link";
import PropTypes from "prop-types";
import { useState } from "react";
import SidebarMenuButton from "@/components/@shared-components/buttons/sidebar-menu-button";
import RoleGuard from "@/hocs/role-guard";
import {useSelector} from "react-redux";


const ModernSidebarItem = (props) => {
    const {
        active,
        children,
        disabled,
        chip,
        depth,
        icon,
        role,
        bold= false,
        info,
        open: openProp,
        path,
        title,
        key,
        ...other
    } = props;
    const [open, setOpen] = useState(!!openProp);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const theme = useTheme();
    const { cartCount } = useSelector(({ cart }) => cart);


    // Branch
    if (children) {
        return (
            <>
                <RoleGuard path={path}>
                    <ListItem
                        disableGutters
                        sx={{
                            display: "block",
                            mb: 0.5,
                            py: 0.5,
                            px: 1,
                            width: '100%',
                        }}
                        {...other}
                    >
                        <SidebarMenuButton
                            icon = {icon}
                            isActive={active}
                            onClick={handleToggle}
                            label={title}
                            open={open}
                            color={theme.palette.mode === 'light' ? "text.primary" : "text.primary"}
                            backgroundColor={"transparent"}
                            isParent = {true}
                        />
                        <Collapse in={open} sx={{ mt: 0.5}}>
                            <Box sx={{ py:0.5, borderRadius:1}}>
                                {children}
                            </Box>
                        </Collapse>
                    </ListItem>
                </RoleGuard>
            </>
        );
    }

    // Leaf
    return (
        <RoleGuard path={path}>
            <ListItem
                disableGutters
                sx={{
                    display: "flex",
                    mb: 0.5,
                    py: 0.5,
                    px: 1,
                }}
            >
                <NextLink style={{width: '100%', textDecoration: "none"}} href={path ?? "/"} passHref>
                    <SidebarMenuButton
                        badgeCount={Boolean(path?.includes('cart')) ? cartCount : 0}
                        isActive={active}
                        icon = {icon}
                        label={title}
                        open={open}
                        color={theme.palette.mode === 'light' ? "text.primary" : "text.primary"}
                        backgroundColor={"transparent"}
                    />
                </NextLink>
            </ListItem>

        </RoleGuard>
    );
};

ModernSidebarItem.propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    depth: PropTypes.number.isRequired,
    icon: PropTypes.node,
    info: PropTypes.node,
    open: PropTypes.bool,
    path: PropTypes.string,
    title: PropTypes.string.isRequired,
};

ModernSidebarItem.defaultProps = {
    active: false,
    open: false,
};

export default ModernSidebarItem;
