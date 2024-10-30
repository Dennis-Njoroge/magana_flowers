import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {getAllProducts} from "@/redux/slices/products-slice";
import {useEffect} from "react";
import Grid from "@mui/material/Grid";
import ProductCategories from "@/components/@page-components/dashboard/product-categories";
import UpdateProductItem from "@/components/@page-components/products/update-product-item";
import CreateUpdateProduct from "@/components/@page-components/products/create-update-product";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

const Products = () => {
    const dispatch = useDispatch();
    const { products } = useSelector(( { products }) => products);
    const { isLoading } = useSelector(( { loading }) => loading);
    const router = useRouter();
    const filters = router.query;
    const getDiscountedProducts = async (filters) => {
        const values = {
            categoryId: filters?.category ?? null,
            q: filters?.q ?? null
        }
        await dispatch(getAllProducts(values));
    }

    useEffect(() => {
        getDiscountedProducts(filters)
    }, [filters])
    return(
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                        <CreateUpdateProduct onRefresh={() => getDiscountedProducts(filters)}/>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <ProductCategories/>
                </Grid>
                {isLoading && (
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography>
                                {"Loading Products..."}
                            </Typography>
                        </Grid>
                    )
                }
                {products.length > 0 ? products.map((prod)=> (
                    <Grid key={prod.prod_id}  item xs={12} sm={12} md={6}>
                        <UpdateProductItem
                            product={prod}
                            onRefresh={() =>  getDiscountedProducts(filters)}
                        />
                    </Grid>
                )): (
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography>
                            {"No products found."}
                        </Typography>
                    </Grid>
                )
                }
            </Grid>
        </>
    )
}

export default Products;