using System;
using System.Text;
using System.Collections.Generic;


namespace Eoq.Domain
{

    public class Orders
    {
        public virtual int Id { get; set; }
        public virtual int BranchId { get; set; }
        public virtual DateTime Importdate { get; set; }
        public virtual string Createby { get; set; }
    }
}
