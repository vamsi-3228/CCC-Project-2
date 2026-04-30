# Smart Coin Change Calculator

A web-based tool that calculates the minimum number of coins/notes needed for a given amount using the **Greedy Algorithm**, with an option to compare against the **optimal Dynamic Programming (DP)** solution.

Also includes a C++ console version of the same greedy logic.

---

## Features

- Enter any amount and custom coin denominations
- Greedy algorithm shows step-by-step breakdown
- Toggle to compare Greedy vs DP (optimal) results side by side
- Highlights cases where Greedy fails to give the optimal answer
- Clean, responsive UI

---

## Project Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Styling and layout
├── script.js           # Greedy + DP logic and UI interactions
└── greedy_coin_change.cpp  # C++ console version of greedy algorithm
```

---

## How to Run

### Web Version
Just open `index.html` in any browser. No setup needed.

```bash
# Or serve it locally
npx serve .
```

### C++ Version

```bash
g++ greedy_coin_change.cpp -o coin_change
./coin_change
```

---

## Algorithms Used

### Greedy
Picks the largest denomination possible at each step. Fast and simple, but **not always optimal** for arbitrary coin sets.

**Example where Greedy fails:**
- Amount: `6`, Denominations: `1, 3, 4`
- Greedy picks: `4 + 1 + 1` = **3 coins**
- Optimal (DP): `3 + 3` = **2 coins**

### Dynamic Programming (DP)
Builds up the optimal solution from the bottom, guaranteeing the minimum number of coins every time. Time complexity: `O(amount × denominations)`.

---

## Demo

| Input | Greedy Result | DP Result |
|-------|--------------|-----------|
| Amount: 6, Denoms: 1,3,4 | 3 coins (4+1+1) | 2 coins (3+3) |
| Amount: 11, Denoms: 1,5,6,9 | 3 coins (9+1+1) | 2 coins (6+5) |

---

## Tech Stack

- HTML, CSS, Vanilla JavaScript
- C++ (console version)
- No external libraries or frameworks

---

## Course Context

This project was built as part of a **Computing and Computational Concepts (CCC)** course assignment to demonstrate the difference between greedy and optimal approaches to the classic coin change problem.

---

## License

This project is open source and free to use.
