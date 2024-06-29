import {Box, Card, CardContent} from "@mui/material";
import {useEffect, useState} from "react";

import {useMounted} from "@/hooks/use-mounted";
import SearchFilters from "@/components/@page-components/approval-status/search-filters";
import ApprovalsDatagrid from "@/components/@page-components/approval-status/approvals-datagrid";
import {claimsApis} from "@/services/claims-apis";
import {useAuth} from "@/hooks/use-auth";

const ApprovalClaims = ({ data, report = false }) => {
    const [searchResults, setSearchResults] = useState(null);
    const [approvalData, setApprovalData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const isMounted = useMounted();
    const { user } = useAuth();

    const handleOnResults = async results => {
        await fetchApprovals(results);
    }

    const fetchApprovals = async (query) => {
        setIsLoading(true);
        try{
            const formData = {
                request: Boolean(query) ? query : "" ,
                shopId: user?.userid,
                userId: user?.userid,
                policyStatus: "",
                dispatch: report,
            }
            const res = await claimsApis.fetchClaims(formData);
            console.log(res);
            setApprovalData(res);
        }
        catch (e) {
            console.log(e.message)
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (isMounted()){
            fetchApprovals();
        }
    },[isMounted])

    return (
        <>
            <Card>
                <CardContent>
                    <SearchFilters onSearch={handleOnResults}/>
                    <Box sx={{ mt: 1}}>
                        <ApprovalsDatagrid isLoading={isLoading} data={approvalData} report={report} onRefresh={() => fetchApprovals("")}/>
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}

export default ApprovalClaims;