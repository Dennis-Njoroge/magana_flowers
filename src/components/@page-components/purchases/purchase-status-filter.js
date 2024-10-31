import {Box, Typography} from "@mui/material";
import DMTChip from "@/components/@shared-components/chip";
import {useDispatch, useSelector} from "react-redux";
import {PURCHASE_STATUS} from "@/utils/constants";
import {setPurchaseStatus} from "@/redux/slices/purchases-slice";

const purchaseStatusOpts = [
    PURCHASE_STATUS.PENDING,
    PURCHASE_STATUS.APPROVED,
    PURCHASE_STATUS.DELIVERED,
    PURCHASE_STATUS.COMPLETED
]

const PurchaseStatusFilter = ({ onSearch, fixed = true }) => {
    const dispatch = useDispatch();
    const { purchaseStatus } = useSelector(({ purchases }) => purchases);
    const handleOnClick = async value => {
        await onSearch?.(value);
        dispatch(setPurchaseStatus(value));
    }

    return (
        <Box sx={{
            backgroundColor: 'background.paper',
            boxShadow: 2,
            borderRadius: 1,
            py:2,
            pl:2,
            pr: 4,
            position: fixed ? 'fixed' : 'relative',
            top: fixed ? 90 : 0,
            width: '100%'
        }}>
            <Typography variant={'subtitle1'} gutterBottom>
                {"Filter by Purchase Status "}
            </Typography>
            <Box sx={{ display: 'flex', gap:1,  overflowX: 'auto'}}>
                <DMTChip
                    label={'All'}
                    color={ Boolean(!purchaseStatus) ? "primary" : "default"}
                    onClick={() => handleOnClick(null)}
                    variant={Boolean(!purchaseStatus)  ?  'filled' : 'outlined'}
                />
                {purchaseStatusOpts.map((opt) => {
                        const isSelected = Boolean(purchaseStatus === opt);
                        return (
                            <DMTChip
                                key={opt}
                                label={opt}
                                color={isSelected ? 'primary' : 'default'}
                                onClick={() => handleOnClick(opt)}
                                variant={isSelected ? 'filled' : 'outlined'}
                            />
                        )
                    }
                )}
            </Box>
        </Box>
    )
}

export default PurchaseStatusFilter;