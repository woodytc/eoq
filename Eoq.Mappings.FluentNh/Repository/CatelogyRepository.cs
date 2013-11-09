// -----------------------------------------------------------------------
// <copyright file="CatelogyRepository.cs" company="">
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

    public interface ICatelogyRepository
    {
        void Save(Catelogy newCatelogy);
        void SaveOrUpdate(Catelogy newCatelogy);
        List<Catelogy> GetAll();
        int Update(Catelogy oldCatelogy);
        int CountAll();

        void Delete(Catelogy Catelogy);
    }

    public class CatelogyRepository : NhRepository, ICatelogyRepository
    {
        #region save update select all countall

        public void Save(Catelogy newCatelogy)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newCatelogy);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(Catelogy newCatelogy)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newCatelogy);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<Catelogy> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<Catelogy>().List() as List<Catelogy>;
                //session.Close();
                return results;
            }
        }

        public int Update(Catelogy oldCatelogy)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldCatelogy);
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
                var result = session.QueryOver<Catelogy>().RowCount();
                return result;
            }

        }

        public void Delete(Catelogy Catelogy)
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                session.Delete(Catelogy);
            }
        }

        #endregion
    }
}
