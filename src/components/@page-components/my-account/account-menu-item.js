import {alpha, Avatar, Card, Icon, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

const AccountMenuItem = ({ item, onSelect }) => {
    return (
        <>
            <Card
                sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between', p:2}}
            >
              <Box sx={{ display: 'flex', gap:2}}>
                  <Avatar
                      variant={'rounded'}
                      sx={{
                          height: 40,
                          width: 40,
                          backgroundColor: theme => alpha(theme.palette.primary.main, 0.1),
                          color: 'primary.main',
                      }}
                  >
                      <Icon size={'large'}>
                          {item.icon}
                      </Icon>
                  </Avatar>
                  <Box>
                      <Typography variant={'subtitle2'} fontWeight={'bold'}>
                          {item.name}
                      </Typography>
                      <Typography variant={'caption'}>
                          {item.description}
                      </Typography>
                  </Box>
              </Box>
                <Box>
                    <IconButton onClick={() => onSelect(item)}>
                        <Icon>
                            {"arrow_forward_ios"}
                        </Icon>
                    </IconButton>
                </Box>
            </Card>
        </>
    )
}

export default AccountMenuItem;