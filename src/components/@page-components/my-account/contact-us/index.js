import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

const ContactUs = () => {
    return (
        <>
            <Box>
                <Typography gutterBottom>
                    We value your feedback and are here to assist you with any questions or concerns you may have.
                    <br/>
                    Please feel free to reach out to us through any of the following methods:
                </Typography>
                <Typography gutterBottom>
                    <b>Customer Service Hours:</b>
                    <br/>
                    Monday to Friday: 9:00 AM - 6:00 PM
                    <br/>
                    Saturday: 10:00 AM - 4:00 PM
                    <br/>
                    Sunday: Closed
                    <br/>
                </Typography>
                <Typography gutterBottom>
                    <b>Email:</b>
                    <br/>
                    For general inquiries, please email us at:
                    <Typography component={'a'} href={'mail:info@maganaflowers.com'}> info@maganaflowers.com</Typography>
                </Typography>
                <Typography gutterBottom>
                    <b>Phone:</b>
                    <br/>
                    You can call our customer service team at:
                    <Typography component={'a'} href={'tel: +254712345678'}> +254 7123 45678</Typography>
                </Typography>
            </Box>
        </>
    )
}

export default  ContactUs;