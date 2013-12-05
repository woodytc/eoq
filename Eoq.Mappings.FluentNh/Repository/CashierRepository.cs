// -----------------------------------------------------------------------
// <copyright file="CashierRepository.cs" company="">
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

    public interface ICashierRepository
    {
        void Save(Cashier newCashier);
        void SaveOrUpdate(Cashier newCashier);
        List<Cashier> GetAll();
        int Update(Cashier oldCashier);
        int CountAll();

        void Delete(Cashier Cashier);
    }

    public class CashierRepository : NhRepository, ICashierRepository
    {
        #region save update select all countall

        public void Save(Cashier newCashier)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newCashier);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(Cashier newCashier)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newCashier);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<Cashier> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<Cashier>().List() as List<Cashier>;
                //session.Close();
                return results;
            }
        }

        public int Update(Cashier oldCashier)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldCashier);
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
                var result = session.QueryOver<Cashier>().RowCount();
                return result;
            }

        }

        public void Delete(Cashier Cashier)
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                session.Delete(Cashier);
            }
        }

        #endregion
    }
}
