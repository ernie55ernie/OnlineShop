exports.GroupRelationShip = function(Sequelize, sequelize){
  return sequelize.define('GroupRelationShip', {

    grid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    gid: Sequelize.INTEGER,
    cid: Sequelize.INTEGER,
    createdAt: Sequelize.DATE,
    updateAt: Sequelize.DATE

  },{
    tableName: 'GroupRelationShip'
  });
}