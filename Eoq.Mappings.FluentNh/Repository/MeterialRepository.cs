// -----------------------------------------------------------------------
// <copyright file="MaterialRepository.cs" company="">
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
    using System.Diagnostics;

    public interface IMaterialRepository
    {
        void Save(Material newMaterial);
        void SaveOrUpdate(Material newMaterial);
        List<Material> GetAll();
        int Update(Material oldMaterial);
        int CountAll();
        void Delete(Material material);
    }
    
    public class MaterialRepository : NhRepository, IMaterialRepository
    {
        #region save update select all countall

        public void Save(Material newMaterial)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                //HibernatingRhinos.Profiler.Appender.NHibernate.NHibernateProfiler.Initialize();
                session.Save(newMaterial);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }


        public void SaveOrUpdate(Material newMaterial)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.SaveOrUpdate(newMaterial);
                session.Flush();
                //session.Close();
                ts.Commit();
            }
        }

        public List<Material> GetAll()
        {
            List<Material> results = null;
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenSession())
            {
                try
                {

                    results = session.QueryOver<Material>().List() as List<Material>;
                    session.Close();
                    //return results;
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(ex.Message);
                }
                return results;
            }
        }

        public int Update(Material oldMaterial)
        {
            using (var session = SessionFactory.OpenSession())
            using (var ts = session.BeginTransaction())
            {
                session.Update(oldMaterial);
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
                var result = session.QueryOver<Material>().RowCount();
                return result;
            }

        }

        public void Delete(Material material)
        {
            using (var session = SessionFactory.OpenStatelessSession())
            {
                session.Delete(material);
            }
        }

        #endregion
    }
}
