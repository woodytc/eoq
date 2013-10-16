/*  Create by Thawatchai 01072013
 *  Class Helper decode and encode jason 
  */
using System;
using System.Collections.Generic;
using System.Linq;
//using System.Web;
using System.IO;
using System.Text;
using System.Runtime.Serialization.Json;

namespace eoqLab.helper
{
    public class JSONHelper
    {
        public static string Serialize<T>(T obj)
        {
            System.Runtime.Serialization.Json.DataContractJsonSerializer serializer = new System.Runtime.Serialization.Json.DataContractJsonSerializer(obj.GetType());
            MemoryStream ms = new MemoryStream();
            serializer.WriteObject(ms, obj);
            string retVal = Encoding.Default.GetString(ms.ToArray());
            ms.Dispose();
            return retVal;
        }

        public static T Deserialize<T>(string json)
        {
            T obj = Activator.CreateInstance<T>();
            using (MemoryStream ms = new MemoryStream(Encoding.Unicode.GetBytes(json)))
            {
                DataContractJsonSerializer serializer = new DataContractJsonSerializer(obj.GetType());
                obj = (T)serializer.ReadObject(ms); // <== Your missing line
                return obj;
            } 
        }
    }
}