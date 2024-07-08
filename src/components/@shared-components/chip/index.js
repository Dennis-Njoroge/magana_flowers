import {alpha, Chip} from "@mui/material";
import CurrencyFormat from "react-currency-format";

const DMTChip = props => {
    const { numeral = false, label, color = 'primary', ...other } = props

    if (numeral){
        return (
            <Chip
                sx={{
                    width: '200px',
                    border: 'none',
                   // borderRadius: 1,
                    backgroundColor: theme => alpha(theme.palette[color].main, 0.05),
                    fontWeight: 'bold',
                    fontSize: 'inherit',
                }}
                label={
                    <CurrencyFormat
                        displayType={'text'}
                        value={label}
                        thousandSeparator={true}
                        prefix={''}
                    />
                }
                color={color}
                variant={"outlined"}
                {...other}
            />
        )
    }

    return (
        <Chip
            sx={{
                borderRadius: 1,
                //backgroundColor: theme => alpha(theme.palette?.[color]?.main, 0.05),
                // backgroundColor: theme => alpha(theme.palette[color].main, 0.08),
                // fontWeight: 'bold',
               // fontSize: 'inherit',
            }}
            label={label}
            color={color}
            variant={"outlined"}
            {...other}
        />
    )
}

export default DMTChip;