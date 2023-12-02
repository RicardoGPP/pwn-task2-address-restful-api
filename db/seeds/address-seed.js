exports.seed = async function(knex) {
    await knex('endereco').del();
    await knex('endereco').insert([
        {
            rua: 'Rua Francisco Moacir de Carvalho',
            numero: '224',
            bairro: 'Instância Nova',
            cidade: 'Campinas',
            estado: 'São Paulo',
            cep: '13.157-254'
        },
        {
            rua: 'Avenida José de Barros',
            numero: 'S/N',
            bairro: 'Bela Vista',
            cidade: 'Engenheiro Coelho',
            estado: 'São Paulo',
            cep: '13.268-574'
        },
        {
            rua: 'Pedro de Alencar Soarez',
            numero: '984',
            bairro: 'Centro',
            cidade: 'Extrema',
            estado: 'Minas Gerais',
            cep: '35.547-987'
        }
    ]);
};