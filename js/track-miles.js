// Track Your Miles Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements
    const activitySelector = document.querySelector('.activity-selector');
    const activityDisplay = document.querySelector('.activity-display span');
    const activityOptions = document.querySelectorAll('.activity-option');
    const startBtn = document.querySelector('.track-btn.start');
    const stopBtn = document.querySelector('.track-btn.stop');
    const resetBtn = document.querySelector('.track-btn.reset');
    const stepCounter = document.querySelector('.step-counter');
    const progressRing = document.querySelector('.progress-ring__circle-progress');
    const reminderText = document.querySelector('.reminder-text');
    
    // Team mode elements
    const teamModeToggle = document.getElementById('teamModeToggle');
    const teamSettings = document.querySelector('.team-settings');
    const teamNameInput = document.getElementById('teamName');
    const teamSizeValue = document.getElementById('teamSizeValue');
    const teamSizeMinus = document.querySelector('.team-size-btn.minus');
    const teamSizePlus = document.querySelector('.team-size-btn.plus');
    const setTeamTargetBtn = document.querySelector('.team-target-btn');
    
    // Activity type selection
    if (activitySelector) {
        activitySelector.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            activitySelector.classList.remove('active');
        });
    }
    
    // Activity options selection
    if (activityOptions) {
        activityOptions.forEach(option => {
            option.addEventListener('click', function() {
                const activity = this.querySelector('span').textContent;
                if (activityDisplay) {
                    activityDisplay.textContent = activity;
                }
                
                // Update reminder based on activity
                updateReminder(activity);
                
                // Close the dropdown
                if (activitySelector) {
                    activitySelector.classList.remove('active');
                }
                
                // If "Team Building" is selected, suggest team mode
                if (activity === 'Team Building' && !isTeamMode) {
                    suggestTeamMode();
                }
            });
        });
    }    // Tracking variables
    let isTracking = false;
    let stepCount = 0;
    let goalSteps = 10000;
    let stepsInterval;
    let lastStepTimestamp = 0;
    let isTeamMode = false;
    let teamName = "Beyond Miles Team";
    let teamMembers = 5; // Default number of team members
    let teamTarget = 50000; // Default team target (5 members × 10,000 steps)
    
    // Team mode toggle functionality
    if (teamModeToggle) {
        teamModeToggle.addEventListener('change', function() {
            isTeamMode = this.checked;
            
            // Show/hide team settings
            if (teamSettings) {
                teamSettings.style.display = isTeamMode ? 'block' : 'none';
            }
            
            // Update UI for team mode
            updateUI();
        });
    }
    
    // Team size controls
    if (teamSizeMinus) {
        teamSizeMinus.addEventListener('click', function() {
            if (teamMembers > 2) {
                teamMembers--;
                updateTeamSize();
            }
        });
    }
    
    if (teamSizePlus) {
        teamSizePlus.addEventListener('click', function() {
            if (teamMembers < 20) {
                teamMembers++;
                updateTeamSize();
            }
        });
    }
    
    // Update team size and recalculate target
    function updateTeamSize() {
        if (teamSizeValue) {
            teamSizeValue.textContent = teamMembers;
        }
        // Update team target (members × individual goal)
        teamTarget = teamMembers * goalSteps;
        updateUI();
    }
    
    // Set team target button
    if (setTeamTargetBtn) {
        setTeamTargetBtn.addEventListener('click', function() {
            // Get team name
            if (teamNameInput) {
                teamName = teamNameInput.value.trim() || "Beyond Miles Team";
            }
            
            // Show confirmation
            showTeamTargetConfirmation();
        });
    }
    
    // Show team target confirmation
    function showTeamTargetConfirmation() {
        const trackerStats = document.querySelector('.tracker-stats');
        if (!trackerStats) return;
        
        // Create confirmation message
        const confirmMsg = document.createElement('div');
        confirmMsg.className = 'congrats-message';
        confirmMsg.innerHTML = `
            <div class="congrats-icon"><i class="fas fa-users"></i></div>
            <h3>Team Target Set!</h3>
            <p>Your team "${teamName}" with ${teamMembers} members has a target of ${teamTarget.toLocaleString()} steps.</p>
            <div class="team-members-list">
                ${generateTeamMemberIcons()}
            </div>
            <button class="track-btn start">Start Team Challenge</button>
        `;
        
        // Apply styles
        confirmMsg.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255,255,255,0.95);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            border-radius: 16px;
            text-align: center;
            z-index: 10;
            animation: fadeIn 0.5s ease forwards;
        `;
        
        // Add to DOM
        trackerStats.appendChild(confirmMsg);
        
        // Add event listener to the start button
        const startChallengeBtn = confirmMsg.querySelector('.track-btn.start');
        if (startChallengeBtn) {
            startChallengeBtn.addEventListener('click', () => {
                trackerStats.removeChild(confirmMsg);
                resetTracking();
                startTracking();
            });
        }
    }
    
    // Generate team member icons
    function generateTeamMemberIcons() {
        let icons = '';
        const memberIcons = ['fa-user', 'fa-user-tie', 'fa-user-graduate', 'fa-user-nurse', 'fa-user-astronaut'];
        
        for (let i = 0; i < teamMembers; i++) {
            const iconIndex = i % memberIcons.length;
            icons += `<div class="team-member-icon"><i class="fas ${memberIcons[iconIndex]}"></i></div>`;
        }
        
        return icons;
    }
    
    // Suggest team mode when selecting Team Building activity
    function suggestTeamMode() {
        const trackerStats = document.querySelector('.tracker-stats');
        if (!trackerStats) return;
        
        // Create suggestion message
        const suggestMsg = document.createElement('div');
        suggestMsg.className = 'congrats-message';
        suggestMsg.innerHTML = `
            <div class="congrats-icon"><i class="fas fa-lightbulb"></i></div>
            <h3>Team Activity Detected!</h3>
            <p>Would you like to enable Team Mode to track progress together?</p>
            <div class="suggestion-actions">
                <button class="track-btn start">Enable Team Mode</button>
                <button class="track-btn reset">No, Thanks</button>
            </div>
        `;
        
        // Apply styles
        suggestMsg.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255,255,255,0.95);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            border-radius: 16px;
            text-align: center;
            z-index: 10;
            animation: fadeIn 0.5s ease forwards;
        `;
        
        // Add styles for suggestion actions
        const style = document.createElement('style');
        style.textContent = `
            .suggestion-actions {
                display: flex;
                gap: 10px;
                margin-top: 15px;
            }
        `;
        
        // Add to DOM
        document.head.appendChild(style);
        trackerStats.appendChild(suggestMsg);
        
        // Add event listeners
        const enableBtn = suggestMsg.querySelector('.track-btn.start');
        const noThanksBtn = suggestMsg.querySelector('.track-btn.reset');
        
        if (enableBtn) {
            enableBtn.addEventListener('click', () => {
                teamModeToggle.checked = true;
                isTeamMode = true;
                if (teamSettings) {
                    teamSettings.style.display = 'block';
                }
                updateUI();
                trackerStats.removeChild(suggestMsg);
            });
        }
        
        if (noThanksBtn) {
            noThanksBtn.addEventListener('click', () => {
                trackerStats.removeChild(suggestMsg);
            });
        }
    }
      // Update UI elements
    function updateUI() {
        if (stepCounter) {
            stepCounter.textContent = stepCount.toLocaleString();
        }
        
        if (progressRing) {
            const circumference = 628; // 2 * π * r (where r = 100)
            const targetToUse = isTeamMode ? teamTarget : goalSteps;
            const offset = circumference - (stepCount / targetToUse) * circumference;
            progressRing.style.strokeDashoffset = offset;
        }
        
        // Update step label based on mode
        const stepLabel = document.querySelector('.step-label');
        if (stepLabel) {
            stepLabel.textContent = isTeamMode ? "team steps" : "steps";
        }
        
        // Update target display
        updateTargetDisplay();
    }
    
    // Update target display
    function updateTargetDisplay() {
        const targetDisplay = document.querySelector('.target-display');
        if (targetDisplay) {
            const targetToUse = isTeamMode ? teamTarget : goalSteps;
            targetDisplay.textContent = `Target: ${targetToUse.toLocaleString()} steps`;
            
            if (isTeamMode) {
                targetDisplay.textContent += ` (${teamMembers} members)`;
            }
        }
    }
    
    // Generate a random number of steps (simulating actual step tracking)
    function generateRandomSteps() {
        // Simulate walking speed variations
        const now = Date.now();
        const timeDiff = now - lastStepTimestamp;
        lastStepTimestamp = now;
        
        // More steps if more time has passed (smoother simulation)
        const baseSteps = Math.floor(Math.random() * 5) + 1;
        return Math.max(1, Math.floor(baseSteps * (timeDiff / 1000)));
    }
      // Start tracking function
    function startTracking() {
        if (isTracking) return;
        
        isTracking = true;
        lastStepTimestamp = Date.now();
        
        // Visual feedback
        if (startBtn) {
            startBtn.classList.add('active');
            startBtn.disabled = true;
        }
        if (stopBtn) {
            stopBtn.disabled = false;
        }
        
        // Simulate steps increasing
        stepsInterval = setInterval(() => {
            const newSteps = generateRandomSteps();
            stepCount += newSteps;
            updateUI();
            
            // Check if reached goal
            const targetToUse = isTeamMode ? teamTarget : goalSteps;
            if (stepCount >= targetToUse) {
                if (isTeamMode) {
                    showTeamGoalReachedMessage();
                } else {
                    showGoalReachedMessage();
                }
            }
        }, 1000); // Update every second
    }
    
    // Stop tracking function
    function stopTracking() {
        if (!isTracking) return;
        
        isTracking = false;
        clearInterval(stepsInterval);
        
        // Visual feedback
        if (startBtn) {
            startBtn.classList.remove('active');
            startBtn.disabled = false;
        }
        if (stopBtn) {
            stopBtn.disabled = true;
        }
    }
    
    // Reset tracking function
    function resetTracking() {
        stopTracking();
        stepCount = 0;
        updateUI();
        
        // Reset buttons
        if (startBtn) {
            startBtn.disabled = false;
        }
        if (stopBtn) {
            stopBtn.disabled = true;
        }
    }    // Show team goal reached message
    function showTeamGoalReachedMessage() {
        stopTracking();
        
        // Create and show team congratulation message
        const trackerStats = document.querySelector('.tracker-stats');
        if (trackerStats) {
            const congratsMsg = document.createElement('div');
            congratsMsg.className = 'congrats-message team-congrats-message';
            
            // Calculate per-member contribution
            const avgContribution = Math.floor(stepCount / teamMembers);
            
            // Generate mock data for team member contributions (for visualization)
            const teamData = generateTeamMemberData();
            
            congratsMsg.innerHTML = `
                <div class="congrats-icon"><i class="fas fa-trophy"></i></div>
                <h3>Team Goal Achieved!</h3>
                <p>The "${teamName}" team has reached its goal of ${teamTarget.toLocaleString()} steps!</p>
                
                <div class="team-achievement-badge">
                    Team Achievement Unlocked: Group Milestone
                </div>
                
                <div class="team-members-list">
                    ${generateTeamMemberIcons()}
                </div>
                
                <div class="team-progress-summary">
                    <div>Each team member walked approximately ${avgContribution.toLocaleString()} steps</div>
                    <div class="team-progress-bar">
                        <div class="team-progress-fill"></div>
                    </div>
                </div>
                
                <div class="team-leaderboard">
                    <div class="leaderboard-header">Team Leaderboard</div>
                    ${generateLeaderboard(teamData)}
                </div>
                
                <p>Great teamwork! Share your achievement with the community.</p>
                
                <div class="team-actions">
                    <button class="track-btn start">Share Achievement</button>
                    <button class="track-btn reset">Set New Team Goal</button>
                </div>
            `;
            
            congratsMsg.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255,255,255,0.95);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 20px;
                border-radius: 16px;
                text-align: center;
                z-index: 10;
                animation: fadeIn 0.5s ease forwards;
                overflow-y: auto;
                max-height: 100%;
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                .team-actions {
                    display: flex;
                    gap: 10px;
                    margin-top: 15px;
                }
                .congrats-icon {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(45deg, #27ae60, #2ecc71);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 20px;
                    color: white;
                    font-size: 24px;
                    box-shadow: 0 5px 15px rgba(39, 174, 96, 0.3);
                }
                .team-congrats-message h3 {
                    font-size: 1.5rem;
                    color: #27ae60;
                    margin-bottom: 10px;
                }
                .team-congrats-message p {
                    margin-bottom: 15px;
                    color: #555;
                }
                @media (max-width: 480px) {
                    .team-actions {
                        flex-direction: column;
                        width: 100%;
                    }
                    .team-congrats-message h3 {
                        font-size: 1.3rem;
                    }
                    .team-congrats-message p {
                        font-size: 0.9rem;
                    }
                }
            `;
            
            document.head.appendChild(style);
            trackerStats.appendChild(congratsMsg);
            
            // Add event listeners
            const shareBtn = congratsMsg.querySelector('.track-btn.start');
            const newGoalBtn = congratsMsg.querySelector('.track-btn.reset');
            
            if (shareBtn) {
                shareBtn.addEventListener('click', () => {
                    showShareOptions(congratsMsg);
                });
            }
            
            if (newGoalBtn) {
                newGoalBtn.addEventListener('click', () => {
                    resetTracking();
                    trackerStats.removeChild(congratsMsg);
                });
            }
        }
    }
    
    // Generate mock data for team members
    function generateTeamMemberData() {
        const names = ['Sarah', 'John', 'Emily', 'Michael', 'Jessica', 'David', 'Lisa', 'Robert', 'Jennifer', 'Daniel', 
                       'Michelle', 'William', 'Elizabeth', 'James', 'Patricia', 'Richard', 'Linda', 'Thomas'];
        const teamData = [];
        
        // Use actual team members count
        for (let i = 0; i < teamMembers; i++) {
            // Generate a random contribution that approximately adds up to the total
            // For realism, we'll have some variation between members
            const baseContribution = Math.floor(stepCount / teamMembers);
            const variance = Math.floor(baseContribution * 0.3 * (Math.random() - 0.5));
            const contribution = Math.max(100, baseContribution + variance);
            
            teamData.push({
                name: names[i % names.length],
                steps: contribution
            });
        }
        
        // Sort by contribution, highest first
        return teamData.sort((a, b) => b.steps - a.steps);
    }
    
    // Generate leaderboard HTML
    function generateLeaderboard(teamData) {
        let leaderboardHTML = '';
        
        for (let i = 0; i < teamData.length; i++) {
            const member = teamData[i];
            leaderboardHTML += `
                <div class="leaderboard-entry">
                    <div class="leaderboard-rank">${i + 1}.</div>
                    <div class="leaderboard-name">${member.name}</div>
                    <div class="leaderboard-score">${member.steps.toLocaleString()} steps</div>
                </div>
            `;
        }
        
        return leaderboardHTML;
    }
    
    // Show share options
    function showShareOptions(parentElement) {
        const shareDiv = document.createElement('div');
        shareDiv.className = 'share-options';
        shareDiv.innerHTML = `
            <h4>Share Your Achievement</h4>
            <p>Share this achievement with your network:</p>
            <div class="share-buttons">
                <button class="share-btn facebook"><i class="fab fa-facebook-f"></i> Facebook</button>
                <button class="share-btn twitter"><i class="fab fa-twitter"></i> Twitter</button>
                <button class="share-btn whatsapp"><i class="fab fa-whatsapp"></i> WhatsApp</button>
                <button class="share-btn email"><i class="fas fa-envelope"></i> Email</button>
            </div>
            <button class="close-share-btn">Close</button>
        `;
        
        shareDiv.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
            z-index: 20;
            max-width: 90%;
            width: 320px;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .share-options h4 {
                color: #2c3e50;
                margin-bottom: 10px;
            }
            .share-options p {
                color: #555;
                margin-bottom: 15px;
                font-size: 0.9rem;
            }
            .share-buttons {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
                margin-bottom: 15px;
            }
            .share-btn {
                padding: 8px 0;
                border: none;
                border-radius: 5px;
                color: white;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .share-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .share-btn.facebook {
                background-color: #3b5998;
            }
            .share-btn.twitter {
                background-color: #1da1f2;
            }
            .share-btn.whatsapp {
                background-color: #25d366;
            }
            .share-btn.email {
                background-color: #ea4335;
            }
            .close-share-btn {
                width: 100%;
                padding: 8px 0;
                background-color: #f8f9fa;
                border: 1px solid #ced4da;
                border-radius: 5px;
                color: #2c3e50;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .close-share-btn:hover {
                background-color: #e9ecef;
            }
        `;
        
        document.head.appendChild(style);
        parentElement.appendChild(shareDiv);
        
        // Add event listeners to share buttons
        const shareButtons = shareDiv.querySelectorAll('.share-btn');
        shareButtons.forEach(button => {
            button.addEventListener('click', () => {
                alert(`Sharing via ${button.textContent.trim()} - This feature will be fully implemented soon!`);
                parentElement.removeChild(shareDiv);
            });
        });
        
        // Close button
        const closeBtn = shareDiv.querySelector('.close-share-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                parentElement.removeChild(shareDiv);
            });
        }
    }
    
    // Show goal reached message (individual)
    function showGoalReachedMessage() {
        stopTracking();
        
        // Create and show congratulation message
        const trackerStats = document.querySelector('.tracker-stats');
        if (trackerStats) {
            const congratsMsg = document.createElement('div');
            congratsMsg.className = 'congrats-message';
            congratsMsg.innerHTML = `
                <div class="congrats-icon"><i class="fas fa-trophy"></i></div>
                <h3>Congratulations!</h3>
                <p>You've reached your daily goal of ${goalSteps.toLocaleString()} steps!</p>
                <button class="track-btn reset">Set New Goal</button>
            `;
            
            congratsMsg.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255,255,255,0.95);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 20px;
                border-radius: 16px;
                text-align: center;
                z-index: 10;
                animation: fadeIn 0.5s ease forwards;
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.9); }
                    to { opacity: 1; transform: scale(1); }
                }
                .congrats-icon {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(45deg, #27ae60, #2ecc71);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 20px;
                    color: white;
                    font-size: 24px;
                    box-shadow: 0 5px 15px rgba(39, 174, 96, 0.3);
                }
                .congrats-message h3 {
                    font-size: 1.5rem;
                    color: #27ae60;
                    margin-bottom: 10px;
                }
                .congrats-message p {
                    margin-bottom: 20px;
                    color: #555;
                }
            `;
            
            document.head.appendChild(style);
            trackerStats.appendChild(congratsMsg);
            
            // Add event listener to the "Set New Goal" button
            const newGoalBtn = congratsMsg.querySelector('.track-btn.reset');
            if (newGoalBtn) {
                newGoalBtn.addEventListener('click', () => {
                    resetTracking();
                    trackerStats.removeChild(congratsMsg);
                });
            }
        }
    }
      // Update reminder text based on activity type
    function updateReminder(activity) {
        if (!reminderText) return;
        
        switch(activity) {
            case 'Morning Walk':
                reminderText.innerHTML = '<strong>Morning tip:</strong> Walking 30 minutes in the morning can boost your metabolism for the whole day!';
                break;
            case 'Evening Walk':
                reminderText.innerHTML = '<strong>Evening tip:</strong> An evening walk can help reduce stress and improve sleep quality.';
                break;
            case 'Gym Training':
                reminderText.innerHTML = '<strong>Training tip:</strong> Remember to stay hydrated and take short breaks between exercises.';
                break;
            case 'Team Building':
                reminderText.innerHTML = '<strong>Team tip:</strong> Group activities can boost morale and strengthen relationships! Consider enabling Team Mode to track progress together.';
                break;
            case 'Hiking':
                reminderText.innerHTML = '<strong>Hiking tip:</strong> Maintain a steady pace and enjoy the journey as much as the destination.';
                break;
            default:
                reminderText.innerHTML = '<strong>Health tip:</strong> Aim for 10,000 steps daily for better cardiovascular health.';
        }
    }
    
    // Set up event listeners for buttons
    if (startBtn) {
        startBtn.addEventListener('click', startTracking);
    }
    
    if (stopBtn) {
        stopBtn.addEventListener('click', stopTracking);
        stopBtn.disabled = true; // Initially disabled
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetTracking);
    }
    
    // Initialize UI
    updateUI();
    
    // Optional: Simulate device motion for step counting
    if (window.DeviceMotionEvent) {
        let sensitivity = 10; // Adjust based on testing
        let lastAcceleration = 0;
        
        window.addEventListener('devicemotion', function(event) {
            if (!isTracking) return;
            
            const acceleration = event.accelerationIncludingGravity;
            if (!acceleration) return;
            
            // Calculate total acceleration
            const totalAcc = Math.sqrt(
                Math.pow(acceleration.x || 0, 2) +
                Math.pow(acceleration.y || 0, 2) +
                Math.pow(acceleration.z || 0, 2)
            );
            
            // Detect step based on acceleration change
            const delta = Math.abs(totalAcc - lastAcceleration);
            if (delta > sensitivity) {
                stepCount++;
                updateUI();
            }
            
            lastAcceleration = totalAcc;
        });
    }
});
