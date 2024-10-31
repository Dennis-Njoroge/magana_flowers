import sequelize from "@/config/database";
import { DataTypes } from "sequelize";
import Product from "@/models/Product";
import User from "@/models/User";

const modelName = 'Purchases';

const Purchases = sequelize.define(modelName, {
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
    supplier_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    purchase_no: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    original_qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    available_qty: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    price_per_unit: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    final_price_per_unit: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    discount: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'PENDING',
    },
    payment_code: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    payment_status: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.payment_code !== null ? 'PAID' : 'UNPAID';
        }
    },
    create_on: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    }
}, {
    timestamps: false,
    tableName: 'purchases_tb'
});

// Establishing the relationships
Purchases.belongsTo(User, { foreignKey: 'supplier_id' });
Purchases.belongsTo(Product, { foreignKey: 'prod_id' });

export default Purchases;
