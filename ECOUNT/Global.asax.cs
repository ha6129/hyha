using ECount.CoreBase;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace ECOUNT
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            AppSettingsReader myAppSet = new AppSettingsReader();
            Option.StoreType = (string)myAppSet.GetValue("StoreType", typeof(string));
            Option.LogType = (string)myAppSet.GetValue("LogType", typeof(string));
        }
    }
}
