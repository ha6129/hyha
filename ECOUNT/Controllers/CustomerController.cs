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
    public class CustomerController : Controller
    {
        public CustomerManager manager = new CustomerManager();
        public ActionResult CustomerList()
        {
            return View();
        }

        public ActionResult CustomerRegist()
        {
            if (Request.QueryString["Custcode"] != null) {
                ViewBag.custcode = Request.QueryString["Custcode"].ToString();
                ViewBag.button = "BtnEditSave()";
                ViewBag.Title = "거래처수정";
                ViewBag.tag = "readonly";
            }
            if (Request.QueryString["Custname"] != null) {
                ViewBag.custname = Request.QueryString["Custname"].ToString();

            }
            else {
                ViewBag.Title = "거래처등록";
                ViewBag.button = "BtnSaveCust()";
                ViewBag.tag = "";
            }
            return View();
        }

        public ActionResult Save(Customer customer)
        {
            var duplecheck = manager.GetList().Find(x => x.Code == customer.Code);

            if (customer.vIsNull() || customer.Code.vIsNull() || customer.Name.vIsNull()) {
                return Json(new HttpStatusCodeResult(HttpStatusCode.NotFound)); //404
            }
            else if (!(duplecheck.vIsNull())) {
                return Json(new HttpStatusCodeResult(HttpStatusCode.NotAcceptable)); // 406
            }
            else {
                manager.Create(customer);

                return Json(new HttpStatusCodeResult(HttpStatusCode.OK));
            }
        }
        public ActionResult Get(string code)
        {

            if (code.IsNullOrEmpty()) {
                return Json(manager.GetList()); //빈값이면 전체조회
            }
            else {
                return Json(manager.Get(code));
            }
        }
        public ActionResult Update(Customer customer)
        {
            //수정할 항목이 비었다면

            if (customer.Code.vIsNull() || customer.Name.vIsNull()) // 빈값일때
            {
                return Json(new HttpStatusCodeResult(HttpStatusCode.NotFound)); //404
            }
            //거래내역이 존재한다면
            else {
                if (manager.Update(customer) == 0) // 거래내역존재
                {
                    return Json(new HttpStatusCodeResult(HttpStatusCode.NotAcceptable)); //406
                }
                return Json(new HttpStatusCodeResult(HttpStatusCode.OK));
            }
        }
        public ActionResult Delete(List<Customer> customers)
        {
            if (manager.Delete(customers) == 0) {
                return Json(new HttpStatusCodeResult(HttpStatusCode.NotAcceptable)); //40
            }

            return Json(new HttpStatusCodeResult(HttpStatusCode.OK));
        }
    }
}