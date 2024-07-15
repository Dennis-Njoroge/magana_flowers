import Product from "@/models/Product";
import Cart from "@/models/Cart";


export const createCart = async (data) => {
    if (!data.prod_id && !data.user_id){
        return false;
    }
    //check if product quantity exceeds the qty

    await checkProductQty(data.prod_id, data.prod_qty);
    const cart = await Cart.findOne({
        where:{
            user_id: data.user_id,
            prod_id: data.prod_id,
        }
    });
    if (cart) {
        await cart.update(data);
        const count = await getCartQuantity(data?.user_id);
        return { success: true, message: "Product updated to cart."  , action: 'updated', cart, count };
    }
    const newCart = await Cart.create(data);
    const count = await getCartQuantity(data?.user_id);
    return { success: true, message: "Product added to cart.", action: 'added', cart: newCart, count };
};

export const getCarts = async (userId) => {
    if (!userId){
        return [];
    }
    return await Cart.findAll({
        where: {
          user_id: userId
        },
        include: Product,
    });
};

export const updateCart = async (id, data) => {
    await checkProductQty(data.prod_id, data.prod_qty);
    const cart = await Cart.findByPk(id);
    if (cart) {
        const updatedCart = await cart.update(data);
        return { success: true, message: "Product updated to cart."  , action: 'updated', cart: updatedCart }
    }
    return null;
};

const checkProductQty = async (prodId, cartQty) => {
    const product = await Product.findByPk(prodId);
    if (!product) {
        throw new Error('Product not found.');
    }
    if (cartQty > product?.qty){
        throw new Error(`Quantity cannot exceed ${product.qty} unit(s).`);
    }
}

export const deleteCart = async (id, userId) => {
    if (!id && userId){
        await Cart.destroy({
            where: {
                user_id: userId
            }
        });
        return true;
    }
    const cart = await Cart.findByPk(id);
    if (cart) {
        await cart.destroy();
        return true;
    }
    return false;
};

export const getCartQuantity = async (userId) => {
    if (!userId) {
        throw new Error('User ID is required');
    }

    const carts = await Cart.findAll({
        where: {
            user_id: userId
        }
    });

    let totalQuantity = 0;
    carts.forEach(cart => {
        totalQuantity += cart.prod_qty;
    });

    return totalQuantity;
};


