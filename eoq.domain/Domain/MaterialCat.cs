using System;
using System.Text;
//using System.Collections.Generic;


namespace Eoq.Domain
{
    /// <summary>
    /// fk Catelogy id map table Catelogy 
    /// </summary>
    public partial class MaterialCat:Material
    {
        public MaterialCat()
        {
        }
        public virtual int CatelogyId { get; set; }
        public virtual string CatelogyName { get; set; }
        
    }
}
