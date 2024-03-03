export interface HistoyObj {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
  progress: number;
}

export interface ServerHistoryObj {
  id: string;
  start_at: string;
  end_at: string;
  enrolled_by: string;
  total: number;
  completed: number;
  done: number;
  skipped: number;
  failed: number;
  re_enrollable: boolean;
}
