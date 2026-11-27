
const {
  ehPalindromo,
  contarVogais,
  calcularFatorial,
  removerDuplicatas,
  agendarConsulta,
  formatarMoeda,
  validarCpfBasico,
  calcularIngresso,
  ContaBancaria,
  obterClima
} = require('./avancado');

describe('🚀 Suíte de Testes Unitários Avançados - Parte 2', () => {

  // 1. Verificador de Palíndromo
  describe('1. Verificador de Palíndromo', () => {
    test('Deve identificar palíndromos', () => {
      expect(ehPalindromo('radar')).toBe(true);
      expect(ehPalindromo('Arara')).toBe(true);
    });

    test('Deve rejeitar palavras que não são palíndromos e strings vazias', () => {
      expect(ehPalindromo('javascript')).toBe(false);
      expect(ehPalindromo('')).toBe(false);
    });
  });

  // 2. Contador de Vogais
  describe('2. Contador de Vogais', () => {
    test('Deve contar vogais com acentuação', () => {
      expect(contarVogais('programação')).toBe(5);
    });

    test('Deve contar vogais em palavras comuns', () => {
      expect(contarVogais('computador')).toBe(4);
      expect(contarVogais('xyz')).toBe(0);
    });
  });

  // 3. Calculadora de Fatorial
  describe('3. Calculadora de Fatorial', () => {
    test('Deve calcular o fatorial de números positivos', () => {
      expect(calcularFatorial(5)).toBe(120);
    });

    test('Deve retornar 1 para os casos base', () => {
      expect(calcularFatorial(0)).toBe(1);
      expect(calcularFatorial(1)).toBe(1);
    });

    test('Deve lançar erro para números negativos', () => {
      expect(() => calcularFatorial(-5)).toThrow(
        'Não existe fatorial de número negativo'
      );
    });
  });

  // 4. Removedor de Duplicatas
  describe('4. Removedor de Duplicatas', () => {
    test('Deve remover números duplicados', () => {
      expect(removerDuplicatas([1, 1, 2, 3, 3, 4])).toEqual([1, 2, 3, 4]);
    });

    test('Deve remover strings duplicadas', () => {
      expect(removerDuplicatas(['a', 'b', 'a'])).toEqual(['a', 'b']);
    });
  });

  // 5. Validador de Agendamento
  describe('5. Validador de Agendamento', () => {
    test('Deve permitir agendamento em dia útil', () => {
      const segunda = new Date(2026, 9, 26);

      expect(agendarConsulta(segunda)).toBe('Consulta agendada com sucesso');
    });

    test('Deve bloquear agendamentos aos finais de semana', () => {
      const sabado = new Date(2026, 9, 24);
      const domingo = new Date(2026, 9, 25);

      expect(() => agendarConsulta(sabado)).toThrow(
        'Clínica fechada aos finais de semana'
      );

      expect(() => agendarConsulta(domingo)).toThrow(
        'Clínica fechada aos finais de semana'
      );
    });
  });

  // 6. Formatador de Moeda
  describe('6. Formatador de Moeda', () => {
    test('Deve formatar valores no padrão brasileiro', () => {
      expect(formatarMoeda(100)).toBe('R$ 100,00');
      expect(formatarMoeda(15.5)).toBe('R$ 15,50');
    });

    test('Deve rejeitar valores inválidos', () => {
      expect(() => formatarMoeda('abc')).toThrow('Valor inválido');
    });
  });

  // 7. Validador de CPF
  describe('7. Validador de CPF', () => {
    test('Deve aceitar CPF com e sem máscara', () => {
      expect(validarCpfBasico('12345678901')).toBe(true);
      expect(validarCpfBasico('123.456.789-01')).toBe(true);
    });

    test('Deve rejeitar CPFs repetidos ou com tamanho incorreto', () => {
      expect(validarCpfBasico('11111111111')).toBe(false);
      expect(validarCpfBasico('12345')).toBe(false);
    });
  });

  // 8. Cálculo de Ingresso
  describe('8. Cálculo de Ingresso', () => {
    test('Deve cobrar valor integral em dia comum', () => {
      expect(calcularIngresso(25, false, 1)).toBe(40);
    });

    test('Deve aplicar meia-entrada para estudantes, idosos e quartas-feiras', () => {
      expect(calcularIngresso(20, true, 1)).toBe(20);
      expect(calcularIngresso(60, false, 1)).toBe(20);
      expect(calcularIngresso(25, false, 3)).toBe(20);
    });

    test('Não deve acumular descontos de meia-entrada', () => {
      expect(calcularIngresso(65, true, 3)).toBe(20);
    });
  });

  // 9. Classe ContaBancaria
  describe('9. Suíte da Classe ContaBancaria', () => {
    let conta;

    beforeEach(() => {
      conta = new ContaBancaria('Lucas');
    });

    test('Deve iniciar com saldo zero', () => {
      expect(conta.obterSaldo()).toBe(0);
    });

    test('Deve realizar depósito válido', () => {
      conta.depositar(150);

      expect(conta.obterSaldo()).toBe(150);
    });

    test('Deve rejeitar depósito negativo', () => {
      expect(() => conta.depositar(-50)).toThrow(
        'Valor de depósito deve ser positivo'
      );
    });

    test('Deve realizar saque válido', () => {
      conta.depositar(200);
      conta.sacar(80);

      expect(conta.obterSaldo()).toBe(120);
    });

    test('Deve impedir saque com saldo insuficiente', () => {
      conta.depositar(50);

      expect(() => conta.sacar(100)).toThrow('Saldo insuficiente');
    });
  });

  // 10. Consulta de Clima Assíncrona
  describe('10. Suíte de Clima Assíncrono com Mock', () => {
    test('Deve retornar a temperatura quando a consulta for bem-sucedida', async () => {
      const servicoMock = {
        buscar: jest.fn().mockResolvedValue({ temperatura: 28 })
      };

      const resultado = await obterClima('São Paulo', servicoMock);

      expect(resultado).toBe('A temperatura em São Paulo é de 28°C');
      expect(servicoMock.buscar).toHaveBeenCalledWith('São Paulo');
      expect(servicoMock.buscar).toHaveBeenCalledTimes(1);
    });

    test('Deve tratar falhas na consulta de clima', async () => {
      const servicoMockComFalha = {
        buscar: jest.fn().mockRejectedValue(new Error('Network Offline'))
      };

      await expect(
        obterClima('Curitiba', servicoMockComFalha)
      ).rejects.toThrow('Falha ao buscar dados climáticos');
    });
  });

});
