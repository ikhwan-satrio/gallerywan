
interface Resources {
  asset_id: string,
  public_id: string,
  format: string,
  version: string,
  resource_type: string,
  type: string,
  created_at: Date,
  bytes: string,
  width: number,
  height: number,
  asset_folder: string,
  display_name: string,
  url: string,
  secure_url: string,
}

export interface CloudinaryReturn {
  resources: Resources[],
  rate_limit_allowed: number,
  rate_limit_reset_at: number,
  rate_limit_remaining: number,
}
