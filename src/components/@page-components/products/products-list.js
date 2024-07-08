import {useSelector} from "react-redux";
import ProductItem from "@/components/@page-components/products/product-item";
import {ImageList, useMediaQuery} from "@mui/material";

const ProductsList = ({ products }) => {
    const { isLoading } = useSelector(({ loading }) => loading);
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("md"), {
        noSsr: true,
    });
    return (
        <>
            <ImageList sx={{ width: '100%', height: 'auto' }} cols={lgUp ? 3 : 1} gap={20}>
                {products.map((product) => (
                    <ProductItem key={product.id} product={product}/>
                ))}
            </ImageList>
        </>
    )
}

export default ProductsList;