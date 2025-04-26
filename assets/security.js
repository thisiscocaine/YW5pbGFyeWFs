 // [Previous JavaScript content remains the same until the end]
        
        // Add these security measures at the end of the script
        
        // Disable right-click context menu
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });

        // Disable keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
            if (e.key === 'F12' || 
                (e.ctrlKey && e.shiftKey && e.key === 'I') || 
                (e.ctrlKey && e.shiftKey && e.key === 'J') || 
                (e.ctrlKey && e.key === 'u') ||
                (e.ctrlKey && e.key === 'U')) {
                e.preventDefault();
            }
        });

        // Prevent iframe embedding
        if (window.location !== window.parent.location) {
            window.top.location = window.location;
        }

        // Prevent opening in new tab
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && (e.key === 'n' || e.key === 'N')) {
                e.preventDefault();
            }
        });

        // Disable text selection (additional measure)
        document.addEventListener('selectstart', function(e) {
            e.preventDefault();
        });

        // Disable dragging images
        document.addEventListener('dragstart', function(e) {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
            }
        });

        // Initialize (keep this at the end)
        document.addEventListener('DOMContentLoaded', function() {
            createStars();
            setHeroBackground();
        });