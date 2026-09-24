import React from 'react';

interface MathDiagramProps {
  type: string;
  data?: any;
}

export const MathDiagram: React.FC<MathDiagramProps> = ({ type, data }) => {
  switch (type) {
    case 'number_line':
      return (
        <div className="my-4 p-3 bg-white border border-black rounded flex flex-col items-center">
          <div className="w-full max-w-lg">
            <svg viewBox="0 0 500 110" className="w-full h-auto font-serif">
              <defs>
                <marker id="arrow-bw-start" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 10 0 L 0 5 L 10 10 z" fill="#000000" />
                </marker>
                <marker id="arrow-bw-end" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#000000" />
                </marker>
              </defs>
              {/* Axis line */}
              <line x1="20" y1="55" x2="480" y2="55" stroke="#000000" strokeWidth="2" markerStart="url(#arrow-bw-start)" markerEnd="url(#arrow-bw-end)" />
              {/* Ticks: step is 30px -> unit = 1/6 */}
              {[
                { x: 50, label: '-1/6', sub: true },
                { x: 80, label: '0', isZero: true },
                { x: 110, dot: true },
                { x: 140, dot: true },
                { x: 170, dot: true },
                { x: 200, label: 'P', highlight: true },
                { x: 230, dot: true },
                { x: 250, label: 'Q' },
                { x: 280, dot: true },
                { x: 310, label: 'R' },
                { x: 340, dot: true },
                { x: 370, dot: true },
                { x: 400, label: 'S' },
              ].map((pt, idx) => (
                <g key={idx}>
                  <circle cx={pt.x} cy="55" r={pt.highlight ? "4" : "2.5"} fill="#000000" />
                  <line x1={pt.x} y1="48" x2={pt.x} y2="62" stroke="#000000" strokeWidth="1.5" />
                  {pt.label && (
                    <text
                      x={pt.x}
                      y={pt.sub ? "85" : "36"}
                      textAnchor="middle"
                      className={`text-sm fill-black ${pt.highlight ? 'font-bold' : ''}`}
                    >
                      {pt.label}
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </div>
          <div className="text-xs text-black mt-1 font-serif italic">Recta con intervalos iguales de 1/6</div>
        </div>
      );

    case 'segmented_bars':
      return (
        <div className="my-4 p-3 bg-white border border-black rounded flex flex-col items-center">
          <div className="w-full max-w-md space-y-3 font-serif">
            <div>
              <div className="text-xs text-black mb-1">1/5 de longitud 4:</div>
              <div className="h-6 border-2 border-black bg-white flex divide-x-2 divide-black">
                <div className="flex-1 bg-slate-200 flex items-center justify-center text-xs font-bold text-black">1/5</div>
                <div className="flex-1 bg-white"></div>
                <div className="flex-1 bg-white"></div>
                <div className="flex-1 bg-white"></div>
                <div className="flex-1 bg-white"></div>
              </div>
            </div>
            <div>
              <div className="text-xs text-black mb-1">1/3 de longitud 3:</div>
              <div className="h-6 border-2 border-black bg-white flex divide-x-2 divide-black">
                <div className="flex-1 bg-slate-200 flex items-center justify-center text-xs font-bold text-black">1/3</div>
                <div className="flex-1 bg-white"></div>
                <div className="flex-1 bg-white"></div>
              </div>
            </div>
            <div>
              <div className="text-xs text-black mb-1">1/2 de longitud total 10:</div>
              <div className="h-6 border-2 border-black bg-white flex divide-x-2 divide-black">
                <div className="flex-1 bg-slate-300 flex items-center justify-center text-xs font-bold text-black">1/2</div>
                <div className="flex-1 bg-white"></div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-black pt-1 border-t border-black">
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>
        </div>
      );

    case 'coordinate_plane':
      return (
        <div className="my-4 p-3 bg-white border border-black rounded flex flex-col items-center">
          <svg viewBox="0 0 320 270" className="w-full max-w-xs h-auto font-serif">
            {/* Grid axis */}
            <line x1="20" y1="135" x2="300" y2="135" stroke="#000000" strokeWidth="2" />
            <line x1="140" y1="20" x2="140" y2="250" stroke="#000000" strokeWidth="2" />
            <text x="295" y="127" className="text-xs fill-black font-bold">x</text>
            <text x="145" y="25" className="text-xs fill-black font-bold">y</text>

            {/* PQ segment parallel to x */}
            <line x1="70" y1="80" x2="210" y2="80" stroke="#000000" strokeWidth="2" />
            {/* QR segment parallel to y */}
            <line x1="70" y1="80" x2="70" y2="210" stroke="#000000" strokeWidth="2" />

            {/* Points */}
            <circle cx="70" cy="80" r="3.5" fill="#000000" />
            <text x="52" y="75" className="text-sm font-bold fill-black">Q</text>

            <circle cx="210" cy="80" r="3.5" fill="#000000" />
            <text x="218" y="75" className="text-sm font-bold fill-black">P</text>

            <circle cx="70" cy="210" r="3.5" fill="#000000" />
            <text x="52" y="222" className="text-sm font-bold fill-black">R</text>

            {/* E on y axis */}
            <circle cx="140" cy="80" r="3" fill="#000000" />
            <text x="145" y="75" className="text-xs font-bold fill-black">E</text>

            {/* F on x axis */}
            <circle cx="70" cy="135" r="3" fill="#000000" />
            <text x="55" y="130" className="text-xs font-bold fill-black">F</text>

            {/* Distance hints */}
            <text x="135" y="68" textAnchor="middle" className="text-xs fill-black font-serif">dist(P,Q) = 5</text>
            <text x="40" y="155" textAnchor="middle" className="text-xs fill-black font-serif" transform="rotate(-90 40 155)">dist(Q,R) = 6</text>
          </svg>
        </div>
      );

    case 'two_circles':
      return (
        <div className="my-4 p-3 bg-white border border-black rounded flex justify-center items-center gap-6">
          <svg viewBox="0 0 280 140" className="w-full max-w-xs h-auto font-serif">
            {/* Small circle */}
            <circle cx="65" cy="70" r="45" fill="none" stroke="#000000" strokeWidth="2" />
            <line x1="65" y1="70" x2="110" y2="70" stroke="#000000" strokeWidth="1.5" strokeDasharray="3,3" />
            <circle cx="65" cy="70" r="2.5" fill="#000000" />
            <text x="85" y="65" className="text-xs font-serif font-bold fill-black">radio = x</text>

            {/* Big circle */}
            <circle cx="195" cy="70" r="60" fill="none" stroke="#000000" strokeWidth="2" />
            <line x1="195" y1="70" x2="255" y2="70" stroke="#000000" strokeWidth="1.5" strokeDasharray="3,3" />
            <circle cx="195" cy="70" r="2.5" fill="#000000" />
            <text x="215" y="65" className="text-xs font-serif font-bold fill-black">radio = x+1</text>
          </svg>
        </div>
      );

    case 'two_squares':
      return (
        <div className="my-4 p-3 bg-white border border-black rounded flex flex-col items-center">
          <svg viewBox="0 0 300 180" className="w-full max-w-xs h-auto font-serif">
            {/* Square 1 */}
            <rect x="50" y="82" width="70" height="70" fill="none" stroke="#000000" strokeWidth="2" />
            <text x="85" y="122" textAnchor="middle" className="text-xs font-bold fill-black">x</text>

            {/* Square 2 */}
            <rect x="120" y="47" width="105" height="105" fill="none" stroke="#000000" strokeWidth="2" />
            <text x="172" y="105" textAnchor="middle" className="text-xs font-bold fill-black">y</text>

            {/* Total baseline bracket */}
            <line x1="50" y1="165" x2="225" y2="165" stroke="#000000" strokeWidth="1.5" />
            <line x1="50" y1="160" x2="50" y2="170" stroke="#000000" strokeWidth="1.5" />
            <line x1="225" y1="160" x2="225" y2="170" stroke="#000000" strokeWidth="1.5" />
            <text x="137" y="178" textAnchor="middle" className="text-xs font-bold fill-black">10</text>
          </svg>
          <div className="text-xs text-black mt-1 font-serif italic">Diferencia de áreas = 20 cm²</div>
        </div>
      );

    case 'parallel_lines':
      return (
        <div className="my-4 p-3 bg-white border border-black rounded flex flex-col items-center">
          <svg viewBox="0 0 280 190" className="w-full max-w-xs h-auto font-serif">
            {/* Parallel lines l2 and l3 */}
            <line x1="30" y1="65" x2="250" y2="65" stroke="#000000" strokeWidth="2" />
            <text x="255" y="69" className="text-xs font-bold fill-black">l₂</text>

            <line x1="30" y1="135" x2="250" y2="135" stroke="#000000" strokeWidth="2" />
            <text x="255" y="139" className="text-xs font-bold fill-black">l₃</text>

            {/* Transversal l1 */}
            <line x1="60" y1="180" x2="200" y2="20" stroke="#000000" strokeWidth="2" />
            <text x="205" y="24" className="text-xs font-bold fill-black">l₁</text>

            {/* Angles */}
            <text x="155" y="80" className="text-sm font-bold fill-black">β</text>
            <text x="95" y="155" className="text-sm font-bold fill-black">50°</text>
          </svg>
        </div>
      );

    case 'two_rectangles':
      return (
        <div className="my-4 p-3 bg-white border border-black rounded flex justify-center items-center gap-6 font-serif">
          <div className="flex gap-6">
            <div className="w-24 h-20 border-2 border-black bg-white flex flex-col justify-between p-1 relative">
              <span className="text-xs font-bold text-center text-black">6</span>
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-bold text-black">5</span>
                <span className="text-xs font-bold text-black">5</span>
              </div>
              <span className="text-xs font-bold text-center text-black">6</span>
            </div>
            <div className="w-24 h-20 border-2 border-black bg-white flex flex-col justify-between p-1 relative">
              <span className="text-xs font-bold text-center text-black">6</span>
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-bold text-black">5</span>
                <span className="text-xs font-bold text-black">5</span>
              </div>
              <span className="text-xs font-bold text-center text-black">6</span>
            </div>
          </div>
        </div>
      );

    case 'similar_triangles':
      return (
        <div className="my-4 p-3 bg-white border border-black rounded flex justify-center items-center gap-8">
          <svg viewBox="0 0 340 160" className="w-full max-w-sm h-auto font-serif">
            {/* Small triangle ABC */}
            <polygon points="30,130 90,60 110,130" fill="none" stroke="#000000" strokeWidth="2" />
            <text x="20" y="140" className="text-xs font-bold fill-black">A</text>
            <text x="90" y="52" className="text-xs font-bold fill-black">C</text>
            <text x="115" y="140" className="text-xs font-bold fill-black">B</text>
            <text x="50" y="90" className="text-xs font-bold fill-black">r</text>
            <text x="105" y="90" className="text-xs font-bold fill-black">s</text>
            <text x="70" y="145" className="text-xs font-bold fill-black">6</text>

            {/* Big triangle DFE */}
            <polygon points="170,130 290,20 330,130" fill="none" stroke="#000000" strokeWidth="2" />
            <text x="160" y="140" className="text-xs font-bold fill-black">D</text>
            <text x="290" y="15" className="text-xs font-bold fill-black">E</text>
            <text x="335" y="140" className="text-xs font-bold fill-black">F</text>
            <text x="215" y="70" className="text-xs font-bold fill-black">10</text>
            <text x="315" y="70" className="text-xs font-bold fill-black">8</text>
            <text x="245" y="145" className="text-xs font-bold fill-black">12</text>
          </svg>
        </div>
      );

    case 'circle_radius':
      return (
        <div className="my-4 p-3 bg-white border border-black rounded flex flex-col items-center">
          <svg viewBox="0 0 200 200" className="w-44 h-44 font-serif">
            <circle cx="100" cy="100" r="70" fill="none" stroke="#000000" strokeWidth="2" />
            <circle cx="100" cy="100" r="3" fill="#000000" />
            <line x1="100" y1="100" x2="155" y2="60" stroke="#000000" strokeWidth="2" />
            <text x="90" y="115" className="text-xs font-bold fill-black">C</text>
            <text x="135" y="80" className="text-xs font-bold fill-black">1.5 cm</text>
          </svg>
        </div>
      );

    case 'rect_triangle_composite':
      return (
        <div className="my-4 p-3 bg-white border border-black rounded flex flex-col items-center">
          <svg viewBox="0 0 320 220" className="w-full max-w-xs h-auto font-serif">
            {/* Triangle ABC */}
            <polygon points="40,160 160,40 280,160" fill="none" stroke="#000000" strokeWidth="2" />
            <text x="25" y="165" className="text-xs font-bold fill-black">A</text>
            <text x="160" y="30" className="text-xs font-bold fill-black">C</text>
            <text x="290" y="165" className="text-xs font-bold fill-black">B</text>

            {/* Altitude CN */}
            <line x1="160" y1="40" x2="160" y2="160" stroke="#000000" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="160" y="178" className="text-xs font-bold fill-black">N</text>

            {/* Rectangle FENJ */}
            <rect x="120" y="100" width="40" height="60" fill="#e2e8f0" stroke="#000000" strokeWidth="2" />
            <text x="110" y="98" className="text-xs font-bold fill-black">F</text>
            <text x="165" y="98" className="text-xs font-bold fill-black">E</text>
            <text x="110" y="175" className="text-xs font-bold fill-black">J</text>

            {/* Angle 45° */}
            <path d="M 160,85 A 15,15 0 0,0 145,100" fill="none" stroke="#000000" strokeWidth="1.5" />
            <text x="135" y="92" className="text-[10px] font-bold fill-black">45°</text>

            {/* Area FENJ = 6 */}
            <text x="140" y="135" textAnchor="middle" className="text-[11px] font-bold fill-black">Área = 6</text>
          </svg>
        </div>
      );

    case 'bar_chart_ages':
      return (
        <div className="my-4 p-3 bg-white border border-black rounded flex flex-col items-center font-serif">
          <div className="text-xs font-bold text-black mb-2">Edades de los miembros del coro</div>
          <svg viewBox="0 0 280 170" className="w-full max-w-xs h-auto font-serif">
            {/* Y axis */}
            <line x1="40" y1="20" x2="40" y2="130" stroke="#000000" strokeWidth="1.5" />
            {/* X axis */}
            <line x1="40" y1="130" x2="260" y2="130" stroke="#000000" strokeWidth="1.5" />

            {/* Ticks Y */}
            <text x="32" y="134" textAnchor="end" className="text-[10px] fill-black">0</text>
            <text x="32" y="97" textAnchor="end" className="text-[10px] fill-black">10</text>
            <text x="32" y="60" textAnchor="end" className="text-[10px] fill-black">20</text>
            <text x="32" y="24" textAnchor="end" className="text-[10px] fill-black">30</text>

            {/* Bars with black & white hatching/grayscale */}
            <rect x="55" y="93" width="35" height="37" fill="#cbd5e1" stroke="#000000" strokeWidth="1.5" />
            <text x="72" y="145" textAnchor="middle" className="text-xs font-bold fill-black">18</text>

            <rect x="105" y="38" width="35" height="92" fill="#475569" stroke="#000000" strokeWidth="1.5" />
            <text x="122" y="145" textAnchor="middle" className="text-xs font-bold fill-black">19</text>

            <rect x="155" y="75" width="35" height="55" fill="#94a3b8" stroke="#000000" strokeWidth="1.5" />
            <text x="172" y="145" textAnchor="middle" className="text-xs font-bold fill-black">20</text>

            <rect x="205" y="93" width="35" height="37" fill="#cbd5e1" stroke="#000000" strokeWidth="1.5" />
            <text x="222" y="145" textAnchor="middle" className="text-xs font-bold fill-black">21</text>
          </svg>
        </div>
      );

    case 'pie_chart_books':
      return (
        <div className="my-4 p-3 bg-white border border-black rounded flex flex-col items-center font-serif">
          <svg viewBox="0 0 240 240" className="w-52 h-52 font-serif">
            <circle cx="120" cy="120" r="90" fill="#ffffff" stroke="#000000" strokeWidth="2" />
            {/* Lines */}
            <line x1="30" y1="120" x2="210" y2="120" stroke="#000000" strokeWidth="1.5" />
            <line x1="120" y1="30" x2="120" y2="210" stroke="#000000" strokeWidth="1.5" />
            <line x1="120" y1="120" x2="183.6" y2="56.4" stroke="#000000" strokeWidth="1.5" />

            {/* Labels */}
            <text x="75" y="85" className="text-xs font-bold fill-black">drama</text>
            <text x="75" y="165" className="text-xs font-bold fill-black">historia</text>
            <text x="155" y="165" className="text-xs font-bold fill-black">arte</text>
            <text x="135" y="70" className="text-[10px] font-bold fill-black">ficción</text>
            <text x="165" y="100" className="text-[10px] font-bold fill-black">detectives</text>
          </svg>
        </div>
      );

    case 'pictogram_cars':
      const CarIcon = () => (
        <svg viewBox="0 0 24 16" className="w-5 h-3.5 inline-block text-black fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11 L5 6 L19 6 L21 11 Z" fill="#ffffff" />
          <circle cx="6.5" cy="11.5" r="2.5" fill="#000000" />
          <circle cx="17.5" cy="11.5" r="2.5" fill="#000000" />
          <line x1="9" y1="11.5" x2="15" y2="11.5" />
          <line x1="1" y1="11" x2="3" y2="11" />
          <line x1="21" y1="11" x2="23" y2="11" />
        </svg>
      );
      return (
        <div className="my-4 p-3 bg-white border border-black rounded-none flex flex-col items-center font-serif">
          <div className="w-full max-w-md border border-black p-3">
            <div className="text-xs font-bold text-black border-b border-black pb-1 mb-2 flex justify-between">
              <span>Hora</span>
              <span>Cantidad de autos</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between border-b border-slate-300 pb-1">
                <span className="font-bold text-black w-20">Primera</span>
                <div className="flex gap-1.5 items-center flex-wrap">
                  {[...Array(6)].map((_, i) => (
                    <CarIcon key={i} />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-slate-300 pb-1">
                <span className="font-bold text-black w-20">Segunda</span>
                <div className="flex gap-1.5 items-center flex-wrap">
                  {[...Array(8)].map((_, i) => (
                    <CarIcon key={i} />
                  ))}
                  <span className="text-[10px] border border-black px-1 font-bold text-black bg-white">½</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-slate-300 pb-1">
                <span className="font-bold text-black w-20">Tercera</span>
                <div className="flex gap-1.5 items-center flex-wrap">
                  {[...Array(5)].map((_, i) => (
                    <CarIcon key={i} />
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-2 pt-1 border-t border-black text-center text-xs font-bold text-black flex items-center justify-center gap-1.5">
              <span>Cada</span>
              <CarIcon />
              <span>representa 20 carros</span>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
