using ECount.CoreBase;
using ECountSDK;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECOUNT.Models
{
    public class CustomerManager
    {
        public ICustomerSDK tempcust = CustomerFactory.CustFactory(Option.StoreType);
        public IPurchaseSDK temppur = PurchaseFactory.PurFactory(Option.StoreType);
        public ISaleSDK tempsal = SaleFactory.SalFactory(Option.StoreType);
        CustomerSDK_DB2 common = new CustomerSDK_DB2();

        public void Create(Customer customer)
        {
            var code = customer.Code;
            var name = customer.Name;

            tempcust.Create(customer);
        }
        public int Update(Customer customer)
        {
            var checkpur = temppur.GetHistory().FindAll(x => x.Customer.Code == customer.Code);
            var checksal = tempsal.GetHistory().FindAll(x => x.Customer.Code == customer.Code);

            if (checkpur.Count > 0 || checksal.Count > 0) {
                return 0; // 해당고객이 구매나 판매 기록이 있는 경우 다음 고객정보 확인
            }
            else {
                var code = customer.Code;
                var name = customer.Name;
                string sql = SQL.Customer.Update(code, name);
                common.Update<Customer>(sql);
                return 1; // 고객정보가 성공적으로 업데이트된 경우 결과값을 증가시킴
            }
        }

        public int Delete (List<Customer> customers)
        {
            int result = 0;
            foreach(var cust in customers) {
                var checkpur = temppur.GetHistory().FindAll(x => x.Customer.Code == cust.Code);
                var checksal = tempsal.GetHistory().FindAll(x => x.Customer.Code == cust.Code);
                if (checkpur.Count > 0 || checksal.Count > 0) {
                    continue;
                }
                else {
                    var code = cust.Code;
                    var name = cust.Name;
                    string sql = SQL.Customer.Delete(code, name);
                    common.Delete<Customer>(sql);
                    result++;
                }
            }
            return result;
        }
        public List<Customer> GetList()
        {
            string sql = SQL.Customer.GetList();
            return common.GetList<Customer>(sql);
        }
        public List<Customer> Get(string code)
        {
            string sql = SQL.Customer.Get(code);
            return common.Get<Customer>(sql);
        }
    }
}