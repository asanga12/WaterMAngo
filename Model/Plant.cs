using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WaterMango.Model
{
    public class Plant
    {
        public int plantid { get; set; }
        public string plantName { get; set; }
        public DateTime lastWatered { get; set; }
    }
}
