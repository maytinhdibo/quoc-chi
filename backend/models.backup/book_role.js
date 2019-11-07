module.exports = function (sequelize, Sequelize) { 
    const BookRole = sequelize.define("book_role", {
          name: {
            field: 'name',
            type: Sequelize.INTEGER,
          }
    },
    {timestamps: false});

    BookRole.associate = function (models) {
      BookRole.hasOne(models.books_user);
    }
    
    return BookRole;
}