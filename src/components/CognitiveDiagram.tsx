import React from 'react';

interface CognitiveDiagramProps {
  type: string;
  data?: any;
}

export const CognitiveDiagram: React.FC<CognitiveDiagramProps> = ({ type, data }) => {
  if (type === 'venn3') {
    return (
      <div className="my-4 p-3 bg-white border border-black rounded flex flex-col items-center">
        <div className="w-full max-w-sm">
          <svg viewBox="0 0 400 350" className="w-full h-auto font-serif">
            {/* White clean background */}
            <rect width="400" height="350" fill="#ffffff" />

            {/* Circle A (top-left) */}
            <circle cx="160" cy="140" r="85" fill="none" stroke="#000000" strokeWidth="2" />
            
            {/* Circle B (top-right) */}
            <circle cx="240" cy="140" r="85" fill="none" stroke="#000000" strokeWidth="2" />
            
            {/* Circle C (bottom) */}
            <circle cx="200" cy="215" r="85" fill="none" stroke="#000000" strokeWidth="2" />

            {/* Labels for circles */}
            <text x="100" y="70" className="font-bold fill-black text-xl" textAnchor="middle">A</text>
            <text x="300" y="70" className="font-bold fill-black text-xl" textAnchor="middle">B</text>
            <text x="200" y="330" className="font-bold fill-black text-xl" textAnchor="middle">C</text>

            {/* Sector numbers corresponding to page 7 of PIENSE II booklet */}
            {/* Sector 1: Only A */}
            <text x="125" y="142" textAnchor="middle" className="font-bold fill-black text-base">1</text>

            {/* Sector 2: A & B only */}
            <text x="200" y="112" textAnchor="middle" className="font-bold fill-black text-base">2</text>

            {/* Sector 3: Only B */}
            <text x="275" y="142" textAnchor="middle" className="font-bold fill-black text-base">3</text>

            {/* Sector 4: A & C only */}
            <text x="155" y="202" textAnchor="middle" className="font-bold fill-black text-base">4</text>

            {/* Sector 5: A & B & C (center) */}
            <text x="200" y="172" textAnchor="middle" className="font-bold fill-black text-base">5</text>

            {/* Sector 6: B & C only */}
            <text x="245" y="202" textAnchor="middle" className="font-bold fill-black text-base">6</text>

            {/* Sector 7: Only C */}
            <text x="200" y="272" textAnchor="middle" className="font-bold fill-black text-base">7</text>
          </svg>
        </div>
        {data && (
          <div className="mt-2 text-xs text-black grid grid-cols-1 sm:grid-cols-3 gap-2 w-full max-w-sm border-t border-black pt-2 font-serif">
            <div><span className="font-bold">Círculo A:</span> {data.labelA}</div>
            <div><span className="font-bold">Círculo B:</span> {data.labelB}</div>
            <div><span className="font-bold">Círculo C:</span> {data.labelC}</div>
          </div>
        )}
      </div>
    );
  }

  if (type === 'matrix_grid' && data?.grid) {
    return (
      <div className="my-4 overflow-x-auto p-3 bg-white border border-black rounded flex justify-center">
        <table className="border-collapse border-2 border-black bg-white">
          <tbody>
            {data.grid.map((row: string[], rIdx: number) => (
              <tr key={rIdx}>
                {row.map((cell: string, cIdx: number) => (
                  <td
                    key={cIdx}
                    className={`border border-black px-4 py-2 text-center font-serif text-base min-w-[45px] ${
                      cell === '__' ? 'bg-slate-100 text-black font-bold' : 'text-black'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (type === 'matrix_powers' && data?.grid) {
    return (
      <div className="my-4 overflow-x-auto p-3 bg-white border border-black rounded flex justify-center">
        <table className="border-collapse border-2 border-black bg-white">
          <tbody>
            {data.grid.map((row: string[], rIdx: number) => (
              <tr key={rIdx}>
                {row.map((cell: string, cIdx: number) => (
                  <td
                    key={cIdx}
                    className={`border border-black px-4 py-2 text-center font-serif text-lg min-w-[55px] ${
                      cell === '__' ? 'bg-slate-100 text-black font-bold' : 'text-black'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
};
