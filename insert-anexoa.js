const fs = require('fs');
const axios = require('axios');

// Função para processar o texto extraído e extrair os dados do Anexo A
function processarDadosAnexoA() {
  const texto = fs.readFileSync('pdf-extracted-text.txt', 'utf8');
  const linhas = texto.split('\n');
  
  const dados = [];
  let processandoAnexoA = false;
  
  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i].trim();
    
    // Detectar início do Anexo A
    if (linha.includes('Anexo A') || linha.includes('ANEXO A')) {
      processandoAnexoA = true;
      continue;
    }
    
    // Parar quando encontrar outro anexo ou fim
    if (linha.includes('Anexo B') || linha.includes('ANEXO B')) {
      break;
    }
    
    if (processandoAnexoA && linha.length > 0) {
      // Procurar por linhas que contêm dados estruturados
      // Formato esperado: Descrição + Divisão + CNAE + Carga
      const regex = /^(.+?)\s+(C-\d+|D-\d+|E-\d+|F-\d+|G-\d+|H-\d+|I-\d+)\s+(\d{4}-\d+\/\d+)\s+(\d+)$/;
      const match = linha.match(regex);
      
      if (match) {
        const [, descricao, divisao, cnae, carga] = match;
        
        // Determinar ocupação/uso baseado na divisão
        let ocupacao_uso = '';
        if (divisao.startsWith('C-')) ocupacao_uso = 'Comercial';
        else if (divisao.startsWith('D-')) ocupacao_uso = 'Serviços profissionais, pessoais e técnicos';
        else if (divisao.startsWith('E-')) ocupacao_uso = 'Educacional e cultura física';
        else if (divisao.startsWith('F-')) ocupacao_uso = 'Locais de reunião de público';
        else if (divisao.startsWith('G-')) ocupacao_uso = 'Serviços automotivos e assemelhados';
        else if (divisao.startsWith('H-')) ocupacao_uso = 'Serviços de saúde e institucional';
        else if (divisao.startsWith('I-')) ocupacao_uso = 'Industrial';
        
        dados.push({
          ocupacao_uso,
          descricao: descricao.trim(),
          divisao,
          cnae,
          carga_incendio_mj_m2: parseInt(carga)
        });
      }
    }
  }
  
  return dados;
}

// Dados extraídos manualmente do PDF (amostra dos principais)
const dadosAnexoA = [
  // Comercial C-1
  { ocupacao_uso: 'Comercial', descricao: 'Comércio por atacado de motocicletas e motonetas', divisao: 'C-1', cnae: '4541-2/01', carga_incendio_mj_m2: 200 },
  { ocupacao_uso: 'Comercial', descricao: 'Comércio por atacado de peças e acessórios para motocicletas e motonetas', divisao: 'C-1', cnae: '4541-2/02', carga_incendio_mj_m2: 200 },
  { ocupacao_uso: 'Comercial', descricao: 'Comércio a varejo de motocicletas e motonetas novas', divisao: 'C-1', cnae: '4541-2/03', carga_incendio_mj_m2: 200 },
  { ocupacao_uso: 'Comercial', descricao: 'Comércio atacadista de animais vivos', divisao: 'C-1', cnae: '4623-1/01', carga_incendio_mj_m2: 300 },
  { ocupacao_uso: 'Comercial', descricao: 'Comércio atacadista de fumo em folha não beneficiado', divisao: 'C-1', cnae: '4623-1/04', carga_incendio_mj_m2: 200 },
  { ocupacao_uso: 'Comercial', descricao: 'Comércio atacadista de sementes, flores, plantas e gramas', divisao: 'C-1', cnae: '4623-1/06', carga_incendio_mj_m2: 80 },
  { ocupacao_uso: 'Comercial', descricao: 'Comércio atacadista de leite e laticínios', divisao: 'C-1', cnae: '4631-1/00', carga_incendio_mj_m2: 200 },
  { ocupacao_uso: 'Comercial', descricao: 'Comércio atacadista de carnes bovinas e suínas e derivados', divisao: 'C-1', cnae: '4634-6/01', carga_incendio_mj_m2: 40 },
  { ocupacao_uso: 'Comercial', descricao: 'Comércio atacadista de água mineral', divisao: 'C-1', cnae: '4635-4/01', carga_incendio_mj_m2: 80 },
  { ocupacao_uso: 'Comercial', descricao: 'Comércio atacadista de cerveja, chope e refrigerante', divisao: 'C-1', cnae: '4635-4/02', carga_incendio_mj_m2: 80 },
  
  // Comercial C-2
  { ocupacao_uso: 'Comercial', descricao: 'Comércio por atacado de pneumáticos e câmaras-de-ar', divisao: 'C-2', cnae: '4530-7/02', carga_incendio_mj_m2: 800 },
  { ocupacao_uso: 'Comercial', descricao: 'Comércio atacadista de café em grão', divisao: 'C-2', cnae: '4621-4/00', carga_incendio_mj_m2: 400 },
  { ocupacao_uso: 'Comercial', descricao: 'Comércio atacadista de soja', divisao: 'C-2', cnae: '4622-2/00', carga_incendio_mj_m2: 1700 },
  { ocupacao_uso: 'Comercial', descricao: 'Comércio atacadista de algodão', divisao: 'C-2', cnae: '4623-1/03', carga_incendio_mj_m2: 600 },
  { ocupacao_uso: 'Comercial', descricao: 'Comércio atacadista de alimentos para animais', divisao: 'C-2', cnae: '4623-1/09', carga_incendio_mj_m2: 2000 },
  
  // Shopping Centers
  { ocupacao_uso: 'Comercial', descricao: 'Shoppings Centers', divisao: 'C-3', cnae: '-', carga_incendio_mj_m2: 600 },
  
  // Serviços profissionais D-1
  { ocupacao_uso: 'Serviços profissionais, pessoais e técnicos', descricao: 'Captação, tratamento e distribuição de água', divisao: 'D-1', cnae: '3600-6/01', carga_incendio_mj_m2: 80 },
  { ocupacao_uso: 'Serviços profissionais, pessoais e técnicos', descricao: 'Gestão de redes de esgoto', divisao: 'D-1', cnae: '3701-1/00', carga_incendio_mj_m2: 40 },
  { ocupacao_uso: 'Serviços profissionais, pessoais e técnicos', descricao: 'Incorporação de empreendimentos imobiliários', divisao: 'D-1', cnae: '4110-7/00', carga_incendio_mj_m2: 700 },
  { ocupacao_uso: 'Serviços profissionais, pessoais e técnicos', descricao: 'Serviços advocatícios', divisao: 'D-1', cnae: '6911-7/01', carga_incendio_mj_m2: 300 },
  
  // Serviços profissionais D-2
  { ocupacao_uso: 'Serviços profissionais, pessoais e técnicos', descricao: 'Banco Central', divisao: 'D-2', cnae: '6410-7/00', carga_incendio_mj_m2: 300 },
  { ocupacao_uso: 'Serviços profissionais, pessoais e técnicos', descricao: 'Bancos comerciais', divisao: 'D-2', cnae: '6421-2/00', carga_incendio_mj_m2: 300 },
  
  // Serviços profissionais D-3
  { ocupacao_uso: 'Serviços profissionais, pessoais e técnicos', descricao: 'Manutenção e reparação de tanques, reservatórios metálicos e caldeiras', divisao: 'D-3', cnae: '3311-2/00', carga_incendio_mj_m2: 200 },
  { ocupacao_uso: 'Serviços profissionais, pessoais e técnicos', descricao: 'Lavanderias', divisao: 'D-3', cnae: '9601-7/01', carga_incendio_mj_m2: 300 },
  
  // Serviços profissionais D-4
  { ocupacao_uso: 'Serviços profissionais, pessoais e técnicos', descricao: 'Testes e análises técnicas', divisao: 'D-4', cnae: '7120-1/00', carga_incendio_mj_m2: 300 },
  { ocupacao_uso: 'Serviços profissionais, pessoais e técnicos', descricao: 'Laboratórios clínicos', divisao: 'D-4', cnae: '8640-2/02', carga_incendio_mj_m2: 200 },
  
  // Educacional E-1
  { ocupacao_uso: 'Educacional e cultura física', descricao: 'Ensino fundamental', divisao: 'E-1', cnae: '8513-9/00', carga_incendio_mj_m2: 300 },
  { ocupacao_uso: 'Educacional e cultura física', descricao: 'Ensino médio', divisao: 'E-1', cnae: '8520-1/00', carga_incendio_mj_m2: 300 },
  { ocupacao_uso: 'Educacional e cultura física', descricao: 'Educação superior - graduação', divisao: 'E-1', cnae: '8531-7/00', carga_incendio_mj_m2: 300 },
  
  // Educacional E-2
  { ocupacao_uso: 'Educacional e cultura física', descricao: 'Ensino de música', divisao: 'E-2', cnae: '8592-9/03', carga_incendio_mj_m2: 300 },
  { ocupacao_uso: 'Educacional e cultura física', descricao: 'Ensino de idiomas', divisao: 'E-2', cnae: '8593-7/00', carga_incendio_mj_m2: 300 },
  
  // Educacional E-3
  { ocupacao_uso: 'Educacional e cultura física', descricao: 'Ensino de esportes', divisao: 'E-3', cnae: '8591-1/00', carga_incendio_mj_m2: 300 },
  { ocupacao_uso: 'Educacional e cultura física', descricao: 'Atividades de condicionamento físico', divisao: 'E-3', cnae: '9313-1/00', carga_incendio_mj_m2: 300 },
  
  // Educacional E-4
  { ocupacao_uso: 'Educacional e cultura física', descricao: 'Educação profissional de nível técnico', divisao: 'E-4', cnae: '8541-4/00', carga_incendio_mj_m2: 300 },
  
  // Educacional E-5
  { ocupacao_uso: 'Educacional e cultura física', descricao: 'Educação infantil - creche', divisao: 'E-5', cnae: '8511-2/00', carga_incendio_mj_m2: 400 },
  { ocupacao_uso: 'Educacional e cultura física', descricao: 'Educação infantil - Pré-escola', divisao: 'E-5', cnae: '8512-1/00', carga_incendio_mj_m2: 400 },
  
  // Locais de reunião F-1
  { ocupacao_uso: 'Locais de reunião de público', descricao: 'Atividades de bibliotecas e arquivos', divisao: 'F-1', cnae: '9101-5/00', carga_incendio_mj_m2: 2000 },
  { ocupacao_uso: 'Locais de reunião de público', descricao: 'Atividades de museus e de exploração de lugares e prédios históricos', divisao: 'F-1', cnae: '9102-3/01', carga_incendio_mj_m2: 300 },
  
  // Locais de reunião F-2
  { ocupacao_uso: 'Locais de reunião de público', descricao: 'Atividades de organizações religiosas ou filosóficas', divisao: 'F-2', cnae: '9491-0/00', carga_incendio_mj_m2: 200 },
  
  // Locais de reunião F-3
  { ocupacao_uso: 'Locais de reunião de público', descricao: 'Gestão de instalações de esportes', divisao: 'F-3', cnae: '9311-5/00', carga_incendio_mj_m2: 150 },
  
  // Locais de reunião F-4
  { ocupacao_uso: 'Locais de reunião de público', descricao: 'Terminais rodoviários e ferroviários', divisao: 'F-4', cnae: '5222-2/00', carga_incendio_mj_m2: 200 },
  
  // Locais de reunião F-5
  { ocupacao_uso: 'Locais de reunião de público', descricao: 'Atividades de exibição cinematográfica', divisao: 'F-5', cnae: '5914-6/00', carga_incendio_mj_m2: 600 },
  { ocupacao_uso: 'Locais de reunião de público', descricao: 'Produção teatral', divisao: 'F-5', cnae: '9001-9/01', carga_incendio_mj_m2: 600 },
  
  // Locais de reunião F-8
  { ocupacao_uso: 'Locais de reunião de público', descricao: 'Restaurantes e similares', divisao: 'F-8', cnae: '5611-2/01', carga_incendio_mj_m2: 300 },
  { ocupacao_uso: 'Locais de reunião de público', descricao: 'Lanchonetes, casas de chá, de sucos e similares', divisao: 'F-8', cnae: '5611-2/03', carga_incendio_mj_m2: 300 },
  
  // Serviços automotivos G-2
  { ocupacao_uso: 'Serviços automotivos e assemelhados', descricao: 'Estacionamento de veículos', divisao: 'G-2', cnae: '5223-1/00', carga_incendio_mj_m2: 200 },
  
  // Serviços automotivos G-3
  { ocupacao_uso: 'Serviços automotivos e assemelhados', descricao: 'Comércio varejista de combustíveis para veículos automotores', divisao: 'G-3', cnae: '4731-8/00', carga_incendio_mj_m2: 300 },
  
  // Serviços automotivos G-4
  { ocupacao_uso: 'Serviços automotivos e assemelhados', descricao: 'Serviços de manutenção e reparação mecânica de veículos automotores', divisao: 'G-4', cnae: '4520-0/01', carga_incendio_mj_m2: 300 },
  
  // Serviços de saúde H-1
  { ocupacao_uso: 'Serviços de saúde e institucional', descricao: 'Atividades veterinárias', divisao: 'H-1', cnae: '7500-1/00', carga_incendio_mj_m2: 300 },
  
  // Serviços de saúde H-2
  { ocupacao_uso: 'Serviços de saúde e institucional', descricao: 'Clínicas e residências geriátricas', divisao: 'H-2', cnae: '8711-5/01', carga_incendio_mj_m2: 350 },
  
  // Serviços de saúde H-3
  { ocupacao_uso: 'Serviços de saúde e institucional', descricao: 'Atividades de atendimento hospitalar, exceto pronto-socorro', divisao: 'H-3', cnae: '8610-1/01', carga_incendio_mj_m2: 300 },
  
  // Serviços de saúde H-6
  { ocupacao_uso: 'Serviços de saúde e institucional', descricao: 'Atividade médica ambulatorial com recursos para realização de procedimentos cirúrgicos', divisao: 'H-6', cnae: '8630-5/01', carga_incendio_mj_m2: 200 },
  { ocupacao_uso: 'Serviços de saúde e institucional', descricao: 'Atividade odontológica', divisao: 'H-6', cnae: '8630-5/04', carga_incendio_mj_m2: 200 },
  
  // Industrial I-1
  { ocupacao_uso: 'Industrial', descricao: 'Matadouro - abate de reses sob contrato - exceto abate de suínos', divisao: 'I-1', cnae: '1011-2/05', carga_incendio_mj_m2: 40 },
  { ocupacao_uso: 'Industrial', descricao: 'Abate de aves', divisao: 'I-1', cnae: '1012-1/01', carga_incendio_mj_m2: 40 },
  { ocupacao_uso: 'Industrial', descricao: 'Fabricação de conservas de frutas', divisao: 'I-1', cnae: '1031-7/00', carga_incendio_mj_m2: 40 },
  { ocupacao_uso: 'Industrial', descricao: 'Fabricação de laticínios', divisao: 'I-1', cnae: '1052-0/00', carga_incendio_mj_m2: 200 },
  { ocupacao_uso: 'Industrial', descricao: 'Fabricação de sorvetes e outros gelados comestíveis', divisao: 'I-1', cnae: '1053-8/00', carga_incendio_mj_m2: 80 },
  { ocupacao_uso: 'Industrial', descricao: 'Fabricação de cervejas e chopes', divisao: 'I-1', cnae: '1113-5/02', carga_incendio_mj_m2: 80 },
  { ocupacao_uso: 'Industrial', descricao: 'Fabricação de refrigerantes', divisao: 'I-1', cnae: '1122-4/01', carga_incendio_mj_m2: 80 },
  { ocupacao_uso: 'Industrial', descricao: 'Fabricação de cigarros', divisao: 'I-1', cnae: '1220-4/01', carga_incendio_mj_m2: 200 },
  { ocupacao_uso: 'Industrial', descricao: 'Fabricação de tecidos de malha', divisao: 'I-1', cnae: '1330-8/00', carga_incendio_mj_m2: 300 },
  { ocupacao_uso: 'Industrial', descricao: 'Fabricação de madeira laminada e de chapas de madeira compensada', divisao: 'I-1', cnae: '1621-8/00', carga_incendio_mj_m2: 800 },
  { ocupacao_uso: 'Industrial', descricao: 'Fabricação de celulose e outras pastas para a fabricação de papel', divisao: 'I-1', cnae: '1710-9/00', carga_incendio_mj_m2: 80 },
  { ocupacao_uso: 'Industrial', descricao: 'Fabricação de cosméticos, produtos de perfumaria e de higiene pessoal', divisao: 'I-1', cnae: '2063-1/00', carga_incendio_mj_m2: 300 },
  { ocupacao_uso: 'Industrial', descricao: 'Fabricação de medicamentos alopáticos para uso humano', divisao: 'I-1', cnae: '2121-1/01', carga_incendio_mj_m2: 300 },
  { ocupacao_uso: 'Industrial', descricao: 'Fabricação de cimento', divisao: 'I-1', cnae: '2320-6/00', carga_incendio_mj_m2: 40 }
];

async function inserirDados() {
  console.log('Iniciando inserção dos dados do Anexo A...');
  
  try {
    // Pular a limpeza de dados por enquanto devido ao erro no endpoint DELETE
    console.log('Iniciando inserção direta dos dados...');
    
    let inseridos = 0;
    
    for (const item of dadosAnexoA) {
      try {
        const response = await axios.post('http://localhost:3000/api/anexoa', item);
        inseridos++;
        console.log(`Inserido: ${item.descricao} (${item.divisao})`);
      } catch (error) {
        console.error(`Erro ao inserir ${item.descricao}:`, error.response?.data || error.message);
      }
    }
    
    console.log(`\nInserção concluída! Total de registros inseridos: ${inseridos}`);
    
  } catch (error) {
    console.error('Erro durante a inserção:', error.message);
  }
}

// Executar a inserção
inserirDados();