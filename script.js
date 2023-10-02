document.addEventListener('DOMContentLoaded', (event) => {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            // Hide all tab contents
            contents.forEach(content => content.style.display = 'none');
            
            // Deselect all tabs
            tabs.forEach(tab => tab.classList.remove('active'));
            
            // Show the clicked tab content
            contents[index].style.display = 'block';
            
            // Mark the clicked tab as active
            tab.classList.add('active');
        });
    });
});
