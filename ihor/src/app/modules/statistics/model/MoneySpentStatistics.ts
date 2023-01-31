import {DailyMoneySpent} from "./DailyMoneySpent";

export interface MoneySpentStatistics {
  amountPerDay: Array<DailyMoneySpent>,
  totalAmount: number,
  averageAmount: number
}
