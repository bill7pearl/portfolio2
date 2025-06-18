// Hero 3D Scene - Live Coding Theme
class Hero3D {
    constructor() {
        this.canvas = document.getElementById('hero-3d');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.meshes = [];
        this.mouse = { x: 0, y: 0 };
        this.isMouseDown = false;
        this.rotationSpeed = 0.005;
        this.time = 0;
        this.typingIndex = 0;
        this.currentLine = 0;
        this.currentChar = 0;
        this.codeLines = [];
        this.typingSpeed = 50; // ms per character
        this.lastTypingTime = 0;
        
        this.init();
        this.animate();
        this.addEventListeners();
        this.createCodeOverlay();
    }

    init() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x00000000); // Transparent

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.canvas.clientWidth / this.canvas.clientHeight,
            0.1,
            1000
        );
        this.camera.position.z = 8;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        this.scene.add(directionalLight);

        // Create coding elements
        this.createCodeElements();
    }

    createCodeElements() {
        // Code editor background
        this.createCodeEditor();
        
        // Floating code snippets
        this.createFloatingCode();
        
        // Syntax highlighting particles
        this.createSyntaxParticles();
    }

    createCodeEditor() {
        // Main editor window
        const editorGeometry = new THREE.PlaneGeometry(5, 4);
        const editorMaterial = new THREE.MeshPhongMaterial({
            color: 0x0f172a,
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide
        });
        const editor = new THREE.Mesh(editorGeometry, editorMaterial);
        editor.position.set(0, 0, 0);
        this.scene.add(editor);
        this.meshes.push(editor);

        // Editor border
        const borderGeometry = new THREE.PlaneGeometry(5.2, 4.2);
        const borderMaterial = new THREE.MeshPhongMaterial({
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.3,
            side: THREE.DoubleSide
        });
        const border = new THREE.Mesh(borderGeometry, borderMaterial);
        border.position.set(0, 0, -0.01);
        this.scene.add(border);
        this.meshes.push(border);
    }

    createFloatingCode() {
        const floatingTexts = [
            "const", "let", "function", "return", "async", "await",
            "import", "export", "class", "extends", "try", "catch"
        ];

        floatingTexts.forEach((text, index) => {
            const textGeometry = new THREE.PlaneGeometry(0.8, 0.2);
            const textMaterial = new THREE.MeshPhongMaterial({
                color: 0x3b82f6,
                transparent: true,
                opacity: 0.7,
                side: THREE.DoubleSide
            });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);
            
            // Position around the editor
            const angle = (index / floatingTexts.length) * Math.PI * 2;
            const radius = 4;
            textMesh.position.set(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius * 0.6,
                1
            );
            
            textMesh.userData = {
                originalY: textMesh.position.y,
                speed: Math.random() * 0.01 + 0.005,
                text: text,
                type: 'floating'
            };
            
            this.scene.add(textMesh);
            this.meshes.push(textMesh);
        });
    }

    createSyntaxParticles() {
        // Create particles for syntax highlighting effect
        for (let i = 0; i < 20; i++) {
            const particleGeometry = new THREE.SphereGeometry(0.02, 6, 6);
            const particleMaterial = new THREE.MeshPhongMaterial({
                color: Math.random() > 0.5 ? 0x10b981 : 0x3b82f6,
                transparent: true,
                opacity: 0.6
            });
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            
            particle.position.set(
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 2
            );
            
            particle.userData = {
                originalY: particle.position.y,
                speed: Math.random() * 0.01 + 0.005,
                amplitude: Math.random() * 0.2 + 0.1,
                rotationSpeed: Math.random() * 0.02 + 0.01,
                type: 'syntax'
            };
            
            this.scene.add(particle);
            this.meshes.push(particle);
        }
    }

    createCodeOverlay() {
        // Create HTML overlay for code
        const overlay = document.createElement('div');
        overlay.id = 'code-overlay';
        overlay.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 400px;
            height: 300px;
            background: rgba(15, 23, 42, 0.9);
            border: 2px solid #3b82f6;
            border-radius: 8px;
            padding: 20px;
            font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
            font-size: 14px;
            line-height: 1.5;
            color: #ffffff;
            z-index: 10;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        `;

        // Create code container
        const codeContainer = document.createElement('div');
        codeContainer.id = 'code-container';
        codeContainer.style.cssText = `
            position: relative;
            height: 100%;
            overflow: hidden;
        `;

        // Create cursor
        const cursor = document.createElement('div');
        cursor.id = 'typing-cursor';
        cursor.style.cssText = `
            position: absolute;
            width: 2px;
            height: 20px;
            background: #10b981;
            animation: blink 1s infinite;
            z-index: 2;
        `;

        // Add CSS animation for cursor
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);

        overlay.appendChild(codeContainer);
        overlay.appendChild(cursor);
        this.canvas.parentElement.appendChild(overlay);

        // Initialize code lines
        this.codeLines = [
            "function createPortfolio() {",
            "  const skills = ['React', 'Node.js', 'Python'];",
            "  const projects = [];",
            "  ",
            "  projects.push({",
            "    name: 'Web App',",
            "    tech: 'React + Node.js'",
            "  });",
            "  ",
            "  return { skills, projects };",
            "}"
        ];

        this.startTyping();
    }

    startTyping() {
        this.typingInterval = setInterval(() => {
            this.typeNextCharacter();
        }, this.typingSpeed);
    }

    typeNextCharacter() {
        const codeContainer = document.getElementById('code-container');
        const cursor = document.getElementById('typing-cursor');

        if (this.currentLine >= this.codeLines.length) {
            // Reset to beginning
            this.currentLine = 0;
            this.currentChar = 0;
            codeContainer.innerHTML = '';
        }

        const line = this.codeLines[this.currentLine];
        
        if (this.currentChar === 0) {
            // Start new line
            const lineElement = document.createElement('div');
            lineElement.style.cssText = `
                position: relative;
                min-height: 20px;
                margin-bottom: 5px;
            `;
            lineElement.id = `line-${this.currentLine}`;
            codeContainer.appendChild(lineElement);
        }

        if (this.currentChar < line.length) {
            // Add next character
            const lineElement = document.getElementById(`line-${this.currentLine}`);
            const charSpan = document.createElement('span');
            charSpan.textContent = line[this.currentChar];
            charSpan.style.cssText = `
                color: ${this.getSyntaxColor(line[this.currentChar], this.currentChar, line)};
                transition: color 0.1s ease;
            `;
            lineElement.appendChild(charSpan);
            this.currentChar++;
        } else {
            // Move to next line
            this.currentLine++;
            this.currentChar = 0;
        }

        // Update cursor position
        this.updateCursorPosition();
    }

    getSyntaxColor(char, position, line) {
        // Simple syntax highlighting
        const keywords = ['function', 'const', 'let', 'return', 'push'];
        const strings = /['"`]/;
        const numbers = /[0-9]/;
        
        if (keywords.some(keyword => line.includes(keyword) && position >= line.indexOf(keyword) && position < line.indexOf(keyword) + keyword.length)) {
            return '#3b82f6'; // Blue for keywords
        }
        if (strings.test(char)) {
            return '#10b981'; // Green for strings
        }
        if (numbers.test(char)) {
            return '#f59e0b'; // Orange for numbers
        }
        if (char === '{' || char === '}' || char === '[' || char === ']' || char === '(' || char === ')') {
            return '#8b5cf6'; // Purple for brackets
        }
        
        return '#ffffff'; // White for regular text
    }

    updateCursorPosition() {
        const cursor = document.getElementById('typing-cursor');
        const lineElement = document.getElementById(`line-${this.currentLine}`);
        
        if (lineElement) {
            const lineRect = lineElement.getBoundingClientRect();
            const containerRect = document.getElementById('code-container').getBoundingClientRect();
            
            cursor.style.left = `${lineRect.left - containerRect.left + (this.currentChar * 8)}px`;
            cursor.style.top = `${lineRect.top - containerRect.top}px`;
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.time += 0.016;

        // Animate floating code elements
        for (let i = 2; i < 14; i++) {
            const mesh = this.meshes[i];
            if (mesh && mesh.userData.type === 'floating') {
                const userData = mesh.userData;
                mesh.position.y = userData.originalY + Math.sin(this.time * userData.speed) * 0.1;
                mesh.rotation.z = Math.sin(this.time * 0.5 + i) * 0.05;
            }
        }

        // Animate syntax particles
        for (let i = 14; i < 34; i++) {
            const particle = this.meshes[i];
            if (particle && particle.userData.type === 'syntax') {
                const userData = particle.userData;
                particle.position.y = userData.originalY + Math.sin(this.time * userData.speed) * userData.amplitude;
                particle.rotation.x += userData.rotationSpeed;
                particle.rotation.y += userData.rotationSpeed;
                particle.material.opacity = 0.3 + Math.sin(this.time * 2 + i) * 0.3;
            }
        }

        // Mouse interaction
        if (this.isMouseDown) {
            this.meshes[0].rotation.x += this.mouse.y * this.rotationSpeed;
            this.meshes[0].rotation.y += this.mouse.x * this.rotationSpeed;
        }

        this.renderer.render(this.scene, this.camera);
    }

    addEventListeners() {
        // Mouse move
        this.canvas.addEventListener('mousemove', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = (event.clientX - rect.left) / rect.width - 0.5;
            this.mouse.y = (event.clientY - rect.top) / rect.height - 0.5;
        });

        // Mouse down
        this.canvas.addEventListener('mousedown', () => {
            this.isMouseDown = true;
        });

        // Mouse up
        this.canvas.addEventListener('mouseup', () => {
            this.isMouseDown = false;
        });

        // Mouse leave
        this.canvas.addEventListener('mouseleave', () => {
            this.isMouseDown = false;
        });

        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (event) => {
            event.preventDefault();
            this.isMouseDown = true;
        });

        this.canvas.addEventListener('touchmove', (event) => {
            event.preventDefault();
            const touch = event.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = (touch.clientX - rect.left) / rect.width - 0.5;
            this.mouse.y = (touch.clientY - rect.top) / rect.height - 0.5;
        });

        this.canvas.addEventListener('touchend', () => {
            this.isMouseDown = false;
        });

        // Resize
        window.addEventListener('resize', () => {
            this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        });
    }
}

// Initialize 3D scene when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Hero3D();
}); 