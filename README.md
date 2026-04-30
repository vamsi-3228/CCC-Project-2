# CCC-Project-2
# Smart Coin Change Calculator

A web-based tool that calculates the minimum number of coins or notes needed for a given amount using the **Greedy Algorithm**, with an option to compare against the **optimal Dynamic Programming (DP)** solution.

It also includes a C++ console version of the same greedy logic.

---

## Features

* Enter any amount and custom coin denominations
* Greedy algorithm shows step-by-step breakdown
* Compare Greedy vs DP results side by side
* Highlights cases where Greedy fails
* Clean responsive UI

---

## Project Structure

```bash id="r2u3vz"
├── index.html
├── styles.css
├── script.js
└── greedy_coin_change.cpp
```

---

## How to Run

### Web Version

Open `index.html` in any browser.

```bash id="rc4af8"
npx serve .
```

### C++ Version

```bash id="w2jl7c"
g++ greedy_coin_change.cpp -o coin_change
./coin_change
```

---

## Algorithms Used

### Greedy Algorithm

Selects the largest denomination possible at each step.

**Example where Greedy fails:**

* Amount = 6
* Denominations = 1, 3, 4

Greedy result:

4 + 1 + 1 = 3 coins

Optimal result:

3 + 3 = 2 coins

---

### Dynamic Programming

Builds the optimal solution for every value from bottom-up.

Time Complexity:

`O(amount × denominations)`

---

## Demo

| Input                       | Greedy Result | DP Result |
| --------------------------- | ------------- | --------- |
| Amount: 6, Denoms: 1,3,4    | 3 coins       | 2 coins   |
| Amount: 11, Denoms: 1,5,6,9 | 3 coins       | 2 coins   |

---

## Tech Stack

* HTML
* CSS
* JavaScript
* C++

---

## Learning Purpose

This project demonstrates:

* Greedy strategy
* Dynamic Programming comparison
* Coin system optimization
* Algorithm behavior analysis

---

## License

Open source and free to use.
