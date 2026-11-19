// Coding lab problems data
const JAVA=[
{id:"j1",lv:"Easy",t:"Palindrome Check",topic:"Strings",d:"Read one line of text. Print true if it reads the same forwards and backwards, ignoring case, spaces and punctuation. Otherwise print false.",c:["1 ≤ length ≤ 10⁵","Letters, digits, spaces and punctuation"],dflt:"false",
 code:`import java.util.*;

public class Main {
    static boolean isPalindrome(String s) {
        // write your solution here
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println(isPalindrome(sc.nextLine()));
    }
}`,
 stub:"        // write your solution here\n        return false;",
 sol:`        String t = s.toLowerCase().replaceAll("[^a-z0-9]", "");
        return new StringBuilder(t).reverse().toString().equals(t);`,
 tests:[["racecar","true"],["hello","false"],["A man, a plan, a canal: Panama","true"]]},
{id:"j2",lv:"Medium",t:"Maximum Subarray",topic:"Dynamic programming",d:"Find the contiguous subarray with the largest sum and print that sum.",c:["1 ≤ n ≤ 10⁵","Values may be negative"],dflt:"0",
 code:`import java.util.*;

public class Main {
    static long maxSum(int[] a) {
        // write your solution here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(maxSum(a));
    }
}`,
 stub:"        // write your solution here\n        return 0;",
 sol:`        long best = a[0], cur = a[0];
        for (int i = 1; i < a.length; i++) {
            cur = Math.max(a[i], cur + a[i]);
            best = Math.max(best, cur);
        }
        return best;`,
 tests:[["9\n-2 1 -3 4 -1 2 1 -5 4","6"],["1\n5","5"],["3\n-3 -1 -2","-1"]]},
{id:"j3",lv:"Hard",t:"Trapping Rain Water",topic:"Two pointers",d:"Each number is the height of a bar of width 1. Print how many units of water are trapped between the bars after rain.",c:["1 ≤ n ≤ 2·10⁴","Target O(n) time, O(1) space"],dflt:"0",
 code:`import java.util.*;

public class Main {
    static int trap(int[] h) {
        // write your solution here
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] h = new int[n];
        for (int i = 0; i < n; i++) h[i] = sc.nextInt();
        System.out.println(trap(h));
    }
}`,
 stub:"        // write your solution here\n        return 0;",
 sol:`        int l = 0, r = h.length - 1, lm = 0, rm = 0, w = 0;
        while (l < r) {
            if (h[l] < h[r]) { lm = Math.max(lm, h[l]); w += lm - h[l++]; }
            else { rm = Math.max(rm, h[r]); w += rm - h[r--]; }
        }
        return w;`,
 tests:[["12\n0 1 0 2 1 0 1 3 2 1 2 1","6"],["6\n4 2 0 3 2 5","9"],["3\n1 2 3","0"]]}
];
const PY=[
{id:"p1",lv:"Easy",t:"Sum of Even Numbers",topic:"Lists",d:"Read n and then n integers. Print the sum of the even numbers.",c:["1 ≤ n ≤ 10⁵","Integers fit in 32 bits"],dflt:"0",
 code:`def even_sum(nums):
    # write your solution here
    return 0


n = int(input())
nums = list(map(int, input().split()))
print(even_sum(nums))`,
 stub:"    # write your solution here\n    return 0",
 sol:"    return sum(x for x in nums if x % 2 == 0)",
 tests:[["5\n1 2 3 4 6","12"],["3\n1 3 5","0"],["4\n10 20 30 40","100"]]},
{id:"p2",lv:"Medium",t:"Valid Parentheses",topic:"Stacks",d:"A string contains only the brackets ( ) [ ] { }. Print true if every bracket is closed in the correct order, otherwise false.",c:["1 ≤ length ≤ 10⁴","Use a stack"],dflt:"false",
 code:`def is_valid(s):
    # write your solution here
    return False


print(str(is_valid(input().strip())).lower())`,
 stub:"    # write your solution here\n    return False",
 sol:`    pairs = {")": "(", "]": "[", "}": "{"}
    st = []
    for ch in s:
        if ch in pairs:
            if not st or st.pop() != pairs[ch]:
                return False
        else:
            st.append(ch)
    return not st`,
 tests:[["()[]{}","true"],["(]","false"],["{[()]}","true"]]},
{id:"p3",lv:"Hard",t:"Longest Increasing Subsequence",topic:"Binary search + DP",d:"Read n and then n integers. Print the length of the longest strictly increasing subsequence.",c:["1 ≤ n ≤ 10⁵","Target O(n log n)"],dflt:"0",
 code:`import bisect


def lis(nums):
    # write your solution here
    return 0


n = int(input())
print(lis(list(map(int, input().split()))))`,
 stub:"    # write your solution here\n    return 0",
 sol:`    tails = []
    for x in nums:
        i = bisect.bisect_left(tails, x)
        if i == len(tails):
            tails.append(x)
        else:
            tails[i] = x
    return len(tails)`,
 tests:[["8\n10 9 2 5 3 7 101 18","4"],["6\n0 1 0 3 2 3","4"],["4\n7 7 7 7","1"]]}
];
const AWS=[
{id:"a1",lv:"Easy",t:"S3 Bucket Name Validator",topic:"S3 naming rules",d:"Read a bucket name. Print valid if it has 3 to 63 characters, uses only lowercase letters, digits and hyphens, and starts and ends with a letter or digit. Otherwise print invalid.",c:["Length 1 to 100","No uppercase letters or underscores allowed"],dflt:"invalid",
 code:`import re


def is_valid_bucket(name):
    # write your solution here
    return False


print("valid" if is_valid_bucket(input().strip()) else "invalid")`,
 stub:"    # write your solution here\n    return False",
 sol:`    return re.fullmatch(r"[a-z0-9][a-z0-9-]{1,61}[a-z0-9]", name) is not None`,
 tests:[["my-bucket-01","valid"],["My_Bucket","invalid"],["ab","invalid"]]},
{id:"a2",lv:"Medium",t:"EC2 Instances by State",topic:"EC2 monitoring",d:"Read n lines of the form instance-id state. Print each state and how many instances are in it, sorted by state name.",c:["1 ≤ n ≤ 10⁴","States are single words such as running, stopped, pending"],dflt:"(no output)",
 code:`def count_states(lines):
    # write your solution here
    return {}


n = int(input())
lines = [input() for _ in range(n)]
for state, c in sorted(count_states(lines).items()):
    print(state, c)`,
 stub:"    # write your solution here\n    return {}",
 sol:`    res = {}
    for ln in lines:
        s = ln.split()[1]
        res[s] = res.get(s, 0) + 1
    return res`,
 tests:[["5\ni-1 running\ni-2 stopped\ni-3 running\ni-4 running\ni-5 stopped","running 3\nstopped 2"],["3\ni-1 stopped\ni-2 pending\ni-3 stopped","pending 1\nstopped 2"],["1\ni-9 running","running 1"]]},
{id:"a3",lv:"Hard",t:"IAM Policy Evaluator",topic:"IAM security",d:"Read n policy statements, each as Allow or Deny followed by an action pattern (a * matches anything). Then read one action. Print Deny if any Deny statement matches. Otherwise print Allow if any Allow statement matches. If nothing matches, print Deny.",c:["1 ≤ n ≤ 100","An explicit Deny always wins"],dflt:"Deny",
 code:`import fnmatch


def evaluate(stmts, action):
    # write your solution here
    return "Deny"


n = int(input())
stmts = [tuple(input().split()) for _ in range(n)]
print(evaluate(stmts, input().strip()))`,
 stub:"    # write your solution here\n    return \"Deny\"",
 sol:`    allowed = False
    for effect, pat in stmts:
        if fnmatch.fnmatch(action, pat):
            if effect == "Deny":
                return "Deny"
            allowed = True
    return "Allow" if allowed else "Deny"`,
 tests:[["2\nAllow s3:*\nDeny s3:DeleteObject\ns3:GetObject","Allow"],["2\nAllow s3:*\nDeny s3:DeleteObject\ns3:DeleteObject","Deny"],["1\nAllow ec2:Describe*\ns3:GetObject","Deny"]]}
];

export { JAVA, PY, AWS };
