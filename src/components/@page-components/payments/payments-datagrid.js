import {formatCurrency, formatDate} from "@/utils/helper-functions";
import DMTDataGrid from "@/components/@shared-components/data-grid";

const PaymentsDatagrid = ({ data }) =>{
    const columns = [
        {
            label: '#',
            value: (data, index) =>{
                return index+1;
            }
        },
        {
            attribute: 'payment_id',
            label: 'Transaction Code'
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
            attribute: 'order_date',
            label: 'Payment Date',
            value: data => {
                return formatDate(data?.order_date, 'DD/MM/YYYY HH:mm a')
            }
        }
    ];
    return (
        <>
            <DMTDataGrid
                columns={columns}
                data={data}
            />
        </>
    )
}

export default PaymentsDatagrid;