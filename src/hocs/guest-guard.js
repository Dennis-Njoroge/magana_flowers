import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { useRouter } from "next/router";
import {useAuth} from "@/hooks/use-auth";

export const GuestGuard = (props) => {
    const { children } = props;
    const auth = useAuth();
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(
        () => {
            if (!router.isReady) {
                return(  <></> );
            }

            if (auth.isAuthenticated) {
                router.push("/dashboard").catch(console.error);
            } else {
                setChecked(true);
            }
        },
        [router.isReady]
    );

    if (!checked) {
        return null;
    }

    // If got here, it means that the redirect did not occur, and that tells us that the user is
    // not authenticated / authorized.

    return <>{children}</>;
};

GuestGuard.propTypes = {
    children: PropTypes.node,
};
