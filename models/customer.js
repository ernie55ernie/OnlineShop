exports.Customer = function(Sequelize, sequelize){
  return sequelize.define('Customer', {

    cid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    cusername: { type: Sequelize.STRING, len: [0, 50] },
    cgender: Sequelize.INTEGER,
    cbirthday: Sequelize.DATE,
    uid: Sequelize.INTEGER,
    cphoto: { type: Sequelize.STRING, len: [0, 100] },
    cemail: { type: Sequelize.STRING, len: [0, 100]}

  },{
    tableName: 'Customer'
  });
}