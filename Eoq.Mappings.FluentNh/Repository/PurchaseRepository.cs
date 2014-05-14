using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using NHibernate;
using NHibernate.AdoNet.Util;
using NHibernate.Criterion;
using Eoq.Domain;

namespace Eoq.Mappings.FluentNh.Repository
{
    class PurchaseRepository : NhRepository, IPurchaseRepository
    {
        private IList<T> ExecuteICriteriaWhereBranchID<T>(T entity, string name, int id)
        {
            using (var Session = SessionFactory.OpenStatelessSession())
            using (ITransaction transaction = Session.BeginTransaction())
            {
                try
                {
                    //IList<T> result = Session.CreateCriteria(typeof(Stock))
                    //    .Add(Restrictions.Eq("branch_id",branchId))
                    ////.AddOrder(Order.Asc(""))
                    //.List<T>();
                    //transaction.Commit();
                    //var categorizedProducts = product
                    //                        .Join(productcategory, p => p.Id, pc => pc.ProdId, (p, pc) => new { p, pc })
                    //                        .Join(category, ppc => ppc.pc.CatId, c => c.Id, (ppc, c) => new {
                    //                            ProdId = ppc.p.Id, // or ppc.pc.ProdId
                    //                            CatId = c.CatId
                    //                            // other assignments
                    //                        });
                    
                    //var reslut = from x in Session.QueryOver<Stock>() join y in Session.QueryOver<typeof<T>()
                                  
                    
                    return null;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw;
                }
            }
        }

        private string GetKey<T>(T entity, string name)
        {
            if (name.Equals(name))
            {

            }
            return null;
        }

        void IPurchaseOrderRepository.Save(PurchaseOrder newPurchaseOrder)
        {
            throw new NotImplementedException();
        }

        void IPurchaseOrderRepository.SaveOrUpdate(PurchaseOrder newPurchaseOrder)
        {
            throw new NotImplementedException();
        }

        List<PurchaseOrder> IPurchaseOrderRepository.GetAll()
        {
            throw new NotImplementedException();
        }

        int IPurchaseOrderRepository.Update(PurchaseOrder oldPurchaseOrder)
        {
            throw new NotImplementedException();
        }

        int IPurchaseOrderRepository.CountAll()
        {
            throw new NotImplementedException();
        }
    }

    
}
