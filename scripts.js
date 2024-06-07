document.addEventListener('DOMContentLoaded', function() {
    const clothingImages = document.querySelectorAll('.clothing');
    const largeClothing = document.getElementById('largeClothing');
    const colorPicker = document.getElementById('colorPicker');
    const patterns = document.querySelectorAll('.pattern');
    let selectedPattern = null;

    clothingImages.forEach(img => {
        img.addEventListener('click', function() {
            largeClothing.src = this.src;
            largeClothing.style.filter = ''; // Reset color
        });
    });

    colorPicker.addEventListener('input', function() {
        if (largeClothing.src) {
            largeClothing.style.filter = `hue-rotate(${this.value}deg)`;
        }
    });

    patterns.forEach(pattern => {
        pattern.addEventListener('dragstart', function(e) {
            selectedPattern = this;
        });
    });

    document.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    document.addEventListener('drop', function(e) {
        if (selectedPattern && e.target === largeClothing) {
            const newPattern = selectedPattern.cloneNode(true);
            newPattern.style.position = 'absolute';
            newPattern.style.left = `${e.clientX - largeClothing.offsetLeft}px`;
            newPattern.style.top = `${e.clientY - largeClothing.offsetTop}px`;
            newPattern.draggable = true;
            enablePatternInteraction(newPattern);
            largeClothing.parentElement.appendChild(newPattern);
        }
    });

    function enablePatternInteraction(pattern) {
        pattern.addEventListener('click', function() {
            const patternColorPicker = document.createElement('input');
            patternColorPicker.type = 'color';
            patternColorPicker.value = '#ff0000';
            patternColorPicker.style.position = 'absolute';
            patternColorPicker.style.left = `${pattern.offsetLeft}px`;
            patternColorPicker.style.top = `${pattern.offsetTop + pattern.offsetHeight}px`;
            pattern.parentElement.appendChild(patternColorPicker);

            patternColorPicker.addEventListener('input', function() {
                pattern.style.filter = `hue-rotate(${this.value}deg)`;
            });

            pattern.addEventListener('dragstart', function() {
                patternColorPicker.remove();
            });
        });

        pattern.addEventListener('dblclick', function() {
            pattern.remove();
        });
    }
});
