import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SummaryCard from "@/components/@shared-components/cards/summary-card";
import {alpha, Avatar, Icon, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";



const PreviewResults = (props) => {
    const { results, onBack, onProceed } = props;
    const [isLoading, setIsLoading] = useState(false);

    const handleOnProceed = async () => {
        setIsLoading(true);
        await onProceed()
        setIsLoading(false);
    }

    return (
        <>
            <Box>
                <Grid container spacing={4} justifyContent={'center'}>
                    <Grid item xs={12} sm={12} md={3}>
                        <SummaryCard
                            sx={{
                                //backgroundColor: theme => alpha(theme.palette.success.main, 0.3),
                                borderTop: 5,
                                borderColor: 'success.main'
                            }}
                            title={results?.successCount}
                            description={"Successful Records"}
                            icon={
                            <Avatar variant={'rounded'} sx={{ backgroundColor: 'success.main', color: 'success.contrastText'}}>
                                <Icon>check</Icon>
                            </Avatar>
                        }
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={3}>
                        <SummaryCard
                            sx={{
                                //backgroundColor: theme => alpha(theme.palette.error.main, 0.05),
                                borderTop: 5,
                                borderColor: 'error.main'
                            }}
                            title={results?.failureCount}
                            description={"Failed Records"}
                            icon={
                                <Avatar variant={'rounded'} sx={{ backgroundColor: 'error.main', color: 'error.contrastText'}}>
                                    <Icon>close</Icon>
                                </Avatar>
                            }
                        />
                    </Grid>
                    {results?.withFailed ? (
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography align={'center'}>
                                {"The document uploaded contains some failed records. "}
                                <Typography  component={'a'} variant={'body2'}  href={results?.file} download>
                                    {"Click here to download file with the error(s)."}
                                </Typography>
                            </Typography>

                        </Grid>
                    ): (
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography align={'center'}>
                                {"No errors found on the document. Click proceed to finish."}
                            </Typography>

                        </Grid>
                    )}

                    <Grid item xs={12} sm={12} md={12}>
                        <Box sx={{ display: "flex", justifyContent: 'center',  gap: 2}}>
                            <Button disabled={isLoading} size={'large'} variant={'outlined'} color={'primary'} onClick={onBack}>
                                {"Cancel"}
                            </Button>
                            <Button disabled={isLoading} size={'large'} variant={'contained'} color={'primary'} onClick={handleOnProceed}>
                                {isLoading ? "Processing..." : "Proceed & Finish"}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
export default PreviewResults;