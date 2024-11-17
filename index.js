document.addEventListener("DOMContentLoaded", () => {
    let totalBudget = 0;
    let totalExpenses = 0;
  
    const budgetInput = document.querySelector('.budget input[type="number"]');
    const expenseTitleInput = document.querySelector('.expenses input[type="text"]');
    const expenseCostInput = document.querySelector('.expenses input[type="number"]');
    const setBudgetButton = document.querySelector('.budget button');
    const checkAmountButton = document.querySelector('.expenses button');
    
    const totalBudgetDisplay = document.getElementById('total-budget');
    const expensesAmountDisplay = document.getElementById('expenses-amuont');
    const balanceAmountDisplay = document.getElementById('balance-amount');
    const expenseListContainer = document.getElementById('list');
  
    // Set the total budget
    setBudgetButton.addEventListener('click', () => {
      const budgetValue = parseFloat(budgetInput.value);
      if (isNaN(budgetValue) || budgetValue < 0) {
        alert("Please enter a valid budget amount (positive value).");
        budgetInput.focus(); // Focus on the budget input
        return;
      }
      
      totalBudget = budgetValue;
      totalBudgetDisplay.textContent = totalBudget;
      updateBalance();
      budgetInput.value = ''; // Clear input
    });
  
    // Add an expense
    checkAmountButton.addEventListener('click', () => {
      const expenseTitle = expenseTitleInput.value.trim();
      const expenseCost = parseFloat(expenseCostInput.value);
      
      if (expenseTitle === "") {
        alert("Please enter a title for the expense.");
        expenseTitleInput.focus(); // Focus on the title input
        return;
      }
      
      if (isNaN(expenseCost) || expenseCost <= 0) {
        alert("Please enter a valid cost for the expense (positive value).");
        expenseCostInput.focus(); // Focus on the cost input
        return;
      }
  
      // Check if adding this expense exceeds the budget
      if (totalExpenses + expenseCost > totalBudget) {
        alert("Adding this expense exceeds your budget. Please adjust the amount.");
        expenseCostInput.focus(); // Focus on the cost input
        return;
      }
  
      // Update total expenses
      totalExpenses += expenseCost;
      expensesAmountDisplay.textContent = totalExpenses;
      
      // Add expense to the list
      const expenseItem = document.createElement('div');
      expenseItem.textContent = `${expenseTitle}: Ksh${expenseCost.toFixed(2)}`;
      expenseListContainer.appendChild(expenseItem);
  
      // Update balance
      updateBalance();
  
      // Clear inputs
      expenseTitleInput.value = '';
      expenseCostInput.value = '';
    });
  
    // Function to update the balance
    function updateBalance() {
      const balance = totalBudget - totalExpenses;
      balanceAmountDisplay.textContent = balance < 0 ? "0" : balance.toFixed(2);
    }
  });