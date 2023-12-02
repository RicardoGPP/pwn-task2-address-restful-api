exports.up = function(knex) {
    return knex.schema.createTable('endereco', table => {
        table.increments('id');
        table.string('rua', 255).notNullable();
        table.string('numero', 50);
        table.string('bairro', 100).notNullable();
        table.string('cidade', 100).notNullable();
        table.string('estado', 50).notNullable();
        table.string('cep', 10).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('endereco');
};