using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Eoq.Domain
{
    public class CashierHeader
    {
        public virtual int Id { get; set; }
        public virtual int BranchId { get; set; }
        public virtual string Createby { get; set; }
        public virtual DateTime? Createdate { get; set; }
        public virtual DateTime? Updatedate { get; set; }
        public virtual string Updateby { get; set; }
    }
}
