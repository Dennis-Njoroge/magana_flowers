import {Card, CardContent, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import {sanitizeString} from "@/utils/helper-functions";
import DMTSearchInput from "@/components/@shared-components/forms/search-input";
import {LuSearch} from "react-icons/lu";
import Box from "@mui/material/Box";
import BulkUpload from "@/components/@page-components/claims/credit-life/bulk-upload";
import {claimsApis} from "@/services/claims-apis";
import {claimsTypes} from "@/utils/constants";
import {toast} from "react-toastify";
import SaveForLater from "@/components/@page-components/claims/save-for-later";

const SearchCustomer = ({ onSearch, claimType, onSelectClaim }) => {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading]  = useState(false);

    const handleOnChange = e => {
        const {value} = e.target;
        setQuery(sanitizeString(value));
    }

    const handleOnSelectSaved = async (claim) => {
        await searchCustomer(claim?.idNumber);
        onSelectClaim(claim)
    }

    const searchCustomer = async (searchQuery) => {
        setIsLoading(true);
        try{
            const res = await claimsApis.searchCustomer({ query: searchQuery });
            if (res.length > 0) {
                onSearch(res?.[0] ?? null)
            }
            else{
                onSearch(null)
                toast.error('Customer does not exist')
                //console.log('No customer found!');
            }
        }
        catch (e) {
            onSearch(null)
            toast.error('An error occurred, please try again later');
            console.log(e.message);
        }
        finally {
            setIsLoading(false);
        }
    }

    const handleOnSearch = async e => {
        e.preventDefault();
        await searchCustomer(query)
        onSelectClaim(null)
    }

    return (
        <>
            <Card sx={{ backgroundColor: `primary.main`, color: 'primary.contrastText'}}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap:2}}>
                    <Typography variant={'h6'} align={'center'}>
                        {"Identify the Customer"}
                    </Typography>
                    <Box component={'form'} onSubmit={handleOnSearch} sx={{display: 'flex', alignItems: 'center', py:1, px:2, minWidth:'300px', backgroundColor:'background.paper', borderRadius: 1,}}>
                        <DMTSearchInput
                            fullWidth={true}
                            size={'small'}
                            placeholder={'Search...'}
                            type={'text'}
                            value={query}
                            onChange={handleOnChange}
                            required={true}
                            InputProps={{
                                disableUnderline: true,
                                autoComplete: 'off',
                            }}
                        />
                        <Button
                            startIcon={ <LuSearch/>}
                            disabled={!Boolean(query) || isLoading}
                            variant={'contained'}
                            color={'warning'}
                            size={'small'}
                            type={'submit'}
                        >
                            {isLoading ? "Searching..." : "Search"}
                        </Button>
                    </Box>
                    <Typography variant={'caption'}>
                        {"Search by ID Number, Phone Number or IMEI Number"}
                    </Typography>
                    {claimType === claimsTypes.CREDIT_LIFE.value && (
                        <>
                            <Typography>
                                {"or"}
                            </Typography>
                            <BulkUpload/>
                        </>
                    )}
                    {(claimType === claimsTypes.DAMAGE.value || claimType === claimsTypes.THEFT.value ) && (
                        <>
                            <Typography>
                                {"or"}
                            </Typography>
                            <SaveForLater onSelectClaim={handleOnSelectSaved} claimType={claimType}/>
                        </>
                    )}
                </CardContent>
            </Card>
        </>
    )
}

export default SearchCustomer;