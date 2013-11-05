using System; 
using System.Collections.Generic; 
using System.Text; 
using eoq.Domain;


namespace eoq.Domain {
    
    
    [DataContract(Name="RECEIVEData" , Namespace="")]
    public class RECEIVEData {
        
        [DataMember()]
        public virtual Int32 Id {
            get;
            set;
        }
        
        [DataMember()]
        public virtual Int32 Id {
            get;
            set;
        }
        
        [DataMember()]
        public virtual Int32 Qty {
            get;
            set;
        }
        
        [DataMember()]
        public virtual String Unit {
            get;
            set;
        }
    }
}
