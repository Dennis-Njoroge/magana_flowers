import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUsers} from "@/redux/slices/users-slice";
import UsersDatagrid from "@/components/@page-components/users/users-datagrid";

const Users = ({ height }) => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector(({ loading }) => loading);
    const { users } = useSelector(({ users }) => users);
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
                data={users}
                onRefresh={getAllUsers}
                height={height}
            />
        </>
    )
}
export default Users;