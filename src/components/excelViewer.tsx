import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelViewer: React.FC = () => {
  const [data, setData] = useState<any[][]>([]);

  // Function to fetch and parse XLSX from the URL
  const handleXLSXFetch = async (url: string) => {
    try {
      // Fetch the file from the URL
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer(); // Read the file as an ArrayBuffer

      // Parse the XLSX file
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      setData(jsonData); // Store the parsed data in the state
    } catch (error) {
      console.error('Error reading XLSX file:', error);
    }
  };

  // Handle right-click on the table
  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();  // Prevent the context menu
    alert('Right-click is disabled on this file!');
  };

  return (
    <div>
      <h1>Load XLSX from Link</h1>

      {/* Link to trigger file loading */}
      <button onClick={() => handleXLSXFetch('/sample.xls')}>
        Load XLSX Data
      </button>

      {data.length > 0 && (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          {/* Table to display XLSX content */}
          <table
            onContextMenu={handleRightClick} // Disable right-click on the table
            style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}
            draggable={false}  // Disable dragging
          >
            <thead>
              <tr>
                {data[0].map((col: string, idx: number) => (
                  <th key={idx} style={{ border: '1px solid black', padding: '5px' }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.slice(1).map((row: any[], idx: number) => (
                <tr key={idx}>
                  {row.map((cell: any, cellIdx: number) => (
                    <td key={cellIdx} style={{ border: '1px solid black', padding: '5px' }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Invisible overlay to prevent interactions */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0)', // Invisible overlay
              pointerEvents: 'none', // Allow table to be visible and interactive
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ExcelViewer;
