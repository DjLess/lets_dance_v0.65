(function () {
    console.log("🚀 Patch: Sistema de Orientación 2777 - Modo RPG/Dungeon Dance Activado.");

    // Estilos con colores predefinidos: Cian (#00ffff) y Magenta (#ff00ff)
    const UI_STYLE = "position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:rgba(5,5,5,0.98); color:#00ffff; border:2px solid #00ffff; font-family:'Courier New', monospace; padding:20px; z-index:10001; cursor:pointer; box-shadow: 0 0 20px #00ffff; width:550px; text-align:center; display:none; border-radius:10px;";
    
    const hud = document.createElement('div');
    hud.id = "tutorial-hud-2777";
    hud.style.cssText = UI_STYLE;
    document.body.appendChild(hud);

    let tutorialActive = false;
    let currentStep = 0;
    let tempEntities = [];

    const STORY_CONTENT = [
        {
            text: "--- ¡BIENVENIDO AL CLUB, CIBORG! ---\n\nEres la unidad Cian. Tu procesador rítmico está listo. El objetivo es simple: mantén el combo más alto, ayuda a los NPCs y disfruta de la música hasta que el cuerpo aguante.",
        },
        {
            text: "--- EL ALMA DE LA PISTA ---\n\nVerás asistentes y NPCs por doquier. Ayúdalos a encenderse para subir la energía del club. ¡Explora cada rincón! El club premia la curiosidad y hay secretos escondidos que solo un fiestero experto encontraría.",
        },
        {
            text: "--- REHIDRATACIÓN VITAL (💧) ---\n\nMantener este ritmo agota tus reservas. Recoge agua para que tus circuitos no se sobrecalienten. Si el nivel de hidratación llega a cero, tu interfaz visual colapsará en un mar de glitches.",
            action: () => spawnSample('water', 1)
        },
        {
            text: "--- POTENCIADORES Y ESTILO (💊) ---\n\nEstos químicos multiplican tu puntaje, pero distorsionan tu visión. \n\n✨ TIP DE ESTILO: Si eliges el camino 'SANO - PURA AGÜITA' e ignoras los químicos, recibirás bonificaciones masivas de Estilo y el logro 'Straight Edge'.",
            action: () => spawnSample('powerup', 4)
        },
        {
            text: "--- EVALUACIÓN FINAL ---\n\nAl terminar la ronda (por tiempo o al salir), evaluaremos tu Estilo, combos y misiones cumplidas. ¡Piensa en esto como un Tony Hawk rítmico! \n\n[ HAZ CLIC PARA EMPEZAR LA FIESTA ]",
        }
    ];

    function spawnSample(type, count) {
        if (!window.player) return;
        clearTempEntities();
        
        for (let i = 0; i < count; i++) {
            const item = {
                x: window.player.x + (i * 60) - (count * 30),
                y: window.player.y - 120,
                type: type === 'water' ? 'hydra' : 'speed',
                isTemp: true
            };
            
            if (type === 'water' && window.items) {
                window.items.push(item);
            } else if (type === 'powerup' && window.powerUps) {
                window.powerUps.push(item);
            }
            tempEntities.push({ obj: item, type: type });
        }
    }

    function clearTempEntities() {
        if (window.items) window.items = window.items.filter(i => !i.isTemp);
        if (window.powerUps) window.powerUps = window.powerUps.filter(p => !p.isTemp);
        tempEntities = [];
    }

    function showStep() {
        if (!tutorialActive) return;
        const step = STORY_CONTENT[currentStep];
        
        if (step.action) step.action();

        hud.style.display = "block";
        hud.innerHTML = `
            <div style="color:#ff00ff; font-weight:bold; margin-bottom:10px; font-size:1.3em; letter-spacing:2px;">> CONEXIÓN ESTABLECIDA</div>
            <div style="white-space:pre-wrap; text-align:left; margin-bottom:15px; line-height:1.4;">${step.text}</div>
            <div style="color:#ff00ff; font-size:0.9em; animation: flash 1s infinite;">[ CLIC PARA CONTINUAR EL BEAT ]</div>
        `;
    }

    hud.onclick = (e) => {
        e.stopPropagation();
        currentStep++;
        if (currentStep < STORY_CONTENT.length) {
            showStep();
        } else {
            endTutorial();
        }
    };

    function endTutorial() {
        clearTempEntities();
        tutorialActive = false;
        hud.style.display = "none";
        if (document.getElementById('btn-help')) {
            document.getElementById('btn-help').style.display = "block";
        }
    }

    function createHelpBtn() {
        if (document.getElementById('btn-help')) return;
        const btn = document.createElement('button');
        btn.id = "btn-help";
        btn.innerText = "COMO BAILAR 2777";
        btn.style.cssText = "position:fixed; top:20px; right:20px; background:#000; color:#00ffff; border:2px solid #00ffff; padding:12px 20px; cursor:pointer; font-family:monospace; z-index:10000; font-weight:bold; box-shadow: 0 0 10px #00ffff; border-radius:5px;";
        btn.onclick = () => {
            btn.style.display = "none";
            tutorialActive = true;
            currentStep = 0;
            showStep();
        };
        document.body.appendChild(btn);
    }

    const style = document.createElement("style");
    style.innerText = `@keyframes flash { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }`;
    document.head.appendChild(style);

    createHelpBtn();

function clearInternalWalls() {
        if (typeof grid !== 'undefined' && typeof gridW !== 'undefined') {
            console.log("🧹 Limpiando obstáculos internos del mapa...");
            for (let y = 1; y < gridH - 1; y++) {
                for (let x = 1; x < gridW - 1; x++) {
                    // Si el valor es 1 (pared), lo convertimos en 0 (suelo libre)
                    if (grid[y][x] === 1) {
                        grid[y][x] = 0;
                    }
                }
            }
        }

// --- 2. CONFIGURACIÓN LÁSER DINÁMICA (CORREGIDA) ---
    let lastBeatChecked = -1;

    window.drawLasersBehindDJ = function() {
        if (!appearance.lasers || !isStarted) return;

        // LÓGICA DE CAMBIO CADA 16 BEATS
        if (typeof djStep !== 'undefined' && djStep % 16 === 0 && djStep !== lastBeatChecked) {
            lastBeatChecked = djStep;
            
            // Variación aleatoria de fuentes (1 a 3)
            appearance.laserSourceCount = Math.floor(Math.random() * 3) + 1;
            
            // Si hay 1 sola fuente, forzamos 1 solo rayo (no abanico)
            // Si hay más de 1, permitimos el abanico de 5 para llenar la pista
            appearance.laserBeamCount = (appearance.laserSourceCount === 1) ? 1 : 5;
            
            console.log(`📡 Beat ${djStep}: Fuentes: ${appearance.laserSourceCount}, Rayos: ${appearance.laserBeamCount}`);
        }

        const time = Date.now() * 0.0015;
        const spacing = canvas.width / (appearance.laserSourceCount + 1);
        
        ctx.save();
        ctx.globalAlpha = appearance.laserIntensity || 0.6;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;

        for (let s = 1; s <= appearance.laserSourceCount; s++) {
            const xSrc = s * spacing;
            const ySrc = 40; 
            
            // Dibujamos según la cantidad de rayos definida (1 o 5)
            for (let i = 0; i < appearance.laserBeamCount; i++) {
                ctx.beginPath();
                ctx.strokeStyle = appearance.laserColorMode === 'magenta' ? '#ff00ff' : '#00ffff';
                ctx.shadowColor = ctx.strokeStyle;
                ctx.moveTo(xSrc, ySrc);
                
                let tx;
                if (appearance.laserBeamCount === 1) {
                    // Movimiento de un solo rayo central
                    tx = xSrc + Math.sin(time + s) * 150;
                } else {
                    // Movimiento en abanico (solo cuando hay 2 o 3 fuentes)
                    tx = xSrc + Math.sin(time + s) * 180 + (i * 40 - 80);
                }
                
                ctx.lineTo(tx, canvas.height);
                ctx.stroke();
            }
        }
        ctx.restore();
    };

    // --- 3. SINCRONIZACIÓN FORZADA ---
    function syncV15Settings() {
        if (typeof appearance !== 'undefined') {
            // FORZAR VALORES INICIALES PARA 1 SOLO RAYO
            appearance.lasers = true;
            appearance.laserSourceCount = 1;
            appearance.laserBeamCount = 1; 
            appearance.laserIntensity = 0.6;
            
            appearance.glow = true;
            appearance.crt = true;
            appearance.scanlines = true;
            appearance.particles = false;

            // Actualizar visualmente los toggles del panel
            const toggles = {
                'check-lasers': true,
                'check-glow': true,
                'check-crt': true,
                'check-particles': false
            };

            for (let id in toggles) {
                const el = document.getElementById(id);
                if (el) {
                    el.checked = toggles[id];
                    el.dispatchEvent(new Event('change'));
                }
            }
        }
    }

    // --- 4. RENDER E INICIALIZACIÓN ---
    const originalRender = window.render;
    window.render = function() {
        drawLasersBehindDJ();
        if (originalRender) originalRender();
    };

    setTimeout(() => {
        syncV15Settings();
        console.log("✅ Sistema sincronizado: Iniciando con 1 solo láser.");
    }, 1000);

})();
