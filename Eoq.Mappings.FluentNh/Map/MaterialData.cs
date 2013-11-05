using System; 
using System.Collections.Generic; 
using System.Text; 
using eoq.Domain;


namespace eoq.Domain {
    
    
    [DataContract(Name="MaterialData" , Namespace="")]
    public class MaterialData {
        
        [DataMember()]
        public virtual Guid MatGid {
            get;
            set;
        }
        
        [DataMember()]
        public virtual Int32 Id {
            get;
            set;
        }
        
        [DataMember()]
        public virtual String MatName {
            get;
            set;
        }
        
        [DataMember()]
        public virtual String MatDetail {
            get;
            set;
        }
        
        [DataMember()]
        public virtual Decimal MatPrice {
            get;
            set;
        }
        
        [DataMember()]
        public virtual Int32 MatReorderPoint {
            get;
            set;
        }
        
        [DataMember()]
        public virtual Int32 UnitAId {
            get;
            set;
        }
        
        [DataMember()]
        public virtual String Createby {
            get;
            set;
        }
        
        [DataMember()]
        public virtual DateTime Createdate {
            get;
            set;
        }
        
        [DataMember()]
        public virtual DateTime Updatedate {
            get;
            set;
        }
        
        [DataMember()]
        public virtual String Updateby {
            get;
            set;
        }
    }
}
