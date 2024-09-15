import { getSalesDashboardController } from '../modules/dashboard/controllers/getSalesDashboardController';
import { getProductsDashboardController } from "../modules/dashboard/controllers/getProductsDashboardController";
import { getFinancialDashboardController } from "../modules/dashboard/controllers/getFinancialDashboardController";
import { getStoresDashboardController } from "../modules/dashboard/controllers/getStoresDashboardController";
import { DashboardProps } from '../types/DashboardProps';

export const createDashboard = async (type: string, targetDate: string, days: number) => {
  const getSalesRoles = ['Administration', 'Financial', 'Sales'];
  const getProductsRoles = ['Administration', 'Sales', 'Deposit'];
  const getFinancialRoles = ['Administration', 'Financial'];
  const getStoresRoles = ['Administration'];

  const currentDate = new Date(targetDate);
  const currentDateTime = currentDate.getTime();
  const incrementerDay = 86400000;

  const dashboardProps: DashboardProps = {
    targetDate,
    days,
    currentDate,
    currentDateTime,
    incrementerDay
  }

  const result = {
    sales: {},
    products: {},
    financial: {},
    stores: {}
  };

  const getSales =
    getSalesRoles.includes(type)
      ?
      await getSalesDashboardController(dashboardProps)
      :
      '';

  const getProducts =
    getProductsRoles.includes(type)
      ?
      await getProductsDashboardController()
      :
      '';

  const getFinancial =
    getFinancialRoles.includes(type)
      ?
      await getFinancialDashboardController(dashboardProps)
      :
      '';

  const getStores =
    getStoresRoles.includes(type)
      ?
      await getStoresDashboardController(dashboardProps)
      :
      '';

  result.sales = getSales;
  result.products = getProducts;
  result.financial = getFinancial;
  result.stores = getStores;

  return result;
}
