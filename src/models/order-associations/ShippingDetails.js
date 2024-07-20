import sequalize from "@/config/database";
import {DataTypes} from "sequelize";
import User from "@/models/User";

const modelName = 'ShippingDetails';

const ShippingDetails  = sequalize.define(modelName, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone_no: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    location: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    driver_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id',
        },
    },
    delivery_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },

},{
    timestamps: false,
    tableName: 'shipping_details'
})



export default ShippingDetails;