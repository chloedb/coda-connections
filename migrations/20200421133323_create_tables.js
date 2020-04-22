
exports.up = function(knex) {
  return knex.schema.createTable('stories', function(table) {
    table.increments('id').primary();
    table.text('body').notNullable();
    table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('stories')
};
