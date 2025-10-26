
'use client';

type SoundType = 
  | 'click-1' 
  | 'click-2'
  | 'reveal-default'
  | 'reveal-shiny'
  | 'reveal-cardboard'
  | 'haptic-1'
  | 'haptic-2'
  | 'haptic-3'
  | 'toggle-on'
  | 'toggle-off'
  | 'badge-unlocked'
  | 'message-alive'
  | 'message-dead'
  | 'message-default'
  | 'celebration-magic'
  | 'celebration-long'
  | 'box-shake';

export const soundList: SoundType[] = ['click-1', 'click-2', 'reveal-default', 'reveal-shiny', 'reveal-cardboard', 'haptic-1', 'haptic-2', 'haptic-3', 'toggle-on', 'toggle-off', 'badge-unlocked', 'message-alive', 'message-dead', 'message-default', 'celebration-magic', 'celebration-long', 'box-shake'];

let soundEnabled = true;
let masterVolume = 1.0;

// This function subscribes to the sound setting from local storage
if (typeof window !== 'undefined') {
  const updateSoundStatus = () => {
    try {
      const storedSound = localStorage.getItem('quantum-cat-sound-enabled');
      soundEnabled = storedSound ? JSON.parse(storedSound) : true;
      
      const storedVolume = localStorage.getItem('quantum-cat-volume');
      masterVolume = storedVolume ? parseFloat(storedVolume) : 1.0;

    } catch {
      soundEnabled = true;
      masterVolume = 1.0;
    }
  };

  updateSoundStatus(); // Initial check

  // Listen for changes from other tabs
  window.addEventListener('storage', (event) => {
    if (event.key === 'quantum-cat-sound-enabled' || event.key === 'quantum-cat-volume') {
      updateSoundStatus();
    }
  });

  // Custom event for same-tab updates
  window.addEventListener('sound-setting-changed', updateSoundStatus);
}


// This function generates sounds using the Web Audio API,
// so it only works on the client-side.
export const playSound = (type: SoundType) => {
  // Check if window is defined (i.e., we're on the client)
  if (typeof window === 'undefined') return;

  if (soundEnabled && 'vibrate' in navigator) {
    if (type.startsWith('click') || type.startsWith('haptic') || type.startsWith('toggle')) {
      navigator.vibrate(50); // Short vibration for clicks
    } else if (type.startsWith('reveal')) {
      navigator.vibrate([100, 50, 100]); // Pattern for reveals
    } else if (type === 'badge-unlocked' || type === 'celebration-long') {
        navigator.vibrate([100, 30, 100, 30, 100]);
    }
  }

  if (!soundEnabled) return;


  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (!audioContext) {
    console.warn("Web Audio API is not supported in this browser.");
    return;
  }

  const masterGain = audioContext.createGain();
  masterGain.gain.value = masterVolume;
  masterGain.connect(audioContext.destination);
  
  const now = audioContext.currentTime;

  if (type === 'click-1') {
    // Low-frequency thump for body
    const bodyOsc = audioContext.createOscillator();
    bodyOsc.type = 'sine';
    bodyOsc.frequency.setValueAtTime(120, now);
    const bodyGain = audioContext.createGain();
    bodyGain.gain.setValueAtTime(0.3, now);
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
    bodyOsc.connect(bodyGain);
    bodyGain.connect(masterGain);
    
    // High-frequency click for latch
    const latchOsc = audioContext.createOscillator();
    latchOsc.type = 'triangle';
    latchOsc.frequency.setValueAtTime(800, now);
    const latchGain = audioContext.createGain();
    latchGain.gain.setValueAtTime(0.15, now);
    latchGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
    latchOsc.connect(latchGain);
    latchGain.connect(masterGain);

    bodyOsc.start(now);
    bodyOsc.stop(now + 0.15);
    latchOsc.start(now);
    latchOsc.stop(now + 0.05);

  } else if (type === 'click-2') {
    const osc = audioContext.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(1500, now);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.1);
    
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gainNode);
    gainNode.connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.1);

  } else if (type === 'reveal-default') {
     const gainNode = audioContext.createGain();
     gainNode.connect(masterGain);
     gainNode.gain.value = 0.15;

     for (let i = 0; i < 5; i++) {
        const osc = audioContext.createOscillator();
        osc.type = 'sine';
        const freq = 330 + i * 150 + Math.random() * 50;
        osc.frequency.setValueAtTime(freq, now + i * 0.05);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + i * 0.05 + 0.3);
        
        const gain = audioContext.createGain();
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(1, now + i * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.4);

        osc.connect(gain);
        gain.connect(gainNode);

        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.4);
     }
  } else if (type === 'reveal-shiny') {
    const notes = [1046.50, 1396.91, 1567.98]; // C6, F6, G6
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.2;
    gainNode.connect(masterGain);
    
    notes.forEach((note, i) => {
        const osc = audioContext.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note, now + i * 0.08);
        
        const env = audioContext.createGain();
        env.gain.setValueAtTime(0, now);
        env.gain.linearRampToValueAtTime(1, now + i * 0.08 + 0.02);
        env.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);
        
        osc.connect(env);
        env.connect(gainNode);
        
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.4);
    });

  } else if (type === 'reveal-cardboard') {
    const bufferSize = audioContext.sampleRate * 0.3;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    const noise = audioContext.createBufferSource();
    noise.buffer = buffer;

    const bandpass = audioContext.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1500, now);
    bandpass.Q.setValueAtTime(5, now);

    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.4, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    noise.connect(bandpass);
    bandpass.connect(gainNode);
    gainNode.connect(masterGain);

    noise.start(now);
    noise.stop(now + 0.3);
    
  } else if (type === 'haptic-1') {
    const osc = audioContext.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, now);
    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.05);
  } else if (type === 'haptic-2') {
    const osc = audioContext.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.1);
  } else if (type === 'haptic-3') {
    const osc1 = audioContext.createOscillator();
    osc1.type = 'square';
    osc1.frequency.setValueAtTime(1200, now);
    const gain1 = audioContext.createGain();
    gain1.gain.setValueAtTime(0.1, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
    osc1.connect(gain1);
    gain1.connect(masterGain);
    osc1.start(now);
    osc1.stop(now + 0.03);

    const osc2 = audioContext.createOscillator();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(800, now + 0.04);
    const gain2 = audioContext.createGain();
    gain2.gain.setValueAtTime(0.1, now + 0.04);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.04 + 0.03);
    osc2.connect(gain2);
    gain2.connect(masterGain);
    osc2.start(now + 0.04);
    osc2.stop(now + 0.04 + 0.03);
  } else if (type === 'toggle-on') {
    const osc = audioContext.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.1);
  } else if (type === 'toggle-off') {
    const osc = audioContext.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.1);
  } else if (type === 'badge-unlocked') {
    const notes = [659.25, 783.99, 1046.50, 1318.51]; // E5, G5, C6, E6
    const gainNode = audioContext.createGain();
    gainNode.connect(masterGain);

    notes.forEach((note, i) => {
        const osc = audioContext.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note, now);

        const detuneOsc = audioContext.createOscillator();
        detuneOsc.type = 'sine';
        detuneOsc.frequency.setValueAtTime(5, now);
        const detuneGain = audioContext.createGain();
        detuneGain.gain.value = 5; // Detune by 5 cents
        detuneOsc.connect(detuneGain);
        detuneGain.connect(osc.detune);

        osc.connect(gainNode);

        const startTime = now + i * 0.1;
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.25, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        osc.start(startTime);
        osc.stop(startTime + 0.5);
        detuneOsc.start(startTime);
        detuneOsc.stop(startTime + 0.5);
    });
  } else if (type === 'message-alive') {
    const osc = audioContext.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(1800, now + 0.3);
    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === 'message-dead') {
    const osc = audioContext.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.4);
     const gain = audioContext.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.4);
  } else if (type === 'message-default') {
     const osc = audioContext.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1000, now);
    osc.frequency.exponentialRampToValueAtTime(1500, now + 0.3);
    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === 'celebration-magic') {
    const gainNode = audioContext.createGain();
    gainNode.connect(masterGain);
    gainNode.gain.value = 0.3;

    // Sweeping magical riser
    const riserOsc = audioContext.createOscillator();
    riserOsc.type = 'sawtooth';
    riserOsc.frequency.setValueAtTime(200, now);
    riserOsc.frequency.exponentialRampToValueAtTime(2000, now + 1.5);
    
    const riserFilter = audioContext.createBiquadFilter();
    riserFilter.type = 'lowpass';
    riserFilter.frequency.setValueAtTime(100, now);
    riserFilter.frequency.exponentialRampToValueAtTime(3000, now + 1.5);
    
    riserOsc.connect(riserFilter);
    riserFilter.connect(gainNode);
    riserOsc.start(now);
    riserOsc.stop(now + 1.5);
    
    // Chime sparkles
    for (let i = 0; i < 8; i++) {
        const osc = audioContext.createOscillator();
        osc.type = 'sine';
        const freq = 1000 + Math.random() * 2000;
        osc.frequency.setValueAtTime(freq, now);

        const gain = audioContext.createGain();
        const startTime = now + Math.random() * 1;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(Math.random() * 0.4, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1 + Math.random());
        
        osc.connect(gain);
        gain.connect(gainNode);
        osc.start(startTime);
        osc.stop(startTime + 1.2);
    }
  } else if (type === 'celebration-long') {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const mainGain = audioContext.createGain();
      mainGain.gain.setValueAtTime(0.3, now);
      mainGain.connect(masterGain);

      notes.forEach((note, i) => {
          const osc = audioContext.createOscillator();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(note, now);

          const gainNode = audioContext.createGain();
          gainNode.gain.setValueAtTime(0, now + i * 0.1);
          gainNode.gain.linearRampToValueAtTime(1, now + i * 0.1 + 0.1);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 1.5);

          osc.connect(gainNode);
          gainNode.connect(mainGain);

          osc.start(now + i * 0.1);
          osc.stop(now + i * 0.1 + 1.6);
      });
  } else if (type === 'box-shake') {
    const bufferSize = audioContext.sampleRate * 0.4;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const noiseSource = audioContext.createBufferSource();
    noiseSource.buffer = buffer;

    const lowpass = audioContext.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(200, now);

    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(1, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    noiseSource.connect(lowpass);
    lowpass.connect(gainNode);
    gainNode.connect(masterGain);

    noiseSource.start(now);
    noiseSource.stop(now + 0.4);
  }
};
