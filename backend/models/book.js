module.exports = function (sequelize, Sequelize) { 
    const Book = sequelize.define("book", {
        id: {
            primaryKey: true,
            field: 'id',
            type: Sequelize.BIGINT,
            autoIncrement: true,
          },
   
        name: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        createdAt: {
          field: 'created_at',
          type: Sequelize.DATE,
        },
        updatedAt: {
          field: 'updated_at',
          type: Sequelize.DATE,
        },

    });

    Book.associate = function (models) {
        Book.belongsToMany(models.user,{ through: models.books_user });
        Book.belongsToMany(models.documentation,{ through: models.books_doc});

        Book.hasMany(models.volume);
        Book.hasMany(models.books_docs);
    };

    return Book;
}