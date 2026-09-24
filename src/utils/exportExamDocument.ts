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
  const examDef = EXAM_DEFINITIONS[attempt.examType || 'piense2'];
  const sections = examDef.sections || defaultSections;
  const examTitle = isPaa ? 'PAA' : 'PIENSE II';
  const orgName = attempt.studentOrganization || (isPaa ? 'Organizaciones Estudiantiles Tec' : 'PrepaTec');

  const total = attempt.totalQuestions;
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
  const folio = `TEC-${attempt.id.slice(-6).toUpperCase()}`;

  // Group questions by part
  const questionsByPart: Record<number, Question[]> = { 1: [], 2: [], 3: [], 4: [] };
  questions.forEach((q) => {
    if (questionsByPart[q.part]) {
      questionsByPart[q.part].push(q);
    }
  });

  let sectionsHtml = '';
  sections.forEach((sec) => {
    const secKey = `part${sec.id}` as keyof typeof attempt.sectionScores;
    const secData = attempt.sectionScores[secKey] || { score: 0, total: 0 };
    const secPercent = Math.round((secData.score / (secData.total || 1)) * 100);
    const partQuestions = questionsByPart[sec.id] || [];

    let questionsHtml = '';
    partQuestions.forEach((q) => {
      const userAnswer = attempt.answers[q.id];
      const isCorrect = userAnswer === q.correctAnswer;
      const isAnswered = Boolean(userAnswer);

      let optionsListHtml = '';
      q.options.forEach((opt) => {
        const isUserChoice = userAnswer === opt.key;
        const isOfficialCorrect = q.correctAnswer === opt.key;

        let optStyle = 'padding: 4px 8px; margin: 2px 0; border-radius: 4px;';
        let badge = '';

        if (isUserChoice && isCorrect) {
          optStyle += ' background-color: #dcfce7; border: 1px solid #16a34a; font-weight: bold;';
          badge = ' <span style="color: #15803d; font-size: 11px;">[Tu respuesta - Correcta]</span>';
        } else if (isUserChoice && !isCorrect) {
          optStyle += ' background-color: #fee2e2; border: 1px solid #dc2626; font-weight: bold;';
          badge = ' <span style="color: #b91c1c; font-size: 11px;">[Tu respuesta - Incorrecta]</span>';
        } else if (isOfficialCorrect) {
          optStyle += ' background-color: #eff6ff; border: 1px dashed #2563eb;';
          badge = ' <span style="color: #1d4ed8; font-size: 11px;">[Respuesta correcta oficial]</span>';
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
        <div style="margin-bottom: 24px; padding: 16px; border: 1px solid #cbd5e1; background-color: #ffffff; page-break-inside: avoid;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin-bottom: 12px;">
            <span style="font-weight: bold; font-size: 14px; color: #002B49;">Pregunta ${q.number}</span>
            <span style="font-size: 12px; font-weight: bold; padding: 3px 8px; border-radius: 4px; ${
              !isAnswered
                ? 'background-color: #f1f5f9; color: #64748b;'
                : isCorrect
                ? 'background-color: #dcfce7; color: #15803d;'
                : 'background-color: #fee2e2; color: #b91c1c;'
            }">
              ${!isAnswered ? 'Sin responder' : isCorrect ? 'ACIERTO (+1)' : 'ERROR (0)'}
            </span>
          </div>

          ${q.instructions ? `<div style="font-style: italic; font-size: 12px; color: #475569; margin-bottom: 8px; background: #f8fafc; padding: 6px 10px;">${escapeHtml(q.instructions)}</div>` : ''}

          ${q.passage ? `
            <div style="margin-bottom: 12px; padding: 10px; background-color: #f8fafc; border-left: 3px solid #002B49; font-size: 13px; line-height: 1.5;">
              ${q.passage.title ? `<div style="font-weight: bold; margin-bottom: 6px;">${escapeHtml(q.passage.title)}</div>` : ''}
              <div>${escapeHtml(q.passage.text)}</div>
            </div>
          ` : ''}

          <div style="font-size: 14px; font-weight: 500; margin-bottom: 12px; color: #0f172a;">
            ${escapeHtml(q.prompt)}
          </div>

          <div style="margin-bottom: 12px;">
            ${optionsListHtml}
          </div>

          ${q.explanation ? `
            <div style="background-color: #f8fafc; border-left: 3px solid #64748b; padding: 8px 12px; font-size: 12px; color: #334155; margin-top: 10px;">
              <strong>Explicación:</strong> ${escapeHtml(q.explanation)}
            </div>
          ` : ''}
        </div>
      `;
    });

    sectionsHtml += `
      <div style="margin-top: 32px; page-break-before: always;">
        <div style="background-color: #002B49; color: #ffffff; padding: 12px 18px; border-radius: 4px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h2 style="margin: 0; font-size: 18px; font-family: serif;">Parte ${sec.id}: ${escapeHtml(sec.name)}</h2>
          <span style="font-size: 13px; font-weight: bold; background: rgba(255,255,255,0.2); padding: 4px 10px; border-radius: 4px;">
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
  <title>Comprobante y Examen Resuelto PIENSE II - ${escapeHtml(attempt.studentName || 'Aspirante')}</title>
  <style>
    @media print {
      body { margin: 0; padding: 15mm; font-size: 12pt; }
      .no-print { display: none !important; }
      .page-break { page-break-before: always; }
      @page { margin: 15mm; size: letter portrait; }
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      color: #1a202c;
      line-height: 1.5;
      background-color: #ffffff;
      margin: 0 auto;
      max-width: 850px;
      padding: 30px;
    }
    h1, h2, h3 { font-family: 'Times New Roman', Times, serif; }
    .table-scores {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-family: Arial, sans-serif;
      font-size: 13px;
    }
    .table-scores th, .table-scores td {
      border: 1px solid #cbd5e1;
      padding: 8px 12px;
      text-align: left;
    }
    .table-scores th {
      background-color: #000000;
      color: white;
    }
    .cert-frame {
      border: 6px double #000000;
      padding: 30px;
      margin-bottom: 30px;
      text-align: center;
      background-color: #ffffff;
      page-break-after: always;
    }
  </style>
</head>
<body>

  <!-- ==================== CERTIFICADO / COMPROBANTE OFICIAL ==================== -->
  <div class="cert-frame">
    <div style="font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 2px; color: #000000; font-weight: bold; text-transform: uppercase;">
      Tecnológico de Monterrey
    </div>
    <div style="font-family: Arial, sans-serif; font-size: 10px; letter-spacing: 1px; color: #475569; text-transform: uppercase; margin-top: 2px;">
      ${escapeHtml(orgName)} • ${escapeHtml(examTitle)}
    </div>

    <h1 style="font-size: 26px; color: #000000; text-transform: uppercase; margin: 20px 0 10px; font-weight: bold;">
      ${isPassing ? 'Reconocimiento de Admisión y Alto Desempeño' : 'Comprobante Oficial de Evaluación'}
    </h1>

    <div style="font-style: italic; font-size: 14px; color: #475569; margin-bottom: 15px;">
      El Tecnológico de Monterrey y ${escapeHtml(orgName)} hacen constar que el aspirante:
    </div>

    <div style="font-size: 28px; font-weight: bold; color: #000000; border-bottom: 2px solid #000000; display: inline-block; padding: 0 30px 6px; margin-bottom: 20px;">
      ${escapeHtml(attempt.studentName || 'Aspirante Evaluado')}
    </div>

    <div style="font-size: 14px; color: #334155; max-width: 600px; margin: 0 auto 24px; line-height: 1.6;">
      ${
        isPassing
          ? `Ha acreditado satisfactoriamente la <strong>${escapeHtml(examTitle)}</strong> demostrando competencias analíticas, verbales y matemáticas requeridas para el perfil de talento.`
          : `Ha concluido formalmente la aplicación de la <strong>${escapeHtml(examTitle)}</strong>, registrándose la totalidad de sus respuestas para fines de diagnóstico y reclutamiento.`
      }
    </div>

    <!-- Scaled Summary Box -->
    <div style="display: flex; justify-content: center; gap: 20px; margin: 20px 0; font-family: Arial, sans-serif;">
      <div style="border: 2px solid #000000; padding: 12px 24px; background: white; text-align: center;">
        <div style="font-size: 11px; color: #475569; text-transform: uppercase; font-weight: bold;">Aciertos Totales</div>
        <div style="font-size: 22px; font-weight: bold; color: #000000;">${score} / ${total}</div>
        <div style="font-size: 11px; color: #000000; font-weight: bold;">${percentage}%</div>
      </div>
      <div style="border: 2px solid #000000; padding: 12px 24px; background: white; text-align: center;">
        <div style="font-size: 11px; color: #475569; text-transform: uppercase; font-weight: bold;">Escala ${isPaa ? 'PAA' : 'PIENSE II'}</div>
        <div style="font-size: 22px; font-weight: bold; color: #000000;">${estimatedScale} pts</div>
        <div style="font-size: 11px; color: #475569;">(Rango: ${isPaa ? '800 - 1600' : '200 - 800'})</div>
      </div>
      <div style="border: 2px solid #000000; padding: 12px 24px; background: white; text-align: center;">
        <div style="font-size: 11px; color: #475569; text-transform: uppercase; font-weight: bold;">Estatus</div>
        <div style="font-size: 20px; font-weight: bold; color: #000000; margin-top: 2px;">
          ${isPassing ? 'ACREDITADO' : 'EN PROCESO'}
        </div>
      </div>
    </div>

    <!-- Signatures and Seal -->
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 36px; padding-top: 20px; font-family: Arial, sans-serif; font-size: 12px;">
      <div style="text-align: center; width: 30%;">
        <div style="border-top: 1px solid #000000; padding-top: 6px; font-weight: bold; color: #000000;">Comité de Talento y Selección</div>
        <div style="font-size: 10px; color: #475569;">${escapeHtml(orgName)}</div>
      </div>

      <div style="text-align: center; width: 30%;">
        <div style="display: inline-block; border: 3px double #000000; padding: 8px 14px; border-radius: 50%; color: #000000; font-weight: bold; font-size: 11px;">
          ★ SELLO OFICIAL ★<br><span style="font-size: 9px;">ACREDITADO</span>
        </div>
        <div style="font-size: 10px; color: #475569; margin-top: 4px; font-family: monospace;">Folio: ${folio}</div>
      </div>

      <div style="text-align: center; width: 30%;">
        <div style="border-top: 1px solid #000000; padding-top: 6px; font-weight: bold; color: #000000;">${dateStr}</div>
        <div style="font-size: 10px; color: #475569;">Fecha de Emisión</div>
      </div>
    </div>
  </div>

  <!-- ==================== DESGLOSE DE RESULTADOS ==================== -->
  <div style="margin-bottom: 30px; font-family: Arial, sans-serif;">
    <h2 style="font-size: 20px; color: #000000; border-bottom: 2px solid #000000; padding-bottom: 6px; font-family: serif;">
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
    <div style="font-size: 12px; color: #64748b; margin-top: -10px; margin-bottom: 20px;">
      * Tiempo total empleado: <strong>${timeStr}</strong> • Aspirante: <strong>${escapeHtml(attempt.studentName || 'Aspirante')}</strong>
    </div>
  </div>

  <!-- ==================== EXAMEN RESUELTO COMPLETO ==================== -->
  <div style="font-family: Arial, sans-serif;">
    <h2 style="font-size: 20px; color: #002B49; border-bottom: 2px solid #002B49; padding-bottom: 6px; font-family: serif;">
      Examen Resuelto y Justificación Académica
    </h2>
    <p style="font-size: 13px; color: #475569; margin-bottom: 20px;">
      A continuación se detalla cada uno de los 154 reactivos con la respuesta elegida por el aspirante, la clave correcta oficial y la justificación correspondiente.
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
