module.exports = function (sequelize, Sequelize) {
  const BookUser = sequelize.define("books_user", {
    bookId: {
      field: 'book_id',
      type: Sequelize.INTEGER,
    },
    userId: {
      field: 'user_id',
      type: Sequelize.INTEGER,
    },
    bookRoleId: {
      field: 'book_role_id',
      type: Sequelize.INTEGER
    }
  },
    { timestamps: false }
  );

  BookUser.associate = function (models) {
    BookUser.belongsTo(models.book_role);
    BookUser.belongsTo(models.user);
    BookUser.belongsTo(models.book);
  }

  return BookUser;
}