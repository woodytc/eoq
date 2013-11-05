// -----------------------------------------------------------------------
// <copyright file="UnitRepository.cs" company="">
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

    public interface IUnitRepository
    {
        void Save(Unit newUnit);
        void SaveOrUpdate(Unit newUnit);
        List<Unit> GetAll();
        int Update(Unit oldUnit);
        int CountAll();

        void Delete(Unit unit);
    }
    
    public class UnitRepository : NhRepository, IUnitRepository
    {
        #region save update select all countall

        public void Save(Unit newUnit)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newUnit);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(Unit newUnit)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newUnit);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<Unit> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<Unit>().List() as List<Unit>;
                //session.Close();
                return results;
            }
        }

        public int Update(Unit oldUnit)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldUnit);
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
                var result = session.QueryOver<Unit>().RowCount();
                return result;
            }

        }

        public void Delete(Unit unit)
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                session.Delete(unit);
            }
        }

        #endregion
    }
}
