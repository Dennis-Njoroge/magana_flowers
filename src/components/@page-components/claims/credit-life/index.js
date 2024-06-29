import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import BulkUpload from "@/components/@page-components/claims/credit-life/bulk-upload";
import {Card, CardContent} from "@mui/material";

const CreditLife = () => {
    return (
        <>
            <Container disableGutters={true}>
                <Card>
                    <CardContent>
                        <Grid container spacing={{ md: 3, xs:3, sm:3}}>
                            <Grid item xs={12} sm={12} md={12}>
                                <BulkUpload/>
                            </Grid>
                            {/*<Grid item xs={12} sm={12} md={3} lg={5}>*/}
                            {/*    <Grid container spacing={2}>*/}
                            {/*        <Grid item xs={12} sm={12} md={12}>*/}
                            {/*            <SearchCustomer claimType={claimsTypes.CREDIT_LIFE.value} onSearch={handleOnSearch}/>*/}
                            {/*        </Grid>*/}
                            {/*        <Grid item xs={12} sm={12} md={12}>*/}
                            {/*            <Collapse in={Boolean(customerDetails)}>*/}
                            {/*                <CustomerDetailsCard*/}
                            {/*                    customerDetails={customerDetails}*/}
                            {/*                    claimType={claimsTypes.CREDIT_LIFE.name}*/}
                            {/*                />*/}
                            {/*            </Collapse>*/}
                            {/*        </Grid>*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}
                            {/*<Grid item xs={12} sm={12} md={9} lg={7}>*/}
                            {/*    <Card sx={{ borderTop:3, borderColor: 'primary.main'}}>*/}
                            {/*        <CardContent>*/}
                            {/*            <Collapse in={Boolean(customerDetails)}>*/}
                            {/*                <CreditLifeForm*/}
                            {/*                    customerDetails={customerDetails}*/}
                            {/*                    resetCustomerDetails={resetCustomerDetails}*/}
                            {/*                />*/}
                            {/*            </Collapse>*/}
                            {/*            <Collapse in={!Boolean(customerDetails)}>*/}
                            {/*                <NoCustomer/>*/}
                            {/*            </Collapse>*/}
                            {/*        </CardContent>*/}
                            {/*    </Card>*/}
                            {/*</Grid>*/}
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}

export default CreditLife;