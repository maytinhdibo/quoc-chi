module.exports = function(sequelize, Sequelize){
    const SectionState = sequelize.define(
        'section_state',
    {
        id:{
            primaryKey: true,
            field: 'id',
            type: Sequelize.BIGINT,
        },
        name:{
            field: 'name',
            type: Sequelize.STRING,
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
    SectionState.associate = function (models) {
        SectionState.hasMany(models.section);
    };

    return SectionState;
};