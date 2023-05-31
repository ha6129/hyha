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
    public class ProductController : Controller
    {
        public ProductManager manager = new ProductManager();
        public ActionResult ProductList()
        {
            return View();
        }

        public ActionResult ProductRegist()
        {
            if (Request.QueryString["Prodcode"] != null) {
                ViewBag.prodcode = Request.QueryString["Prodcode"].ToString();
                ViewBag.button = "BtnEditSave()";
                ViewBag.Title = "품목수정";
                ViewBag.Message = "품목코드는 수정 불가합니다.";
                ViewBag.tag = "readonly";
            }
            if (Request.QueryString["Prodname"] != null) {
                ViewBag.prodname = Request.QueryString["Prodname"].ToString();

            }
            if (Request.QueryString["Prodtype"] != null) {
                ViewBag.prodtype = Request.QueryString["Prodtype"].ToString();

            }
            else {
                ViewBag.Title = "품목등록";
                ViewBag.button = "BtnSaveProd()";
                ViewBag.tag = "";
                ViewBag.prodtype = "";
            }
            return View();
        }

        public ActionResult Save(Product product)
        {
            var duplecheck = manager.GetList().Find(x => x.Code == product.Code);

            if (product.vIsNull() || product.Code.vIsNull() || product.Name.vIsNull()) {
                return Json(new HttpStatusCodeResult(HttpStatusCode.NotFound)); //404
            }
            else if (!duplecheck.vIsNull()) {
                return Json(new HttpStatusCodeResult(HttpStatusCode.NotAcceptable)); // 406
            }
            else {
                manager.Create(product);

                return Json(new HttpStatusCodeResult(HttpStatusCode.OK));
            }
        }
        public ActionResult Update(Product product)
        {
            //수정할 항목이 비었다면
            if (product.Name.vIsNull()) {
                return Json(new HttpStatusCodeResult(HttpStatusCode.NotFound)); //404
            }
            else {
                if (manager.Update(product) == 0) {
                    return Json(new HttpStatusCodeResult(HttpStatusCode.NotAcceptable)); //406
                }

                return Json(new HttpStatusCodeResult(HttpStatusCode.OK));
            }
        }
        public ActionResult Delete(List<Product> products)
        {
            if (manager.Delete(products) == 0) {
                return Json(new HttpStatusCodeResult(HttpStatusCode.NotAcceptable)); //406
            }

            return Json(new HttpStatusCodeResult(HttpStatusCode.OK));
        }


        public ActionResult GetListALL()
        {
            return Json(manager.GetList());
        }

        public ActionResult GetList(string codeSearch, string typeSearch)
        {
            List<Product> productList = new List<Product>();
            Enum.TryParse<InfoType>(typeSearch, out var type);


            // 검색 조건이 없는 경우 모든 제품을 조회합니다.
            if (codeSearch.vIsEmpty() && typeSearch == "All") {
                productList = manager.GetList();
            }
            //품목&타입 모두 검색조건에 걸리는 경우
            else if (!(codeSearch.vIsEmpty())) {
                productList = manager.Get(codeSearch);

                if (typeSearch != "All") {
                    productList = productList.Where(p => p.Type == type).ToList();
                }
            }
            // 제품 코드만 검색 조건으로 지정된 경우
            else if (!(codeSearch.vIsEmpty()) && typeSearch == "All") {
                productList = manager.Get(codeSearch);

            }
            // 제품 타입만 검색 조건으로 지정된 경우
            else if (typeSearch != "All") {
                productList = manager.GetByType(type);
            }
            return Json(productList);

        }
    }
}