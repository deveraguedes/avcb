const fs = require('fs');
const axios = require('axios');

// Mapeamento de caracteres com problemas de codificação
const charMap = {
    'ç': 'ç',
    'ã': 'ã',
    'á': 'á',
    'à': 'à',
    'â': 'â',
    'é': 'é',
    'ê': 'ê',
    'í': 'í',
    'ó': 'ó',
    'ô': 'ô',
    'õ': 'õ',
    'ú': 'ú',
    'ü': 'ü',
    'Ç': 'Ç',
    'Ã': 'Ã',
    'Á': 'Á',
    'À': 'À',
    'Â': 'Â',
    'É': 'É',
    'Ê': 'Ê',
    'Í': 'Í',
    'Ó': 'Ó',
    'Ô': 'Ô',
    'Õ': 'Õ',
    'Ú': 'Ú',
    'Ü': 'Ü'
};

// Função para corrigir caracteres
function fixCharacters(text) {
    if (!text) return text;
    
    // Correções específicas baseadas no CSV
    let fixed = text
        .replace(/Habita��o/g, 'Habitação')
        .replace(/Servi�o/g, 'Serviço')
        .replace(/Servi�os/g, 'Serviços')
        .replace(/Com�rcio/g, 'Comércio')
        .replace(/profissional/g, 'Profissional')
        .replace(/Educacional e cultura f�sica/g, 'Educacional e Cultura Física')
        .replace(/Reuni�o/g, 'Reunião')
        .replace(/P�blico/g, 'Público')
        .replace(/religi�o/g, 'religião')
        .replace(/vel�rio/g, 'velório')
        .replace(/Esta��o/g, 'Estação')
        .replace(/exibi��o/g, 'exibição')
        .replace(/c�nica/g, 'cênica')
        .replace(/audit�rio/g, 'auditório')
        .replace(/divers�o/g, 'diversão')
        .replace(/Constru��o/g, 'Construção')
        .replace(/provis�ria/g, 'provisória')
        .replace(/refei��o/g, 'refeição')
        .replace(/Recrea��o/g, 'Recreação')
        .replace(/p�blica/g, 'pública')
        .replace(/Exposi��o/g, 'Exposição')
        .replace(/sa�de/g, 'saúde')
        .replace(/veterin�rio/g, 'veterinário')
        .replace(/psiqui�tricos/g, 'psiquiátricos')
        .replace(/Edifica��es/g, 'Edificações')
        .replace(/restri��es/g, 'restrições')
        .replace(/Cl�nica/g, 'Clínica')
        .replace(/consult�rio/g, 'consultório')
        .replace(/m�dico/g, 'médico')
        .replace(/odontol�gico/g, 'odontológico')
        .replace(/Ind�stria/g, 'Indústria')
        .replace(/inc�ndio/g, 'incêndio')
        .replace(/Dep�sito/g, 'Depósito')
        .replace(/incombust�vel/g, 'incombustível')
        .replace(/combust�veis/g, 'combustíveis')
        .replace(/inflam�vel/g, 'inflamável')
        .replace(/combust�vel/g, 'combustível')
        .replace(/comunica��o/g, 'comunicação')
        .replace(/transforma��o/g, 'transformação')
        .replace(/ecol�gicas/g, 'ecológicas')
        .replace(/P�tio/g, 'Pátio')
        .replace(/cont�ineres/g, 'contêineres')
        .replace(/T�nel/g, 'Túnel')
        .replace(/rodoferrovi�rios/g, 'rodoferroviários')
        .replace(/mar�timos/g, 'marítimos')
        .replace(/manuten��o/g, 'manutenção')
        .replace(/conserva��o/g, 'conservação')
        .replace(/ve�culos/g, 'veículos')
        .replace(/aeronaves/g, 'aeronaves')
        .replace(/�reas/g, 'áreas');
    
    return fixed;
}

// Dados corretos manualmente definidos
const correctData = [
    { grupo: 'A', ocupacao: 'Residencial', divisao: 'A-1', descricao: 'Habitação unifamiliar', exemplos: 'Casas térreas, assobradadas, condomínios horizontais' },
    { grupo: 'A', ocupacao: 'Residencial', divisao: 'A-2', descricao: 'Habitação multifamiliar', exemplos: 'Edifícios de apartamento' },
    { grupo: 'A', ocupacao: 'Residencial', divisao: 'A-3', descricao: 'Habitação coletiva', exemplos: 'Pensionatos, internatos, alojamentos, conventos, residências geriátricas (até 16 leitos)' },
    { grupo: 'B', ocupacao: 'Serviço de Hospedagem', divisao: 'B-1', descricao: 'Hotel e assemelhado', exemplos: 'Hotéis, motéis, pensões, hospedarias, pousadas, albergues' },
    { grupo: 'B', ocupacao: 'Serviço de Hospedagem', divisao: 'B-2', descricao: 'Hotel residencial', exemplos: 'Apart-hotéis, flats, hotéis residenciais' },
    { grupo: 'C', ocupacao: 'Comercial', divisao: 'C-1', descricao: 'Comércio com baixa carga de incêndio', exemplos: 'Artigos de metal, louças, artigos hospitalares' },
    { grupo: 'C', ocupacao: 'Comercial', divisao: 'C-2', descricao: 'Comércio com média/alta carga de incêndio', exemplos: 'Lojas de departamento, supermercados, mercados' },
    { grupo: 'C', ocupacao: 'Comercial', divisao: 'C-3', descricao: 'Shopping centers', exemplos: 'Centros de compras em geral' },
    { grupo: 'D', ocupacao: 'Serviço Profissional', divisao: 'D-1', descricao: 'Local de prestação de serviço ou negócios', exemplos: 'Escritórios, repartições públicas, cabeleireiros' },
    { grupo: 'D', ocupacao: 'Serviço Profissional', divisao: 'D-2', descricao: 'Agência bancária', exemplos: 'Agências bancárias' },
    { grupo: 'D', ocupacao: 'Serviço Profissional', divisao: 'D-3', descricao: 'Serviço de reparação', exemplos: 'Lavanderias, assistência técnica, chaveiros' },
    { grupo: 'D', ocupacao: 'Serviço Profissional', divisao: 'D-4', descricao: 'Laboratório', exemplos: 'Laboratórios clínicos sem internação, químicos, fotográficos' },
    { grupo: 'E', ocupacao: 'Educacional e Cultura Física', divisao: 'E-1', descricao: 'Escola em geral', exemplos: 'Ensino fundamental, médio, superior, pré-vestibular' },
    { grupo: 'E', ocupacao: 'Educacional e Cultura Física', divisao: 'E-2', descricao: 'Escola especial', exemplos: 'Escolas de artes, línguas, religiosas' },
    { grupo: 'E', ocupacao: 'Educacional e Cultura Física', divisao: 'E-3', descricao: 'Espaço para cultura física', exemplos: 'Academias, artes marciais, esportes coletivos (sem arquibancadas)' },
    { grupo: 'E', ocupacao: 'Educacional e Cultura Física', divisao: 'E-4', descricao: 'Centro de treinamento profissional', exemplos: 'Escolas profissionais em geral' },
    { grupo: 'E', ocupacao: 'Educacional e Cultura Física', divisao: 'E-5', descricao: 'Pré-escola', exemplos: 'Creches, jardins de infância' },
    { grupo: 'E', ocupacao: 'Educacional e Cultura Física', divisao: 'E-6', descricao: 'Escola para portadores de deficiência', exemplos: 'Escolas para deficientes visuais, auditivos, excepcionais' },
    { grupo: 'F', ocupacao: 'Local de Reunião de Público', divisao: 'F-1', descricao: 'Local onde há objeto de valor inestimável', exemplos: 'Museus, bibliotecas, galerias de arte' },
    { grupo: 'F', ocupacao: 'Local de Reunião de Público', divisao: 'F-2', descricao: 'Local religioso e velório', exemplos: 'Igrejas, capelas, templos, cemitérios, crematórios, necrotérios' },
    { grupo: 'F', ocupacao: 'Local de Reunião de Público', divisao: 'F-3', descricao: 'Centro esportivo e de exibição', exemplos: 'Estádios, ginásios, arenas, sambódromos' },
    { grupo: 'F', ocupacao: 'Local de Reunião de Público', divisao: 'F-4', descricao: 'Estação e terminal de passageiro', exemplos: 'Estações, portos, aeroportos, metrô' },
    { grupo: 'F', ocupacao: 'Local de Reunião de Público', divisao: 'F-5', descricao: 'Arte cênica e auditório', exemplos: 'Teatros, cinemas, auditórios' },
    { grupo: 'F', ocupacao: 'Local de Reunião de Público', divisao: 'F-6', descricao: 'Clubes sociais e diversão', exemplos: 'Boates, clubes, restaurantes dançantes, bingo, boliche' },
    { grupo: 'F', ocupacao: 'Local de Reunião de Público', divisao: 'F-7', descricao: 'Construção provisória', exemplos: 'Circos e assemelhados' },
    { grupo: 'F', ocupacao: 'Local de Reunião de Público', divisao: 'F-8', descricao: 'Local para refeição', exemplos: 'Restaurantes, lanchonetes, bares, cafés' },
    { grupo: 'F', ocupacao: 'Local de Reunião de Público', divisao: 'F-9', descricao: 'Recreação pública', exemplos: 'Jardins zoológicos, parques recreativos' },
    { grupo: 'F', ocupacao: 'Local de Reunião de Público', divisao: 'F-10', descricao: 'Exposição de objetos ou animais', exemplos: 'Salões e salas de exposição permanentes' },
    { grupo: 'G', ocupacao: 'Serviço Automotivo', divisao: 'G-1', descricao: 'Garagem sem acesso ao público e sem abastecimento', exemplos: 'Garagens automáticas ou com manobristas' },
    { grupo: 'G', ocupacao: 'Serviço Automotivo', divisao: 'G-2', descricao: 'Garagem com acesso ao público e sem abastecimento', exemplos: 'Garagens coletivas' },
    { grupo: 'G', ocupacao: 'Serviço Automotivo', divisao: 'G-3', descricao: 'Local com abastecimento de combustível', exemplos: 'Postos de abastecimento e serviço' },
    { grupo: 'G', ocupacao: 'Serviço Automotivo', divisao: 'G-4', descricao: 'Serviço de conservação, manutenção e reparos', exemplos: 'Oficinas de veículos, borracharias' },
    { grupo: 'G', ocupacao: 'Serviço Automotivo', divisao: 'G-5', descricao: 'Hangares', exemplos: 'Abrigos para aeronaves' },
    { grupo: 'H', ocupacao: 'Serviço de Saúde e Institucional', divisao: 'H-1', descricao: 'Hospital veterinário e assemelhados', exemplos: 'Hospitais e clínicas veterinárias' },
    { grupo: 'H', ocupacao: 'Serviço de Saúde e Institucional', divisao: 'H-2', descricao: 'Local para pessoas com cuidados especiais', exemplos: 'Asilos, orfanatos, hospitais psiquiátricos' },
    { grupo: 'H', ocupacao: 'Serviço de Saúde e Institucional', divisao: 'H-3', descricao: 'Hospital e assemelhado', exemplos: 'Hospitais, prontos-socorros, clínicas com internação' },
    { grupo: 'H', ocupacao: 'Serviço de Saúde e Institucional', divisao: 'H-4', descricao: 'Edificações militares e policiais', exemplos: 'Quartéis, delegacias, postos policiais' },
    { grupo: 'H', ocupacao: 'Serviço de Saúde e Institucional', divisao: 'H-5', descricao: 'Local onde a liberdade sofre restrições', exemplos: 'Prisão, penitenciária, manicômio' },
    { grupo: 'H', ocupacao: 'Serviço de Saúde e Institucional', divisao: 'H-6', descricao: 'Clínica e consultório médico/odontológico', exemplos: 'Clínicas médicas sem internação' },
    { grupo: 'I', ocupacao: 'Indústria', divisao: 'I-1', descricao: 'Baixo potencial de incêndio (<300MJ/m²)', exemplos: 'Aço, jóias, relógios, ferramentas' },
    { grupo: 'I', ocupacao: 'Indústria', divisao: 'I-2', descricao: 'Médio potencial de incêndio (300–1200MJ/m²)', exemplos: 'Automóveis, móveis, marcenarias' },
    { grupo: 'I', ocupacao: 'Indústria', divisao: 'I-3', descricao: 'Alto risco de incêndio (>1200MJ/m²)', exemplos: 'Tintas, borracha, inflamáveis, grãos' },
    { grupo: 'J', ocupacao: 'Depósito', divisao: 'J-1', descricao: 'Depósito de material incombustível', exemplos: 'Areia, cimento, tijolos' },
    { grupo: 'J', ocupacao: 'Depósito', divisao: 'J-2', descricao: 'Depósito até 300MJ/m²', exemplos: 'Diversos materiais embalados' },
    { grupo: 'J', ocupacao: 'Depósito', divisao: 'J-3', descricao: 'Depósito entre 300–1200MJ/m²', exemplos: 'Diversos materiais' },
    { grupo: 'J', ocupacao: 'Depósito', divisao: 'J-4', descricao: 'Depósito acima de 1200MJ/m²', exemplos: 'Diversos materiais combustíveis' },
    { grupo: 'L', ocupacao: 'Explosivo', divisao: 'L-1', descricao: 'Comércio', exemplos: 'Fogos de artifício' },
    { grupo: 'L', ocupacao: 'Explosivo', divisao: 'L-2', descricao: 'Indústria', exemplos: 'Indústria de explosivos' },
    { grupo: 'L', ocupacao: 'Explosivo', divisao: 'L-3', descricao: 'Depósito', exemplos: 'Depósito de explosivos' },
    { grupo: 'M', ocupacao: 'Especial', divisao: 'M-1', descricao: 'Túnel', exemplos: 'Túneis rodoferroviários ou marítimos' },
    { grupo: 'M', ocupacao: 'Especial', divisao: 'M-2', descricao: 'Líquido ou gás inflamável/combustível', exemplos: 'Produção, manipulação, armazenamento de inflamáveis' },
    { grupo: 'M', ocupacao: 'Especial', divisao: 'M-3', descricao: 'Central de comunicação e energia', exemplos: 'Centrais telefônicas, de energia, transmissão' },
    { grupo: 'M', ocupacao: 'Especial', divisao: 'M-4', descricao: 'Propriedade em transformação', exemplos: 'Construção ou demolição' },
    { grupo: 'M', ocupacao: 'Especial', divisao: 'M-5', descricao: 'Silos', exemplos: 'Armazéns de grãos' },
    { grupo: 'M', ocupacao: 'Especial', divisao: 'M-6', descricao: 'Terra selvagem', exemplos: 'Florestas, reservas ecológicas' },
    { grupo: 'M', ocupacao: 'Especial', divisao: 'M-7', descricao: 'Pátio de contêineres', exemplos: 'Áreas abertas para contêineres' }
];

// Função para buscar dados atuais
async function getCurrentData() {
    try {
        const response = await axios.get('http://localhost:3000/api/classificacao');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados:', error.message);
        return [];
    }
}

// Função para deletar todos os registros
async function deleteAllRecords() {
    try {
        const currentData = await getCurrentData();
        console.log(`🗑️ Deletando ${currentData.length} registros existentes...`);
        
        for (const record of currentData) {
            try {
                await axios.delete(`http://localhost:3000/api/classificacao/${record.id}`);
                console.log(`✓ Deletado: ${record.codigo}`);
            } catch (error) {
                console.error(`✗ Erro ao deletar ${record.codigo}:`, error.response?.data || error.message);
            }
        }
        console.log('🧹 Limpeza concluída!');
    } catch (error) {
        console.error('Erro na limpeza:', error.message);
    }
}

// Função para inserir dados corretos
async function insertCorrectData(record) {
    try {
        const response = await axios.post('http://localhost:3000/api/classificacao', {
            codigo: record.divisao,
            ocupacao: record.ocupacao,
            classificacao: record.descricao,
            grupo: record.grupo,
            subgrupo: record.divisao,
            divisao: record.exemplos,
            observacoes: record.exemplos,
            ativo: true
        });
        console.log(`✓ Inserido: ${record.divisao} - ${record.descricao}`);
        return response.data;
    } catch (error) {
        console.error(`✗ Erro ao inserir ${record.divisao}:`, error.response?.data || error.message);
    }
}

// Função principal
async function fixEncoding() {
    console.log('🔧 Iniciando correção de codificação com dados corretos...');
    
    console.log(`📊 Dados corretos preparados: ${correctData.length} registros`);
    
    // Mostrar alguns exemplos dos dados corretos
    console.log('\n📝 Exemplos de dados corretos:');
    correctData.slice(0, 5).forEach(record => {
        console.log(`- ${record.divisao}: ${record.descricao}`);
    });
    
    // Deletar todos os registros existentes
    await deleteAllRecords();
    
    // Aguardar um pouco
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Inserir dados corretos
    console.log('\n⚡ Inserindo dados com caracteres corretos...');
    for (const record of correctData) {
        await insertCorrectData(record);
        // Pequena pausa entre inserções
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('\n🎉 Correção de codificação concluída!');
    
    // Verificar resultado final
    const finalData = await getCurrentData();
    console.log(`\n📊 Total final de registros: ${finalData.length}`);
    
    // Mostrar alguns exemplos dos dados corrigidos
    console.log('\n✅ Exemplos de dados corrigidos:');
    finalData.slice(0, 10).forEach(record => {
        console.log(`- ${record.codigo}: ${record.classificacao}`);
    });
}

// Executar correção
fixEncoding().catch(console.error);