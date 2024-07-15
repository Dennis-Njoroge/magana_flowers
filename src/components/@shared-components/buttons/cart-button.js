import DMTSearchInput from "@/components/@shared-components/forms/search-input";
import {Alert, Box, Icon} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {toast} from "react-toastify";
import Collapse from "@mui/material/Collapse";

const CartButton = ({ value = 1, onChange, name, onBlur, error, helperText, width = 200, size='default'}) => {
    const handleOnIncrement = () => {
        onChange(Number(value) + 1);
    }
    const handleOnDecrement = () => {
        if (Number(value) <= 1){
            return toast.error('Quantity cannot be less than 1')
        }
        onChange(Number(value) - 1);
    }
    return (
        <>
            <Box sx={{
                display: 'flex',
                border:1,
                gap:1,
                borderColor: error ? 'error.main' : 'neutral.200',
                borderRadius: 1,
                alignItems: 'center',
                width: width,
                p:1
            }}>
                <IconButton size={size} onClick={handleOnDecrement}>
                    <Icon>
                        {"remove"}
                    </Icon>
                </IconButton>
                <DMTSearchInput
                    name={name}
                    type={'number'}
                    value={value}
                    onBlur={onBlur}
                    error={error}
                    //helperText={helperText}
                    onChange={e => onChange(e.target.value)}
                />
                <IconButton size={size}  onClick={handleOnIncrement}>
                    <Icon>
                        {"add"}
                    </Icon>
                </IconButton>
            </Box>
            <Collapse in={error}>
                <Alert severity={'error'}>
                    {helperText}
                </Alert>
            </Collapse>
        </>
    )
}

export default CartButton;