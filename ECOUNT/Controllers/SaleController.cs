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
    public class SaleController : Controller
    {
        public SaleManager manager = new SaleManager();
        public ActionResult SaleRegist()
        {
            if (Request.QueryString["index"] != null) {
                ViewBag.index = Request.QueryString["index"].ToString();
                ViewBag.button = "BtnEditSave()";
                ViewBag.Title = "판매수정";
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
                ViewBag.Title = "판매입력";
                ViewBag.button = "BtnInput()";
            }
            return View();
        }

        public ActionResult SaleList()
        {
            return View();
        }
        public ActionResult Save(Sale sale)
        {
            if (sale.vIsNull() || sale.Product.Code.vIsNull() || sale.Quantity.vIsNull() || sale.DataTime.vIsNull() || sale.Customer.Code.vIsNull()) {
                //빈값인지 체크
                return Json(new HttpStatusCodeResult(HttpStatusCode.NotFound)); //404
            }
            else {
                if (manager.Create(sale) == 0) {
                    // 재고 내역체크
                    return Json(new HttpStatusCodeResult(HttpStatusCode.NotAcceptable));//406
                }
                return Json(new HttpStatusCodeResult(HttpStatusCode.OK));
            }
        }
        public ActionResult Update(Sale sale)
        {

            if (sale.Product.Code.vIsNull() || sale.Quantity.vIsNull() || sale.DataTime.vIsNull() || sale.Customer.Code.vIsNull()) {
                return Json(new HttpStatusCodeResult(HttpStatusCode.NotFound)); //404
            }
            else {
                if (manager.Update(sale) == 0) {
                    // 재고 내역체크
                    return Json(new HttpStatusCodeResult(HttpStatusCode.NotAcceptable));//406
                }
                return Json(new HttpStatusCodeResult(HttpStatusCode.OK));
            }
        }

        public ActionResult Delete(List<Sale> sale)
        {
            manager.Delete(sale);
            return Json(new HttpStatusCodeResult(HttpStatusCode.OK));
        }
        public ActionResult GetHistory(string prodCode, string custCode)
        {
            List<Sale> historyList = new List<Sale>();

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