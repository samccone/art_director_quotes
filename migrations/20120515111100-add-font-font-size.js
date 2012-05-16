module.exports = {
  up: function(db, types) {
    db.addColumn('quotes', 'fontfamily', {
      type : types.TEXT,
      allowNull: true
    });
    db.addColumn('quotes', 'fontsize', {
      type : types.INTEGER,
      allowNull : true
    });
  },
  down: function(db, types) {
    db.removeColumn('quotes', fontfamily);
    db.removeColumn('quotes', fontsize);
  }
}