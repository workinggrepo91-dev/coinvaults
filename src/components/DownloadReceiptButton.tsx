"use client";
import { Download } from "lucide-react";
import { downloadReceipt } from "@/lib/generateReceipt";

export default function DownloadReceiptButton({ tx }: { tx: any }) {
  return (
    <button 
      onClick={() => downloadReceipt(tx)} 
      className="text-slate-500 hover:text-emerald-400 transition-colors p-2 rounded-full hover:bg-slate-800" 
      title="Download Receipt"
    >
      <Download size={16} />
    </button>
  );
}
