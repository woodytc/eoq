using System;
using System.Collections.Generic;
using System.Text;
using FluentNHibernate.Mapping;
using Eoq.Domain;

namespace Eoq.Mappings.FluentNh
{


    public class CashierMap : ClassMap<Cashier>
    {

        public CashierMap()
        {
            Table("Cashier");
            LazyLoad();
            Id(x => x.Id).GeneratedBy.Identity().Column("ID");
            //Map(x => x.StockId).Column("Stock_ID").Not.Nullable();
            Map(x => x.BranchId).Column("Branch_ID").Not.Nullable();
            Map(x => x.Amount).Column("Amount").Not.Nullable();
            Map(x => x.TotalPrice).Column("Total_Price").Not.Nullable();
            Map(x => x.IncudeTax).Column("Incude_Tax");
            Map(x => x.Tax).Column("Tax");
            Map(x => x.Createby).Column("CreateBY");
            Map(x => x.Createdate).Column("CreateDate");
            Map(x => x.Updatedate).Column("UpdateDate");
            Map(x => x.Updateby).Column("UpdateBy");
        }
    }
}
