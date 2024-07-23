import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getCategories} from "@/redux/slices/products-slice";
import DMTChip from "@/components/@shared-components/chip";
import {Box, Typography} from "@mui/material";
import {useRouter} from "next/router";

const ProductCategories = () => {
    const { categories } = useSelector(({ products }) => products);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleOnClick = (value) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, category: value },
        });
    }

    const handleOnSearch = e => {
        const { value } = e.target;
        router.push({
            pathname: router.pathname,
            query: { ...router.query, q: value },
        });
    }

    useEffect(() => {
        dispatch(getCategories());
    },[]);

    return (
        <>
            <Box sx={{
                backgroundColor: 'background.paper',
                boxShadow: 2,
                borderRadius: 1,
                p:2,
            }}>
                <Typography variant={'subtitle1'} gutterBottom>
                    {"Categories "}
                </Typography>
                <Box sx={{ display: 'flex', gap:1, overflowX: 'auto'}}>
                    <DMTChip
                        label={'All'}
                        color={ Boolean(!router.query?.category || router.query?.category === 'All') ? "primary" : "default"}
                        onClick={() => handleOnClick(null)}
                        variant={Boolean(!router.query?.category || router.query?.category === 'All') ?  'filled' : 'outlined'}
                    />
                    {categories.map((categories) => {
                            const isSelected = Boolean(router.query?.category === categories.id.toString());
                            return (
                                <DMTChip
                                    key={categories.id}
                                    label={categories.name}
                                    color={isSelected ? 'primary' : 'default'}
                                    onClick={() => handleOnClick(categories.id)}
                                    variant={isSelected ? 'filled' : 'outlined'}
                                />
                            )
                        }
                    )}
                </Box>


            </Box>

        </>
    )
}

export default ProductCategories;