import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getCategories} from "@/redux/slices/products-slice";
import DMTChip from "@/components/@shared-components/chip";
import {Box, Icon, Typography} from "@mui/material";
import {useRouter} from "next/router";
import DMTTextInput from "@/components/@shared-components/forms/text-input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const ProductCategories = () => {
    const { categories } = useSelector(({ products }) => products);
    const dispatch = useDispatch();
    const router = useRouter();
    const [query, setQuery] = useState('');

    const handleOnClick = (value) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, category: value },
        });
    }

    const handleOnSearch = async () => {
        await router.push({
            pathname: router.pathname,
            query: { ...router.query, q: query },
        });
    }

    useEffect(() => {
        dispatch(getCategories());
        setQuery(router?.query?.q ?? '')
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
                <Box component={'form'} onSubmit={e=> { e.preventDefault(); handleOnSearch()}}>
                    <DMTTextInput
                        label={''}
                        placeholder={'Search...'}
                        onChange={e => setQuery(e.target.value)}
                        onBlur={handleOnSearch}
                        value={query}
                        fullWidth={true}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton type={'submit'}>
                                        <Icon>
                                            {"search"}
                                        </Icon>
                                    </IconButton>
                                </InputAdornment>
                        }}
                    />
                </Box>

            </Box>

        </>
    )
}

export default ProductCategories;