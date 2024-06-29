import {alpha, Card, CardContent, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import PropertyItem from "@/components/@shared-components/list/property-item";
import {useSelector} from "react-redux";
import StoreLottie from "@/components/@shared-components/lottie-files/store-lottie";
import {formatDate, getMaskedName, maskString} from "@/utils/helper-functions";
import {claimsTypes} from "@/utils/constants";

const CustomerDetailsCard = ({ customerDetails, claimType }) => {

    if(!customerDetails){
        return null;
    }

    const formatValue = (value, firstLetters, lastLetters, isPhone = false ) => {
        if (claimType === claimsTypes.DAMAGE.name){
            return maskString(value, firstLetters, lastLetters, isPhone);
        }
        return value;
    }
    const formatCustomerName = (value ) => {
        if (claimType === claimsTypes.DAMAGE.name){
            return getMaskedName(value);
        }
        return value;
    }







    return (
        <>
            <Card sx={{ backgroundColor: theme => alpha(theme.palette.primary.main, 0.1)}}>
                <CardContent  sx={{ mt: -2, mx: -1,display:'flex', alignItems: 'center'}}>
                    <Box sx={{flex: 0.5}}>
                        <StoreLottie/>
                    </Box>
                    <Box sx={{ flex: 1, display:'flex',flexDirection: 'column', gap:1}}>
                        <Typography variant={'h6'} color={'primary'}>
                            {"Customer Details"}
                        </Typography>
                       <PropertyItem label={"Full Name"} value={formatCustomerName(customerDetails.customerName)}/>
                       <PropertyItem label={"ID No"} value={formatValue(customerDetails.idNumber, 2, -3)}/>
                       <PropertyItem label={"Phone Number"} value={formatValue(customerDetails.phoneNumber, 4, -3, true)}/>
                       <PropertyItem label={"Claim Type"} value={claimType}/>
                        <PropertyItem label={"Claim Date"} value={formatDate(new Date())}/>
                    </Box>
                </CardContent>

            </Card>
        </>
    )
}

export default CustomerDetailsCard;