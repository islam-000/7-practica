using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int[] numbers = new int[10];
            Random random = new Random();
            for (int i = 0; i < numbers.Length; i++)
            {
                numbers[i] = random.Next(1, 11);
            }
            Console.WriteLine("Массив: ");
            for (int i = 0; i < numbers.Length; i++)
            {
                Console.Write(numbers[i] + " ");
            }
            int sum = 0;
            int srar = 0;
            int kol = 0;
            for (int i = 0; i < numbers.Length; i++)
            {
                sum += numbers[i];
            }
            for (int i = 0; i < numbers.Length; i++)
            {
                if (numbers[i] % 2 == 0)
                    kol++;
            }
            srar = sum / numbers.Length;
            Console.WriteLine($"Сумма: {sum}");
            Console.WriteLine($"Среднее: {srar}");
            Console.WriteLine($"Количество четных: {kol}");
        }
    }
}
