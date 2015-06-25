exports.History = function(Sequelize, sequelize){
  return sequelize.define('History', {

    hid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    htime: Sequelize.DATE,
    cid: Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
    updateAt: Sequelize.DATE

  },{
    tableName: 'History'
  });
}