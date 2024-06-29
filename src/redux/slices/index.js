import ClaimsSlice from "@/redux/slices/dashboard/claims-slice";
import LoadingSlice from "@/redux/slices/loading";

const reducers = {
    claims: ClaimsSlice,
    loading: LoadingSlice,
}


export default reducers;