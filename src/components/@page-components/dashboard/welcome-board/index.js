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
        label: 'Place an order',
        link: '/dashboard/damage-claims'
    },
    {
        id: 2,
        label: 'Track my order(s)',
        link: '/dashboard/theft-claims'
    },
    {
        id: 5,
        label: 'Check my account',
        link: '/dashboard/credit-life-claims'
    },
];

const WelcomeBoard = () => {
    const router = useRouter();
    const { user } = useAuth();
    const handleOnSelect = (link) => {
        router.push(link);
    }
    return (
        <>
            <Card sx={{
                //background: `linear-gradient(25deg,#0075c9,#4188e7 20%,#25c1ed 90%)`,
                backgroundColor: 'primary.main', color: 'secondary.contrastText'}}>
                <CardContent sx={{ p: -1}}>
                    <Box>
                        <Typography variant={'h5'} gutterBottom>
                            {`${getGreetings()} ${user?.username ?? ''}, `}
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
                                                // backgroundColor: theme => alpha(theme.palette[color].main, 0.08),
                                                // fontWeight: 'bold',
                                                // fontSize: 'inherit',
                                            }}
                                            color={'primary'}
                                            //key={index}
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