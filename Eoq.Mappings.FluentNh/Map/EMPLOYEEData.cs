using System; 
using System.Collections.Generic; 
using System.Text; 
using eoq.Domain;


namespace eoq.Domain {
    
    
    [DataContract(Name="EMPLOYEEData" , Namespace="")]
    public class EMPLOYEEData {
        
        [DataMember()]
        public virtual Int32 Id {
            get;
            set;
        }
        
        [DataMember()]
        public virtual String EmpName {
            get;
            set;
        }
        
        [DataMember()]
        public virtual String EmpAddress {
            get;
            set;
        }
        
        [DataMember()]
        public virtual String Street {
            get;
            set;
        }
        
        [DataMember()]
        public virtual String District {
            get;
            set;
        }
        
        [DataMember()]
        public virtual String Province {
            get;
            set;
        }
        
        [DataMember()]
        public virtual String Zipcode {
            get;
            set;
        }
    }
}
