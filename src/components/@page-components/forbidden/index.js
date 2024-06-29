import {Button, Card, CardContent, Icon, Typography} from "@mui/material";
import NextLink from "next/link";
import Box from "@mui/material/Box";

const Forbidden = () => {
    return (
        <>
            <Card>
                <CardContent sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap:1
                }}
                >
                    <Box sx={{
                        fontSize:{ xs: 80, sm: 120 },
                        fontWeight: 600,
                        //lineHeight: 2,
                        textShadow: '10px 6px 8px hsla(0,0%,45.9%,.8)',
                        color: 'warning.main'
                    }}
                    >
                        403
                    </Box>
                    <Typography variant={'h6'} color={'primary.main'}>
                        {"You are not permitted to access this page."}
                    </Typography>
                    <Typography gutterBottom>
                        {"The page you are trying to access has restricted access."}
                    </Typography>
                    <NextLink href={'/dashboard'} passHref={true}>
                        <Button variant={'contained'} color={'primary'} startIcon={<Icon>arrow_back</Icon>}>
                            {"Go Back Home"}
                        </Button>
                    </NextLink>

                </CardContent>
            </Card>
        </>
    )
}

export default Forbidden;