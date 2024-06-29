import {Icon, ImageListItem, ImageListItemBar} from "@mui/material";
import IconButton from "@mui/material/IconButton";

const ProductItem = ({product}) => {
    console.log(product);
    return (
        <>
            <ImageListItem>
                <img
                    srcSet={`${product.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${product.image}?w=248&fit=crop&auto=format`}
                    alt={product.prod_name}
                    loading="lazy"
                />
                <ImageListItemBar
                    title={product.prod_name}
                    subtitle={<span>by: {product.qty}</span>}
                    position="below"
                    actionIcon={
                    <IconButton>
                        <Icon>
                            {"shopping_cart"}
                        </Icon>
                    </IconButton>}
                />
            </ImageListItem>
        </>
    )
}

export default ProductItem;