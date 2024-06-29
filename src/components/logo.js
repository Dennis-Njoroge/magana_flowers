import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Image from "next/image";
import logoImg from "@/static/logo.png";


export const Logo = styled((props) => {
    const { variant,width= 150, ...other } = props;
    return (
        <Box sx={{ backgroundColor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center', px:2, borderRadius: 1, width: '100%' }}>
            <Image src={logoImg} alt={'Logo'} width={width}/>
        </Box>
    );
})``;
