import {styled} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import {alpha, FormControl, InputBase, InputLabel} from "@mui/material";
import Grid from "@mui/material/Grid";
import BootstrapInput from "@/components/@shared-components/forms/bootstrap-base-input";

export const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
    '& .MuiFilledInput-root': {
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: theme.palette.grey["500"],
        overflow: 'hidden',
        borderRadius: 4,
        fontSize:'12px',
        fontWeight: 'bold',
        backgroundColor: `${alpha(theme.palette.primary.main, 0.02)}`,
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:hover': {
            backgroundColor: `${alpha(theme.palette.primary.main, 0.1)}`,
        },
        '&.Mui-focused': {
            backgroundColor: `${alpha(theme.palette.primary.main, 0.1)}`,
            // boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },
    },
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
    },
    "& input[type=number]": {
        MozAppearance: "textfield",
    },
}));


const DMTTextInput = props => {
    const { name = "default", label = "", labelHidden = false, fullWidth= true, defaultInput= true, required, ...other  } = props;

    // if (defaultInput){
    //     return(
    //         <>
    //             <RedditTextField variant="outlined" name={name} label={label}  fullWidth={fullWidth} required={required}  {...other}/>
    //         </>
    //     )
    // }

    return (
        <FormControl
            component={'div'}
            fullWidth={fullWidth}
            variant="standard"
        >
            <Grid container spacing={3} >
                <Grid item xs={12} sm={12} md={12}>
                    <InputLabel shrink htmlFor={name} required={required} {...other}>
                        {label}
                    </InputLabel>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <BootstrapInput name={name} required={required} {...other}/>
                </Grid>
            </Grid>
        </FormControl>
    )

}

export default DMTTextInput;