import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import SearchCustomer from "@/components/@shared-components/search-customer";
import CustomerDetailsCard from "@/components/@page-components/claims/customer-details";
import {useState} from "react";
import {Card, CardContent, Collapse} from "@mui/material";
import NoCustomer from "@/components/@page-components/claims/no-customer";
import TheftForm from "@/components/@page-components/claims/theft/theft-form";
import {claimsTypes} from "@/utils/constants";

const Theft = () => {
    const [customerDetails, setCustomerDetails] = useState(null);
    const [savedClaim, setSavedClaim] = useState(null)

    const handleOnSelectClaim = (claim) => {
        setSavedClaim(claim);
    }

    const handleOnSearch =  values => {
        setCustomerDetails(values)
    }

    const resetCustomerDetails = () => {
        setCustomerDetails(null);
    }

    return (
        <>
            <Container disableGutters={true}>
                <Grid container spacing={{ md: 3, xs:3, sm:3}}>
                    <Grid item xs={12} sm={12} md={3} lg={5}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12}>
                                <SearchCustomer
                                    onSelectClaim={handleOnSelectClaim}
                                    claimType={claimsTypes.THEFT.value}
                                    onSearch={handleOnSearch}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Collapse in={Boolean(customerDetails)}>
                                    <CustomerDetailsCard
                                        customerDetails={customerDetails}
                                        claimType={claimsTypes.THEFT.name}
                                    />
                                </Collapse>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} lg={7}>
                        <Card sx={{ borderTop:3, borderColor: 'primary.main'}}>
                            <CardContent>
                                <Collapse in={Boolean(customerDetails)}>
                                    <TheftForm
                                        onSelectClaim={handleOnSelectClaim}
                                        savedClaim={savedClaim}
                                        customerDetails={customerDetails}
                                        resetCustomerDetails={resetCustomerDetails}
                                    />
                                </Collapse>
                                <Collapse in={!Boolean(customerDetails)}>
                                    <NoCustomer/>
                                </Collapse>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Theft;