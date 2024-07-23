import DMTDataGrid from "@/components/@shared-components/data-grid";
import {Typography} from "@mui/material";
import DMTChip from "@/components/@shared-components/chip";
import {formatDate} from "@/utils/helper-functions";
import UserActionMenus from "@/components/@page-components/users/action-menus";

const UsersDatagrid = ({isLoading, data, onRefresh, height, showRole= true }) => {
    const columns = [
        {
            label: '#',
            value: (data, index) => {
                return index +1;
            },
        },
        {
            attribute: 'username',
            label:'Name'
        },
        {
            attribute: 'email',
            label:'Email Address',
        },
        {
            attribute: 'phone_no',
            label: 'Phone Number',
        },
        {
            attribute: 'user_type',
            visible: showRole,
            label: 'Role',
            value: data => {
                return data.user_type?.toUpperCase();
            }
        },
        {
            label: 'Status',
            attribute: 'status',
            value: data => {
                const color = data.status === 'active' ? 'success' : data.status === 'pending' ? 'warning' : 'error';
                return (
                    <DMTChip
                        color={color}
                        label={data.status?.toUpperCase()}
                    />
                )
            }
        },
        {
            label : 'Created On',
            attribute: 'created_on',
            value : (data) => {
                return (
                    <>
                        <Typography variant={'inherit'}>
                            {formatDate(data?.created_on, 'DD/MM/YYYY HH:mm a')}
                        </Typography>
                    </>
                )
            },
        },
        {
            label : '',
            value : (data) => {
                return (
                    <>
                       <UserActionMenus
                           user={data}
                           onRefresh={onRefresh}

                       />
                    </>
                )
            },
        },
    ]
    return (
        <DMTDataGrid
            data={data}
            columns={columns}
            loading={isLoading}
            maxHeight={height}

        />
    )
}

export default UsersDatagrid;