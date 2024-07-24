import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import PaymentsDatagrid from "@/components/@page-components/payments/payments-datagrid";
import Box from "@mui/material/Box";
import {getAllPaidOrders} from "@/redux/slices/order-slice";

const Payments = () => {
    const { payments } = useSelector(({ order }) => order);
    const dispatch = useDispatch();

    const getAllPayments = async () => {
        await dispatch(getAllPaidOrders());
    }

    useEffect(() => {
        getAllPayments();
    },[])
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
                <PaymentsDatagrid
                    data={payments}
                />
            </Box>
        </>
    )
}

export default Payments;