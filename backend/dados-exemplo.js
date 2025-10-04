// Script para popular a Tabela1 com dados de exemplo
const dados = [
    {
        codigo: 'A-1',
        ocupacao: 'Residencial',
        classificacao: 'Habitação Unifamiliar',
        grupo: 'A',
        subgrupo: 'A-1',
        divisao: 'Casas térreas ou sobrados',
        observacoes: 'Casas, sobrados, condomínios residenciais'
    },
    {
        codigo: 'A-2',
        ocupacao: 'Residencial',
        classificacao: 'Habitação Multifamiliar',
        grupo: 'A',
        subgrupo: 'A-2',
        divisao: 'Edifícios de apartamentos',
        observacoes: 'Apartamentos, quitinetes, flats'
    },
    {
        codigo: 'B-1',
        ocupacao: 'Serviços de Hospedagem',
        classificacao: 'Hotéis e Similares',
        grupo: 'B',
        subgrupo: 'B-1',
        divisao: 'Hotéis, motéis, pousadas',
        observacoes: 'Estabelecimentos com mais de 16 leitos'
    },
    {
        codigo: 'C-1',
        ocupacao: 'Comercial',
        classificacao: 'Comércio com baixa carga de incêndio',
        grupo: 'C',
        subgrupo: 'C-1',
        divisao: 'Comércio de baixo risco',
        observacoes: 'Livrarias, farmácias, floriculturas'
    },
    {
        codigo: 'C-2',
        ocupacao: 'Comercial',
        classificacao: 'Comércio com média carga de incêndio',
        grupo: 'C',
        subgrupo: 'C-2',
        divisao: 'Supermercados, lojas',
        observacoes: 'Supermercados, shopping centers, galerias'
    },
    {
        codigo: 'D-1',
        ocupacao: 'Serviços Profissionais',
        classificacao: 'Escritórios',
        grupo: 'D',
        subgrupo: 'D-1',
        divisao: 'Locais para prestação de serviços',
        observacoes: 'Escritórios, consultórios, repartições'
    },
    {
        codigo: 'E-1',
        ocupacao: 'Educacional',
        classificação: 'Escolas em geral',
        grupo: 'E',
        subgrupo: 'E-1',
        divisao: 'Estabelecimentos de ensino',
        observacoes: 'Creches, escolas, faculdades'
    },
    {
        codigo: 'F-1',
        ocupacao: 'Local de Reunião de Público',
        classificacao: 'Esporte',
        grupo: 'F',
        subgrupo: 'F-1',
        divisao: 'Locais esportivos',
        observacoes: 'Ginásios, estádios, quadras'
    }
];

console.log('Dados para inserção na Tabela1:');
console.log(JSON.stringify(dados, null, 2));