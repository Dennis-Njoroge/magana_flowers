import {useDispatch, useSelector} from "react-redux";
import {getAllPurchases} from "@/redux/slices/purchases-slice";
import {useAuth} from "@/hooks/use-auth";
import {useEffect} from "react";
import Box from "@mui/material/Box";
import PurchaseStatusFilter from "@/components/@page-components/purchases/purchase-status-filter";
import PurchaseList from "@/components/@page-components/purchases/purchase-list";
import {USER_TYPES} from "@/utils/constants";
import PurchaseDatagrid from "@/components/@page-components/purchases/purchase-datagrid";

const Purchase = ({ fixed = true }) => {
    const { purchases, purchaseStatus } = useSelector(({ purchases }) => purchases);
    const { user } = useAuth();
    const dispatch = useDispatch();

    const fetchAllPurchases = async (status) => {
        let filters = {
            status: status
        }
        if (user?.userType === USER_TYPES.SUPPLIER){
            filters = {
                ...filters,
                user_id: user?.id
            }
        }
        if (user?.userType === USER_TYPES.DRIVER){
            filters = {
                ...filters,
                driver_id: user?.id
            }
        }
        await dispatch(getAllPurchases(filters))
    }

    useEffect(() => {
        fetchAllPurchases(purchaseStatus);
    },[])

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2}}>
                <PurchaseStatusFilter onSearch={fetchAllPurchases} fixed={fixed}/>
                {user?.userType === USER_TYPES.ADMIN ? (
                    <Box sx={{ mt: fixed ? 10 : 1 }}>
                        <PurchaseDatagrid data={purchases}/>
                    </Box>
                ): (
                    <PurchaseList fixed={fixed} purchases={purchases} onRefresh={() => fetchAllPurchases(purchaseStatus)}/>
                )}
            </Box>
        </>
    )
}

export default Purchase;