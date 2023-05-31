using ECount.CoreBase;
using ECOUNT.Models;
using ECountSDK;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace ECOUNT.Controllers
{
    public class PurchaseController : Controller
    {
        public PurchaseManager manager = new PurchaseManager();
        public ActionResult PurchaseRegist()
        {
            if (Request.QueryString["index"] != null) {
                ViewBag.index = Request.QueryString["index"].ToString();
                ViewBag.button = "BtnEditSave()";
                ViewBag.Title = "구매수정";
            }
            if (Request.QueryString["Customer"] != null) {
                ViewBag.cust = Request.QueryString["Customer"].ToString();
            }
            if (Request.QueryString["Product"] != null) {
                ViewBag.prod = Request.QueryString["Product"].ToString();
            }
            if (Request.QueryString["date"] != null) {
                ViewBag.date = Request.QueryString["date"].ToString();
            }
            if (Request.QueryString["quantity"] != null) {
                ViewBag.quantity = Request.QueryString["quantity"].ToString();
            }
            else {
                ViewBag.Title = "구매입력";
                ViewBag.button = "BtnInput()";
            }
            return View();
        }

        public ActionResult PurchaseList()
        {
            //ViewBag.Message = "구매내역입니다.";
            return View();
        }

        public ActionResult Save(Purchase purchase)
        {
            if (purchase.vIsNull() || purchase.Product.Code.vIsNull() || purchase.Quantity.vIsNull() || purchase.DataTime.vIsNull() || purchase.Customer.Code.vIsNull()) {
                return Json(new HttpStatusCodeResult(HttpStatusCode.NotFound)); //404
            }
            else {
                manager.Create(purchase);

                return Json(new HttpStatusCodeResult(HttpStatusCode.OK));
            }
        }
        public ActionResult Update(Purchase purchase)
        {
            if (purchase.Product.Code.vIsNull() || purchase.Quantity.vIsNull() || purchase.DataTime.vIsNull() || purchase.Customer.Code.vIsNull()) {
                return Json(new HttpStatusCodeResult(HttpStatusCode.NotFound)); //404
            }

            manager.Update(purchase);

            return Json(new HttpStatusCodeResult(HttpStatusCode.OK));
        }

        public ActionResult Delete(List<Purchase> purchase)
        {
            manager.Delete(purchase);
            return Json(new HttpStatusCodeResult(HttpStatusCode.OK));
        }

        public ActionResult GetHistory(string prodCode, string custCode)
        {
            List<Purchase> historyList = new List<Purchase>();

            if (!(prodCode.vIsEmpty()) && !(custCode.vIsEmpty())) // 둘다 값이 있는 경우
            {
                historyList = manager.GetHistory().Where(h => h.Product.Code == prodCode && h.Customer.Code == custCode).ToList();
            }
            else if (!(prodCode.vIsEmpty())) {
                historyList = manager.GetHistory(prodCode);
            }
            else if (!(custCode.vIsEmpty())) {
                historyList = manager.GetHistoryByCustCode(custCode);
            }
            else {
                historyList = manager.GetHistory(); // 빈값일 때 전체조회
            }
            return Json(historyList);
        }
    }
}