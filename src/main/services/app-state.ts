import EventEmitter from 'events'

export enum Status {
  Ready = 'ready',
  InProgress = 'in-progress'
}

enum EventName {
  StatusChange = 'change-status'
}

export class AppState {
  private em = new EventEmitter()
  private currentStatus: Status = Status.Ready

  changeStatus(status: Status): void {
    this.currentStatus = status
    this.em.emit(EventName.StatusChange, status)
  }

  getStatus(): Status {
    return this.currentStatus
  }

  onStatusChange(fn: (status: Status) => void): void {
    this.em.on('change-status', fn)
  }
}
