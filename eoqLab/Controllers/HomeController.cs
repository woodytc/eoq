using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using System.Web.Security;
using Eoq.Domain;
using Eoq.Domain.Domain;
using Eoq.Mappings.FluentNh.Repository;
using eoqLab.Models;

namespace eoqLab.Controllers
{
    public class HomeController : Controller
    {
        private string _userName = "";
        public IEOQRepository EoqRepository { get; set; }
        public IMaterialRepository MaterialRepository { get; set; }
        public IUnitRepository UnitRepository { get; set; }
        public IDepartmentRepository DepartmentRepository { get; set; }
        public IEmployeeRepository EmployeeRepository { get; set; }
        public IEmployeePhoneRepository EmployeePhoneRepository { get; set; }
        public IEmployeeMailRepository EmployeeMailRepository { get; set; }
        public ICashierRepository CashierRepository { get; set; }
        public ICashierHeaderRepository CashierHeaderRepository { get; set; }

        //common
        public IColorRepository ColorRepository { get; set; }
        public IBrandRepository BrandRepository { get; set; }
        public ISizesRepository SizesRepository { get; set; }
        public ICatelogyRepository CatelogyRepository { get; set; }
        public IStockRepository StockRepository { get; set; }
        public IUserInBranchsRepository UserBranch { get; set; }

        public HomeController(IEOQRepository eoqRepository
                              , IMaterialRepository materialRepository
                              , IUnitRepository unit
                              , IDepartmentRepository departmentRepository
                              , IEmployeeRepository employeeRepository
                              , IEmployeePhoneRepository employeePhoneRepository
                              , IEmployeeMailRepository employeeEmailRepository
                              , IColorRepository colorRepository
                              , IBrandRepository brandRepository
                              , ISizesRepository sizesRepository
                              , ICatelogyRepository catelogyRepository
                              , IStockRepository stockRepository
                              , ICashierRepository cashierRepository
                              , ICashierHeaderRepository cashierHeaderRepository
                              , IUserInBranchsRepository userBranch
            )
        {
            EoqRepository = eoqRepository;
            MaterialRepository = materialRepository;
            UnitRepository = unit;
            DepartmentRepository = departmentRepository;
            EmployeeRepository = employeeRepository;
            EmployeePhoneRepository = employeePhoneRepository;
            EmployeeMailRepository = employeeEmailRepository;

            this.CashierRepository = cashierRepository;
            this.CashierHeaderRepository = cashierHeaderRepository;

            //common
            this.ColorRepository = colorRepository;
            this.BrandRepository = brandRepository;
            this.SizesRepository = sizesRepository;
            this.CatelogyRepository = catelogyRepository;
            this.StockRepository = stockRepository;
            this.UserBranch = userBranch;

        }

        public ActionResult Index()
        {
            _userName = User.Identity.Name;
            //check login
            if (string.IsNullOrEmpty(_userName))
            {
                return RedirectToAction("Logon", "Account");
            }

            

            var userBranchs = this.UserBranch.GetAll();
            var firstOrDefault = (from user in userBranchs
                                  where user.Username == this._userName
                                  select user).FirstOrDefault<UserInBranchs>();
 
            var httpSessionStateBase = this.HttpContext.Session;
            if (httpSessionStateBase != null)
            {
                httpSessionStateBase["UserName"] = User.Identity.Name;
                if(firstOrDefault != null) httpSessionStateBase["BranchId"] = firstOrDefault.BranchID ;
            }
            //RolePrincipal rolePrincipal = (RolePrincipal)User;
            //            roleArray[0]= "admin";
            //
            //            string role = "";

            ViewBag.AuthPrinciple = false;
            ViewBag.AuthScheme = false;
            ViewBag.AuthGeneration = false;
            ViewBag.AuthDeploy = false;
            ViewBag.AuthQuickDeploy = false;
            ViewBag.InAdminRole = false;
            ViewBag.CurrentDateServerSt = DateTime.Now.ToString("dd/MM/yyyy");
            ViewBag.CurrentTimeServerSt = DateTime.Now.ToString("HH:mm");
            ViewBag.CurrentUser = _userName;
            ViewBag.CurrentUserRole = "member";
            return View();
        }
        #region Purchase Order

        //get product list
        [HttpGet]
        public JsonResult ProductsList()
        {
            var stockList = this.StockRepository.GetAll();
            var unitList = this.UnitRepository.GetAll();
            var productList = this.MaterialRepository.GetAll();
            if (stockList == null)
            {
                return Json(new { data = stockList, total = 0 }, JsonRequestBehavior.AllowGet);
            }
            var products = from stock in stockList
                    join product in productList.DefaultIfEmpty() on stock.MeterialId equals product.MatId
                    join unit in unitList on stock.UnitId equals unit.ID
                    where stock.Amount <= stock.Reorderpoint && stock.BranchId == this.GetBranchId() 
                    select new
                            {
                                ProductID   = product.MatId,
                                ProductName = product.MetName,
                                Unit        = unit.UnitName,
                                stock.Amount
                            };

            return Json(new { data = products, total = products.Count() }, JsonRequestBehavior.AllowGet);

        }
        [HttpGet]
        public JsonResult GetProducts(CategoryParam category)
        {
            try
            {
                if (category != null)
                {
                    var productList = this.MaterialRepository.GetAll();

                    var products = from product in productList
                                   where product.CatelogyId == category.CategoryId
                                   select new
                                              {
                                                  ProductID = product.MatId
                                                  ,
                                                  ProductName = product.MetName

                                              };

                    return Json(new {data = products, total = productList.Count(), error = ""},
                                JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { data = "", total = 0 ,error = ex.Message }, JsonRequestBehavior.AllowGet);
            }
            return null;
        }

        [HttpGet]
        public JsonResult GetProductPrice(ProductParams productParams)
        {
            try
            {
                if (productParams != null)
                {
                    var productList = this.MaterialRepository.GetAll();
                    var stockList = this.StockRepository.GetAll();
                    if (stockList == null)
                    {
                        return Json(new { data = stockList, total = 0 }, JsonRequestBehavior.AllowGet);
                    }
                    var price = from stock in stockList
                                   join product in productList.DefaultIfEmpty() on stock.MeterialId equals product.MatId
                                   where stock.BranchId == this.GetBranchId()
                                   && stock.MeterialId == productParams.ProductId
                                   && stock.UnitId == productParams.UnitId
                                   select new
                                   {
                                       stock.Price
                                   };

                    return Json(new { data = price, total = price.Count(), error = "" },
                                JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { data = "", total = 0, error = ex.Message }, JsonRequestBehavior.AllowGet);
            }
            return null;
        }

        //get categories list
        [HttpGet]
        public JsonResult CategoriesList()
        {
            var allCategories = this.CatelogyRepository.GetAll();
            var categoriesResult = from category in allCategories
                                   select new
                                              {
                                                  CategoryID = category.Id,
                                                  CategoryName = category.Name
                                              };

            return Json(new { data = categoriesResult, total = categoriesResult.Count() }, JsonRequestBehavior.AllowGet);
        }


        //get categories list
        [HttpGet]
        public JsonResult UnitsList()
        {
            var allUnits = this.UnitRepository.GetAll();
            var unitsResult = from unit in allUnits
                                   select new
                                   {
                                       UnitID = unit.ID,
                                       unit.UnitName
                                   };

            return Json(new { data = unitsResult, total = unitsResult.Count() }, JsonRequestBehavior.AllowGet);
        }

        //get size list
        [HttpGet]
        public JsonResult SizeList()
        {
            var allSize = this.SizesRepository.GetAll();
            var sizeResult = from size in allSize
                              select new
                              {
                                  SizeID    = size.Id,
                                  SizeName  = size.Name
                              };

            return Json(new { data = sizeResult, total = sizeResult.Count() }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult ColorsList()
        {
            var colorList = this.ColorRepository.GetAll();
            var colors = from color in colorList
                              select new
                              {
                                  ColorID   = color.Id,
                                  ColorName = color.Name
                              };

            return Json(new { data = colors, total = colors.Count() }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult BrandList()
        {
            var brandList = this.BrandRepository.GetAll();
            var brands = from brand in brandList
                         select new
                         {
                             BrandID = brand.Id,
                             BrandName = brand.Name
                         };

            return Json(new { data = brands, total = brands.Count() }, JsonRequestBehavior.AllowGet);
        }

        public List<Eoq.Domain.Material> CreateProductDummy()
        {
            var productList = new List<Eoq.Domain.Material>();

            for (var j = 1; j < 6; j++)
            {
                productList.Add(new Eoq.Domain.Material
                {
                    MatId = j,
                    MetName = "ทดสอบ" + j,
                    CatelogyId = j
                });
            }

            return productList;
        }

        //update
        /// <summary>
        ///  reate a single action method with all the possible arguments that you expect and it will map the values (where possible) for you
        /// </summary>
        /// <param name="purchaseOrders"></param>
        /// <param name="purchaseOrder"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult UpdatePurchaseOrder(List<PurchaseOrderModel> purchaseOrders, PurchaseOrderModel purchaseOrder)
        {
            try
            {
                var cashier = new Eoq.Domain.CashierHeader
                {
                    Id = purchaseOrder.Id,
                    BranchId = this.GetBranchId(),
                    Updatedate = DateTime.Now ,
                    Updateby = this.GetUserName()
                };

                if (purchaseOrders == null)
                {
                    CashierHeaderRepository.Update(cashier);

                    var oldCashierMaterial = new Cashier {Id = purchaseOrder.Id};
                    CashierRepository.Delete(oldCashierMaterial);

                    var cashierMaterial = new Eoq.Domain.Cashier()
                    {
                        Id = cashier.Id,
                        Material_ID = purchaseOrder.ProductID,
                        Amount = purchaseOrder.Amount.ToString(),
                        TotalPrice = purchaseOrder.Amount * purchaseOrder.Price
                        //Tax           = purchaseOrder.Tax,
                        //IncudeTax     = purchaseOrder.IncludeTax
                    };

                    CashierRepository.Save(cashierMaterial);

                }
                else
                {

                    CashierHeaderRepository.Update(cashier);

                    //delete existing data
                    var oldCashierMaterial = new Cashier { Material_ID = cashier.Id };
                    CashierRepository.Delete(oldCashierMaterial);

                    foreach (var purchaseOrderData in purchaseOrders)
                    {
                        //create new one
                        var cashierMaterial = new Eoq.Domain.Cashier()
                                                  {
                                                      Id = cashier.Id,
                                                      Material_ID = purchaseOrderData.ProductID,
                                                      Amount = purchaseOrderData.Amount.ToString(),
                                                      TotalPrice = purchaseOrderData.Amount * purchaseOrderData.Price,
                                                      //Tax           = purchaseOrderData.Tax,
                                                      //IncudeTax     = purchaseOrderData.IncludeTax
                                                  };

                        CashierRepository.Save(cashierMaterial);
                    }

                    return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
            } 
        }

        //save
        /// <summary>
        ///  reate a single action method with all the possible arguments that you expect and it will map the values (where possible) for you
        /// </summary>
        /// <param name="purchaseOrders"></param>
        /// <param name="purchaseOrder"></param>
        /// <returns></returns>
        [HttpPost]
        public JsonResult SavePurchaseOrder(List<PurchaseOrderModel> purchaseOrders, PurchaseOrderModel purchaseOrder)
        {

            try
            {
                var cashier = new CashierHeader
                                  {
                                        BranchId        = this.GetBranchId() , 
                                        Createdate      = DateTime.Now , 
                                        Createby        = this.GetUserName(),
                                        Updateby        = ""
                                  };

                if (purchaseOrder != null && purchaseOrders == null)
                {
                    CashierHeaderRepository.Save(cashier);
                    
                    var cashierMaterial = new Eoq.Domain.Cashier() { 
                                                                        Id = cashier.Id , 
                                                                        Material_ID = purchaseOrder.ProductID, 
                                                                        Amount        = purchaseOrder.Amount.ToString(),
                                                                        TotalPrice    = purchaseOrder.Amount * purchaseOrder.Price,
                                                                        Tax           = 0,//purchaseOrder.Tax,
                                                                        IncudeTax     = false//purchaseOrder.IncludeTax
                                                                    };
                    CashierRepository.Save(cashierMaterial);
                    
                    var httpSessionStateBase = this.HttpContext.Session;
                    if (httpSessionStateBase != null) httpSessionStateBase["CashierId"] = cashier.Id;

                    //save completed
                    return Json(new { success = true, cashierID = cashier.Id, error = "" }, JsonRequestBehavior.AllowGet);
                    
                }
                else if (purchaseOrders != null)
                {
                 
                    CashierHeaderRepository.Save(cashier);


                    foreach (var purchaseOrderData in purchaseOrders)
                    {

                        var cashierMaterial = new Eoq.Domain.Cashier()
                        {
                            Id = cashier.Id,
                            Material_ID = purchaseOrderData.ProductID,
                            Amount = purchaseOrderData.Amount.ToString(),
                            TotalPrice = purchaseOrderData.Amount * purchaseOrderData.Price,
                            Tax           = 0,//purchaseOrderData.Tax,
                            IncudeTax     = false//purchaseOrderData.IncludeTax
                        };

                        CashierRepository.Save(cashierMaterial);
                    }

                    
                    var httpSessionStateBase = this.HttpContext.Session;
                    if (httpSessionStateBase != null) httpSessionStateBase["CashierId"] = cashier.Id;
                    //save completed
                    return Json(new { success = true, cashierID = cashier.Id , error = "" }, JsonRequestBehavior.AllowGet);
                
                }
                else
                {
                    throw new Exception();
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
            } 
        }


        public void checkStock()
        {
            

        }

        #endregion

        #region Stock
        public JsonResult StockList()
        {
            var stockList       = this.StockRepository.GetAll();
            var unitList        = this.UnitRepository.GetAll();
            var sizeList        = this.SizesRepository.GetAll(); 
            var productList     = this.MaterialRepository.GetAll();
            var categoryList    = this.CatelogyRepository.GetAll();
            var colorList       = this.ColorRepository.GetAll();
            var brandList       = this.BrandRepository.GetAll();
            if (stockList == null)
            {
                return Json(new { data = stockList, total = 0 }, JsonRequestBehavior.AllowGet);
            }
            var stocks = from stock in stockList
                           join product in productList.DefaultIfEmpty() on stock.MeterialId equals product.MatId
                           join unit in unitList on stock.UnitId equals unit.ID
                           join category in categoryList on product.CatelogyId equals category.Id
                           join color in colorList on stock.ColorId equals color.Id
                           join brand in brandList on stock.BrandId equals brand.Id
                           join size in sizeList on stock.SizeId equals size.Id
                           where  stock.BranchId == this.GetBranchId() //&& stock.Amount <= stock.Reorderpoint 
                           select new
                           {
                               ID               = stock.Id,
                               ProductID        = product.MatId,
                               ProductName      = product.MetName,
                               CategoryID       = product.CatelogyId,
                               CategoryName     = category.Name,
                               ColorID          = color.Id,
                               ColorName        = color.Name,
                               UnitID           = unit.ID,
                               unit.UnitName,
                               BrandID          = brand.Id,
                               BrandName        = brand.Name,
                               SizeID           = stock.SizeId,
                               SizeName         = size.Name,
                               stock.Amount,
                               stock.Price,
                               ReorderPoint     = stock.Reorderpoint
                           };

            return Json(new { data = stocks, total = stocks.Count() }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SaveStock(StockParams stockParams)
        {
            try
            {
                //check


                var p = stockParams;
                var stock = new Stock()
                {
                    Price = p.Price,
                    Amount = p.Amount,
                    MeterialId = p.ProductID,
                    ColorId = p.ColorID,
                    BrandId = p.BrandID,
                    UnitId = p.UnitID,
                    BranchId = this.GetBranchId(),
                    SizeId = p.SizeID,
                    Reorderpoint = p.ReorderPoint,
                    Createdate = DateTime.Now , 
                    Updatedate = DateTime.Now ,
                    Createby = this.GetUserName()
                };

                StockRepository.Save(stock);
                return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
                
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult UpdateStock(StockParams stockParams)
        {
            try {
                var p = stockParams;
                var stock = new Stock()
                                {
                                 Price = p.Price,
                                 Amount = p.Amount,
                                 MeterialId = p.ProductID,
                                 BrandId = p.BrandID,
                                 UnitId = p.UnitID,
                                 ColorId = p.ColorID,
                                 BranchId = this.GetBranchId(),
                                 Updatedate = DateTime.Now,
                                 Updateby = this.GetUserName()
                                };

                if (!String.IsNullOrEmpty(p.ID.ToString()) && p.ID > 0)
                {
                    stock.Id = p.ID;
                    StockRepository.Update(stock);
                    return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { success = false, error = "Nothing updated." }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message}, JsonRequestBehavior.AllowGet);
            }
             
        }

        [HttpPost]
        public JsonResult DeleteStock(List<int> ids)
        {
            try
            {
                foreach (var stock in ids.Select(id => new Stock {Id = id}))
                {
                    StockRepository.Delete(stock);
                }
                return Json(new { success = true, message = "Delete Successful" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "This material can not be delete because there are others from using." }, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region SaleItems

        [HttpGet]
        public JsonResult SaleItemList()
        {
            try{
                var cashierList = this.CashierHeaderRepository.GetAll();
                if(cashierList == null)
                {
                    return Json(new { data = cashierList, total = 0 }, JsonRequestBehavior.AllowGet);
                }
                var saleItems = from saleitem in cashierList
                                where saleitem.BranchId == this.GetBranchId()
                                let dateTime = saleitem.Createdate
                                where dateTime != null
                                select new
                                {
                                    SaleID      = saleitem.Id,
                                    CreateDate  = dateTime.Value 
                                };

                return Json(new { data = saleItems, total = saleItems.Count() }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "An errors occured." }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult SearchSaleItemList(SaleItemParams saleParams)
        {
            try{
                var cashiers = this.CashierHeaderRepository.GetAll();
                if (cashiers == null)
                {
                    return Json(new { data = cashiers, total = 0 }, JsonRequestBehavior.AllowGet);
                }
                var saleItems = from saleitem in cashiers
                                where saleitem.BranchId == this.GetBranchId()
                                let dateTime = saleitem.Createdate
                                where dateTime != null && dateTime.Value.Year == saleParams.SaleDate.Year
                                && dateTime.Value.Month == saleParams.SaleDate.Month
                                && dateTime.Value.Day == saleParams.SaleDate.Day
                                select new
                                {
                                    SaleID = saleitem.Id,
                                    CreateDate = dateTime.Value
                                };

                return Json(new { data = saleItems, total = saleItems.Count() }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "An errors occured." }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult SaleItemDetail(int saleItemId)
        {
            try{
                var cashiers = this.CashierHeaderRepository.GetAll();
                var cashierMaterials = this.CashierRepository.GetAll();
                if (cashiers == null || cashierMaterials == null)
                {
                    string[] result  = null;
                    return Json(new { data = result, total = 0 }, JsonRequestBehavior.AllowGet);
                }
                var saleItemDetail = from saleitem in cashiers
                                join cashierMaterial in cashierMaterials.DefaultIfEmpty() on saleitem.Id equals cashierMaterial.Id
                                where saleitem.BranchId == this.GetBranchId() && saleitem.Id == saleItemId
                                let dateTime = saleitem.Createdate
                                where dateTime != null
                                group cashierMaterial by saleitem.Id into g
                                select new
                                {
                                    Amount = g.Sum(@m => int.Parse(@m.Amount)),
                                    TotalPrice = g.Sum(@m => @m.TotalPrice),
                                    Tax = g.Sum(@m => @m.Tax)
                                };
                
                return Json(new { data = saleItemDetail, total = saleItemDetail.Count() }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "An errors occured." }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public JsonResult SaleItemMaterialList(int saleItemId)
        {
            try
            {
                var cashierList = this.CashierHeaderRepository.GetAll();
                var cashierMaterialList = this.CashierRepository.GetAll();
                var materialList = this.MaterialRepository.GetAll();
                var stockList = this.StockRepository.GetAll();
                if (cashierList == null)
                {
                    return Json(new { data = cashierList, total = 0 }, JsonRequestBehavior.AllowGet);
                }
                var saleItems = from cashier in cashierList
                                join cashierMaterial in cashierMaterialList.DefaultIfEmpty() on cashier.Id equals cashierMaterial.Id
                                join material in materialList.DefaultIfEmpty() on cashierMaterial.Material_ID equals material.MatId
                                //join stock in stockList.DefaultIfEmpty() on cashierMaterial.Material_ID equals stock.MeterialId
                                where cashier.BranchId == this.GetBranchId() && cashierMaterial.Id == saleItemId
                                let dateTime = cashier.Createdate
                                where dateTime != null
                                select new
                                {
                                    MaterialName = material.MetName,
                                    cashierMaterial.Amount,
                                    cashierMaterial.TotalPrice,
                                    //cashierMaterial.IncudeTax,
                                    cashierMaterial.Tax
                                };

                return Json(new { data = saleItems, total = saleItems.Count() }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = "An errors occured." }, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region Get Session Value
        public int GetBranchId()
        {
            var httpSessionStateBase = this.HttpContext.Session;
            return httpSessionStateBase != null ? int.Parse(httpSessionStateBase["BranchId"].ToString()) : 0;
        }
        public string GetUserName()
        {
            var httpSessionStateBase = this.HttpContext.Session;
            return httpSessionStateBase != null ? httpSessionStateBase["UserName"].ToString() : "";
        }
        #endregion
    }//end class
}//end namespace
