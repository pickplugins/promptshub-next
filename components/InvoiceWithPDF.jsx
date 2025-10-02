import React, { useRef } from "react";

// Simple currency formatter
const formatCurrency = (value) => {



  return `${value}Tk`;
};

export default function InvoiceWithPDF({ invoice = null }) {
  const invoiceRef = useRef(null);

  // Default invoice data if none provided
  const sample = invoice || {
    from: {
      name: "KidoBazar.com",
      address: "New Shalbon, House 145 Road 01",
      city: "Rangpur",
    },
    to: {
      name: "",
      address: "",
      city: "",
      phone: "",
    },
    items: [
      { id: 1, desc: "Widget A", qty: 2, price: 50 },
      { id: 2, desc: "Service B", qty: 1, price: 75 },
    ],
    taxPercent: 10,
    payment_method: "COD",
    payment_status: "pending",
    shipping: 0,
    invoiceNumber: "INV-001",
    date: new Date().toLocaleDateString(),
  };

  const downloadPDF = async () => {
    try {
      // Dynamic import of jsPDF
      const jsPDF = (await import("jspdf")).default;

      // Create PDF directly without html2canvas
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      let yPos = margin;

      // Set font
      pdf.setFont("helvetica");

      // Header - Company Info
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.text(sample.from.name, margin, yPos);
      yPos += 10;

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.text(sample.from.address, margin, yPos);
      yPos += 6;
      pdf.text(sample.from.city, margin, yPos);
      yPos += 15;

      // Invoice Info (right aligned)
      const invoiceInfoX = pageWidth - margin;
      pdf.setFontSize(16);
      pdf.setFont("helvetica", "bold");
      pdf.text(`INVOICE - #${sample.invoiceNumber}`, invoiceInfoX, margin, { align: "right" });

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.text(sample.date, invoiceInfoX, margin + 8, { align: "right" });

      pdf.text(`Payment Status: ${sample.payment_status}`, invoiceInfoX, margin + 14, { align: "right" });

      // Bill To
      pdf.setFont("helvetica", "bold");
      pdf.text("BILL TO:", margin, yPos);
      yPos += 6;

      pdf.setFont("helvetica", "normal");
      pdf.text(sample.to.name, margin, yPos);
      yPos += 6;
      pdf.text(sample.to.address, margin, yPos);
      yPos += 12;
      // pdf.text(sample.to.city, margin, yPos);
      // yPos += 6;
      // pdf.text(sample.to.phone, margin, yPos);
      // yPos += 6;

      // Table Header
      const tableStartY = yPos;
      const colWidths = [80, 30, 40, 40]; // Description, Qty, Price, Total
      const colPositions = [margin, margin + colWidths[0], margin + colWidths[0] + colWidths[1], margin + colWidths[0] + colWidths[1] + colWidths[2]];

      // Draw table header background
      pdf.setFillColor(245, 245, 245);
      pdf.rect(margin, yPos - 5, pageWidth - 2 * margin, 12, 'F');

      // Draw table borders
      pdf.setLineWidth(0.5);
      pdf.setDrawColor(204, 204, 204);

      // Header text
      pdf.setFont("helvetica", "bold");
      pdf.text("Description", colPositions[0] + 2, yPos + 2);
      pdf.text("Qty", colPositions[1] + 2, yPos + 2);
      pdf.text("Price", colPositions[2] + 2, yPos + 2);
      pdf.text("Total", colPositions[3] + 2, yPos + 2);

      yPos += 14;

      // Table rows
      pdf.setFont("helvetica", "normal");
      sample.items.forEach((item) => {
        const itemTotal = item.qty * item.price;

        // Draw row background (alternating)
        if (sample.items.indexOf(item) % 2 === 0) {
          pdf.setFillColor(255, 255, 255);
          pdf.rect(margin, yPos - 5, pageWidth - 2 * margin, 10, 'F');
        }

        const wrappedText = pdf.splitTextToSize(item.desc, colWidths[0]);


        pdf.text(wrappedText, colPositions[0] + 2, yPos);
        pdf.text(item.qty.toString(), colPositions[1] + 2, yPos);
        pdf.text(formatCurrency(item.price), colPositions[2] + 2, yPos);
        pdf.text(formatCurrency(itemTotal), colPositions[3] + 2, yPos);

        yPos += 16;
      });

      // Draw table borders
      const tableHeight = yPos - tableStartY;

      // Outer border
      pdf.rect(margin, tableStartY - 5, pageWidth - 2 * margin, tableHeight);

      // Column separators
      for (let i = 1; i < colPositions.length; i++) {
        pdf.line(colPositions[i], tableStartY - 5, colPositions[i], yPos - 5);
      }

      // Header separator
      pdf.line(margin, tableStartY + 7, pageWidth - margin, tableStartY + 7);

      yPos += 20;

      // Totals
      // const subtotal = sample.items.reduce((s, it) => s + it.qty * it.price, 0);
      // const tax = (subtotal * (sample.taxPercent || 0)) / 100;
      const total = sample.total;
      const discount = sample.discount;
      const shipping = sample.shipping;
      const subtotal = sample.subtotal;

      const totalsX = pageWidth - margin;

      pdf.text(`Subtotal: ${formatCurrency(total)}`, totalsX, yPos, { align: "right" });
      yPos += 8;

      // pdf.text(`Tax (${sample.taxPercent}%): ${formatCurrency(tax)}`, totalsX, yPos, { align: "right" });
      // yPos += 12;
      pdf.text(`Discount (${sample.taxPercent}%): -${formatCurrency(discount)}`, totalsX, yPos, { align: "right" });
      yPos += 12;
      pdf.text(`Delivery Charge: +${formatCurrency(shipping)}`, totalsX, yPos, { align: "right" });
      yPos += 12;




      // Total line
      pdf.setLineWidth(1);
      pdf.line(pageWidth - 80, yPos - 6, pageWidth - margin, yPos - 6);

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      pdf.text(`TOTAL: ${formatCurrency(subtotal)}`, totalsX, yPos, { align: "right" });

      // Save the PDF
      pdf.save(`invoice-${sample.invoiceNumber || "export"}.pdf`);

    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Failed to create PDF. Please try again or check console for details.");
    }
  };

  // const subtotal = sample.items.reduce((s, it) => s + it.qty * it.price, 0);
  // const tax = (subtotal * (sample.taxPercent || 0)) / 100;
  const total = sample.total;
  const discount = sample.discount;
  const shipping = sample.shipping;
  const subtotal = sample.subtotal;


  return (
    <div className="  ">

      {/* Download Button */}
      <div className="flex justify-end mb-5">
        <div
          onClick={downloadPDF}
          className="flex items-center gap-3 text-500 px-4 rounded-sm py-2 hover:bg-[#783009] bg-[#783009] cursor-pointer text-white"
        >
          Download PDF
        </div>
      </div>

      <div
        ref={invoiceRef}
        className="bg-white  p-8  mx-auto shadow-sm"
        style={{
          fontFamily: 'Arial, sans-serif',
          color: '#000000',
          backgroundColor: '#ffffff'
        }}
      >
        {/* Header */}
        <div className="flex flex-wrap gap-10 justify-between items-start mb-8">
          <div className="order-2 xl:order-1">
            <h1 className="text-2xl font-bold mb-2" style={{ color: '#000000' }}>
              {sample.from.name}
            </h1>
            <div className="text-sm flex flex-col gap-2">
              <div>{sample.from.address}</div>
              <div>{sample.from.city}</div>
            </div>
          </div>

          <div className="text-left order-1 xl:order-2 xl:text-right flex flex-col gap-2">
            <div className="text-xl font-bold mb-1" style={{ color: '#000000' }}>INVOICE</div>
            <div className="text-sm">#{sample.invoiceNumber}</div>
            <div className="text-sm">Payment Status: {sample.payment_status}</div>
            <div className="text-sm">{sample.date}</div>
            <div className="text-sm">{sample.payment_method}</div>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-8">
          <div className="font-bold mb-2" style={{ color: '#000000' }}>BILL TO:</div>
          <div className="text-sm flex flex-col gap-1">
            <div>{sample.to.name}</div>
            <div>{sample.to.address}</div>
            <div>{sample.to.city} </div>
            <div>{sample.to.phone}</div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th className="border border-gray-400 p-3 text-left font-bold" style={{ color: '#000000' }}>
                  Description
                </th>
                <th className="border border-gray-400 p-3 text-center font-bold" style={{ color: '#000000' }}>
                  Qty
                </th>
                <th className="border border-gray-400 p-3 text-right font-bold" style={{ color: '#000000' }}>
                  Unit Price
                </th>
                <th className="border border-gray-400 p-3 text-right font-bold" style={{ color: '#000000' }}>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {sample.items.map((item, index) => (
                <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                  <td className="border border-gray-400 p-3" style={{ color: '#000000' }}>
                    <span dangerouslySetInnerHTML={{ __html: item.desc }} />
                  </td>
                  <td className="border border-gray-400 p-3 text-center" style={{ color: '#000000' }}>
                    {item.qty}
                  </td>
                  <td className="border border-gray-400 p-3 text-right" style={{ color: '#000000' }}>
                    {formatCurrency(item.price)}
                  </td>
                  <td className="border border-gray-400 p-3 text-right" style={{ color: '#000000' }}>
                    {formatCurrency(item.qty * item.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="text-right min-w-48">
            <div className="mb-2">
              <strong style={{ color: '#000000' }}>Subtotal: {formatCurrency(total)}</strong>
            </div>
            <div className="mb-4">
              <strong style={{ color: '#000000' }}>Discount  - {formatCurrency(discount)}</strong>
            </div>
            <div className="mb-4">
              <strong style={{ color: '#000000' }}>Shipping Charge  + {formatCurrency(shipping)}</strong>
            </div>


            {/* <div className="mb-4">
              <strong style={{ color: '#000000' }}>Tax ({sample.taxPercent}%): {formatCurrency(tax)}</strong>
            </div> */}



            <div
              className="text-lg font-bold border-t-2 pt-2"
              style={{
                borderTopColor: '#000000',
                color: '#000000'
              }}
            >
              TOTAL: {formatCurrency(subtotal)}
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}