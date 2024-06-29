import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const AuthLayout = props => {
    const { children } = props;

    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                backgroundImage: 'url(/static/background.jpg)',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                pb:5
            }}>
                <Container sx={{ height: 'fit-content'}} maxWidth={'lg'}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap:2,
                    }}>
                        {children}
                    </Box>
                </Container>

            </Box>

        </>
    )
}


export default AuthLayout;