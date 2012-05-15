module.exports = {
  up: function(db, types) {
    db.createTable('quotes', {
      id: {
        type: types.INTEGER,
        primaryKey: true
      },
      createdAt: types.DATE,
      updatedAt: types.DATE,
      description: types.TEXT,
    });
  },
  down: function(db, types) {
    db.dropTable('Quotes');
  }
}