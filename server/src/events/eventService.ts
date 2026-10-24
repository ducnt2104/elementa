// server/src/events/eventService.ts
// Golden Hours (Khung Giờ Vàng) & Timed Community Events Service
// Authoritative timezone calculation (default Asia/Ho_Chi_Minh UTC+7)

export interface GoldenHourStatus {
  isActive: boolean;
  currentSlotName?: string;
  nextSlotTime: string;
  xpMultiplier: number;
  tokenMultiplier: number;
  timezone: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  bonusType: string;
  bonusValue: string;
  isActive: boolean;
}

export class EventService {
  private timezone: string;

  constructor(timezone: string = 'Asia/Ho_Chi_Minh') {
    this.timezone = timezone;
  }

  /**
   * Get current hour in Vietnam time (UTC+7)
   */
  private getLocalHour(): number {
    const now = new Date();
    // UTC hours + 7 hours for Vietnam ICT
    const utcHours = now.getUTCHours();
    return (utcHours + 7) % 24;
  }

  /**
   * Evaluate if current time is inside Golden Hours
   * Slots: 14:00 - 16:00 (Chiến Thuật Chiều) and 19:00 - 21:00 (Đấu Trường Tối)
   */
  public getGoldenHourStatus(): GoldenHourStatus {
    const localHour = this.getLocalHour();

    if (localHour >= 14 && localHour < 16) {
      return {
        isActive: true,
        currentSlotName: 'Khung Giờ Vàng Chiều (14:00 - 16:00)',
        nextSlotTime: '19:00 hôm nay',
        xpMultiplier: 2.0,
        tokenMultiplier: 1.5,
        timezone: this.timezone
      };
    }

    if (localHour >= 19 && localHour < 21) {
      return {
        isActive: true,
        currentSlotName: 'Khung Giờ Vàng Tối (19:00 - 21:00)',
        nextSlotTime: '14:00 ngày mai',
        xpMultiplier: 2.0,
        tokenMultiplier: 1.5,
        timezone: this.timezone
      };
    }

    // Currently inactive
    const nextSlot = localHour < 14 ? '14:00 hôm nay' : localHour < 19 ? '19:00 hôm nay' : '14:00 ngày mai';

    return {
      isActive: false,
      nextSlotTime: nextSlot,
      xpMultiplier: 1.0,
      tokenMultiplier: 1.0,
      timezone: this.timezone
    };
  }

  /**
   * Get list of active community events
   */
  public getActiveEvents(): CommunityEvent[] {
    const now = new Date();
    const startOfWeek = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString();
    const endOfWeek = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString();

    return [
      {
        id: 'event_redox_mastery',
        title: 'Tuần Lễ Tinh Hoa Oxi Hóa - Khử',
        description: 'Nhận thêm 50% Knowledge XP khi kích hoạt thành công phản ứng nhiệt nhôm hoặc đốt cháy sắt.',
        startDate: startOfWeek,
        endDate: endOfWeek,
        bonusType: 'XP_BOOST',
        bonusValue: '+50% XP Phản Ứng Oxi Hóa',
        isActive: true
      },
      {
        id: 'event_noble_gas_defense',
        title: 'Thử Thách Khí Hiếm Bất Hoại',
        description: 'Triệu hồi lá chắn Heli hoặc Neon trong trận đấu TCG để nhận thêm 100 Elemental Shards.',
        startDate: startOfWeek,
        endDate: endOfWeek,
        bonusType: 'SHARD_REWARD',
        bonusValue: '+100 Shards',
        isActive: true
      }
    ];
  }
}
