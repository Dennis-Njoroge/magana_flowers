import DMTDataGrid from "@/components/@shared-components/data-grid";
import {formatCurrency, formatDate, orderStatusColor, purchaseStatusColor} from "@/utils/helper-functions";
import DMTChip from "@/components/@shared-components/chip";

const PurchaseDatagrid = ({ data }) => {
    const columns = [
        {
            label: '#',
            value: (data, index) =>{
                return index+1;
            }
        },
        {
            attribute: 'purchase_no',
            label: 'Purchase No'
        },
        {
            attribute: 'supplier_id',
            label: 'Supplier Name',
            value: (data) => {
                return data.User?.username
            },
        },
        {
            attribute: 'prod_id',
            label: 'Product Name',
            value: data => {
                return formatCurrency(data?.Product?.prod_name);
            }
        },
        {
            attribute: 'status',
            label: 'Status',
            value: data => {
                const color = purchaseStatusColor(data?.status);
                return <DMTChip label={data?.status} color={color}/>
            }
        },
        {
            attribute: 'payment_status',
            label: 'Payment Status',
        },
        {
            attribute: 'create_on',
            label: 'Date',
            value: data => {
                return formatDate(data?.create_on, 'DD/MM/YYYY HH:mm a')
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

export default PurchaseDatagrid;