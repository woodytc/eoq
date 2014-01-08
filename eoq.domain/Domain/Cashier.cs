using System;
using System.Text;
using System.Collections.Generic;


namespace Eoq.Domain
{

    public class Cashier
    {
        public virtual int Id { get; set; }
        //public virtual int StockId { get; set; }
        public virtual int BranchId { get; set; }
        public virtual string Amount { get; set; }
        public virtual decimal TotalPrice { get; set; }
        public virtual bool? IncudeTax { get; set; }
        public virtual float? Tax { get; set; }
        public virtual string Createby { get; set; }
        public virtual DateTime? Createdate { get; set; }
        public virtual DateTime? Updatedate { get; set; }
        public virtual string Updateby { get; set; }
    }
}
