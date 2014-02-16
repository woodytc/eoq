using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eoqLab.Models
{
    public class PurchaseOrderModel
    {
        public int id { get; set; }
        public int StockID { get; set; }
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public int CategoryID { get; set; }
        public string CategoryName { get; set; }
        public int UnitID { get; set; }
        public string UnitName { get; set; }
        public int BrandID { get; set; }
        public int ColorID { get; set; }
        public int SizeID { get; set; } 
        public int Amount { get; set; }
        public int Price { get; set; }

    }
}