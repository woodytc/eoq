using System; 
using System.Collections.Generic; 
using System.Text; 
using FluentNHibernate.Mapping;
using Eoq.Domain; 

namespace Eoq.Mappings.FluentNh {
    
    
    public partial class EmployeeMailMap : ClassMap<EmployeeMail> {
        
        public EmployeeMailMap() {
			Table("EMP_EMAIL");
			LazyLoad();
            Id(x => x.ID).GeneratedBy.Identity().Column("ID");
			Map(x => x.EmpID).Column("Emp_ID");
			Map(x => x.Email).Column("email");
        }
    }
}
