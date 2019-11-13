module.exports = function (sequelize, Sequelize) { 
    const Book = sequelize.define("book", {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            field: "id"
          },
        createdAt: {
            field: 'created_at',
            type: Sequelize.DATE,
          },
          updatedAt: {
            field: 'updated_at',
            type: Sequelize.DATE,
          },
        name: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
    });

    Book.associate = function (models) {
        Book.belongsToMany(models.user,{ through: models.books_user });
        Book.hasMany(models.volume);
        Book.hasMany(models.books_docs);
    };

    return Book;
}