
import { ProgrammingLanguage } from '../components/LanguageSelector';

// Collection of code snippets for each programming language
export const codeSnippets: Record<ProgrammingLanguage, string[]> = {
  javascript: [
    `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const sequence = Array.from({ length: 10 }, (_, i) => fibonacci(i));
console.log(sequence);`,

    `// Function to sort an array using quick sort
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}`,

    `// Example of Promise chaining in JavaScript
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Data received:', data);
    return processData(data);
  })
  .catch(error => {
    console.error('There was a problem:', error);
  });`
  ],
  
  python: [
    `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Test with a list
numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = bubble_sort(numbers)
print(sorted_numbers)`,

    `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return
        
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node`,

    `import pandas as pd
import matplotlib.pyplot as plt

# Read data from CSV
df = pd.read_csv('data.csv')

# Data analysis
summary = df.describe()
print(summary)

# Create a simple plot
plt.figure(figsize=(10, 6))
plt.plot(df['x'], df['y'])
plt.title('Data Visualization')
plt.xlabel('X Values')
plt.ylabel('Y Values')
plt.show()`
  ],
  
  typescript: [
    `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

function createUser(user: User): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isActive: true
  };
}

const newUser = createUser({
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  isActive: false
});`,

    `// Generic function example in TypeScript
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined;
}

const numbers: number[] = [1, 2, 3, 4, 5];
const firstNumber = getFirstElement(numbers);

const names: string[] = ['Alice', 'Bob', 'Charlie'];
const firstName = getFirstElement(names);

console.log(firstNumber, firstName);`,

    `// React component with TypeScript
import React, { useState, useEffect } from 'react';

interface Props {
  initialCount: number;
}

const Counter: React.FC<Props> = ({ initialCount }) => {
  const [count, setCount] = useState<number>(initialCount);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return (
    <div>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default Counter;`
  ],
  
  html: [
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>Welcome to My Website</h1>
    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <section id="home">
      <h2>Home Section</h2>
      <p>This is the main content of the home page.</p>
    </section>
  </main>
  <footer>
    <p>&copy; 2023 My Website. All rights reserved.</p>
  </footer>
</body>
</html>`,

    `<form action="/submit-form" method="post">
  <div class="form-group">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
  </div>
  
  <div class="form-group">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </div>
  
  <div class="form-group">
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4" required></textarea>
  </div>
  
  <button type="submit">Submit</button>
</form>`,

    `<table border="1">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>John Doe</td>
      <td>john@example.com</td>
      <td>Admin</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jane Smith</td>
      <td>jane@example.com</td>
      <td>Editor</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Bob Johnson</td>
      <td>bob@example.com</td>
      <td>User</td>
    </tr>
  </tbody>
</table>`
  ],
  
  css: [
    `/* CSS Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem 0;
}

nav ul {
  display: flex;
  list-style: none;
}

nav ul li {
  margin-right: 15px;
}

nav a {
  color: white;
  text-decoration: none;
}`,

    `/* Flexbox Layout */
.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.flex-item {
  flex: 0 0 calc(33.333% - 20px);
  margin: 10px;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 5px;
}

/* Media Queries for Responsive Design */
@media (max-width: 768px) {
  .flex-item {
    flex: 0 0 calc(50% - 20px);
  }
}

@media (max-width: 480px) {
  .flex-item {
    flex: 0 0 100%;
  }
}`,

    `/* CSS Animation Example */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animated-element {
  opacity: 0;
  animation: fadeIn 0.8s ease-in-out forwards;
}

.button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #2980b9;
}`
  ],
  
  java: [
    `public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            // Check if target is at mid
            if (arr[mid] == target) {
                return mid;
            }
            
            // If target is greater, ignore left half
            if (arr[mid] < target) {
                left = mid + 1;
            } 
            // If target is smaller, ignore right half
            else {
                right = mid - 1;
            }
        }
        
        // Element not found
        return -1;
    }
    
    public static void main(String[] args) {
        int[] arr = {2, 3, 4, 10, 40};
        int target = 10;
        int result = binarySearch(arr, target);
        
        if (result == -1) {
            System.out.println("Element not found");
        } else {
            System.out.println("Element found at index " + result);
        }
    }
}`,

    `import java.util.ArrayList;
import java.util.List;

class Student {
    private String name;
    private int id;
    private double gpa;
    
    public Student(String name, int id, double gpa) {
        this.name = name;
        this.id = id;
        this.gpa = gpa;
    }
    
    public String getName() {
        return name;
    }
    
    public int getId() {
        return id;
    }
    
    public double getGpa() {
        return gpa;
    }
    
    @Override
    public String toString() {
        return "Student{name='" + name + "', id=" + id + ", gpa=" + gpa + '}';
    }
}`,

    `import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class ThreadPoolExample {
    public static void main(String[] args) {
        // Create a fixed thread pool with 5 threads
        ExecutorService executor = Executors.newFixedThreadPool(5);
        
        // Submit 10 tasks to the executor
        for (int i = 0; i < 10; i++) {
            final int taskId = i;
            executor.submit(() -> {
                System.out.println("Task " + taskId + " is running on thread " + 
                                   Thread.currentThread().getName());
                try {
                    // Simulate work
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
                System.out.println("Task " + taskId + " completed");
            });
        }
        
        // Shutdown the executor
        executor.shutdown();
        try {
            executor.awaitTermination(5, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            executor.shutdownNow();
        }
    }
}`
  ],
  
  csharp: [
    `using System;
using System.Collections.Generic;
using System.Linq;

namespace LINQExample
{
    class Program
    {
        static void Main(string[] args)
        {
            // Sample collection of data
            List<int> numbers = new List<int> { 5, 10, 15, 20, 25, 30, 35 };

            // Using LINQ to filter and transform data
            var evenNumbers = numbers
                .Where(n => n % 2 == 0)
                .Select(n => n * 2)
                .ToList();

            Console.WriteLine("Doubled even numbers:");
            foreach (var num in evenNumbers)
            {
                Console.WriteLine(num);
            }
        }
    }
}`,

    `using System;

namespace ShapeCalculator
{
    // Abstract base class
    abstract class Shape
    {
        public abstract double CalculateArea();
        public abstract double CalculatePerimeter();
    }

    // Circle implementation
    class Circle : Shape
    {
        public double Radius { get; set; }

        public Circle(double radius)
        {
            Radius = radius;
        }

        public override double CalculateArea()
        {
            return Math.PI * Radius * Radius;
        }

        public override double CalculatePerimeter()
        {
            return 2 * Math.PI * Radius;
        }
    }`,

    `using System;
using System.Threading.Tasks;

namespace AsyncAwaitExample
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("Starting async operations...");
            
            Task<int> task1 = LongRunningOperation(1, 2000);
            Task<int> task2 = LongRunningOperation(2, 1000);
            Task<int> task3 = LongRunningOperation(3, 3000);
            
            // Wait for all tasks to complete and get their results
            await Task.WhenAll(task1, task2, task3);
            
            int result1 = await task1;
            int result2 = await task2;
            int result3 = await task3;
            
            Console.WriteLine($"Results: {result1}, {result2}, {result3}");
        }
        
        static async Task<int> LongRunningOperation(int id, int delayMs)
        {
            Console.WriteLine($"Operation {id} starting...");
            await Task.Delay(delayMs);
            Console.WriteLine($"Operation {id} completed after {delayMs}ms");
            return id * 10;
        }
    }
}`
  ]
};
