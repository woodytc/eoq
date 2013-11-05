using System;
using System.Text;
//using System.Collections.Generic;


namespace Eoq.Domain {
    
    public partial class Material {
        public Material()
        {
        }
        public Material(string matName,string matDetail,decimal matPrice,int matReorderPoint,int unitID,int matID = 0){
            MATGID = System.Guid.NewGuid();
            if (matID > 0) MATID = matID;
            MATNAME = matName;
            MATDETAIL = matDetail;
            MATPrice = matPrice;
            MATREORDERPOINT = matReorderPoint;
            UNITAID = unitID;
            CreateBy = "admin";
            CreateDate = DateTime.Now;
            UpdateBY = "admin";
        }
        public virtual int MATID { get; set; }
        public virtual System.Guid MATGID { get; set; }
        public virtual string MATNAME { get; set; }
        public virtual string MATDETAIL { get; set; }
        public virtual decimal? MATPrice { get; set; }
        public virtual int? MATREORDERPOINT { get; set; }
        public virtual int? UNITAID { get; set; }
        public virtual string CreateBy { get; set; }
        public virtual DateTime? CreateDate { get; set; }
        //public virtual DateTime? UpdateDate { get; set; }
        public virtual string UpdateBY { get; set; }
    }
}
