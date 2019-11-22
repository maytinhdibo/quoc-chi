module.exports = function(sequelize, Sequelize){
    const schemaMigration = sequelize.define("schema_migration",{
        version:{
            primaryKey: true,
            field: "version",
            type: Sequelize.STRING,
        },
    });
    return schemaMigration;
}