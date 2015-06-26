exports.Category = function(Sequelize, sequelize){
  return sequelize.define('Category', {

    caid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    caname: { type: Sequelize.STRING, len: [0, 50] }

  },{
    tableName: 'Category'
  });
}