document.addEventListener("DOMContentLoaded", function () {
    const generateOrderNumberButton = document.getElementById("generateOrderNumber");
    const orderNumberSpan = document.getElementById("orderNumber");

    generateOrderNumberButton.addEventListener("click", async function () {
        const orderNumber = generateOrderNumber();
        orderNumberSpan.textContent = orderNumber;

        try {
            const response = await fetch('/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ orderNumber })
            });

            if (response.ok) {
                console.log('Order stored successfully:', orderNumber);
            } else {
                console.error('Failed to store the order:', response.statusText);
            }
        } catch (error) {
            console.error('Error storing order:', error);
        }
    });

    function generateOrderNumber() {
        return "ORD-" + Math.floor(Math.random() * 10000);
    }
});
