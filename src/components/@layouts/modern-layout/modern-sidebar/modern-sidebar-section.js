import { List, ListSubheader } from '@mui/material';
import ModernSidebarItem from "./modern-sidebar-item";

const renderNavItems = ({ depth = 0, child, path }) => (
    <List disablePadding>
        {(Array.isArray(child)  && child?.length !== 0) && (
            <>
                {child?.reduce((acc, item) => reduceChildRoutes({ acc, depth, item, path }), [])}
            </>
        )}
    </List>
);

const reduceChildRoutes = ({ acc, depth, item, path }) => {
    const key = `${item.pageName}-${depth}`;
    const partialMatch = item.route ? path?.includes(item.route) : false;
    const exactMatch = path?.split('?')[0] === item.route; // We don't compare query params

    if (Array.isArray(item.child)) {
        if (item.child.length !== 0) {
            acc.push(
                <ModernSidebarItem
                    role ={item.role}
                    disabled={!item.enabled}
                    active={partialMatch}
                    chip={item.chip}
                    depth={depth}
                    bold={true}
                    icon={item.pageIcon}
                    info={item.info}
                    key={key}
                    open={partialMatch}
                    path={item?.route ?? ""}
                    title={item.pageName}
                >
                    {renderNavItems({
                        depth: depth + 1,
                        child: item.child ,
                        path
                    })}
                </ModernSidebarItem>
            );
        }
        else{
            acc.push(
                <ModernSidebarItem
                    role ={item.role}
                    disabled={!item.enabled}
                    active={exactMatch}
                    chip={item.chip}
                    depth={depth}
                    icon={item.pageIcon}
                    info={item.info}
                    key={key}
                    path={item?.route ?? ""}
                    title={item?.pageName}
                />
            );
        }
    } else {
        acc.push(
            <ModernSidebarItem
                role ={item.role}
                active={exactMatch}
                chip={item.chip}
                bold={true}
                depth={depth}
                icon={item.pageIcon}
                info={item.info}
                key={key}
                path={item.route}
                title={item?.pageName}
            />
        );
    }

    return acc;
};

const ModernSidebarSection = (props) => {
    //const { items, path, title, role, ...other } = props;
    //console.log('PROPS', props);
    const { child,  path, name, icon, ...other } = props;
    return (
        <List
            subheader={(
                <ListSubheader
                    disableGutters
                    disableSticky
                    sx={{
                        //color: 'neutral.500',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        lineHeight: 2.5,
                        ml: 4,
                        textTransform: 'uppercase'
                    }}
                >
                    {name}
                </ListSubheader>
            )}
            {...other}>
            {renderNavItems({
                child,
                path
            })}
        </List>
    );
};

ModernSidebarSection.propTypes = {
    // items: PropTypes.array.isRequired,
    //link: PropTypes.string.isRequired,
    // title: PropTypes.string.isRequired
};
export default ModernSidebarSection;
