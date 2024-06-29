import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect} from "react";
import {getAllProducts} from "@/redux/slices/products-slice";
import ProductsList from "@/components/@page-components/products/products-list";
import {Card, CardContent, CardHeader} from "@mui/material";

const DiscountedProducts = () => {
    const dispatch = useDispatch();
    const { discountedProducts, products } = useSelector(( { products }) => products);

    const getDiscountedProducts = async () => {
        await dispatch(getAllProducts({ discounted: true}));
    }

    useEffect(() => {
        getDiscountedProducts()
    }, [])

    return (
        <>
            <Card>
                <CardHeader title={'Discounted Products'}/>
                <CardContent>
                    <ProductsList
                        products={products}
                    />
                </CardContent>
            </Card>

        </>
    )
}

export default DiscountedProducts;