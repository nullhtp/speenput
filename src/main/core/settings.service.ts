export class SettingsService {
  get<T>(key: string): T {
    return key as T
  }
}
