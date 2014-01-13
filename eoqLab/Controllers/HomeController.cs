using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Eoq.Domain;
using Eoq.Mappings.FluentNh.Repository;
using eoqLab.Models;

namespace eoqLab.Controllers
{
    public class HomeController : Controller
    {

        public IEOQRepository EoqRepository { get; set; }
        public IMaterialRepository MaterialRepository { get; set; }
        public IUnitRepository UnitRepository { get; set; }
        public IDepartmentRepository DepartmentRepository { get; set; }
        public IEmployeeRepository EmployeeRepository { get; set; }
        public IEmployeePhoneRepository EmployeePhoneRepository { get; set; }
        public IEmployeeMailRepository EmployeeMailRepository { get; set; }
        public ICashierRepository CashierRepository { get; set; }
        public ICashierMaterialRepository CashierMaterialRepository { get; set; }

        //common
        public IColorRepository ColorRepository { get; set; }
        public IBrandRepository BrandRepository { get; set; }
        public ISizesRepository SizesRepository { get; set; }
        public ICatelogyRepository CatelogyRepository { get; set; }
        public IStockRepository StockRepository { get; set; }

        public int Branch { get; set; }
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
                              , ICashierMaterialRepository cashierMaterialRepository
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
            this.CashierMaterialRepository = cashierMaterialRepository;

            //common
            this.ColorRepository = colorRepository;
            this.BrandRepository = brandRepository;
            this.SizesRepository = sizesRepository;
            this.CatelogyRepository = catelogyRepository;
            this.StockRepository = stockRepository;

            Branch = 1;

        }

        public ActionResult Index()
        {
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

            var products = from stock in stockList
                    join product in productList.DefaultIfEmpty() on stock.MeterialId equals product.MatId
                    join unit in unitList on stock.UnitId equals unit.ID
                    where stock.Amount <= stock.Reorderpoint && stock.BranchId == this.Branch 
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

                    var price = from stock in stockList
                                   join product in productList.DefaultIfEmpty() on stock.MeterialId equals product.MatId
                                   where stock.BranchId == this.Branch
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
                if(purchaseOrder != null)
                {
                    var stock = new Eoq.Domain.Stock()
                                    {

                                        Amount = purchaseOrder.Amount
                                        //Price  = purchaseOrder.price
                                    };
                }
                else if (purchaseOrders != null)
                {
                    foreach (var purchaseOrderData in purchaseOrders)
                    {
                        
                    }
                }
                else
                {
                    throw new Exception();
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
                var cashier = new Eoq.Domain.Cashier(){ BranchId = this.Branch };
                if (purchaseOrder != null && purchaseOrders == null)
                {
                    cashier.Amount        = purchaseOrder.Amount.ToString();
                    cashier.TotalPrice    = purchaseOrder.Amount * purchaseOrder.Price;
                    cashier.Createdate    = DateTime.Now;
                    CashierRepository.Save(cashier);
                    
                    var cashierMaterial = new Eoq.Domain.CashierMaterial() { 
                                                                                Id = cashier.Id , 
                                                                                Material_ID = purchaseOrder.ProductID 
                                                                            };

                    CashierMaterialRepository.Save(cashierMaterial);
                    
                }
                else if (purchaseOrders != null)
                {
                    var totalAmount = 0;
                    foreach (var purchaseOrderData in purchaseOrders)
                    {
                        cashier.TotalPrice += purchaseOrderData.Price * purchaseOrderData.Amount;
                        totalAmount += purchaseOrderData.Amount;
                    }
                    cashier.Createdate = DateTime.Now;
                    cashier.Amount = totalAmount.ToString();
                    CashierRepository.Save(cashier);


                    foreach (var purchaseOrderData in purchaseOrders)
                    {

                        var cashierMaterial = new Eoq.Domain.CashierMaterial()
                        {
                            Id = cashier.Id,
                            Material_ID = purchaseOrderData.ProductID
                        };

                        CashierMaterialRepository.Save(cashierMaterial);
                    }
                    return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    throw new Exception();
                }
                return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, error = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
            } 
        }

        //#region Material
        //[HttpPost]
        //public JsonResult CreateMaterial(string matName,string matDetail,decimal matPrice,int matReorderPront,int unitID)
        //{
        //    try
        //    {
        //        Material material = new Material(matName, matDetail, matPrice, matReorderPront, unitID,0);
        //        //insert
        //        MaterialRepository.Save(material);
        //        return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
        //    }
        //    catch(Exception ex)
        //    {
        //        return Json(new { success = false, error = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
        //    }
        //}

        //[HttpPost]
        //public JsonResult UpdateMaterial(string matName, string matDetail, decimal matPrice, int matReorderPront, int unitID,int matID)
        //{
        //    try
        //    {
        //        //Material material = new Material(matName, matDetail, matPrice, matReorderPront, unitID,matID);
        //        //insert
        //        //MaterialRepository.Update(material);
        //        return Json(new { success = true, error = "" }, JsonRequestBehavior.AllowGet);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new { success = false, error = ex.Message.ToString() }, JsonRequestBehavior.AllowGet);
        //    }
        //}

        #endregion

        #region Stock
        public JsonResult StockList()
        {
            var stockList       = this.StockRepository.GetAll();
            var unitList        = this.UnitRepository.GetAll();
            var productList     = this.MaterialRepository.GetAll();
            var categoryList    = this.CatelogyRepository.GetAll();
            var colorList       = this.ColorRepository.GetAll();
            var brandList       = this.BrandRepository.GetAll();
            var stocks = from stock in stockList
                           join product in productList.DefaultIfEmpty() on stock.MeterialId equals product.MatId
                           join unit in unitList on stock.UnitId equals unit.ID
                           join category in categoryList on product.CatelogyId equals category.Id
                           join color in colorList on stock.ColorId equals color.Id
                           join brand in brandList on stock.BrandId equals brand.Id
                           where stock.Amount <= stock.Reorderpoint && stock.BranchId == this.Branch
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
                               stock.Amount,
                               stock.Price
                           };

            return Json(new { data = stocks, total = stocks.Count() }, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SaveStock(StockParams stockParams)
        {
            try
            {
                var p = stockParams;
                var stock = new Stock()
                {
                    Price = p.Price,
                    Amount = p.Amount,
                    MeterialId = p.ProductID,
                    BrandId = p.BrandID,
                    UnitId = p.UnitID,
                    Createdate = DateTime.Now
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
                                 Createdate = DateTime.Now
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
                foreach (var id in ids)
                {
                    var stock = new Stock();
                    stock.Id = id;
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
            
            var cashierList = this.CashierRepository.GetAll();
            var saleItems = from saleitem in cashierList
                            where saleitem.BranchId == this.Branch
                            let dateTime = saleitem.Createdate
                            where dateTime != null
                            select new
                            {
                                SaleID      = saleitem.Id,
                                CreateDate  = dateTime.Value 
                            };

            return Json(new { data = saleItems, total = saleItems.Count() }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult SearchSaleItemList(SaleItemParams saleParams)
        {

            var cashierList = this.CashierRepository.GetAll();
            var saleItems = from saleitem in cashierList
                            where saleitem.BranchId == this.Branch
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

        [HttpGet]
        public JsonResult SaleItemDetail(int saleItemId)
        {
            var cashierList = this.CashierRepository.GetAll();
            var saleItemDetail = from saleitem in cashierList
                            where saleitem.BranchId == this.Branch && saleitem.Id == saleItemId
                            let dateTime = saleitem.Createdate
                            where dateTime != null
                            select new
                            {
                                SaleID = saleitem.Id,
                                saleitem.Amount,
                                saleitem.TotalPrice,
                                saleitem.Tax,
                                CreateDate = dateTime.Value
                            };

            return Json(new { data = saleItemDetail, total = saleItemDetail.Count() }, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }//end class
}//end namespace
