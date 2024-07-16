import * as cartRepository from '@/repositories/CartRepository';


export const createCartHandler = async (req, res) => {
    try {
        const cart = await cartRepository.createCart(req.body);
        if (!cart){
            res.status(400).json({ error: "Invalid request"});
            return;
        }
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllCartsHandler = async (req, res) => {
    try {
        const carts = await cartRepository.getCarts(req?.query?.userId);
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getCartHandler = async (req, res) => {
    try {
        const carts = await cartRepository.getCart(req?.query?.userId, req?.query?.prodId);
        if (!carts){
            res.status(400).json({ message: "Item not on cart"});
            return;
        }
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCartQuantity = async (req, res) => {
    try{
       const totalCount = await cartRepository.getCartQuantity(req?.query.userId)
        res.status(200).json({ count: totalCount})
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}



export const updateCartHandler = async (req, res) => {
    try {
        const cart = await cartRepository.updateCart(req.query.id, req.body);
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCartHandler = async (req, res) => {
    try {
        const success = await cartRepository.deleteCart(req.query.id, null);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCartByUserIdHandler = async (req, res) => {
    try {
        const success = await cartRepository.deleteCart(null, req.query?.userId);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'No Items found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



