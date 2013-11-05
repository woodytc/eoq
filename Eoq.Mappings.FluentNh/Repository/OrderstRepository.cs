// -----------------------------------------------------------------------
// <copyright file="OrdersRepository.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Eoq.Mappings.FluentNh.Repository
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using Eoq.Domain;

    public interface IOrdersRepository
    {
        void Save(Orders newOrders);
        void SaveOrUpdate(Orders newOrders);
        List<Orders> GetAll();
        int Update(Orders oldOrders);
        int CountAll();
    }
    
    public class OrdersRepository : NhRepository, IOrdersRepository
    {
        #region save update select all countall

        public void Save(Orders newOrders)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newOrders);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(Orders newOrders)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newOrders);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<Orders> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<Orders>().List() as List<Orders>;
                //session.Close();
                return results;
            }
        }

        public int Update(Orders oldOrders)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldOrders);
                session.Flush();
                //session.Close();
                ts.Commit();
                return 1;
            }
        }

        public int CountAll()
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var result = session.QueryOver<Orders>().RowCount();
                return result;
            }

        }

        #endregion
    }
}
