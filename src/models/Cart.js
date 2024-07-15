import sequalize from "@/config/database";
import {DataTypes} from "sequelize";
import Category from "@/models/Category";
import {discountedPrice} from "@/utils/helper-functions";
import Product from "@/models/Product";
import User from "@/models/User";

const modelName = 'Cart';

const Cart  = sequalize.define(modelName, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    prod_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'prod_id',
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    prod_qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    specifications: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
},{
    timestamps: false,
    tableName: 'cart_tb'
})

Cart.belongsTo(Product, { foreignKey: 'prod_id' });

export default Cart;