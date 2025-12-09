using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp8
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int[] numbers = new int[10];
            Random random = new Random();
            for (int i = 0; i < numbers.Length; i++)
            {
                numbers[i] = random.Next(1, 101);
            }
            Console.WriteLine("Массив: ");
            for (int i = 0; i < numbers.Length; i++)
            {
                Console.Write(numbers[i] + " ");
            }
            double median = 0;
            Console.WriteLine($"Отсортированный список результатов:");
            Array.Sort(numbers);
            for (int i = 0; i < numbers.Length; i++)
            {
                Console.Write(numbers[i] + " ");
            }
            Console.WriteLine();
            Console.WriteLine();

            if (numbers.Length % 2 == 0)
            {
                median = (numbers[(numbers.Length / 2) - 1] + numbers[numbers.Length / 2]) / 2.0;
            }
            Console.WriteLine($"Медиана: {median}");
            var top10 = numbers.OrderByDescending(b => b).Take(Convert.ToInt32(Math.Ceiling(numbers.Length * 0.1)));
            foreach (var y3 in top10)
            {
                Console.WriteLine($"Топ 10% лучших результатов {y3}");
            }
            double sum = 0.0;
            for (int i = 0; i < numbers.Length; i++)
            {
                sum += numbers[i];
            }
            double sred = sum / numbers.Length;
            double summ = 0.0;
            foreach (int i in numbers)
            {
                double vch = i - sred;
                double kv = Math.Pow(vch, 2);
                summ += kv;
            }
            double sred2 = summ / numbers.Length;
            double kor = Math.Sqrt(sred2);
            Console.WriteLine($"Среднее отклонение: {kor:F2}");
            Console.WriteLine();
            Console.WriteLine();
            Console.WriteLine($"Сортировка результатов по группам(НеЗЧ, Неуд, Удовл, Хор, Отл)");
            var nezch = numbers.Where(m => m < 25);
            Console.WriteLine($"Не зачет");
            foreach (int i in nezch)
            {
                Console.Write(i + " ");
            }
            Console.WriteLine();
            var neyd = numbers.Where(m => m >= 25 && m < 50);
            Console.WriteLine($"Неудовлетворительно");
            foreach (int i in neyd)
            {
                Console.Write(i + " ");
            }
            Console.WriteLine();
            var ydov = numbers.Where(m => m >= 50 && m < 70);
            Console.WriteLine($"Удовлетворительно");
            foreach (int i in ydov)
            {
                Console.Write(i + " ");
            }
            Console.WriteLine();
            var hor = numbers.Where(m => m >= 70 && m < 85);
            Console.WriteLine($"Хорошо");
            foreach (int i in hor)
            {
                Console.Write(i + " ");
            }
            Console.WriteLine();
            var otl = numbers.Where(m => m >= 85);
            Console.WriteLine($"Отлично");
            foreach (int i in otl)
            {
                Console.Write(i + " ");
            }
        }
    }
}
