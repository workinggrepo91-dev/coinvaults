import jsPDF from "jspdf";

export function downloadReceipt(tx: any) {
  const doc = new jsPDF();
  
  // Colors and Fonts
  doc.setFillColor(15, 23, 42); // slate-900 background
  doc.rect(0, 0, 210, 297, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("COIN VAULT", 105, 30, { align: "center" });

  doc.setFontSize(14);
  doc.setTextColor(16, 185, 129); // emerald-500
  doc.text("TRANSACTION RECEIPT", 105, 45, { align: "center" });

  doc.setDrawColor(30, 41, 59); // slate-800
  doc.line(20, 55, 190, 55);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(148, 163, 184); // slate-400

  const startY = 75;
  const lineSpacing = 15;

  const details = [
    { label: "Transaction ID:", value: tx.id || `TX-${Math.floor(Math.random() * 1000000)}` },
    { label: "Type:", value: tx.type },
    { label: "Amount:", value: `${tx.amount?.toLocaleString(undefined, { maximumFractionDigits: 8 })} ${tx.asset}` },
    { label: "Date:", value: tx.date },
    { label: "Time:", value: tx.time },
    { label: "Narration:", value: tx.narration },
    { label: "Status:", value: "COMPLETED" },
  ];

  details.forEach((item, index) => {
    const y = startY + (index * lineSpacing);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.setFont("helvetica", "bold");
    doc.text(item.label, 30, y);
    
    doc.setTextColor(248, 250, 252); // slate-50
    doc.setFont("helvetica", "normal");
    doc.text(item.value, 80, y);
  });

  doc.line(20, 190, 190, 190);

  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text("This receipt is automatically generated and does not require a signature.", 105, 210, { align: "center" });

  doc.save(`Receipt_${tx.type}_${tx.date}.pdf`);
}
