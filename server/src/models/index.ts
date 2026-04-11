import sequelize from "../config/db"; // Your sequelize instance

// 1. Import your Model Classes
import Users from "./users.model";
import Trip from "./trip.model";
import TripMembers from "./tripMembers.model";
import Expenses from "./expenses.model";
import ExpenseShare from "./expenseShare.model";
import PersonalBudget from "./personalBudget.model";
import Settlements from "./settlements.model";
import Notifications from "./notifications.model";

// 2. Put them in an object for easy access
const models: any = {
  Trip,
  Users,
  TripMembers,
  Expenses,
  ExpenseShare,
  Notifications,
  PersonalBudget,
  Settlements,
};

// 3. Run the "associate" check
// This is the magic part that prevents the EagerLoadingError
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    console.log(`Linking associations for: ${modelName}`);
    models[modelName].associate(models);
  }
});

export {
  sequelize,
  Users,
  Trip,
  TripMembers,
  Expenses,
  ExpenseShare,
  Notifications,
  PersonalBudget,
  Settlements,
};
export default models;
