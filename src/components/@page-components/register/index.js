import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {authApi} from "@/services/auth-apis";
import RegisterBanner from "@/components/@page-components/register/register-banner";
import RegisterForm from "@/components/@page-components/register/register-form";
import {useRouter} from "next/router";
import {toast} from "react-toastify";



const Register = () => {
    const router = useRouter();
    const handleOnRegister = async (values, callBackFunc) => {
        try{
            const formData = {
                first_name: values.firstName,
                last_name: values.lastName,
                username: `${values.firstName} ${values.lastName}`,
                phoneNumber: values.lastName,
                user_type: "customer",
                status: 'pending',
                email: values.email,
                password: values.password
            }
            const res = await authApi.Register(formData);
            if (res.success){
               await router.push('/auth/login');
               toast.success('Account registered successfully!')
            }
            //sends the response to the form
             callBackFunc(res?.errorMsg ?? 'Oops! An error occurred, Try again');
        }
        catch (e) {
            callBackFunc(e.message);
        }
    }
    

 return (
     <>
         <Grid container spacing={{md:4, sm:2, xs:2}} alignItems={'center'}>
             <Grid sx={{ display: {sm: 'none', xs:'none', md:'inherit'}}} p={4} item xs={0} sm={0} md={3}>
                 {/*<RegisterBanner/>*/}
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
                  <RegisterForm
                      onRegister={handleOnRegister}
                  />
                 </Box>
             </Grid>
             <Grid sx={{ display: {sm: 'none', xs:'none', md:'inherit'}}} p={4} item xs={0} sm={0} md={3}>
                 {/*<RegisterBanner/>*/}
             </Grid>
         </Grid>
     </>
 )
}

export default Register;