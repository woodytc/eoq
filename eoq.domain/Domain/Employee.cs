using System;
using System.Text;
using System.Collections.Generic;
//using NHibernate.Validator.Constraints;


namespace Eoq.Domain {
    
    public partial class Employee {
        public Employee() { }
        public Employee(string empname
                        ,string empAdderess
                        ,string district
                        ,string street
                        ,string province
                        ,string zipcode)
        {
            this.EmpName = empname;
            this.EmpAddress = empAdderess;
            this.Street = street;
            this.District = district;
            this.Province = province;
            this.Zipcode = zipcode;
                
        }
        public virtual int EmpID { get; set; }
        public virtual string EmpName { get; set; }
        public virtual string EmpAddress { get; set; }
        public virtual string Street { get; set; }
        public virtual string District { get; set; }
        public virtual string Province { get; set; }
        public virtual string Zipcode { get; set; }
    }
}
