import { formatDate} from "@/utils/helper-functions";

function generateHeader(doc, logoPath) {
    doc
        .image(logoPath, 50, 20, { width: 100 })
        .fillColor("#444444")
        // .fontSize(20)
        // .text("Magana Flowers LTD.", 110, 57)
        .fontSize(10)
        .text("Magana Flowers LTD", 200, 50, { align: "right" })
        .text("info@magana.com", 200, 65, { align: "right" })
        .text("+(254) 712345678 | +(254) 12536271", 200, 80, { align: "right" })
        .moveDown();
}

function generateCustomerInformation(doc, order) {
    doc
        .fillColor("#444444")
        .font("Helvetica-Bold")
        .fontSize(20)
        .text("Receipt", 50, 160);

    generateHr(doc, 185);

    const customerInformationTop = 200;
    const orderDate = formatDate(order?.order_date, 'DD/MM/YYYY HH:mm a')

    doc
        .fontSize(10)
        .text("Order Number:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text(order.order_no, 150, customerInformationTop)
        .font("Helvetica")
        .text("Order Date:", 50, customerInformationTop + 15)
        .text(orderDate, 150, customerInformationTop + 15)
        .text("Payment Reference:", 50, customerInformationTop + 30)
        .text(
            order.payment_id,
            150,
            customerInformationTop + 30
        )

        .font("Helvetica-Bold")
        .text(order?.User?.username, 300, customerInformationTop)
        .font("Helvetica")
        .text(order?.User?.email, 300, customerInformationTop + 15)
        .text(
            order?.ShippingDetail?.location,
            300,
            customerInformationTop + 30
        )
        .moveDown();

    generateHr(doc, 252);
}

function generateInvoiceTable(doc, order) {
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

    for (i = 0; i < order.OrderDetails.length; i++) {
        const item = order.OrderDetails[i];
        const position = invoiceTableTop + (i + 1) * 30;

        generateTableRow(
            doc,
            position,
            item.Product.prod_name,
            formatCurrency(item.price),
            item.qty,
            formatCurrency(item.qty * item.price)
        );

        generateHr(doc, position + 20);
    }

    const subtotalPosition = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
        doc,
        subtotalPosition,
        "",
        "",
        "Subtotal",
        formatCurrency((order.total_amount - order.shipping_charge))
    );

    const paidToDatePosition = subtotalPosition + 20;
    generateTableRow(
        doc,
        paidToDatePosition,
        "",
        "",
        "+ Shipping Fee",
        formatCurrency(order?.shipping_charge)
    );

    const duePosition = paidToDatePosition + 25;
    doc.font("Helvetica-Bold");
    generateTableRow(
        doc,
        duePosition,
        "",
        "",
        "Total Amount",
        formatCurrency(order?.total_amount, 'KES ')
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


export const createReceipt = (doc, logoPath, order) => {
    generateHeader(doc, logoPath);
    generateCustomerInformation(doc, order);
    generateInvoiceTable(doc, order);
    generateFooter(doc);
}




