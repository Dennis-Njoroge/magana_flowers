import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {useAuth} from "@/hooks/use-auth";
import {getCartCount} from "@/redux/slices/cart-slice";
import {Icon} from "@mui/material";
import Badge from "@mui/material/Badge";
import {USER_TYPES} from "@/utils/constants";

const CartCountIcon = () => {
    const router = useRouter();
    const { cartCount } = useSelector(({ cart }) => cart);
    const dispatch = useDispatch();
    const { user } = useAuth();

    const handleOnClick = async () => {
        await router.push('/dashboard/cart')
    }

    if (user?.userType !== USER_TYPES.CUSTOMER){
        return null;
    }

    useEffect(() => {
        if (router.isReady && user){
            const values = { userId: user?.id};
            dispatch(getCartCount(values));
        }
    },[router.isReady, user]);

    return (
        <>
            <Badge
                onClick={handleOnClick}
                sx={{
                    '&:hover': {
                        cursor: 'pointer'
                    }
                }}
                badgeContent={cartCount}
                color="primary"
            >
                <Icon fontSize={'small'} color={"inherit"}>
                    {"shopping_cart"}
                </Icon>
            </Badge>

        </>
    )
}

export default React.memo(CartCountIcon);