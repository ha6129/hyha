using ECount.CoreBase;
using ECountSDK;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ECOUNT.Models
{
    public class ProductManager
    {
        public static SaleSDK_DB tempsal_db = new SaleSDK_DB();
        public IProductSDK tempprod = ProductFactory.ProdFactory(Option.StoreType);
        public IPurchaseSDK temppur = PurchaseFactory.PurFactory(Option.StoreType);
        public ISaleSDK tempsal = SaleFactory.SalFactory(Option.StoreType);
        ProductSDK_DB2 common = new ProductSDK_DB2();

        public void Create(Product product)
        {
            //var code = product.Code;
            //var name = product.Name;
            //var type = product.Type;

            tempprod.Create(product);
        }

        public int Update(Product product)
        {
            var checkpur = temppur.GetHistory().FindAll(x => x.Product.Code == product.Code);
            var checksal = tempsal.GetHistory().FindAll(x => x.Product.Code == product.Code);
            if (checkpur.Count > 0 || checksal.Count > 0) {
                return 0;
            }
            else {
                var code = product.Code;
                var name = product.Name;
                var type = product.Type;
                string sql = SQL.Product.Update(code, name, type);
                //common.Update<Product>(sql);
                tempprod.Update(product);
                return 1;
            }
        }

        public int Delete(List<Product> products)
        {
            int result = 0;
            foreach(var prod in products) {
                var checkpur = temppur.GetHistory().FindAll(x => x.Product.Code == prod.Code);
                var checksal = tempsal.GetHistory().FindAll(x => x.Product.Code == prod.Code);
                if (checkpur.Count > 0 || checksal.Count > 0) {
                    continue;
                }
                else {
                    var code = prod.Code;
                    var name = prod.Name;
                    var type = prod.Type;
                    string sql = SQL.Product.Delete(code, name, type);
                    //common.Delete<Product>(sql);
                    tempprod.Delete(products);
                    result++;
                }
            }
            return result;
        }

        public List<Product> GetList()
        {
            return tempprod.GetList();
        }
        public List<Product> Get(string code)
        {
            return tempprod.Get(code);
        }
        public List<Product> GetByType(InfoType type)
        {
            return tempprod.GetByType(type);
        }

    }
}