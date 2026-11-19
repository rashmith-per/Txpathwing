const SQL=[
{id:"s1",lv:"Easy",t:"Students from Hyderabad",topic:"SELECT and WHERE",d:"Table students(id, name, city). Return the names of students whose city is Hyderabad, sorted A to Z.",c:["Use WHERE and ORDER BY","Return one column: name"],dflt:"(no rows)",
 code:`-- Table: students(id, name, city)

SELECT
    -- write your solution here
;`,
 stub:"SELECT\n    -- write your solution here\n;",
 sol:`SELECT name
FROM students
WHERE city = 'Hyderabad'
ORDER BY name;`,
 tests:[["1 Asha Hyderabad\n2 Ravi Pune\n3 Kiran Hyderabad","Asha\nKiran"],["1 Meera Chennai\n2 Zoya Hyderabad\n3 Arun Hyderabad","Arun\nZoya"],["1 Dev Pune","(no rows)"]]},
{id:"s2",lv:"Medium",t:"Busy Students",topic:"GROUP BY and HAVING",d:"Table enrollments(student_id, course_id). Return student_id and the number of courses for every student enrolled in 2 or more courses. Sort by count (highest first), then by student_id.",c:["Use GROUP BY with HAVING","Columns: student_id, total"],dflt:"(no rows)",
 code:`-- Table: enrollments(student_id, course_id)

SELECT
    -- write your solution here
;`,
 stub:"SELECT\n    -- write your solution here\n;",
 sol:`SELECT student_id, COUNT(*) AS total
FROM enrollments
GROUP BY student_id
HAVING COUNT(*) >= 2
ORDER BY total DESC, student_id;`,
 tests:[["1 10\n1 11\n2 10\n3 10\n3 11\n3 12","3 3\n1 2"],["5 1\n6 2","(no rows)"],["4 7\n4 8\n9 7\n9 8","4 2\n9 2"]]},
{id:"s3",lv:"Hard",t:"Top Scorer per Course",topic:"Window functions",d:"Table scores(student, course, marks). For every course, return the student or students with the highest marks. Show ties. Sort by course, then student.",c:["Use RANK() OVER (PARTITION BY ...)","Columns: course, student"],dflt:"(no rows)",
 code:`-- Table: scores(student, course, marks)

SELECT
    -- write your solution here
;`,
 stub:"SELECT\n    -- write your solution here\n;",
 sol:`SELECT course, student
FROM (
    SELECT course, student,
           RANK() OVER (PARTITION BY course ORDER BY marks DESC) AS r
    FROM scores
) t
WHERE r = 1
ORDER BY course, student;`,
 tests:[["Asha SQL 90\nRavi SQL 85\nAsha Java 70\nKiran Java 95","Java Kiran\nSQL Asha"],["Meera AWS 80\nZoya AWS 80","AWS Meera\nAWS Zoya"],["Dev React 60","React Dev"]]}
];
const REACT=[
{id:"r1",lv:"Easy",t:"Counter Component",topic:"useState",d:"Build a Counter with a minus button, the current count and a plus button. The count starts at 0 and must never go below 0.",c:["Use the useState hook","Show the count inside an element with data-testid=count"],dflt:"(empty render)",
 code:`import { useState } from "react";

export default function Counter() {
  // write your solution here
  return <div />;
}`,
 stub:"  // write your solution here\n  return <div />;",
 sol:`  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => Math.max(0, c - 1))}>-</button>
      <span data-testid="count">{count}</span>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </div>
  );`,
 tests:[["Click + 3 times","count = 3"],["Click + 2 times, then - 1 time","count = 1"],["Click - 1 time","count = 0"]]},
{id:"r2",lv:"Medium",t:"useToggle Hook",topic:"Custom hooks",d:"Write a custom hook useToggle(initial = false) that returns [value, toggle]. Calling toggle flips the value.",c:["Use useState and useCallback","toggle must keep the same identity between renders"],dflt:"false",
 code:`import { useState, useCallback } from "react";

export function useToggle(initial = false) {
  // write your solution here
  return [false, () => {}];
}`,
 stub:"  // write your solution here\n  return [false, () => {}];",
 sol:`  const [on, setOn] = useState(initial);
  const toggle = useCallback(() => setOn((v) => !v), []);
  return [on, toggle];`,
 tests:[["useToggle(), call toggle() once","true"],["useToggle(), call toggle() twice","false"],["useToggle(true), call toggle() once","false"]]},
{id:"r3",lv:"Hard",t:"useDebounce Hook",topic:"useEffect cleanup",d:"Write useDebounce(value, delay). It returns the latest value only after it has stopped changing for delay milliseconds.",c:["Clear the timer on every change","Clean up when the component unmounts"],dflt:"'ab'",
 code:`import { useState, useEffect } from "react";

export function useDebounce(value, delay) {
  // write your solution here
  return value;
}`,
 stub:"  // write your solution here\n  return value;",
 sol:`  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;`,
 tests:[["delay 300. Value changes a to ab. Read after 100 ms","'a'"],["delay 300. Value changes a to ab. Read after 300 ms","'ab'"],["delay 300. Value changes a, ab, abc every 100 ms. Read 300 ms after the last change","'abc'"]]}
];
const DSA=[
{id:"d1",lv:"Easy",t:"Reverse an Array",topic:"Arrays",d:"Read n and then n integers. Print the integers in reverse order, separated by spaces.",c:["1 ≤ n ≤ 10⁵","Do it with one loop"],dflt:"1 2 3",
 code:`import java.util.*;

public class Main {
    static int[] reverse(int[] a) {
        // write your solution here
        return a;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        StringJoiner sj = new StringJoiner(" ");
        for (int x : reverse(a)) sj.add(String.valueOf(x));
        System.out.println(sj);
    }
}`,
 stub:"        // write your solution here\n        return a;",
 sol:`        int[] r = new int[a.length];
        for (int i = 0; i < a.length; i++) r[a.length - 1 - i] = a[i];
        return r;`,
 tests:[["5\n1 2 3 4 5","5 4 3 2 1"],["3\n7 7 9","9 7 7"],["1\n4","4"]]},
{id:"d2",lv:"Medium",t:"Number of Islands",topic:"Graphs and DFS",d:"A grid of 0 and 1 is given. An island is a group of 1s connected up, down, left or right. Print how many islands there are.",c:["1 ≤ rows, columns ≤ 300","Diagonals do not connect"],dflt:"0",
 code:`import java.util.*;

public class Main {
    static int islands(char[][] g) {
        // write your solution here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt(), c = sc.nextInt();
        char[][] g = new char[r][];
        for (int i = 0; i < r; i++) g[i] = sc.next().toCharArray();
        System.out.println(islands(g));
    }
}`,
 stub:"        // write your solution here\n        return 0;",
 sol:`        int cnt = 0;
        for (int i = 0; i < g.length; i++)
            for (int j = 0; j < g[0].length; j++)
                if (g[i][j] == '1') { cnt++; sink(g, i, j); }
        return cnt;
    }

    static void sink(char[][] g, int i, int j) {
        if (i < 0 || j < 0 || i >= g.length || j >= g[0].length || g[i][j] != '1') return;
        g[i][j] = '0';
        sink(g, i + 1, j); sink(g, i - 1, j); sink(g, i, j + 1); sink(g, i, j - 1);`,
 tests:[["3 3\n110\n010\n001","2"],["2 2\n11\n11","1"],["2 3\n101\n010","3"]]},
{id:"d3",lv:"Hard",t:"Shortest Path (Dijkstra)",topic:"Weighted graphs",d:"Read n nodes and m undirected edges, each as u v weight. Then read a source and a target. Print the length of the shortest path, or -1 if the target cannot be reached.",c:["1 ≤ n ≤ 10⁴, 0 ≤ m ≤ 5·10⁴","Weights are positive","Use a priority queue"],dflt:"-1",
 code:`import java.util.*;

public class Main {
    static int shortest(int n, List<int[]> edges, int s, int t) {
        // write your solution here
        return -1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), m = sc.nextInt();
        List<int[]> edges = new ArrayList<>();
        for (int i = 0; i < m; i++) edges.add(new int[]{sc.nextInt(), sc.nextInt(), sc.nextInt()});
        System.out.println(shortest(n, edges, sc.nextInt(), sc.nextInt()));
    }
}`,
 stub:"        // write your solution here\n        return -1;",
 sol:`        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(new int[]{e[1], e[2]});
            adj.get(e[1]).add(new int[]{e[0], e[2]});
        }
        int[] dist = new int[n + 1];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[s] = 0;
        PriorityQueue<int[]> pq = new PriorityQueue<>((x, y) -> x[1] - y[1]);
        pq.add(new int[]{s, 0});
        while (!pq.isEmpty()) {
            int[] cur = pq.poll();
            if (cur[1] > dist[cur[0]]) continue;
            for (int[] nb : adj.get(cur[0])) {
                int nd = cur[1] + nb[1];
                if (nd < dist[nb[0]]) { dist[nb[0]] = nd; pq.add(new int[]{nb[0], nd}); }
            }
        }
        return dist[t] == Integer.MAX_VALUE ? -1 : dist[t];`,
 tests:[["4 4\n1 2 1\n2 3 2\n1 3 5\n3 4 1\n1 4","4"],["3 1\n1 2 4\n1 3","-1"],["2 1\n1 2 7\n2 1","7"]]}
];
const COURSES=[
{id:"java",name:"Java Programming",ic:"Jv",lang:"Java 17",file:"Main.java",blurb:"Core Java, OOP and collections, with problems from basics to advanced.",P:JAVA},
{id:"python",name:"Python for Developers",ic:"Py",lang:"Python 3",file:"main.py",blurb:"Python fundamentals, data structures and problem solving.",P:PY},
{id:"aws",name:"AWS Cloud Practitioner",ic:"AWS",lang:"Python 3",file:"main.py",blurb:"Cloud basics, EC2, S3, IAM and core AWS services.",P:AWS},
{id:"sql",name:"SQL & Databases",ic:"SQL",lang:"PostgreSQL",file:"query.sql",blurb:"Queries, joins, indexing and window functions.",P:SQL},
{id:"react",name:"React Fundamentals",ic:"Re",lang:"JavaScript / React",file:"App.jsx",blurb:"Components, hooks and state management.",P:REACT},
{id:"dsa",name:"Data Structures",ic:"DS",lang:"Java 17",file:"Main.java",blurb:"Arrays, trees, graphs and complexity analysis.",P:DSA}
];


export { SQL, REACT, DSA, COURSES };
