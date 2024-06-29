import {Card} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";

const AccountLinkCard = props => {
    const {icon, title, description, link} = props;
    const router = useRouter();

    const handleOnClick = async () => {
        await router.push(link)
    }

    return (
        <Card
            sx={{
                minHeight: '160px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                '&:hover': {
                    backgroundColor: 'neutral.100',
                    boxShadow: 8,
                    '& img': {
                        transform: 'rotate(360deg)', // Rotate the image/icon 360 degrees on hover
                        transition: 'transform 0.3s ease', // Add a smooth transition
                    },
                },
            }}
              elevation={5}
              onClick={handleOnClick}
        >
            <Box sx={{ p: 2 }}>
                {icon}
                <Typography variant={"h6"} gutterBottom>
                    {title}
                </Typography>
                <Typography variant={"body2"} sx={{ fontWeight: 'lighter'}} gutterBottom>
                    {description}
                </Typography>
            </Box>
        </Card>
    )
}

export default AccountLinkCard;