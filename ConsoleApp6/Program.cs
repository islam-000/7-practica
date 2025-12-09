using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp6
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int[] mas = new int[30];
            Random r = new Random();
            for (int t = 0; t < mas.Length; t++)
            {
                mas[t] = r.Next(-35, 41);
            }
            for (int t = 0; t < mas.Length; t++)
            {
                Console.WriteLine(mas[t] + " ");
                if ((t + 1) % 7 == 0)
                    Console.WriteLine();
            }
            Console.WriteLine();
            int plusw = -1000;
            int minusw = 1000;
            int plusned = 1;
            int minusned = 1;
            for (int week = 0; week < 4; week++)
            {
                int sumt = 0;
                for (int day = 0; day < 7; day++)
                {
                    int dayi = week * 7 + day;
                    if (dayi < mas.Length)
                    {
                        sumt += mas[dayi];
                    }
                }
                Console.WriteLine($"Неделя {week + 1} имеет сред температуру {sumt / 7.0:F2}");
                if (sumt > plusw)
                {
                    plusw = sumt;
                    plusned = week + 1;
                }
                if (sumt < minusw)
                {
                    minusw = sumt;
                    minusned = week + 1;
                }
            }
            Console.WriteLine();
            Console.WriteLine($"Самая теплая неделя: {plusned}");
            Console.WriteLine($"Самая холодная неделя: {minusned}");
            var sred = mas.Average(b => b);
            Console.WriteLine($"Средняя температура: {sred:F2}");
            Console.WriteLine("Дни когда температура выше средней: ");
            var tempsred = mas.Where((b => Convert.ToDouble(b) > sred));
            foreach (var a in tempsred)
            {
                Console.WriteLine(a);
            }
            Console.WriteLine("\n");
            Console.Write("Морозные дни: ");
            for (int i = 0; i < mas.Length; i++) if (mas[i] <= -20)
                    Console.Write($"{i} ");
            Console.Write("\n");
            Console.Write("Холодные дни: ");
            for (int i = 0; i < mas.Length; i++) if (mas[i] <= 0 && mas[i] > -20)
                    Console.Write($"{i} ");
            Console.Write("\n");
            Console.Write("Теплые дни: ");
            for (int i = 0; i < mas.Length; i++) if (mas[i] <= 10 && mas[i] > 0)
                    Console.Write($"{i} ");
            Console.Write("\n");
            Console.Write("Жаркие дни: ");
            for (int i = 0; i < mas.Length; i++) if (mas[i] > 29)
                    Console.Write($"{i} ");
        }
    }
}
