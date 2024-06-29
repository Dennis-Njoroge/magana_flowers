import {styled} from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} {...props} />
))(({ theme }) => ({
    '& .MuiInputBase-root': {
        overflow: 'hidden',
        borderRadius: 4,
        fontSize:'14px',
        fontWeight: 'bold',
        backgroundColor: theme.palette.background.paper,
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
    },
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
        display: "none",
    },
    "& input[type=number]": {
        MozAppearance: "textfield",
    },
}));
const DMTSearchInput = props => {
    const { ...other } = props;

    return(
        <>
            <RedditTextField variant="standard" type={'search'} {...other}/>
        </>
    )
}

export default DMTSearchInput;