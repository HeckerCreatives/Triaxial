import jsPDF from 'jspdf'
import html2canvas from "html2canvas";
import { ToastSuccess } from '@/components/common/Toast';

export const downloadInvoiceAsPdf = async () => {
    const invoiceElement = document.getElementById("invoice-container");

    if (!invoiceElement) {
      return;
    }

    // Convert the invoice component to a canvas
    const canvas = await html2canvas(invoiceElement);

    // Get the image data from the canvas
    const imgData = canvas.toDataURL("image/png");

    // Initialize jsPDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Calculate the dimensions
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add the image to the PDF
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Download the PDF
    pdf.save("invoice.pdf");

    ToastSuccess('Invoice downloaded successfully')
};

export const printInvoice = () => {
    const invoiceElement = document.getElementById("invoice-container");

    if (!invoiceElement) {
      return;
    }

    const originalContent = document.body.innerHTML;
    const printContent = invoiceElement.outerHTML;

    // Set the page content to the invoice content only
    document.body.innerHTML = printContent;

    // Trigger the print dialog
    window.print();

    // Restore the original content
    document.body.innerHTML = originalContent;

    // Ensure the page is reloaded to bring back any dynamic content
    window.location.reload();
};