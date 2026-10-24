// src/game/rendering/mobaRenderer.ts
// High-End 2D Canvas MOBA Rendering Engine for ELEMENTA: Extreme Visual Overhaul
// Renders Offscreen-Cached Terrain, Biomes, Volumetric Foliage, Directional Units, Particle VFX, Fog of War & Minimap

import { MobaEngine } from '../engine/mobaEngine';
import {
  HeroRuntimeEntity,
  Vector2D,
  TurretEntity,
  MinionEntity,
  ProjectileEntity,
  AreaOfEffectEntity,
  EnvironmentalZone,
  SkillSlot
} from '../types';
import { MAP_CONFIG, MAP_OBSTACLES, MAP_BRUSHES } from '../maps/periodicRiftMap';
import { ParticleEngine } from './particleEngine';

export interface AimDecal {
  type: 'LINE' | 'AOE' | 'CONE';
  range: number;
  radius?: number;
  width?: number;
  slot: SkillSlot;
  color: string;
}

export interface MovePing {
  x: number;
  y: number;
  type: 'MOVE' | 'ATTACK';
  startTime: number;
  duration: number;
}

export interface ViewportBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

/**
 * Computes world-space axis-aligned bounding box of visible viewport with safety margin
 */
export function computeViewportBounds(
  cameraX: number,
  cameraY: number,
  viewportWidth: number,
  viewportHeight: number,
  zoom: number = 1.0,
  margin: number = 80
): ViewportBounds {
  const halfW = (viewportWidth / 2) / zoom;
  const halfH = (viewportHeight / 2) / zoom;
  return {
    left: cameraX - halfW - margin,
    right: cameraX + halfW + margin,
    top: cameraY - halfH - margin,
    bottom: cameraY + halfH + margin
  };
}

/**
 * Fast circular entity viewport culling predicate
 */
export function isCircleInViewport(
  x: number,
  y: number,
  radius: number,
  bounds: ViewportBounds
): boolean {
  return (
    x + radius >= bounds.left &&
    x - radius <= bounds.right &&
    y + radius >= bounds.top &&
    y - radius <= bounds.bottom
  );
}

/**
 * Fast rectangular obstacle/brush viewport culling predicate
 */
export function isRectInViewport(
  rx: number,
  ry: number,
  rw: number,
  rh: number,
  bounds: ViewportBounds
): boolean {
  return (
    rx + rw >= bounds.left &&
    rx <= bounds.right &&
    ry + rh >= bounds.top &&
    ry <= bounds.bottom
  );
}

export class MobaRenderer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  minimapCanvas: HTMLCanvasElement;
  minimapCtx: CanvasRenderingContext2D;

  camera: Vector2D = { x: 1200, y: 1200 };
  viewportWidth: number = 800;
  viewportHeight: number = 600;
  zoom: number = 1.0;

  // Viewport culling bounding box (world coordinates)
  public viewBounds: ViewportBounds = {
    left: 0,
    right: 2400,
    top: 0,
    bottom: 2400
  };

  /**
   * Recalculates world-space viewport bounding box for culling
   */
  public updateViewBounds(margin: number = 80) {
    this.viewBounds = computeViewportBounds(
      this.camera.x,
      this.camera.y,
      this.viewportWidth,
      this.viewportHeight,
      this.zoom,
      margin
    );
  }

  /**
   * Quick check whether a circular entity is within current camera viewport
   */
  public isInViewport(x: number, y: number, radius: number = 60): boolean {
    return isCircleInViewport(x, y, radius, this.viewBounds);
  }

  /**
   * Quick check whether a rectangular obstacle/brush is within current camera viewport
   */
  public isRectInViewport(rx: number, ry: number, rw: number, rh: number): boolean {
    return isRectInViewport(rx, ry, rw, rh, this.viewBounds);
  }

  activeAimDecal: AimDecal | null = null;
  mouseWorldPos: Vector2D = { x: 0, y: 0 };
  screenShakeIntensity: number = 0;
  graphicsQuality: 'ULTRA' | 'BALANCED' | 'PERFORMANCE' = 'BALANCED';
  reducedMotion: boolean = false;

  // Move Pings & Tactical Indicators
  public movePings: MovePing[] = [];
  public showAttackRangeCircle: boolean = false;

  triggerMovePing(x: number, y: number, type: 'MOVE' | 'ATTACK' = 'MOVE') {
    this.movePings.push({
      x,
      y,
      type,
      startTime: Date.now(),
      duration: 0.45
    });
    if (this.movePings.length > 12) {
      this.movePings.shift();
    }
  }

  // VFX & Particle System
  public particles: ParticleEngine = new ParticleEngine();

  // Cached Static Terrain Buffer (Performance optimization)
  private terrainCacheCanvas: HTMLCanvasElement | null = null;
  private terrainCacheCtx: CanvasRenderingContext2D | null = null;

  // Offscreen Fog of War Buffer
  private fogCanvas: HTMLCanvasElement | null = null;
  private fogCtx: CanvasRenderingContext2D | null = null;

  // Track latest chemical reaction for VFX bursts
  private lastRenderedReactionTimestamp: number = -1;

  constructor(canvas: HTMLCanvasElement, minimapCanvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.minimapCanvas = minimapCanvas;
    this.minimapCtx = minimapCanvas.getContext('2d')!;

    this.initTerrainCache();
    this.resize();
  }

  /**
   * Pre-render static terrain into an offscreen canvas to avoid thousands of draw calls per frame
   */
  private initTerrainCache() {
    this.terrainCacheCanvas = document.createElement('canvas');
    this.terrainCacheCanvas.width = MAP_CONFIG.WIDTH;
    this.terrainCacheCanvas.height = MAP_CONFIG.HEIGHT;
    this.terrainCacheCtx = this.terrainCacheCanvas.getContext('2d');

    if (!this.terrainCacheCtx) return;
    const tctx = this.terrainCacheCtx;

    // 1. Deep Celestial Rift Floor: Rich Obsidian with hexagonal micro-tiles
    tctx.fillStyle = '#060a14';
    tctx.fillRect(0, 0, MAP_CONFIG.WIDTH, MAP_CONFIG.HEIGHT);

    // Subtle Hexagonal Tile Grid
    tctx.strokeStyle = '#0e172a';
    tctx.lineWidth = 1;
    const hexRadius = 40;
    const rowHeight = hexRadius * 1.5;
    const colWidth = Math.sqrt(3) * hexRadius;

    for (let y = 0; y < MAP_CONFIG.HEIGHT + hexRadius; y += rowHeight) {
      const isOdd = Math.floor(y / rowHeight) % 2 === 1;
      const xOffset = isOdd ? colWidth / 2 : 0;
      for (let x = -colWidth; x < MAP_CONFIG.WIDTH + colWidth; x += colWidth) {
        const cx = x + xOffset;
        tctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const ang = (i * Math.PI) / 3;
          const px = cx + hexRadius * Math.cos(ang);
          const py = y + hexRadius * Math.sin(ang);
          if (i === 0) tctx.moveTo(px, py);
          else tctx.lineTo(px, py);
        }
        tctx.closePath();
        tctx.stroke();
      }
    }

    // 2. Wide Lane Pavements (Đường Lát Đá Chạy Dọc Làn)
    const drawPavedPath = (pts: Vector2D[], width: number) => {
      // Outer stone border
      tctx.save();
      tctx.beginPath();
      pts.forEach((pt, idx) => {
        if (idx === 0) tctx.moveTo(pt.x, pt.y);
        else tctx.lineTo(pt.x, pt.y);
      });
      tctx.strokeStyle = '#1e293b';
      tctx.lineWidth = width + 28;
      tctx.lineCap = 'round';
      tctx.lineJoin = 'round';
      tctx.stroke();

      // Inner flagstone path
      tctx.strokeStyle = '#0f172a';
      tctx.lineWidth = width;
      tctx.stroke();

      // Fine stone curbs
      tctx.strokeStyle = '#334155';
      tctx.lineWidth = 2;
      tctx.stroke();
      tctx.restore();
    };

    // Mid Lane
    drawPavedPath([{ x: 260, y: 2140 }, { x: 2140, y: 260 }], 150);
    // Top Lane
    drawPavedPath([{ x: 260, y: 2140 }, { x: 340, y: 340 }, { x: 2140, y: 260 }], 140);
    // Bot Lane
    drawPavedPath([{ x: 260, y: 2140 }, { x: 2060, y: 2060 }, { x: 2140, y: 260 }], 140);

    // 3. Diagonal River Trench (Thung Lũng Sông Ion H₂O)
    // Deep underwater bed gradient
    tctx.save();
    tctx.beginPath();
    tctx.moveTo(MAP_CONFIG.WIDTH, 0);
    tctx.lineTo(MAP_CONFIG.WIDTH - 150, 0);
    tctx.lineTo(0, MAP_CONFIG.HEIGHT - 150);
    tctx.lineTo(0, MAP_CONFIG.HEIGHT);
    tctx.lineTo(150, MAP_CONFIG.HEIGHT);
    tctx.lineTo(MAP_CONFIG.WIDTH, 150);
    tctx.closePath();

    const riverGrad = tctx.createLinearGradient(0, MAP_CONFIG.HEIGHT, MAP_CONFIG.WIDTH, 0);
    riverGrad.addColorStop(0, '#042f2e');
    riverGrad.addColorStop(0.5, '#083344');
    riverGrad.addColorStop(1, '#042f2e');
    tctx.fillStyle = riverGrad;
    tctx.fill();

    // River stone retaining walls
    tctx.strokeStyle = 'rgba(14, 165, 233, 0.45)';
    tctx.lineWidth = 6;
    tctx.stroke();
    tctx.restore();

    // 4. Base Platforms Mosaics
    // Blue Base Platform
    tctx.save();
    tctx.beginPath();
    tctx.arc(260, 2140, 240, 0, Math.PI * 2);
    tctx.fillStyle = 'rgba(14, 165, 233, 0.12)';
    tctx.fill();
    tctx.strokeStyle = '#0284c7';
    tctx.lineWidth = 5;
    tctx.stroke();

    // Runic circular seal
    tctx.beginPath();
    tctx.arc(260, 2140, 180, 0, Math.PI * 2);
    tctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    tctx.lineWidth = 2;
    tctx.setLineDash([12, 8]);
    tctx.stroke();
    tctx.restore();

    // Red Base Platform
    tctx.save();
    tctx.beginPath();
    tctx.arc(2140, 260, 240, 0, Math.PI * 2);
    tctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
    tctx.fill();
    tctx.strokeStyle = '#dc2626';
    tctx.lineWidth = 5;
    tctx.stroke();

    // Runic circular seal
    tctx.beginPath();
    tctx.arc(2140, 260, 180, 0, Math.PI * 2);
    tctx.strokeStyle = 'rgba(248, 113, 113, 0.35)';
    tctx.lineWidth = 2;
    tctx.setLineDash([12, 8]);
    tctx.stroke();
    tctx.restore();
  }

  resize() {
    const dpr = Math.max(1, Math.min(3, (typeof window !== 'undefined' ? window.devicePixelRatio : 1) || 1));
    const rect = this.canvas.getBoundingClientRect();
    const w = Math.max(1, rect.width || (typeof window !== 'undefined' ? window.innerWidth : 1280));
    const h = Math.max(1, rect.height || (typeof window !== 'undefined' ? window.innerHeight : 720));
    this.viewportWidth = w;
    this.viewportHeight = h;

    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Setup minimap resolution
    const miniRect = this.minimapCanvas.getBoundingClientRect();
    const mw = Math.max(1, miniRect.width || 176);
    const mh = Math.max(1, miniRect.height || 176);
    this.minimapCanvas.width = Math.round(mw * dpr);
    this.minimapCanvas.height = Math.round(mh * dpr);
    this.minimapCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  screenToWorld(screenX: number, screenY: number): Vector2D {
    const cx = (this.viewportWidth || 1280) / 2;
    const cy = (this.viewportHeight || 720) / 2;
    const zoom = Math.max(0.1, this.zoom || 1.0);
    return {
      x: (screenX - cx) / zoom + this.camera.x,
      y: (screenY - cy) / zoom + this.camera.y
    };
  }

  worldToScreen(worldX: number, worldY: number): Vector2D {
    const cx = (this.viewportWidth || 1280) / 2;
    const cy = (this.viewportHeight || 720) / 2;
    const zoom = Math.max(0.1, this.zoom || 1.0);
    return {
      x: (worldX - this.camera.x) * zoom + cx,
      y: (worldY - this.camera.y) * zoom + cy
    };
  }

  public setQuality(quality: 'ULTRA' | 'BALANCED' | 'PERFORMANCE', reducedMotion: boolean = false) {
    this.graphicsQuality = quality;
    this.reducedMotion = reducedMotion;
    this.particles.setQuality(quality);
  }

  triggerScreenShake(intensity: number = 8) {
    if (this.reducedMotion) return;
    this.screenShakeIntensity = Math.min(22, Math.max(this.screenShakeIntensity, intensity));
  }

  // Master Render Loop (60 Hz)
  render(engine: MobaEngine, dt: number) {
    // 1. Process screen shake trauma from engine
    const trauma = engine.consumeScreenShake();
    if (trauma > 0) {
      this.triggerScreenShake(trauma);
    }

    // 2. Camera Smooth Tracking on Player Hero
    if (engine.playerHero) {
      const targetCam = engine.playerHero.pos;
      const lerpSpeed = 0.14;
      this.camera.x += (targetCam.x - this.camera.x) * lerpSpeed;
      this.camera.y += (targetCam.y - this.camera.y) * lerpSpeed;

      // Clamp camera within map borders
      const halfW = (this.viewportWidth / 2) / this.zoom;
      const halfH = (this.viewportHeight / 2) / this.zoom;
      this.camera.x = Math.max(halfW, Math.min(MAP_CONFIG.WIDTH - halfW, this.camera.x));
      this.camera.y = Math.max(halfH, Math.min(MAP_CONFIG.HEIGHT - halfH, this.camera.y));
    }

    // Update active viewport bounds for high-performance culling
    this.updateViewBounds(80);

    // Compute decaying screen shake offsets
    let shakeX = 0;
    let shakeY = 0;
    if (this.screenShakeIntensity > 0.1) {
      shakeX = (Math.random() - 0.5) * this.screenShakeIntensity;
      shakeY = (Math.random() - 0.5) * this.screenShakeIntensity;
      this.screenShakeIntensity *= 0.88;
    } else {
      this.screenShakeIntensity = 0;
    }

    // 3. Update Particle System
    this.particles.update(dt);

    // Check for chemical reaction events to spawn dramatic multi-layered burst VFX
    if (engine.latestReactionAlert && engine.latestReactionAlert.timestamp !== this.lastRenderedReactionTimestamp) {
      this.lastRenderedReactionTimestamp = engine.latestReactionAlert.timestamp;
      const rxPos = engine.latestReactionAlert.pos
        ? engine.latestReactionAlert.pos
        : (engine.playerHero ? engine.playerHero.pos : { x: 1200, y: 1200 });
      const isExo = engine.latestReactionAlert.rule.thermodynamics !== 'ENDOTHERMIC';
      const primaryColor = isExo ? '#f59e0b' : '#38bdf8';
      const secondaryColor = isExo ? '#fbbf24' : '#00f0ff';

      if (isExo) {
        // Exothermic / Combustion: Flame embers + Plasma sparks + Smoke vapor + Shockwave
        this.particles.spawnBurst(rxPos.x, rxPos.y, 25, 'FLAME', primaryColor, 240, 7, 0.7);
        this.particles.spawnBurst(rxPos.x, rxPos.y, 15, 'SPARK', secondaryColor, 280, 4, 0.4);
        this.particles.spawnBurst(rxPos.x, rxPos.y, 10, 'VAPOR', '#64748b', 120, 6, 0.8);
        this.particles.spawnShockwave(rxPos.x, rxPos.y, 150, primaryColor, 0.45);
      } else {
        // Endothermic / Precipitation: Shimmering crystals + Aqueous bubbles + Cyan sparks + Shockwave
        this.particles.spawnBurst(rxPos.x, rxPos.y, 25, 'CRYSTAL', primaryColor, 220, 6, 0.7);
        this.particles.spawnBurst(rxPos.x, rxPos.y, 15, 'SPARK', secondaryColor, 260, 4, 0.4);
        this.particles.spawnBurst(rxPos.x, rxPos.y, 10, 'BUBBLE', '#67e8f9', 100, 5, 0.7);
        this.particles.spawnShockwave(rxPos.x, rxPos.y, 130, primaryColor, 0.4);
      }
    }

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.viewportWidth, this.viewportHeight);

    // Enter Camera Space
    ctx.save();
    ctx.translate(this.viewportWidth / 2, this.viewportHeight / 2);
    ctx.scale(this.zoom, this.zoom);
    ctx.translate(-this.camera.x + shakeX, -this.camera.y + shakeY);

    // 4. Render Pre-cached Static Terrain + Dynamic River Caustics
    this.drawTerrain(ctx);

    // 5. Draw Dynamic Volumetric Foliage & Bushes
    this.drawBushes(ctx, engine.burningBushes);

    // 6. Draw 3D-Shaded Obstacles & Boulders
    this.drawObstacles(ctx);

    // 6.5 Draw Move Pings & Attack Indicators
    this.drawMovePings(ctx);
    if (this.showAttackRangeCircle && engine.playerHero && !engine.playerHero.isDead) {
      this.drawAttackRangeIndicator(ctx, engine.playerHero);
    }

    // 7. Draw Aim Decals (if aiming a skill)
    if (this.activeAimDecal && engine.playerHero) {
      this.drawAimDecal(ctx, engine.playerHero.pos, this.mouseWorldPos, this.activeAimDecal);
    }

    // 8. Draw Ground AoE Zones & Chemical Pools
    this.drawAoEZones(ctx, engine.aoeZones);

    // 8.5 Draw Dynamic Environmental Surface Zones (Frozen River Bridges, Limewater Pools, Electrified Water)
    this.drawEnvironmentalZones(ctx, engine.environmentalZones);

    // 9. Draw Cores & Turrets
    this.drawCores(ctx, engine.cores);
    this.drawTurrets(ctx, engine.turrets);

    // 10. Draw Neutral Monsters (Acid Lizard, Crystal Golem, Catalyst Guardian)
    this.drawMonsters(ctx, engine.monsters, engine.playerHero, engine);

    // 11. Draw Minions
    this.drawMinions(ctx, engine.minions, engine.playerHero, engine);

    // 12. Draw Heroes with Directional Silhouettes & Chemical Auras
    this.drawHeroes(ctx, engine.heroes, engine.playerHero, engine);

    // 13. Draw Projectiles
    this.drawProjectiles(ctx, engine.projectiles);

    // 14. Draw Particle System Layer with Viewport Culling
    this.particles.draw(ctx, this.viewBounds);

    // 15. Draw Floating Damage Text
    this.drawFloatingText(ctx, engine.floatingTexts);

    // Exit Camera Space
    ctx.restore();

    // 16. Draw Fog of War Ambient Shroud in Screen Space
    this.drawFogOfWarOverlay(this.ctx, engine);

    // 17. Draw Minimap in Corner
    this.renderMinimap(engine);
  }

  drawTerrain(ctx: CanvasRenderingContext2D) {
    // 1. Blit cached static terrain
    if (this.terrainCacheCanvas) {
      ctx.drawImage(this.terrainCacheCanvas, 0, 0);
    }

    const animTime = Date.now() * 0.002;

    // 2. Dynamic River Caustics & Water Ripple Interference (Active on Balanced & Ultra)
    if (this.graphicsQuality !== 'PERFORMANCE') {
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.28)';
      ctx.lineWidth = 3;

      for (let offset = -100; offset <= 100; offset += 35) {
        ctx.beginPath();
        const waveShift = Math.sin(animTime + offset * 0.04) * 18;
        ctx.moveTo(MAP_CONFIG.WIDTH + offset + waveShift, 0);
        ctx.lineTo(0, MAP_CONFIG.HEIGHT - offset - waveShift);
        ctx.stroke();
      }

      // Water Chemical Label
      ctx.fillStyle = 'rgba(6, 182, 212, 0.45)';
      ctx.font = 'bold 32px monospace';
      ctx.fillText('THUNG LŨNG SÔNG ION H₂O (DUNG MÔI)', 820, 1540);
      ctx.restore();
    }

    // 3. Flowing Lane Energy Conduits (Pulsing Centerline Lasers)
    ctx.save();
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.lineWidth = 3.5;
    ctx.setLineDash([16, 20]);
    ctx.lineDashOffset = -animTime * 24;

    // Mid Conduit
    ctx.beginPath();
    ctx.moveTo(260, 2140);
    ctx.lineTo(2140, 260);
    ctx.stroke();

    // Top Conduit
    ctx.beginPath();
    ctx.moveTo(260, 2140);
    ctx.lineTo(340, 340);
    ctx.lineTo(2140, 260);
    ctx.stroke();

    // Bot Conduit
    ctx.beginPath();
    ctx.moveTo(260, 2140);
    ctx.lineTo(2060, 2060);
    ctx.lineTo(2140, 260);
    ctx.stroke();
    ctx.restore();
  }

  drawBushes(ctx: CanvasRenderingContext2D, burningBushes?: Map<string, number>) {
    const time = Date.now() * 0.0015;

    MAP_BRUSHES.forEach(b => {
      // Viewport Culling: Skip brushes outside visible camera view
      if (!this.isRectInViewport(b.x, b.y, b.width, b.height)) return;

      const isBurning = burningBushes?.has(b.id);

      ctx.save();
      // Drop Shadow underneath bush (skipped in PERFORMANCE mode for GPU efficiency)
      if (this.graphicsQuality !== 'PERFORMANCE') {
        ctx.shadowColor = isBurning ? 'rgba(239, 68, 68, 0.7)' : 'rgba(0, 0, 0, 0.6)';
        ctx.shadowBlur = isBurning ? 20 : 14;
      }

      // Base Cluster
      ctx.fillStyle = isBurning ? 'rgba(239, 68, 68, 0.45)' : 'rgba(5, 150, 105, 0.45)';
      ctx.strokeStyle = isBurning ? '#f97316' : '#10b981';
      ctx.lineWidth = isBurning ? 3.5 : 2.5;
      ctx.beginPath();
      ctx.roundRect(b.x, b.y, b.width, b.height, 18);
      ctx.fill();
      ctx.stroke();

      // Overlapping Volumetric Leaf Tufts with Wind Sway
      const numTufts = Math.max(3, Math.floor(b.width / 45));
      for (let i = 0; i < numTufts; i++) {
        const tx = b.x + 20 + i * ((b.width - 40) / (numTufts - 1));
        const ty = b.y + b.height / 2;
        const sway = Math.sin(time + i * 1.2) * (isBurning ? 7 : 4);

        ctx.beginPath();
        ctx.arc(tx + sway, ty, 18, 0, Math.PI * 2);
        if (isBurning) {
          ctx.fillStyle = i % 2 === 0 ? '#ea580c' : '#f59e0b';
        } else {
          ctx.fillStyle = i % 2 === 0 ? '#059669' : '#10b981';
        }
        ctx.fill();
      }

      // Subtle flame sparks if burning
      if (isBurning && this.graphicsQuality !== 'PERFORMANCE' && Math.random() < 0.25) {
        this.particles.spawnBurst(
          b.x + Math.random() * b.width,
          b.y + Math.random() * b.height,
          1,
          'SPARK',
          '#f97316',
          35,
          2.5,
          0.3
        );
      }

      // Status Badge
      if (isBurning) {
        ctx.fillStyle = '#fef08a';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('🔥 Cháy Rụi!', b.x + 12, b.y + b.height / 2 + 4);
      } else {
        ctx.fillStyle = '#6ee7b7';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('🌿 Bụi Ẩn', b.x + 12, b.y + b.height / 2 + 4);
      }
      ctx.restore();
    });
  }

  drawObstacles(ctx: CanvasRenderingContext2D) {
    MAP_OBSTACLES.forEach(obs => {
      // Viewport Culling: Skip obstacles completely outside camera bounds
      if (!this.isRectInViewport(obs.x, obs.y, obs.width, obs.height)) return;

      ctx.save();
      // Contact ambient occlusion shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
      ctx.fillRect(obs.x + 8, obs.y + 8, obs.width, obs.height);

      if (obs.type === 'CRYSTAL') {
        // Glowing Emerald Barite Crystal Spire
        const grad = ctx.createLinearGradient(obs.x, obs.y, obs.x + obs.width, obs.y + obs.height);
        grad.addColorStop(0, '#065f46');
        grad.addColorStop(0.5, '#059669');
        grad.addColorStop(1, '#022c22');

        ctx.fillStyle = grad;
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 3;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);

        // Crystal facet lines
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
        ctx.beginPath();
        ctx.moveTo(obs.x, obs.y);
        ctx.lineTo(obs.x + obs.width, obs.y + obs.height);
        ctx.moveTo(obs.x + obs.width, obs.y);
        ctx.lineTo(obs.x, obs.y + obs.height);
        ctx.stroke();
      } else if (obs.type === 'LAB_PILLAR') {
        // High-Tech Industrial Pylon
        ctx.fillStyle = '#1e293b';
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 3;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);

        // Core cyan light strip
        ctx.fillStyle = '#00f0ff';
        if (this.graphicsQuality !== 'PERFORMANCE') {
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 8;
        }
        ctx.fillRect(obs.x + obs.width / 2 - 2, obs.y + 4, 4, obs.height - 8);
      } else {
        // Dense Basalt Boulder
        const rockGrad = ctx.createLinearGradient(obs.x, obs.y, obs.x, obs.y + obs.height);
        rockGrad.addColorStop(0, '#334155');
        rockGrad.addColorStop(1, '#0f172a');

        ctx.fillStyle = rockGrad;
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2.5;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
        ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
      }
      ctx.restore();
    });
  }

  drawAttackRangeIndicator(ctx: CanvasRenderingContext2D, hero: HeroRuntimeEntity) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(hero.pos.x, hero.pos.y, hero.attackRange, 0, Math.PI * 2);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 6]);
    ctx.stroke();

    // Subtle golden ground fill
    ctx.fillStyle = 'rgba(245, 158, 11, 0.06)';
    ctx.fill();
    ctx.restore();
  }

  drawMovePings(ctx: CanvasRenderingContext2D) {
    const now = Date.now();
    this.movePings = this.movePings.filter(ping => {
      const elapsed = (now - ping.startTime) / 1000;
      if (elapsed > ping.duration) return false;

      // Viewport Culling: Skip drawing pings outside visible camera frustum
      if (!this.isInViewport(ping.x, ping.y, 40)) return true;

      const progress = elapsed / ping.duration; // 0 to 1
      const alpha = Math.max(0, 1 - progress);
      const isAttack = ping.type === 'ATTACK';
      const color = isAttack ? '#ef4444' : '#10b981';

      ctx.save();
      ctx.translate(ping.x, ping.y);

      // Expanding ripple 1
      ctx.beginPath();
      ctx.arc(0, 0, 8 + progress * 24, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = 2.5 * (1 - progress * 0.5);
      ctx.stroke();

      // Expanding ripple 2
      if (progress > 0.15) {
        ctx.beginPath();
        ctx.arc(0, 0, (progress - 0.15) * 20, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha * 0.7;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Center mark (diamond for move, crosshair for attack)
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      if (isAttack) {
        // Red crosshair
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-7, 0); ctx.lineTo(7, 0);
        ctx.moveTo(0, -7); ctx.lineTo(0, 7);
        ctx.stroke();
      } else {
        // Green 4-point diamond
        ctx.beginPath();
        ctx.moveTo(0, -5);
        ctx.lineTo(5, 0);
        ctx.lineTo(0, 5);
        ctx.lineTo(-5, 0);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
      return true;
    });
  }

  drawCores(ctx: CanvasRenderingContext2D, cores: Record<string, any>) {
    const time = Date.now() * 0.002;

    ['BLUE', 'RED'].forEach(team => {
      const core = cores[team];
      if (!core || core.destroyed) return;

      // Viewport Culling: Skip cores outside visible camera frustum (140px radius covers resonance rings)
      if (!this.isInViewport(core.pos.x, core.pos.y, 140)) return;

      const isBlue = team === 'BLUE';
      const color = isBlue ? '#00f0ff' : '#ff4d4d';

      ctx.save();
      // Outer expanding harmonic resonance ring
      const pulseSize = 85 + Math.sin(time * 3) * 8;
      ctx.beginPath();
      ctx.arc(core.pos.x, core.pos.y, pulseSize, 0, Math.PI * 2);
      ctx.strokeStyle = `${color}44`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Rotating Runic Gyroscope Rings
      ctx.save();
      ctx.translate(core.pos.x, core.pos.y);
      ctx.rotate(time * (isBlue ? 1 : -1));
      ctx.beginPath();
      ctx.arc(0, 0, 68, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.setLineDash([18, 12]);
      ctx.stroke();
      ctx.restore();

      // Nexus Core Crystal (Octahedron facets)
      ctx.beginPath();
      ctx.arc(core.pos.x, core.pos.y, 42, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 28;
      ctx.fill();

      // Specular highlight facet
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(core.pos.x - 12, core.pos.y - 12, 14, 0, Math.PI * 2);
      ctx.fill();

      // Health Bar
      const hpPct = Math.max(0, core.hp / core.maxHp);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(core.pos.x - 70, core.pos.y - 105, 140, 14);
      ctx.fillStyle = color;
      ctx.fillRect(core.pos.x - 70, core.pos.y - 105, 140 * hpPct, 14);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(core.pos.x - 70, core.pos.y - 105, 140, 14);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(`${team} ELEMENTAL CORE`, core.pos.x - 65, core.pos.y - 114);
      ctx.restore();
    });
  }

  drawTurrets(ctx: CanvasRenderingContext2D, turrets: TurretEntity[]) {
    const time = Date.now() * 0.002;

    turrets.forEach(turret => {
      // Viewport Culling: Skip turrets whose full range perimeter does not overlap viewport
      if (!this.isInViewport(turret.pos.x, turret.pos.y, turret.attackRange)) return;

      if (turret.destroyed) {
        // Fractured Rubble with glowing embers
        ctx.save();
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.arc(turret.pos.x, turret.pos.y, 28, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(turret.pos.x + 6, turret.pos.y - 4, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        return;
      }

      const isBlue = turret.team === 'BLUE';
      const color = isBlue ? '#38bdf8' : '#f87171';

      ctx.save();
      // True Sight & Attack Range Perimeter
      ctx.beginPath();
      ctx.arc(turret.pos.x, turret.pos.y, turret.attackRange, 0, Math.PI * 2);
      ctx.strokeStyle = isBlue ? 'rgba(56, 189, 248, 0.12)' : 'rgba(248, 113, 113, 0.12)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Lock-On Laser Beam targeting an entity
      if (turret.targetEntityId && turret.targetLaserProgress > 0) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2 + turret.targetLaserProgress * 3;
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        ctx.restore();
      }

      // Hexagonal Foundation Plinth
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const ang = (i * Math.PI) / 3;
        const px = turret.pos.x + 38 * Math.cos(ang);
        const py = turret.pos.y + 38 * Math.sin(ang);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.stroke();

      // Spinning Celestial Gyroscope Ring
      ctx.save();
      ctx.translate(turret.pos.x, turret.pos.y);
      ctx.rotate(time * 2);
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2);
      ctx.strokeStyle = `${color}aa`;
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.stroke();
      ctx.restore();

      // Floating Quartz Focus Emitter (bobs up and down)
      const bob = Math.sin(time * 4) * 3;
      ctx.beginPath();
      ctx.arc(turret.pos.x, turret.pos.y + bob, 15, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 18;
      ctx.fill();

      // Damage Flash
      if (turret.flashTime && turret.flashTime > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = `rgba(255, 255, 255, ${(turret.flashTime / 0.08) * 0.75})`;
        ctx.beginPath();
        ctx.arc(turret.pos.x, turret.pos.y, 40, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Health Bar
      const hpPct = Math.max(0, turret.hp / turret.maxHp);
      const barX = turret.pos.x - 40;
      const barY = turret.pos.y - 54;
      const barW = 80;
      const barH = 8;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(barX, barY, barW, barH);
      ctx.fillStyle = color;
      ctx.fillRect(barX, barY, barW * hpPct, barH);

      // Notches every 1000 HP
      const num1000Ticks = Math.floor(turret.maxHp / 1000);
      for (let t = 1; t <= num1000Ticks; t++) {
        const tx = barX + (t * 1000 / turret.maxHp) * barW;
        if (tx >= barX + barW) break;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(tx - 0.5, barY, 1.5, barH);
      }

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.strokeRect(barX, barY, barW, barH);

      ctx.restore();
    });
  }

  drawMonsters(ctx: CanvasRenderingContext2D, monsters: any[], playerHero: HeroRuntimeEntity, engine: MobaEngine) {
    const time = Date.now() * 0.003;

    monsters.forEach(m => {
      const isBoss = m.type === 'CATALYST_GUARDIAN';

      // 1. Slain / Recharging Camp State: Render dormant summon ring & countdown timer
      if (!m.isAlive) {
        if (m.respawnTimer > 0 && this.isInViewport(m.pos.x, m.pos.y, 120)) {
          const { x, y } = m.pos;
          ctx.save();
          // Dormant runic pit perimeter
          ctx.beginPath();
          ctx.arc(x, y, isBoss ? 55 : 35, 0, Math.PI * 2);
          ctx.strokeStyle = isBoss ? 'rgba(245, 158, 11, 0.4)' : 'rgba(168, 85, 247, 0.35)';
          ctx.lineWidth = 2;
          ctx.setLineDash([6, 6]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Respawn Countdown Label
          ctx.fillStyle = isBoss ? '#fbbf24' : '#cbd5e1';
          ctx.font = 'bold 12px ui-monospace, SFMono-Regular, Menlo, monospace';
          ctx.textAlign = 'center';
          ctx.fillText(`⏳ ${Math.ceil(m.respawnTimer)}s`, x, y + 4);
          ctx.restore();
        }
        return;
      }

      // Viewport Culling: Skip monsters outside visible camera view
      if (!this.isInViewport(m.pos.x, m.pos.y, (m.radius || 40) + 80)) return;
      if (!engine.isEntityVisibleToTeam(m.pos, 'NEUTRAL', playerHero.team)) return;

      ctx.save();

      if (isBoss) {
        // CATALYST GUARDIAN BOSS (Platinum Chimera Titan)
        const { x, y } = m.pos;

        // 4 Sweeping Platinum Energy Wings
        for (let w = 0; w < 4; w++) {
          const wingAng = (w * Math.PI) / 2 + Math.sin(time * 2 + w) * 0.2;
          const wx = x + Math.cos(wingAng) * 65;
          const wy = y + Math.sin(wingAng) * 65;

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(wx, wy);
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 6;
          if (this.graphicsQuality !== 'PERFORMANCE') {
            ctx.shadowColor = '#fbbf24';
            ctx.shadowBlur = 15;
          }
          ctx.stroke();
        }

        // Central Chimera Body
        ctx.beginPath();
        ctx.arc(x, y, 48, 0, Math.PI * 2);
        ctx.fillStyle = '#1e1b4b';
        ctx.fill();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Glowing Platinum Core
        ctx.beginPath();
        ctx.arc(x, y, 24, 0, Math.PI * 2);
        ctx.fillStyle = '#fbbf24';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 24;
        ctx.fill();

        // Name & HP Bar
        const hpPct = Math.max(0, m.hp / m.maxHp);
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(x - 65, y - 75, 130, 9);
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(x - 65, y - 75, 130 * hpPct, 9);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.strokeRect(x - 65, y - 75, 130, 9);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText('👑 GIÁM HỘ XÚC TÁC BẠCH KIM (Pt)', x - 65, y - 82);
      } else if (m.type === 'ACID_LIZARD') {
        // ACID LIZARD (Spiked Reptile with Toxic Vapor)
        const { x, y } = m.pos;

        // Tail
        ctx.beginPath();
        ctx.moveTo(x - 20, y);
        ctx.quadraticCurveTo(x - 38, y + Math.sin(time * 4) * 12, x - 42, y);
        ctx.strokeStyle = '#65a30d';
        ctx.lineWidth = 7;
        ctx.stroke();

        // Spiked Body
        ctx.beginPath();
        ctx.ellipse(x, y, 28, 20, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#365314';
        ctx.fill();
        ctx.strokeStyle = '#84cc16';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Glowing Amber Eyes
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(x + 12, y - 6, 3, 0, Math.PI * 2);
        ctx.arc(x + 12, y + 6, 3, 0, Math.PI * 2);
        ctx.fill();

        // HP bar
        const hpPct = Math.max(0, m.hp / m.maxHp);
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(x - 30, y - 35, 60, 6);
        ctx.fillStyle = '#84cc16';
        ctx.fillRect(x - 30, y - 35, 60 * hpPct, 6);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(m.name_vi, x - 30, y - 41);
      } else {
        // CRYSTAL GOLEM (Emerald Barite Colossus)
        const { x, y } = m.pos;

        // Faceted Mineral Body
        ctx.beginPath();
        ctx.arc(x, y, 32, 0, Math.PI * 2);
        ctx.fillStyle = '#064e3b';
        ctx.fill();
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Crystal Spikes protruding from shoulders
        [-20, 20].forEach(ox => {
          ctx.beginPath();
          ctx.moveTo(x + ox, y - 10);
          ctx.lineTo(x + ox * 1.5, y - 28);
          ctx.lineTo(x + ox * 0.7, y - 10);
          ctx.fillStyle = '#34d399';
          ctx.fill();
        });

        // HP bar
        const hpPct = Math.max(0, m.hp / m.maxHp);
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(x - 30, y - 40, 60, 6);
        ctx.fillStyle = '#10b981';
        ctx.fillRect(x - 30, y - 40, 60 * hpPct, 6);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText(m.name_vi, x - 30, y - 46);
      }

      // Damage Flash
      if (m.flashTime && m.flashTime > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = `rgba(255, 255, 255, ${(m.flashTime / 0.08) * 0.75})`;
        ctx.beginPath();
        ctx.arc(m.pos.x, m.pos.y, 36, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();
    });
  }

  drawMinions(ctx: CanvasRenderingContext2D, minions: MinionEntity[], playerHero: HeroRuntimeEntity, engine: MobaEngine) {
    minions.forEach(minion => {
      // Viewport Culling: Skip minions outside visible camera view
      if (!this.isInViewport(minion.pos.x, minion.pos.y, minion.radius + 30)) return;

      const isBlue = minion.team === 'BLUE';
      const color = isBlue ? '#38bdf8' : '#f87171';

      if (minion.team !== playerHero.team && !engine.isEntityVisibleToTeam(minion.pos, minion.team, playerHero.team)) {
        return;
      }

      ctx.save();
      const { x, y } = minion.pos;

      if (minion.type === 'MELEE') {
        // MELEE AUTOMATON: Armored chassis with front energy shield
        ctx.beginPath();
        ctx.arc(x, y, minion.radius, 0, Math.PI * 2);
        ctx.fillStyle = isBlue ? '#0f172a' : '#450a0a';
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Front Shield Arc
        ctx.beginPath();
        ctx.arc(x + 4, y, minion.radius * 0.9, -Math.PI / 3, Math.PI / 3);
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.stroke();
      } else if (minion.type === 'CASTER') {
        // CASTER DRONE: Hovering catalytic core with 2 floating wings
        ctx.beginPath();
        ctx.arc(x, y, minion.radius * 0.75, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // 2 Wings
        [-minion.radius, minion.radius].forEach(wy => {
          ctx.beginPath();
          ctx.arc(x, y + wy * 0.8, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        });
      } else {
        // SIEGE CRAWLER: Heavy 4-point walker with cannon
        ctx.beginPath();
        ctx.roundRect(x - minion.radius, y - minion.radius, minion.radius * 2, minion.radius * 2, 6);
        ctx.fillStyle = '#1e293b';
        ctx.fill();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Cannon barrel
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + (isBlue ? 18 : -18), y);
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.stroke();
      }

      // Damage Flash
      if (minion.flashTime && minion.flashTime > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = `rgba(255, 255, 255, ${(minion.flashTime / 0.08) * 0.75})`;
        ctx.beginPath();
        ctx.arc(x, y, minion.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Last-hit threshold calculation:
      const isEnemy = minion.team !== playerHero.team;
      const isLastHit = isEnemy && minion.hp <= playerHero.attackDamage;

      // Minion HP bar
      const hpPct = Math.max(0, minion.hp / minion.maxHp);
      const barX = x - 16;
      const barY = y - minion.radius - 8;
      const barW = 32;
      const barH = 4;

      if (isLastHit) {
        // Glowing gold highlight cue
        ctx.save();
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(barX, barY, barW, barH);
        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 8;
        ctx.fillRect(barX, barY, barW * hpPct, barH);
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(barX - 0.5, barY - 0.5, barW + 1, barH + 1);

        // Inverted gold diamond/arrow marker above minion health bar
        ctx.beginPath();
        ctx.moveTo(x, barY - 3);
        ctx.lineTo(x - 3.5, barY - 7);
        ctx.lineTo(x + 3.5, barY - 7);
        ctx.closePath();
        ctx.fillStyle = '#fbbf24';
        ctx.fill();
        ctx.restore();
      } else {
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(barX, barY, barW, barH);
        ctx.fillStyle = color;
        ctx.fillRect(barX, barY, barW * hpPct, barH);
      }

      ctx.restore();
    });
  }

  drawHeroSignatureAura(ctx: CanvasRenderingContext2D, hero: HeroRuntimeEntity, animTime: number) {
    const { x, y } = hero.pos;
    const heroId = hero.definition.id;

    ctx.save();
    switch (heroId) {
      case 'hero_na_brawler': {
        // Sodium: 2 orbiting amber electron sparks + sodium yellow flame flares
        const angle1 = animTime * 0.004;
        const angle2 = angle1 + Math.PI;
        const r = 36;
        [angle1, angle2].forEach(ang => {
          const sx = x + Math.cos(ang) * r;
          const sy = y + Math.sin(ang) * r;
          ctx.beginPath();
          ctx.arc(sx, sy, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = '#f59e0b';
          ctx.shadowColor = '#fbbf24';
          ctx.shadowBlur = 10;
          ctx.fill();
        });
        break;
      }
      case 'hero_fe_warden': {
        // Iron: 4 ferromagnetic shard blades orbiting like magnetic field
        const baseAngle = animTime * 0.002;
        const r = 38;
        for (let i = 0; i < 4; i++) {
          const ang = baseAngle + (i * Math.PI) / 2;
          const fx = x + Math.cos(ang) * r;
          const fy = y + Math.sin(ang) * r;
          ctx.save();
          ctx.translate(fx, fy);
          ctx.rotate(ang + Math.PI / 2);
          ctx.beginPath();
          ctx.moveTo(0, -7);
          ctx.lineTo(3.5, 5);
          ctx.lineTo(-3.5, 5);
          ctx.closePath();
          ctx.fillStyle = '#94a3b8';
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 1.2;
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }
        break;
      }
      case 'hero_cl_toxic': {
        // Chlorine: 3 swirling greenish-yellow halogen gas vapor clouds
        const baseAngle = animTime * 0.0025;
        const r = 35;
        for (let i = 0; i < 3; i++) {
          const ang = baseAngle + (i * (Math.PI * 2)) / 3;
          const gx = x + Math.cos(ang) * r;
          const gy = y + Math.sin(ang) * r;
          const pulse = 6 + Math.sin(animTime * 0.005 + i) * 2;
          ctx.beginPath();
          ctx.arc(gx, gy, pulse, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(163, 230, 53, 0.45)';
          ctx.shadowColor = '#84cc16';
          ctx.shadowBlur = 8;
          ctx.fill();
        }
        break;
      }
      case 'hero_cu_striker': {
        // Copper: Metallic conductivity orbit ring with electrical pulse
        ctx.beginPath();
        ctx.arc(x, y, 36, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(234, 88, 12, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();

        const pulseAng = animTime * 0.005;
        const px = x + Math.cos(pulseAng) * 36;
        const py = y + Math.sin(pulseAng) * 36;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 12;
        ctx.fill();
        break;
      }
      case 'hero_al_vanguard': {
        // Aluminium: Hexagonal oxide protective barrier (Al2O3 passivation)
        const hexAngle = animTime * 0.0015;
        const r = 40;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const ang = hexAngle + (i * Math.PI) / 3;
          const hx = x + Math.cos(ang) * r;
          const hy = y + Math.sin(ang) * r;
          if (i === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(147, 197, 253, 0.65)';
        ctx.lineWidth = 2;
        ctx.stroke();
        break;
      }
      case 'hero_o_arsonist': {
        // Oxygen: 3 fiery allotrope combustion orbs (O2 / O3)
        const baseAngle = animTime * 0.0035;
        const r = 36;
        for (let i = 0; i < 3; i++) {
          const ang = baseAngle + (i * (Math.PI * 2)) / 3;
          const ox = x + Math.cos(ang) * r;
          const oy = y + Math.sin(ang) * r;
          ctx.beginPath();
          ctx.arc(ox, oy, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#ef4444';
          ctx.shadowColor = '#f97316';
          ctx.shadowBlur = 12;
          ctx.fill();
        }
        break;
      }
      case 'hero_h_scout': {
        // Hydrogen: High mobility twin thruster ion trails
        const moveAng = hero.targetMovePos
          ? Math.atan2(hero.targetMovePos.y - y, hero.targetMovePos.x - x)
          : animTime * 0.002;
        const tailX = x - Math.cos(moveAng) * 26;
        const tailY = y - Math.sin(moveAng) * 26;
        ctx.beginPath();
        ctx.arc(tailX, tailY, 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 10;
        ctx.fill();
        break;
      }
      case 'hero_ba_titan': {
        // Barium: Apple-green flame luminescence ring + BaSO4 shield corners
        ctx.beginPath();
        ctx.arc(x, y, 38, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(132, 204, 22, 0.5)';
        ctx.lineWidth = 3;
        ctx.setLineDash([6, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
        break;
      }
      case 'hero_c_mage': {
        // Carbon: 4 tetrahedral sp3 crystalline diamond nodes orbiting in emerald resonance
        const baseAngle = animTime * 0.002;
        const r = 38;
        for (let i = 0; i < 4; i++) {
          const ang = baseAngle + (i * Math.PI) / 2;
          const cx = x + Math.cos(ang) * r;
          const cy = y + Math.sin(ang) * r;
          ctx.beginPath();
          ctx.arc(cx, cy, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#10b981';
          ctx.shadowColor = '#34d399';
          ctx.shadowBlur = 10;
          ctx.fill();
        }
        // Hexagonal graphene ring trace
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const hAng = -animTime * 0.001 + (i * Math.PI) / 3;
          const hx = x + Math.cos(hAng) * 32;
          const hy = y + Math.sin(hAng) * 32;
          if (i === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        break;
      }
      case 'hero_s_assassin': {
        // Sulfur: 4 sharp brimstone yellow stings + acrid corrosive smoke orbs
        const baseAngle = animTime * 0.004;
        const r = 35;
        for (let i = 0; i < 4; i++) {
          const ang = baseAngle + (i * Math.PI) / 2;
          const sx = x + Math.cos(ang) * r;
          const sy = y + Math.sin(ang) * r;
          ctx.save();
          ctx.translate(sx, sy);
          ctx.rotate(ang + Math.PI / 4);
          ctx.beginPath();
          ctx.moveTo(0, -6);
          ctx.lineTo(3, 4);
          ctx.lineTo(-3, 4);
          ctx.closePath();
          ctx.fillStyle = '#facc15';
          ctx.shadowColor = '#eab308';
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.restore();
        }
        break;
      }
      case 'hero_ca_tank': {
        // Calcium: 3 heavy calcite rhombohedron bastion shards orbiting + brick-orange ground ring
        ctx.beginPath();
        ctx.arc(x, y, 42, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(249, 115, 22, 0.4)';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        const baseAngle = animTime * 0.0018;
        const r = 40;
        for (let i = 0; i < 3; i++) {
          const ang = baseAngle + (i * (Math.PI * 2)) / 3;
          const bx = x + Math.cos(ang) * r;
          const by = y + Math.sin(ang) * r;
          ctx.save();
          ctx.translate(bx, by);
          ctx.rotate(ang);
          ctx.fillStyle = '#fed7aa';
          ctx.strokeStyle = '#ea580c';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(-5, -5, 10, 10);
          ctx.fillRect(-5, -5, 10, 10);
          ctx.restore();
        }
        break;
      }
      case 'hero_n_marksman': {
        // Nitrogen: Cryogenic sniper reticle and 3 high-velocity frost orbs (-196°C)
        const baseAngle = animTime * 0.005;
        const r = 36;
        for (let i = 0; i < 3; i++) {
          const ang = baseAngle + (i * (Math.PI * 2)) / 3;
          const nx = x + Math.cos(ang) * r;
          const ny = y + Math.sin(ang) * r;
          ctx.beginPath();
          ctx.arc(nx, ny, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = '#38bdf8';
          ctx.shadowColor = '#0284c7';
          ctx.shadowBlur = 10;
          ctx.fill();
        }
        // Piercing laser pointer forward
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
        break;
      }
    }
    ctx.restore();
  }

  drawHeroes(ctx: CanvasRenderingContext2D, heroes: HeroRuntimeEntity[], playerHero: HeroRuntimeEntity, engine: MobaEngine) {
    const now = Date.now();

    heroes.forEach(hero => {
      if (hero.isDead) return;
      // Viewport Culling: Skip heroes outside visible camera view (100px encompasses body, auras & UI badges)
      if (!this.isInViewport(hero.pos.x, hero.pos.y, 100)) return;

      const isPlayer = hero.isPlayer;
      const isBlue = hero.team === 'BLUE';
      const isEnemy = hero.team !== playerHero.team;
      const themeColor = hero.definition.colorTheme;

      if (isEnemy && !engine.isEntityVisibleToTeam(hero.pos, hero.team, playerHero.team)) {
        return;
      }

      ctx.save();
      const { x, y } = hero.pos;

      // 1. Signature elemental orbital aura
      this.drawHeroSignatureAura(ctx, hero, now);

      // 2. Heading Direction Arrow (Shows movement & facing direction)
      const moveAngle = hero.targetMovePos
        ? Math.atan2(hero.targetMovePos.y - y, hero.targetMovePos.x - x)
        : (hero.targetEntityId ? (() => {
            const tgt = engine.findEntityById(hero.targetEntityId);
            return tgt ? Math.atan2(tgt.pos.y - y, tgt.pos.x - x) : 0;
          })() : 0);

      if (hero.targetMovePos || hero.targetEntityId) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(moveAngle);
        ctx.beginPath();
        ctx.moveTo(36, 0);
        ctx.lineTo(26, -7);
        ctx.lineTo(26, 7);
        ctx.closePath();
        ctx.fillStyle = isBlue ? '#00f0ff' : '#ff4d4d';
        ctx.fill();
        ctx.restore();
      }

      // 3. Player Feet Tactical Selection Ring
      if (isPlayer) {
        ctx.beginPath();
        ctx.arc(x, y, 42, 0, Math.PI * 2);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 3;
        ctx.setLineDash([8, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 4. Hero Armored Chassis (Multi-layered 3D Sphere)
      ctx.beginPath();
      ctx.arc(x, y, 28, 0, Math.PI * 2);
      ctx.fillStyle = themeColor;
      ctx.shadowColor = themeColor;
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.strokeStyle = isBlue ? '#00f0ff' : '#ff4d4d';
      ctx.lineWidth = 3.5;
      ctx.stroke();

      // Inner Alchemical Armor Pauldrons
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.stroke();

      // Damage Flash Overlay (White flash on damage impact)
      if (hero.flashTime && hero.flashTime > 0) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.fillStyle = `rgba(255, 255, 255, ${(hero.flashTime / 0.08) * 0.85})`;
        ctx.beginPath();
        ctx.arc(x, y, 29, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Element Symbol in center
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(hero.definition.symbol, x, y);

      // Level Badge (Integrated into Health Bar Header)
      ctx.beginPath();
      ctx.arc(x - 24, y + 24, 11, 0, Math.PI * 2);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText(`${hero.level}`, x - 24, y + 24);

      // Segmented MOBA Health Bar (100 HP thin ticks, 1000 HP thick notches)
      const hpPct = Math.max(0, hero.hp / hero.maxHp);
      const barWidth = 68;
      const barHeight = 8;
      const barX = x - barWidth / 2;
      const barY = y - 50;

      // Dark background chassis
      ctx.fillStyle = '#090d16';
      ctx.fillRect(barX, barY, barWidth, barHeight);

      // Current HP Fill
      ctx.fillStyle = isBlue ? '#10b981' : '#ef4444';
      ctx.fillRect(barX, barY, barWidth * hpPct, barHeight);

      // 100 HP & 1000 HP Segment Dividers
      const total100Ticks = Math.floor(hero.maxHp / 100);
      for (let t = 1; t <= total100Ticks; t++) {
        const tickX = barX + (t * 100 / hero.maxHp) * barWidth;
        if (tickX >= barX + barWidth) break;
        const is1000 = (t * 100) % 1000 === 0;
        if (is1000) {
          ctx.fillStyle = '#000000';
          ctx.fillRect(tickX - 1, barY - 1, 2, barHeight + 2);
        } else {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
          ctx.fillRect(tickX, barY, 1, barHeight);
        }
      }

      // Shield Overlay (if active)
      if (hero.shield && hero.shield > 0) {
        const shieldWidth = Math.min(barWidth, (hero.shield / hero.maxHp) * barWidth);
        ctx.fillStyle = 'rgba(241, 245, 249, 0.85)';
        ctx.fillRect(barX, barY, shieldWidth, barHeight);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, barY, shieldWidth, barHeight);
      }

      // Outer Health Bar Border
      ctx.strokeStyle = '#020617';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(barX, barY, barWidth, barHeight);

      // Mana Bar
      const manaPct = Math.max(0, hero.mana / hero.maxMana);
      ctx.fillStyle = '#090d16';
      ctx.fillRect(barX, barY + barHeight + 1, barWidth, 3);
      ctx.fillStyle = '#06b6d4';
      ctx.fillRect(barX, barY + barHeight + 1, barWidth * manaPct, 3);

      // Name & Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`${hero.definition.name_vi.split('—')[0]}`, x, barY - 6);

      // In-Brush indicator
      if (engine.getBrushAt(hero.pos) && !isEnemy) {
        ctx.fillStyle = '#4ade80';
        ctx.font = 'bold 9px sans-serif';
        ctx.fillText('🌿 ẨN BỤI', x, barY - 18);
      }

      ctx.restore();
    });
  }

  drawProjectiles(ctx: CanvasRenderingContext2D, projectiles: ProjectileEntity[]) {
    projectiles.forEach(p => {
      // Viewport Culling: Skip projectiles outside visible camera view
      if (!this.isInViewport(p.pos.x, p.pos.y, p.radius + 50)) return;

      ctx.save();
      const speed = Math.hypot(p.velocity.x, p.velocity.y);
      const heading = Math.atan2(p.velocity.y, p.velocity.x);

      // 1. Motion tail
      if (speed > 10) {
        const tailLen = Math.min(36, speed * 0.05);
        const tailX = p.pos.x - Math.cos(heading) * tailLen;
        const tailY = p.pos.y - Math.sin(heading) * tailLen;

        const grad = ctx.createLinearGradient(p.pos.x, p.pos.y, tailX, tailY);
        grad.addColorStop(0, p.color);
        grad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(p.pos.x, p.pos.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = p.radius * 1.6;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Emit tail spark in particle engine
        if (Math.random() < 0.4) {
          this.particles.spawnBurst(p.pos.x, p.pos.y, 1, 'SPARK', p.color, 40, 2.5, 0.2);
        }
      }

      // 2. Projectile Core Orb
      ctx.beginPath();
      ctx.arc(p.pos.x, p.pos.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      if (this.graphicsQuality !== 'PERFORMANCE') {
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 14;
      }
      ctx.fill();

      ctx.strokeStyle = p.color;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // 3. Chemical sparkle flare
      if (p.chemicalReactionCode) {
        ctx.beginPath();
        ctx.arc(p.pos.x, p.pos.y, p.radius * 1.6, 0, Math.PI * 2);
        ctx.strokeStyle = `${p.color}66`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      ctx.restore();
    });
  }

  drawAoEZones(ctx: CanvasRenderingContext2D, aoeZones: AreaOfEffectEntity[]) {
    aoeZones.forEach(aoe => {
      // Viewport Culling: Skip chemical pools outside camera view
      if (!this.isInViewport(aoe.pos.x, aoe.pos.y, aoe.radius + 20)) return;

      ctx.save();
      // 1. Base Pool Area with soft radial gradient or solid fill
      ctx.beginPath();
      ctx.arc(aoe.pos.x, aoe.pos.y, aoe.radius, 0, Math.PI * 2);
      ctx.fillStyle = aoe.color ? `${aoe.color}33` : 'rgba(239, 68, 68, 0.2)';
      ctx.fill();
      ctx.strokeStyle = aoe.color || '#ef4444';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // 2. Concentric Expanding Reaction Waves
      const now = Date.now();
      const wavePhase1 = (now * 0.0012) % 1;
      const wavePhase2 = (now * 0.0012 + 0.5) % 1;

      [wavePhase1, wavePhase2].forEach(phase => {
        const r = aoe.radius * (0.2 + 0.8 * phase);
        const alpha = Math.max(0, (1 - phase) * 0.5);
        ctx.beginPath();
        ctx.arc(aoe.pos.x, aoe.pos.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = `${aoe.color || '#ef4444'}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // 3. Subtle perimeter bubbling / spark micro-particles (for non-PERFORMANCE graphics)
      if (this.graphicsQuality !== 'PERFORMANCE' && Math.random() < 0.15) {
        const bubbleAngle = Math.random() * Math.PI * 2;
        const bubbleDist = aoe.radius * (0.3 + Math.random() * 0.65);
        this.particles.spawnBurst(
          aoe.pos.x + Math.cos(bubbleAngle) * bubbleDist,
          aoe.pos.y + Math.sin(bubbleAngle) * bubbleDist,
          1,
          'SPARK',
          aoe.color || '#ef4444',
          20,
          1.8,
          0.3
        );
      }

      // 4. Chemical Reaction Pill Badge
      if (aoe.chemicalEffectType) {
        ctx.font = 'bold 11px system-ui, sans-serif';
        const typeWidth = ctx.measureText(aoe.chemicalEffectType).width;
        ctx.font = '9px monospace';
        const eqWidth = aoe.equationVI ? ctx.measureText(aoe.equationVI).width : 0;
        const badgeWidth = Math.max(typeWidth, eqWidth) + 20;
        const badgeHeight = aoe.equationVI ? 32 : 20;
        const badgeX = aoe.pos.x - badgeWidth / 2;
        const badgeY = aoe.pos.y - badgeHeight / 2;

        // Dark pill background
        ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
        ctx.beginPath();
        if (typeof (ctx as any).roundRect === 'function') {
          (ctx as any).roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 6);
        } else {
          ctx.rect(badgeX, badgeY, badgeWidth, badgeHeight);
        }
        ctx.fill();
        ctx.strokeStyle = `${aoe.color || '#ef4444'}aa`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Duration progress line at the bottom of the badge
        if (aoe.durationSeconds > 0) {
          const progress = Math.max(0, Math.min(1, aoe.remainingSeconds / aoe.durationSeconds));
          ctx.fillStyle = aoe.color || '#ef4444';
          ctx.fillRect(badgeX + 2, badgeY + badgeHeight - 3, (badgeWidth - 4) * progress, 2);
        }

        // Text rendering
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if (aoe.equationVI) {
          ctx.font = 'bold 10px system-ui, sans-serif';
          ctx.fillStyle = '#f8fafc';
          ctx.fillText(aoe.chemicalEffectType, aoe.pos.x, badgeY + 10);

          ctx.font = 'bold 9px monospace';
          ctx.fillStyle = '#38bdf8';
          ctx.fillText(aoe.equationVI, aoe.pos.x, badgeY + 22);
        } else {
          ctx.font = 'bold 10px system-ui, sans-serif';
          ctx.fillStyle = '#f8fafc';
          ctx.fillText(aoe.chemicalEffectType, aoe.pos.x, aoe.pos.y);
        }
      }
      ctx.restore();
    });
  }

  drawEnvironmentalZones(ctx: CanvasRenderingContext2D, envZones?: EnvironmentalZone[]) {
    if (!envZones || envZones.length === 0) return;

    envZones.forEach(env => {
      if (!this.isInViewport(env.pos.x, env.pos.y, env.radius + 20)) return;

      ctx.save();
      const now = Date.now();

      if (env.type === 'FROZEN_RIVER') {
        // 1. Frost Ice Sheet Base
        ctx.beginPath();
        ctx.arc(env.pos.x, env.pos.y, env.radius, 0, Math.PI * 2);
        const iceGrad = ctx.createRadialGradient(env.pos.x, env.pos.y, 0, env.pos.x, env.pos.y, env.radius);
        iceGrad.addColorStop(0, 'rgba(224, 242, 254, 0.65)');
        iceGrad.addColorStop(0.7, 'rgba(186, 230, 253, 0.45)');
        iceGrad.addColorStop(1, 'rgba(56, 189, 248, 0.15)');
        ctx.fillStyle = iceGrad;
        ctx.fill();
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.85)';
        ctx.lineWidth = 3;
        ctx.stroke();

        // 2. Crystalline Geometric Ice Fracture Lines
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const len = env.radius * 0.85;
          ctx.moveTo(env.pos.x, env.pos.y);
          const endX = env.pos.x + Math.cos(angle) * len;
          const endY = env.pos.y + Math.sin(angle) * len;
          ctx.lineTo(endX, endY);
          // Branch cracks
          ctx.lineTo(endX + Math.cos(angle + 0.5) * 18, endY + Math.sin(angle + 0.5) * 18);
        }
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // 3. Environmental Pill Badge
        this.drawEnvBadge(ctx, env.pos.x, env.pos.y, '❄️ CẦU BĂNG NITƠ H₂O(s)', env.equation, '#22d3ee', env.remainingSeconds / env.durationSeconds);
      } else if (env.type === 'LIMEWATER_CAUSTIC') {
        // 1. Boiling Alkaline Limewater
        ctx.beginPath();
        ctx.arc(env.pos.x, env.pos.y, env.radius, 0, Math.PI * 2);
        const causticGrad = ctx.createRadialGradient(env.pos.x, env.pos.y, 0, env.pos.x, env.pos.y, env.radius);
        causticGrad.addColorStop(0, 'rgba(254, 240, 138, 0.6)');
        causticGrad.addColorStop(0.65, 'rgba(250, 204, 21, 0.35)');
        causticGrad.addColorStop(1, 'rgba(234, 88, 12, 0.1)');
        ctx.fillStyle = causticGrad;
        ctx.fill();
        ctx.strokeStyle = 'rgba(249, 115, 22, 0.8)';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // 2. Thermal Boiling Rings
        const phase = (now * 0.0015) % 1;
        ctx.beginPath();
        ctx.arc(env.pos.x, env.pos.y, env.radius * phase, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(251, 146, 60, ${(1 - phase) * 0.6})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        this.drawEnvBadge(ctx, env.pos.x, env.pos.y, '♨️ VÔI TÔI TỎA NHIỆT Ca(OH)₂', env.equation, '#f97316', env.remainingSeconds / env.durationSeconds);
      } else if (env.type === 'ELECTRIFIED_WATER') {
        // 1. Electric Discharge Field
        ctx.beginPath();
        ctx.arc(env.pos.x, env.pos.y, env.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(250, 204, 21, 0.22)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(250, 204, 21, 0.9)';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // 2. Crackling Lightning Arcs
        ctx.beginPath();
        const arcs = 8;
        for (let i = 0; i < arcs; i++) {
          const a = (i * Math.PI * 2) / arcs + (now * 0.003);
          const r = env.radius * (0.3 + 0.65 * ((i % 2 === 0) ? 0.9 : 0.6));
          const jX = env.pos.x + Math.cos(a) * r + (Math.random() - 0.5) * 20;
          const jY = env.pos.y + Math.sin(a) * r + (Math.random() - 0.5) * 20;
          if (i === 0) ctx.moveTo(jX, jY);
          else ctx.lineTo(jX, jY);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
        ctx.lineWidth = 2;
        ctx.stroke();

        this.drawEnvBadge(ctx, env.pos.x, env.pos.y, '⚡ SỐC ĐIỆN PHÂN BỀ MẶT', env.equation, '#facc15', env.remainingSeconds / env.durationSeconds);
      }

      ctx.restore();
    });
  }

  private drawEnvBadge(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    title: string,
    equation: string,
    color: string,
    progressRatio: number
  ) {
    ctx.font = 'bold 11px system-ui, sans-serif';
    const tWidth = ctx.measureText(title).width;
    ctx.font = '9px monospace';
    const eqWidth = ctx.measureText(equation).width;
    const badgeWidth = Math.max(tWidth, eqWidth) + 24;
    const badgeHeight = 34;
    const badgeX = x - badgeWidth / 2;
    const badgeY = y - badgeHeight / 2;

    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.beginPath();
    if (typeof (ctx as any).roundRect === 'function') {
      (ctx as any).roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 6);
    } else {
      ctx.rect(badgeX, badgeY, badgeWidth, badgeHeight);
    }
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.4;
    ctx.stroke();

    // Progress bar
    const p = Math.max(0, Math.min(1, progressRatio));
    ctx.fillStyle = color;
    ctx.fillRect(badgeX + 2, badgeY + badgeHeight - 3, (badgeWidth - 4) * p, 2);

    // Text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 10px system-ui, sans-serif';
    ctx.fillStyle = '#f8fafc';
    ctx.fillText(title, x, badgeY + 11);

    ctx.font = 'bold 9px monospace';
    ctx.fillStyle = color;
    ctx.fillText(equation, x, badgeY + 23);
  }

  drawAimDecal(ctx: CanvasRenderingContext2D, origin: Vector2D, target: Vector2D, decal: AimDecal) {
    ctx.save();
    const dx = target.x - origin.x;
    const dy = target.y - origin.y;
    const dist = Math.hypot(dx, dy) || 1;
    const color = decal.color || '#00f0ff';
    const time = Date.now() * 0.003;
    const angle = Math.atan2(dy, dx);

    if (decal.type === 'LINE') {
      const lineLen = decal.range;
      const corridorWidth = decal.width || 44;
      const halfW = corridorWidth / 2;

      ctx.save();
      ctx.translate(origin.x, origin.y);
      ctx.rotate(angle);

      // 1. Semi-transparent corridor background
      ctx.fillStyle = `${color}22`;
      ctx.fillRect(0, -halfW, lineLen, corridorWidth);

      // 2. Corridor edge guide rails
      ctx.strokeStyle = `${color}aa`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, -halfW);
      ctx.lineTo(lineLen, -halfW);
      ctx.moveTo(0, halfW);
      ctx.lineTo(lineLen, halfW);
      ctx.stroke();

      // 3. Animated Forward Chevrons (>>>)
      const chevronStep = 45;
      const animOffset = (Date.now() * 0.075) % chevronStep;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let cd = 25; cd < lineLen - 25; cd += chevronStep) {
        const cx = cd + animOffset;
        if (cx >= lineLen - 15) continue;
        const chevronAlpha = Math.min(1, Math.min(cx / 60, (lineLen - cx) / 60));
        ctx.globalAlpha = chevronAlpha;
        ctx.beginPath();
        ctx.moveTo(cx - 10, -halfW + 8);
        ctx.lineTo(cx + 4, 0);
        ctx.lineTo(cx - 10, halfW - 8);
        ctx.stroke();
      }

      // 4. Arrowhead at the tip
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(lineLen + 10, 0);
      ctx.lineTo(lineLen - 12, -halfW - 4);
      ctx.lineTo(lineLen - 4, 0);
      ctx.lineTo(lineLen - 12, halfW + 4);
      ctx.closePath();
      ctx.fill();

      ctx.restore();

      // Range border circle
      ctx.beginPath();
      ctx.arc(origin.x, origin.y, decal.range, 0, Math.PI * 2);
      ctx.strokeStyle = `${color}44`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (decal.type === 'AOE') {
      const aoeDist = Math.min(dist, decal.range);
      const aoeCenter = {
        x: origin.x + (dx / dist) * aoeDist,
        y: origin.y + (dy / dist) * aoeDist
      };
      const radius = decal.radius || 150;

      // Trajectory dashed guide line from origin to center
      ctx.beginPath();
      ctx.moveTo(origin.x, origin.y);
      ctx.lineTo(aoeCenter.x, aoeCenter.y);
      ctx.strokeStyle = `${color}88`;
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Target Circle Area Fill
      ctx.beginPath();
      ctx.arc(aoeCenter.x, aoeCenter.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `${color}28`;
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Inner pulsating concentric ring
      const pulseR = radius * (0.4 + Math.sin(time * 3) * 0.1);
      ctx.beginPath();
      ctx.arc(aoeCenter.x, aoeCenter.y, pulseR, 0, Math.PI * 2);
      ctx.strokeStyle = `${color}aa`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Rotating targeting crosshair & ticks
      ctx.save();
      ctx.translate(aoeCenter.x, aoeCenter.y);
      ctx.rotate(time * 1.5);
      ctx.beginPath();
      ctx.moveTo(-radius * 0.35, 0);
      ctx.lineTo(radius * 0.35, 0);
      ctx.moveTo(0, -radius * 0.35);
      ctx.lineTo(0, radius * 0.35);
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Range border
      ctx.beginPath();
      ctx.arc(origin.x, origin.y, decal.range, 0, Math.PI * 2);
      ctx.strokeStyle = `${color}44`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    } else if (decal.type === 'CONE') {
      // CONE Skillshot indicator (e.g. spray/flame cone)
      const coneAngle = Math.PI / 3; // 60 degrees spread
      const halfCone = coneAngle / 2;

      ctx.save();
      ctx.translate(origin.x, origin.y);
      ctx.rotate(angle);

      // 1. Semi-transparent cone fill
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, decal.range, -halfCone, halfCone);
      ctx.closePath();
      ctx.fillStyle = `${color}25`;
      ctx.fill();

      // 2. Outer boundary stroke
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // 3. Central aiming vector and guideline dividers
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(decal.range, 0);
      ctx.strokeStyle = `${color}99`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(halfCone * 0.5) * decal.range, Math.sin(halfCone * 0.5) * decal.range);
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(-halfCone * 0.5) * decal.range, Math.sin(-halfCone * 0.5) * decal.range);
      ctx.strokeStyle = `${color}44`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      // 4. Animated forward sweeping wavefronts
      const coneStep = decal.range / 3;
      const wavePhase = (Date.now() * 0.05) % coneStep;
      ctx.lineWidth = 2;
      for (let w = wavePhase; w < decal.range; w += coneStep) {
        if (w < 15) continue;
        const alpha = Math.min(1, Math.min(w / 40, (decal.range - w) / 40));
        ctx.strokeStyle = `${color}${Math.floor(alpha * 180).toString(16).padStart(2, '0')}`;
        ctx.beginPath();
        ctx.arc(0, 0, w, -halfCone, halfCone);
        ctx.stroke();
      }

      ctx.restore();

      // Range border circle dashed
      ctx.beginPath();
      ctx.arc(origin.x, origin.y, decal.range, 0, Math.PI * 2);
      ctx.strokeStyle = `${color}33`;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    ctx.restore();
  }

  drawFloatingText(ctx: CanvasRenderingContext2D, texts: any[]) {
    texts.forEach(txt => {
      // Viewport Culling: Skip floating text outside camera view
      if (!this.isInViewport(txt.pos.x, txt.pos.y, 100)) return;

      ctx.save();
      const alpha = Math.max(0, 1 - txt.lifeTimeSeconds / txt.maxLifeTimeSeconds);
      ctx.globalAlpha = alpha;

      const isReactionOrTrap = typeof txt.text === 'string' && (
        txt.text.includes('→') ||
        txt.text.includes('->') ||
        txt.text.includes('Kháng') ||
        txt.text.includes('Bẫy') ||
        txt.text.includes('NaOH') ||
        txt.text.includes('Fe₂O₃')
      );

      if (isReactionOrTrap) {
        ctx.font = 'bold 12px ui-monospace, SFMono-Regular, Menlo, monospace';
        const metrics = ctx.measureText(txt.text);
        const padX = 10;
        const padY = 4;
        const badgeW = metrics.width + padX * 2;
        const badgeH = 22;
        const badgeX = txt.pos.x - badgeW / 2;
        const badgeY = txt.pos.y - 15;

        // Glowing tactical background
        ctx.fillStyle = 'rgba(11, 19, 43, 0.88)';
        ctx.strokeStyle = txt.color || '#00f0ff';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = txt.color || '#00f0ff';
        ctx.shadowBlur = 8;

        ctx.beginPath();
        if (typeof (ctx as any).roundRect === 'function') {
          (ctx as any).roundRect(badgeX, badgeY, badgeW, badgeH, 6);
        } else {
          ctx.rect(badgeX, badgeY, badgeW, badgeH);
        }
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowBlur = 0;
        ctx.fillText(txt.text, txt.pos.x, txt.pos.y - 4);
      } else {
        ctx.fillStyle = txt.color;
        ctx.font = txt.isCritical ? 'bold 18px sans-serif' : 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 6;
        ctx.fillText(txt.text, txt.pos.x, txt.pos.y);
      }
      ctx.restore();
    });
  }

  drawFogOfWarOverlay(ctx: CanvasRenderingContext2D, engine: MobaEngine) {
    if (!this.fogCanvas) {
      this.fogCanvas = document.createElement('canvas');
      this.fogCtx = this.fogCanvas.getContext('2d');
    }
    const dpr = window.devicePixelRatio || 1;
    const w = Math.round(this.viewportWidth * dpr);
    const h = Math.round(this.viewportHeight * dpr);
    if (this.fogCanvas.width !== w || this.fogCanvas.height !== h) {
      this.fogCanvas.width = w;
      this.fogCanvas.height = h;
    }
    const fctx = this.fogCtx;
    if (!fctx) return;

    fctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const camLeft = this.camera.x - (this.viewportWidth / 2) / this.zoom;
    const camTop = this.camera.y - (this.viewportHeight / 2) / this.zoom;

    // Shroud of war ambient darkness
    fctx.globalCompositeOperation = 'source-over';
    fctx.fillStyle = 'rgba(7, 12, 24, 0.45)';
    fctx.fillRect(0, 0, this.viewportWidth, this.viewportHeight);

    // Punch through vision for allied units
    fctx.globalCompositeOperation = 'destination-out';
    const playerTeam = engine.playerHero?.team || 'BLUE';

    // Allied Heroes Vision
    engine.heroes.forEach(hero => {
      if (hero.team !== playerTeam || hero.isDead) return;
      const screenX = (hero.pos.x - camLeft) * this.zoom;
      const screenY = (hero.pos.y - camTop) * this.zoom;
      const radius = (hero.definition.id === 'hero_h_scout' ? 820 : 650) * this.zoom;

      const grad = fctx.createRadialGradient(screenX, screenY, radius * 0.45, screenX, screenY, radius);
      grad.addColorStop(0, 'rgba(0,0,0,1)');
      grad.addColorStop(0.85, 'rgba(0,0,0,0.85)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      fctx.fillStyle = grad;
      fctx.beginPath();
      fctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
      fctx.fill();
    });

    // Allied Turrets Vision
    engine.turrets.forEach(t => {
      if (t.team !== playerTeam || t.destroyed) return;
      const screenX = (t.pos.x - camLeft) * this.zoom;
      const screenY = (t.pos.y - camTop) * this.zoom;
      const radius = 750 * this.zoom;

      const grad = fctx.createRadialGradient(screenX, screenY, radius * 0.5, screenX, screenY, radius);
      grad.addColorStop(0, 'rgba(0,0,0,1)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      fctx.fillStyle = grad;
      fctx.beginPath();
      fctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
      fctx.fill();
    });

    // Allied Minions Vision
    engine.minions.forEach(m => {
      if (m.team !== playerTeam) return;
      const screenX = (m.pos.x - camLeft) * this.zoom;
      const screenY = (m.pos.y - camTop) * this.zoom;
      const radius = 420 * this.zoom;

      const grad = fctx.createRadialGradient(screenX, screenY, radius * 0.35, screenX, screenY, radius);
      grad.addColorStop(0, 'rgba(0,0,0,0.9)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      fctx.fillStyle = grad;
      fctx.beginPath();
      fctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
      fctx.fill();
    });

    // Allied Core Vision
    const core = engine.cores[playerTeam];
    if (core && !core.destroyed) {
      const screenX = (core.pos.x - camLeft) * this.zoom;
      const screenY = (core.pos.y - camTop) * this.zoom;
      const radius = 850 * this.zoom;

      const grad = fctx.createRadialGradient(screenX, screenY, radius * 0.5, screenX, screenY, radius);
      grad.addColorStop(0, 'rgba(0,0,0,1)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');

      fctx.fillStyle = grad;
      fctx.beginPath();
      fctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
      fctx.fill();
    }

    // Blit fog canvas onto main canvas
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(this.fogCanvas, 0, 0, this.canvas.width, this.canvas.height);
    ctx.restore();
  }

  renderMinimap(engine: MobaEngine) {
    const ctx = this.minimapCtx;
    const w = this.minimapCanvas.width / (window.devicePixelRatio || 1);
    const h = this.minimapCanvas.height / (window.devicePixelRatio || 1);

    ctx.clearRect(0, 0, w, h);

    // Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, w, h);

    const scaleX = w / MAP_CONFIG.WIDTH;
    const scaleY = h / MAP_CONFIG.HEIGHT;

    // Draw Lane lines on minimap
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 4;
    // Mid
    ctx.beginPath();
    ctx.moveTo(260 * scaleX, 2140 * scaleY);
    ctx.lineTo(2140 * scaleX, 260 * scaleY);
    ctx.stroke();
    // Top
    ctx.beginPath();
    ctx.moveTo(260 * scaleX, 2140 * scaleY);
    ctx.lineTo(340 * scaleX, 340 * scaleY);
    ctx.lineTo(2140 * scaleX, 260 * scaleY);
    ctx.stroke();
    // Bot
    ctx.beginPath();
    ctx.moveTo(260 * scaleX, 2140 * scaleY);
    ctx.lineTo(2060 * scaleX, 2060 * scaleY);
    ctx.lineTo(2140 * scaleX, 260 * scaleY);
    ctx.stroke();

    // Turrets on minimap
    engine.turrets.forEach(t => {
      if (t.destroyed) return;
      ctx.fillStyle = t.team === 'BLUE' ? '#38bdf8' : '#f87171';
      ctx.beginPath();
      ctx.arc(t.pos.x * scaleX, t.pos.y * scaleY, 3.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Neutral Monsters on minimap
    engine.monsters.forEach(m => {
      const isBoss = m.type === 'CATALYST_GUARDIAN';
      if (!m.isAlive) {
        // Render faint respawn perimeter on minimap
        if (m.respawnTimer > 0) {
          ctx.strokeStyle = isBoss ? 'rgba(245, 158, 11, 0.5)' : 'rgba(168, 85, 247, 0.4)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(m.pos.x * scaleX, m.pos.y * scaleY, isBoss ? 4.5 : 2.5, 0, Math.PI * 2);
          ctx.stroke();
        }
        return;
      }
      if (!engine.isEntityVisibleToTeam(m.pos, 'NEUTRAL', engine.playerHero.team)) return;
      ctx.fillStyle = isBoss ? '#f59e0b' : '#a855f7';
      ctx.beginPath();
      ctx.arc(m.pos.x * scaleX, m.pos.y * scaleY, isBoss ? 5 : 3, 0, Math.PI * 2);
      ctx.fill();
      if (isBoss) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // Minions on minimap
    engine.minions.forEach(m => {
      if (m.team !== engine.playerHero.team && !engine.isEntityVisibleToTeam(m.pos, m.team, engine.playerHero.team)) {
        return;
      }
      ctx.fillStyle = m.team === 'BLUE' ? '#0ea5e9' : '#ef4444';
      ctx.fillRect(m.pos.x * scaleX - 1, m.pos.y * scaleY - 1, 2, 2);
    });

    // Heroes on minimap
    engine.heroes.forEach(h => {
      if (h.isDead) return;
      if (h.team !== engine.playerHero.team && !engine.isEntityVisibleToTeam(h.pos, h.team, engine.playerHero.team)) {
        return;
      }
      ctx.fillStyle = h.isPlayer ? '#f59e0b' : (h.team === 'BLUE' ? '#10b981' : '#f43f5e');
      ctx.beginPath();
      ctx.arc(h.pos.x * scaleX, h.pos.y * scaleY, h.isPlayer ? 5 : 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Camera viewport box on minimap
    const camLeft = (this.camera.x - (this.viewportWidth / 2) / this.zoom) * scaleX;
    const camTop = (this.camera.y - (this.viewportHeight / 2) / this.zoom) * scaleY;
    const camW = (this.viewportWidth / this.zoom) * scaleX;
    const camH = (this.viewportHeight / this.zoom) * scaleY;

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(camLeft, camTop, camW, camH);
  }
}
