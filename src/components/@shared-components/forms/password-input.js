import {useState} from "react";
import DMTTextInput from "@/components/@shared-components/forms/text-input";
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";

const DMTPasswordInput = props => {
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(prevState => !prevState);
    }
    return (
        <DMTTextInput
            {...props}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
                autoComplete: 'off',
                endAdornment:
                    <InputAdornment position="start">
                        <IconButton onClick={handleShowPassword}>
                            {showPassword ? <MdOutlineVisibilityOff/> : <MdOutlineVisibility/>}
                        </IconButton>
                    </InputAdornment>,
            }}
        />
    )
}

export default DMTPasswordInput;