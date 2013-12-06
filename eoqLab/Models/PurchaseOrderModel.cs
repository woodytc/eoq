using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace eoqLab.Models
{
    public class PurchaseOrderModel
    {
        public int MaterialId { get; set; }
        public string MaterialName { get; set; }
        public string project { get; set; }
        public int taskId { get; set; }
        public string description { get; set; }
        public int estimate { get; set; }
        public double rate { get; set; }
        public string due { get; set; }
    }
}