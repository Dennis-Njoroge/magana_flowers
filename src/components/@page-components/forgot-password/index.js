import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {useState} from "react";
import {Collapse} from "@mui/material";
import {authApi} from "@/services/auth-apis";
import {useAuth} from "@/hooks/use-auth";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import ForgotPasswordForm from "@/components/@page-components/forgot-password/forgot-password-form";


const ForgotPassword = () => {
 return (
     <>
         <Grid  container spacing={{md:4, sm:2, xs:2}} alignItems={'center'} sx={{ height: 'inherit'}}>
             <Grid sx={{ display: {sm: 'none', xs:'none', md:'inherit'}}} p={4} item xs={0} sm={0} md={0}>
             </Grid>
             <Grid item xs={12} sm={12} md={6}>
                 <Box sx={{
                     display: 'flex',
                     justifyContent: 'center',
                     flexDirection:'column',
                     alignItems:'center',
                     gap: 2,
                     p:{md: 6, sm: 2, xs:1 }
                 }}>
                     <ForgotPasswordForm />
                 </Box>
             </Grid>
             <Grid sx={{ display: {sm: 'none', xs:'none', md:'inherit'}}} p={4} item xs={0} sm={0} md={3}>
             </Grid>
         </Grid>
     </>
 )
}

export default ForgotPassword;