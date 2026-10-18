// Interactive CLI Shell Emulator
const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');

const commands = {
    'help': 'Available commands: help, status, docker, skills, clear, contact',
    'status': 'Cluster Status: ALL SYSTEMS OPERATIONAL | Nodes: 3/3 Online | CPU: 12% | RAM: 42%',
    'docker': 'Containers: [nginx-proxy:UP], [flask-backend:UP], [postgres-db:UP], [outline-vpn:UP]',
    'skills': 'Primary Stack: AWS, Docker, Nginx, GitHub Actions, Linux, PostgreSQL, Terraform',
    'contact': 'Reach out via the form below or on LinkedIn / GitHub.',
    'clear': 'CLEAR'
};

if (terminalInput) {
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const cmd = this.value.trim().toLowerCase();
            this.value = '';

            if (cmd === '') return;

            // Output command line typed by user
            const cmdLine = document.createElement('div');
            cmdLine.className = 'term-line';
            cmdLine.innerHTML = `<span class="term-prompt">devops@cluster:~$</span> <span class="term-cmd">${escapeHtml(cmd)}</span>`;
            terminalOutput.appendChild(cmdLine);

            if (cmd === 'clear') {
                terminalOutput.innerHTML = '';
                return;
            }

            // Output response
            const resLine = document.createElement('div');
            resLine.className = 'term-line';

            if (commands[cmd]) {
                resLine.innerHTML = `<span class="term-res">${commands[cmd]}</span>`;
            } else {
                resLine.innerHTML = `<span class="term-err">bash: command not found: ${escapeHtml(cmd)}. Type 'help' for options.</span>`;
            }

            terminalOutput.appendChild(resLine);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });
}

// Utility to escape HTML inputs in CLI
function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Modal Dialog Controller
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close Modal when clicking background overlay
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};

// Form Handler Mocking
function handleFormSubmit(event) {
    event.preventDefault();
    const feedback = document.getElementById('formFeedback');
    feedback.style.color = '#3fb950';
    feedback.innerHTML = '> Message dispatched to DevOps team! (Simulation)';
    document.getElementById('contactForm').reset();
}