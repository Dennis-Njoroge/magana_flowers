import User from "@/models/User";


export const createUser = async (data) => {
    const user = await searchUserByEmail(data?.email);
    if (user){
        return false;
    }
    return await User.create(data);
}

export const updateUser = async (userId, data) => {
    const user = await User.findByPk(userId);
    if (!user){
      return false
    }
    return await user.update(data);
}


export const searchUserByEmail = async (email) => {
    return await User.findOne({
        where: {
            email: email
        }
    })
}

export const getUsers = async (filters) => {
    return await User.findAll({
        where: filters,
        attributes: { exclude: ['password'] },
        order: [['id', 'desc']]
    });
}

export const getUser = async (userId) => {
    return await User.findOne({
        where: {id: userId},
        attributes: { exclude: ['password'] }
    });
}
