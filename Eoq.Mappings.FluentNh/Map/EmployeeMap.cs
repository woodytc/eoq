using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using Eoq.Domain; 

namespace Eoq.Mappings.FluentNh {
    
    
    public partial class EmployeeMap : ClassMap<Employee> {
        
        public EmployeeMap() {
			Table("EMPLOYEE");
			LazyLoad();
			Id(x => x.EmpID).GeneratedBy.Identity().Column("Emp_ID");
			Map(x => x.EmpName).Column("Emp_Name");
			Map(x => x.EmpAddress).Column("Emp_Address");
			Map(x => x.Street).Column("Street");
			Map(x => x.District).Column("District");
			Map(x => x.Province).Column("Province");
			Map(x => x.Zipcode).Column("Zipcode");
        }
    }
}
