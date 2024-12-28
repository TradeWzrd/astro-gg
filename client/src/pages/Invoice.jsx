import React, { useEffect } from "react";
import jsPDF from "jspdf";
import { useLocation, useNavigate } from "react-router-dom";

const InvoicePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { orderDetails } = location.state || {};
  const { items = [], orderNumber = "N/A", email = "N/A", subtotal = 0 } = orderDetails || {};

  useEffect(() => {
    if (!orderDetails) {
      navigate("/dashboard"); // Redirect back to dashboard if no order details
    }
  }, [orderDetails, navigate]);

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("THANK YOU FOR YOUR ORDER!", 20, 30);
    doc.setFontSize(12);
    doc.text(
      "Your order has been confirmed. We'll notify you when it's ready for delivery.",
      20,
      40
    );

    let yPosition = 50;
    doc.setFontSize(16);
    doc.text("Order Summary", 20, yPosition);
    yPosition += 10;

    items.forEach((item, index) => {
      doc.setFontSize(12);
      doc.text(`${item.name} - ₹${item.price} x ${item.quantity}`, 20, yPosition);
      doc.text(`Description: ${item.description}`, 20, yPosition + 5);
      yPosition += 15;
    });

    doc.text(`Order Number: ${orderNumber}`, 20, yPosition);
    doc.text(`Email for Updates: ${email}`, 20, yPosition + 5);
    yPosition += 15;

    doc.setFontSize(14);
    doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 20, yPosition);

    doc.setFontSize(10);
    doc.text(
      "Taxes and shipping are calculated at checkout.",
      20,
      yPosition + 10
    );

    doc.save("invoice.pdf");
  };

  if (!orderDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-900 to-purple-700 text-white">
      <main className="w-full max-w-3xl p-4 md:p-6 bg-white/10 rounded-lg backdrop-blur-md">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">THANK YOU FOR YOUR ORDER!</h1>
        <p className="text-center mb-8 text-sm md:text-base">
          Your order has been confirmed. We'll notify you when it's ready for delivery.
        </p>

        <section className="mb-6">
          <h2 className="text-lg md:text-xl font-bold mb-4">Order Summary</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white/10 rounded-lg p-4"
              >
                <div className="flex gap-4 items-center w-full">
                  <div className="w-16 h-16 bg-purple-700 rounded"></div>
                  <div>
                    <h3 className="font-bold text-sm md:text-base">{item.name}</h3>
                    <p className="text-xs md:text-sm text-gray-300">{item.description}</p>
                  </div>
                </div>
                <div className="text-right w-full md:w-auto mt-2 md:mt-0">
                  <p className="font-bold text-sm md:text-base">₹{item.price}</p>
                  <p className="text-xs md:text-sm">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col items-end">
          <div className="mb-4 text-sm md:text-base">
            <p>
              Order Number: <strong>{orderNumber}</strong>
            </p>
            <p>
              Email for Updates: <strong>{email}</strong>
            </p>
          </div>
          <div className="text-right">
            <h3 className="text-lg font-bold">Subtotal:</h3>
            <p className="text-xl font-bold">₹{subtotal.toFixed(2)}</p>
            <p className="text-xs md:text-sm">Taxes and shipping calculated at checkout</p>
          </div>
        </section>

        <button
          className="mt-8 px-4 py-2 w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded"
          onClick={exportToPDF}
        >
          EXPORT TO PDF
        </button>
      </main>
    </div>
  );
};

export default InvoicePage;
