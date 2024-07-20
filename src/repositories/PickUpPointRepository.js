import PickUpPoint from "@/models/PickUpPoint";


export const createPickUpPoint = async (data) => {
    return await PickUpPoint.create(data);
};

export const getPickUpPoints = async () => {
    return await PickUpPoint.findAll();
};

export const getPickUpPointById = async (id) => {
    return await PickUpPoint.findByPk(id);
};

export const updatePickUpPoint = async (id, data) => {
    const pickUpPoint = await PickUpPoint.findByPk(id);
    if (pickUpPoint) {
        return await pickUpPoint.update(data);
    }
    return null;
};

export const deletePickUpPoint = async (id) => {
    const pickUpPoint = await PickUpPoint.findByPk(id);
    if (pickUpPoint) {
        await pickUpPoint.destroy();
        return true;
    }
    return false;
};

