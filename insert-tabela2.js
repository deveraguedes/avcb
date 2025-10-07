const fs = require('fs');
const path = require('path');

// Dados da tabela2 com caracteres corretos
const tabela2Data = [
  { tipo: 'I', denominacao: 'Edificação, estrutura e área de risco Térrea', altura: 'Um pavimento' },
  { tipo: 'II', denominacao: 'Edificação, estrutura e área de risco Baixa', altura: 'H ≤ 6,00 m' },
  { tipo: 'III', denominacao: 'Edificação, estrutura e área de risco de Baixa-Média Altura', altura: '6,00 m < H ≤ 12,00 m' },
  { tipo: 'IV', denominacao: 'Edificação, estrutura e área de risco de Média Altura', altura: '12,00 m < H ≤ 23,00 m' },
  { tipo: 'V', denominacao: 'Edificação, estrutura e área de risco Mediatamente Alta', altura: '23,00 m < H ≤ 30,00 m' },
  { tipo: 'VI', denominacao: 'Edificação, estrutura e área de risco Alta', altura: 'Acima de 30,00 m' }
];

async function insertTabela2Data() {
  try {
    console.log('Inserindo dados na tabela2...');
    
    for (const record of tabela2Data) {
      const response = await fetch('http://localhost:3000/api/tabela2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`✓ Inserido: ${record.tipo} - ${record.denominacao}`);
      } else {
        console.error(`✗ Erro ao inserir ${record.tipo}:`, await response.text());
      }
    }
    
    console.log('\n✅ Processo de inserção concluído!');
    
  } catch (error) {
    console.error('Erro durante a inserção:', error);
  }
}

insertTabela2Data();