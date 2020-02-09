const db = require("./../models");
const response = require("../utils/response");
const sercetkey = require("../config/secretkey");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.user.findOne({
      where: {
        email: email
      }
    });
    if (!user) {
      throw new Error("Tài khoản không tồn tại!");
    } else {
      if (bcrypt.compareSync(password, user.encrypted_password)) {
        const token = genToken({
          id: user.id
        });
        let name = user.name;
        let id = user.id;
        return res.json(response.success({ id, token, name }));
      } else {
        throw new Error("Mật khẩu không chính xác!");
      }
    }
  } catch (err) {
    console.log("Error: ", err.message);
    return res.json(response.fail(err.message));
  }
};

const genRole = async userId => {
  const adminRole = await db.users_role.findOne({
    where: {
      userId,
      roleId: 1
    }
  });

  //admin role
  if (adminRole) {
    return {
      type: "admin",
      path: "/analytics"
    };
  }

  //book role
  const bookAdminRole = await db.books_user.findOne({
    where: {
      userId,
      bookRoleId: 1
    }
  });

  if (bookAdminRole) {
    return {
      type: "book-admin",
      path: "/books/detail/" + bookAdminRole.bookId,
      bookId: bookAdminRole.bookId
    };
  }

  //volume role
  const volumeAdminRole = await db.users_volume.findOne({
    where: {
      userId
    }
  });

  if (volumeAdminRole) {
    return {
      type: "volume-admin",
      path: "/volumes/detail/" + volumeAdminRole.volumeId,
      volumeId: volumeAdminRole.volumeId
    };
  }

  return {
    type: "none",
    path: "/editor"
  };
};

const getRefresh = async (req, res) => {
  try {
    const userId = req.tokenData.id;
    let token = genToken({
      id: userId
    });
    role = await genRole(userId);

    res.json(response.success({ token, role }));
  } catch (e) {
    res.json(response.fail(e.message));
  }
};

const register = async (req, res) => {
  const {
    name,
    email,
    password,
    academicTitleId,
    organizationId,
    optionUserRole,
    optionEditorRole
  } = req.body;
  try {
    var user = await db.user.findOne({
      where: {
        email: email
      }
    });
    if (user) {
      throw new Error("Tài khoản đã tồn tại!");
    }
    encrypted_password = bcrypt.hashSync(password, 10);
    await db.user
      .create({
        name,
        email,
        encrypted_password,
        academicTitleId,
        organizationId
      })
      .then(newuser => {
        user = newuser;
      })
      .catch(e => {
        throw new Error("Lỗi với dữ liệu nhập vào, vui lòng kiểm tra lại.");
      });
    if (optionUserRole == 1) {
      //admin
      console.log("admin");
      await db.users_role.create({
        userId: user.id,
        roleId: 1
      });
    } else {
      //editor
      console.log(optionEditorRole);
      if (optionEditorRole.value == 1) {
        //book admin

        await db.books_user.create({
          bookId: optionEditorRole.bookId,
          userId: user.id,
          bookRoleId: 6
        });
      } else if (optionEditorRole.value == 2) {
        //volume admin
        await db.users_volume.create({
          volumeId: optionEditorRole.volumeId,
          userId: user.id
        });
        let volume = await db.volume.findOne({
          where: {
            id: optionEditorRole.volumeId
          }
        });
        await db.books_user.create({
          bookId: volume.bookId,
          userId: user.id,
          bookRoleId: 7
        });
      }
    }
    res.json(response.success(user));
  } catch (e) {
    try {
      await db.user.destroy({
        where: {
          email: email
        }
      });
    } catch (e) { }
    res.json(response.fail(e.message));
  }
};

const get = async (req, res) => {
  const { book, volume, chapter } = req.body;
  try {
    var list;
    let user_model = [
      {
        attributes: ["id", "name", "email"],
        model: db.user,
        include: [
          {
            model: db.organization,
            attributes: ["name"]
          },
          {
            model: db.academic_title,
            attributes: ["name"]
          },
          {
            attributes: ["id", "name"],
            model: db.book
          }
        ]
      }
    ];
    var listRole = await db.book_role.findAll({
      attributes: ["name"]
    });
    if (chapter) {
      list = await db.sequelize.query(
        `
            SELECT DISTINCT u.id, u.email, u.name,  u.academic_title_id,at.name as 'academic_title_name',  o.name as 'organization_name', bu.book_id, br.id as 'book_role_id' , br.name as 'book_role_name', b.name as 'book_name' FROM  
            chapters c JOIN sections s ON c.id = s.chapter_id
            JOIN sections_users su ON s.id=su.section_id
            JOIN users u ON su.user_id=u.id
            JOIN academic_titles at ON u.academic_title_id=at.id
            JOIN organizations o ON u.organization_id=o.id
            JOIN books_users bu ON u.id=bu.user_id
            JOIN book_roles br ON bu.book_role_id=br.id
            JOIN books b ON b.id=bu.book_id
            WHERE c.id=` + chapter,
        { type: db.sequelize.QueryTypes.SELECT }
      );

      var result = [];

      list.forEach(e => {
        if (result[e.id]) {
          result[e.id].books.push({
            id: e.book_id,
            name: e.book_name,
            bookRole: {
              id: e.book_role_id,
              name: e.book_role_name
            }
          });
        } else {
          result[e.id] = {
            id: e.id,
            email: e.email,
            name: e.name,
            academic_title: {
              id: e.academic_title_id,
              name: e.academic_title_name
            },
            organization: {
              name: e.organization_name
            },
            books: [
              {
                id: e.book_id,
                name: e.book_name,
                bookRole: {
                  id: e.book_role_id,
                  name: e.book_role_name
                }
              }
            ]
          };
        }
      });

      result = result.filter(function (el) {
        return el != null;
      });

      res.json(response.success(result));
    } else {
      if (volume) {
        list = await db.users_volume.findAll({
          where: {
            volume_id: volume
          },
          attributes: [],
          include: user_model
        });
      } else if (book) {
        list = await db.books_user.findAll({
          where: {
            book_id: book
          },
          include: [
            {
              attributes: ["id", "name", "email"],
              model: db.user,
              include: [
                {
                  model: db.organization,
                  attributes: ["name"]
                },
                {
                  model: db.academic_title,
                  attributes: ["name"]
                },
                {
                  model: db.book,
                  attributes: ["id", "name"]
                }
              ]
            }
          ]
        });
      }
      var listData = list.map(element => {
        let books = element.user.books.map(obj => {
          return {
            id: obj.id,
            name: obj.name,
            bookRole: {
              id: obj.books_user.bookRoleId,
              name: listRole[obj.books_user.bookRoleId - 1].name
            }
          };
        });
        return {
          id: element.user.id,
          name: element.user.name,
          email: element.user.email,
          organization: element.user.organization,
          academic_title: element.user.academic_title,
          books: books
        };
      });

      res.json(response.success(listData));
    }
  } catch (e) {
    res.json(response.fail(e.message));
  }
};

const getInfo = async (req, res) => {
  const id = req.query.id;
  try {
    const user = await db.user.findOne({
      where: {
        id: id
      },
      include: [{ model: db.academic_title }, { model: db.organization }]
    });


    if (!user) {
      throw new Error("Tài khoản không tồn tại!");
    } else {

      //change to check role
      // let role = await users_role.findOne({
      //   where:{
      //     userId: id,
      //     roleId: 1
      //   }
      // })
      // console.log("ahoho");
      // console.log(role);
      // console.log("ahoho");

      // if(role){
      //   console.log("ahihi");
      //   res.send("sfd");
      // }

      let book_roles = await db.books_user.findAll({
        where: {
          userId: id
        },
        include: [{ all: true }]
      });

      book_roles = await Promise.all(
        book_roles.map(async role => {
          let book = await db.book.findOne({
            where: {
              id: role.bookId
            }
          });
          return {
            book_role: role.book_role,
            book: {
              id: book.id,
              name: book.name
            }
          };
        })
      );

      let { name, email, phone } = user;
      let organization = user.organization && user.organization.name;
      let academic_title = {
        name: user.academic_title && user.academic_title.name,
        fullname: user.academic_title && user.academic_title.fullname
      };

      res.json(
        response.success({
          name,
          email,
          phone,
          academic_title,
          organization,
          book_roles
        })
      );
    }
  } catch (e) {
    res.json(response.fail(e.message));
  }
};

const genToken = data => {
  const time = 48 * 60 * 60 * 10; //48hours
  return jwt.sign(data, sercetkey.SECRET_ACCESS_KEY, {
    expiresIn: time
  });
};

module.exports = {
  login,
  register,
  get,
  getInfo,
  getRefresh
};
