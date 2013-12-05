using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eoqLab.Models
{
    public class PurchaseOrderModel
    {
        public string MaterialName {get;set;}
        public int MaterialId { get;set;}
        public string CategoryName { get; set; }
        public string UnitType { get; set; }
        public decimal Price { get; set; }
        public decimal Total {get;set;} 
    }
}