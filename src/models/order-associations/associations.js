import Order from "@/models/order-associations/Order";
import OrderDetails from "@/models/order-associations/OrderDetails";
import ShippingDetails from "@/models/order-associations/ShippingDetails";
import User from "@/models/User";
import Product from "@/models/Product";

Order.hasMany(OrderDetails, {foreignKey: 'order_id'});
OrderDetails.belongsTo(Order, {foreignKey: 'order_id'});
OrderDetails.belongsTo(Product, {foreignKey: 'prod_id'});
Order.hasOne(ShippingDetails, {foreignKey: 'order_id'});
ShippingDetails.belongsTo(Order, { foreignKey: 'order_id' });
ShippingDetails.belongsTo(User, { foreignKey: 'driver_id' });


export { Order, OrderDetails, ShippingDetails };
