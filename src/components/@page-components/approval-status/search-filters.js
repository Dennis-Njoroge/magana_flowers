import {useFormik} from "formik";
import {toast} from "react-toastify";
import {Box, Button } from "@mui/material";
import {sanitizeString} from "@/utils/helper-functions";
import {LuSearch} from "react-icons/lu";
import DMTTextInput from "@/components/@shared-components/forms/text-input";

const SearchFilters = props => {
    const { onSearch } = props;
    const formik = useFormik({
        initialValues: {
            query: '',
        },
        onSubmit: async (values, formikHelpers) => {
            try{
                await onSearch(values.query);
            }
            catch (e) {
                toast.error('An error occurred, Try Again');
            }
        }
    });
    const handleOnChange = async e => {
        const { name, value } = e.target;
        formik.setFieldValue(name , sanitizeString(value));
        if (!Boolean(value)){
            await onSearch(value);
        }
    }
    return (
        <>

            <Box
                component={'form'}
                onSubmit={formik.handleSubmit}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    flexDirection: {sm: 'column', xs: 'column', md: 'row'},
                    py:1,
                    px:2,
                    gap:1,
                    minWidth:'300px',
                    backgroundColor:'background.paper',
                    borderRadius: 1,
                }}>
                <DMTTextInput
                    fullWidth={true}
                    sx={{ width: {md: 450, sm:'100%', xs:'100%'}}}
                    size={'small'}
                    name={'query'}
                    placeholder={'Search...'}
                    type={'search'}
                    value={formik.values.query}
                    label={'Search by ID No | Phone No | IMEI No | Reference No'}
                    onChange={handleOnChange}
                    InputProps={{
                        //disableUnderline: true,
                        autoComplete: 'off',
                    }}
                />
                <Button
                    startIcon={ <LuSearch/>}
                    variant={'contained'}
                    color={'primary'}
                    type={'submit'}
                    disabled={formik.isSubmitting}

                >
                    {formik.isSubmitting ? "Searching..." : "Search"}
                </Button>
            </Box>
        </>
    )
}

export default SearchFilters;