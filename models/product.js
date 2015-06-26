exports.Product = function(Sequelize, sequelize){
  return sequelize.define('Product', {

    pid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    pname: { type: Sequelize.STRING, len: [0, 50]},
    caid: Sequelize.INTEGER,
    pbought: Sequelize.INTEGER,
    pprice: Sequelize.INTEGER,
    pcost: Sequelize.INTEGER,
    pimage: { type: Sequelize.STRING, len: [0, 500]}

  },{
    tableName: 'Product'
  });
}