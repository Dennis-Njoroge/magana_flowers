import {useSelector} from "react-redux";
import ProductItem from "@/components/@page-components/products/product-item";
import {ImageList} from "@mui/material";

const ProductsList = ({ products }) => {
    const { isLoading } = useSelector(({ loading }) => loading);
    return (
        <>
            <ImageList sx={{ width: '100%' }}>
                {products.map((product) => (
                    <ProductItem key={product.id} product={product}/>
                ))}
            </ImageList>
        </>
    )
}

export default ProductsList;