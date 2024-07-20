import sequalize from "@/config/database";
import {DataTypes} from "sequelize";

const modelName = 'PickUpPoint';

const PickUpPoint  = sequalize.define(modelName, {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    p_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    charge: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
},{
    timestamps: false,
    tableName: 'pick_up_points'
})


export default PickUpPoint;