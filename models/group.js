exports.Group = function(Sequelize, sequelize){
  return sequelize.define('Group', {

    gid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    gcomment: { type: Sequelize.STRING, len: [0, 50] }
  },{
    tableName: 'Group'
  });
}