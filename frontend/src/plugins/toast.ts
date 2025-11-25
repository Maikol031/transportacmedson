import type { App } from "vue";
import { inject, ref } from "vue";
import { XCircle, Info, CircleCheck, CircleAlert } from "lucide-vue-next";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
  icon: any;
  color: string;
}

const toasts = ref<Toast[]>([]);

function showToast(type: ToastType, message: string, duration = 3000) {
  const icons = {
    success: CircleCheck,
    error: XCircle,
    info: Info,
    warning: CircleAlert,
    color: {
      success: 'bg-green-500',
      error: 'bg-red-500',
      info: 'bg-blue-500',
      warning: 'bg-yellow-500',
    }
  };
  const id = Date.now();
  toasts.value.push({ id, type, message, icon: icons[type], color: icons.color[type] });
  setTimeout(() => removeToast(id), duration);
}

function removeToast(id: number) {
  toasts.value = toasts.value.filter((t) => t.id !== id);
}

export const toastApi = {
  toasts,
  showToast,
  success: (msg: string) => showToast("success", msg),
  error: (msg: string) => showToast("error", msg),
  info: (msg: string) => showToast("info", msg),
  warning: (msg: string) => showToast("warning", msg),
};

// ✅ Nova forma: manter uma referência global interna (sem window)
let globalToast: typeof toastApi | null = null;

export default {
  install(app: App) {
    app.provide("toast", toastApi);
    globalToast = toastApi;
  },
};

// Para usar dentro do setup()
export function useToast() {
  const toast = inject<typeof toastApi>("toast");
  if (!toast) throw new Error("Toast plugin not installed");
  return toast;
}

// ✅ Para usar fora de componentes Vue (como em classes)
export function getToast() {
  if (!globalToast) throw new Error("Toast plugin not installed");
  return globalToast;
}
