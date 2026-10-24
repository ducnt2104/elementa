// src/audio/soundEngine.ts
// Native Web Audio API Procedural Synthesizer for ELEMENTA (Zero-latency, 100% Offline)

export class SoundEngine {
  private ctx: AudioContext | null = null;
  private sfxGain: GainNode | null = null;
  private masterCompressor: DynamicsCompressorNode | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.7;

  constructor() {
    // Lazy init on first user interaction
  }

  private initContext() {
    if (typeof window === 'undefined') return;
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        this.ctx = new AudioCtx();
        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.value = this.isMuted ? 0 : this.volume;

        // Route through DynamicsCompressor to prevent clipping during simultaneous multi-chain cascades
        if (typeof this.ctx.createDynamicsCompressor === 'function') {
          this.masterCompressor = this.ctx.createDynamicsCompressor();
          this.masterCompressor.threshold.setValueAtTime(-6, this.ctx.currentTime);
          this.masterCompressor.knee.setValueAtTime(12, this.ctx.currentTime);
          this.masterCompressor.ratio.setValueAtTime(16, this.ctx.currentTime);
          this.masterCompressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
          this.masterCompressor.release.setValueAtTime(0.15, this.ctx.currentTime);
          this.masterCompressor.connect(this.ctx.destination);
          this.sfxGain.connect(this.masterCompressor);
        } else {
          this.sfxGain.connect(this.ctx.destination);
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(muted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.sfxGain && this.ctx && !this.isMuted) {
      this.sfxGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public playUiClick() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public playCardSelect() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {}
  }

  public playExplosion() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;

      // Low frequency thump
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, t);
      osc.frequency.exponentialRampToValueAtTime(30, t + 0.4);

      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(t + 0.45);

      // Noise sizzle
      const bufferSize = this.ctx.sampleRate * 0.3;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, t);
      filter.frequency.linearRampToValueAtTime(100, t + 0.3);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.3, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.sfxGain);

      whiteNoise.start();
    } catch {}
  }

  public playShield() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(520, t + 0.2);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(t + 0.3);
    } catch {}
  }

  public playErrorFizzle() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.linearRampToValueAtTime(110, t + 0.25);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(t + 0.25);
    } catch {}
  }

  public playTurretShot() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(200, t + 0.15);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.15);
    } catch {}
  }

  public playSpellCast() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, t);
      osc.frequency.exponentialRampToValueAtTime(950, t + 0.18);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.18);
    } catch {}
  }

  public playReactionSuccess() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, t); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.50, t + 0.2); // C6

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.25);
    } catch {}
  }

  public playVictory() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25]; // C E G C
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * 0.12);

        gain.gain.setValueAtTime(0.2, t + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.12 + 0.3);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(t + idx * 0.12);
        osc.stop(t + idx * 0.12 + 0.3);
      });
    } catch {}
  }

  public playChemicalDetonation(isExothermic: boolean = true) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;

      if (isExothermic) {
        // Deep resonant sub-bass thump + sizzling combustion
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, t);
        osc.frequency.exponentialRampToValueAtTime(32, t + 0.45);

        gain.gain.setValueAtTime(0.45, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(t);
        osc.stop(t + 0.5);

        // High velocity gas hiss / burst
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.35);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.1));
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1200, t);
        filter.frequency.exponentialRampToValueAtTime(300, t + 0.35);
        filter.Q.setValueAtTime(2.5, t);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.35, t);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.sfxGain);

        noise.start(t);
      } else {
        // Endothermic / Ice crystallization chime
        const chimeFreqs = [880, 1318.5, 1760];
        chimeFreqs.forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + idx * 0.04);

          gain.gain.setValueAtTime(0.2, t + idx * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.04 + 0.35);

          osc.connect(gain);
          gain.connect(this.sfxGain!);

          osc.start(t + idx * 0.04);
          osc.stop(t + idx * 0.04 + 0.35);
        });
      }
    } catch {}
  }

  public playTurretLaserSweep() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(950, t);
      osc.frequency.exponentialRampToValueAtTime(280, t + 0.22);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, t);
      filter.frequency.exponentialRampToValueAtTime(400, t + 0.22);
      filter.Q.setValueAtTime(5.0, t);

      gain.gain.setValueAtTime(0.28, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.22);
    } catch {}
  }

  public playNeutralMonsterRoar() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(85, t);
      osc1.frequency.linearRampToValueAtTime(45, t + 0.4);

      osc2.type = 'square';
      osc2.frequency.setValueAtTime(115, t);
      osc2.frequency.linearRampToValueAtTime(55, t + 0.4);

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.sfxGain);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 0.45);
      osc2.stop(t + 0.45);
    } catch {}
  }

  public playLevelUp() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const notes = [392.00, 523.25, 659.25, 783.99, 1046.50]; // G4, C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * 0.08);

        gain.gain.setValueAtTime(0.22, t + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(t + idx * 0.08);
        osc.stop(t + idx * 0.08 + 0.35);
      });
    } catch {}
  }

  public playRecall() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.6);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.65);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.65);
    } catch {}
  }

  public playAnnouncerChime(
    type:
      | 'FIRST_BLOOD'
      | 'DOUBLE_KILL'
      | 'TRIPLE_KILL'
      | 'QUADRA_KILL'
      | 'PENTA_KILL'
      | 'ACE'
      | 'KILLING_SPREE'
      | 'RAMPAGE'
      | 'UNSTOPPABLE'
      | 'SHUTDOWN'
      | 'HERO_KILL'
      | 'TURRET_DESTROYED'
      | 'MONSTER_SLAIN'
      | 'TEAM_SYNERGY'
  ) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;

      if (type === 'TEAM_SYNERGY') {
        // Magical harmonic synergy arpeggio: C5 -> E5 -> G5 -> C6
        const freqs = [523.25, 659.25, 783.99, 1046.50];
        freqs.forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + idx * 0.07);
          gain.gain.setValueAtTime(0.22, t + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.07 + 0.35);
          osc.connect(gain);
          gain.connect(this.sfxGain!);
          osc.start(t + idx * 0.07);
          osc.stop(t + idx * 0.07 + 0.35);
        });
      } else if (type === 'PENTA_KILL' || type === 'UNSTOPPABLE' || type === 'ACE') {
        // Grand heroic fanfare: 5-note brass fanfare
        const freqs = [392.00, 440.00, 523.25, 587.33, 783.99]; // G4, A4, C5, D5, G5
        freqs.forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, t + idx * 0.1);
          gain.gain.setValueAtTime(0.25, t + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.1 + 0.4);
          osc.connect(gain);
          gain.connect(this.sfxGain!);
          osc.start(t + idx * 0.1);
          osc.stop(t + idx * 0.1 + 0.4);
        });
      } else if (type === 'TRIPLE_KILL' || type === 'QUADRA_KILL' || type === 'RAMPAGE') {
        // Rapid 3-note ascending fanfare
        const freqs = [440.00, 554.37, 659.25]; // A4, C#5, E5
        freqs.forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, t + idx * 0.08);
          gain.gain.setValueAtTime(0.22, t + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.3);
          osc.connect(gain);
          gain.connect(this.sfxGain!);
          osc.start(t + idx * 0.08);
          osc.stop(t + idx * 0.08 + 0.3);
        });
      } else if (type === 'DOUBLE_KILL' || type === 'FIRST_BLOOD' || type === 'KILLING_SPREE') {
        // High-tempo 2-note chime
        const freqs = [523.25, 659.25]; // C5, E5
        freqs.forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, t + idx * 0.1);
          gain.gain.setValueAtTime(0.22, t + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.1 + 0.28);
          osc.connect(gain);
          gain.connect(this.sfxGain!);
          osc.start(t + idx * 0.1);
          osc.stop(t + idx * 0.1 + 0.28);
        });
      } else if (type === 'SHUTDOWN') {
        // Dramatic minor-to-major cadence: E4 -> G4 -> C5
        const freqs = [329.63, 392.00, 523.25];
        freqs.forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, t + idx * 0.12);
          gain.gain.setValueAtTime(0.2, t + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.12 + 0.35);
          osc.connect(gain);
          gain.connect(this.sfxGain!);
          osc.start(t + idx * 0.12);
          osc.stop(t + idx * 0.12 + 0.35);
        });
      } else if (type === 'TURRET_DESTROYED') {
        this.playExplosion();
      } else if (type === 'MONSTER_SLAIN') {
        this.playNeutralMonsterRoar();
      } else {
        // Standard hero kill sound: quick high-register chime
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, t); // D5
        osc.frequency.exponentialRampToValueAtTime(880.00, t + 0.15); // A5
        gain.gain.setValueAtTime(0.2, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.2);
      }
    } catch {}
  }

  /**
   * Procedural Chemical Laboratory Sounds & Haptic Feedback
   */

  /**
   * Gas evolution / Effervescence: Authentic Minnaert bubble pops + froth hiss
   * Used for acid + carbonate (CO2), alkali metal in water (H2), effervescent reactions
   */
  public playEffervescence(intensity: 'gentle' | 'vigorous' = 'gentle') {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const bubbleCount = intensity === 'vigorous' ? 9 : 5;
      const duration = intensity === 'vigorous' ? 0.65 : 0.4;

      // 1. Minnaert bubble pops: rising micro-chirps
      for (let i = 0; i < bubbleCount; i++) {
        const bubbleTime = t + (i / bubbleCount) * duration * 0.9 + (Math.random() * 0.04);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Bubble frequency rises sharply as cavity detaches
        const startFreq = 400 + Math.random() * 300;
        const endFreq = startFreq + 350 + Math.random() * 250;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(startFreq, bubbleTime);
        osc.frequency.exponentialRampToValueAtTime(endFreq, bubbleTime + 0.035);

        const bubbleGain = intensity === 'vigorous' ? 0.16 : 0.1;
        gain.gain.setValueAtTime(0.001, bubbleTime);
        gain.gain.linearRampToValueAtTime(bubbleGain, bubbleTime + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.001, bubbleTime + 0.04);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(bubbleTime);
        osc.stop(bubbleTime + 0.045);
      }

      // 2. High-frequency foaming froth hiss
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.25));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1600, t);
      filter.frequency.linearRampToValueAtTime(2200, t + duration);
      filter.Q.setValueAtTime(3.0, t);

      const noiseGain = this.ctx.createGain();
      const peakNoise = intensity === 'vigorous' ? 0.18 : 0.1;
      noiseGain.gain.setValueAtTime(0.01, t);
      noiseGain.gain.linearRampToValueAtTime(peakNoise, t + 0.05);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + duration);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.sfxGain);

      noise.start(t);
    } catch {}
  }

  /**
   * Crystal Shatter / Glass fracture: High-register bell harmonics + sharp noise crack
   * Used for crystallization, mineral cleavage, brittle fractures
   */
  public playCrystalShatter() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;

      // Resonant glassy harmonics
      const freqs = [2150, 3240, 4850];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.88, t + 0.35);

        const harmGain = 0.18 / (idx + 1);
        gain.gain.setValueAtTime(harmGain, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(t);
        osc.stop(t + 0.35);
      });

      // Sharp initial crack noise
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.08);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1);
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(3200, t);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.22, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.sfxGain);

      noise.start(t);
    } catch {}
  }

  /**
   * Bunsen Burner Hiss: Flame cone combustion rush
   * Used for flame test visualizer, heating reactions, catalyst activation
   */
  public playBunsenBurnerHiss(duration: number = 0.5) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = Math.max(0.2, Math.min(2.0, duration));

      // Flame cavity low roar
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(115, t);
      osc.frequency.linearRampToValueAtTime(125, t + dur);

      oscGain.gain.setValueAtTime(0.001, t);
      oscGain.gain.linearRampToValueAtTime(0.12, t + 0.05);
      oscGain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(oscGain);
      oscGain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      // Gas nozzle rush
      const bufferSize = Math.floor(this.ctx.sampleRate * dur);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1);
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(820, t);
      filter.Q.setValueAtTime(1.8, t);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, t);
      noiseGain.gain.linearRampToValueAtTime(0.2, t + 0.04);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.sfxGain);

      noise.start(t);
    } catch {}
  }

  /**
   * Volumetric Pouring: Liquid decanting with acoustic liquid column resonance
   * Used when dispensing reagents, pouring solutions, titrating
   */
  public playVolumetricPouring(viscosity: 'aqueous' | 'viscous' = 'aqueous') {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const isAqueous = viscosity === 'aqueous';
      const dur = isAqueous ? 0.35 : 0.55;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = isAqueous ? 'sine' : 'triangle';
      const startF = isAqueous ? 580 : 320;
      const endF = isAqueous ? 410 : 210;

      osc.frequency.setValueAtTime(startF, t);
      osc.frequency.exponentialRampToValueAtTime(endF, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + dur);

      // Liquid plops
      const plopTime = t + dur * 0.45;
      const plopOsc = this.ctx.createOscillator();
      const plopGain = this.ctx.createGain();
      plopOsc.type = 'sine';
      plopOsc.frequency.setValueAtTime(startF * 1.3, plopTime);
      plopOsc.frequency.exponentialRampToValueAtTime(startF * 0.8, plopTime + 0.04);

      plopGain.gain.setValueAtTime(0.12, plopTime);
      plopGain.gain.exponentialRampToValueAtTime(0.001, plopTime + 0.04);

      plopOsc.connect(plopGain);
      plopGain.connect(this.sfxGain);

      plopOsc.start(plopTime);
      plopOsc.stop(plopTime + 0.045);
    } catch {}
  }

  /**
   * Precipitation Clouding: Low colloidal shimmer tone
   * Used for BaSO4, AgCl, insoluble precipitate formation
   */
  public playPrecipitationClouding() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;

      // Soft dual detuned sine waves
      [330, 334].forEach((freq) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.linearRampToValueAtTime(freq * 0.95, t + 0.4);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.14, t + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(t);
        osc.stop(t + 0.45);
      });
    } catch {}
  }

  /**
   * Pipette Suction & Droplet Dispense:
   * Models fluid draw in volumetric pipette tube followed by droplet detachment
   */
  public playPipetteSuction() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.28;

      // Resonant air/fluid column rising tone
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.exponentialRampToValueAtTime(480, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.15, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + dur);

      // Droplet pinch pop
      const dropTime = t + dur * 0.75;
      const dropOsc = this.ctx.createOscillator();
      const dropGain = this.ctx.createGain();

      dropOsc.type = 'sine';
      dropOsc.frequency.setValueAtTime(850, dropTime);
      dropOsc.frequency.exponentialRampToValueAtTime(420, dropTime + 0.04);

      dropGain.gain.setValueAtTime(0.14, dropTime);
      dropGain.gain.exponentialRampToValueAtTime(0.001, dropTime + 0.04);

      dropOsc.connect(dropGain);
      dropGain.connect(this.sfxGain);

      dropOsc.start(dropTime);
      dropOsc.stop(dropTime + 0.045);
    } catch {}
  }

  /**
   * Magnetic Stirrer Vortex:
   * Models fluid vortex motion and PTFE magnetic stir bar resonance
   */
  public playMagneticStirrer(speed: 'slow' | 'fast' = 'fast') {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const isFast = speed === 'fast';
      const dur = 0.4;
      const centerF = isFast ? 140 : 90;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(centerF, t);
      osc.frequency.linearRampToValueAtTime(centerF * 1.15, t + dur * 0.5);
      osc.frequency.linearRampToValueAtTime(centerF, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + dur);
    } catch {}
  }

  /**
   * Mobile Haptic Feedback (Safe no-op in desktop and SSR)
   */
  public triggerHaptic(pattern: number | number[] = 30) {
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator && typeof navigator.vibrate === 'function') {
        navigator.vibrate(pattern);
      }
    } catch {}
  }

  /**
   * Semantic Mobile Haptic Feedback for Chemical Reactions and Combat Impacts
   */
  public triggerReactionHaptic(
    reactionType: 'COMBUSTION' | 'PRECIPITATION' | 'ACID_BASE' | 'EFFERVESCENCE' | 'SYNTHESIS' | 'CRITICAL' | string
  ) {
    const patterns: Record<string, number | number[]> = {
      COMBUSTION: [40, 30, 80],
      PRECIPITATION: [15, 20, 25, 20, 35],
      ACID_BASE: [25, 40, 25],
      EFFERVESCENCE: [10, 15, 10, 15, 10, 15, 20],
      SYNTHESIS: [30, 50, 70],
      CRITICAL: [60, 40, 100, 50, 120]
    };
    const pattern = patterns[reactionType.toUpperCase()] || [35, 25, 35];
    this.triggerHaptic(pattern);
  }

  // ==========================================
  // MASTER RULE PROCEDURAL AUDIO PIPELINE
  // ==========================================

  /**
   * Procedural Synchro Summoning Crystalline Resonance
   * Harmonic ascending arpeggio with metallic resonance bandpass filter
   */
  public playSynchroSummonFanfare() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const frequencies = [440, 660, 880, 1320, 1760]; // Pt Catalytic resonance series

      frequencies.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const startTime = t + idx * 0.08;
        const dur = 0.45;

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.05, startTime + dur);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.12, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + dur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(startTime);
        osc.stop(startTime + dur);
      });
      this.triggerHaptic([30, 40, 50, 40, 80]);
    } catch {}
  }

  /**
   * Procedural Xyz Summoning Gravitational Singularity & Overlay Chime
   * Sub-bass gravity drop with binaural orbital pulses
   */
  public playXyzSummonGalaxy() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.8;

      // 1. Deep gravitational sub-bass drop (80 Hz -> 40 Hz)
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(90, t);
      bassOsc.frequency.exponentialRampToValueAtTime(38, t + dur);

      bassGain.gain.setValueAtTime(0.001, t);
      bassGain.gain.linearRampToValueAtTime(0.25, t + 0.06);
      bassGain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

      bassOsc.connect(bassGain);
      bassGain.connect(this.sfxGain);
      bassOsc.start(t);
      bassOsc.stop(t + dur);

      // 2. High overlay alignment chime (1174 Hz - D6)
      const chimeOsc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      chimeOsc.type = 'triangle';
      chimeOsc.frequency.setValueAtTime(1174.66, t + 0.15);
      chimeOsc.frequency.exponentialRampToValueAtTime(1760, t + 0.45);

      chimeGain.gain.setValueAtTime(0.001, t + 0.15);
      chimeGain.gain.linearRampToValueAtTime(0.15, t + 0.2);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.75);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(this.sfxGain);
      chimeOsc.start(t + 0.15);
      chimeOsc.stop(t + 0.75);

      this.triggerHaptic([60, 40, 100, 30, 60]);
    } catch {}
  }

  /**
   * Procedural Pendulum Swarm Dual-Scale Celestial Shimmer
   * Dual Solfeggio frequencies (396 Hz & 528 Hz) with shimmering binaural harmonics
   */
  public playPendulumSwarmChord() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.9;
      const scales = [396, 528, 792, 1056]; // Solfeggio Scale 1 & Scale 8 harmonic nodes

      scales.forEach((f, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const offset = idx * 0.04;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t + offset);
        osc.frequency.linearRampToValueAtTime(f * 1.02, t + dur);

        gain.gain.setValueAtTime(0.001, t + offset);
        gain.gain.linearRampToValueAtTime(0.09, t + offset + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(t + offset);
        osc.stop(t + dur);
      });
      this.triggerHaptic([20, 20, 20, 20, 40, 20, 80]);
    } catch {}
  }

  /**
   * Procedural Ritual Altar Sub-Harmonic Resonance Gong
   * Super-saturation crystallization bell with rich overtone series
   */
  public playRitualAltarChant() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 1.1;
      const overtones = [110, 220, 330, 550, 770]; // Fullerene icosahedron modes

      overtones.forEach((f, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, t);
        osc.frequency.exponentialRampToValueAtTime(f * 0.98, t + dur);

        const peakGain = (0.2 / (idx + 1));
        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(peakGain, t + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(t);
        osc.stop(t + dur);
      });
      this.triggerHaptic([80, 50, 120]);
    } catch {}
  }

  /**
   * Dynamic Damage Step 5-Substep Acoustic Feedback
   */
  public playDamageStepSubstep(substep: 1 | 2 | 3 | 4 | 5) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;

      if (substep === 1) {
        // Start of Damage Step: Quick metallic clash
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, t);
        osc.frequency.exponentialRampToValueAtTime(200, t + 0.12);
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.12);
        this.triggerHaptic(20);
      } else if (substep === 2) {
        // Before Damage Calc: Face-down flip card whoosh
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, t);
        osc.frequency.exponentialRampToValueAtTime(650, t + 0.18);
        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.14, t + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.18);
        this.triggerHaptic(25);
      } else if (substep === 3) {
        // Perform Damage Calc: Heavy combat detonation
        this.playChemicalDetonation(true);
      } else if (substep === 4) {
        // After Damage Calc: FLIP effect trigger chime
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, t);
        osc.frequency.setValueAtTime(1600, t + 0.08);
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.25);
        this.triggerHaptic(30);
      } else if (substep === 5) {
        // End of Damage Step: Monster graveyard dissolve descend
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, t);
        osc.frequency.exponentialRampToValueAtTime(50, t + 0.28);
        gain.gain.setValueAtTime(0.15, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.28);
        this.triggerHaptic([15, 30, 45]);
      }
    } catch {}
  }

  /**
   * Link Summon Electronic Circuit & Arrow Grid Audio
   */
  public playLinkSummonNetwork() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      [440, 554.37, 659.25, 880].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const st = t + idx * 0.05;
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, st);
        gain.gain.setValueAtTime(0.001, st);
        gain.gain.linearRampToValueAtTime(0.08, st + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, st + 0.25);
        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(st);
        osc.stop(st + 0.25);
      });
      this.triggerHaptic([30, 20, 60]);
    } catch {}
  }

  /**
   * Master Chemist Persona Quip Fanfare
   */
  public playCharacterPersonaChime(persona: 'MENDELEEV' | 'CURIE' | 'LAVOISIER' | 'GENERAL' | 'ALPHA' | 'BETA') {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;

      if (persona === 'MENDELEEV') {
        // Grandmaster Mendeleev: Bold harmonic fifths (330 -> 495 -> 660 Hz)
        [330, 495, 660].forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          const st = t + idx * 0.07;
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, st);
          gain.gain.setValueAtTime(0.001, st);
          gain.gain.linearRampToValueAtTime(0.14, st + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, st + 0.35);
          osc.connect(gain);
          gain.connect(this.sfxGain!);
          osc.start(st);
          osc.stop(st + 0.35);
        });
      } else if (persona === 'CURIE') {
        // Marie Curie: Scintillating ionization sweep
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1046.5, t); // C6
        osc.frequency.exponentialRampToValueAtTime(2093, t + 0.25); // C7
        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t);
        osc.stop(t + 0.3);
      } else if (persona === 'LAVOISIER') {
        // Antoine Lavoisier: Balanced dual-resonance
        [440, 660].forEach(f => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, t);
          gain.gain.setValueAtTime(0.1, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
          osc.connect(gain);
          gain.connect(this.sfxGain!);
          osc.start(t);
          osc.stop(t + 0.35);
        });
      } else {
        // Alpha / Beta / General: Crisp tactical tactical chime
        [523.25, 659.25].forEach((freq, idx) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          const st = t + idx * 0.06;
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, st);
          gain.gain.setValueAtTime(0.08, st);
          gain.gain.exponentialRampToValueAtTime(0.001, st + 0.2);
          osc.connect(gain);
          gain.connect(this.sfxGain!);
          osc.start(st);
          osc.stop(st + 0.2);
        });
      }
      this.triggerHaptic(40);
    } catch {}
  }

  /**
   * Galvanic Circuit Switch: Latching / opening mechanical switch with electric transient
   */
  public playGalvanicCircuitSwitch(isClosed: boolean = true) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;

      if (isClosed) {
        // Metallic switch contact snap + sub-harmonic surge
        const clickOsc = this.ctx.createOscillator();
        const clickGain = this.ctx.createGain();
        clickOsc.type = 'triangle';
        clickOsc.frequency.setValueAtTime(1400, t);
        clickOsc.frequency.exponentialRampToValueAtTime(320, t + 0.04);
        clickGain.gain.setValueAtTime(0.2, t);
        clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
        clickOsc.connect(clickGain);
        clickGain.connect(this.sfxGain);
        clickOsc.start(t);
        clickOsc.stop(t + 0.05);

        // Low inductive pulse
        const pulseOsc = this.ctx.createOscillator();
        const pulseGain = this.ctx.createGain();
        pulseOsc.type = 'sine';
        pulseOsc.frequency.setValueAtTime(90, t + 0.02);
        pulseOsc.frequency.exponentialRampToValueAtTime(45, t + 0.18);
        pulseGain.gain.setValueAtTime(0.15, t + 0.02);
        pulseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
        pulseOsc.connect(pulseGain);
        pulseGain.connect(this.sfxGain);
        pulseOsc.start(t + 0.02);
        pulseOsc.stop(t + 0.18);
      } else {
        // Open circuit snap break
        const breakOsc = this.ctx.createOscillator();
        const breakGain = this.ctx.createGain();
        breakOsc.type = 'sawtooth';
        breakOsc.frequency.setValueAtTime(980, t);
        breakOsc.frequency.exponentialRampToValueAtTime(220, t + 0.04);
        breakGain.gain.setValueAtTime(0.12, t);
        breakGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
        breakOsc.connect(breakGain);
        breakGain.connect(this.sfxGain);
        breakOsc.start(t);
        breakOsc.stop(t + 0.04);
      }
      this.triggerHaptic(25);
    } catch {}
  }

  /**
   * Galvanic Current Hum & Electron Flow Shimmer:
   * Tone pitch and shimmer scale with cell EMF voltage (e.g. 1.10 V Daniell vs 2.71 V Mg-Cu)
   */
  public playGalvanicCurrentHum(voltage: number = 1.1) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.45;
      const clampedV = Math.max(0.1, Math.min(3.5, voltage));
      const baseFreq = 65 * (1 + clampedV * 0.25); // ~80Hz to 120Hz hum

      // Fundamental power hum
      const humOsc = this.ctx.createOscillator();
      const humGain = this.ctx.createGain();
      humOsc.type = 'sine';
      humOsc.frequency.setValueAtTime(baseFreq, t);
      humGain.gain.setValueAtTime(0.001, t);
      humGain.gain.linearRampToValueAtTime(0.12, t + 0.05);
      humGain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      humOsc.connect(humGain);
      humGain.connect(this.sfxGain);
      humOsc.start(t);
      humOsc.stop(t + dur);

      // Shimmer harmonic (electron flow crackle)
      const shimmerOsc = this.ctx.createOscillator();
      const shimmerGain = this.ctx.createGain();
      shimmerOsc.type = 'triangle';
      shimmerOsc.frequency.setValueAtTime(baseFreq * 4, t);
      shimmerOsc.frequency.exponentialRampToValueAtTime(baseFreq * 6, t + dur * 0.7);
      shimmerGain.gain.setValueAtTime(0.001, t);
      shimmerGain.gain.linearRampToValueAtTime(0.06, t + 0.06);
      shimmerGain.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.8);
      shimmerOsc.connect(shimmerGain);
      shimmerGain.connect(this.sfxGain);
      shimmerOsc.start(t);
      shimmerOsc.stop(t + dur * 0.8);

      this.triggerHaptic(30);
    } catch {}
  }

  /**
   * Industrial Reactor Pressure Vent (Xả Áp Suất & Van An Toàn)
   * High-pass filtered noise burst mimicking high-pressure gas venting / steam release.
   */
  public playReactorPressureVent(pressureAtm: number = 100) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.35;
      const intensity = Math.min(1.0, Math.max(0.2, pressureAtm / 200));

      const bufferSize = Math.floor(this.ctx.sampleRate * dur);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1400, t);
      filter.frequency.exponentialRampToValueAtTime(700, t + dur);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.18 * intensity, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      noise.start(t);
      this.triggerHaptic(35);
    } catch {}
  }

  /**
   * Industrial Catalytic Turbine Hum (Động Cơ Tuần Hoàn & Nén Khí)
   * Deep mechanical resonance representing compressor turbines and catalyst fluidization.
   */
  public playCatalyticTurbineHum(rateIndex: number = 50) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.40;
      const freq = 55 + (rateIndex / 100) * 45; // 55Hz - 100Hz

      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.linearRampToValueAtTime(freq * 1.1, t + dur);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, t);

      oscGain.gain.setValueAtTime(0.001, t);
      oscGain.gain.linearRampToValueAtTime(0.10, t + 0.05);
      oscGain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + dur);
      this.triggerHaptic(20);
    } catch {}
  }

  /**
   * VSEPR Gillespie-Nyholm Lone Pair Repulsion Shift Sound
   * Modulated electrostatic resonance responding to electron cloud deformation.
   */
  public playVseprRepulsionShift(multiplier: number = 1.0) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.22;
      // Frequency ramps upwards with repulsion strength (320Hz -> 880Hz)
      const baseFreq = 320 + Math.min(2.0, Math.max(0.0, multiplier)) * 280;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, t + dur * 0.7);
      osc.frequency.exponentialRampToValueAtTime(baseFreq, t + dur);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(baseFreq * 1.2, t);
      filter.Q.setValueAtTime(4.0, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + dur);
      this.triggerHaptic(15);
    } catch {}
  }

  /**
   * VSEPR Electron Domain Snap Sound
   * Crisp crystal/orbital snap when switching geometry or adding electron pairs.
   */
  public playDomainSnap() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.14;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(820, t);
      osc.frequency.exponentialRampToValueAtTime(1480, t + 0.04);
      osc.frequency.exponentialRampToValueAtTime(420, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + dur);
      this.triggerHaptic(25);
    } catch {}
  }

  /**
   * Precipitation Crystal Nucleation Sound
   * Crystalline harmonics representing crystal lattice nucleation and settling in solution.
   */
  public playPrecipitationNucleation() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.35;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1174.66, t); // D6
      osc1.frequency.exponentialRampToValueAtTime(1760.00, t + 0.08); // A6
      osc1.frequency.exponentialRampToValueAtTime(880.00, t + dur);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1479.98, t); // F#6
      osc2.frequency.exponentialRampToValueAtTime(2217.46, t + 0.08); // C#7
      osc2.frequency.exponentialRampToValueAtTime(1108.73, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.sfxGain);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + dur);
      osc2.stop(t + dur);
      this.triggerHaptic(20);
    } catch {}
  }

  /**
   * Amphoteric Precipitate Re-dissolution Swirl Sound
   * Liquid acoustic swirl representing precipitate re-dissolving into a clear complex.
   */
  public playAmphotericDissolution() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.45;

      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(240, t);
      osc.frequency.linearRampToValueAtTime(560, t + dur * 0.6);
      osc.frequency.linearRampToValueAtTime(380, t + dur);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, t);
      filter.frequency.linearRampToValueAtTime(1800, t + dur * 0.5);
      filter.frequency.linearRampToValueAtTime(400, t + dur);
      filter.Q.setValueAtTime(3.5, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.14, t + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + dur);
      this.triggerHaptic(15);
    } catch {}
  }

  /**
   * Electrolysis Electrical Current & Spark Sizzle Sound
   * Modulated low-frequency buzzing with high-frequency ozone crackle.
   */
  public playElectrolysisSpark() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.35;

      const osc = this.ctx.createOscillator();
      const noiseGain = this.ctx.createGain();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, t); // 120 Hz hum
      osc.frequency.linearRampToValueAtTime(180, t + dur * 0.5);
      osc.frequency.exponentialRampToValueAtTime(80, t + dur);

      // Noise burst for electrical crackle
      const bufferSize = this.ctx.sampleRate * dur;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (Math.random() > 0.6 ? 1 : 0.2);
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(3200, t);
      noiseFilter.Q.setValueAtTime(4.0, t);

      noiseGain.gain.setValueAtTime(0.001, t);
      noiseGain.gain.linearRampToValueAtTime(0.12, t + 0.05);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.15, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.sfxGain);

      osc.start(t);
      noise.start(t);
      osc.stop(t + dur);
      noise.stop(t + dur);
      this.triggerHaptic(25);
    } catch {}
  }

  /**
   * Electrode Gas Effervescence / Bubble Sizzle Sound
   * Delicate effervescent micro-bubble pops for H2, Cl2, O2 gas evolution.
   */
  public playElectrodeGasEffervescence() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.28;

      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(1900, t + 0.08);
      osc.frequency.exponentialRampToValueAtTime(650, t + dur);

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(600, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.09, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + dur);
      this.triggerHaptic(10);
    } catch {}
  }

  /**
   * Organic Stereoisomer Flip / Rotation Chirp
   * Harmonic stereo sweep representing cis/trans inversion or optical enantiomer rotation.
   */
  public playOrganicIsomerFlip() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.32;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(740, t + dur * 0.5);
      osc.frequency.exponentialRampToValueAtTime(440, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + dur);
      this.triggerHaptic(12);
    } catch {}
  }

  /**
   * Diagnostic Chemical Test Drop & Color Bloom Chime
   * Dropper liquid plop into a resonant bell chord.
   */
  public playDiagnosticTestDrop() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.4;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1200, t);
      osc1.frequency.exponentialRampToValueAtTime(523.25, t + 0.06); // C5

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, t + 0.05); // E5
      osc2.frequency.exponentialRampToValueAtTime(783.99, t + dur); // G5

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.14, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.sfxGain);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 0.15);
      osc2.stop(t + dur);
      this.triggerHaptic(15);
    } catch {}
  }

  /**
   * Polymer Chain Link Snap Sound
   * Rapid cascade of mechanical snaps representing monomers joining covalent polymer backbone.
   */
  public playPolymerChainLink() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5 arpeggiated snaps
      notes.forEach((freq, idx) => {
        const offset = idx * 0.045;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + offset);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + offset + 0.04);

        gain.gain.setValueAtTime(0.001, t + offset);
        gain.gain.linearRampToValueAtTime(0.08, t + offset + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.06);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(t + offset);
        osc.stop(t + offset + 0.06);
      });
      this.triggerHaptic(15);
    } catch {}
  }

  /**
   * Rubber Vulcanization Thermal Sizzle Sound
   * High-frequency thermal reaction sizzle representing disulfide bridge (-S-S-) cross-linking.
   */
  public playVulcanizationSizzle() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.38;

      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.linearRampToValueAtTime(480, t + dur * 0.4);
      osc.frequency.exponentialRampToValueAtTime(140, t + dur);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2400, t);
      filter.Q.setValueAtTime(5.0, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + dur);
      this.triggerHaptic(18);
    } catch {}
  }

  /**
   * Geiger-Müller Radiation Counter Click Sound
   * Rapid, metallic click pulse representing ionization discharge of a particle in a Geiger tube.
   */
  public playGeigerCounterClick() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.015;

      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(1800, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + dur);

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1200, t);

      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + dur);
      this.triggerHaptic(8);
    } catch {}
  }

  /**
   * Nuclear Decay Emission Burst Sound
   * Deep resonant implosion-burst with gamma radiation chirp.
   */
  public playNuclearDecayBurst() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.42;

      // Sub-bass thump
      const oscLow = this.ctx.createOscillator();
      const gainLow = this.ctx.createGain();
      oscLow.type = 'sine';
      oscLow.frequency.setValueAtTime(120, t);
      oscLow.frequency.exponentialRampToValueAtTime(38, t + dur);
      gainLow.gain.setValueAtTime(0.2, t);
      gainLow.gain.exponentialRampToValueAtTime(0.001, t + dur);
      oscLow.connect(gainLow);
      gainLow.connect(this.sfxGain);
      oscLow.start(t);
      oscLow.stop(t + dur);

      // High-energy particle ping
      const oscHigh = this.ctx.createOscillator();
      const gainHigh = this.ctx.createGain();
      oscHigh.type = 'sine';
      oscHigh.frequency.setValueAtTime(1400, t + 0.02);
      oscHigh.frequency.exponentialRampToValueAtTime(2400, t + 0.12);
      gainHigh.gain.setValueAtTime(0.001, t + 0.02);
      gainHigh.gain.linearRampToValueAtTime(0.1, t + 0.04);
      gainHigh.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
      oscHigh.connect(gainHigh);
      gainHigh.connect(this.sfxGain);
      oscHigh.start(t + 0.02);
      oscHigh.stop(t + 0.22);

      this.triggerHaptic(25);
    } catch {}
  }

  /**
   * Acid Rain Sizzling Etch Sound
   * Atmospheric precipitation hiss with acidic chemical fizz on limestone.
   */
  public playAcidRainHiss() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.55;

      // Noise buffer synthesis for natural rain droplet hiss
      const bufferSize = Math.floor(this.ctx.sampleRate * dur);
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2800, t);
      filter.frequency.exponentialRampToValueAtTime(1400, t + dur);
      filter.Q.setValueAtTime(2.2, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      whiteNoise.start(t);
      whiteNoise.stop(t + dur);
      this.triggerHaptic(12);
    } catch {}
  }

  /**
   * Eco-Synthesis & Green Chemistry Crystal Chime
   * Uplifting harmonic chime (528 Hz Solfeggio / C5 - G5 - C6) celebrating high atom economy and green innovation.
   */
  public playEcoSynthesisChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.45;

      const freqs = [528, 792, 1056]; // Harmonic triad
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const offset = idx * 0.045;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + offset);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.02, t + offset + dur);

        gain.gain.setValueAtTime(0.001, t + offset);
        gain.gain.linearRampToValueAtTime(0.08 / (idx + 1), t + offset + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + offset + dur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);

        osc.start(t + offset);
        osc.stop(t + offset + dur);
      });

      this.triggerHaptic(15);
    } catch {}
  }

  /**
   * Crystal Lattice Resonance Bell Chime
   * High-purity resonant ding (2093 Hz C7 / 4186 Hz C8) representing perfect unit cell symmetry and Kepler close packing.
   */
  public playCrystalResonanceDing() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.75;

      const oscFundamental = this.ctx.createOscillator();
      const gainFundamental = this.ctx.createGain();
      oscFundamental.type = 'sine';
      oscFundamental.frequency.setValueAtTime(2093, t);
      gainFundamental.gain.setValueAtTime(0.001, t);
      gainFundamental.gain.linearRampToValueAtTime(0.18, t + 0.005);
      gainFundamental.gain.exponentialRampToValueAtTime(0.0005, t + dur);
      oscFundamental.connect(gainFundamental);
      gainFundamental.connect(this.sfxGain);
      oscFundamental.start(t);
      oscFundamental.stop(t + dur);

      const oscOvertone = this.ctx.createOscillator();
      const gainOvertone = this.ctx.createGain();
      oscOvertone.type = 'sine';
      oscOvertone.frequency.setValueAtTime(4186, t);
      gainOvertone.gain.setValueAtTime(0.001, t);
      gainOvertone.gain.linearRampToValueAtTime(0.07, t + 0.003);
      gainOvertone.gain.exponentialRampToValueAtTime(0.0005, t + dur * 0.6);
      oscOvertone.connect(gainOvertone);
      gainOvertone.connect(this.sfxGain);
      oscOvertone.start(t);
      oscOvertone.stop(t + dur * 0.6);

      this.triggerHaptic(10);
    } catch {}
  }

  /**
   * Crystal Cleavage Plane Snap
   * Sharp mineralogical cleavage fracture sound along crystallographic planes {100} / {111}.
   */
  public playLatticeCleavageSnap() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.09;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, t);
      osc.frequency.exponentialRampToValueAtTime(180, t + dur);

      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(18);
    } catch {}
  }

  /**
   * Colloid Tyndall Light Beam Laser Sweep
   * Ethereal optical resonance representing light scattering through colloidal particles.
   */
  public playColloidLightBeam() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.55;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, t); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, t + dur); // Octave sweep up to A6

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(10);
    } catch {}
  }

  /**
   * Surfactant Micelle Formation & Bubble Pop
   * Gentle, cheerful surface-tension capillary bubble pop with aqueous transient.
   */
  public playMicelleFormBubble() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.12;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, t);
      osc.frequency.exponentialRampToValueAtTime(950, t + 0.04);
      osc.frequency.exponentialRampToValueAtTime(200, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(12);
    } catch {}
  }

  /**
   * Spectrophotometer Lamp Shutter & Optical Filter Turret
   * Mechanical stepper motor click and dual deuterium/tungsten-halogen lamp ignition hum.
   */
  public playSpectroLampShutter() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.16;

      // Mechanical click
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(600, t);
      osc1.frequency.exponentialRampToValueAtTime(120, t + 0.05);

      gain1.gain.setValueAtTime(0.2, t);
      gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

      osc1.connect(gain1);
      gain1.connect(this.sfxGain);
      osc1.start(t);
      osc1.stop(t + 0.06);

      // Optical beam shutter buzz
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(440, t + 0.04);
      osc2.frequency.exponentialRampToValueAtTime(880, t + 0.10);
      osc2.frequency.linearRampToValueAtTime(554.37, t + dur);

      gain2.gain.setValueAtTime(0.001, t + 0.04);
      gain2.gain.linearRampToValueAtTime(0.12, t + 0.07);
      gain2.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc2.connect(gain2);
      gain2.connect(this.sfxGain);
      osc2.start(t + 0.04);
      osc2.stop(t + dur);

      this.triggerHaptic(15);
    } catch {}
  }

  /**
   * Photodetector Analytical Measurement Beep
   * Crisp, high-precision dual-harmonic analytical readout beep (Shimadzu / Agilent UV-Vis style).
   */
  public playPhotodetectorBeep() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.14;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      // High clean laboratory tone (E6 ~ 1318.5 Hz)
      osc.frequency.setValueAtTime(1318.5, t);
      osc.frequency.setValueAtTime(1567.98, t + 0.06); // G6 harmonic

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.16, t + 0.015);
      gain.gain.setValueAtTime(0.14, t + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(10);
    } catch {}
  }

  /**
   * Mass Spectrometer Quadrupole / Orbitrap RF Ion Trap Hum
   * Resonant radiofrequency oscillating electric field hum guiding ions by m/z.
   */
  public playMassSpecIonTrapHum() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.22;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, t); // Low RF fundamental
      osc.frequency.exponentialRampToValueAtTime(440, t + 0.12);
      osc.frequency.linearRampToValueAtTime(220, t + dur);

      // Lowpass filter for smooth electromagnetic hum
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.14, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(12);
    } catch {}
  }

  /**
   * Electron Multiplier / Faraday Cup Ion Impact Detection Click
   * Ultra-crisp sub-millisecond particle detector pulse with secondary electron cascade.
   */
  public playDetectorIonHitClick() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.07;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2400, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + dur);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(8);
    } catch {}
  }

  /**
   * FTIR Spectrometer He-Ne Reference Laser Interferometer Chirp
   * High-frequency optical sweep representing Michelson interferometer mirror translation.
   */
  public playInfraredLaserChirp() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.15;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(3200, t + 0.10);
      osc.frequency.exponentialRampToValueAtTime(1600, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.15, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(10);
    } catch {}
  }

  /**
   * Molecular Dipole Oscillation & Harmonic Resonance Chime
   * Dual-harmonic resonant physical vibration simulating bond stretching and bending.
   */
  public playMolecularVibrationHarmonic() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.25;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      // Harmonic fifth (523.25 Hz C5 + 783.99 Hz G5)
      osc1.frequency.setValueAtTime(523.25, t);
      osc2.frequency.setValueAtTime(783.99, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.sfxGain);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + dur);
      osc2.stop(t + dur);

      this.triggerHaptic(12);
    } catch {}
  }

  /**
   * NMR 90° Radiofrequency (RF) Transmitter Excitation Pulse
   * Sharp, energetic microsecond RF burst tipping nuclear magnetization into the xy-plane.
   */
  public playNmrRfPulseBip() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.06;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, t);
      osc.frequency.exponentialRampToValueAtTime(700, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.22, t + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(10);
    } catch {}
  }

  /**
   * NMR Free Induction Decay (FID) Transverse Relaxation (T2*)
   * Damped multi-harmonic sinusoidal decay as precessing nuclear spins dephase.
   */
  public playNmrFidDecayChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.38;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      // Fundamental and second harmonic simulating chemical shift beat frequency
      osc1.frequency.setValueAtTime(440, t); // A4
      osc2.frequency.setValueAtTime(659.25, t); // E5

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.20, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.sfxGain);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + dur);
      osc2.stop(t + dur);

      this.triggerHaptic(14);
    } catch {}
  }

  /**
   * Multi-Spectroscopic Analytical Deduction Success Chime
   * Harmonic bright ascending arpeggio (C5 -> E5 -> G5 -> C6) confirming conclusive structural proof.
   */
  public playAnalyticalDeductionSuccess() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const noteStart = t + idx * 0.055;
        const dur = 0.20;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.001, noteStart);
        gain.gain.linearRampToValueAtTime(0.18, noteStart + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + dur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(noteStart);
        osc.stop(noteStart + dur);
      });

      this.triggerHaptic(16);
    } catch {}
  }

  /**
   * Constitutional Isomer Comparative Spectral Flip Swoosh
   * Swept frequency transitional swoosh when flipping between constitutional isomers.
   */
  public playIsomerCompareSwoosh() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.18;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(960, t + 0.08);
      osc.frequency.exponentialRampToValueAtTime(480, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.16, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(8);
    } catch {}
  }

  /**
   * Distillation Flask Thermal Boiling Bubble Simulation
   * Multi-bubble randomized acoustic pops simulating liquid phase phase transition.
   */
  public playBoilingBubbleSim() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;

      // 3 rapid bubbling pops
      [0, 0.04, 0.09].forEach((offset, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const startT = t + offset;
        const dur = 0.05;
        const baseFreq = 400 + idx * 120 + Math.random() * 80;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq, startT);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.8, startT + dur);

        gain.gain.setValueAtTime(0.001, startT);
        gain.gain.linearRampToValueAtTime(0.14, startT + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, startT + dur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(startT);
        osc.stop(startT + dur);
      });

      this.triggerHaptic(10);
    } catch {}
  }

  /**
   * Distillation Condenser Pure Droplet Drip
   * High-pitch crystalline glass resonant droplet drip hitting collection receiver flask.
   */
  public playDistillationCondensateDrip() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.12;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760, t); // A6
      osc.frequency.exponentialRampToValueAtTime(880, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.20, t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(12);
    } catch {}
  }

  /**
   * Separatory Funnel Vigorous Shake & Gas Venting Hiss
   * Two-phase liquid sloshing followed by pressure release venting hiss.
   */
  public playSeparatoryFunnelShake() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.22;

      // Phase 1: Sloshing liquid oscillation
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(240, t);
      osc.frequency.linearRampToValueAtTime(380, t + 0.10);
      osc.frequency.exponentialRampToValueAtTime(160, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(14);
    } catch {}
  }

  /**
   * Separatory Funnel Stopcock Liquid Drain Flow
   * Smooth, steady laminar draining sound as bottom layer exits stopcock.
   */
  public playStopcockDrainLiquid() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.28;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.16, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(8);
    } catch {}
  }

  /**
   * TLC Mobile Phase Capillary Action Ascent Hum
   * Gentle rising fluid flow hum indicating solvent ascending the TLC plate.
   */
  public playEluentFlowHum() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.25;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, t);
      osc.frequency.exponentialRampToValueAtTime(460, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(6);
    } catch {}
  }

  /**
   * UV 254nm / Staining Spot Detection Ping
   * Crisp resonant fluorescent emission ping when revealing TLC spots.
   */
  public playRfSpotDetectBeep() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.20;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1320, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.20, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(10);
    } catch {}
  }

  /**
   * Column Chromatography Fraction Collector Droplet Drip
   * Purified organic fraction droplet releasing from stopcock into collection vial.
   */
  public playColumnDropDrip() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.16;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(780, t);
      osc.frequency.exponentialRampToValueAtTime(420, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(5);
    } catch {}
  }

  /**
   * Crystal Nucleation & Growth Arpeggiated Chime
   * Sparkling crystalline lattice formation sound with ascending harmonics (A5 -> E6 -> A6).
   */
  public playCrystalGrowthChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const freqs = [880, 1318.5, 1760]; // A5, E6, A6

      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const noteStart = t + idx * 0.045;
        const noteDur = 0.35;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.001, noteStart);
        gain.gain.linearRampToValueAtTime(0.12, noteStart + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + noteDur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(noteStart);
        osc.stop(noteStart + noteDur);
      });

      this.triggerHaptic(8);
    } catch {}
  }

  /**
   * Capillary Melting Point Thaw & Liquefaction Sizzle
   * Soft phase transition chime as solid crystals liquefy into transparent melt.
   */
  public playMeltingPointThawSizzle() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.22;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, t);
      osc.frequency.linearRampToValueAtTime(680, t + 0.10);
      osc.frequency.exponentialRampToValueAtTime(340, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.14, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(6);
    } catch {}
  }

  /**
   * Gas Effervescence Fizz (CO2 / N2 Bubble Release)
   * Rapid frothy carbonation bubbling fizz for bicarbonate effervescence and alkyne gas evolution.
   */
  public playGasBubblingFizz() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.28;

      // Bandpassed noise burst for realistic effervescent fizz
      const bufferSize = this.ctx.sampleRate * dur;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200, t);
      filter.Q.setValueAtTime(3.0, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);
      whiteNoise.start(t);
      whiteNoise.stop(t + dur);

      this.triggerHaptic(10);
    } catch {}
  }

  /**
   * Chemical Precipitate Coagulation & Color Change Chime
   * Resonant chime for formation of characteristic solid precipitates (Cu2O red, CHI3 yellow, Ag mirror).
   */
  public playPrecipitateFormChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.32;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, t); // B5
      osc.frequency.exponentialRampToValueAtTime(659.25, t + dur); // E5

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.16, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(7);
    } catch {}
  }

  /**
   * Gas Cylinder Piston Compression Whoosh
   * Aerodynamic pressure swoosh as piston reduces volume and raises kinetic temperature.
   */
  public playGasPistonCompressionWhoosh() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.26;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.12);
      osc.frequency.exponentialRampToValueAtTime(90, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(9);
    } catch {}
  }

  /**
   * Molecular Elastic Wall Collision Micro-Clack
   * Crisp microscopic impulse sound when molecules bounce elastically off chamber walls.
   */
  public playMolecularCollisionClack() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.08;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(1100, t);
      osc.frequency.exponentialRampToValueAtTime(220, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(4);
    } catch {}
  }

  /**
   * Osmotic Solvent Permeation Flow Trickle
   * Gentle fluid osmosis trickle as water molecules permeate across the semipermeable membrane.
   */
  public playOsmoticFlowTrickle() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.22;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, t);
      osc.frequency.exponentialRampToValueAtTime(740, t + 0.1);
      osc.frequency.exponentialRampToValueAtTime(410, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.09, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(5);
    } catch {}
  }

  /**
   * Osmotic Cell Membrane Lysis Micro-Pop
   * Microscopic burst when extreme hypotonic turgor pressure ruptures cell membrane.
   */
  public playCellLysisPop() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.14;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(240, t);
      osc.frequency.exponentialRampToValueAtTime(55, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(12);
    } catch {}
  }

  /**
   * Nuclear Decay Geiger Micro-Click
   * Sharp ionizing radiation detection impulse.
   */
  public playNuclearDecayClick() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.03;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(2600, t);
      osc.frequency.exponentialRampToValueAtTime(800, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(6);
    } catch {}
  }

  /**
   * Nuclear Magic Shell Quantum Resonance Hum
   * Deep harmonic resonance chord when nucleons close a nuclear magic shell.
   */
  public playNuclearResonanceHum() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.45;

      const freqs = [110, 165, 220]; // A2 + E3 + A3 harmonic triad
      freqs.forEach((f) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.08, t + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(t);
        osc.stop(t + dur);
      });

      this.triggerHaptic(8);
    } catch {}
  }

  /**
   * Coordination Sphere Color Shift Chime
   * Ascending harmonic chime when ligand substitution shifts crystal field splitting Delta.
   */
  public playCoordinationColorShiftChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.35;

      const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5 - E5 - G5 - C6
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.05);

        gain.gain.setValueAtTime(0.001, t + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.12, t + idx * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.05 + 0.22);

        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(t + idx * 0.05);
        osc.stop(t + idx * 0.05 + 0.22);
      });

      this.triggerHaptic(6);
    } catch {}
  }

  /**
   * Ligand Exchange Fluid Substitution Drip
   * Crisp drop displacement sound as new ligand enters the inner coordination sphere.
   */
  public playLigandExchangeDrip() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.12;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(680, t);
      osc.frequency.exponentialRampToValueAtTime(340, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.16, t + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(4);
    } catch {}
  }

  /**
   * Enzyme-Substrate Active Site Docking Chime
   * Harmonic lock chime when substrate binds to the enzyme active site (induced fit).
   */
  public playEnzymeSubstrateLockChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const notes = [587.33, 880.00, 1174.66]; // D5 - A5 - D6

      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const noteStart = t + idx * 0.04;
        const dur = 0.22;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.001, noteStart);
        gain.gain.linearRampToValueAtTime(0.14, noteStart + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + dur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(noteStart);
        osc.stop(noteStart + dur);
      });

      this.triggerHaptic(6);
    } catch {}
  }

  /**
   * Catalytic Turnover Micro-Fizz & Oxygen Bubble Burst
   * Rapid effervescent acoustic fizz simulating extreme substrate turnover (e.g. Catalase H2O2 -> O2).
   */
  public playCatalyticBubblesFizz() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;

      // 4 rapid randomized bubble micro-pops
      [0, 0.025, 0.055, 0.09].forEach((offset, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const noteStart = t + offset;
        const dur = 0.045;
        const baseFreq = 700 + idx * 180 + Math.random() * 120;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq, noteStart);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, noteStart + dur);

        gain.gain.setValueAtTime(0.001, noteStart);
        gain.gain.linearRampToValueAtTime(0.12, noteStart + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + dur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(noteStart);
        osc.stop(noteStart + dur);
      });

      this.triggerHaptic(5);
    } catch {}
  }

  /**
   * Quantum Hall Resistance Plateau Lock Frequency
   * Resonant precision chime when magnetic field locks onto a quantized Hall resistance plateau.
   */
  public playQuantumHallPlateauLockBeep() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.28;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1046.50, t); // C6
      osc.frequency.setValueAtTime(1318.51, t + 0.08); // E6
      osc.frequency.setValueAtTime(1567.98, t + 0.16); // G6

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.14, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(8);
    } catch {}
  }

  /**
   * Chiral Edge Current Topological Circulation Whoosh
   * Swept filtered noise / sine swell simulating dissipationless perimeter boundary current.
   */
  public playChiralEdgeCurrentWhoosh() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.32;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.16);
      osc.frequency.exponentialRampToValueAtTime(440, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(6);
    } catch {}
  }

  /**
   * Stratospheric Hartley UV-B/UV-C Photon Absorption Chime
   * Ethereal high bell chime when ozone molecule absorbs ultraviolet radiation.
   */
  public playUvPhotonAbsorptionChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const notes = [1318.51, 1567.98, 2093.00]; // E6, G6, C7

      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const noteStart = t + idx * 0.04;
        const dur = 0.25;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.001, noteStart);
        gain.gain.linearRampToValueAtTime(0.12, noteStart + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + dur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(noteStart);
        osc.stop(noteStart + dur);
      });

      this.triggerHaptic(5);
    } catch {}
  }

  /**
   * Catalytic Ozone Depletion Warning Whoosh & Dobson Drop
   * Low descending atmospheric resonant sweep when halogen radicals cause an ozone hole drop (<220 DU).
   */
  public playOzoneDepletionAlarmWhoosh() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.38;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(110, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.14, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(8);
    } catch {}
  }

  /**
   * Superconducting Meissner Magnetic Levitation Hum
   * Resonant low floating harmonic hum when temperature drops below Tc and Meissner diamagnetism engages.
   */
  public playSuperconductingMeissnerLevitateHum() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.45;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(146.83, t); // D3
      osc.frequency.linearRampToValueAtTime(220.00, t + 0.20); // A3
      osc.frequency.linearRampToValueAtTime(293.66, t + dur); // D4

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.15, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(7);
    } catch {}
  }

  /**
   * Type II Abrikosov Flux Vortex Pinning Magnetic Click
   * Crisp magnetic pinning snap as quantized flux tube Phi_0 traps in crystal defect.
   */
  public playFluxVortexPinningClick() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.08;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1800, t);
      osc.frequency.exponentialRampToValueAtTime(600, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(5);
    } catch {}
  }

  /**
   * Fuel Cell Electrochemical Proton Flow Electric Hum
   * Clean ascending electric motor harmonic hum simulating current delivery from a fuel cell stack.
   */
  public playFuelCellProtonFlowHum() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.35;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(587.33, t + dur); // D5

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(6);
    } catch {}
  }

  /**
   * Hydrogen Anode Solenoid Purge Whistle
   * Crisp high-pressure gas release valve pop simulating hydrogen water purge.
   */
  public playHydrogenPurgeWhistle() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.12;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(2400, t);
      osc.frequency.exponentialRampToValueAtTime(800, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.15, t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(4);
    } catch {}
  }

  /**
   * Milestone 48: Lithium Intercalation Zip
   * Rhythmic high-frequency acoustic pulse simulating Li+ ions shuttling through graphite layers
   */
  public playBatteryIntercalationZip() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.08;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(640, t);
      osc.frequency.exponentialRampToValueAtTime(1480, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(2);
    } catch {}
  }

  /**
   * Milestone 48: Battery Thermal Runaway Warning Tone
   * Urgent pulsating alarm when overcharging or dendrite plating occurs
   */
  public playThermalRunawayWarningHum() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.35;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.setValueAtTime(880, t + 0.1);
      osc.frequency.setValueAtTime(440, t + 0.2);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic([10, 30, 10]);
    } catch {}
  }

  /**
   * Milestone 49: PCR Thermal Step Chime
   * Ascending bell chime indicating PCR cycle phase transition (Denaturation -> Annealing -> Extension)
   */
  public playPcrThermalStepChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99]; // C5, E5, G5 major triad

      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const noteStart = t + idx * 0.05;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(0.001, noteStart);
        gain.gain.linearRampToValueAtTime(0.12, noteStart + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.25);

        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(noteStart);
        osc.stop(noteStart + 0.25);
      });

      this.triggerHaptic(3);
    } catch {}
  }

  /**
   * Milestone 49: UV Transilluminator Gel Fluorescence Hum
   * Subtle low buzzing electrical arc tone when activating UV illumination on agarose gel
   */
  public playUvGelFluorescenceHum() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.22;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120, t); // 120 Hz electrical ballast buzz
      osc.frequency.linearRampToValueAtTime(180, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.14, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(2);
    } catch {}
  }

  /**
   * Milestone 50: CRISPR-Cas9 DSB Snip
   * Crisp double-cleave tone simulating RuvC and HNH endonuclease phosphodiester bond cuts
   */
  public playCrisprCas9DsbSnip() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.07;

      [1800, 2400].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const start = t + idx * 0.02;

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, start);
        osc.frequency.exponentialRampToValueAtTime(300, start + dur);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.18, start + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.001, start + dur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(start);
        osc.stop(start + dur);
      });

      this.triggerHaptic([5, 15]);
    } catch {}
  }

  /**
   * Milestone 50: HDR Gene Insertion Celestial Chord
   * Resonant harmonic chime indicating high-fidelity donor DNA recombination into genome
   */
  public playHdrGeneInsertionGlow() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const chord = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

      chord.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const start = t + idx * 0.04;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.12, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.45);

        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(start);
        osc.stop(start + 0.45);
      });

      this.triggerHaptic(4);
    } catch {}
  }

  /**
   * Milestone 51: TGA Thermal Furnace Ramp Hum
   * Deep low-frequency resonant hum simulating high-temperature furnace ramping up to 1000°C
   */
  public playThermalFurnaceRampHum() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.4;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(65, t);
      osc.frequency.linearRampToValueAtTime(95, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.18, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(2);
    } catch {}
  }

  /**
   * Milestone 51: DSC Heat Flow Phase Transition Chime
   * Harmonic bell chime indicating endothermic melting or exothermic crystallization peak
   */
  public playEndothermicDscChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.3;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, t); // A5
      osc.frequency.exponentialRampToValueAtTime(440, t + dur); // Drop to A4

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.14, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(3);
    } catch {}
  }

  /**
   * Milestone 52: SEM Electron Beam Raster Sweep Scan
   * Rhythmic modulated high-frequency raster tone simulating electron beam sweeping across sample surface
   */
  public playElectronBeamSweepScan() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.15;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1200, t);
      osc.frequency.exponentialRampToValueAtTime(3200, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(2);
    } catch {}
  }

  /**
   * Milestone 52: TEM Atomic Lattice Fringe Lock Tone
   * Pure crystalline harmonic bell indicating atomic resolution sub-angstrom focus lock
   */
  public playAtomicLatticeLockTone() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.45;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760, t); // A6
      osc.frequency.setValueAtTime(2093, t + 0.08); // C7

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.15, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(4);
    } catch {}
  }

  /**
   * Milestone 53: XPS X-Ray Excitation Photon Flash & Photoelectron Emission
   * Energetic dual-frequency ionization burst with micro-decay sweep
   */
  public playXpsPhotonFlash() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.22;

      // High-energy X-ray photon pulse
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(2400, t);
      osc1.frequency.exponentialRampToValueAtTime(800, t + dur);

      gain1.gain.setValueAtTime(0.001, t);
      gain1.gain.linearRampToValueAtTime(0.18, t + 0.01);
      gain1.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc1.connect(gain1);
      gain1.connect(this.sfxGain);
      osc1.start(t);
      osc1.stop(t + dur);

      // Photoelectron kinetic energy hum
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(440, t);
      osc2.frequency.linearRampToValueAtTime(880, t + dur * 0.7);

      gain2.gain.setValueAtTime(0.001, t);
      gain2.gain.linearRampToValueAtTime(0.08, t + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc2.connect(gain2);
      gain2.connect(this.sfxGain);
      osc2.start(t);
      osc2.stop(t + dur);

      this.triggerHaptic(3);
    } catch {}
  }

  /**
   * Milestone 53: XPS Core-Level Peak Deconvolution Lock Chime
   * Clear resonant harmonic chime indicating peak centroid and chemical shift alignment
   */
  public playCoreLevelPeakLockTone() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.35;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1318.51, t); // E6
      osc.frequency.setValueAtTime(1567.98, t + 0.06); // G6

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.14, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(2);
    } catch {}
  }

  /**
   * Milestone 54: AFM Tip Approach Snap-in / Jump-to-Contact Click
   * Crisp micro-mechanical snap when cantilever pulls into attractive potential well
   */
  public playAfmTipApproachSnap() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.08;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(3200, t);
      osc.frequency.exponentialRampToValueAtTime(600, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(3);
    } catch {}
  }

  /**
   * Milestone 54: AFM Tapping Mode Cantilever Resonant Oscillation
   * Periodic acoustic resonance representing cantilever tapping at 150-300 kHz (audible harmonic)
   */
  public playAfmTappingResonanceHum(freq: number = 440) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.28;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.linearRampToValueAtTime(freq * 1.02, t + dur * 0.5);
      osc.frequency.linearRampToValueAtTime(freq, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(1);
    } catch {}
  }

  /**
   * Milestone 55: SPR Kretschmann Surface Plasmon Resonance Dip Sweep
   * Sweeping optical resonance filter tone with sharp plasmon absorption dip
   */
  public playSprResonanceDipSweep() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.25;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, t);
      osc.frequency.exponentialRampToValueAtTime(420, t + dur * 0.5); // Dip notch
      osc.frequency.exponentialRampToValueAtTime(1200, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.16, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.015, t + dur * 0.5); // Absorbed into plasmon
      gain.gain.exponentialRampToValueAtTime(0.14, t + dur * 0.8);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(2);
    } catch {}
  }

  /**
   * Milestone 55: SPR Real-Time Sensorgram Biomolecular Association Chime
   * Ascending bell arpeggio indicating antibody-antigen binding on the sensor chip
   */
  public playSprSensorgramBindingChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.4;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, t); // A5
      osc.frequency.setValueAtTime(1108.73, t + 0.07); // C#6
      osc.frequency.setValueAtTime(1318.51, t + 0.14); // E6
      osc.frequency.setValueAtTime(1760, t + 0.21); // A6

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.16, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(3);
    } catch {}
  }

  /**
   * Milestone 56: DLS He-Ne Laser Photon Scattering Speckle Pulse
   * Soft rhythmic laser scattering pulse simulating fluctuating speckle pattern
   */
  public playDlsLaserScatteringPulse() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.12;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2000, t);
      osc.frequency.exponentialRampToValueAtTime(1000, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.14, t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(2);
    } catch {}
  }

  /**
   * Milestone 56: Zeta Potential Isoelectric Point Flocculation Alert
   * Low warning chord indicating loss of electrostatic repulsion and colloidal instability
   */
  public playZetaIsoelectricAlertTone() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.38;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(311.13, t); // Eb4
      osc.frequency.setValueAtTime(293.66, t + 0.1); // D4

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.16, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(4);
    } catch {}
  }

  /**
   * Milestone 57: Circular Dichroism Chiral Polarization Hum
   * Subtle dual-frequency binaural phase hum simulating differential absorption of LCP and RCP light
   */
  public playCircularDichroismChiralHum() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.28;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, t); // C5
      osc2.frequency.setValueAtTime(528.00, t); // Slight 4.75 Hz chiral beat frequency

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.sfxGain);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + dur);
      osc2.stop(t + dur);

      this.triggerHaptic(3);
    } catch {}
  }

  /**
   * Milestone 57: Alpha-Helix Resonance Tone
   * Harmonious crystalline resonant chord upon locking alpha-helical or beta-sheet secondary structure
   */
  public playAlphaHelixResonanceTone() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.45;

      const freqs = [659.25, 830.61, 987.77, 1318.51]; // E5 major chord
      freqs.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const startT = t + idx * 0.02;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startT);

        gain.gain.setValueAtTime(0.001, startT);
        gain.gain.linearRampToValueAtTime(0.08 / (idx + 1), startT + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, startT + dur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(startT);
        osc.stop(startT + dur);
      });

      this.triggerHaptic(5);
    } catch {}
  }

  /**
   * Milestone 58: Differential Scanning Fluorimetry (DSF) Fluorescence Surge
   * Upward-swelling harmonic frequency sweep simulating hydrophobic dye binding (SYPRO Orange)
   */
  public playDsfFluorescenceSurge() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.35;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, t); // A4
      osc.frequency.exponentialRampToValueAtTime(1760, t + dur); // A6 surge

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.15, t + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(4);
    } catch {}
  }

  /**
   * Milestone 58: Protein Thermal Shift Assay (PTSA) Tm Peak Tone
   * Resonant crystalline dual-bell tone upon locking melting temperature Tm and ΔTm shift
   */
  public playThermalShiftPeakTone() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.40;

      [880, 1108.73, 1318.51].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const startT = t + idx * 0.025;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startT);

        gain.gain.setValueAtTime(0.001, startT);
        gain.gain.linearRampToValueAtTime(0.09 / (idx + 1), startT + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startT + dur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(startT);
        osc.stop(startT + dur);
      });

      this.triggerHaptic(6);
    } catch {}
  }

  /**
   * Milestone 59: Small-Angle X-Ray Scattering (SAXS) Beam Exposure Hum
   * Deep synchrotron X-ray undulator flux hum with collimation shutter pulse
   */
  public playSaxsBeamExposureHum() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.32;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.linearRampToValueAtTime(160, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(3);
    } catch {}
  }

  /**
   * Milestone 59: Guinier Linear Fit Lock Tone
   * Crisp harmonic chord confirming q·Rg < 1.3 linear Guinier region validation
   */
  public playGuinierFitLockTone() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.42;

      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const startT = t + idx * 0.03;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startT);

        gain.gain.setValueAtTime(0.001, startT);
        gain.gain.linearRampToValueAtTime(0.08 / (idx + 1), startT + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, startT + dur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(startT);
        osc.stop(startT + dur);
      });

      this.triggerHaptic(5);
    } catch {}
  }

  /**
   * Milestone 60: Cryo-EM Liquid Ethane Rapid Plunge Vitrification Sizzle
   * Pneumatic release hiss transitioning into rapid cryogenic plunge sizzle
   */
  public playCryoEmPlungeVitrify() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.36;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(180, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.14, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(6);
    } catch {}
  }

  /**
   * Milestone 60: Fourier Shell Correlation (FSC) 0.143 Gold-Standard Resolution Lock Tone
   * Crystalline high-register 4-tone harmonic bell locking nominal atomic resolution
   */
  public playFscResolutionLockTone() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.45;

      [783.99, 987.77, 1174.66, 1567.98].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const startT = t + idx * 0.028;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startT);

        gain.gain.setValueAtTime(0.001, startT);
        gain.gain.linearRampToValueAtTime(0.09 / (idx + 1), startT + 0.018);
        gain.gain.exponentialRampToValueAtTime(0.001, startT + dur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(startT);
        osc.stop(startT + dur);
      });

      this.triggerHaptic(5);
    } catch {}
  }

  /**
   * Milestone 61: Magic-Angle Spinning (MAS) Supersonic Rotor Spin Tone
   * Rising acoustic turbine glide simulating pneumatic bearing spinning up to 60 kHz
   */
  public playMasRotorSpinTone(freqKHz: number = 20) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.35;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Audio whistle pitched proportionally to spinning frequency (400 Hz - 2400 Hz)
      const baseAudioFreq = 350 + Math.min(2200, freqKHz * 40);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(baseAudioFreq * 0.8, t);
      osc.frequency.exponentialRampToValueAtTime(baseAudioFreq, t + dur * 0.6);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.06, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      // Lowpass filter to smooth the turbine buzz
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(baseAudioFreq * 2.2, t);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(4);
    } catch {}
  }

  /**
   * Milestone 61: Hartmann-Hahn CP Matching Condition Resonance Lock Tone
   * Harmonious dual-frequency chime when γ_H * B_1H = γ_C * B_1C condition is achieved
   */
  public playHartmannHahnResonanceLockTone() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.50;

      // Resonant harmonic pair (600 Hz & 900 Hz representing 1H and 13C lock)
      [600, 900, 1200, 1800].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const startT = t + idx * 0.035;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startT);

        gain.gain.setValueAtTime(0.001, startT);
        gain.gain.linearRampToValueAtTime(0.08 / (idx + 1), startT + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startT + dur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(startT);
        osc.stop(startT + dur);
      });

      this.triggerHaptic(6);
    } catch {}
  }

  /**
   * Milestone 62: Stopped-Flow Pneumatic Piston Plunge Sound
   * Sharp compressed gas release + rapid micro-mixing fluid rush
   */
  public playStoppedFlowPistonPlunge() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.22;

      // Piston impact impulse
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(45, t + 0.08);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(8);
    } catch {}
  }

  /**
   * Milestone 62: Pre-Steady-State Burst Detection Tone
   * Rising melodic chime indicating burst kinetics inflection established
   */
  public playKineticBurstDetectionTone() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.40;

      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const startT = t + idx * 0.03;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startT);

        gain.gain.setValueAtTime(0.001, startT);
        gain.gain.linearRampToValueAtTime(0.07 / (idx + 1), startT + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startT + dur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(startT);
        osc.stop(startT + dur);
      });

      this.triggerHaptic(5);
    } catch {}
  }

  /**
   * Milestone 63: Dual-Polarization Interferometry (DPI) Laser Interference Tone
   * Dual orthogonal polarization interference hum (TM & TE modes at 587 Hz and 880 Hz)
   */
  public playDpiLaserInterferenceTone() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.38;

      // TM and TE orthogonal mode frequencies
      [587.33, 880.00].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.05, t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(t);
        osc.stop(t + dur);
      });

      this.triggerHaptic(4);
    } catch {}
  }

  /**
   * Milestone 63: De Feijter Surface Mass & Sub-Angstrom Resolution Lock Chime
   * Pristine crystalline chord locking resolved adlayer thickness d and refractive index n
   */
  public playDeFeijterMassResolvedChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.48;

      [659.25, 830.61, 987.77, 1318.51].forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const startT = t + idx * 0.025;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startT);

        gain.gain.setValueAtTime(0.001, startT);
        gain.gain.linearRampToValueAtTime(0.08 / (idx + 1), startT + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startT + dur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(startT);
        osc.stop(startT + dur);
      });

      this.triggerHaptic(6);
    } catch {}
  }

  /**
   * Milestone 64: QCM-D Quartz Shear Resonance Acoustic Ping
   * Pure piezoelectric crystal oscillation bell pitched by overtone harmonic
   */
  public playQcmdQuartzResonancePing(overtone: number = 3) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.42;

      const baseFreq = 440 * (overtone / 3);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.09, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(4);
    } catch {}
  }

  /**
   * Milestone 64: Viscoelastic Energy Dissipation Ring-Down Damping Tone
   * Rapid damped ring-down simulation (ΔD energy dissipation in soft film)
   */
  public playViscoelasticDampingTone() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.28;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(160, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(7);
    } catch {}
  }

  /**
   * Milestone 65: Optical Tweezers Gradient Force Trap Capture Tone
   * Resonant laser harmonic lock (Ashkin 1064 nm optical potential well)
   */
  public playOpticalTrapCaptureTone(laserPowerMw: number = 100) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.35;

      // Primary focused laser tone
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const baseFreq = 880 + Math.min(440, laserPowerMw * 2);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * 0.8, t);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.25, t + dur * 0.6);
      osc.frequency.exponentialRampToValueAtTime(baseFreq, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      // Sub-harmonic trap stiffness humming pulse
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(baseFreq * 0.5, t);
      subGain.gain.setValueAtTime(0.03, t);
      subGain.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.8);

      subOsc.connect(subGain);
      subGain.connect(this.sfxGain);
      subOsc.start(t);
      subOsc.stop(t + dur * 0.8);

      this.triggerHaptic(5);
    } catch {}
  }

  /**
   * Milestone 65: Single-Molecule Mechanical Overstretching / Unfolding Snap
   * Sharp tension release at 65 pN DNA plateau or Titin saw-tooth domain unfolding
   */
  public playDnaOverstretchingSnapTone() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.22;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(740, t);
      osc.frequency.exponentialRampToValueAtTime(220, t + dur);

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      // Lowpass filter to give organic tensile snap texture
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, t);
      filter.frequency.exponentialRampToValueAtTime(600, t + dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(12);
    } catch {}
  }

  /**
   * Milestone 66: Magnetic Tweezers Superparamagnetic Bead Rotation Tone
   * Smooth rotational hum from rotating external permanent magnet pair
   */
  public playMagneticBeadRotationTone(turns: number = 0) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.3;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const baseFreq = 220 + Math.min(220, Math.abs(turns) * 3);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.linearRampToValueAtTime(baseFreq * (turns >= 0 ? 1.08 : 0.92), t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.06, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(4);
    } catch {}
  }

  /**
   * Milestone 66: Topoisomerase Catalytic Relaxation / Strand Passage Chime
   * Crisp enzymatic step chime (ΔLk = +1 single-strand swivel or ΔLk = +2 duplex pass)
   */
  public playTopoisomeraseCatalyticStepChime(deltaLk: number = 1) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const isDouble = Math.abs(deltaLk) >= 2;
      const notes = isDouble ? [659.25, 880.0] : [587.33]; // E5 + A5 for double, D5 for single

      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const startTime = t + idx * 0.06;
        const dur = 0.28;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.09, startTime + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(startTime);
        osc.stop(startTime + dur);
      });

      this.triggerHaptic(isDouble ? 10 : 6);
    } catch {}
  }

  /**
   * Milestone 67: Capillary Electrophoresis High-Voltage Electric Field Hum
   * 10 - 30 kV high-voltage energization hum with electrostatic transient
   */
  public playCapillaryHighVoltageHum(voltageKv: number = 20) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.38;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const baseFreq = 60 + Math.min(180, Math.abs(voltageKv) * 6);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(baseFreq, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.07, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      // Lowpass filter to muffle raw sawtooth into smooth electric transformer hum
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, t);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(5);
    } catch {}
  }

  /**
   * Milestone 67: Electrophoresis On-Column Peak Detection Chime
   * Crisp optical absorbance peak detection chime (Jorgenson-Lukacs band passage)
   */
  public playElectrophoresisPeakDetectionChime(peakHeightMau: number = 20) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.32;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const baseFreq = 1046.5 + Math.min(500, peakHeightMau * 8); // C6 up to E6

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.2, t + 0.08);
      osc.frequency.exponentialRampToValueAtTime(baseFreq, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.1, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(8);
    } catch {}
  }

  /**
   * Milestone 68: PET Dual 511 keV Coincidence Annihilation Ping
   * Simultaneous collinear dual-photon scintillation crystal coincidence hit
   */
  public playPetPositronAnnihilationPing(energyKev: number = 511) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.26;

      // Two simultaneous collinear photon pings (1533 Hz and 2044 Hz harmonics)
      [1533, 2044].forEach((f, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t);
        osc.frequency.exponentialRampToValueAtTime(f * 1.05, t + 0.04);
        osc.frequency.exponentialRampToValueAtTime(f * 0.95, t + dur);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.08, t + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

        osc.connect(gain);
        gain.connect(this.sfxGain!);
        osc.start(t);
        osc.stop(t + dur);
      });

      this.triggerHaptic(7);
    } catch {}
  }

  /**
   * Milestone 68: Medical Cyclotron Proton Beam Acceleration Surge
   * Energetic RF resonance surge (e.g. 18O(p, n)18F isotope production)
   */
  public playCyclotronRadioisotopeSurgeTone(halfLifeMin: number = 109.8) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.45;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(640, t + dur * 0.7);
      osc.frequency.exponentialRampToValueAtTime(440, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.09, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(10);
    } catch {}
  }

  /**
   * Milestone 69: STM Sub-Angstrom Quantum Tunneling Current Hum
   * Exponential quantum mechanical tunneling feedback tone (Binnig-Rohrer 1986)
   */
  public playStmQuantumTunnelingHum(currentNa: number = 1.0) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.32;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const baseFreq = 280 + Math.min(400, Math.log10(Math.max(0.01, currentNa) + 1.0) * 220);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.linearRampToValueAtTime(baseFreq * 1.04, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(5);
    } catch {}
  }

  /**
   * Milestone 69: STS Conductance Band Gap Edge Transition Ping
   * Differential conductance dI/dV transition across valence/conduction band
   */
  public playStsBandGapEdgePing(isBandGap: boolean = false) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.24;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const freq = isBandGap ? 350 : 880;

      osc.type = isBandGap ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(isBandGap ? 0.04 : 0.09, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(isBandGap ? 4 : 8);
    } catch {}
  }

  /**
   * Milestone 70: Femtosecond Pump-Probe Spectroscopy Sound Effects (Zewail 1999)
   * Ultra-short optical pump pulse flash tone
   */
  public playFemtosecondPumpLaserTone() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.18;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1760, t);
      osc.frequency.exponentialRampToValueAtTime(3520, t + 0.04);
      osc.frequency.exponentialRampToValueAtTime(880, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(10);
    } catch {}
  }

  /**
   * Coherent molecular wavepacket periodic oscillation & quantum beats chime
   */
  public playWavepacketCoherentBeatChime(frequencyHz: number = 660) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.28;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequencyHz, t);
      osc.frequency.linearRampToValueAtTime(frequencyHz * 1.05, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.07, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(6);
    } catch {}
  }

  /**
   * Milestone 71: Secondary Ion Mass Spectrometry (SIMS) Sound Effects
   * Focused primary ion beam sputtering collision cascade tone
   */
  public playSimsPrimaryIonSputterTone() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.22;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(70, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(8);
    } catch {}
  }

  /**
   * Microchannel plate (MCP) secondary ion count pulse detector chime
   */
  public playSimsSecondaryIonDetectorChime(counts: number = 50000) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.16;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const freq = 1200 + Math.min(1800, Math.log10(Math.max(10, counts)) * 350);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.06, t + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(4);
    } catch {}
  }

  /**
   * Milestone 72: Mössbauer Spectroscopy Sound Effects (Nobel Prize 1961)
   * Mechanical Doppler drive velocity transducer hum
   */
  public playMossbauerDopplerDriveHum(velocityMmPerSec: number = 0.0) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.25;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const baseFreq = 160 + Math.abs(velocityMmPerSec) * 25;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.linearRampToValueAtTime(baseFreq * 1.03, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.07, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(5);
    } catch {}
  }

  /**
   * Nuclear gamma resonant absorption dip chime
   */
  public playMossbauerResonantAbsorptionDipChime(isResonant: boolean = true) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.30;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const freq = isResonant ? 920 : 330;

      osc.type = isResonant ? 'sine' : 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);
      if (isResonant) {
        osc.frequency.exponentialRampToValueAtTime(1380, t + 0.08);
      }

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(isResonant ? 0.09 : 0.04, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(isResonant ? 12 : 3);
    } catch {}
  }

  /**
   * Synchrotron Monochromator Energy Sweep Tone
   * Rising smooth sine/triangle frequency indicating Bragg crystal rotation and incident energy scan.
   */
  public playSynchrotronMonochromatorEnergySweep(energyEv: number = 8979) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.22;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Normalize frequency based on energy (e.g. 6000 - 14000 eV -> 280 - 850 Hz)
      const baseFreq = Math.max(200, Math.min(1200, 200 + (energyEv % 4000) * 0.25));

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.15, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(5);
    } catch {}
  }

  /**
   * Photoelectron Wave Interference & EXAFS Oscillation Chime
   * Resonant harmonic chime indicating backscattered wavepacket interference from coordination shells.
   */
  public playExafsPhotoelectronInterferenceChime(kWavevector: number = 5.0) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.35;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // k = 2..14 A^-1 -> Pitch mapped to harmonic series (440 Hz up to 1320 Hz)
      const harmonicFreq = 330 + Math.max(0, Math.min(14, kWavevector)) * 60;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(harmonicFreq, t);
      osc.frequency.exponentialRampToValueAtTime(harmonicFreq * 1.08, t + 0.08);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.09, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(8);
    } catch {}
  }

  /**
   * Dynamic Mechanical Oscillation Frequency Hum (DMA Sinusoidal Drive)
   * Steady mechanical oscillation tone reflecting test frequency (0.01 - 100 Hz).
   */
  public playDmaOscillationFrequencyHum(frequencyHz: number = 1.0) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.24;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Mapped acoustic representation of DMA drive (120 Hz to 480 Hz)
      const baseFreq = 120 + Math.log10(Math.max(0.01, Math.min(100, frequencyHz))) * 90;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.linearRampToValueAtTime(baseFreq * 1.02, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.07, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(5);
    } catch {}
  }

  /**
   * Viscoelastic Damping & Glass Transition Dissipation Chime
   * Resonant chime indicating energy dissipation peak (tan delta maximum).
   */
  public playGlassTransitionDampingChime(tanDelta: number = 0.5) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.32;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Higher tan delta -> lower frequency, more heavily damped tone
      const dampingFreq = Math.max(220, 720 - Math.min(1.5, tanDelta) * 320);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(dampingFreq, t);
      osc.frequency.exponentialRampToValueAtTime(dampingFreq * 0.95, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.08 + Math.min(0.06, tanDelta * 0.05), t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(10);
    } catch {}
  }

  /**
   * Isothermal Titration Calorimetry (ITC) Micro-Syringe Injection Ping
   * Crisp acoustic click/ping representing automated stepper motor micro-syringe injection.
   */
  public playItcSyringeInjectionPing(injectionIndex: number = 1) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.16;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Pitch steps up slightly with injection progress (660 Hz up to 880 Hz)
      const freq = 660 + (injectionIndex % 20) * 11;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.25, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(4);
    } catch {}
  }

  /**
   * Calorimetric Heat Dissipation Exotherm Hiss / Endotherm Chime
   * Soft thermal power surge reflecting micro-calorie heat of binding.
   */
  public playCalorimetricHeatExothermHiss(deltaH: number = -25) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const isExothermic = deltaH < 0;
      const dur = 0.28;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Exothermic: warm low-to-mid hum (320 Hz); Endothermic: bright tone (580 Hz)
      const baseFreq = isExothermic ? 320 : 580;

      osc.type = isExothermic ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.linearRampToValueAtTime(baseFreq * 0.92, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.07, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(6);
    } catch {}
  }

  /**
   * Electrospray Taylor Cone High-Voltage Ionization Hum
   * Electric field spray tone representing aerosol desolvation and Coulombic jetting.
   */
  public playTaylorConeHighVoltageHum(voltageKv: number = 3.5) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.22;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Higher spray voltage -> higher static buzz pitch (180 Hz to 420 Hz)
      const baseFreq = 180 + Math.abs(voltageKv) * 55;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.linearRampToValueAtTime(baseFreq * 1.04, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.06, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(5);
    } catch {}
  }

  /**
   * Mass Spectrometer Ion Detector Peak Chime
   * High-resolution resonant chime indicating detection of discrete m/z macro-ion packet.
   */
  public playMassSpecIonDetectorPeakChime(mzRatio: number = 1000) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.32;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Mapped frequency based on m/z (500 to 3000 Th -> 440 Hz to 980 Hz)
      const freq = 440 + ((mzRatio % 2000) / 2000) * 540;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.12, t + 0.06);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.09, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(8);
    } catch {}
  }

  /**
   * Supercritical Fluid Back-Pressure Regulator (BPR) Decompression Hiss
   * High-pressure CO2 expansion audio tone mimicking fluid depressurization and phase transition.
   */
  public playSupercriticalFluidBprPressureHiss(pressureBar: number = 150) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.28;

      // Filtered white noise puff with frequency dependent on BPR pressure
      const bufferSize = Math.floor(this.ctx.sampleRate * dur);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noiseNode = this.ctx.createBufferSource();
      noiseNode.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      const centerFreq = Math.min(3200, 800 + (pressureBar / 250) * 1400);
      filter.frequency.setValueAtTime(centerFreq, t);
      filter.Q.setValueAtTime(2.5, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.07, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      noiseNode.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      noiseNode.start(t);
      noiseNode.stop(t + dur);

      this.triggerHaptic(6);
    } catch {}
  }

  /**
   * Chiral Enantiomer Peak Resolution Chime
   * Crystal bell chime confirming baseline resolution (Rs >= 1.5) of enantiomers.
   */
  public playChiralPeakDetectorPing(resolutionRs: number = 2.0) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.35;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Higher resolution -> higher harmonic chime (587 Hz D5 to 880 Hz A5)
      const freq = Math.min(1046, 587 + (resolutionRs / 3.0) * 293);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + 0.08);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(10);
    } catch {}
  }

  /**
   * Nanoparticle Tracking Brownian Trajectory Chirp
   * High-pitch staccato chirp representing a single nanoparticle undergoing Brownian step diffusion.
   */
  public playBrownianParticleTrackChirp(diameterNm: number = 100) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.12;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Smaller nanoparticles diffuse faster -> higher pitch chirp
      const freq = Math.max(300, Math.min(1800, 1600 - (diameterNm / 200) * 800));

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.25, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.05, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(4);
    } catch {}
  }

  /**
   * Hydrodynamic Mode Sizing Bell Tone
   * Resonant acoustic confirmation of resolved Stokes-Einstein peak diameter.
   */
  public playHydrodynamicModeDiameterBeep(modeDiameterNm: number = 100) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.28;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const freq = Math.max(260, Math.min(1200, 750 - (modeDiameterNm / 300) * 350));

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.95, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(8);
    } catch {}
  }

  /**
   * Microscale Thermophoresis Infrared Laser Heating Tone
   * Warm resonant hum indicating IR laser activation creating delta T across the capillary.
   */
  public playMstIrLaserHeatingHum(laserPowerPercent: number = 40) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.35;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Power-dependent frequency (120 Hz to 280 Hz warm hum)
      const freq = 120 + (laserPowerPercent / 80) * 160;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.linearRampToValueAtTime(freq * 1.05, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.06, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(5);
    } catch {}
  }

  /**
   * Thermophoretic Depletion Steady-State Bell Chime
   * Clear acoustic ping when Soret thermal equilibrium or Kd inflection is resolved.
   */
  public playThermophoreticDepletionPing(kdMolar: number = 1e-6) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.32;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Sub-nanomolar (high affinity) -> higher harmonic chime (880 Hz A5), micromolar -> 523 Hz C5
      const logKd = Math.max(-12, Math.min(-3, Math.log10(kdMolar)));
      const freq = 523 + ((-logKd - 3) / 9) * 440;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.08, t + 0.06);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(8);
    } catch {}
  }

  /**
   * Bio-Layer Interferometry Biosensor Tip Immersion Dip-and-Read Chime
   * Clear acoustic bell indicating sensor tip dipping into microplate well and establishing baseline.
   */
  public playBliDipAndReadChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.35;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(784, t); // G5
      osc.frequency.exponentialRampToValueAtTime(1046, t + 0.08); // C6

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(7);
    } catch {}
  }

  /**
   * BLI Association Phase Kinetics Wavelength Shift Chirp
   * Gliding optical interference tone representing nanometer wavelength shift (delta lambda).
   */
  public playBliKineticsAssociationChirp(shiftNm: number = 1.0) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.22;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Higher optical thickness shift -> higher frequency (440 Hz to 880 Hz)
      const baseFreq = Math.min(880, 440 + (shiftNm / 2.0) * 440);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.linearRampToValueAtTime(baseFreq * 1.15, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.06, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(5);
    } catch {}
  }

  /**
   * Suspended Microchannel Resonator Cantilever Transit Blip
   * Dynamic acoustic blip: rising pitch for positive buoyant oil droplets (Delta f > 0),
   * falling pitch for negative buoyant dense protein aggregates (Delta f < 0).
   */
  public playResonatorCantileverTransitBlip(frequencyShiftHz: number = -15) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.16;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const baseCenterFreq = 520;
      // Frequency shift maps into audible pitch glide
      const targetFreq = Math.max(220, Math.min(1100, baseCenterFreq + frequencyShiftHz * 6));

      osc.type = frequencyShiftHz > 0 ? 'sine' : 'sawtooth';
      osc.frequency.setValueAtTime(baseCenterFreq, t);
      osc.frequency.linearRampToValueAtTime(targetFreq, t + dur * 0.5);
      osc.frequency.linearRampToValueAtTime(baseCenterFreq, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.07, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(4);
    } catch {}
  }

  /**
   * Archimedes Buoyant Mass Confirmation Chime
   * Resonant bell tone confirming single-particle mass and density determination.
   */
  public playArchimedesBuoyantMassChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.32;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(659, t); // E5
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.08); // A5

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(8);
    } catch {}
  }

  /**
   * DSC Thermal Ramp Furnace Heater Hum
   * Low warmth hum with gentle harmonic overtone representing controlled calorimetric heating ramp.
   */
  public playDscThermalRampHeaterHum() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.28;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(140, t);
      osc1.frequency.linearRampToValueAtTime(210, t + dur);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(280, t);
      osc2.frequency.linearRampToValueAtTime(420, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.07, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.sfxGain);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + dur);
      osc2.stop(t + dur);

      this.triggerHaptic(6);
    } catch {}
  }

  /**
   * Protein Denaturation / Tm Transition Peak Chime
   * Clear harmonic bell ringing at transition midpoint temperature Tm.
   */
  public playProteinDenaturationTmPeakChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.38;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, t); // D5
      osc.frequency.exponentialRampToValueAtTime(880.0, t + 0.09); // A5

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.09, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(10);
    } catch {}
  }

  /**
   * PPC Pressure Perturbation Jump Valve Hiss
   * Fast pneumatic valve actuation hiss for +/- 5 bar nitrogen pressure jump.
   */
  public playPpcPressureJumpHiss() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.22;

      // Filtered noise buffer for pneumatic air release
      const bufferSize = Math.floor(this.ctx.sampleRate * dur);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1600, t);
      filter.Q.setValueAtTime(2.5, t);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      noise.start(t);
      noise.stop(t + dur);

      this.triggerHaptic(8);
    } catch {}
  }

  /**
   * PPC Thermal Expansion Heat Pulse Ping
   * Clean dual-tone ping indicating heat response from thermal expansion coefficient alpha.
   */
  public playThermalExpansionPulsePing() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.32;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(740, t); // F#5
      osc.frequency.exponentialRampToValueAtTime(987.77, t + 0.06); // B5

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.09, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(6);
    } catch {}
  }

  /**
   * SEC-MALS Multi-Angle Laser Scattering Sweep
   * Modern multi-angle laser frequency glide representing angular photodiode array scan.
   */
  public playSecMalsLaserScatteringSweep() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.26;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, t); // A4
      osc.frequency.exponentialRampToValueAtTime(1320, t + dur); // E6

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(8);
    } catch {}
  }

  /**
   * Zimm Plot Absolute Molar Mass Confirmation Chime
   * Crisp resonant chord chime confirming Mw and Rg extrapolation.
   */
  public playZimmPlotMolarMassChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.35;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(523.25, t); // C5
      osc1.frequency.exponentialRampToValueAtTime(1046.5, t + 0.08); // C6

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, t); // E5
      osc2.frequency.exponentialRampToValueAtTime(1318.5, t + 0.08); // E6

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.09, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.sfxGain);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + dur);
      osc2.stop(t + dur);

      this.triggerHaptic(10);
    } catch {}
  }

  /**
   * Ultracentrifuge High-Speed Vacuum Rotor Acceleration Hum (60,000 RPM)
   * High-pitch turbine spool-up hum representing Svedberg ultracentrifuge rotor.
   */
  public playUltracentrifugeRotorHum() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.38;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(1760, t + dur); // Spool up to 1.76 kHz

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.07, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(12);
    } catch {}
  }

  /**
   * Svedberg Boundary Optical Scanner Chirp
   * High-precision interference scanner pass tone.
   */
  public playSvedbergBoundaryMovementChirp() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.24;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, t); // A5
      osc.frequency.exponentialRampToValueAtTime(1174.66, t + 0.08); // D6

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(6);
    } catch {}
  }

  /**
   * AF4 Ribbon Channel Cross-Flow Hiss
   * Open-channel laminar fluidic hiss across ultrafiltration membrane.
   */
  public playAf4CrossFlowChannelHiss() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.32;

      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(740, t + dur);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, t);
      filter.Q.setValueAtTime(3.0, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.06, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(8);
    } catch {}
  }

  /**
   * Hydrodynamic Radius (R_h) Nanoparticle Peak Chime
   * Clear resonant harmonic chime indicating fractionated nanoparticle detection.
   */
  public playHydrodynamicRadiusPeakChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.36;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(698.46, t); // F5
      osc1.frequency.exponentialRampToValueAtTime(1396.91, t + 0.06); // F6

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1046.5, t); // C6
      osc2.frequency.exponentialRampToValueAtTime(2093.0, t + 0.06); // C7

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.sfxGain);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + dur);
      osc2.stop(t + dur);

      this.triggerHaptic(10);
    } catch {}
  }

  /**
   * TDA Micro-Capillary Laminar Flow Whistle
   * High-precision laminar Poiseuille hydrodynamic flow through fused silica capillary.
   */
  public playTdaCapillaryFlowWhistle() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.28;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, t);
      osc.frequency.exponentialRampToValueAtTime(1250, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.07, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(6);
    } catch {}
  }

  /**
   * Taylorgram Dual Optical Window Transit Chime
   * Sequential harmonic chimes marking transit across detector window 1 and window 2.
   */
  public playTaylorgramDualPeakChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.42;

      // Pulse 1 (Window 1)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(880, t); // A5
      gain1.gain.setValueAtTime(0.001, t);
      gain1.gain.linearRampToValueAtTime(0.07, t + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.2);

      osc1.connect(gain1);
      gain1.connect(this.sfxGain);
      osc1.start(t);
      osc1.stop(t + 0.2);

      // Pulse 2 (Window 2 - Broadened & slightly lower frequency)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1174.66, t + 0.12); // D6
      gain2.gain.setValueAtTime(0.001, t + 0.12);
      gain2.gain.linearRampToValueAtTime(0.08, t + 0.14);
      gain2.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc2.connect(gain2);
      gain2.connect(this.sfxGain);
      osc2.start(t + 0.12);
      osc2.stop(t + dur);

      this.triggerHaptic(10);
    } catch {}
  }

  /**
   * FCS Confocal Single-Photon Avalanche Photodiode (APD) Click
   * Ultra-short picosecond single-molecule photon arrival click.
   */
  public playFcsConfocalSinglePhotonClick() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.04;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2400, t);
      osc.frequency.exponentialRampToValueAtTime(800, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.06, t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(4);
    } catch {}
  }

  /**
   * FCS Temporal Auto-Correlation Function G(tau) Diffusion Chime
   * Harmonic decay chime representing 3D Brownian residence time tau_D across focal beam waist.
   */
  public playAutocorrelationDiffusionChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.38;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(783.99, t); // G5
      osc1.frequency.exponentialRampToValueAtTime(392.0, t + dur); // G4

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1174.66, t); // D6
      osc2.frequency.exponentialRampToValueAtTime(587.33, t + dur); // D5

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.sfxGain);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + dur);
      osc2.stop(t + dur);

      this.triggerHaptic(8);
    } catch {}
  }

  /**
   * FLIM TCSPC Picosecond Laser Repetition Pulse Click
   * Ultra-fast high-frequency laser pulse arrival click (40-80 MHz simulation).
   */
  public playFlimPicoLaserPulseClick() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.035;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(3200, t);
      osc.frequency.exponentialRampToValueAtTime(1600, t + dur);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.05, t + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(4);
    } catch {}
  }

  /**
   * FLIM Nanosecond Lifetime Decay & Phasor Circle Harmonic Chime
   * Smooth ethereal exponential decay chime representing fluorescence lifetime tau.
   */
  public playNanosecondDecayPhasorChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.36;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, t); // E5
      osc1.frequency.exponentialRampToValueAtTime(329.63, t + dur); // E4

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(987.77, t); // B5
      osc2.frequency.exponentialRampToValueAtTime(493.88, t + dur); // B4

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.07, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.sfxGain);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + dur);
      osc2.stop(t + dur);

      this.triggerHaptic(8);
    } catch {}
  }

  /**
   * smFRET Alternating Laser Excitation (ALEX) Microsecond Switch Click
   * Crisp dual-frequency optic acousto-optic modulator (AOM) alternation click (green 532 nm / red 640 nm).
   */
  public playSmFretLaserAlternationClick() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.04;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2800, t);
      osc.frequency.setValueAtTime(4200, t + 0.02);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.06, t + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + dur);

      this.triggerHaptic(5);
    } catch {}
  }

  /**
   * smFRET Single-Molecule Energy Transfer Burst & 2D E-S Chime
   * Harmonic resonant chime echoing nanometer distance Förster dipole energy transfer.
   */
  public playFretBurstChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain || this.isMuted) return;
      const t = this.ctx.currentTime;
      const dur = 0.42;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(783.99, t); // G5
      osc1.frequency.exponentialRampToValueAtTime(1046.50, t + dur); // C6

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(1318.51, t); // E6
      osc2.frequency.exponentialRampToValueAtTime(1567.98, t + dur); // G6

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.sfxGain);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + dur);
      osc2.stop(t + dur);

      this.triggerHaptic(10);
    } catch {}
  }
}

export const sound = new SoundEngine();
