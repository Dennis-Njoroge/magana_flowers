import sequalize from "@/config/database";
import {DataTypes} from "sequelize";
import User from "@/models/User";


const modelName = 'Order';

const Order  = sequalize.define(modelName, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    order_no: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    payment_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    shipping_charge: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    total_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    order_date: {
        type: DataTypes.NOW,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        default: 'Pending'
    },
    payment_status: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.payment_id !== null ? 'PAID' : 'PENDING'
        }
    }
},{
    timestamps: false,
    tableName: 'order_tb'
})

Order.belongsTo(User, { foreignKey: 'user_id' });


export default Order;