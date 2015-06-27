exports.JsonStore = function(Sequelize, sequelize){
  return sequelize.define('JsonStore', {

    jsonid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    jsoncontent: Sequelize.STRING

  },{
    tableName: 'JsonStore'
  });
}