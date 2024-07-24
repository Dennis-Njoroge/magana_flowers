import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUsers} from "@/redux/slices/users-slice";
import UsersDatagrid from "@/components/@page-components/users/users-datagrid";
import Grid from "@mui/material/Grid";
import CreateUpdateUser from "@/components/@page-components/users/create-update-user";

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
            <Grid container spacing={2} sx={{ mb:2 }} alignItems={'center'} justifyContent={'flex-end'}>
                <Grid item>
                    <CreateUpdateUser label={'Create User'} onRefresh={getAllUsers}/>
                </Grid>
            </Grid>
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