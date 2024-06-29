import {Card, CardContent, Divider} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import arrowRightImg from '@/icons/arrow_right.svg';
import Image from 'next/image';
import NextLink from "next/link";


const SummaryCard = props => {
    const { title, description, icon, path, ...other} = props;
    return (
        <Card elevation={5} {...other}>
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Typography variant={'h5'}>
                        {title}
                    </Typography>
                    {path && (
                        <NextLink href={path} passHref>
                            <Image
                                src={arrowRightImg}
                                alt=""
                            />
                        </NextLink>
                    )}

                </Box>
                <Divider sx={{ my:1 }}/>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Box>
                        {description}
                    </Box>
                    {icon}
                </Box>
            </CardContent>
        </Card>
    )
}

export default SummaryCard;