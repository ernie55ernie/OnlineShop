exports.CartItem = function(Sequelize, sequelize){
  return sequelize.define('CartItem', {

    ciid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    hid: Sequelize.INTEGER,
    pid: Sequelize.INTEGER,
    cinumber: Sequelize.INTEGER

  },{
    tableName: 'CartItem'
  });
}