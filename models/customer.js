exports.Customer = function(Sequelize, sequelize){
  return sequelize.define('Customer', {

    cid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    cname: { type: Sequelize.STRING, len: [0, 50] },
    cgender: Sequelize.INTEGER,
    cbirthday: Sequelize.DATE,
    caccount: Sequelize.INTEGER,
    cphoto: { type: Sequelize.STRING, len: [0, 100] }

  },{
    tableName: 'Customer'
  });
}