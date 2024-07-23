import {useAuth} from "@/hooks/use-auth";
import {validateRole} from "@/utils/helper-functions";
import Forbidden from "@/components/@page-components/forbidden";

const RoleGuard = ({ children, path, page = false}) => {
    const { user } = useAuth();

    if (!validateRole(path, user?.userType)){
        if (page){
            return <Forbidden/>
        }
        return null
    }

    return (
        <>
            {children}
        </>
    )
}

export default RoleGuard;