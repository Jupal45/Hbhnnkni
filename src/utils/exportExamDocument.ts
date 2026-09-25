import { ExamAttempt, Question } from '../types';
import { sectionsInfo as defaultSections } from '../data/allQuestions';
import { EXAM_DEFINITIONS } from '../data/examConfig';

/**
 * Escapes HTML characters for safe template inclusion
 */
function escapeHtml(text: string | undefined): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generates a full styled HTML document containing:
 * 1. Tecnológico de Monterrey Institutional Header
 * 2. Official Accreditation Certificate (Comprobante)
 * 3. Section Scores & Scaled Score Breakdown
 * 4. Complete Solved Exam: every question, options, chosen answer, official answer, status & explanation
 */
export function generateExamReportHtml(attempt: ExamAttempt, questions: Question[]): string {
  const isPaa = attempt.examType === 'paa';
  const examDef = EXAM_DEFINITIONS[attempt.examType === 'paa' ? 'paa' : 'piense2'];
  const sections = examDef.sections || defaultSections;
  const examTitle = isPaa ? 'PAA' : 'PIENSE II';
  const orgName = attempt.studentOrganization || 'Ninguna';

  const total = attempt.totalQuestions || 1;
  const score = attempt.score;
  const percentage = Math.round((score / total) * 100);
  const isPassing = percentage >= 60;
  const estimatedScale = isPaa
    ? Math.round(800 + (score / total) * 800)
    : Math.round(200 + (score / total) * 600);

  const dateStr = new Date(attempt.timestamp).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const timeStr = `${Math.floor(attempt.timeSpentSeconds / 60)} min ${attempt.timeSpentSeconds % 60} seg`;
  const folio = `SPA-${attempt.id.slice(-6).toUpperCase()}`;

  // Group questions by part
  const questionsByPart: Record<number, Question[]> = { 1: [], 2: [], 3: [], 4: [] };
  questions.forEach((q) => {
    const partNum = q.part || 1;
    if (!questionsByPart[partNum]) {
      questionsByPart[partNum] = [];
    }
    questionsByPart[partNum].push(q);
  });

  let sectionsHtml = '';
  sections.forEach((sec) => {
    const secKey = `part${sec.id}` as keyof typeof attempt.sectionScores;
    const secData = attempt.sectionScores[secKey] || { score: 0, total: 0 };
    const secPercent = Math.round((secData.score / (secData.total || 1)) * 100);
    const partQuestions = questionsByPart[sec.id] || [];
    if (partQuestions.length === 0) return;

    let questionsHtml = '';
    partQuestions.forEach((q) => {
      const userAnswer = attempt.answers[q.id];
      const isCorrect = userAnswer === q.correctAnswer;
      const isAnswered = Boolean(userAnswer);

      let optionsListHtml = '';
      q.options.forEach((opt) => {
        const isUserChoice = userAnswer === opt.key;
        const isOfficialCorrect = q.correctAnswer === opt.key;

        let optStyle = 'padding: 3px 6px; margin: 2px 0; border-radius: 3px; font-size: 11px;';
        let badge = '';

        if (isUserChoice && isCorrect) {
          optStyle += ' background-color: #dcfce7; border: 1px solid #16a34a; font-weight: bold;';
          badge = ' <span style="color: #15803d; font-size: 10px;">[Tu respuesta - Correcta]</span>';
        } else if (isUserChoice && !isCorrect) {
          optStyle += ' background-color: #fee2e2; border: 1px solid #dc2626; font-weight: bold;';
          badge = ' <span style="color: #b91c1c; font-size: 10px;">[Tu respuesta - Incorrecta]</span>';
        } else if (isOfficialCorrect) {
          optStyle += ' background-color: #eff6ff; border: 1px dashed #2563eb;';
          badge = ' <span style="color: #1d4ed8; font-size: 10px;">[Respuesta correcta oficial]</span>';
        } else {
          optStyle += ' border: 1px solid #e2e8f0;';
        }

        optionsListHtml += `
          <div style="${optStyle}">
            <strong>${opt.key})</strong> ${escapeHtml(opt.text)}${badge}
          </div>
        `;
      });

      questionsHtml += `
        <div style="margin-bottom: 14px; padding: 10px 14px; border: 1px solid #cbd5e1; background-color: #ffffff; page-break-inside: avoid; break-inside: avoid;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 8px;">
            <span style="font-weight: bold; font-size: 13px; color: #000000;">Reactivo ${q.number}</span>
            <span style="font-size: 11px; font-weight: bold; padding: 2px 6px; border-radius: 3px; ${
              !isAnswered
                ? 'background-color: #f1f5f9; color: #64748b;'
                : isCorrect
                ? 'background-color: #dcfce7; color: #15803d;'
                : 'background-color: #fee2e2; color: #b91c1c;'
            }">
              ${!isAnswered ? 'Sin responder' : isCorrect ? 'ACIERTO (+1)' : 'ERROR (0)'}
            </span>
          </div>

          ${q.instructions ? `<div style="font-style: italic; font-size: 11px; color: #475569; margin-bottom: 6px; background: #f8fafc; padding: 4px 8px;">${escapeHtml(q.instructions)}</div>` : ''}

          ${q.passage ? `
            <div style="margin-bottom: 8px; padding: 8px; background-color: #f8fafc; border-left: 3px solid #000000; font-size: 12px; line-height: 1.4;">
              ${q.passage.title ? `<div style="font-weight: bold; margin-bottom: 4px;">${escapeHtml(q.passage.title)}</div>` : ''}
              <div>${escapeHtml(q.passage.text)}</div>
            </div>
          ` : ''}

          <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px; color: #0f172a;">
            ${escapeHtml(q.prompt)}
          </div>

          <div style="margin-bottom: 8px;">
            ${optionsListHtml}
          </div>

          ${q.explanation ? `
            <div style="background-color: #f8fafc; border-left: 3px solid #64748b; padding: 6px 10px; font-size: 11px; color: #334155; margin-top: 6px;">
              <strong>Explicación:</strong> ${escapeHtml(q.explanation)}
            </div>
          ` : ''}
        </div>
      `;
    });

    sectionsHtml += `
      <div style="margin-top: 24px; page-break-before: always; break-before: always;">
        <div style="background-color: #000000; color: #ffffff; padding: 10px 16px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <h2 style="margin: 0; font-size: 16px; font-family: serif;">Parte ${sec.id}: ${escapeHtml(sec.name)}</h2>
          <span style="font-size: 12px; font-weight: bold; background: rgba(255,255,255,0.2); padding: 3px 8px; border-radius: 4px;">
            ${secData.score} / ${secData.total} aciertos (${secPercent}%)
          </span>
        </div>
        ${questionsHtml}
      </div>
    `;
  });

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Comprobante Oficial SPA - ${escapeHtml(attempt.studentName || 'Aspirante')}</title>
  <style>
    @page { 
      size: letter portrait; 
      margin: 10mm; 
    }
    @media print {
      body { margin: 0; padding: 0; font-size: 11pt; }
      .no-print { display: none !important; }
      .page-break { page-break-before: always; break-before: always; }
      .cert-frame { page-break-after: always; break-after: always; }
    }
    * { box-sizing: border-box; }
    body {
      font-family: 'Times New Roman', Times, serif;
      color: #111827;
      line-height: 1.4;
      background-color: #ffffff;
      margin: 0 auto;
      max-width: 800px;
      padding: 15px;
    }
    h1, h2, h3 { font-family: 'Times New Roman', Times, serif; }
    .table-scores {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
      font-family: Arial, sans-serif;
      font-size: 12px;
      page-break-inside: avoid;
      break-inside: avoid;
    }
    .table-scores th, .table-scores td {
      border: 1px solid #cbd5e1;
      padding: 6px 10px;
      text-align: left;
    }
    .table-scores th {
      background-color: #000000;
      color: white;
      font-size: 11px;
      text-transform: uppercase;
    }
    .cert-frame {
      border: 5px double #000000;
      padding: 24px;
      margin-bottom: 24px;
      text-align: center;
      background-color: #ffffff;
      page-break-after: always;
      break-after: always;
    }
  </style>
</head>
<body>

  <!-- ==================== CERTIFICADO OFICIAL SPA ==================== -->
  <div class="cert-frame">
    <!-- Graduation Cap Logo SVG -->
    <div style="margin-bottom: 8px;">
      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#000000" stroke-width="1.8" style="margin: 0 auto; display: block;">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    </div>

    <div style="font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 2px; color: #000000; font-weight: bold; text-transform: uppercase;">
      SPA • SIMULACROS DE PRUEBAS ACADÉMICAS
    </div>
    <div style="font-family: Arial, sans-serif; font-size: 10px; letter-spacing: 1px; color: #475569; text-transform: uppercase; margin-top: 3px;">
      Escuela Patrocinadora: ${escapeHtml(orgName)} • Versión Oficial
    </div>

    <h1 style="font-size: 22px; color: #000000; text-transform: uppercase; margin: 16px 0 8px; font-weight: bold;">
      ${isPassing ? 'Reconocimiento de Alto Desempeño Académico' : 'Comprobante Oficial de Evaluación Estandarizada'}
    </h1>

    <div style="font-style: italic; font-size: 13px; color: #475569; margin-bottom: 12px;">
      SPA y la Escuela Patrocinadora (${escapeHtml(orgName)}) hacen constar que:
    </div>

    <div style="font-size: 24px; font-weight: bold; color: #000000; border-bottom: 2px solid #000000; display: inline-block; padding: 0 24px 4px; margin-bottom: 14px;">
      ${escapeHtml(attempt.studentName || 'Aspirante Evaluado')}
    </div>

    <div style="font-size: 13px; color: #334155; max-width: 580px; margin: 0 auto 18px; line-height: 1.5;">
      ${
        isPassing
          ? `Ha presentado y acreditado satisfactoriamente la prueba oficial <strong>${escapeHtml(examTitle)}</strong> demostrando competencias analíticas, verbales y de razonamiento requeridas.`
          : `Ha concluido la aplicación oficial de la prueba <strong>${escapeHtml(examTitle)}</strong>, quedando registradas la totalidad de sus respuestas para fines de diagnóstico académico y retroalimentación.`
      }
    </div>

    <!-- Scaled Summary Box -->
    <div style="display: flex; justify-content: center; gap: 14px; margin: 16px 0; font-family: Arial, sans-serif;">
      <div style="border: 2px solid #000000; padding: 10px 18px; background: white; text-align: center;">
        <div style="font-size: 10px; color: #475569; text-transform: uppercase; font-weight: bold;">Aciertos Totales</div>
        <div style="font-size: 18px; font-weight: bold; color: #000000;">${score} / ${total}</div>
        <div style="font-size: 10px; color: #000000; font-weight: bold;">${percentage}%</div>
      </div>
      <div style="border: 2px solid #000000; padding: 10px 18px; background: white; text-align: center;">
        <div style="font-size: 10px; color: #475569; text-transform: uppercase; font-weight: bold;">Escala Oficial</div>
        <div style="font-size: 18px; font-weight: bold; color: #000000;">${estimatedScale} pts</div>
        <div style="font-size: 10px; color: #475569;">(Rango: ${isPaa ? '800 - 1600' : '200 - 800'})</div>
      </div>
      <div style="border: 2px solid #000000; padding: 10px 18px; background: white; text-align: center;">
        <div style="font-size: 10px; color: #475569; text-transform: uppercase; font-weight: bold;">Estatus</div>
        <div style="font-size: 16px; font-weight: bold; color: #000000; margin-top: 2px;">
          ${isPassing ? 'ACREDITADO' : 'EN REPASO'}
        </div>
      </div>
    </div>

    <!-- Signatures and Seal -->
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 28px; padding-top: 14px; font-family: Arial, sans-serif; font-size: 11px;">
      <div style="text-align: center; width: 32%;">
        <div style="border-top: 1px solid #000000; padding-top: 4px; font-weight: bold; color: #000000;">Dirección de la Escuela Patrocinadora</div>
        <div style="font-size: 10px; color: #475569;">${escapeHtml(orgName)}</div>
      </div>

      <div style="text-align: center; width: 30%;">
        <div style="display: inline-block; border: 3px double #000000; padding: 6px 12px; border-radius: 50%; color: #000000; font-weight: bold; font-size: 10px;">
          ★ SELLO OFICIAL ★<br><span style="font-size: 8px;">SPA OFICIAL</span>
        </div>
        <div style="font-size: 9px; color: #475569; margin-top: 3px; font-family: monospace;">Folio: ${folio}</div>
      </div>

      <div style="text-align: center; width: 32%;">
        <div style="border-top: 1px solid #000000; padding-top: 4px; font-weight: bold; color: #000000;">${dateStr}</div>
        <div style="font-size: 10px; color: #475569;">Fecha de Emisión</div>
      </div>
    </div>
  </div>

  <!-- ==================== DESGLOSE DE RESULTADOS ==================== -->
  <div style="margin-bottom: 24px; font-family: Arial, sans-serif;">
    <h2 style="font-size: 18px; color: #000000; border-bottom: 2px solid #000000; padding-bottom: 4px; font-family: serif;">
      Desglose Oficial de Desempeño por Secciones
    </h2>
    <table class="table-scores">
      <thead>
        <tr>
          <th>Sección</th>
          <th>Reactivos</th>
          <th>Aciertos</th>
          <th>Efectividad</th>
          <th>Desempeño</th>
        </tr>
      </thead>
      <tbody>
        ${sections.map((sec) => {
          const secKey = `part${sec.id}` as keyof typeof attempt.sectionScores;
          const secData = attempt.sectionScores[secKey] || { score: 0, total: 0 };
          const p = Math.round((secData.score / (secData.total || 1)) * 100);
          return `
            <tr>
              <td><strong>Parte ${sec.id}:</strong> ${escapeHtml(sec.name)}</td>
              <td>${secData.total}</td>
              <td><strong>${secData.score}</strong></td>
              <td>${p}%</td>
              <td><span style="color: ${p >= 60 ? '#15803d' : '#b45309'}; font-weight: bold;">${p >= 80 ? 'Sobresaliente' : p >= 60 ? 'Satisfactorio' : 'Por Reforzar'}</span></td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
    <div style="font-size: 11px; color: #64748b; margin-top: -6px; margin-bottom: 16px;">
      * Tiempo total empleado: <strong>${timeStr}</strong> • Aspirante: <strong>${escapeHtml(attempt.studentName || 'Aspirante')}</strong> • Escuela Patrocinadora: <strong>${escapeHtml(orgName)}</strong>
    </div>
  </div>

  <!-- ==================== EXAMEN RESUELTO COMPLETO ==================== -->
  <div style="font-family: Arial, sans-serif;">
    <h2 style="font-size: 18px; color: #000000; border-bottom: 2px solid #000000; padding-bottom: 4px; font-family: serif;">
      Examen Resuelto y Justificación Académica
    </h2>
    <p style="font-size: 12px; color: #475569; margin-bottom: 16px;">
      A continuación se detallan los reactivos con la respuesta seleccionada por el aspirante, la clave correcta oficial y la justificación correspondiente.
    </p>
    ${sectionsHtml}
  </div>

</body>
</html>
`;
}

/**
 * Triggers a browser print window formatted as PDF
 */
export function downloadOrPrintPdf(attempt: ExamAttempt, questions: Question[]): void {
  const html = generateExamReportHtml(attempt, questions);
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    // Wait for styles/images to settle then print
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  } else {
    // Fallback if popups blocked: trigger directly via hidden iframe
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);
    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();
      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        setTimeout(() => document.body.removeChild(iframe), 2000);
      }, 500);
    }
  }
}

/**
 * Downloads as Microsoft Word (.doc) with full formatting, tables, and certificate
 */
export function downloadExamAsWord(attempt: ExamAttempt, questions: Question[]): void {
  const htmlContent = generateExamReportHtml(attempt, questions);

  // Microsoft Word HTML format with office document metadata
  const wordDocumentHtml = `
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    body { font-family: Calibri, Arial, sans-serif; }
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>
`;

  const blob = new Blob(['\ufeff', wordDocumentHtml], {
    type: 'application/msword;charset=utf-8',
  });

  const studentClean = (attempt.studentName || 'Aspirante')
    .trim()
    .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]/g, '')
    .replace(/\s+/g, '_');
  const filename = attempt.examType === 'paa'
    ? `Comprobante_Examen_Resuelto_PAA_${studentClean}.doc`
    : `Comprobante_Examen_Resuelto_PIENSE_II_${studentClean}.doc`;

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Downloads formatted for Google Docs (Word-compatible .doc file ready to open in Google Docs)
 */
export function downloadExamForGoogleDocs(attempt: ExamAttempt, questions: Question[]): void {
  const htmlContent = generateExamReportHtml(attempt, questions);

  const docsFormattedHtml = `
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Comprobante y Examen Resuelto PIENSE II</title>
</head>
<body>
  ${htmlContent}
</body>
</html>
`;

  const blob = new Blob(['\ufeff', docsFormattedHtml], {
    type: 'application/msword;charset=utf-8',
  });

  const studentClean = (attempt.studentName || 'Aspirante')
    .trim()
    .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]/g, '')
    .replace(/\s+/g, '_');
  const filename = `Examen_Resuelto_PIENSE_II_GoogleDocs_${studentClean}.doc`;

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Copies rich HTML to clipboard so the student can simply Ctrl+V into a blank Google Doc
 */
export async function copyExamRichTextToClipboard(attempt: ExamAttempt, questions: Question[]): Promise<boolean> {
  try {
    const html = generateExamReportHtml(attempt, questions);
    if (navigator.clipboard && window.ClipboardItem) {
      const typeHtml = 'text/html';
      const typeText = 'text/plain';
      const blobHtml = new Blob([html], { type: typeHtml });
      const blobText = new Blob([`Comprobante de Examen Resuelto PIENSE II - ${attempt.studentName}`], { type: typeText });
      const data = [new ClipboardItem({ [typeHtml]: blobHtml, [typeText]: blobText })];
      await navigator.clipboard.write(data);
      return true;
    }
    return false;
  } catch (err) {
    console.error('Error copying to clipboard', err);
    return false;
  }
}
