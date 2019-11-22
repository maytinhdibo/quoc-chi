module.exports = function (sequelize, Sequelize) {
  const BookUser = sequelize.define("books_user", {
    bookId: {
      field: 'book_id',
      type: Sequelize.BIGINT,
    },
    userId: {
      field: 'user_id',
      type: Sequelize.BIGINT,
    },
    bookRoleId: {
      field: 'book_role_id',
      type: Sequelize.BIGINT
    }
  },
    { timestamps: false }
  );

  BookUser.associate = function (models) {
    BookUser.belongsTo(models.book_role, {foreignKey: "book_role_id"});
    BookUser.belongsTo(models.user,{foreignKey:"user_id"});
    BookUser.belongsTo(models.book,{foreignKey:"book_id"});
  }

  return BookUser;
}