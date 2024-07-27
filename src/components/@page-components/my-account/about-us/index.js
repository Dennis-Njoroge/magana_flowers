import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
import {Logo} from "@/components/logo";

const AboutUs = () => {
    return (
        <>
            <Box>
                <Logo/>
                <Typography gutterBottom>
                    Magana Flowers Kenya Limited has over 20 years’ experience in growing and exporting flowers to
                    various parts of the world.
                </Typography>
                <Typography gutterBottom>
                    Situated  just 40 minutes from the main international airport, we are proud of our evolution
                    from a mid-scale operation to a fully hydroponic 18.5 hectares rose farm.
                    At 2000 meters above sea level, the climate at Magana Flowers is most favorable for growing the best quality roses with large head-size,
                    richer color and longer vase-life exceeding the industry standard sizes.
                </Typography>
                <Typography gutterBottom>
                    At Magana Flowers, we believe that variety is the spice of life. We grow 3 categories of roses – Sprays, Intermediates and T-hybrids
                    and have over 40 award winning flower varieties.
                </Typography>
               <Typography variant={'h6'} gutterBottom>
                   Certifications & Memberships
               </Typography>
                <Typography gutterBottom>
                    Magana Flowers Kenya Limited is certified by the <b>Kenya Flower Council (silver standard),
                    the Good Agricultural Practice - GlobalG.A.P (silver standard) and
                    the Fairtrade Labelling Organization International (FLO). </b>
                    We are also recognized and certified by other auditing bodies including
                    <b>FPEAK, MPS, Sedex, ETI, LEAF and Wait Rose.</b>
                </Typography>
            </Box>
        </>
    )
}

export default AboutUs;