import Product from "@/models/Product";
import {Op} from "sequelize";
import Category from "@/models/Category";

export const createProduct = async (data) => {
    return await Product.create(data);
};

export const getProducts = async () => {
    return await Product.findAll({
        include: Category,
        order: [['prod_id', 'desc']]
    });
};

export const getProductById = async (id) => {
    return await Product.findByPk(id, {
        include: Category,
    });
};

export const updateProduct = async (id, data) => {
    const product = await Product.findByPk(id);
    if (product) {
        return await product.update(data);
    }
    return null;
};

export const deleteProduct = async (id) => {
    const product = await Product.findByPk(id);
    if (product) {
        await product.destroy();
        return true;
    }
    return false;
};

export const searchProducts = async (query, categoryId) => {
    let filterWhere = {}
    if (query){
        filterWhere = {
            ...filterWhere,
            prod_name: {
                [Op.like]: `%${query}%`,
            },
        }
    }
    if (categoryId){
        filterWhere = {
            ...filterWhere,
            category_id: {
                [Op.eq]: categoryId,
            }
        }
    }
    return await Product.findAll({
        include: Category,
        where: filterWhere,
    });
};

