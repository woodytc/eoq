using System;

namespace eoqLab.Models
{
    public class SaleItemReport
    {
        public SaleItemReport()
        {
            
        }
        public virtual int SaleItemId { get; set; }
        public virtual string MaterialName { get; set; }
        public virtual int Amount { get; set; }
        public virtual decimal Price { get; set; }
        public virtual DateTime SaleDate { get; set; }
    }
}