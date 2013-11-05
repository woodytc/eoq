using System; 
using System.Collections.Generic; 
using System.Text; 
using eoq.Domain;


namespace eoq.Domain {
    
    
    [DataContract(Name="EMPPHONEData" , Namespace="")]
    public class EMPPHONEData {
        
        [DataMember()]
        public virtual Int32 EmpPhone {
            get;
            set;
        }
        
        [DataMember()]
        public virtual String EmpId {
            get;
            set;
        }
    }
}
