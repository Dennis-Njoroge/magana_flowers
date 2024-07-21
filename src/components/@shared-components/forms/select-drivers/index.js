import {Autocomplete, FormControl, InputLabel} from "@mui/material";
import Grid from "@mui/material/Grid";
import { getAutoCompleteValue} from "@/utils/helper-functions";
import BootstrapInput from "@/components/@shared-components/forms/bootstrap-base-input";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDrivers} from "@/redux/slices/users-slice";



const DMTDriversSelect = props => {
    const {
        onChange,
        fullWidth,
        name,
        label,
        defaultInput,
        value,
        required,
        error,
        onBlur,
        helperText,
        placeholder,
        ...other} = props;
    const dispatch = useDispatch();
    const handleOnChange = (e, value) => {
        onChange(value);
    }
    const { drivers } = useSelector(({ users }) => users );

    const fetchDrivers = async () => {
        await dispatch(getDrivers());
    }

    useEffect(() => {
        fetchDrivers();
    },[]);


    return (
        <>
            <FormControl
                component={'div'}
                fullWidth={fullWidth}
                variant="standard"
            >
                <Grid container spacing={2} alignItems={'center'}>
                    <Grid item xs={12} sm={12} md={12}>
                        <InputLabel shrink htmlFor={name} required={required} error={error}>
                            {label}
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Autocomplete
                            options={drivers}
                            autoHighlight
                            onChange={handleOnChange}
                            value={getAutoCompleteValue(drivers, value,'id')}
                            getOptionLabel={(option) => option?.username}
                            renderInput={(params) => (
                                <BootstrapInput
                                    {...params}
                                    label={""}
                                    required={required}
                                    error={error}
                                    name={name}
                                    onBlur={onBlur}
                                    helperText={helperText}
                                    placeholder={placeholder}
                                    inputProps={{
                                        ...params.inputProps,
                                        autoComplete: 'off', // disable autocomplete and autofill

                                    }}
                                    variant={'outlined'}
                                />
                            )}
                            {...other}
                        />
                    </Grid>
                </Grid>

            </FormControl>

        </>
    )
}

export default DMTDriversSelect;