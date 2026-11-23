
// Importação das 10 funções
const {
  calcularMedia,
  verificarAprovacao,
  classificarFaixaEtaria,
  converterKmParaMilhas,
  gerarEmailCorporativo,
  adicionarItemCarrinho,
  calcularSalarioLiquido,
  criarProduto,
  ehTrianguloValido,
  removerElemento
} = require('./exercicios');

describe('🧪 Suíte de Testes Unitários - 10 Regras de Negócio', () => {

  // 1. Teste da calculadora de média
  test('1. calcularMedia: deve calcular médias e validar notas', () => {
    expect(calcularMedia(7, 8, 9)).toBe(8);

    expect(calcularMedia(7.5, 8.0, 9.0)).toBeCloseTo(8.17, 2);

    expect(() => calcularMedia(-1, 8, 9)).toThrow('Nota inválida: deve estar entre 0 e 10');

    expect(() => calcularMedia(7, 11, 9)).toThrow('Nota inválida: deve estar entre 0 e 10');
  });

  // 2. Teste do verificador de aprovação
  test('2. verificarAprovacao: deve verificar nota e frequência', () => {
    expect(verificarAprovacao(7.0, 75)).toBe(true);
    expect(verificarAprovacao(8.5, 80)).toBe(true);
    expect(verificarAprovacao(6.9, 90)).toBe(false);
    expect(verificarAprovacao(9.0, 74)).toBe(false);
  });

  // 3. Teste do classificador de faixa etária
  test('3. classificarFaixaEtaria: deve classificar as idades', () => {
    expect(classificarFaixaEtaria(10)).toBe('Criança');
    expect(classificarFaixaEtaria(15)).toBe('Adolescente');
    expect(classificarFaixaEtaria(25)).toBe('Adulto');
    expect(classificarFaixaEtaria(65)).toBe('Idoso');

    expect(() => classificarFaixaEtaria(-5)).toThrow('Idade não pode ser negativa');
  });

  // 4. Teste do conversor de quilômetros para milhas
  test('4. converterKmParaMilhas: deve converter distâncias', () => {
    expect(converterKmParaMilhas(10)).toBeCloseTo(6.21, 2);
    expect(converterKmParaMilhas(0)).toBe(0);

    expect(() => converterKmParaMilhas(-10)).toThrow('Distância não pode ser negativa');
  });

  // 5. Teste do gerador de e-mail corporativo
  test('5. gerarEmailCorporativo: deve padronizar os e-mails', () => {
    expect(gerarEmailCorporativo('Lucas', 'Silva', 'empresa.com')).toBe('lucas.silva@empresa.com');

    expect(gerarEmailCorporativo(' Ana ', ' Souza ', 'TECH.IO')).toBe('ana.souza@tech.io');
  });

  // 6. Teste da adição de itens no carrinho
  test('6. adicionarItemCarrinho: deve adicionar item sem alterar o original', () => {
    const carrinhoInicial = ['Monitor', 'Mouse'];

    const novoCarrinho = adicionarItemCarrinho(carrinhoInicial, 'Teclado');

    expect(novoCarrinho).toEqual(['Monitor', 'Mouse', 'Teclado']);
    expect(novoCarrinho).toHaveLength(3);
    expect(carrinhoInicial).toHaveLength(2);
  });

  // 7. Teste do cálculo de salário líquido
  test('7. calcularSalarioLiquido: deve calcular o salário e validar valores', () => {
    expect(calcularSalarioLiquido(3000, 10)).toBe(2700);
    expect(calcularSalarioLiquido(5000, 0)).toBe(5000);

    expect(() => calcularSalarioLiquido(0, 10)).toThrow('Valores de salário ou desconto inválidos');

    expect(() => calcularSalarioLiquido(3000, -5)).toThrow('Valores de salário ou desconto inválidos');
  });

  // 8. Teste da criação de produtos
  test('8. criarProduto: deve criar produto e validar preço', () => {
    expect(criarProduto(1, 'Monitor', 899.90, 'Informática')).toEqual({
      id: 1,
      nome: 'Monitor',
      preco: 899.90,
      categoria: 'Informática',
      emEstoque: true
    });

    expect(() => criarProduto(2, 'Mouse', 0, 'Informática')).toThrow('Preço deve ser maior que zero');

    expect(() => criarProduto(3, 'Teclado', -50, 'Informática')).toThrow('Preço deve ser maior que zero');
  });

  // 9. Teste do validador de triângulos
  test('9. ehTrianguloValido: deve verificar se os lados formam um triângulo', () => {
    expect(ehTrianguloValido(3, 4, 5)).toBe(true);
    expect(ehTrianguloValido(1, 2, 10)).toBe(false);
    expect(ehTrianguloValido(0, 4, 5)).toBe(false);
  });

  // 10. Teste da remoção de elementos
  test('10. removerElemento: deve remover elementos sem alterar o original', () => {
    const listaOriginal = ['banana', 'maca', 'uva'];

    const novaLista = removerElemento(listaOriginal, 'maca');

    expect(novaLista).toEqual(['banana', 'uva']);

    expect(removerElemento([1, 2, 3], 99)).toEqual([1, 2, 3]);

    expect(listaOriginal).toHaveLength(3);
  });

});
