import sequalize from "@/config/database";
import {DataTypes} from "sequelize";
import bcrypt from 'bcryptjs';

const modelName = 'User';

const User  = sequalize.define(modelName, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    user_type:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    profile_pic:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_on:{
        type: DataTypes.STRING,
        allowNull: true,
    },

},{
    tableName: 'user_tb',
    timestamps: false,
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    },
    // defaultScope: {
    //     attributes: { exclude: ['password'] }  // Hide the password by default
    // }
})

export default User;