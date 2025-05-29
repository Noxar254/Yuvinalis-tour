/**
 * Google Apps Script Code for Yuvinalis Tourism Visa Application Form
 * 
 * INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Replace the default code with this entire script
 * 4. Save the project with a name like "Yuvinalis Tourism Visa Form Handler"
 * 5. Deploy as a web app (see deployment instructions below)
 * 6. Copy the deployment URL and update your google-sheets-api.js file
 */

/**
 * Main function to handle POST requests from the visa application form
 * This function is automatically triggered when the form is submitted
 */
function doPost(e) {
  try {
    // Get the active spreadsheet (or create one if it doesn't exist)
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.create('Yuvinalis Tourism - Visa Applications');
    const sheet = spreadsheet.getActiveSheet();
    
    // Set sheet name if it's the default
    if (sheet.getName() === 'Sheet1') {
      sheet.setName('Visa Applications');
    }
    
    // Get form parameters
    const params = e.parameter;
    
    // Get current date and time
    const currentDate = new Date();
    
    // Prepare row data in the exact order of headers
    const rowData = [
      currentDate,                          // Timestamp
      params.submissionId || '',            // Submission ID
      params.firstName || '',               // First Name
      params.lastName || '',                // Last Name
      params.email || '',                   // Email
      params.phone || '',                   // Phone
      params.nationality || '',             // Nationality
      params.passportNumber || '',          // Passport Number
      params.passportExpiry || '',          // Passport Expiry
      params.dateOfBirth || '',             // Date of Birth
      params.visaType || '',                // Visa Type
      params.touristVisaDuration || '',     // Tourist Visa Duration (if applicable)
      params.travelDate || '',              // Expected Travel Date
      params.returnDate || '',              // Expected Return Date
      params.previousUaeVisa || 'No',       // Previous UAE Visa
      params.purposeOfVisit || '',          // Purpose of Visit
      params.additionalInfo || ''           // Additional Information
    ];
    
    // Add header row if this is the first submission
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'Submission ID',
        'First Name',
        'Last Name',
        'Email',
        'Phone',
        'Nationality',
        'Passport Number',
        'Passport Expiry',
        'Date of Birth',
        'Visa Type',
        'Tourist Visa Duration',
        'Expected Travel Date',
        'Expected Return Date',
        'Previous UAE Visa',
        'Purpose of Visit',
        'Additional Information'
      ];
      
      // Add headers and format them
      sheet.appendRow(headers);
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#4CAF50');
      headerRange.setFontColor('white');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(12);
    }
    
    // Add the new submission data
    sheet.appendRow(rowData);
    
    // Format the new row
    const lastRow = sheet.getLastRow();
    const dataRange = sheet.getRange(lastRow, 1, 1, rowData.length);
    
    // Alternate row colors for better readability
    if (lastRow % 2 === 0) {
      dataRange.setBackground('#f8f9fa');
    }
    
    // Auto-resize columns for better visibility
    sheet.autoResizeColumns(1, rowData.length);
    
    // Send email notification to Yuvinalis Tourism
    sendEmailNotification(params);
    
    // Log successful submission
    console.log('Visa application submitted successfully:', params.submissionId);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Visa application submitted successfully',
        submissionId: params.submissionId,
        timestamp: currentDate.toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Error processing visa application:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Failed to submit visa application: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Send email notification to Yuvinalis Tourism when a new application is received
 */
function sendEmailNotification(params) {
  try {
    // Email configuration
    const emailRecipient = 'info@yuvinalistourism.com';
    const emailSubject = `🆕 New Visa Application - ${params.visaType} - ${params.firstName} ${params.lastName}`;
    
    // Create email body
    let emailBody = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background-color: #4CAF50; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0;">New Visa Application Received</h1>
    <p style="margin: 5px 0 0 0;">Yuvinalis Tourism - Visa Processing</p>
  </div>
  
  <div style="padding: 20px; background-color: #f8f9fa;">
    <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">Personal Information</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${params.firstName} ${params.lastName}</td></tr>
      <tr style="background-color: #fff;"><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${params.email}</td></tr>
      <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${params.phone}</td></tr>
      <tr style="background-color: #fff;"><td style="padding: 8px; font-weight: bold;">Nationality:</td><td style="padding: 8px;">${params.nationality}</td></tr>
      <tr><td style="padding: 8px; font-weight: bold;">Passport Number:</td><td style="padding: 8px;">${params.passportNumber}</td></tr>
      <tr style="background-color: #fff;"><td style="padding: 8px; font-weight: bold;">Passport Expiry:</td><td style="padding: 8px;">${params.passportExpiry}</td></tr>
      <tr><td style="padding: 8px; font-weight: bold;">Date of Birth:</td><td style="padding: 8px;">${params.dateOfBirth}</td></tr>
    </table>
  </div>
  
  <div style="padding: 20px; background-color: #fff;">
    <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">Visa Information</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px; font-weight: bold;">Visa Type:</td><td style="padding: 8px;">${params.visaType}</td></tr>`;
    
    if (params.visaType === 'Tourist Visa' && params.touristVisaDuration) {
      emailBody += `<tr style="background-color: #f8f9fa;"><td style="padding: 8px; font-weight: bold;">Duration:</td><td style="padding: 8px;">${params.touristVisaDuration}</td></tr>`;
    }
    
    emailBody += `
      <tr><td style="padding: 8px; font-weight: bold;">Travel Date:</td><td style="padding: 8px;">${params.travelDate}</td></tr>
      <tr style="background-color: #f8f9fa;"><td style="padding: 8px; font-weight: bold;">Return Date:</td><td style="padding: 8px;">${params.returnDate || 'Not specified'}</td></tr>
      <tr><td style="padding: 8px; font-weight: bold;">Previous UAE Visa:</td><td style="padding: 8px;">${params.previousUaeVisa}</td></tr>
    </table>
  </div>
  
  <div style="padding: 20px; background-color: #f8f9fa;">
    <h3 style="color: #333;">Purpose of Visit:</h3>
    <p style="background-color: #fff; padding: 15px; border-left: 4px solid #4CAF50; margin: 10px 0;">${params.purposeOfVisit}</p>
    
    ${params.additionalInfo ? `
    <h3 style="color: #333;">Additional Information:</h3>
    <p style="background-color: #fff; padding: 15px; border-left: 4px solid #2196F3; margin: 10px 0;">${params.additionalInfo}</p>
    ` : ''}
  </div>
  
  <div style="padding: 20px; background-color: #333; color: white; text-align: center;">
    <h3 style="margin: 0 0 10px 0;">Submission Details</h3>
    <p style="margin: 5px 0;">Submission ID: <strong>${params.submissionId}</strong></p>
    <p style="margin: 5px 0;">Submitted: <strong>${new Date().toLocaleString()}</strong></p>
    <p style="margin: 15px 0 5px 0;">Please respond to the applicant at: <a href="mailto:${params.email}" style="color: #4CAF50;">${params.email}</a></p>
  </div>
</div>`;

    // Send the email
    GmailApp.sendEmail(
      emailRecipient,
      emailSubject,
      '', // Plain text body (empty because we're using HTML)
      {
        htmlBody: emailBody,
        replyTo: params.email,
        name: 'Yuvinalis Tourism Website'
      }
    );
    
    console.log('Email notification sent successfully to:', emailRecipient);
    
  } catch (error) {
    console.error('Failed to send email notification:', error);
    // Don't throw error here - we don't want email failure to break form submission
  }
}

/**
 * Test function to verify the setup
 * You can run this function manually to test if everything is working
 */
function testSetup() {
  try {
    const testData = {
      parameter: {
        submissionId: 'TEST_' + Date.now(),
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        nationality: 'American',
        passportNumber: 'A12345678',
        passportExpiry: '2030-12-31',
        dateOfBirth: '1990-01-01',
        visaType: 'Tourist Visa',
        touristVisaDuration: '30 days',
        travelDate: '2025-07-01',
        returnDate: '2025-07-31',
        previousUaeVisa: 'No',
        purposeOfVisit: 'Tourism and sightseeing',
        additionalInfo: 'This is a test submission'
      }
    };
    
    const result = doPost(testData);
    console.log('Test completed successfully:', result.getContent());
    return 'Test completed successfully';
    
  } catch (error) {
    console.error('Test failed:', error);
    return 'Test failed: ' + error.toString();
  }
}

/**
 * DEPLOYMENT INSTRUCTIONS:
 * 
 * 1. Save this script in Google Apps Script
 * 2. Click "Deploy" > "New deployment"
 * 3. Choose "Web app" as the type
 * 4. Set "Execute as" to "Me"
 * 5. Set "Who has access" to "Anyone"
 * 6. Click "Deploy"
 * 7. Copy the deployment URL
 * 8. Update your google-sheets-api.js file:
 *    - Replace 'YOUR_SCRIPT_ID' with your actual script URL
 *    - Set this.isProduction = true
 * 
 * IMPORTANT NOTES:
 * - Make sure you have a Google Sheets file open when you first run this
 * - The script will automatically create headers if the sheet is empty
 * - Email notifications will be sent from your Gmail account
 * - Test the setup using the testSetup() function before going live
 */
