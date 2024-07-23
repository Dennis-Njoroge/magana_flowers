import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUsers} from "@/redux/slices/users-slice";
import UsersDatagrid from "@/components/@page-components/users/users-datagrid";

const Customers = ({ height }) => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector(({ loading }) => loading);
    const { customers } = useSelector(({ users }) => users);
    const getAllUsers = async () => {
        await dispatch(getUsers())
    }

    useEffect(() => {
        getAllUsers();
    },[])
    return (
        <>
            <UsersDatagrid
                isLoading={isLoading}
                data={customers}
                showRole={false}
                onRefresh={getAllUsers}
                height={height}
            />
        </>
    )
}
export default Customers;