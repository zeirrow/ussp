    const featherIcons = `
        <symbol id="users" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <path d="M20 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="15.5" cy="7" r="4"></circle>
        </symbol>
        <symbol id="barber-shop" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <path d="M14.5 19.5h-5M8.5 22h7"></path>
            <path d="M12 17V2a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4"></path>
            <path d="M10 21a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-2"></path>
        </symbol>
        <symbol id="camera" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <path d="M15 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
            <path d="M10.5 5.5a2.5 2.5 0 0 0-5 0"></path>
            <path d="M18.5 5.5a2.5 2.5 0 0 0-5 0"></path>
            <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3.5a2.5 2.5 0 0 1 5 0h3.5a2 2 0 0 1 2 2v10z"></path>
        </symbol>
        <symbol id="desktop" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
        </symbol>
    `;
    document.body.insertAdjacentHTML('afterbegin', `<svg class="hidden">${featherIcons}</svg>`);
    
    // Animation for fade-in elements
    document.addEventListener('DOMContentLoaded', function() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const fadeInOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const fadeInObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, fadeInOptions);
        
        fadeElements.forEach(element => {
            fadeInObserver.observe(element);
        });
    });
