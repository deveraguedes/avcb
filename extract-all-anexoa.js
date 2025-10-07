const fs = require('fs');
const axios = require('axios');

// Função para extrair TODOS os dados do Anexo A do PDF
function extrairTodosAnexoA() {
  const texto = fs.readFileSync('pdf-extracted-text.txt', 'utf8');
  const linhas = texto.split('\n');
  
  const dados = [];
  let processandoAnexoA = false;
  let ocupacaoAtual = '';
  
  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i].trim();
    
    // Detectar início do Anexo A
    if (linha.includes('ANEXO A')) {
      processandoAnexoA = true;
      console.log('Iniciando processamento do Anexo A na linha:', i);
      continue;
    }
    
    // Parar quando encontrar outro anexo
    if (linha.includes('ANEXO B') || linha.includes('Anexo B')) {
      console.log('Finalizando processamento do Anexo A na linha:', i);
      break;
    }
    
    if (processandoAnexoA && linha.length > 0) {
      // Detectar seções de ocupação/uso
      if (linha === 'Residencial' || linha === 'Serviços de hospedagem' || 
          linha === 'Comercial' || linha === 'Serviços profissionais, pessoais e técnicos' ||
          linha === 'Educacional e cultura física' || linha === 'Locais de reunião de público' ||
          linha === 'Serviços automotivos e assemelhados' || linha === 'Serviços de saúde e institucional' ||
          linha === 'Industrial') {
        ocupacaoAtual = linha;
        console.log(`Nova seção: ${ocupacaoAtual}`);
        continue;
      }
      
      // Pular cabeçalhos e linhas irrelevantes
      if (linha.includes('Ocupação') || linha.includes('Descrição') || 
          linha.includes('Divisão') || linha.includes('CNAE') || 
          linha.includes('Carga de') || linha.includes('incêndio') ||
          linha.includes('em MJ/m²') || linha.includes('Pág.') ||
          linha.length < 10) {
        continue;
      }
      
      // Regex para capturar linhas com dados completos
      // Formato: Descrição + Divisão + CNAE + Carga
      const regexCompleta = /^(.+?)\s+([A-Z]-[0-9]+)\s+([0-9]{4}-[0-9]+\/[0-9]{2})\s+([0-9]+)$/;
      const matchCompleta = linha.match(regexCompleta);
      
      if (matchCompleta) {
        const [, descricao, divisao, cnae, carga] = matchCompleta;
        
        const registro = {
          ocupacao_uso: ocupacaoAtual,
          descricao: descricao.trim(),
          divisao,
          cnae,
          carga_incendio_mj_m2: parseInt(carga)
        };
        
        dados.push(registro);
        console.log(`Extraído: ${descricao.substring(0, 40)}... - ${divisao} - ${cnae} - ${carga}`);
      } else {
        // Tentar capturar linhas que podem estar quebradas
        // Verificar se a próxima linha contém divisão, CNAE e carga
        if (i + 1 < linhas.length) {
          const proximaLinha = linhas[i + 1].trim();
          const regexProxima = /^([A-Z]-[0-9]+)\s+([0-9]{4}-[0-9]+\/[0-9]{2})\s+([0-9]+)$/;
          const matchProxima = proximaLinha.match(regexProxima);
          
          if (matchProxima) {
            const [, divisao, cnae, carga] = matchProxima;
            
            const registro = {
              ocupacao_uso: ocupacaoAtual,
              descricao: linha.trim(),
              divisao,
              cnae,
              carga_incendio_mj_m2: parseInt(carga)
            };
            
            dados.push(registro);
            console.log(`Extraído (2 linhas): ${linha.substring(0, 40)}... - ${divisao} - ${cnae} - ${carga}`);
            i++; // Pular a próxima linha já processada
          }
        }
      }
    }
  }
  
  console.log(`\nTotal de registros extraídos: ${dados.length}`);
  return dados;
}

// Função para limpar a tabela e inserir todos os dados
async function inserirTodosOsDados() {
  try {
    console.log('Iniciando extração dos dados do Anexo A...');
    const dados = extrairTodosAnexoA();
    
    if (dados.length === 0) {
      console.log('Nenhum dado foi extraído!');
      return;
    }
    
    console.log(`\nPreparando para inserir ${dados.length} registros...`);
    
    // Primeiro, limpar a tabela existente
    console.log('Limpando tabela anexoa...');
    try {
      const deleteResponse = await axios.delete('http://localhost:3000/api/anexoa/all');
      console.log('Tabela limpa com sucesso');
    } catch (error) {
      console.log('Aviso: Não foi possível limpar a tabela (pode estar vazia):', error.response?.status);
    }
    
    // Inserir todos os dados
    let sucessos = 0;
    let erros = 0;
    
    for (let i = 0; i < dados.length; i++) {
      const registro = dados[i];
      try {
        await axios.post('http://localhost:3000/api/anexoa', registro);
        sucessos++;
        
        if ((i + 1) % 50 === 0) {
          console.log(`Progresso: ${i + 1}/${dados.length} registros inseridos`);
        }
      } catch (error) {
        erros++;
        console.error(`Erro ao inserir registro ${i + 1}:`, error.response?.data || error.message);
        console.error('Dados do registro:', registro);
      }
    }
    
    console.log(`\n=== RESULTADO FINAL ===`);
    console.log(`Total extraído: ${dados.length}`);
    console.log(`Sucessos: ${sucessos}`);
    console.log(`Erros: ${erros}`);
    console.log(`Taxa de sucesso: ${((sucessos / dados.length) * 100).toFixed(2)}%`);
    
    // Verificar quantos registros estão no banco
    try {
      const response = await axios.get('http://localhost:3000/api/anexoa/count');
      console.log(`Registros no banco: ${response.data.count}`);
    } catch (error) {
      console.log('Não foi possível verificar o total no banco');
    }
    
  } catch (error) {
    console.error('Erro geral:', error.message);
  }
}

// Executar a extração e inserção
inserirTodosOsDados();