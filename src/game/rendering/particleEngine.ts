// src/game/rendering/particleEngine.ts
// High-Performance Object-Pooled Particle & VFX Engine for ELEMENTA
// Zero-Allocation in 60 Hz Loop (Pre-allocated pool of 350 particles)

export type ParticleType =
  | 'SPARK'       // Electric plasma sparks with velocity stretching
  | 'SHARD'       // Solid metallic / mineral shards with rotation
  | 'VAPOR'       // Expanding toxic or steam gas clouds
  | 'FLAME'       // Fiery combustion embers transitioning to smoke
  | 'BUBBLE'      // Aqueous bubbles with sine-wave horizontal drift
  | 'CRYSTAL'     // Shimmering geometric crystal dust
  | 'SHOCKWAVE';  // Expanding energy ring

export interface Particle {
  active: boolean;
  type: ParticleType;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  angularVelocity: number;
  size: number;
  startSize: number;
  endSize: number;
  color: string;
  endColor?: string;
  alpha: number;
  life: number;
  maxLife: number;
  gravity?: number;
  drag?: number;
}

export class ParticleEngine {
  private poolSize: number = 350;
  private activeBudget: number = 350;
  private pool: Particle[] = [];
  private activeCount: number = 0;

  constructor() {
    // Pre-allocate pool
    for (let i = 0; i < this.poolSize; i++) {
      this.pool.push({
        active: false,
        type: 'SPARK',
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        angle: 0,
        angularVelocity: 0,
        size: 4,
        startSize: 4,
        endSize: 1,
        color: '#00f0ff',
        alpha: 1,
        life: 0,
        maxLife: 1,
        gravity: 0,
        drag: 0.96
      });
    }
  }

  /**
   * Adjust active particle budget based on graphics quality setting
   */
  public setQuality(quality: 'ULTRA' | 'BALANCED' | 'PERFORMANCE') {
    if (quality === 'PERFORMANCE') {
      this.activeBudget = 80;
    } else if (quality === 'BALANCED') {
      this.activeBudget = 200;
    } else {
      this.activeBudget = 350;
    }
  }

  public getActiveCount(): number {
    let count = 0;
    for (let i = 0; i < this.poolSize; i++) {
      if (this.pool[i].active) count++;
    }
    return count;
  }

  /**
   * Acquire an inactive particle from pool within the active budget
   */
  private acquire(): Particle | null {
    if (this.activeCount >= this.activeBudget) return null;
    for (let i = 0; i < this.activeBudget; i++) {
      if (!this.pool[i].active) {
        return this.pool[i];
      }
    }
    // If pool within budget is exhausted, steal the oldest active particle
    return this.pool[0];
  }

  /**
   * Spawn radial explosion of elemental particles
   */
  public spawnBurst(
    x: number,
    y: number,
    count: number,
    type: ParticleType = 'SPARK',
    color: string = '#00f0ff',
    baseSpeed: number = 180,
    baseSize: number = 5,
    maxLifeSec: number = 0.5
  ) {
    const num = Math.min(count, 40);
    for (let i = 0; i < num; i++) {
      const p = this.acquire();
      if (!p) break;

      const angle = Math.random() * Math.PI * 2;
      const speed = baseSpeed * (0.4 + Math.random() * 0.8);

      p.active = true;
      p.type = type;
      p.x = x;
      p.y = y;
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed;
      p.angle = Math.random() * Math.PI * 2;
      p.angularVelocity = (Math.random() - 0.5) * 8;
      p.size = baseSize * (0.6 + Math.random() * 0.8);
      p.startSize = p.size;
      p.endSize = type === 'VAPOR' ? p.size * 2.5 : 0;
      p.color = color;
      p.alpha = 1;
      p.life = 0;
      p.maxLife = maxLifeSec * (0.7 + Math.random() * 0.6);
      p.gravity = type === 'FLAME' ? -40 : (type === 'BUBBLE' ? -60 : 0);
      p.drag = type === 'VAPOR' ? 0.91 : (type === 'SPARK' ? 0.94 : 0.97);
    }
  }

  /**
   * Spawn expanding shockwave ring
   */
  public spawnShockwave(
    x: number,
    y: number,
    targetRadius: number = 60,
    color: string = '#00f0ff',
    durationSec: number = 0.35
  ) {
    const p = this.acquire();
    if (!p) return;

    p.active = true;
    p.type = 'SHOCKWAVE';
    p.x = x;
    p.y = y;
    p.vx = 0;
    p.vy = 0;
    p.angle = 0;
    p.angularVelocity = 0;
    p.size = 2;
    p.startSize = 2;
    p.endSize = targetRadius;
    p.color = color;
    p.alpha = 1;
    p.life = 0;
    p.maxLife = durationSec;
    p.gravity = 0;
    p.drag = 1;
  }

  /**
   * Spawn directional spray (for projectile trails, flamethrowers, acid jets)
   */
  public spawnDirectionalSpray(
    x: number,
    y: number,
    dirAngle: number,
    count: number,
    type: ParticleType = 'SPARK',
    color: string = '#00f0ff',
    baseSpeed: number = 140,
    spreadAngle: number = 0.4
  ) {
    for (let i = 0; i < count; i++) {
      const p = this.acquire();
      if (!p) break;

      const angle = dirAngle + (Math.random() - 0.5) * spreadAngle;
      const speed = baseSpeed * (0.5 + Math.random() * 0.8);

      p.active = true;
      p.type = type;
      p.x = x;
      p.y = y;
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed;
      p.angle = angle;
      p.angularVelocity = (Math.random() - 0.5) * 6;
      p.size = 3.5 * (0.6 + Math.random() * 0.8);
      p.startSize = p.size;
      p.endSize = type === 'VAPOR' ? p.size * 2 : 0.5;
      p.color = color;
      p.alpha = 1;
      p.life = 0;
      p.maxLife = 0.35 * (0.6 + Math.random() * 0.8);
      p.gravity = 0;
      p.drag = 0.93;
    }
  }

  /**
   * Advance simulation by dt seconds
   */
  public update(dt: number) {
    this.activeCount = 0;

    for (let i = 0; i < this.poolSize; i++) {
      const p = this.pool[i];
      if (!p.active) continue;

      p.life += dt;
      if (p.life >= p.maxLife) {
        p.active = false;
        continue;
      }

      this.activeCount++;
      const progress = p.life / p.maxLife;

      // Kinematics
      p.vx *= p.drag ?? 0.96;
      p.vy *= p.drag ?? 0.96;
      if (p.gravity) p.vy += p.gravity * dt;

      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.angle += p.angularVelocity * dt;

      // Scale & Alpha interpolation
      p.size = p.startSize + (p.endSize - p.startSize) * progress;
      p.alpha = Math.max(0, 1 - progress);

      // Bubble horizontal wobble
      if (p.type === 'BUBBLE') {
        p.x += Math.sin(p.life * 15) * 0.8;
      }
    }
  }

  /**
   * Render all active particles to canvas context with optional viewport bounds culling
   */
  public draw(
    ctx: CanvasRenderingContext2D,
    bounds?: { left: number; right: number; top: number; bottom: number }
  ) {
    if (this.activeCount === 0 && this.getActiveCount() === 0) return;

    ctx.save();
    for (let i = 0; i < this.poolSize; i++) {
      const p = this.pool[i];
      if (!p.active || p.alpha <= 0.01) continue;

      if (bounds) {
        const radius = p.size * 2;
        if (
          p.x + radius < bounds.left ||
          p.x - radius > bounds.right ||
          p.y + radius < bounds.top ||
          p.y - radius > bounds.bottom
        ) {
          continue;
        }
      }

      ctx.globalAlpha = p.alpha;

      switch (p.type) {
        case 'SPARK': {
          ctx.save();
          // Velocity-stretched plasma capsule
          const speed = Math.hypot(p.vx, p.vy);
          const moveAngle = Math.atan2(p.vy, p.vx);
          const stretch = Math.min(3.5, 1 + speed * 0.008);

          ctx.translate(p.x, p.y);
          ctx.rotate(moveAngle);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * stretch, p.size, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          break;
        }

        case 'SHARD': {
          ctx.save();
          // Rotating diamond shard
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.4);
          ctx.lineTo(p.size, 0);
          ctx.lineTo(0, p.size * 1.4);
          ctx.lineTo(-p.size, 0);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
          break;
        }

        case 'CRYSTAL': {
          ctx.save();
          // Hexagonal mineral flake
          ctx.translate(p.x, p.y);
          ctx.rotate(p.angle);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          for (let s = 0; s < 6; s++) {
            const rad = (s * Math.PI) / 3;
            const hx = p.size * Math.cos(rad);
            const hy = p.size * Math.sin(rad);
            if (s === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.fill();
          ctx.restore();
          break;
        }

        case 'VAPOR': {
          // Soft radial gas puff - No translate/rotate save/restore overhead
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          break;
        }

        case 'FLAME': {
          // Ember particle with warm orange core - No save/restore overhead
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          // Inner yellow heat core
          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
          break;
        }

        case 'BUBBLE': {
          // Translucent aqueous sphere with specular highlight - No save/restore overhead
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.stroke();
          // Specular glint
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(p.x - p.size * 0.35, p.y - p.size * 0.35, p.size * 0.25, 0, Math.PI * 2);
          ctx.fill();
          break;
        }

        case 'SHOCKWAVE': {
          // Expanding hollow ring - No save/restore overhead
          ctx.strokeStyle = p.color;
          ctx.lineWidth = Math.max(1, 4 * p.alpha);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.stroke();
          break;
        }
      }
    }
    ctx.restore();
  }

  /**
   * Reset all particles
   */
  public reset() {
    for (let i = 0; i < this.poolSize; i++) {
      this.pool[i].active = false;
    }
    this.activeCount = 0;
  }
}
