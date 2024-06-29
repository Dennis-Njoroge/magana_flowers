import User from "@/models/User";


export const createUser = async (data) => {
    const user = await searchUserByEmail(data?.email);
    if (user){
        return false;
    }
    return await User.create(data);
}

export const searchUserByEmail = async (email) => {
    return await User.findOne({
        where: {
            email: email
        }
    })
}
