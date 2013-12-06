using System;
using System.Text;
//using System.Collections.Generic;


namespace Eoq.Domain {
    /// <summary>
    /// fk Catelogy id map table Catelogy 
    /// </summary>
    public partial class Material {
        public Material()
        {
            this.Updatedate = DateTime.Now;
                
        }
        public Material(string matName, string matDetail, int catelogyId)
        {

            MetName = matName;
            MatDetail = matDetail;
            CatelogyId = catelogyId;
            Createdate = DateTime.Now;
            Updatedate = DateTime.Now;
            
        }
        
        public virtual int MatId { get; set; }
        public virtual int CatelogyId { get; set; }
        public virtual string MetName { get; set; }
        public virtual string MatDetail { get; set; }
        public virtual DateTime? Createdate { get; set; }
        public virtual DateTime? Updatedate { get; set; }
        public virtual string Updateby { get; set; }
    }
}
