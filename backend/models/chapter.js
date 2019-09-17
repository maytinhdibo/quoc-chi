module.exports = function (sequelize, Sequelize) {
    const Chapter = sequelize.define("chapter", {
        createdAt: {
            field: 'created_at',
            type: Sequelize.DATE,
        },
        updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE,
        },
        volumeId: {
            field: 'volume_id',
            type: Sequelize.INTEGER,
        },
        name: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        introduction: {
            type: Sequelize.STRING,
        }
    });

    Chapter.associate = function (models) {
        Chapter.belongsTo(models.volume, { foreignKey: 'volumeId' });
        Chapter.hasMany(models.section);
    };

    return Chapter;
}