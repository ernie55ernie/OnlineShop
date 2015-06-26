exports.User = function(Sequelize, sequelize){
  return sequelize.define('User', {
    uid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    username: { type: Sequelize.STRING, len: [0, 50] },
    password: { type: Sequelize.STRING, len: [0, 50] },
    admin: Sequelize.INTEGER
  },{
    tableName: 'user'
  });
}