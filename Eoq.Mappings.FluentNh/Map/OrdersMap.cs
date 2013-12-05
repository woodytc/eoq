using System;
using System.Collections.Generic;
using System.Text;
using FluentNHibernate.Mapping;
using Eoq.Domain;

namespace Eoq.Mappings.FluentNh
{


    public class OrdersMap : ClassMap<Orders>
    {

        public OrdersMap()
        {
            Table("Orders");
            LazyLoad();
            Id(x => x.Id).GeneratedBy.Identity().Column("ID");
            Map(x => x.BranchId).Column("Branch_ID").Not.Nullable();
            Map(x => x.Importdate).Column("ImportDate").Not.Nullable();
            Map(x => x.Createby).Column("CreateBy");
        }
    }
}
