using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Eoq.Mappings.FluentNh.Repository;

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
        //common
        public IColorRepository ColorRepository { get; set; }
        public IBrandRepository BrandRepository { get; set; }
        public ISizesRepository SizesRepository { get; set; }
        public ICatelogyRepository CatelogyRepository { get; set; }

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
            )
        {
            EoqRepository = eoqRepository;
            MaterialRepository = materialRepository;
            UnitRepository = unit;
            DepartmentRepository = departmentRepository;
            EmployeeRepository = employeeRepository;
            EmployeePhoneRepository = employeePhoneRepository;
            EmployeeMailRepository = employeeEmailRepository;
            //common
            this.ColorRepository = colorRepository;
            this.BrandRepository = brandRepository;
            this.SizesRepository = sizesRepository;
            this.CatelogyRepository = catelogyRepository;

        }

        public ActionResult Index()
        {
            return View();
        }

        //get product list
        public JsonResult ProductsList()
        {
            var b = this.MaterialRepository.GetAll();

            var q = from m in b
                    select new
                               {
                                   MatId = m.MatId
                                   ,
                                   MatName = m.MetName
                               };

            return Json(new { data = q, total = q.Count() }, JsonRequestBehavior.AllowGet);

        }

        //get categories list
        public JsonResult CategoriesList()
        {
//            var allCategories = this.CatelogyRepository.GetAll();
//            var categoriesResult = from categories in allCategories
//                                   select new
//                                              {
//                                                  CategoryID   = "1",
//                                                  CategoryName = "test"
//                                              };
            var categoriesResult = new List<object>();

            for (int j = 1; j < 6; j++)
            {
                categoriesResult.Add(new
                                {
                                    CategoryID = j,
                                    CategoryName = "test " + j
                                });
            }

            return Json(new { data = categoriesResult, total = categoriesResult.Count() }, JsonRequestBehavior.AllowGet);
        }
    }//end class
}//end namespace
