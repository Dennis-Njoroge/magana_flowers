import { formatDate} from "@/utils/helper-functions";

function generateHeader(doc, logoPath) {
    doc
        .image(logoPath, 50, 20, { width: 100 })
        .fillColor("#444444")
        .fontSize(10)
        .text("Magana Flowers LTD", 200, 50, { align: "right" })
        .text("info@magana.com", 200, 65, { align: "right" })
        .text("+(254) 712345678 | +(254) 12536271", 200, 80, { align: "right" })
        .moveDown();
}

function generateCustomerInformation(doc, purchase) {
    doc
        .fillColor("#444444")
        .font("Helvetica-Bold")
        .fontSize(20)
        .text("Purchase Receipt", 50, 160);

    generateHr(doc, 185);

    const customerInformationTop = 200;
    const purchaseDate = formatDate(purchase?.create_on, 'DD/MM/YYYY HH:mm a')

    doc
        .fontSize(10)
        .text("Purchase Number:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text(purchase.purchase_no, 150, customerInformationTop)
        .font("Helvetica")
        .text("Purchase Date:", 50, customerInformationTop + 15)
        .text(purchaseDate, 150, customerInformationTop + 15)
        .text("Payment Reference:", 50, customerInformationTop + 30)
        .text(
            purchase.payment_code,
            150,
            customerInformationTop + 30
        )

        .font("Helvetica-Bold")
        .text(purchase?.User?.username, 300, customerInformationTop)
        .font("Helvetica")
        .text(purchase?.User?.email, 300, customerInformationTop + 15)
        .text(
            '-',
            300,
            customerInformationTop + 30
        )
        .moveDown();

    generateHr(doc, 252);
}

function generateInvoiceTable(doc, purchase) {
    let i;
    const invoiceTableTop = 330;

    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        invoiceTableTop,
        "Item",
        "Unit Cost",
        "Quantity",
        "Line Total"
    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");

    const position = invoiceTableTop + 30;
    const totalAmount = purchase.available_qty * purchase.final_price_per_unit;

    generateTableRow(
        doc,
        position,
        purchase.Product.prod_name,
        formatCurrency(purchase.final_price_per_unit),
        purchase.available_qty,
        formatCurrency(totalAmount)
    );

    generateHr(doc, position + 20);

    const subtotalPosition = invoiceTableTop + 2 * 30;
    generateTableRow(
        doc,
        subtotalPosition,
        "",
        "",
        "Subtotal",
        formatCurrency((totalAmount))
    );

    const paidToDatePosition = subtotalPosition + 20;
    generateTableRow(
        doc,
        paidToDatePosition,
        "",
        "",
        "+ VAT",
        formatCurrency(0)
    );

    const duePosition = paidToDatePosition + 25;
    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        duePosition,
        "",
        "",
        "Total Amount",
        formatCurrency(totalAmount, 'KES ')
    );
    doc.font("Helvetica");
}

function generateFooter(doc) {
    doc
        .fontSize(10)
        .text(
            "Thank you for your business.",
            50,
            780,
            { align: "center", width: 500 }
        );
}

function generateTableRow(
    doc,
    y,
    item,
    unitCost,
    quantity,
    lineTotal
) {
    doc
        .fontSize(10)
        .text(item, 50, y)
        // .text(description, 150, y)
        .text(unitCost, 280, y, { width: 90, align: "right" })
        .text(quantity, 370, y, { width: 90, align: "right" })
        .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
    doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

function formatCurrency( value, currecy='') {
    return currecy +  value.toFixed(2);
}


export const createPurchaseReceipt = (doc, logoPath, purchase) => {
    generateHeader(doc, logoPath);
    generateCustomerInformation(doc, purchase);
    generateInvoiceTable(doc, purchase);
    generateFooter(doc);
}




