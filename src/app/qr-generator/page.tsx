'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Copy, Check } from 'lucide-react';

export default function QRGeneratorPage() {
  const [tableNumber, setTableNumber] = useState('1');
  const [copied, setCopied] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const qrUrl = `${baseUrl}/menu?table=${tableNumber}`;

  const handleDownload = () => {
    const svg = document.getElementById('qr-code')?.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `table-${tableNumber}-qr.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(qrUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">QR Code Generator</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Table Number
              </label>
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter table number"
              />
            </div>

            <div className="flex flex-col items-center mb-6">
              <div
                id="qr-code"
                className="p-4 bg-white rounded-lg border-2 border-gray-200"
              >
                <QRCodeSVG value={qrUrl} size={256} />
              </div>
              <p className="mt-4 text-sm text-gray-600 text-center">
                Table #{tableNumber}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">QR Code URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={qrUrl}
                  readOnly
                  className="flex-1 p-3 border rounded-lg bg-gray-50"
                />
                <button
                  onClick={handleCopy}
                  className="px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleDownload}
                className="flex-1 bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download QR Code
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Instructions:</strong> Print this QR code and place it on the table.
                Customers can scan it to view the menu and place orders.
              </p>
            </div>
          </div>

          {/* Preview multiple tables */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Quick Generate (Tables 1-10)</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setTableNumber(String(num))}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    tableNumber === String(num)
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="font-semibold">Table {num}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

