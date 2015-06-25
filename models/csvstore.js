exports.CsvStore = function(Sequelize, sequelize){
  return sequelize.define('CsvStore', {

    csvid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    csvurl: { type: Sequelize.STRING, len: [0, 50]}

  },{
    tableName: 'CsvStore'
  });
}