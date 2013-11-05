using System; 
using System.Collections.Generic; 
using System.Text; 
using eoq.Domain;


namespace eoq.Domain {
    
    
    [DataContract(Name="EMPEMAILData" , Namespace="")]
    public class EMPEMAILData {
        
        [DataMember()]
        public virtual Int32 EmpId {
            get;
            set;
        }
        
        [DataMember()]
        public virtual String Email {
            get;
            set;
        }
    }
}
