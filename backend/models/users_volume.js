module.exports = function (sequelize, Sequelize) {
  const UserVolume = sequelize.define("users_volume", {
    volumeId: {
      field: 'volume_id',
      type: Sequelize.BIGINT,
    },
    userId: {
      field: 'user_id',
      type: Sequelize.BIGINT,
    }
  },
    { timestamps: false }
  );
  UserVolume.associate = function (models) {
    UserVolume.belongsTo(models.user,{foreignKey: "user_id"});
    UserVolume.belongsTo(models.volume,{foreignKey: "volume_id"});
  }
  return UserVolume;
}