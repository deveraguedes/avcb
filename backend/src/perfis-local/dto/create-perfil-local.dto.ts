export class CreatePerfilLocalDto {
  projetoId: number;
  tipo_projeto?: string;
  ocupacao_edificacao?: string;
  altura_edificacao?: number;
  area_edificacao?: number;
  grupo_incendio?: string;
  plano_prevencao?: boolean;
  projeto_tecnico?: string;
  qtde_saidas_emergencia?: number;
  sinalizacao_emergencia?: string;
  extintores?: string;
  qtde_iluminacao_emergencia?: number;
  qtde_pavimentos?: number;
  area_subsolo?: number;
  ocupacao_subsolo?: string;
  area_central_gas?: number;
  tipo_cilindro_gas?: string;
  qtde_hidrantes?: number;
  qtde_mangotinhos?: number;
  bombas_incendio?: string;
  lci_reservatorio?: number;
}
