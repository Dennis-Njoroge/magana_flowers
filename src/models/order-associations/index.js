import {Order, OrderDetails, ShippingDetails} from "@/models/order-associations/associations";
import sequelize from "sequelize";

const models = {
    Order,
    OrderDetails,
    ShippingDetails,
    sequelize
};

export default models;