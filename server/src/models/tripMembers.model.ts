import { Model, DataTypes, DecimalDataType } from "sequelize"
import sequelize from "../config/db";

class TripMembers extends Model {
    declare tripId: number;
    declare userId: number;
    declare status: string;
    static associate(models: any) {
        TripMembers.belongsTo(models.Users, { foreignKey: "userId", as: "users" });
        TripMembers.belongsTo(models.Trip, { foreignKey: "tripId", as: "trip" });
    }
}

TripMembers.init({
    tripId: {
        type: DataTypes.INTEGER,
        field: "trip_id",
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
        allowNull: false,
        primaryKey: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "trip_members",
    timestamps: false,
    underscored: true
})

export default TripMembers;
