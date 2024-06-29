import 'simplebar-react/dist/simplebar.min.css';

import SimpleBar from "simplebar-react";
import { forwardRef } from "react";
import { styled } from "@mui/material/styles";

const ScrollbarRoot = styled(SimpleBar)``;

// eslint-disable-next-line react/display-name
export const Scrollbar = forwardRef((props, ref) => {
    return <ScrollbarRoot ref={ref} {...props} />;
});
