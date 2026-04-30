#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cout << "Enter number of coin denominations: ";
    cin >> n;

    vector<int> coins(n);

    cout << "Enter coin denominations:\n";
    for (int i = 0; i < n; i++) {
        cin >> coins[i];
    }

    int amount;
    cout << "Enter amount: ";
    cin >> amount;

    // Sort coins in descending order (important for greedy)
    sort(coins.begin(), coins.end(), greater<int>());

    cout << "\nCoins used:\n";

    int totalCoins = 0;

    for (int coin : coins) {
        if (amount >= coin) {
            int count = amount / coin;
            amount = amount % coin;

            cout << coin << " -> " << count << "\n";
            totalCoins += count;
        }
    }

    // Check if exact change is possible
    if (amount != 0) {
        cout << "\nExact change cannot be formed with given coins.\n";
    } else {
        cout << "\nTotal coins used: " << totalCoins << "\n";
    }

    return 0;
}
