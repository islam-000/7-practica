using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp4
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int[] asa = new int[10];
            Random random = new Random();
            for (int i = 0; i < asa.Length; i++) asa[i] = random.Next(0, 3);
            int[] result = asa.Where(i => i != 0).ToArray();
            for (int i = 0; i < asa.Length; i++) Console.Write(asa[i]);
            Console.Write("\n");
            for (int i = 0; i < result.Length; i++) Console.Write($"{result[i]} ");
        }
    }
}
