using ECount.CoreBase;
using ECountSDK;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECOUNT.Models
{
    public class PurchaseManager
    {
        public IPurchaseSDK temppur = PurchaseFactory.PurFactory(Option.StoreType);

        public void Create(Purchase purchase)
        {
            temppur.Create(purchase);

        }

        public void Update (Purchase purchase)
        {
            temppur.Update(purchase);
        }
        public void Delete(List<Purchase> purchase)
        {
            temppur.Delete(purchase);
        }
        //구매조회
        public List<Purchase> GetHistory()
        {
            return temppur.GetHistory();
        }
        public List<Purchase> GetHistory(string code)
        {
            return temppur.GetHistory(code);
        }
        public List<Purchase> GetHistoryByCustCode(string code)
        {
            return temppur.GetHistoryByCustCode(code);
        }
    }
}