/**
 * Handles form submissions to Google Sheets via Apps Script Web App
 */

// REPLACE THIS WITH YOUR GOOGLE SCRIPT WEB APP URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbz0YooitXNm4izlHIMyfciF789KfFoYtpe5d-WCz2DdpmJp_FrJDtHOX80gjMPEIdQ6OQ/exec';

const form1 = document.forms['contactForm'];
const form2 = document.forms['leadGenForm'];

function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerText;

    // Loading State
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    // Collect Data based on IDs (matching the Google Script expectations)
    // Note: We need to construct the FormData manually or ensure inputs have 'name' attributes matching the script.
    // The current HTML has IDs but no 'name' attributes on all fields. Let's use FormData by appending IDs.

    const formData = new FormData();

    // Helper to get value safely
    const getValue = (selector) => {
        const input = form.querySelector(selector);
        return input ? input.value : '';
    };

    formData.append('name', getValue('[name="name"], #name, [placeholder*="Name"]'));
    formData.append('designation', getValue('[name="designation"], #designation, [placeholder*="Designation"]'));
    formData.append('email', getValue('[name="email"], #email, [type="email"]'));
    formData.append('phone', getValue('[name="phone"], #phone, [type="tel"]'));
    formData.append('company', getValue('[name="company"], #company, [placeholder*="Company"]'));
    formData.append('service', getValue('[name="service"], #service, select:nth-of-type(1)'));
    formData.append('industry', getValue('[name="industry"], #industry, [placeholder*="Industry"]'));
    formData.append('budget', getValue('[name="budget"], #budget, select:nth-of-type(2)'));
    formData.append('message', getValue('[name="message"], #message, textarea'));


    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            submitBtn.innerText = "Sent!";
            form.reset();
            // Close modal if it's the popup
            if (form.id === 'leadGenForm') {
                setTimeout(() => {
                    const modal = document.getElementById('leadGenModal');
                    if (modal) modal.style.display = "none";
                }, 1000);
            }
            // Reset button after delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            }, 3000);
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert("Oops! Something went wrong. Please try again.");
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
        });
}

if (form1) {
    form1.addEventListener('submit', handleFormSubmit);
}

if (form2) {
    form2.addEventListener('submit', handleFormSubmit);
}
