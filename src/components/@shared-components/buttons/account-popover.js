import {
  Box, Icon,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import {useAuth} from "@/hooks/use-auth";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const router = useRouter();
  const { logout } = useAuth();
  // To get the user from the authContext, you can use
  // const { user } = useAuth();

  const handleLogout = async () => {
    try {
      onClose?.();
      await logout();
      router.push("/").catch(console.error);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      keepMounted
      onClose={onClose}
      open={!!open}
      //PaperProps={{ sx: { width: 200 } }}
      transitionDuration={0}
      {...other}
    >

      <Box sx={{ my: 1 }}>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Icon>
              {'logout'}
            </Icon>
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body2">Logout</Typography>}
          />
        </MenuItem>
      </Box>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
