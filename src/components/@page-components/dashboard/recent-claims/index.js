import { List} from "@mui/material";
import NextLink from "next/link";
import {useSelector} from "react-redux";
import Typography from "@mui/material/Typography";
import DMTListItem from "@/components/@shared-components/list/list-item";
import Box from "@mui/material/Box";
import DMTChip from "@/components/@shared-components/chip";
import {claimsApis} from "@/services/claims-apis";
import {useEffect, useState} from "react";
import {useAuth} from "@/hooks/use-auth";
import {useMounted} from "@/hooks/use-mounted";
import DMTCard from "@/components/@shared-components/cards/dmt-card";
import {showRecords} from "@/utils/helper-functions";

const RecentClaims = () => {
    const { claims } = useSelector(({ claims }) => claims);
    const [isLoading, setIsLoading] = useState(false);
    const [approvalData, setApprovalData] = useState([]);
    const { user } = useAuth();
    const isMounted = useMounted();

    const fetchApprovals = async () => {
        setIsLoading(true);
        try{
            const formData = {
                request:  "" ,
                shopId: user?.userid,
                userId: user?.userid,
                policyStatus:  "",
            }
            const res = await claimsApis.fetchClaims(formData);
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
            <DMTCard
                title={'Recent Claims'}
                actions={
                    <NextLink style={{ textDecoration: 'none' }} href={'/dashboard/claims-status'}>
                        <Typography fontWeight={'bold'} color={'info.main'}>
                            {"View all"}
                        </Typography>
                    </NextLink>
                }
            >
                <List disablePadding dense>
                    {approvalData.length > 0 ? showRecords(approvalData).map( (claim, index) => (
                        <DMTListItem
                            key={index}
                            name={claim.customerName}
                            description={`REF: ${claim.claimRefNumber} | ${claim.claimType}`}
                            amount={
                                <Box>
                                    <DMTChip
                                        label={claim?.claimStatus?.toUpperCase()}
                                        color={claim.claimStatus === 'pending' ? 'warning' : claim.claimStatus === 'declined' ? 'error' : 'success'}
                                    />
                                </Box>
                            }
                        />
                    )) : (
                        <>
                            <Typography>
                                {isLoading ? "Fetching claims..." : "No recent claims at the moment."}
                            </Typography>
                        </>
                    )}
                </List>
            </DMTCard>
        </>
    )
}

export default RecentClaims;