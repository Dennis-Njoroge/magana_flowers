import * as CategoryRepository from '@/repositories/CategoryRepository';

export const createCategoryHandler = async (req, res) => {
    try {
        const Category = await CategoryRepository.createCategory(req.body);
        res.status(201).json(Category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllCategoriesHandler = async (req, res) => {
    try {
        const Categories = await CategoryRepository.getCategories();
        res.status(200).json(Categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getCategoryByIdHandler = async (req, res) => {
    try {
        const Category = await CategoryRepository.getCategoryById(req.query.id);
        if (Category) {
            res.status(200).json(Category);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCategoryHandler = async (req, res) => {
    try {
        const Category = await CategoryRepository.updateCategory(req.query.id, req.body);
        if (Category) {
            res.status(200).json(Category);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteCategoryHandler = async (req, res) => {
    try {
        const success = await CategoryRepository.deleteCategory(req.query.id);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

