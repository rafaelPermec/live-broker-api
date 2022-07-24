import {
  apiBovespa,
  apiBovespaSegmentada,
} from '../src/models/Simulação-API-Bovespa/fundamentus-scrapping.model';

describe('5 - Se a função de apiBovespa() retorna objetos corretamente', () => {
  it('Será validado que o campo "Email" é obrigatório', async () => {
    const result = await apiBovespa();

    expect(typeof result).toBe('object');
    expect(result[0]).toHaveProperty('CodAtivo');
    expect(result[0]).toHaveProperty('SiglaAtivo');
    expect(result[0]).toHaveProperty('Valor');
  });
});

describe('6 - Se a função de apiBovespa() retorna objetos corretamente', () => {
  it('Será validado que o campo "Email" é obrigatório', async () => {
    const result = await apiBovespaSegmentada();

    expect(typeof result).toBe('object');
    expect(result.ativosPreferenciais[0]).toHaveProperty('CodAtivo');
    expect(result.ativosPreferenciais[0]).toHaveProperty('SiglaAtivo');
    expect(result.ativosPreferenciais[0]).toHaveProperty('Valor');
  });
});
