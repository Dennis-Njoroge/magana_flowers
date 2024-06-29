import * as productRepository from '@/repositories/ProductRepository';
import {searchProductsByCategory} from "@/repositories/ProductRepository";

export const createProductHandler = async (req, res) => {
    try {
        const product = await productRepository.createProduct(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllProductsHandler = async (req, res) => {
    try {
        const products = await productRepository.getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getProductByIdHandler = async (req, res) => {
    try {
        const product = await productRepository.getProductById(req.query.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProductHandler = async (req, res) => {
    try {
        const product = await productRepository.updateProduct(req.query.id, req.body);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProductHandler = async (req, res) => {
    try {
        const success = await productRepository.deleteProduct(req.query.id);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const searchProductsHandler = async (req, res) => {
    try {
        const products = await productRepository.searchProducts(req.query.q, req.query.categoryId);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


