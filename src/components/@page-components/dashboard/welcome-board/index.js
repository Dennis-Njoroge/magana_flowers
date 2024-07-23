import {Card, CardContent, Stack, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import DMTChip from "@/components/@shared-components/chip";
import {useRouter} from "next/router";
import {getGreetings} from "@/utils/helper-functions";
import {useAuth} from "@/hooks/use-auth";
import RoleGuard from "@/hocs/role-guard";

const quickActions = [
    {
        id: 1,
        label: 'Place Order',
        link: '/dashboard/cart'
    },
    {
        id: 2,
        label: 'Track Orders',
        link: '/dashboard/orders'
    },
    {
        id: 3,
        label: 'Manage Users',
        link: '/dashboard/users'
    },
    {
        id: 5,
        label: 'Check Account',
        link: '/dashboard/my-account'
    },
];

const WelcomeBoard = () => {
    const router = useRouter();
    const { user } = useAuth();
    const handleOnSelect = (link) => {
        router.push(link);
    }

    const firstName = user?.username?.split(" ")[0]
    return (
        <>
            <Card sx={{
                //background: `linear-gradient(25deg,#0075c9,#4188e7 20%,#25c1ed 90%)`,
                backgroundColor: 'primary.main', color: 'primary.contrastText'}}>
                <CardContent sx={{ p: -1}}>
                    <Box>
                        <Typography variant={'h5'} gutterBottom>
                            {`${getGreetings()} ${firstName ?? ''}, `}
                        </Typography>
                        <Typography variant={'h6'}>
                            {"What would you like to do today?"}
                        </Typography>
                        <Stack direction="row" sx={{ mt: 1}} spacing={1} useFlexGap flexWrap="wrap">
                            {quickActions.map((action, index) => {
                                return (
                                    <RoleGuard key={index} path={action.link}>
                                        <DMTChip
                                            onClick={() => handleOnSelect(action.link)}
                                            sx={{
                                                borderRadius: 1,
                                                color: 'inherit',
                                                borderColor: 'inherit'
                                            }}
                                            color={'primary'}
                                            label={action.label}
                                        />
                                    </RoleGuard>
                                )
                            })}
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}
export default WelcomeBoard;