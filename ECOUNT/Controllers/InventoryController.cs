using ECount.CoreBase;
using ECOUNT.Models;
using ECountSDK;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ECOUNT.Controllers
{
    public class InventoryController : Controller
    {
        public InventoryManager manager = new InventoryManager();
        public ActionResult Inventory()
        {
            return View();
        }

        public ActionResult GetListStatus(DateTime datetime, string prodCode)
        {
            List<Inventory> list = manager.GetListStatus(datetime);

            if (!prodCode.vIsEmpty()) {
                list = list.Where(p => p.Product.Code.Contains(prodCode)).ToList();
            }

            return Json(list);
        }
    }
}