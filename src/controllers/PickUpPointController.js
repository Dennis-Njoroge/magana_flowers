import * as PickUpPointRepository from '@/repositories/PickUpPointRepository';

export const createPickUpPointHandler = async (req, res) => {
    try {
        const PickUpPoint = await PickUpPointRepository.createPickUpPoint(req.body);
        res.status(201).json(PickUpPoint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllPickUpPointsHandler = async (req, res) => {
    try {
        const PickUpPoints = await PickUpPointRepository.getPickUpPoints();
        res.status(200).json(PickUpPoints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPickUpPointByIdHandler = async (req, res) => {
    try {
        const pickUpPoint = await PickUpPointRepository.getPickUpPointById(req.query.id);
        if (pickUpPoint) {
            res.status(200).json(pickUpPoint);
        } else {
            res.status(404).json({ error: 'Pick Up Point not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePickUpPointHandler = async (req, res) => {
    try {
        const pickUpPoint = await PickUpPointRepository.updatePickUpPoint(req.query.id, req.body);
        if (pickUpPoint) {
            res.status(200).json(pickUpPoint);
        } else {
            res.status(404).json({ error: 'PickUpPoint not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deletePickUpPointHandler = async (req, res) => {
    try {
        const success = await PickUpPointRepository.deletePickUpPoint(req.query.id);
        if (success) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Pick Up Point not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



