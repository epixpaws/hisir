<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Doors Replica</title>
    <meta name="description" content="A modern web experience" />
    <meta name="theme-color" content="#000000" />
    <link rel="icon" href="/favicon.ico" />
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <style>
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        
        .underwater-light {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(ellipse at center, rgba(0,100,255,0.2) 0%, rgba(0,50,150,0.5) 70%, rgba(0,20,50,0.8) 100%);
            z-index: 1;
        }
        
        .bubble {
            position: absolute;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: float-up 4s infinite ease-in;
        }
        
        @keyframes float-up {
            0% { transform: translateY(100vh) scale(0); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { transform: translateY(-100px) scale(1); opacity: 0; }
        }
        
        .atmospheric-text {
            color: white;
            text-align: center;
            font-family: 'Arial', sans-serif;
            text-shadow: 0 0 10px rgba(0, 200, 255, 0.8);
            animation: pulse 2s infinite alternate;
        }
        
        @keyframes pulse {
            from { opacity: 0.7; text-shadow: 0 0 5px rgba(0, 200, 255, 0.8); }
            to { opacity: 1; text-shadow: 0 0 20px rgba(0, 200, 255, 1); }
        }
        
        .moon {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: rgba(200, 230, 255, 0.9);
            box-shadow: 0 0 50px rgba(200, 230, 255, 0.5);
            position: relative;
            overflow: hidden;
        }
        
        .moon::after {
            content: '';
            position: absolute;
            top: -15px;
            left: 20px;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: rgba(0, 20, 50, 0.9);
        }
    </style>
</head>
<body class="min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950">
    <!-- Underwater light overlay -->
    <div class="underwater-light"></div>
    
    <!-- Bubbles will be added here by JavaScript -->
    <div id="bubbles-container"></div>
    
    <!-- Main Content -->
    <div class="relative z-10 min-h-screen flex flex-col items-center justify-center opacity-100 transition-opacity duration-2000" id="main-content">
        <!-- Crescent Moon -->
        <div class="absolute top-16 md:top-20 left-1/2 transform -translate-x-1/2">
            <div class="moon"></div>
        </div>
        
        <!-- Atmospheric Text -->
        <div class="atmospheric-text p-4">
            <h1 class="text-4xl md:text-6xl font-bold mb-4">Welcome to the Deep</h1>
            <p class="text-xl md:text-2xl">The water is calm and deep...</p>
        </div>
    </div>
    
    <!-- Background Audio -->
    <audio autoplay loop id="bg-audio">
        <source src="https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3" type="audio/mp3">
        Your browser does not support the audio element.
    </audio>
    
    <script>
        // Create bubbles
        function createBubbles() {
            const container = document.getElementById('bubbles-container');
            const bubbleCount = 30;
            
            for (let i = 0; i < bubbleCount; i++) {
                const bubble = document.createElement('div');
                const size = Math.random() * 20 + 5;
                const duration = Math.random() * 6 + 4;
                const delay = Math.random() * 5;
                const left = Math.random() * 100;
                
                bubble.className = 'bubble';
                bubble.style.width = `${size}px`;
                bubble.style.height = `${size}px`;
                bubble.style.left = `${left}%`;
                bubble.style.animationDuration = `${duration}s`;
                bubble.style.animationDelay = `${delay}s`;
                
                container.appendChild(bubble);
            }
        }
        
        // Initialize audio with user interaction
        document.addEventListener('click', function initAudio() {
            const audio = document.getElementById('bg-audio');
            if (audio) {
                audio.volume = 0.3;
                audio.play().catch(e => console.log('Audio play failed:', e));
            }
            // Remove the event listener after first interaction
            document.removeEventListener('click', initAudio);
        });
        
        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            createBubbles();
            
            // Add some random flickering effect to the text
            const text = document.querySelector('.atmospheric-text');
            setInterval(() => {
                text.style.opacity = 0.7 + Math.random() * 0.3;
            }, 1000);
        });
    </script>
</body>
</html>
