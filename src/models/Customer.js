import sequalize from "@/config/database";
import {DataTypes} from "sequelize";

const modelName = 'Customer';

const Customer  = sequalize.define(modelName, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    fname:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    sname:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phone_no:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    created_on:{
        type: DataTypes.STRING,
        allowNull: true,
    },

},{
    tableName: 'customer_tb',
    timestamps: false,
})

export default Customer;