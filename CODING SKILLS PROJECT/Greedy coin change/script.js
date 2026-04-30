// DOM Elements
const amountInput = document.getElementById('amount');
const denomInput = document.getElementById('denominations');
const calculateBtn = document.getElementById('calculate-btn');
const resetBtn = document.getElementById('reset-btn');
const errorMessage = document.getElementById('error-message');
const outputSection = document.getElementById('output-section');
const compareDpToggle = document.getElementById('compare-dp');
const dpResultCard = document.getElementById('dp-result-card');

// Greedy Elements
const greedyTotalCoins = document.getElementById('greedy-total-coins');
const greedyTableBody = document.getElementById('greedy-table-body');
const greedySteps = document.getElementById('greedy-steps');

// DP Elements
const dpTotalCoins = document.getElementById('dp-total-coins');
const dpTableBody = document.getElementById('dp-table-body');

// Event Listeners
calculateBtn.addEventListener('click', handleCalculate);
resetBtn.addEventListener('click', resetApp);
amountInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') handleCalculate();
});
denomInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') handleCalculate();
});
compareDpToggle.addEventListener('change', function() {
    if(!outputSection.classList.contains('hidden')) {
        handleCalculate(); // Recalculate if results are already showing
    }
});

/**
 * Validates the user inputs (Amount and Denominations)
 * @returns {Object|null} Valid {amount, denoms} or null if invalid
 */
function validateInput() {
    const amountVal = amountInput.value.trim();
    const amount = parseInt(amountVal, 10);

    if (amountVal === '' || isNaN(amount) || amount <= 0) {
        showError("Please enter a valid positive amount.");
        return null;
    }

    const denomsVal = denomInput.value.trim();
    if (denomsVal === '') {
        showError("Please enter coin denominations.");
        return null;
    }

    // Parse comma separated values
    const denoms = denomsVal.split(',')
        .map(s => parseInt(s.trim(), 10))
        .filter(n => !isNaN(n) && n > 0);

    if (denoms.length === 0) {
        showError("Please enter valid positive numbers for denominations.");
        return null;
    }

    // Sort descending
    denoms.sort((a, b) => b - a);

    hideError();
    return { amount, denoms };
}

/**
 * Implements the Greedy Algorithm for coin change
 * @param {number} amount 
 * @param {number[]} denoms Array of denominations sorted descending
 * @returns {Object} Result containing breakdown, total coins, steps, error
 */
function getGreedyChange(amount, denoms) {
    let remainingAmount = amount;
    const result = {};
    const steps = [];
    let totalCoins = 0;

    for (let i = 0; i < denoms.length; i++) {
        const coin = denoms[i];
        if (remainingAmount >= coin) {
            const count = Math.floor(remainingAmount / coin);
            result[coin] = count;
            totalCoins += count;
            remainingAmount -= count * coin;
            
            steps.push(`Take ${count} coin/note${count > 1 ? 's' : ''} of ${coin} &rarr; Remaining ${remainingAmount}`);
        }
        if (remainingAmount === 0) break;
    }

    if (remainingAmount > 0) {
        return { error: `Exact change cannot be formed with given coins. Remaining amount: ${remainingAmount}` };
    }

    return { result, totalCoins, steps };
}

/**
 * Implements the Dynamic Programming Algorithm for coin change
 * @param {number} amount 
 * @param {number[]} denoms Array of denominations sorted descending
 * @returns {Object} Result containing breakdown and total coins
 */
function getDPChange(amount, denoms) {
    const dp = new Array(amount + 1).fill(Infinity);
    const coinUsed = new Array(amount + 1).fill(-1);
    
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (let j = 0; j < denoms.length; j++) {
            const coin = denoms[j];
            if (coin <= i && dp[i - coin] + 1 < dp[i]) {
                dp[i] = dp[i - coin] + 1;
                coinUsed[i] = coin;
            }
        }
    }

    if (dp[amount] === Infinity) {
        return { error: "Exact change cannot be formed with given coins." };
    }

    const result = {};
    let totalCoins = dp[amount];
    let currAmount = amount;

    // Trace back to find which coins were used
    while (currAmount > 0) {
        const coin = coinUsed[currAmount];
        result[coin] = (result[coin] || 0) + 1;
        currAmount -= coin;
    }

    // Sort result descending
    const sortedResult = {};
    denoms.forEach(coin => {
        if(result[coin]) sortedResult[coin] = result[coin];
    });

    return { result: sortedResult, totalCoins };
}

/**
 * Main function to handle the calculation and UI update
 */
function handleCalculate() {
    const inputs = validateInput();
    if (inputs === null) return;

    const { amount, denoms } = inputs;

    // 1. Calculate using Greedy
    const greedyData = getGreedyChange(amount, denoms);
    
    if (greedyData.error) {
        showError(greedyData.error);
        return;
    }

    // 2. Display Greedy Results
    displayResult(greedyData.result, greedyData.totalCoins, greedyData.steps, greedyTableBody, greedyTotalCoins);
    renderSteps(greedyData.steps);

    // 3. Handle DP Toggle
    if (compareDpToggle.checked) {
        const dpData = getDPChange(amount, denoms);
        if (dpData.error) {
            displayResult({}, "N/A", [], dpTableBody, dpTotalCoins);
            dpTotalCoins.innerText = dpData.error;
        } else {
            displayResult(dpData.result, dpData.totalCoins, [], dpTableBody, dpTotalCoins);
        }
        dpResultCard.classList.remove('hidden');
    } else {
        dpResultCard.classList.add('hidden');
    }

    // Show output section
    outputSection.classList.remove('hidden');
}

/**
 * Renders the result into the specified table and total elements
 */
function displayResult(resultDict, total, steps, tableBodyObj, totalCoinsObj) {
    totalCoinsObj.innerText = total;
    tableBodyObj.innerHTML = '';

    for (const [coin, count] of Object.entries(resultDict).sort((a,b) => b[0] - a[0])) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${coin}</td>
            <td>${count}</td>
        `;
        tableBodyObj.appendChild(row);
    }
}

/**
 * Renders the step-by-step breakdown
 */
function renderSteps(steps) {
    greedySteps.innerHTML = '';
    steps.forEach(step => {
        const li = document.createElement('li');
        li.innerHTML = step;
        greedySteps.appendChild(li);
    });
}

/**
 * Shows error message
 */
function showError(msg) {
    errorMessage.innerText = msg;
    errorMessage.classList.remove('hidden');
    outputSection.classList.add('hidden');
}

/**
 * Hides error message
 */
function hideError() {
    errorMessage.classList.add('hidden');
}

/**
 * Resets the application to initial state
 */
function resetApp() {
    amountInput.value = '';
    denomInput.value = '1, 3, 4';
    compareDpToggle.checked = false;
    hideError();
    outputSection.classList.add('hidden');
    dpResultCard.classList.add('hidden');
}
