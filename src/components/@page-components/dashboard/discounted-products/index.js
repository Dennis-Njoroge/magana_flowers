import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect} from "react";
import {getAllProducts} from "@/redux/slices/products-slice";
import ProductsList from "@/components/@page-components/products/products-list";
import {Card, CardContent, CardHeader} from "@mui/material";
import {useRouter} from "next/router";

const DiscountedProducts = () => {
    const dispatch = useDispatch();
    const { discountedProducts, products } = useSelector(( { products }) => products);
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

    return (
        <>
            <ProductsList
                products={products}
            />
        </>
    )
}

export default DiscountedProducts;