using System;
using System.Text;
using System.Collections.Generic;
using System.ComponentModel;
//using System.ComponentModel.DataAnnotations;


namespace Eoq.Domain {
    
    public partial class Sizes {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
    }
}
