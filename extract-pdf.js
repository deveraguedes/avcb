const fs = require('fs');
const pdf = require('pdf-parse');

async function extractPdfText() {
  try {
    const dataBuffer = fs.readFileSync('C:\\projetos\\avcb\\incendio.pdf');
    const data = await pdf(dataBuffer);
    
    console.log('Texto extraído do PDF:');
    console.log('Total de páginas:', data.numpages);
    console.log('\n--- CONTEÚDO ---\n');
    
    // Procurar por "Anexo A" no texto
    const text = data.text;
    const anexoAIndex = text.toLowerCase().indexOf('anexo a');
    
    if (anexoAIndex !== -1) {
      console.log('\n=== ANEXO A ENCONTRADO ===\n');
      // Extrair uma seção do texto ao redor do "Anexo A"
      const startIndex = Math.max(0, anexoAIndex - 500);
      const endIndex = Math.min(text.length, anexoAIndex + 3000);
      const anexoSection = text.substring(startIndex, endIndex);
      console.log(anexoSection);
    } else {
      console.log('\nAnexo A não encontrado no texto extraído.');
      // Mostrar uma amostra do texto para análise
      console.log('\n=== AMOSTRA DO TEXTO (primeiros 2000 caracteres) ===\n');
      console.log(text.substring(0, 2000));
    }
    
    // Salvar o texto completo em um arquivo para análise
    fs.writeFileSync('C:\\projetos\\avcb\\pdf-extracted-text.txt', text);
    console.log('\nTexto completo salvo em pdf-extracted-text.txt');
    
  } catch (error) {
    console.error('Erro ao extrair texto do PDF:', error);
  }
}

extractPdfText();