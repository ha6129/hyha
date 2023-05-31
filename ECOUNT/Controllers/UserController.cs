using ECOUNT.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ECOUNT.Controllers
{
    public class UserController : Controller
    {
        public ActionResult Join()
        {
            // 회원가입 페이지를 표시하는 뷰를 반환합니다.
            return View();
        }

        [HttpPost]
        public ActionResult Join(UserManager user)
        {
            // 회원가입 데이터를 처리하는 로직을 작성합니다.
            // user 객체를 데이터베이스에 저장하고, 필요한 경우 추가적인 로직을 수행합니다.

            // 회원가입이 완료되면 로그인 페이지로 리디렉션합니다.
            return RedirectToAction("Login");
        }

        public ActionResult Login()
        {
            // 로그인 페이지를 표시하는 뷰를 반환합니다.
            return View();
        }

        [HttpPost]
        public ActionResult Login(UserManager user)
        {
            // 로그인 데이터를 처리하는 로직을 작성합니다.
            // user 객체를 사용하여 데이터베이스에서 사용자를 조회하고, 인증을 처리합니다.

            // 로그인이 성공하면 메인 페이지로 리디렉션합니다.
            return RedirectToAction("Index", "Home");
        }
    }

}