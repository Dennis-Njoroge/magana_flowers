import sequalize from "@/config/database";
import {DataTypes} from "sequelize";
import Category from "@/models/Category";
import {discountedPrice} from "@/utils/helper-functions";

const modelName = 'Product';

const Product  = sequalize.define(modelName, {
    prod_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    prod_name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id',
        },
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    discount: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    discounted_price: {
        type: DataTypes.VIRTUAL,
        get() {
            return discountedPrice(this.price , this.discount);  // Calculate total price
        }
    },
    created_on: {
        type: DataTypes.DATE,
        allowNull: true,
    }
},{
    timestamps: false,
    tableName: 'product_tb'
})

Product.belongsTo(Category, { foreignKey: 'category_id' });

export default Product;