import DMTDataGrid from "@/components/@shared-components/data-grid";
import {formatCurrency, formatDate, orderStatusColor} from "@/utils/helper-functions";
import DMTChip from "@/components/@shared-components/chip";

const OrderDatagrid = ({ data }) => {
    const columns = [
        {
            label: '#',
            value: (data, index) =>{
                return index+1;
            }
        },
        {
            attribute: 'order_no',
            label: 'Order No'
        },
        {
            attribute: 'user_id',
            label: 'Customer Name',
            value: (data) => {
                return data.User?.username
            },
        },
        {
            attribute: 'total_amount',
            label: 'Amount',
            value: data => {
                return formatCurrency(data?.total_amount);
            }
        },
        {
            attribute: 'status',
            label: 'Status',
            value: data => {
                const color = orderStatusColor(data?.status);
                return <DMTChip label={data?.status} color={color}/>
            }
        },
        {
            attribute: 'payment_status',
            label: 'Payment Status',
        },
        {
            attribute: 'order_date',
            label: 'Order Date',
            value: data => {
                return formatDate(data?.order_date, 'DD/MM/YYYY HH:mm a')
            }
        }
    ];
    return (
        <>
            <DMTDataGrid
                data={data}
                columns={columns}
                maxHeight={'65vh'}
            />
        </>
    )
}

export default OrderDatagrid;