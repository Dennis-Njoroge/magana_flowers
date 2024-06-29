import {FormControl, InputAdornment, InputLabel, MenuItem, Tooltip, Typography} from "@mui/material";
import DMTTextInput from "@/components/@shared-components/forms/text-input";
import {COUNTRIES} from "@/utils/constants";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const DMTPhoneInput = props => {
    const {  label, fullWidth, value, name, countryCode = '+254', onChangeCountryCode, error, defaultInput = true, onBlur, required= false, helperText, onChange, ...other } = props;

    // if (!defaultInput){
    //     return  (
    //         <>
    //             <FormControl
    //                 component={'div'}
    //                 fullWidth={fullWidth}
    //                 variant="standard"
    //                 error={error}
    //             >
    //                 <Grid container spacing={2} alignItems={'center'}>
    //                     <Grid item xs={12} sm={12} md={3.5}>
    //                         <InputLabel shrink htmlFor={name} required={required} error={error} onBlur={onBlur}>
    //                             {label}
    //                         </InputLabel>
    //                     </Grid>
    //                     <Grid item xs={12} sm={12} md={8.5}>
    //                         <DMTTextInput
    //                             label={""}
    //                             fullWidth={fullWidth}
    //                             value={value}
    //                             variant={'outlined'}
    //                             name={name}
    //                             type={'number'}
    //                             onBlur={onBlur}
    //                             required={required}
    //                             error={error}
    //                             helperText={helperText}
    //                             onChange={onChange}
    //                             InputProps={{
    //                                 form: {
    //                                     autocomplete: "off",
    //                                 },
    //                                 startAdornment: (
    //                                     <>
    //                                         <InputAdornment position="start">
    //                                             <DMTTextInput
    //                                                 select
    //                                                 disabled
    //                                                 style={{ width: "80px" }}
    //                                                 label=""
    //                                                 name="countryCode"
    //                                                 variant={"standard"}
    //                                                 value={countryCode}
    //                                                 onChange={onChangeCountryCode}
    //                                                 InputProps={{
    //                                                     disableUnderline: true,
    //                                                 }}
    //                                             >
    //                                                 {COUNTRIES?.map((country, index) => (
    //                                                     <MenuItem key={index} value={country.dialCode}>
    //                                                         <Tooltip title={country.name} arrow>
    //                                                             <Box
    //                                                                 px={2}
    //                                                                 sx={{
    //                                                                     display: "flex",
    //                                                                     alignItems: "center",
    //                                                                     justifyContent: "center",
    //                                                                 }}
    //                                                             >
    //                                                                 <img width={20} height={20} src={country.flag}/>
    //                                                                 <Typography mr={1} ml={1} variant={'inherit'} fontWeight={'bold'}>
    //                                                                     {country.isoCode}
    //                                                                 </Typography>
    //                                                             </Box>
    //                                                         </Tooltip>
    //                                                     </MenuItem>
    //                                                 ))}
    //                                             </DMTTextInput>
    //                                         </InputAdornment>
    //                                         <InputAdornment sx={{ fontWeight: 'bold'}} position={"start"}>
    //                                             {countryCode}
    //                                         </InputAdornment>
    //                                     </>
    //                                 ),
    //                             }}
    //                             {...other}
    //                         />
    //                     </Grid>
    //                 </Grid>
    //             </FormControl>
    //         </>
    //     )
    // }

    return (
        <>
            <DMTTextInput
                label={label}
                fullWidth={fullWidth}
                value={value}
                name={name}
                defaultInput={defaultInput}
                type={'number'}
                error={error}
                helperText={helperText}
                onChange={onChange}
                onBlur={onBlur}
                required={required}
                InputProps={{
                    form: {
                        autocomplete: "off",
                    },
                    startAdornment: (
                        <>
                            {/*<InputAdornment position="start">*/}
                            {/*    <DMTTextInput*/}
                            {/*        select*/}
                            {/*        disabled*/}
                            {/*        style={{ width: "80px" }}*/}
                            {/*        label=""*/}
                            {/*        name="countryCode"*/}
                            {/*        variant={"standard"}*/}
                            {/*        value={countryCode}*/}
                            {/*        onChange={onChangeCountryCode}*/}
                            {/*        InputProps={{*/}
                            {/*            disableUnderline: true,*/}
                            {/*        }}*/}
                            {/*    >*/}
                            {/*        {COUNTRIES?.map((country, index) => (*/}
                            {/*            <MenuItem key={index} value={country.dialCode}>*/}
                            {/*                <Tooltip title={country.name} arrow>*/}
                            {/*                    <Box*/}
                            {/*                        px={2}*/}
                            {/*                        sx={{*/}
                            {/*                            display: "flex",*/}
                            {/*                            alignItems: "center",*/}
                            {/*                            justifyContent: "center",*/}
                            {/*                        }}*/}
                            {/*                    >*/}
                            {/*                        <img width={20} height={20} src={country.flag}/>*/}
                            {/*                        <Typography mr={1} ml={1} variant={'inherit'} fontWeight={'bold'}>*/}
                            {/*                            {country.isoCode}*/}
                            {/*                        </Typography>*/}
                            {/*                    </Box>*/}
                            {/*                </Tooltip>*/}
                            {/*            </MenuItem>*/}
                            {/*        ))}*/}
                            {/*    </DMTTextInput>*/}
                            {/*</InputAdornment>*/}
                            <InputAdornment sx={{ fontWeight: 'bold'}} position={"start"}>
                                <Box
                                    //px={2}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <img width={20} height={20} src={'https://cdn.kcak11.com/CountryFlags/countries/ke.svg'}/>
                                    <Typography mr={1} ml={1} variant={'inherit'} fontSize={'14px'}>
                                        {countryCode}
                                    </Typography>
                                </Box>
                            </InputAdornment>
                        </>
                    ),
                }}
                {...other}
            />
        </>
    )
}

export default DMTPhoneInput;