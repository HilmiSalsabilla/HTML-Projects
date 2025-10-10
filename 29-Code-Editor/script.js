// function run() {
//     let htmlCode = document.getElementById("html-code").value;
//     let cssCode = document.getElementById("css-code").value;
//     let jsCode = document.getElementById("js-code").value;
//     let outPut = document.getElementById("output");

//     outPut.contentDocument.body.innerHTML = htmlCode + "<style>" + cssCode + "</style>";
//     outPut.contentWindow.eval(jsCode);
// }

/* =====================================================
   ⚡ Code Editor Script — Live Preview Handler
===================================================== */

function run() {
  const htmlCode = document.getElementById("html-code").value;
  const cssCode = document.getElementById("css-code").value;
  const jsCode = document.getElementById("js-code").value;
  const outputFrame = document.getElementById("output");

  // Pastikan iframe tersedia
  if (!outputFrame || !outputFrame.contentDocument) return;

  // Gabungkan HTML dan CSS ke dalam iframe
  const documentContent = `
    ${htmlCode}
    <style>${cssCode}</style>
  `;

  const outputDocument = outputFrame.contentDocument || outputFrame.contentWindow.document;
  outputDocument.open();
  outputDocument.write(documentContent);
  outputDocument.close();

  // Jalankan JavaScript di dalam konteks iframe (sandbox)
  try {
    outputFrame.contentWindow.eval(jsCode);
  } catch (error) {
    console.error("⚠️ Error in your JavaScript code:", error);
  }
}
