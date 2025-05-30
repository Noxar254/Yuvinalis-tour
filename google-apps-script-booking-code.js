/**
 * Google Apps Script Code for Yuvinalis Tourism Booking Enquiry Form
 * 
 * INSTRUCTIONS:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Replace the default code with this entire script
 * 4. Save the project with a name like "Yuvinalis Tourism Booking Form Handler"
 * 5. Deploy as a web app (see deployment instructions below)
 * 6. Copy the deployment URL and update your google-sheets-api.js file
 */

/**
 * Main function to handle POST requests from the booking enquiry form
 * This function is automatically triggered when the form is submitted
 */
function doPost(e) {
  try {
    // Get the active spreadsheet (or create one if it doesn't exist)
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.create('Yuvinalis Tourism - Booking Enquiries');
    const sheet = spreadsheet.getActiveSheet();
    
    // Set sheet name if it's the default
    if (sheet.getName() === 'Sheet1') {
      sheet.setName('Booking Enquiries');
    }
    
    // Get form parameters
    const params = e.parameter;
    
    // Get current date and time
    const currentDate = new Date();
    
    // Prepare row data in the exact order of headers
    const rowData = [
      currentDate,                          // Timestamp
      params.submissionId || '',            // Submission ID
      params.serviceType || '',             // Service Type
      params.tourType || '',                // Tour Type (if applicable)
      params.fullName || '',                // Full Name
      params.phone || '',                   // Phone
      params.email || '',                   // Email
      params.preferredDate || '',           // Preferred Date
      params.numberOfPeople || '',          // Number of People
      params.message || ''                  // Message/Requirements
    ];
    
    // Add header row if this is the first submission
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'Submission ID',
        'Service Type',
        'Tour Type',
        'Full Name',
        'Phone',
        'Email',
        'Preferred Date',
        'Number of People',
        'Message/Requirements'
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
    console.log('Booking enquiry submitted successfully:', params.submissionId);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Booking enquiry submitted successfully',
        submissionId: params.submissionId,
        timestamp: currentDate.toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Error processing booking enquiry:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Failed to submit booking enquiry: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Send email notification to Yuvinalis Tourism when a new booking enquiry is received
 */
function sendEmailNotification(params) {
  try {
    // Email configuration
    const emailRecipient = 'info@yuvinalistourism.com';
    const emailSubject = `🆕 New Booking Enquiry - ${params.serviceType} - ${params.fullName}`;
    
    // Create email body
    let emailBody = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background-color: #FF6B35; color: white; padding: 20px; text-align: center;">
    <h1 style="margin: 0;">New Booking Enquiry Received</h1>
    <p style="margin: 5px 0 0 0;">Yuvinalis Tourism - Booking Services</p>
  </div>
  
  <div style="padding: 20px; background-color: #f8f9fa;">
    <h2 style="color: #333; border-bottom: 2px solid #FF6B35; padding-bottom: 10px;">Customer Information</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${params.fullName}</td></tr>
      <tr style="background-color: #fff;"><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${params.email}</td></tr>
      <tr><td style="padding: 8px; font-weight: bold;">Phone:</td><td style="padding: 8px;">${params.phone}</td></tr>
    </table>
  </div>
  
  <div style="padding: 20px; background-color: #fff;">
    <h2 style="color: #333; border-bottom: 2px solid #FF6B35; padding-bottom: 10px;">Service Information</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 8px; font-weight: bold;">Service Type:</td><td style="padding: 8px;">${getServiceDisplayName(params.serviceType)}</td></tr>`;
    
    if (params.tourType) {
      emailBody += `<tr style="background-color: #f8f9fa;"><td style="padding: 8px; font-weight: bold;">Tour Type:</td><td style="padding: 8px;">${getTourDisplayName(params.tourType)}</td></tr>`;
    }
    
    if (params.preferredDate) {
      emailBody += `<tr><td style="padding: 8px; font-weight: bold;">Preferred Date:</td><td style="padding: 8px;">${params.preferredDate}</td></tr>`;
    }
    
    if (params.numberOfPeople) {
      emailBody += `<tr style="background-color: #f8f9fa;"><td style="padding: 8px; font-weight: bold;">Number of People:</td><td style="padding: 8px;">${params.numberOfPeople}</td></tr>`;
    }
    
    emailBody += `
    </table>
  </div>
  
  <div style="padding: 20px; background-color: #f8f9fa;">
    <h3 style="color: #333;">Message/Requirements:</h3>
    <p style="background-color: #fff; padding: 15px; border-left: 4px solid #FF6B35; margin: 10px 0;">${params.message}</p>
  </div>
  
  <div style="padding: 20px; background-color: #333; color: white; text-align: center;">
    <h3 style="margin: 0 0 10px 0;">Submission Details</h3>
    <p style="margin: 5px 0;">Submission ID: <strong>${params.submissionId}</strong></p>
    <p style="margin: 5px 0;">Submitted: <strong>${new Date().toLocaleString()}</strong></p>
    <p style="margin: 15px 0 5px 0;">Please respond to the customer at: <a href="mailto:${params.email}" style="color: #FF6B35;">${params.email}</a></p>
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
 * Helper function to get service display name
 */
function getServiceDisplayName(serviceValue) {
  const serviceNames = {
    'event-booking': 'Event Booking',
    'tour-booking': 'Tour Booking',
    'flight-booking': 'Flight Booking',
    'hotel-enquiry': 'Hotel Enquiry',
    'general-enquiry': 'General Enquiry'
  };
  return serviceNames[serviceValue] || serviceValue;
}

/**
 * Helper function to get tour display name
 */
function getTourDisplayName(tourValue) {
  const tourNames = {
    // Dubai Tours & Attractions
    'desert-safari': 'Desert Safari',
    'creek-dhow': 'Creek Dhow Cruise',
    'marina-dhow': 'Marina Dhow Cruise',
    'burj-khalifa': 'Burj Khalifa at the Top',
    'dubai-city-tour': 'Dubai City Tour',
    'global-village': 'Global Village',
    'atlantis': 'Atlantis Aquaventure',
    'img-world': 'IMG Worlds of Adventure',
    'dubai-frame': 'Dubai Frame',
    'miracle-garden': 'Dubai Miracle Garden',
    'jet-ski': 'Jet Ski Experience',
    'wild-wadi': 'Wild Wadi Water Park',
    'museum-future': 'Museum of the Future & Lake Safari',
    'dubai-opera': 'Dubai Opera Show',
    'dubai-aquarium': 'Dubai Aquarium & Underwater Zoo',
    'zabeel-park': 'Zabeel Park & Dubai Garden Glow',
    'golden-frame': 'Golden Frame Art Gallery',
    'traditional-souks': 'Traditional Souks Tour',
    'helicopter-ride': 'Helicopter Ride over Dubai',
    'luxury-yacht': 'Luxury Yacht Party',
    'skydiving': 'Skydiving Experience',
    'hot-air-balloon': 'Hot Air Balloon Ride',
    'private-beach': 'Private Beach Experience',
    'quad-biking': 'Quad Biking Adventure',
    'camel-riding': 'Camel Riding Experience',
    'sand-boarding': 'Sand Boarding',
    
    // Kenya Safari Tours
    'maasai-mara': 'Maasai Mara Safari',
    'amboseli': 'Amboseli National Park',
    'tsavo': 'Tsavo East & West',
    'samburu': 'Samburu Game Reserve',
    'nakuru': 'Lake Nakuru National Park',
    'naivasha': 'Lake Naivasha',
    'aberdares': 'Aberdares National Park',
    'mombasa-safari': 'Mombasa Beach Safari',
    
    // International Tours
    'tanzania-safari': 'Tanzania Explorer Safari',
    'uganda-gorilla': 'Uganda Gorilla Trekking',
    'south-africa': 'South Africa Explorer',
    'egypt-pyramids': 'Egypt Pyramids Tour',
    'turkey-cappadocia': 'Turkey Cappadocia',
    'morocco-desert': 'Morocco Desert Adventure',
    'thailand-beaches': 'Thailand Beach Paradise',
    'bali-temples': 'Bali Temple & Culture',
    'japan-cherry': 'Japan Cherry Blossom',
    'iceland-northern': 'Iceland Northern Lights',
    'norway-fjords': 'Norway Fjords',
    'switzerland-alps': 'Switzerland Alps',
    'maldives-luxury': 'Maldives Luxury Resort',
    'seychelles-island': 'Seychelles Island Hopping',
    'sri-lanka': 'Sri Lanka Cultural Tour',
    'nepal-everest': 'Nepal Everest Base Camp',
    'bhutan-himalaya': 'Bhutan Himalayan Kingdom',
    'vietnam-heritage': 'Vietnam Heritage Trail',
    'cambodia-angkor': 'Cambodia Angkor Wat',
    'laos-temples': 'Laos Temple Discovery',
    
    // Domestic Tours (Kenya)
    'coastal-tour': 'Kenyan Coastal Tour',
    'rift-valley': 'Great Rift Valley Tour',
    'mount-kenya': 'Mount Kenya Climbing',
    'hell-gate': 'Hell\'s Gate National Park',
    'city-explorer': 'City Explorer Walk',
    'nature-trail': 'Nature Adventure Trail',
    'historical-walk': 'Historical Cultural Walk',
    'food-tour': 'Food Tasting Tour'
  };
  return tourNames[tourValue] || tourValue;
}

/**
 * Test function to verify the setup
 * You can run this function manually to test if everything is working
 */
function testSetup() {
  try {
    const testData = {
      parameter: {
        submissionId: 'TEST_BOOKING_' + Date.now(),
        serviceType: 'tour-booking',
        tourType: 'desert-safari',
        fullName: 'John Doe',
        phone: '+1234567890',
        email: 'john.doe@example.com',
        preferredDate: '2025-07-01',
        numberOfPeople: '2',
        message: 'This is a test booking enquiry for Desert Safari tour.'
      }
    };
    
    const result = doPost(testData);
    console.log('Test completed successfully:', result.getContent());
    
    return 'Test setup completed successfully! Check your Google Sheet and email.';
  } catch (error) {
    console.error('Test failed:', error);
    return 'Test failed: ' + error.toString();
  }
}

/**
 * DEPLOYMENT INSTRUCTIONS:
 * 
 * 1. Save this script in Google Apps Script
 * 2. Click on "Deploy" button in the top right
 * 3. Choose "New deployment"
 * 4. Select "Web app" as the type
 * 5. Set "Execute as" to "Me"
 * 6. Set "Who has access" to "Anyone"
 * 7. Click "Deploy"
 * 8. Copy the deployment URL
 * 9. Update the 'bookingScriptURL' in your google-sheets-api.js file
 * 10. Create a new Google Sheets file named "Yuvinalis Tourism - Booking Enquiries"
 * 11. Share the script with that spreadsheet or run it once to create the spreadsheet automatically
 * 
 * IMPORTANT: 
 * - Make sure the email 'info@yuvinalistourism.com' exists and can receive emails
 * - Test the setup by running the testSetup() function
 * - The script will automatically create headers and format the sheet on first submission
 */
