module.exports = function(sequelize, Sequelize){
    const SectionLogType = sequelize.define(
        'sections_log_type',
    {
        id: {
            primaryKey: true,
            field: 'id',
            type: Sequelize.BIGINT,
            
          },
          name:{
              field: "name",
              type: Sequelize.STRING
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: "created_at"
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: "updated_at"
          },
    });
    SectionLogType.associate = function (models) {
        SectionLogType.hasMany(models.sections_log);
    }

    return SectionLogType;
};