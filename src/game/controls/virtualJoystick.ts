// src/game/controls/virtualJoystick.ts
// Mobile Touch & Virtual Joystick Input Processor for ELEMENTA MOBA
// Provides deadzone filtration, polar deflection normalization, and pinch-to-zoom math

export interface JoystickState {
  isActive: boolean;
  x: number; // Normalized -1.0 to +1.0
  y: number; // Normalized -1.0 to +1.0
  angle: number; // Radians
  intensity: number; // 0.0 to 1.0
}

export interface TouchPoint {
  clientX: number;
  clientY: number;
  identifier?: number;
}

export interface HudTouchZone {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Computes deadzone-filtered, polar-clamped joystick vector from touch coordinates
 */
export function computeJoystickInput(
  touchX: number,
  touchY: number,
  centerX: number,
  centerY: number,
  deadzone: number = 12,
  maxRadius: number = 60
): JoystickState {
  const dx = touchX - centerX;
  const dy = touchY - centerY;
  const dist = Math.hypot(dx, dy);

  if (dist < deadzone) {
    return { isActive: false, x: 0, y: 0, angle: 0, intensity: 0 };
  }

  const angle = Math.atan2(dy, dx);
  const clampedDist = Math.min(dist, maxRadius);
  const intensity = (clampedDist - deadzone) / (maxRadius - deadzone);

  return {
    isActive: true,
    x: Math.cos(angle) * intensity,
    y: Math.sin(angle) * intensity,
    angle,
    intensity
  };
}

/**
 * Computes multi-touch pinch-to-zoom scale clamped within safe min/max bounds
 */
export function computePinchZoom(
  touchA: TouchPoint,
  touchB: TouchPoint,
  initialDistance: number,
  currentZoom: number,
  minZoom: number = 0.5,
  maxZoom: number = 2.0
): number {
  if (!touchA || !touchB || initialDistance <= 0) return currentZoom;
  const currentDistance = Math.hypot(touchB.clientX - touchA.clientX, touchB.clientY - touchA.clientY);
  const scale = currentDistance / initialDistance;
  const targetZoom = currentZoom * scale;
  return Math.max(minZoom, Math.min(maxZoom, Math.round(targetZoom * 100) / 100));
}

/**
 * Safely extracts the primary finger touch from a TouchList or array
 */
export function extractPrimaryTouch<T extends TouchPoint>(touches: T[] | TouchList | null | undefined): T | null {
  if (!touches || touches.length === 0) {
    return null;
  }
  return (touches as any)[0] || null;
}

/**
 * Checks whether a touch coordinate lands inside a registered HUD interactive element
 */
export function isTouchConsumedByHUD(
  touchScreenX: number,
  touchScreenY: number,
  hudZones: HudTouchZone[]
): { consumed: boolean; zoneId: string | null } {
  for (const zone of hudZones) {
    if (
      touchScreenX >= zone.x &&
      touchScreenX <= zone.x + zone.width &&
      touchScreenY >= zone.y &&
      touchScreenY <= zone.y + zone.height
    ) {
      return { consumed: true, zoneId: zone.id };
    }
  }
  return { consumed: false, zoneId: null };
}
