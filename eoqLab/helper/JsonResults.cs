/* create by Thawatchai 01072013
 *  call entity jason auto mapping
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;

namespace eoqLab.helper
{
    //[DataContract]
    public class JsonResults
    {
       // [DataMember(Name = "property")]
        public string property { get; protected set; }

       // [DataMember(Name = "direction")]
        public string direction { get; protected set; }
        

    }
}