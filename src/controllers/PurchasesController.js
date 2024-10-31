import * as purchaseRepository from "@/repositories/PurchasesRepository";

export const createPurchaseHandler = async (req, res) => {
    try {
        const purchase = await purchaseRepository.createPurchase(req.body);
        if (!purchase){
            res.status(400).json({ error: "Invalid request"});
            return;
        }
        res.status(201).json(purchase);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllPurchasesHandler = async (req, res) => {
    try {
        const purchases = await purchaseRepository.getAllPurchases(req?.query);
        res.status(200).json(purchases);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePurchaseStatusHandler = async (req, res) => {
    try {
        const purchase = await purchaseRepository.updatePurchaseStatus(req.query.id, req.body);
        if (purchase) {
            res.status(200).json(purchase);
        } else {
            res.status(404).json({ error: 'Purchase not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const generateReceiptHandler = async (req, res) => {
    try{
        return await purchaseRepository.generateReceipt(req, res);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}




