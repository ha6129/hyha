using ECount.CoreBase;
using ECountSDK;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECOUNT.Models
{
    public class SaleManager
    {
        public ISaleSDK tempsal = SaleFactory.SalFactory(Option.StoreType);
        public IInventorySDK tempinven = InventoryFactory.InvenFactory(Option.StoreType);
        

        public int Create(Sale sale)
        {
            
            var check = tempinven.GetListStatus(sale.DataTime).Find(x => x.Product.Code == sale.Product.Code);
            if (check.vIsNull() || check.Quantity < sale.Quantity) {
                return 0;
            }
            else {
                //if(check.Quantity<안전재고

                tempsal.Create(sale);
                return 1;
            }
        }
        public int Update(Sale sale)
        {
            var  check = tempinven.GetListStatus(sale.DataTime).Find(x => x.Product.Code == sale.Product.Code);
            if (check.vIsNull()||check.Quantity < sale.Quantity) {
                return 0;
            }
            else {
                //if(check.Quantity<품목의 안전수량){알럿 제공 "재고가 부족합니다."} -> return 2로 ? 

                tempsal.Update(sale);
                return 1;
            }
        }
        public void Delete(List<Sale> sale)
        {
            tempsal.Delete(sale);
        }
        public List<Sale> GetHistory()
        {
            return tempsal.GetHistory();
        }
        public List<Sale> GetHistory(string code)
        {
            return tempsal.GetHistory(code);
        }
        public List<Sale> GetHistoryByCustCode(string code)
        {
            return tempsal.GetHistoryByCustCode(code);
        }
    }
}