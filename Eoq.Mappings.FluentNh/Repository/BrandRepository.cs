// -----------------------------------------------------------------------
// <copyright file="BrandRepository.cs" company="">
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

    public interface IBrandRepository
    {
        void Save(Brand newBrand);
        void SaveOrUpdate(Brand newBrand);
        List<Brand> GetAll();
        int Update(Brand oldBrand);
        int CountAll();

        void Delete(Brand Brand);
    }

    public class BrandRepository : NhRepository, IBrandRepository
    {
        #region save update select all countall

        public void Save(Brand newBrand)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newBrand);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(Brand newBrand)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newBrand);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<Brand> GetAll()
        {
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = session.QueryOver<Brand>().List() as List<Brand>;
                //session.Close();
                return results;
            }
        }

        public int Update(Brand oldBrand)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldBrand);
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
                var result = session.QueryOver<Brand>().RowCount();
                return result;
            }

        }

        public void Delete(Brand Brand)
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                session.Delete(Brand);
            }
        }

        #endregion
    }
}
