using System;
using System.Text;
using System.Collections.Generic;


namespace Eoq.Domain
{

    public class Stock
    {
        public virtual int Id { get; set; }
        public virtual int MeterialId { get; set; }
        public virtual int? OrderId { get; set; }
        public virtual int ColorId { get; set; }
        public virtual int BranchId { get; set; }
        public virtual int UnitId { get; set; }
        public virtual int SizeId { get; set; }
        public virtual decimal Reorderpoint { get; set; }
        public virtual decimal Amount { get; set; }
        public virtual decimal Price { get; set; }
        public virtual string Createby { get; set; }
        public virtual DateTime? Createdate { get; set; }
        public virtual string Updateby { get; set; }
        public virtual DateTime Updatedate { get; set; }
    }
}
