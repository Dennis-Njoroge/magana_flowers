import {Autocomplete, FormControl, InputLabel} from "@mui/material";
import Grid from "@mui/material/Grid";
import DMTTextInput from "@/components/@shared-components/forms/text-input";
import {getAutoCompleteValue} from "@/utils/helper-functions";

const sourceOptions = [
    {
        id: 1,
        label: 'Walk-in Customer',
        value: 'walkin',
    },
    {
        id: 2,
        label: 'Safaricom Store',
        value: 'store',
    },
    {
        id: 3,
        label: 'Safaricom Dealer',
        value: 'dealer',
    },

]

const DMTSelectSource = props => {
    const {  onChange, fullWidth, name, label, options = sourceOptions, defaultInput, field, value, required, error, onBlur, helperText, placeholder, ...other} = props;
    const handleOnChange = (e, value) => {
        onChange(value);
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
                        <InputLabel required={required} shrink htmlFor={name} error={error}>
                            {label}
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8.5}>
                        <Autocomplete
                            options={options}
                            autoHighlight
                            onChange={handleOnChange}
                            value={getAutoCompleteValue(options, value, 'value')}
                            getOptionLabel={(option) => option?.label}
                            renderInput={(params) => (
                                <DMTTextInput
                                    {...params}
                                    label={""}
                                    required={required}
                                    error={error}
                                    name={name}
                                    onBlur={onBlur}
                                    helperText={helperText}
                                    placeholder={placeholder}
                                    size={'small'}
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

export default DMTSelectSource;