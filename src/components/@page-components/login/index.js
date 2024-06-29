import LoginBanner from "@/components/@page-components/login/login-banner";
import LoginForm from "@/components/@page-components/login/login-form";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {useState} from "react";
import OtpForm from "@/components/@shared-components/forms/otp-form";
import {Collapse} from "@mui/material";
import {authApi} from "@/services/auth-apis";
import {useAuth} from "@/hooks/use-auth";
import {useRouter} from "next/router";
import {toast} from "react-toastify";


const Login = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [userId, setUserId] = useState(null);
    const { login } = useAuth();
    const router = useRouter();

    const handleOnNext = () => {
        setActiveStep(prevState => prevState+1);
    }

    const handleOnLogin = async (values, callBackFunc) => {
        try{
            const formData = {
                email: values.email,
                password: values.password
            }
            const res = await authApi.Login(formData);
            if (res.token){
                await login(res);
                return;
            }
            //sends the response to the form
             callBackFunc(res?.errorMsg ?? 'Oops! An error occurred, Try again');
        }
        catch (e) {
            callBackFunc(e.message);
        }
    }

    const handleSubmitOTP = async (values, callBackFunc) => {
        try{
            const formData = {
                ...values,
                userId: userId?.id,
                shopType: userId?.shopType,
            }
            const res = await authApi.validateOTP(formData);
            if (res.token){
                await login(res);
                await router.push('/dashboard');
            }
            else{
                toast.error('An error occurred! Try again')
            }
        }
        catch (e) {
            callBackFunc(e.message);
        }
    }
    const handleOnResendOTP = async (callBackFunc) => {
        try{
           const res  = await authApi.resendOTP({
               userId: userId?.id,
               shopType: userId?.shopType,
           });
           if (res.success){
               callBackFunc(null);
               toast.success(Boolean(res?.errorMsg) ? res?.errorMsg  : `OTP has been sent to your phone number.`)
           }
           else{
               callBackFunc(null);
               toast.error(Boolean(res?.errorMsg) ? res?.errorMsg  : 'An error occurred! Try again')
           }

           //callBackFunc(res?.errorMsg);
           return res.success;
        }
        catch (e) {
            toast.success(e.message)
            return false;
        }
    }

 return (
     <>
         <Grid  container spacing={{md:4, sm:2, xs:2}} alignItems={'center'} sx={{ height: 'inherit'}}>
             <Grid sx={{ display: {sm: 'none', xs:'none', md:'inherit'}}} p={4} item xs={0} sm={0} md={3}>
                 {/*<LoginBanner/>*/}
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
                     <Collapse in={activeStep === 0}>
                         {activeStep === 0 &&(
                             <LoginForm onLogin={handleOnLogin} />
                         )}
                     </Collapse>
                     {/*<Collapse in={activeStep === 1}>*/}
                     {/*    {activeStep === 1 &&(*/}
                     {/*        <OtpForm*/}
                     {/*            onSuccess={handleSubmitOTP}*/}
                     {/*            message = {"An OTP has been sent to your phone number"}*/}
                     {/*            onResendOTP={handleOnResendOTP}*/}
                     {/*        />*/}
                     {/*    )}*/}
                     {/*</Collapse>*/}
                 </Box>
             </Grid>
             <Grid sx={{ display: {sm: 'none', xs:'none', md:'inherit'}}} p={4} item xs={0} sm={0} md={3}>
                 {/*<LoginBanner/>*/}
             </Grid>
         </Grid>
     </>
 )
}

export default Login;