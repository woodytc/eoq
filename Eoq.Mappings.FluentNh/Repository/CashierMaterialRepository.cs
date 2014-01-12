// -----------------------------------------------------------------------
// <copyright file="CashierRepository.cs" company="">
// TODO: Update copyright text.
// </copyright>
// -----------------------------------------------------------------------

namespace Eoq.Mappings.FluentNh.Repository
{
    using System.Collections.Generic;
    using Eoq.Domain;

    public interface ICashierMaterialRepository
    {
        void Save(CashierMaterial newCashier);
        void SaveOrUpdate(CashierMaterial newCashier);
        List<CashierMaterial> GetAll();
        int Update(CashierMaterial oldCashier);
        int CountAll();
        void Delete(CashierMaterial Cashier);
    }

    public class CashierMaterialRepository : NhRepository, ICashierMaterialRepository
    {
        #region save update select all countall

        public void Save(CashierMaterial newCashier)
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


        public void SaveOrUpdate(CashierMaterial newCashier)
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

        public List<CashierMaterial> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<CashierMaterial>().List() as List<CashierMaterial>;
                //session.Close();
                return results;
            }
        }

        public int Update(CashierMaterial oldCashier)
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
                var result = session.QueryOver<CashierMaterial>().RowCount();
                return result;
            }

        }

        public void Delete(CashierMaterial Cashier)
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                session.Delete(Cashier);
            }
        }

        #endregion
    }
}
