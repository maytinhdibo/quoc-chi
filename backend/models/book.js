module.exports = function (sequelize, Sequelize) { 
    const Book = sequelize.define("book", {
        id: {
            primaryKey: true,
            field: 'id',
            type: Sequelize.BIGINT,
            autoIncrement: true,
          },
   
        name: {
            type: Sequelize.STRING(4069),
        },
        description: {
            type: Sequelize.TEXT,
        },
        createdAt: {
          field: 'created_at',
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          field: 'updated_at',
          type: Sequelize.DATE,
          allowNull: false,
        },

    });

    Book.associate = function (models) {
      Book.belongsToMany(models.user,{ through: models.books_user });
      Book.belongsToMany(models.documentation,{ through: models.books_doc});

      Book.hasMany(models.volume);

    };

    return Book;
}