import Grid from "@mui/material/Grid";
import PurchaseItem from "@/components/@page-components/purchases/purchase-item";


const PurchaseList = ({ purchases, onRefresh, fixed = true }) => {
    return (
        <>
            <Grid container spacing={2} sx={{ mt: fixed ? 10 : 1 }}>
                {purchases.map((purchase) => (
                    <Grid key={purchase.id} item md={4} sm={12} xs={12}>
                        <PurchaseItem purchase={purchase} onRefresh={onRefresh} />
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default PurchaseList;