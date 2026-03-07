import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

class Users extends Model {
  declare userId: number;
  declare name: string;
  declare password: string;
  declare email: string;
  static associate(models: any) {
    Users.hasMany(models.Expenses, {
      foreignKey: "payerId",
      sourceKey: "userId",
      as: "expenses",
    });
    Users.hasOne(models.Trip, {
      foreignKey: "leaderId",
      sourceKey: "userId",
      as: "trip",
    });
    Users.hasMany(models.ExpenseShare, {
      foreignKey: "userId",
      as: "expensesShare",
    });
    Users.hasMany(models.Notifications, {
      foreignKey: "userId",
      as: "notifications",
    });
    Users.hasMany(models.PersonalBudget, {
      foreignKey: "userId",
      as: "personalBudget",
    });
    Users.hasMany(models.Settlements, {
      foreignKey: "payerId",
      sourceKey: "userId",
      as: "settlementPayer",
    });
    Users.hasMany(models.Settlements, {
      foreignKey: "payeeId",
      sourceKey: "userId",
      as: "settlementPayee",
    });
    Users.belongsToMany(models.Trip, {
      through: models.TripMembers, // Use your junction model
      foreignKey: "userId", // The key in TripMembers pointing to User
      otherKey: "tripId", // The key in TripMembers pointing to Trip
      as: "memberOfTrips",
    });
  }
}

Users.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      field: "first_name",
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      field: "last_name",
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      field: "display_name",
      allowNull: true,
    },
    authId: {
      type: DataTypes.STRING,
      field: "auth_id",
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false,
    underscored: true,
  },
);

export default Users;
