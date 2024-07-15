import CurrencyFormat from "react-currency-format";
import {FormControl,InputLabel} from "@mui/material";
import Grid from "@mui/material/Grid";
import BootstrapInput from "@/components/@shared-components/forms/bootstrap-base-input";
import {RedditTextField} from "@/components/@shared-components/forms/text-input";

const DMTCurrencyInput = props => {
    const {label, fullWidth = true, name, value, onChange, required, prefix = 'Kes ', error, onBlur, helperText, ...other } = props;

    return(
        <>
            <FormControl
                component={'div'}
                fullWidth={fullWidth}
                variant="standard"
                error={error}
            >
                <Grid container spacing={3} alignItems={'center'}>
                    <Grid item xs={12} sm={12} md={12}>
                        <InputLabel shrink htmlFor={name} required={required} error={error} onBlur={onBlur}>
                            {label}
                        </InputLabel>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <CurrencyFormat
                            value={value}
                            name={name}
                            allowNegative={false}
                            onValueChange={onChange}
                            //isNumericString={true}
                            decimalScale={0}
                            thousandSeparator={true}
                            prefix={prefix}
                            customInput={BootstrapInput}
                            error={error}
                            onBlur={onBlur}
                            helperText={helperText}
                            fullWidth={fullWidth}
                            {...other}
                        />
                    </Grid>
                </Grid>
            </FormControl>

        </>
    )
}

export default DMTCurrencyInput;