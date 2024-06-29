import {DatePicker} from "@mui/x-date-pickers";
import moment from "moment";
import { FormControl, InputLabel} from "@mui/material";
import Grid from "@mui/material/Grid";


const getMaxYear = (date) => {
    if (date){
        return new Date(date);
    }
}

export const calculateAge = (date) => {
    if (date){
        return new moment().diff(moment(date, "DD MMM YYYY"), 'years');
    }
    return null;
}

const DMTDatePicker = props => {
    const { label, value, name,  disabled, fullWidth, onChange, maxYears, minYears, showAge, error = false, required, disableFuture, ...other} = props;
    const age =  calculateAge(value);
    const maxDate = getMaxYear(maxYears);
    const minDate = getMaxYear(minYears);
    const handleOnChange = (newValue) => {
        onChange(newValue);
    }


    return (
        <>
            <FormControl
                component={'div'}
                fullWidth={fullWidth}
                variant="standard"
            >
                <Grid container spacing={2} alignItems={'center'}>
                    <Grid item xs={12} sm={12} md={3.5}>
                        <InputLabel shrink htmlFor={name} required={required} error={error}>
                            {label}
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8.5}>
                        <DatePicker
                            readOnly={disabled}
                            format="dd/MM/yyyy"
                            maxDate = {maxDate}
                            minDate={minDate}
                            disableFuture={disableFuture}
                            value={value !=='' ? value : null}
                            onChange={handleOnChange}
                            slotProps={{
                                textField: {
                                    error,
                                    name,
                                    required,
                                    ...other,
                                }
                            }}
                        />
                    </Grid>
                </Grid>
            </FormControl>


        </>
    )
}

export default DMTDatePicker;