export interface Iproduto {
  produto: {
    id: string;
    codigo: string;
    descricao: string;
    tipo: string;
    situacao: string;
    unidade: string;
    preco: string;
    precoCusto?: any;
    descricaoCurta: string;
    descricaoComplementar: string;
    dataInclusao: Date;
    dataAlteracao: Date;
    imageThumbnail?: any;
    urlVideo: string;
    nomeFornecedor: string;
    codigoFabricante: string;
    marca: string;
    class_fiscal: string;
    cest: string;
    origem: string;
    idGrupoProduto: string;
    linkExterno: string;
    observacoes: string;
    grupoProduto?: any;
    garantia?: string;
    descricaoFornecedor?: any;
    idFabricante: string;
    categoria: IcategoriaProduto;
    pesoLiq: string;
    pesoBruto: string;
    estoqueMinimo: string;
    estoqueMaximo: string;
    gtin: string;
    gtinEmbalagem: string;
    larguraProduto: string;
    alturaProduto: string;
    profundidadeProduto: string;
    unidadeMedida: string;
    itensPorCaixa: number;
    volumes: number;
    localizacao: string;
    crossdocking: string;
    condicao: string;
    freteGratis: string;
    producao: string;
    dataValidade?: Date;
    spedTipoItem: string;
  };
}

interface IcategoriaProduto {
  id: string;
  descricao: string;
}

export interface Cliente {
  id?: number;
  nome: string;

  tipoPessoa?: string;
  cpf_cnpj?: string;
  ie?: string;
  rg?: string;
  contribuinte?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;
  cidade?: string;
  uf?: string;
  fone?: string;
  email?: string;
}

export interface DadosEtiqueta {
  nome?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  municipio?: string;
  uf?: string;
  cep?: string;
  bairro?: string;
}

export interface Volume {
  servico: string;
  codigoRastreamento?: string;
}

export interface Volumes {
  volume?: Volume[];
}

export interface Transporte {
  transportadora?: string;
  tipo_frete?: string;
  servico_correios?: string;
  dados_etiqueta?: DadosEtiqueta;
  volumes?: Volumes;
}

export interface Item {
  codigo?: string;
  descricao: string;
  un?: string;
  qtde: string;
  vlr_unit: string;
  vlr_desconto?: number;
}

export interface Itens {
  item?: Item[];
}

export interface FormaPagamento {
  id?: number;
}

export interface Parcela {
  vlr: string;
  data?: string;
  obs?: string;
  dias: number;
  forma_pagamento?: FormaPagamento;
}

export interface Parcelas {
  parcela?: Parcela[];
}

export interface Pedido {
  cliente: Cliente;
  transporte?: Transporte;
  itens?: Itens;
  parcelas?: Parcelas;
  vlr_frete?: string;
  vlr_desconto?: string;
  data?: Date;
  data_prevista?: Date;
  numero?: string;
  loja?: number;
  data_saida?: Date;
  numero_loja?: string;
  nat_operacao?: string;
  vendedor?: string;
  obs?: string;
  obs_internas?: string;
}

export interface IpostPedido {
  pedido: Pedido;
}
