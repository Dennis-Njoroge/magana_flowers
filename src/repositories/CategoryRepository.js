import Category from "@/models/Category";

export const createCategory = async (data) => {
    return await Category.create(data);
};

export const getCategories = async () => {
    return await Category.findAll({
        order: [['id', 'desc']]
    });
};

export const getCategoryById = async (id) => {
    return await Category.findByPk(id);
};

export const updateCategory = async (id, data) => {
    const category = await Category.findByPk(id);
    if (category) {
        return await Category.update(data);
    }
    return null;
};

export const deleteCategory = async (id) => {
    const category = await Category.findByPk(id);
    if (category) {
        await Category.destroy();
        return true;
    }
    return false;
};
