// -----------------------------------------------------------------------
// <copyright file="SizesRepository.cs" company="">
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

    public interface ISizesRepository
    {
        void Save(Sizes newSizes);
        void SaveOrUpdate(Sizes newSizes);
        List<Sizes> GetAll();
        int Update(Sizes oldSizes);
        int CountAll();

        void Delete(Sizes Sizes);
    }

    public class SizesRepository : NhRepository, ISizesRepository
    {
        #region save update select all countall

        public void Save(Sizes newSizes)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newSizes);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(Sizes newSizes)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newSizes);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<Sizes> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<Sizes>().List() as List<Sizes>;
                //session.Close();
                return results;
            }
        }

        public int Update(Sizes oldSizes)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldSizes);
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
                var result = session.QueryOver<Sizes>().RowCount();
                return result;
            }

        }

        public void Delete(Sizes Sizes)
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                session.Delete(Sizes);
            }
        }

        #endregion
    }
}
