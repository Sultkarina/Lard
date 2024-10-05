import "../scss/style.scss";

document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-button");
  const citizenshipSelect = document.getElementById("citizenship");
  const checkboxes = document.querySelectorAll(".filter-form__checkbox");
  const employees = document.querySelectorAll(".employee");
  const filterForm = document.getElementById("filter-form"); 
  const resetButton = document.querySelector(".filter-form__reset"); 

  function filterEmployees() {
    const selectedCountry = citizenshipSelect.value;
    const selectedContracts = Array.from(checkboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
    
    const activeButton = document.querySelector('.filter-button.active');
    const filterType = activeButton ? activeButton.classList[1].split("--")[1] : "all";

    employees.forEach(employee => {
      const employeeRow = employee.querySelector(".employee__row");
      const employeeCountry = employee.querySelector(".employee__photo").getAttribute("alt");
      const employeeContract = employee.querySelector(".employee__department").getAttribute("data-value");

  
      const matchesCountry = selectedCountry === "all" || employeeCountry === selectedCountry;
      const matchesContract = selectedContracts.length === 0 || selectedContracts.includes(employeeContract);
      const matchesButton = filterType === "all" || employeeRow.classList.contains(`employee__row--${filterType}`);


      if (matchesCountry && matchesContract && matchesButton) {
        employee.style.display = "flex";
      } else {
        employee.style.display = "none";
      }
    });
  }


  filterButtons.forEach(button => {
    button.addEventListener("click", function () {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");
      filterEmployees(); 
    });
  });


  citizenshipSelect.addEventListener("change", filterEmployees);


  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterEmployees);
  });


  resetButton.addEventListener("click", function () {

    citizenshipSelect.value = "all"; 
    filterButtons.forEach(btn => btn.classList.remove("active"));
    checkboxes.forEach(checkbox => checkbox.checked = false);
    
    
    employees.forEach(employee => {
      employee.style.display = "flex"; 
    });
  });

  
  filterForm.addEventListener("reset", function () {
   
    setTimeout(() => {
      resetButton.click(); 
    }, 0);
  });
});


document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-input");
    const searchButton = document.querySelector(".search-button");
    const employees = document.querySelectorAll(".employee");
  
   
    function filterEmployeesBySearch() {
      const searchText = searchInput.value.toLowerCase().trim();
  
      employees.forEach(employee => {
        const employeeName = employee.querySelector(".employee__name").textContent.toLowerCase();
  

        if (employeeName.includes(searchText)) {
          employee.style.display = "flex";
        } else {
          employee.style.display = "none";
        }
      });
    }
  

    searchButton.addEventListener("click", function (e) {
      e.preventDefault();
      filterEmployeesBySearch();
    });
  

    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        filterEmployeesBySearch();
      }
    });
});
