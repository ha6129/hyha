using ECount.CoreBase;
using ECountSDK;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECOUNT.Models
{
    public class InventoryManager
    {
        public IInventorySDK tempinven = InventoryFactory.InvenFactory(Option.StoreType);

        public List<Inventory> GetListStatus(DateTime datetime)
        {
            return tempinven.GetListStatus(datetime);
        }
        public List<Inventory> GetListStatus() // 날짜 고려X
        {
            return tempinven.GetListStatus();
        }
        public List<Inventory> GetStatus(string code)
        {
            return tempinven.GetStatus(code);
        }
        public List<Inventory> GetStatusByName(string name)
        {
            return tempinven.GetStatusByName(name);
        }
        public List<Inventory> GetStatusByType(InfoType type)
        {
            return tempinven.GetStatusByType(type);
        }

    }
}