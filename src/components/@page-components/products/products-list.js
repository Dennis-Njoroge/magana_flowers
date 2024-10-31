import {useSelector} from "react-redux";
import ProductItem from "@/components/@page-components/products/product-item";
import {ImageList, Typography, useMediaQuery} from "@mui/material";

const ProductsList = ({ products }) => {
    const { isLoading } = useSelector(({ loading }) => loading);
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("md"), {
        noSsr: true,
    });
    return (
        <>
            {isLoading && (
                <Typography>
                    {"Loading Products..."}
                </Typography>
            )
            }
            {
                products.length > 0 ? (
                    <ImageList sx={{ width: '100%', height: 'auto' }} cols={lgUp ? 3 : 1} gap={20}>
                        {products.map((product) => (
                            <ProductItem key={product.id} product={product}/>
                        ))}
                    </ImageList>
                ): (
                   <Typography>
                       {'No Product(s) found!'}
                   </Typography>
                )
            }

        </>
    )
}

export default ProductsList;