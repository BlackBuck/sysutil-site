export type SystemCheckInput = {
  timestamp: string;
  os_type: string;
  hostname: string;
  disk_encryption: string;
  os_update_status: string;
  antivirus_info: {
    presence: string;
    details: string;
  };
  inactivity_sleep_settings: {
    compliance_status: string;
    configured_minutes: number;
  };
};
