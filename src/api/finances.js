import api from "./api";

export function getFinances() {
  return api
    .get(`/finances`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function getFinanceCategories() {
  return api
    .get(`/financeCategories`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function createFinance(invoiceData) {
  return api
    .post("/finances", invoiceData)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function updateFinance(financeData) {
  let processedFinance = {
    id: financeData.id,
    name: financeData.name,
    amountOfMoney: financeData.amountOfMoney,
    description: financeData.description,
    customerId: financeData.customer.id,
    financeCategoryId: financeData.financeCategory.id,
    dueDate: financeData.dueDate,
    creationDate: financeData.creationDate,
    isPaid: financeData.isPaid,
  };
  return api
    .put(`/finances/${processedFinance.id}`, processedFinance)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function deleteFinance(id) {
  return api
    .delete(`/finances/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
