exports.History = function(Sequelize, sequelize){
  return sequelize.define('History', {

    hid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    htime: Sequelize.DATE,
    cid: Sequelize.INTEGER

  },{
    tableName: 'History'
  });
}