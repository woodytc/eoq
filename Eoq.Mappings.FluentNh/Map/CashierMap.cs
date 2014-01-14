using System;
using System.Collections.Generic;
using System.Text;
using FluentNHibernate.Mapping;
using Eoq.Domain;

namespace Eoq.Mappings.FluentNh
{


    public sealed class CashierMap : ClassMap<Cashier>
    {

        public CashierMap()
        {
            Table("Cashier");
            LazyLoad();
            CompositeId().KeyProperty(x => x.Id, "CashierHeader_ID")
                         .KeyProperty(x => x.Material_ID, "Material_ID");
            Map(x => x.Amount).Column("Amount").Not.Nullable();
            Map(x => x.TotalPrice).Column("Total_Price").Not.Nullable();
            Map(x => x.IncudeTax).Column("Incude_Tax");
            Map(x => x.Tax).Column("Tax");
            
        }
    }
}
