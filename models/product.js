exports.Product = function(Sequelize, sequelize){
  return sequelize.define('Product', {

    pid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    pname: { type: Sequelize.STRING, len: [0, 50]},
    caid: Sequelize.INTEGER,
    pbought: Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
    updateAt: Sequelize.DATE

  },{
    tableName: 'Product'
  });
}