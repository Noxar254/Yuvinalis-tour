/**
 * Google Sheets API Integration for Yuvinalis Tourism
 * Handles form submissions to Google Sheets
 */

class GoogleSheetsAPI {    constructor() {
        // Google Apps Script Web App URL - Your actual deployment URL
        this.scriptURL = 'https://script.google.com/macros/s/AKfycbxFcqFZN4lF-IfEJJ3wSsSnNZE0dQKXRY7iOfO54ffHzbjzw7HAzWJ6D2uRce7Gu4IV/exec';
        
        // Production mode is now active - form submissions will be saved to Google Sheets
        this.isProduction = true;
    }

    /**
     * Submit visa application data to Google Sheets
     * @param {Object} formData - The form data object
     * @returns {Promise} - Promise that resolves on successful submission
     */
    async submitVisaApplication(formData) {
        try {
            // Add timestamp and form type
            const submissionData = {
                ...formData,
                timestamp: new Date().toISOString(),
                formType: 'Visa Application',
                submissionId: this.generateSubmissionId()
            };

            if (this.isProduction) {
                // Production: Send to Google Sheets
                const response = await fetch(this.scriptURL, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams(submissionData)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.text();
                console.log('Form submitted to Google Sheets:', result);
                return { success: true, message: 'Form submitted successfully' };
            } else {
                // Development: Log data and simulate success
                console.log('VISA APPLICATION SUBMISSION (Development Mode):', submissionData);
                console.log('Data would be sent to Google Sheets in production');
                
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                return { success: true, message: 'Form submitted successfully (dev mode)' };
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            throw new Error('Failed to submit form. Please try again.');
        }
    }

    /**
     * Generate a unique submission ID
     * @returns {string} - Unique submission ID
     */
    generateSubmissionId() {
        return 'VISA_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Format form data for email notification
     * @param {Object} formData - The form data object
     * @returns {string} - Formatted email body
     */
    formatEmailBody(formData) {
        let emailBody = `
NEW VISA APPLICATION SUBMISSION
===============================

Personal Information:
--------------------
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
Nationality: ${formData.nationality}
Passport Number: ${formData.passportNumber}
Passport Expiry: ${formData.passportExpiry}
Date of Birth: ${formData.dateOfBirth}

Visa Information:
----------------
Visa Type: ${formData.visaType}`;

        if (formData.visaType === 'Tourist Visa' && formData.touristVisaDuration) {
            emailBody += `
Tourist Visa Duration: ${formData.touristVisaDuration}`;
        }

        emailBody += `
Expected Travel Date: ${formData.travelDate}
Expected Return Date: ${formData.returnDate || 'Not specified'}
Previous UAE Visa: ${formData.previousUaeVisa}
Purpose of Visit: ${formData.purposeOfVisit}
Additional Information: ${formData.additionalInfo || 'None provided'}

Submission Details:
------------------
Submitted: ${new Date().toLocaleString()}
Submission ID: ${this.generateSubmissionId()}

---
This application was submitted through the Yuvinalis Tourism website.
Please respond to the applicant at ${formData.email}
`;

        return emailBody;
    }
}

// Create global instance
window.GoogleSheetsAPI = new GoogleSheetsAPI();

/**
 * Google Apps Script Code for Google Sheets
 * Copy this code to your Google Apps Script project:
 * 
 * function doPost(e) {
 *   try {
 *     const sheet = SpreadsheetApp.getActiveSheet();
 *     const params = e.parameter;
 *     
 *     // Get current date
 *     const currentDate = new Date();
 *     
 *     // Prepare row data
 *     const rowData = [
 *       currentDate,                    // Timestamp
 *       params.submissionId || '',      // Submission ID
 *       params.firstName || '',         // First Name
 *       params.lastName || '',          // Last Name
 *       params.email || '',             // Email
 *       params.phone || '',             // Phone
 *       params.nationality || '',       // Nationality
 *       params.passportNumber || '',    // Passport Number
 *       params.passportExpiry || '',    // Passport Expiry
 *       params.dateOfBirth || '',       // Date of Birth
 *       params.visaType || '',          // Visa Type
 *       params.touristVisaDuration || '', // Tourist Visa Duration
 *       params.travelDate || '',        // Travel Date
 *       params.returnDate || '',        // Return Date
 *       params.previousUaeVisa || '',   // Previous UAE Visa
 *       params.purposeOfVisit || '',    // Purpose of Visit
 *       params.additionalInfo || ''     // Additional Info
 *     ];
 *     
 *     // Add header row if sheet is empty
 *     if (sheet.getLastRow() === 0) {
 *       const headers = [
 *         'Timestamp', 'Submission ID', 'First Name', 'Last Name', 'Email', 
 *         'Phone', 'Nationality', 'Passport Number', 'Passport Expiry', 
 *         'Date of Birth', 'Visa Type', 'Tourist Visa Duration', 'Travel Date', 
 *         'Return Date', 'Previous UAE Visa', 'Purpose of Visit', 'Additional Info'
 *       ];
 *       sheet.appendRow(headers);
 *     }
 *     
 *     // Add the data
 *     sheet.appendRow(rowData);
 *     
 *     // Optional: Send email notification
 *     const subject = `New Visa Application - ${params.visaType} - ${params.firstName} ${params.lastName}`;
 *     const body = `
 *       New visa application received:
 *       
 *       Name: ${params.firstName} ${params.lastName}
 *       Email: ${params.email}
 *       Phone: ${params.phone}
 *       Visa Type: ${params.visaType}
 *       Travel Date: ${params.travelDate}
 *       
 *       Please check the Google Sheet for complete details.
 *     `;
 *     
 *     // Replace with your email
 *     GmailApp.sendEmail('info@yuvinalistourism.com', subject, body);
 *     
 *     return ContentService.createTextOutput('Success');
 *   } catch (error) {
 *     console.error('Error:', error);
 *     return ContentService.createTextOutput('Error: ' + error.toString());
 *   }
 * }
 */