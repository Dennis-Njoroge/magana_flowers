import Box from "@mui/material/Box";
import DMTSearchInput from "@/components/@shared-components/forms/search-input";
import { LuSearch } from "react-icons/lu";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";


const GlobalSearchInput = () => {
    
    return (
        <>
            <Box sx={{ py:1, px:2, minWidth:'300px', backgroundColor:'background.paper', borderRadius: 1,}}>
                <DMTSearchInput
                    fullWidth={true}
                    size={'small'}
                    placeholder={'Search...'}
                    InputProps={{
                        disableUnderline: true,
                        autoComplete: 'off',
                        endAdornment:
                            <InputAdornment  position="end">
                                <IconButton size={"small"}>
                                    <LuSearch/>
                                </IconButton>
                            </InputAdornment>,
                    }}
                />
            </Box>
        </>
    )
}

export default GlobalSearchInput;
