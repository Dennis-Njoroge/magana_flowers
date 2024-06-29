import DMTTextInput from "@/components/@shared-components/forms/text-input";
import {MenuItem} from "@mui/material";
import {paymentProviderTypes} from "@/utils/constants";

const PaymentProvidersSelect = props => {
    const {options = paymentProviderTypes, ...other} = props;
    return (
        <DMTTextInput
            select
            {...other}
        >
            {options && options?.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                    {option?.name}
                </MenuItem>
            ))}

        </DMTTextInput>
    )
}

export default PaymentProvidersSelect;