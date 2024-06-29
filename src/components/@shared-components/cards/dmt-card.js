import {Card, CardActions, CardContent, CardHeader} from "@mui/material";

const DMTCard = props => {
    const { title, children, actions, other} = props;
    return (
        <>
            <Card elevation={5} {...other}>
                {title && (
                    <CardHeader sx={{ pb: 0 }} title={title}/>
                )}
                <CardContent >
                    { children }
                    {Boolean(actions) && (
                        <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                            { actions }
                        </CardActions>
                    )}
                </CardContent>
            </Card>
        </>
    )
}

export default DMTCard;