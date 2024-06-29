import sequalize from "@/config/database";
import {DataTypes} from "sequelize";

const modelName = 'Category';

const Category  = sequalize.define(modelName, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
},{
    tableName: 'category_tb',
    timestamps: false
})
//Category.hasMany(Product, { foreignKey: 'category_id' });
export default Category;