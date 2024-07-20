import sequalize from "@/config/database";
import {DataTypes} from "sequelize";
import Product from "@/models/Product";

const modelName = 'OrderDetails';

const OrderDetails  = sequalize.define(modelName, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    prod_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'prod_id',
        },
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    total_amount: {
        type: DataTypes.VIRTUAL,
        get(){
            return this.qty * this.price
        }
    }
},{
    timestamps: false,
    tableName: 'order_details'
})

// OrderDetails.belongsTo(Order, { foreignKey: 'order_id' });

export default OrderDetails;