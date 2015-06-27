exports.GroupRelationShip = function(Sequelize, sequelize){
  return sequelize.define('GroupRelationShip', {

    grid: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true }, 
    gid: Sequelize.INTEGER,
    cid: Sequelize.INTEGER

  },{
    tableName: 'GroupRelationShip'
  });
}