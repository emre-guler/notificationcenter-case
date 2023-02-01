await import('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js');
$(document).ready(function() {
    var counter = 1;
    const minfiedCSS = `
    <style>
        #smallNotificationContainer {
            position: fixed;
            z-index: 9998;
            top:50%;
            right: 0;
            background-color: #A34476;
            min-width: 100px;
            min-height: 100px;
            border-radius: 50%;
            display: flex;
            
            -webkit-user-select: none;
            -webkit-touch-callout: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
            #smallNotificationContainer:hover {
                cursor: pointer;
            }
            #smallNotificationContainer #notification-icon {
                font-size: 50px;
                position: relative;
                align-self: center;
                margin: auto;
            }
        #notificationContainer {
            position: absolute;
            display: none;
            z-index: 9999;
            right: 75px;
            bottom: 50px;

            min-width: 470px;
            min-height: 230px;

            flex-direction: column;
        }
            #notificationContainer #notificationContainer-head {
                max-width: 100%;
                background-color: #A34476;
                font-family: sans-serif;
                color: white;
                font-weight: bold;
                padding: 15px;

                border-top-left-radius: 15px;
                border-top-right-radius: 15px;
            }

            #notificationContainer #notificationContainer-body {
                max-width: 100%;

                display: flex;
                flex-direction: column;

                background-color: white;

                border-bottom-left-radius: 15px;
                border-bottom-right-radius: 15px;
            }
            #notificationContainer .notificationContainer-body-item {
                display: flex;
                flex-direction: row;
                padding: 15px;
                justify-content: space-between;
            }
                #notificationContainer .notificationContainer-body-item #notificationContainer-body-description {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin: 10px;
                }
                    #notificationContainer .notificationContainer-body-item #notificationContainer-body-description span {
                        font-family: sans-serif;
                        font-size: 12px;
                        color: #666666;
                    }

                    #notificationContainer .notificationContainer-body-item #notificationContainer-body-description span:first-child {
                        font-weight: bolder;
                    }

            #notificationContainer-body-content-new {
                margin-top: 5px;
            }
                #notificationContainer-body-content-new a {
                    background-color: #A34476;
                    border-radius: 15px;
                    padding: 5px 10px;
                    color: white;
                    font-family: sans-serif;
                    font-size: 10px;
                    font-weight: bold;
                }
    </style>`;
    const productObject = {
        title: $('span.product-title').text().trim().replace(/\n/g, ''),
        description: $('.panel-body .col-xs-12 li').text().trim().replace(/\s+/g, ' '),
        image: $('.product-images-desktop img').first().attr('src'),
        productLink: location.href
    };

    const notificationCenter = () => {
        if ($('.product-detail').length > 0) {
            addToNotificationCenter();
        } else {
            const localStorageValue = JSON.parse(localStorage.getItem('notificationCenter'));
            if (localStorageValue != null && localStorageValue.length == 3) {
                showNotificationCenter();
            }
        }
    };

    const addToNotificationCenter = () => {
        let localStorageValue = JSON.parse(localStorage.getItem('notificationCenter'));
        localStorageValue = localStorageValue == null ? [] : localStorageValue;
        if (localStorageValue.find(element => element.productLink == location.href) == undefined) {
            if (localStorageValue.length == 3) {
                localStorageValue.pop();
            }
            localStorageValue.unshift(productObject);
            localStorage.setItem('notificationCenter', JSON.stringify(localStorageValue));
        }
    };

    const showNotificationCenter = () => {

        const smallNotificationContainer = document.createElement('div');
        smallNotificationContainer.id = "smallNotificationContainer";

        // icon
        const smallNotificationSpan = document.createElement('span');
        smallNotificationSpan.id = 'notification-icon';
        smallNotificationSpan.innerText = '🔔';
        smallNotificationContainer.appendChild(smallNotificationSpan);
        smallNotificationContainer.onclick = () => smallNotificationClicked();

        // big container
        const notificationContainer = document.createElement('div');
        notificationContainer.id = 'notificationContainer';

        // big container header
        const notificationHeader = document.createElement('div');
        notificationHeader.id = 'notificationContainer-head';
        notificationHeader.innerText = 'DISCOVER OUR DEALS';

        // big container body
        const notificationBody = document.createElement('div');
        notificationBody.id = 'notificationContainer-body';
        
        // add header and body to main notification container
        notificationContainer.appendChild(notificationHeader);
        notificationContainer.appendChild(notificationBody);


        smallNotificationContainer.innerHTML += minfiedCSS;
        smallNotificationContainer.appendChild(notificationContainer);

        document.body.appendChild(smallNotificationContainer);
    };

    const smallNotificationClicked = () => {
        counter++;
        if (counter % 2 == 0) {
            $('#smallNotificationContainer #notification-icon').text('❌');
            $('#notificationContainer').css('display', 'flex');
            let products = JSON.parse(localStorage.getItem('notificationCenter'));
            products.forEach(product => {
                const bodyItem = document.createElement('div');
                bodyItem.className = 'notificationContainer-body-item';
                bodyItem.onclick = () => window.location.href = product.productLink;

                // image element
                const imageElement = document.createElement('img');
                imageElement.src = product.image;
                imageElement.height = 100;

                // div element - description
                const descriptionElement = document.createElement('div');
                descriptionElement.id = 'notificationContainer-body-description';

                const productNameElement = document.createElement('span');
                productNameElement.innerText = product.title;
                descriptionElement.appendChild(productNameElement);

                const productDescriptionElement = document.createElement('span');
                productDescriptionElement.innerText = product.description;
                descriptionElement.appendChild(productDescriptionElement);

                // div element - new button
                const newButtonContainer = document.createElement('div');
                newButtonContainer.id = 'notificationContainer-body-content-new';
                
                const aElement = document.createElement('a');
                aElement.innerText = 'NEW';

                newButtonContainer.appendChild(aElement);


                bodyItem.appendChild(imageElement);
                bodyItem.appendChild(descriptionElement);
                bodyItem.appendChild(newButtonContainer);

                document.getElementById('notificationContainer-body').appendChild(bodyItem);
            });
        } else {
            $('#smallNotificationContainer #notification-icon').text('🔔');
            $('#notificationContainer').css('display', 'none');
            $('#notificationContainer-body').html('');
        }
    }
    
    notificationCenter();
});