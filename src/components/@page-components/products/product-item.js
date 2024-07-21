import {Icon, ImageListItem, ImageListItemBar, Paper, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import {formatCurrency} from "@/utils/helper-functions";
import Image from "next/image";
import Button from "@mui/material/Button";
import {useState} from "react";
import ProductPreview from "@/components/@page-components/products/product-preview";

const ProductItem = ({product}) => {
    const [openDialog, setOpenDialog] = useState(false);
    const handleOnPreview = () => {
        setOpenDialog(true);
    }
    const handleOnClose = () => {
        setOpenDialog(false);
    }


    const productActions = () => {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <Typography variant={'caption'}>
                    {`Available Quantity: ${product.qty} `}
                </Typography>
                <Typography gutterBottom>
                    {formatCurrency(product.discounted_price, 'KES')}
                </Typography>
                <Box sx={{ display: 'flex', mt:1, alignItems: 'center', justifyContent: 'space-between'}}>
                    <Button
                        variant={'text'} color={'primary'}
                        endIcon={<Icon>visibility</Icon>}
                        size={'small'}
                        onClick={handleOnPreview}
                    >
                        {"Quick View"}
                    </Button>
                    {/*<IconButton color={'primary'} sx={{ backgroundColor: 'light.main' }}>*/}
                    {/*    <Icon>add_shopping_cart</Icon>*/}
                    {/*</IconButton>*/}
                </Box>
            </Box>
        )
    }


    return (
        <>
            <ImageListItem component={Paper} sx={{ p:1}}>
                <Image
                    //srcSet={`${product.image}`}
                    src={`${product.image}`}
                    alt={product.prod_name}
                    loading="lazy"
                    width={270}
                    height={200}
                    //layout="responsive"
                />
                <ImageListItemBar
                    title={product.prod_name}
                    subtitle={productActions()}
                    position="below"
                />
            </ImageListItem>
            <ProductPreview
                openDialog={openDialog}
                onClose={handleOnClose}
                product={product}
            />
        </>
    )
}

export default ProductItem;