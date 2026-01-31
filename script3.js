// DOM Elements
const studentForm = document.getElementById('studentForm');
const submittedData = document.getElementById('submittedData');
const clearBtn = document.getElementById('clearBtn');
const newFormBtn = document.getElementById('newFormBtn');
const printBtn = document.getElementById('printBtn');
const messageTextarea = document.getElementById('message');
const charCount = document.getElementById('charCount');
const fileInput = document.getElementById('attachment');
const fileName = document.getElementById('fileName');

// Display elements
const displayName = document.getElementById('displayName');
const displayStudentId = document.getElementById('displayStudentId');
const displayEmail = document.getElementById('displayEmail');
const displayMobile = document.getElementById('displayMobile');
const displayCourse = document.getElementById('displayCourse');
const displayYear = document.getElementById('displayYear');
const displaySubject = document.getElementById('displaySubject');
const displayQueryType = document.getElementById('displayQueryType');
const displayUrgency = document.getElementById('displayUrgency');
const displayMessage = document.getElementById('displayMessage');
const displayAttachment = document.getElementById('displayAttachment');
const submissionDate = document.getElementById('submissionDate');
const submissionTime = document.getElementById('submissionTime');
const referenceId = document.getElementById('referenceId');

// Urgency labels mapping
const urgencyLabels = {
  1: 'Low',
  2: 'Medium',
  3: 'High',
  4: 'Critical'
};

// Course labels mapping
const courseLabels = {
  'btech-cs': 'B.Tech Computer Science',
  'btech-it': 'B.Tech Information Technology',
  'bca': 'BCA',
  'mca': 'MCA',
  'mtech': 'M.Tech',
  'mba': 'MBA',
  'other': 'Other'
};

// Year labels mapping
const yearLabels = {
  '1': 'First Year',
  '2': 'Second Year',
  '3': 'Third Year',
  '4': 'Fourth Year',
  '5': 'Fifth Year'
};

// Initialize form
document.addEventListener('DOMContentLoaded', function() {
  // Set up character counter for message textarea
  messageTextarea.addEventListener('input', updateCharCount);

  // Set up file input display
  fileInput.addEventListener('change', updateFileName);

  // Initialize form with some sample data for testing (optional)
  // initializeSampleData();
});

// Update character count
function updateCharCount() {
  const count = messageTextarea.value.length;
  charCount.textContent = count;

  // Change color if approaching limit
  if (count > 450) {
    charCount.style.color = 'var(--accent-color)';
  } else if (count > 400) {
    charCount.style.color = 'var(--warning-color)';
  } else {
    charCount.style.color = 'var(--light-text)';
  }
}

// Update file name display
function updateFileName() {
  if (fileInput.files.length > 0) {
    fileName.textContent = fileInput.files[0].name;
  } else {
    fileName.textContent = 'Choose file';
  }
}

// Form validation
function validateForm() {
  let isValid = true;

  // Clear previous error messages
  document.querySelectorAll('.error-message').forEach(el => {
    el.textContent = '';
  });

  // Validate name
  const name = document.getElementById('name').value.trim();
  if (!name) {
    document.getElementById('nameError').textContent = 'Please enter your full name';
    isValid = false;
  } else if (name.length < 3) {
    document.getElementById('nameError').textContent = 'Name must be at least 3 characters';
    isValid = false;
  }

  // Validate student ID
  const studentId = document.getElementById('studentId').value.trim();
  if (!studentId) {
    document.getElementById('studentIdError').textContent = 'Please enter your student ID';
    isValid = false;
  } else if (!/^\d+$/.test(studentId)) {
    document.getElementById('studentIdError').textContent = 'Student ID should contain only numbers';
    isValid = false;
  }

  // Validate email
  const email = document.getElementById('email').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    document.getElementById('emailError').textContent = 'Please enter your email address';
    isValid = false;
  } else if (!emailRegex.test(email)) {
    document.getElementById('emailError').textContent = 'Please enter a valid email address';
    isValid = false;
  }

  // Validate mobile
  const mobile = document.getElementById('mobile').value.trim();
  const mobileRegex = /^\d{10}$/;
  if (!mobile) {
    document.getElementById('mobileError').textContent = 'Please enter your mobile number';
    isValid = false;
  } else if (!mobileRegex.test(mobile)) {
    document.getElementById('mobileError').textContent = 'Please enter a valid 10-digit mobile number';
    isValid = false;
  }

  // Validate course
  const course = document.getElementById('course').value;
  if (!course) {
    document.getElementById('courseError').textContent = 'Please select your course';
    isValid = false;
  }

  // Validate year
  const year = document.getElementById('year').value;
  if (!year) {
    document.getElementById('yearError').textContent = 'Please select your year of study';
    isValid = false;
  }

  // Validate subject
  const subject = document.getElementById('subject').value.trim();
  if (!subject) {
    document.getElementById('subjectError').textContent = 'Please enter your subject/department';
    isValid = false;
  }

  // Validate query type
  const queryType = document.querySelector('input[name="queryType"]:checked');
  if (!queryType) {
    document.getElementById('queryTypeError').textContent = 'Please select a query type';
    isValid = false;
  }

  // Validate message
  const message = document.getElementById('message').value.trim();
  if (!message) {
    document.getElementById('messageError').textContent = 'Please enter your message';
    isValid = false;
  } else if (message.length < 10) {
    document.getElementById('messageError').textContent = 'Message should be at least 10 characters';
    isValid = false;
  }

  // Validate consent
  const consent = document.getElementById('consent').checked;
  if (!consent) {
    document.getElementById('consentError').textContent = 'You must agree to the terms to submit the form';
    isValid = false;
  }

  return isValid;
}

// Format phone number
function formatPhoneNumber(phone) {
  // Add +91 prefix for Indian numbers
  return `+91 ${phone.substring(0, 5)} ${phone.substring(5)}`;
}

// Generate a reference ID
function generateReferenceId() {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `STU-${timestamp}-${random}`;
}

// Format date and time
function getFormattedDateTime() {
  const now = new Date();

  // Format date
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = now.toLocaleDateString('en-US', dateOptions);

  // Format time
  const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
  const formattedTime = now.toLocaleTimeString('en-US', timeOptions);

  return { formattedDate, formattedTime };
}

// Display submitted data
function displayFormData(formData) {
  // Update display elements
  displayName.textContent = formData.name;
  displayStudentId.textContent = formData.studentId;
  displayEmail.textContent = formData.email;
  displayMobile.textContent = formatPhoneNumber(formData.mobile);
  displayCourse.textContent = courseLabels[formData.course] || formData.course;
  displayYear.textContent = yearLabels[formData.year] || formData.year;
  displaySubject.textContent = formData.subject;
  displayQueryType.textContent = formData.queryType;
  displayUrgency.textContent = urgencyLabels[formData.urgency] || 'Medium';
  displayMessage.textContent = formData.message;

  // Handle attachment
  if (formData.attachment && formData.attachment.name) {
    displayAttachment.textContent = formData.attachment.name;
    displayAttachment.style.color = 'var(--primary-color)';
  } else {
    displayAttachment.textContent = 'No file attached';
    displayAttachment.style.color = 'var(--light-text)';
  }

  // Update submission time and reference ID
  const { formattedDate, formattedTime } = getFormattedDateTime();
  submissionDate.textContent = formattedDate;
  submissionTime.textContent = formattedTime;
  referenceId.textContent = generateReferenceId();

  // Show submitted data section
  submittedData.style.display = 'block';

  // Scroll to submitted data
  submittedData.scrollIntoView({ behavior: 'smooth' });
}

// Form submission
studentForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Validate form
  if (!validateForm()) {
    return;
  }

  // Get form data
  const formData = {
    name: document.getElementById('name').value.trim(),
    studentId: document.getElementById('studentId').value.trim(),
    email: document.getElementById('email').value.trim(),
    mobile: document.getElementById('mobile').value.trim(),
    course: document.getElementById('course').value,
    year: document.getElementById('year').value,
    subject: document.getElementById('subject').value.trim(),
    queryType: document.querySelector('input[name="queryType"]:checked').value,
    urgency: document.getElementById('urgency').value,
    message: document.getElementById('message').value.trim(),
    attachment: fileInput.files[0] || null
  };

  // Show loading state on submit button
  const submitBtn = document.getElementById('submitBtn');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
  submitBtn.disabled = true;

  // Simulate API call with delay
  setTimeout(() => {
    // Display the form data
    displayFormData(formData);

    // Reset button state
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    // Show success notification
    showNotification('Form submitted successfully!', 'success');

    // Optional: In a real application, you would send data to a server here
    // sendToServer(formData);
  }, 1500);
});

// Clear form
clearBtn.addEventListener('click', function() {
  if (confirm('Are you sure you want to clear the form? All entered data will be lost.')) {
    studentForm.reset();
    updateCharCount();
    updateFileName();

    // Clear error messages
    document.querySelectorAll('.error-message').forEach(el => {
      el.textContent = '';
    });

    showNotification('Form cleared successfully', 'info');
  }
});

// New form button
newFormBtn.addEventListener('click', function() {
  submittedData.style.display = 'none';
  studentForm.reset();
  updateCharCount();
  updateFileName();

  // Clear error messages
  document.querySelectorAll('.error-message').forEach(el => {
    el.textContent = '';
  });

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  showNotification('Ready to submit a new form', 'info');
});

// Print button
printBtn.addEventListener('click', function() {
  const printContent = submittedData.innerHTML;
  const originalContent = document.body.innerHTML;

  document.body.innerHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Student Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1, h2, h3 { color: #333; }
        .data-section { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #ddd; }
        .data-item { margin-bottom: 10px; }
        .data-label { font-weight: bold; color: #555; }
        .data-value { padding: 5px 0; }
        @media print {
          .no-print { display: none; }
          button { display: none; }
        }
      </style>
    </head>
    <body>
      <h1>Student Feedback Form Submission</h1>
      <p>Submitted on: ${submissionDate.textContent} at ${submissionTime.textContent}</p>
      <p>Reference ID: ${referenceId.textContent}</p>
      ${printContent}
      <div class="no-print">
        <button onclick="window.print()">Print</button>
        <button onclick="window.location.reload()">Close</button>
      </div>
    </body>
    </html>
  `;

  window.print();
  document.body.innerHTML = originalContent;
  window.location.reload();
});

// Show notification
function showNotification(message, type) {
  // Remove existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;

  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: ${type === 'success' ? 'var(--secondary-color)' : 'var(--primary-color)'};
    color: white;
    padding: 15px 20px;
    border-radius: 6px;
    box-shadow: var(--shadow);
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;

  // Add keyframe animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Initialize with sample data (optional, for testing)
function initializeSampleData() {
  document.getElementById('name').value = 'Sachin Kumar Singh';
  document.getElementById('studentId').value = '12345678';
  document.getElementById('email').value = 'sachin.singh@lpu.in';
  document.getElementById('mobile').value = '9876543210';
  document.getElementById('course').value = 'btech-cs';
  document.getElementById('year').value = '3';
  document.getElementById('subject').value = 'Computer Science & Engineering';
  document.getElementById('academic').checked = true;
  document.getElementById('message').value = 'I would like to request a reassessment of my Data Structures and Algorithms midterm exam. I believe there may have been an error in the grading of question 3, which covers binary tree traversals.';

  updateCharCount();
}

// Add keyboard shortcut for form submission (Ctrl+Enter)
document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
      submitBtn.click();
    }
  }
});

// Add auto-save functionality (optional)
let autoSaveTimer;
studentForm.addEventListener('input', function() {
  clearTimeout(autoSaveTimer);

  // Only auto-save after 5 seconds of inactivity
  autoSaveTimer = setTimeout(() => {
    // In a real application, you would save to localStorage or send to server
    console.log('Auto-save triggered');
  }, 5000);
});