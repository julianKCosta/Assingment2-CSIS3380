const itemsPerPage = 10; // Change this to your desired number of items per page
let currentPage = 1; // Keep track of the current page

// A function that divides the users array into subarrays
function paginate(array, size) {
  let result = [];
  for (let i = 0; i < array.length; i += size) {
    let chunk = array.slice(i, i + size);
    result.push(chunk);
  }
  return result;
}

// A function that renders the pagination links
function renderPagination(pages) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = ''; // Clear any existing content

  for (let i = 0; i < pages.length; i++) {
    
    let button = document.createElement('button');
    button.innerText = i + 1; // Set the button text to the page 
    
    button.addEventListener('click', () => {
      currentPage = i + 1; // Update the current page
      renderUsers(pages[i]); // Display the users for that page
      renderPagination(pages); // Update the pagination links
    });
    if (i + 1 === currentPage) {
      button.classList.add('active'); // Add a class of active to the current page button
    }
    pagination.appendChild(button); // Append the button to the pagination div
  }
}

// A function that displays the users for a given page
function renderUsers(page) {
  const list = document.querySelector('.contact-list');
  list.innerHTML = ''; // Clear any existing content
  
  for (let user of page) {
    let item = document.createElement('li');
    item.classList.add('contact-item', 'cf'); // Add some classes to the list item
    item.innerHTML = `
      <div class="contact-details">
        <img class="avatar" src="${user.image}">
        <h3>${user.name}</h3>
        <span class="email">${user.email}</span>
      </div>
      <div class="joined-details">
        <span class="date">Joined ${user.joined}</span>
      </div>
    `; // Set the inner HTML of the list item to display the user information
    list.appendChild(item); // Append the list item to the list
  }
}
// A function that renders the pagination links
function renderPagination(pages) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = ''; // Clear any existing content

  // Add a "previous" button
  let prevButton = document.createElement('button');
  prevButton.innerText = 'Previous';
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderUsers(pages[currentPage - 1]);
      renderPagination(pages);
    }
  });
  pagination.appendChild(prevButton);

  for (let i = 0; i < pages.length; i++) {
    let button = document.createElement('button');
    button.innerText = i + 1; // Set the button text to the page number
    
    button.addEventListener('click', () => {
      currentPage = i + 1; // Update the current page
      renderUsers(pages[i]); // Display the users for that page
      renderPagination(pages); // Update the pagination links
    });
    
    if (i + 1 === currentPage) {
      button.classList.add('active'); // Add a class of active to the current page button
    }
    
    pagination.appendChild(button); // Append the button to the pagination div
  }

  // Add a "next" button
  let nextButton = document.createElement('button');
  nextButton.innerText = 'Next';
  nextButton.addEventListener('click', () => {
    if (currentPage < pages.length) {
      currentPage++;
      renderUsers(pages[currentPage - 1]);
      renderPagination(pages);
    }
  });
  pagination.appendChild(nextButton);
}

// Initial render
const pages = paginate(users, itemsPerPage); // Divide the users into pages
renderUsers(pages[0]); // Display the first page of users
renderPagination(pages); // Display the pagination links

// Set total count
const totalCount = document.querySelector('.total');
totalCount.innerHTML = users.length;