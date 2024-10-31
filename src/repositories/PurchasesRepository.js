import User from "@/models/User";
import Product from "@/models/Product";
import  {Op} from "sequelize";
import {PURCHASE_PREFIX, PURCHASE_STATUS} from "@/utils/constants";
import * as path from "path";
import PDFDocument from "pdfkit";
import * as fs from "fs";
import {createPurchaseReceipt} from "@/utils/purchase-receipt-template";
import {storage} from "@/lib/firebaseAdmin";
import Purchases from "@/models/Purchases";
import {generateOrderNumber} from "@/utils/helper-functions";

export const createPurchase = async (purchaseData) => {
    const purchaseNo = generateOrderNumber(PURCHASE_PREFIX);
    return await Purchases.create({...purchaseData, purchase_no: purchaseNo});
};
export const getAllPurchases = async (filters) => {
    let whereConditions = {};

    if (filters.user_id) {
        whereConditions.supplier_id = filters.user_id;
    }
    if (filters.payment_status) {
        whereConditions.payment_code = filters.payment_status.toLowerCase() !== 'paid' ? { [Op.is]: null } : { [Op.not]: null };
    }

    if (filters.status) {
        whereConditions.status = filters.status;;
    }

    const purchases = await Purchases.findAll({
        where: whereConditions,
        include: [
            {
                model: User,
                attributes: ['id','username'],
            },
            {
                model: Product,
                attributes: ['prod_id','prod_name', 'image'],
            }
        ],
        order: [['id', 'desc']]
    });
    return { success: true, message: "Purchases fetched successfully!"  ,  data: purchases}

};
export const updatePurchaseStatus = async (id, data) => {
    const purchase = await Purchases.findByPk(id);
    if (purchase) {
        if (data?.status === PURCHASE_STATUS.CANCELED && purchase.status !== PURCHASE_STATUS.PENDING){
            throw new Error("Purchase is already approved!")
        }

        if (data?.status === PURCHASE_STATUS.DELIVERED){
            await addProductQuantity(purchase);
        }
        const updatedPurchase = await purchase.update(data);
        return { success: true, message: "Purchase Updated Successfully"  , action: 'updated', order: updatedPurchase }
    }
    return null;
};
const addProductQuantity = async (purchase) => {
    try {
        const product = await Product.findByPk(purchase.prod_id);
        if (product) {
            product.qty += purchase.original_qty;
            await product.save();
        }
    } catch (error) {
        throw error;
    }
};

export const generateReceipt = async (req, res) => {
    const purchase = await Purchases.findByPk(req.query.id, {
        include: [
            {
                model: User,
                attributes: ['id','username'],
            },
            {
                model: Product,
                attributes: ['prod_id','prod_name', 'image'],
            }
        ],
    });
    if (!purchase) {
        throw new Error("Purchase not found");
    }

    // Create a PDF document
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const fileName = `purchase-receipt-${purchase.id}.pdf`;
    const tempFilePath = path.join(process.cwd(), "public", "receipts", fileName);

    // Create the PDF and write to a temporary file
    const writeStream = fs.createWriteStream(tempFilePath);
    doc.pipe(writeStream);

    const logoPath = path.join(process.cwd(), "public/static", "logo.png");

    // Create the receipt content
    createPurchaseReceipt(doc, logoPath, purchase);

    // Finalize the PDF and upload to Firebase
    doc.end();

    // Upload to Firebase Storage after PDF generation
    writeStream.on("finish", async () => {
        const bucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
        const destination = `purchase-receipts/${fileName}`;
        await bucket.upload(tempFilePath, {
            destination: destination,
            contentType: "application/pdf",
        });

        // Generate a signed URL for temporary access
        const [url] = await bucket.file(destination).getSignedUrl({
            action: "read",
            expires: "03-01-2030", // Set your expiration date here
        });

        // Clean up the temporary file
        fs.unlinkSync(tempFilePath);

        res.status(200).json({ success: true, fileUrl: url, fileName });
    });
};




