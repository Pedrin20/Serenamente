/**
 * Dados de demonstração do marketplace (sem APIs por enquanto).
 * Os quatro lados do produto aparecem aqui: paciente, profissional,
 * faixas de preço social e a agenda simulada.
 */

export type FaixaPreco = {
  id: string;
  nome: string;
  valor: string;
  nota: string;
  descricao: string;
};

export const faixas: FaixaPreco[] = [
  {
    id: 'acessivel',
    nome: 'Acessível',
    valor: 'Até R$ 35',
    nota: 'Vagas comunitárias',
    descricao: 'Para quem tem renda mais baixa ou está em vulnerabilidade.',
  },
  {
    id: 'apoio',
    nome: 'Apoio Popular',
    valor: 'R$ 35 – R$ 60',
    nota: 'Mais procurado',
    descricao: 'Faixa intermediária com forte desconto sobre o valor cheio.',
  },
  {
    id: 'solidario',
    nome: 'Solidário',
    valor: 'R$ 60 – R$ 90',
    nota: 'Flexibilidade',
    descricao: 'Apoio financeiro ao profissional que abre vagas sociais.',
  },
  {
    id: 'expandido',
    nome: 'Expandido',
    valor: 'R$ 90+',
    nota: 'Sustentabilidade',
    descricao: 'Valor de mercado, ainda abaixo da média da categoria.',
  },
];

export type Profissional = {
  id: string;
  nome: string;
  titulo: string;
  registro: string;
  categoria: 'psicologo' | 'psiquiatra';
  abordagem: string;
  especialidades: string[];
  avaliacao: number;
  avaliacoes: number;
  experiencia: number;
  faixaId: string;
  tags: string[];
  proximaVaga: string;
  video: string;
  sobre: string[];
};

export const profissionais: Profissional[] = [
  {
    id: 'helena',
    nome: 'Dra. Helena Vasconcelos',
    titulo: 'Psicologia Clínica • Terapia Humanizada',
    registro: 'CRP 06/142981',
    categoria: 'psicologo',
    abordagem: 'Terapia Cognitivo-Comportamental & Mindfulness',
    especialidades: ['Terapia Cognitivo-Comportamental', 'Ansiedade & Pânico', 'Adultos e Jovens'],
    avaliacao: 4.9,
    avaliacoes: 128,
    experiencia: 5,
    faixaId: 'apoio',
    tags: ['TCC', 'Ansiedade'],
    proximaVaga: 'Hoje, 14h30',
    video: '45s',
    sobre: [
      'Olá, seja muito bem-vindo(a). Acredito profundamente que a terapia é um refúgio sem julgamentos, onde cada dor, receio e conquista têm espaço legítimo para serem acolhidos com afeto e rigor ético.',
      'Com formação focada em Terapia Cognitivo-Comportamental (TCC), trabalho para que construamos juntos formas mais leves de lidar com o que pesa hoje — no seu ritmo, com escuta atenta e plano terapêutico claro.',
    ],
  },
  {
    id: 'rafael',
    nome: 'Dr. Rafael Andrade',
    titulo: 'Psiquiatria • Acolhimento e cuidado contínuo',
    registro: 'CRM 128.456',
    categoria: 'psiquiatra',
    abordagem: 'Acompanhamento psiquiátrico com foco em transtornos de ansiedade',
    especialidades: ['Transtornos de Ansiedade', 'Depressão', 'Sono'],
    avaliacao: 4.8,
    avaliacoes: 96,
    experiencia: 9,
    faixaId: 'solidario',
    tags: ['Psiquiatria', 'Ansiedade'],
    proximaVaga: 'Amanhã, 9h00',
    video: '1min',
    sobre: [
      'Cuidar da mente é um direito fundamental, nunca um privilégio. Minha prática combina escuta cuidadosa, psicoeducação e revisão criteriosa de medicação quando ela faz sentido.',
      'Atendo também em vale-transporte digital e mantenho vagas sociais todas as semanas para quem precisa de um valor mais acessível.',
    ],
  },
  {
    id: 'camila',
    nome: 'Dra. Camila Prado',
    titulo: 'Psicologia Clínica • Terapia de casal e família',
    registro: 'CRP 06/118904',
    categoria: 'psicologo',
    abordagem: 'Sistêmica & focada em emoções',
    especialidades: ['Terapia de Casal', 'Luto', 'Família'],
    avaliacao: 4.9,
    avaliacoes: 74,
    experiencia: 7,
    faixaId: 'acessivel',
    tags: ['Luto', 'Casal'],
    proximaVaga: 'Hoje, 19h00',
    video: '52s',
    sobre: [
      'Acreditamos que a terapia é um refúgio sem julgamentos. Trabalho com escuta sistêmica para que relações e perdas encontrem palavras e novos caminhos.',
      'Minhas vagas comunitárias são abertas toda segunda-feira, com valor fixo e sem necessidade de comprovação de renda.',
    ],
  },
];

export function getProfissional(id?: string): Profissional {
  return profissionais.find((p) => p.id === id) ?? profissionais[0]!;
}

export function getFaixa(id?: string): FaixaPreco {
  return faixas.find((f) => f.id === id) ?? faixas[0]!;
}

export const horarios = [
  { id: 'h1', dia: 'Seg 24', hora: '09:00' },
  { id: 'h2', dia: 'Seg 24', hora: '14:30' },
  { id: 'h3', dia: 'Ter 25', hora: '10:00' },
  { id: 'h4', dia: 'Ter 25', hora: '16:00' },
  { id: 'h5', dia: 'Qua 26', hora: '08:30' },
  { id: 'h6', dia: 'Qua 26', hora: '18:00' },
];

export const atendimentosPendentes = [
  { id: 'a1', paciente: 'Mariana Souza', hora: '14h30', faixa: 'Apoio Popular', online: true },
  { id: 'a2', paciente: 'João Pereira', hora: '16h00', faixa: 'Acessível', online: true },
  { id: 'a3', paciente: 'Beatriz Lima', hora: '19h15', faixa: 'Solidário', online: false },
];
