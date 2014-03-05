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
    using NHibernate.Linq;
    using Eoq.Domain;
    using System.Diagnostics;
    using NHibernate.Criterion;
  

    public interface IMaterialRepository
    {
        void Save(Material newMaterial);
        void SaveOrUpdate(Material newMaterial);
        List<Material> GetAll();
        int Update(Material oldMaterial);
        int CountAll();
        void Delete(Material material);
        List<MaterialCat> SelectGridMeterial(string name);
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
            //using (var session = SessionFactory.OpenSession())
            //using (session.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted))
            using (var session = SessionFactory.OpenStatelessSession())
            {
                var results = (from x in session.Query<Material>() select x).ToList<Material>(); //session.QueryOver<Material>().List() as List<Material>;
                //session.Close();
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

        public List<MaterialCat> SelectGridMeterial(string name)
        {
            using (var session = SessionFactory.OpenSession())
            {
                /*
                 var list4 = session.CreateCriteria<Product>()
                            .Add(Restrictions.Eq("Discontinued", false))
                            .CreateAlias("Category", "c")
                            .Add(Restrictions.Eq("c.CategoryName", "Condiments"))
                            .List<Product>();
 
                 */
                var q = (from m in session.Query<Material>()
                         join c in session.Query<Catelogy>()
                             on m.CatelogyId equals c.Id
                          where m.MetName.Contains(name)
                         select new MaterialCat
                         {
                             MatId = m.MatId,
                             CatelogyId = c.Id,
                             CatelogyName = c.Name,
                             MatDetail = m.MatDetail,
                             MetName = m.MetName
                         }).ToList();
                return q;
            }
        }
    }
}
