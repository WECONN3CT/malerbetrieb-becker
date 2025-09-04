
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    const category = card.getAttribute('data-category');
                    if (category === filterValue) {
                        card.classList.remove('hidden');
                        card.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });

    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const image = this.querySelector('.project-image img');
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('.project-content p:not(.project-location)').textContent;
            
            createLightbox(image.src, title, description);
        });
    });
    
    function createLightbox(imageSrc, title, description) {

        const existingLightbox = document.querySelector('.lightbox');
        if (existingLightbox) {
            existingLightbox.remove();
        }

        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        
        const lightboxContent = document.createElement('div');
        lightboxContent.className = 'lightbox-content';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'lightbox-close';
        closeBtn.innerHTML = '&times;';
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = title;
        
        const caption = document.createElement('div');
        caption.className = 'lightbox-caption';
        caption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;

        lightboxContent.appendChild(closeBtn);
        lightboxContent.appendChild(img);
        lightboxContent.appendChild(caption);
        lightbox.appendChild(lightboxContent);
        document.body.appendChild(lightbox);

        const lightboxStyles = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
                padding: 20px;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 1000px;
                width: 100%;
                background: white;
                border-radius: 20px;
                overflow: hidden;
                animation: slideIn 0.3s ease;
            }
            
            .lightbox-close {
                position: absolute;
                top: 20px;
                right: 20px;
                font-size: 40px;
                color: white;
                cursor: pointer;
                z-index: 10001;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .lightbox-close:hover {
                background: rgba(0, 0, 0, 0.8);
                transform: rotate(90deg);
            }
            
            .lightbox img {
                width: 100%;
                height: auto;
                display: block;
            }
            
            .lightbox-caption {
                padding: 30px;
                background: white;
            }
            
            .lightbox-caption h3 {
                margin-bottom: 10px;
                font-size: 24px;
                color: #1D1D1F;
            }
            
            .lightbox-caption p {
                color: #636366;
                line-height: 1.6;
                margin: 0;
            }
            
            @keyframes slideIn {
                from {
                    transform: scale(0.9);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }
            
            @media (max-width: 768px) {
                .lightbox-content {
                    margin: 20px;
                }
                
                .lightbox-caption {
                    padding: 20px;
                }
                
                .lightbox-caption h3 {
                    font-size: 20px;
                }
            }
        `;

        if (!document.querySelector('#lightbox-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'lightbox-styles';
            styleElement.textContent = lightboxStyles;
            document.head.appendChild(styleElement);
        }

        closeBtn.addEventListener('click', function() {
            lightbox.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                lightbox.remove();
            }, 300);
        });

        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    lightbox.remove();
                }, 300);
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const lightbox = document.querySelector('.lightbox');
                if (lightbox) {
                    lightbox.style.animation = 'fadeOut 0.3s ease';
                    setTimeout(() => {
                        lightbox.remove();
                    }, 300);
                }
            }
        });
    }

    const fadeOutStyle = document.createElement('style');
    fadeOutStyle.textContent = `
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(fadeOutStyle);
});
