const fs = require('fs');
const axios = require('axios');

// Função para ler e processar o CSV
function readCSV() {
    const csvContent = fs.readFileSync('tabela1.csv', 'utf-8');
    const lines = csvContent.split('\n');
    const header = lines[0].split(';');
    
    const csvData = [];
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim()) {
            const values = lines[i].split(';');
            csvData.push({
                grupo: values[0],
                ocupacao: values[1],
                divisao: values[2],
                descricao: values[3],
                exemplos: values[4]
            });
        }
    }
    return csvData;
}

// Função para buscar dados atuais da API
async function getCurrentData() {
    try {
        const response = await axios.get('http://localhost:3000/api/classificacao');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error.message);
        return [];
    }
}

// Função para inserir novos dados
async function insertData(newRecord) {
    try {
        const response = await axios.post('http://localhost:3000/api/classificacao', {
            codigo: newRecord.divisao,
            ocupacao: newRecord.ocupacao,
            classificacao: newRecord.descricao,
            grupo: newRecord.grupo,
            subgrupo: newRecord.divisao,
            divisao: newRecord.exemplos,
            observacoes: newRecord.exemplos,
            ativo: true
        });
        console.log(`✓ Inserido: ${newRecord.divisao} - ${newRecord.descricao}`);
        return response.data;
    } catch (error) {
        console.error(`✗ Erro ao inserir ${newRecord.divisao}:`, error.response?.data || error.message);
    }
}

// Função principal
async function compareAndInsert() {
    console.log('🔍 Lendo dados do CSV...');
    const csvData = readCSV();
    console.log(`📄 Encontrados ${csvData.length} registros no CSV`);
    
    console.log('🌐 Buscando dados atuais da API...');
    const currentData = await getCurrentData();
    console.log(`💾 Encontrados ${currentData.length} registros no banco`);
    
    // Criar um Set com os códigos existentes para comparação rápida
    const existingCodes = new Set(currentData.map(item => item.codigo));
    
    console.log('\n🔄 Comparando dados...');
    const missingRecords = csvData.filter(csvRecord => {
        return !existingCodes.has(csvRecord.divisao);
    });
    
    console.log(`\n📊 Resumo da comparação:`);
    console.log(`- Registros no CSV: ${csvData.length}`);
    console.log(`- Registros no banco: ${currentData.length}`);
    console.log(`- Registros faltantes: ${missingRecords.length}`);
    
    if (missingRecords.length === 0) {
        console.log('\n✅ Todos os dados do CSV já estão no banco!');
        return;
    }
    
    console.log('\n📝 Registros faltantes:');
    missingRecords.forEach(record => {
        console.log(`- ${record.divisao}: ${record.descricao}`);
    });
    
    console.log('\n⚡ Inserindo registros faltantes...');
    for (const record of missingRecords) {
        await insertData(record);
        // Pequena pausa entre inserções
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('\n🎉 Processo concluído!');
}

// Executar o script
compareAndInsert().catch(console.error);