exports.Category = function(Sequelize, sequelize){
  return sequelize.define('Category', {

    caid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    cname: { type: Sequelize.INTEGER, len: [0, 50] }

  },{
    tableName: 'Category'
  });
}